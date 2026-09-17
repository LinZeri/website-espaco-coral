#!/usr/bin/env python3
"""
blog_loop_agent_cli.py — CLI-subprocess backend for the blog-loop pipeline stages,
for harnesses where the native `Workflow` tool (the `agent()`/`phase()`/`log()`/
`pipeline()` globals that ~/.claude/workflows/blog-loop.js expects) is not
available (e.g. the VSCode-extension Claude Code harness, which has Agent/Skill
but no Workflow primitive).

This is a 1:1 port of runItemPipeline() and all prompt builders from
~/.claude/workflows/blog-loop.js, with `agent(prompt, {schema, phase, label})`
implemented as a fresh, stateless `claude -p` subprocess per call:

    claude -p --output-format json [--json-schema <schema>] \
        --permission-mode bypassPermissions --no-session-persistence
    (prompt piped via stdin)

Each stage call gets its own subagent session (no --resume/--continue), matching
blog-loop.js's design where every agent() call is an independent subagent with
no shared memory except files on disk (brief.md, the post file, schema sidecar).

USAGE
  python blog_loop_agent_cli.py --args-file <path-to-json>
  python blog_loop_agent_cli.py --args-json '<json>'

ARGS JSON SHAPE (identical to the Workflow tool's `args` for blog-loop.js):
{
  "projectDir": "...", "config": {...}, "batchItems": [...],
  "hardRules": "...", "ctaFramework": "...",
  "skillMdPaths": {"brief":"...", "write":"...", "schema":"...", "seoCheck":"...",
                    "audit":"...", "rewrite":"...", "factcheck":"..."},
  "iterationId": "...", "dryRun": false,
  "concurrency": 2,      // optional, default min(batchSize-ish, len(items), 3)
  "model": null,         // optional --model override for every stage call
  "progressFile": null   // optional path: append one JSON line per stage event
}

OUTPUT: one JSON object on stdout, same shape blog-loop.js's Workflow return has:
  {"results": [...], "summary": {...}, "iterationId": ...}
so SKILL.md's postamble (step 12+: verify build, git commit/push, mark-published,
append-log) consumes it unmodified regardless of which backend produced it.

This script is project-agnostic (mirrors blog-loop.js exactly); nothing here is
specific to any one project. Config differences (hero.enabled, preflight.enabled,
factcheck.enabled, fileExtension, frontmatter.fields, ctaPattern, allowTaxLanguage)
are all read from the same `config` object blog-loop.js reads.
"""
import argparse
import json
import os
import subprocess
import sys
import time
import traceback
from concurrent.futures import ThreadPoolExecutor, as_completed

CLAUDE_BIN = os.environ.get("BLOG_LOOP_CLAUDE_BIN", "claude")

# ---------------------------------------------------------------------------
# Result schemas (ported verbatim from blog-loop.js)
# ---------------------------------------------------------------------------

BRIEF_RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "ok": {"type": "boolean"},
        "path": {"type": "string"},
        "cannibalization_detected": {"type": "boolean"},
        "cannibalization_reason": {"type": "string"},
        "word_target": {"type": "number"},
        "notes": {"type": "string"},
    },
    "required": ["ok", "path"],
}

WRITE_RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "ok": {"type": "boolean"},
        "path": {"type": "string"},
        "word_count_body": {"type": "number"},
        "frontmatter_complete": {"type": "boolean"},
        "em_dash_count": {"type": "number"},
        "tax_phrase_count": {"type": "number"},
        "cta_count": {"type": "number"},
        "internal_link_count": {"type": "number"},
    },
    "required": ["ok", "path", "word_count_body"],
}

HERO_RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "ok": {"type": "boolean"},
        "path": {"type": "string"},
        "width": {"type": "number"},
        "height": {"type": "number"},
        "format": {"type": "string"},
    },
    "required": ["ok", "path"],
}

SCHEMA_RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "ok": {"type": "boolean"},
        "path": {"type": "string"},
        "entity_count": {"type": "number"},
        "has_faq": {"type": "boolean"},
        "has_breadcrumb": {"type": "boolean"},
    },
    "required": ["ok", "path"],
}

SEO_RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "passed": {"type": "boolean"},
        "critical_count": {"type": "number"},
        "high_count": {"type": "number"},
        "fixes_applied": {"type": "boolean"},
        "report_summary": {"type": "string"},
    },
    "required": ["passed", "critical_count"],
}

AUDIT_RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "score": {"type": "number"},
        "category_scores": {"type": "object"},
        "attempts": {"type": "number"},
        "rewrites_applied": {"type": "number"},
        "issues": {"type": "array"},
    },
    "required": ["score", "attempts"],
}

FACTCHECK_RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "checked": {"type": "number"},
        "verified": {"type": "number"},
        "failing": {"type": "array"},
        "uncited_count": {"type": "number"},
        "blocking": {"type": "boolean"},
        "fixes_applied": {"type": "boolean"},
        "summary": {"type": "string"},
    },
    "required": ["blocking", "checked"],
}

PREFLIGHT_RESULT_SCHEMA = {
    "type": "object",
    "properties": {
        "passed": {"type": "boolean"},
        "gates_run": {"type": "array"},
        "blocked": {"type": "boolean"},
        "violations": {"type": "array"},
        "warnings": {"type": "array"},
    },
    "required": ["passed", "blocked"],
}


# ---------------------------------------------------------------------------
# agent() adapter — the only thing that differs from blog-loop.js's own runtime
# ---------------------------------------------------------------------------

class AgentError(Exception):
    pass


def call_agent(prompt, project_dir, schema=None, model=None, timeout=2400, log_fn=None):
    """Runs one fresh, stateless `claude -p` subprocess and returns the parsed
    structured_output (if schema given) or the raw `result` text (if not)."""
    cmd = [
        CLAUDE_BIN, "-p",
        "--output-format", "json",
        "--permission-mode", "bypassPermissions",
        "--no-session-persistence",
    ]
    if schema is not None:
        cmd += ["--json-schema", json.dumps(schema)]
    if model:
        cmd += ["--model", model]

    if log_fn:
        log_fn(f"agent call start (schema={'yes' if schema else 'no'}) prompt_len={len(prompt)}")

    try:
        proc = subprocess.run(
            cmd, cwd=project_dir, input=prompt, capture_output=True,
            text=True, encoding="utf-8", errors="replace", timeout=timeout,
        )
    except subprocess.TimeoutExpired as e:
        raise AgentError(f"timeout after {timeout}s") from e

    stdout = proc.stdout.strip()
    obj = None
    if stdout:
        try:
            obj = json.loads(stdout)
        except Exception:
            obj = None

    if obj is None:
        # No parseable JSON at all: nothing to salvage, regardless of exit code
        # (e.g. a hard crash, or a usage-limit message with no envelope).
        raise AgentError(f"claude exited {proc.returncode}, no parseable JSON; "
                          f"stderr={proc.stderr[-2000:]}; stdout_tail={proc.stdout[-2000:]}")

    usable = (obj.get("structured_output") is not None) if schema is not None else bool(obj.get("result"))

    if proc.returncode != 0 or obj.get("is_error"):
        if usable:
            # A nonzero exit / is_error can still carry a fully-formed answer (seen in
            # practice when the account's usage window resets mid-response but the
            # turn had already produced output). Salvage it instead of discarding real
            # work, but flag it loudly so the caller can decide whether to trust it.
            if log_fn:
                log_fn(f"WARNING: claude exited {proc.returncode} is_error={obj.get('is_error')} but "
                       f"returned usable output; using it anyway (result={str(obj.get('result',''))[:200]!r})")
        else:
            raise AgentError(f"claude exited {proc.returncode} is_error={obj.get('is_error')}: "
                              f"{obj.get('result') or proc.stderr[-1500:]}")

    if log_fn:
        cost = obj.get("total_cost_usd")
        log_fn(f"agent call done cost=${cost}")

    if schema is not None:
        so = obj.get("structured_output")
        if so is None:
            raise AgentError(f"no structured_output in response (result={obj.get('result', '')[:500]})")
        return so
    return obj.get("result")


def agent(prompt, opts, args, log_fn=None):
    """Mirrors blog-loop.js's `agent(prompt, {phase, label, schema})` call
    signature. `opts` may include 'schema'; phase/label are used for logging
    only (no native phase-tracking UI here)."""
    label = opts.get("label", "?")
    schema = opts.get("schema")
    if log_fn:
        log_fn(f"[{label}] starting")
    try:
        result = call_agent(prompt, args["projectDir"], schema=schema,
                             model=args.get("model"), log_fn=log_fn)
    except AgentError as e:
        if log_fn:
            log_fn(f"[{label}] FAILED: {e}")
        return None
    if log_fn:
        log_fn(f"[{label}] ok")
    return result


# ---------------------------------------------------------------------------
# Prompt builders (ported verbatim from blog-loop.js)
# ---------------------------------------------------------------------------

def project_context_block(args):
    return "\n".join([
        "--- PROJECT CONTEXT ---",
        f"Project root: {args['projectDir']}",
        "",
        "HARD RULES (from CLAUDE.md):",
        args.get("hardRules") or "(none provided)",
        "",
        "CTA FRAMEWORK (from docs/blog-strategy.md):",
        args.get("ctaFramework") or "(none provided)",
        "",
    ])


def item_block(item):
    return "\n".join([
        "--- ITEM ---",
        "```json",
        json.dumps(item, indent=2, ensure_ascii=False),
        "```",
        "",
    ])


def config_block(config):
    return "\n".join([
        "--- CONFIG ---",
        "```json",
        json.dumps(config, indent=2, ensure_ascii=False),
        "```",
        "",
    ])


def brief_prompt(item, args):
    config = args["config"]
    brief_path = f"{args['projectDir']}/{config['briefDir']}/{item['slug']}-brief.md"
    return "\n".join([
        "FIRST: Read the blog-brief skill instructions from this file (use the Read tool):",
        f"  {args['skillMdPaths']['brief']}",
        "Apply that skill exactly. Then continue with the project context below.",
        "",
        project_context_block(args),
        item_block(item),
        config_block(config),
        "--- TASK ---",
        f"Run the blog-brief workflow on the item. Save the brief to: {brief_path}",
        "",
        "CANNIBALIZATION PRE-FLIGHT (hard gate):",
        f"Before writing the brief, scan {args['projectDir']}/{config['blogDir']}/ for any existing "
        f"post that targets the same primary keyword or near-identical sub-intent as item.target_keyword "
        f"({item['target_keyword']}). If overlap exists AND this post does not introduce a unique angle, "
        "set cannibalization_detected=true with reason. Otherwise proceed and save the brief.",
        "",
        "Return ONLY the JSON via StructuredOutput.",
    ])


def write_prompt(brief_result, item, args):
    config = args["config"]
    ext = config.get("fileExtension", "md")
    post_path = f"{args['projectDir']}/{config['blogDir']}/{item['slug']}.{ext}"
    fm = config.get("frontmatter", {}).get("fields")
    fm_fields = ", ".join(fm) if isinstance(fm, list) and fm else \
        "title, description, date, lastUpdated, author, tags, coverImage, coverImageAlt, ogImage"
    cta_pattern = config.get("ctaPattern") or "[INTERNAL-LINK: ... -> /get-started?source=blog&slug=...]"
    return "\n".join([
        "FIRST: Read the blog-write skill instructions from this file (use the Read tool):",
        f"  {args['skillMdPaths']['write']}",
        "Apply that skill exactly. Then continue with the project context below.",
        "",
        project_context_block(args),
        item_block(item),
        f"Brief is saved at: {brief_result['path']}",
        f"Save the post to: {post_path}",
        f"Target publish date: {item.get('publish_date')}",
        f"Target lastUpdated:  {item.get('publish_date')}",
        f"Target author slug:  {item.get('author')}",
        "",
        f"FRONTMATTER CONTRACT (exact keys the project blog engine parses; use these and no others as "
        f"top-level required keys): {fm_fields}",
        "",
        "POST-WRITE COUNTERS (compute and return):",
        "- word_count_body: words in body (exclude frontmatter, code blocks, [INTERNAL-LINK ...], [CHART:...])",
        "- em_dash_count: occurrences of U+2014",
        "- tax_phrase_count: case-insensitive matches of (tax credit|ITC|Section 25D|federal tax|30% credit|rebate|incentive)",
        f"- cta_count: number of CTAs matching the project pattern: {cta_pattern}",
        "- internal_link_count: total markdown internal links",
        f"- frontmatter_complete: all of these present: {fm_fields}",
        "",
        "Return ONLY the JSON via StructuredOutput.",
    ])


def rewrite_prompt(item, args, feedback, post_path):
    feedback_text = feedback if isinstance(feedback, str) else json.dumps(feedback, indent=2, ensure_ascii=False)
    return "\n".join([
        "FIRST: Read the blog-rewrite skill instructions from this file (use the Read tool):",
        f"  {args['skillMdPaths']['rewrite']}",
        "Apply that skill exactly. Then continue.",
        "",
        project_context_block(args),
        item_block(item),
        f"Post path: {post_path}",
        "",
        "--- FEEDBACK TO APPLY ---",
        feedback_text,
        "",
        "Apply the fixes IN PLACE. Do not change the slug or filename. Return the JSON via StructuredOutput.",
    ])


def staging_dir(item, args):
    return f"{args['projectDir']}/.blog-loop-staging/{item['slug']}"


def hero_prompt(write_result, item, args):
    config = args["config"]
    img_format = config["hero"].get("format", "webp")
    final_hero_path = f"{args['projectDir']}/{config['imageDir']}/{item['slug']}-hero.{img_format}"
    staging = staging_dir(item, args)
    brief_path = f"{args['projectDir']}/{config['briefDir']}/{item['slug']}-brief.md"
    tags = ",".join(item.get("secondary_keywords", [])) if isinstance(item.get("secondary_keywords"), list) else ""
    size = config["hero"]["size"]
    return "\n".join([
        "You are the hero-image stage of the blog-loop pipeline.",
        "",
        project_context_block(args),
        item_block(item),
        f"Brief:             {brief_path}",
        f"Post:              {write_result['path']}",
        f"Staging dir:       {staging}",
        f"Final hero path:   {final_hero_path}",
        f"Hero topic:        {item['title']}",
        f"Hero tags:         {tags}",
        f"Model:             {config['hero'].get('model')}",
        f"Final dimensions:  {size[0]}x{size[1]}",
        "",
        "--- TASK ---",
        f'1. mkdir -p "{staging}"',
        "2. Run: python ~/.claude/scripts/generate_hero.py \\",
        f'     --topic "{item["title"]}" \\',
        f'     --tags "{tags}" \\',
        f'     --out "{staging}" \\',
        f'     --width {size[0]} \\',
        f'     --height {size[1]} \\',
        f'     --model "{config["hero"].get("model")}" \\',
        "     --json",
        f'3. After it finishes, the script writes "{staging}/hero.<ext>" + "{staging}/hero-credit.txt".',
        f'4. Copy "{staging}/hero.{img_format}" -> "{final_hero_path}" (use cp; create the parent dir if needed).',
        f'5. (Fallback) If generate_hero.py fails or is missing: first check {args["projectDir"]}/CLAUDE.md for '
        "a project-documented hero-generation method and use it; otherwise fetch a CC-licensed stock photo "
        f"matching the topic (Openverse API needs no key), resize to the final dimensions and save at the final "
        f'path AND at "{staging}/hero.{img_format}", recording the credit in "{staging}/hero-credit.txt".',
        "",
        "Verify both the staging hero file and the final hero file exist with non-zero size, then return the "
        "JSON (path = final hero path).",
    ])


def schema_prompt(write_result, item, args):
    config = args["config"]
    schema_path = f"{args['projectDir']}/{config['schemaDir']}/{item['slug']}.schema.json"
    return "\n".join([
        "FIRST: Read the blog-schema skill instructions from this file (use the Read tool):",
        f"  {args['skillMdPaths']['schema']}",
        "Apply that skill exactly. Then continue.",
        "",
        project_context_block(args),
        item_block(item),
        f"Source post: {write_result['path']}",
        f"Save sidecar schema to: {schema_path}",
        "",
        "Required @graph entities at minimum:",
        "1. BlogPosting (with headline, description, datePublished, dateModified, inLanguage, wordCount, "
        "keywords, articleSection, articleBody summary, author ref, publisher ref, image ref, "
        "mainEntityOfPage, isPartOf blog, about Things)",
        "2. Person (author)",
        "3. Organization (publisher)",
        "4. Blog (parent)",
        "5. WebPage",
        "6. ImageObject (hero)",
        "7. BreadcrumbList (Home -> Blog -> Post)",
        "8. FAQPage (ONLY if the post actually has an FAQ section; never invent Q&A pairs)",
        "",
        "Return ONLY the JSON via StructuredOutput.",
    ])


def seo_prompt(write_result, schema_result, item, args):
    return "\n".join([
        "FIRST: Read the blog-seo-check skill instructions from this file (use the Read tool):",
        f"  {args['skillMdPaths']['seoCheck']}",
        "Apply that skill exactly. Then continue.",
        "",
        project_context_block(args),
        item_block(item),
        f"Source post: {write_result['path']}",
        f"Sidecar schema: {schema_result['path']}",
        "",
        "Run the full SEO check. If any CRITICAL fails are found, apply fixes in place via Edit and set "
        "fixes_applied=true.",
        "Return ONLY the JSON via StructuredOutput.",
    ])


def audit_prompt(write_result, item, args, prev_issues):
    return "\n".join([
        "FIRST: Read the blog-audit skill instructions from this file (use the Read tool):",
        f"  {args['skillMdPaths']['audit']}",
        "Apply that skill exactly. Then continue.",
        "",
        project_context_block(args),
        item_block(item),
        f"Source post: {write_result['path']}",
        (f"\nPREVIOUS AUDIT ISSUES (already attempted to fix):\n{json.dumps(prev_issues, indent=2, ensure_ascii=False)}\n"
         if prev_issues else ""),
        "Score the post with the 5-category 100-point system. Required threshold: 70. Return ONLY the JSON via "
        "StructuredOutput.",
    ])


def factcheck_prompt(write_result, item, args, prev_failing):
    return "\n".join([
        "FIRST: Read the blog-factcheck skill instructions from this file (use the Read tool):",
        f"  {args['skillMdPaths']['factcheck']}",
        "Apply that skill exactly. Then continue.",
        "",
        project_context_block(args),
        item_block(item),
        f"Source post: {write_result['path']}",
        f"Verified-sources library (if present): {args['projectDir']}/docs/blog-fontes-verificadas.md",
        (f"\nPREVIOUS FAILING CLAIMS (already attempted to fix):\n{json.dumps(prev_failing, indent=2, ensure_ascii=False)}\n"
         if prev_failing else ""),
        "--- TASK (blocking gate) ---",
        "Extract every statistical claim in the post that carries an inline citation (a markdown link / URL as "
        "its source). For EACH such CITED claim, fetch the cited URL via WebFetch and check whether the claimed "
        "number appears literally on the page in a matching context. Assign a match score per the blog-factcheck "
        "rubric (1.0 exact, 0.7-0.9 paraphrase, 0.3-0.6 weak, 0.0 not found).",
        "",
        "GATE LOGIC:",
        "- A CITED claim scoring < 0.7 means the URL does NOT support the number (fabricated or misattributed "
        "source). Add it to `failing`.",
        "- Set blocking=true if `failing` is non-empty.",
        "- Uncited numbers (statistics with NO source URL) are NOT a factcheck failure here: do not add them to "
        "`failing`. Count them in `uncited_count` and mention in `summary`.",
        "- Process at most 10 URLs (per the skill limit). If more cited claims exist, verify the first 10 and "
        "note the remainder in `summary`.",
        "",
        "Return ONLY the JSON via StructuredOutput (checked = cited claims examined, verified = those >= 0.7, "
        "failing = the sub-0.7 list, uncited_count, blocking).",
    ])


def preflight_prompt(write_result, schema_result, hero_result, item, args):
    config = args["config"]
    gates = config.get("preflightGates", [1, 2, 5])
    staging = staging_dir(item, args)
    img_format = config["hero"].get("format", "webp")
    gate_lines = [f'  python ~/.claude/scripts/blog_preflight.py --draft "{staging}" --gate {g} --json' for g in gates]
    return "\n".join([
        "You are the preflight stage of the blog-loop pipeline. Assemble the v1.9.1 draft folder and run "
        "blog_preflight.py.",
        "",
        project_context_block(args),
        item_block(item),
        f"Post path (source):    {write_result['path']}",
        f"Schema path (source):  {schema_result['path']}",
        f"Hero path (source):    {hero_result['path']}",
        f"Staging draft dir:     {staging}",
        f"Gates to run:          {gates}",
        "",
        "--- TASK ---",
        "STEP 1 -- Assemble the draft folder (blog_preflight.py expects a v1.9.x draft layout):",
        f'  mkdir -p "{staging}"',
        f'  cp "{write_result["path"]}" "{staging}/post.md"',
        f'  cp "{hero_result["path"]}"  "{staging}/hero.{img_format}"',
        f'  cp "{schema_result["path"]}" "{staging}/schema.json"',
        "",
        "STEP 2 -- Render HTML + PDF into the staging dir (required for Gate 2):",
        f'  python ~/.claude/scripts/blog_render.py --md "{staging}/post.md" --out-dir "{staging}" --hero "hero.{img_format}" --json',
        "",
        "STEP 3 -- Run each gate sequentially:",
        *gate_lines,
        "",
        "STEP 4 -- Parse each gate JSON output. A gate that returns blocked=true or violations[] non-empty "
        "counts as failed.",
        "",
        "STEP 5 -- If any gate is blocked, attempt ONE in-place fix:",
        "  - Edit the source post at writeResult.path (NOT the staging copy)",
        f'  - Re-copy: cp "{write_result["path"]}" "{staging}/post.md"',
        f'  - Re-render: python ~/.claude/scripts/blog_render.py --md "{staging}/post.md" --out-dir "{staging}" --hero "hero.{img_format}" --json',
        "  - Re-run the failing gate(s).",
        "",
        "Aggregate ALL gate runs into the result schema (gates_run = list of gate numbers attempted; blocked = "
        "true if any gate STILL blocked after fix attempt; violations = aggregated; warnings = informational "
        "only).",
        "",
        "Return ONLY the JSON via StructuredOutput.",
    ])


# ---------------------------------------------------------------------------
# Per-item pipeline (ported verbatim from runItemPipeline() in blog-loop.js)
# ---------------------------------------------------------------------------

def skipped(slug, reason):
    return {"slug": slug, "status": "failed", "score": None, "reason": reason, "warnings": [reason]}


def extract_frontmatter_field(post_path, field):
    """Best-effort read of a simple `field: "value"` line from a post's YAML
    frontmatter (between the leading --- ... --- block). Used as a fallback
    when an item has no coverImage of its own but the write stage already
    picked one into the post's frontmatter."""
    try:
        with open(post_path, "r", encoding="utf-8") as f:
            text = f.read()
    except OSError:
        return None
    if not text.startswith("---"):
        return None
    end = text.find("\n---", 3)
    fm = text[3:end] if end != -1 else text[3:3000]
    import re
    m = re.search(rf'^\s*{field}\s*:\s*["\']?([^"\'\n]+)["\']?\s*$', fm, re.MULTILINE)
    return m.group(1).strip() if m else None


def run_item_pipeline(item, args, log_fn=None):
    slug = item["slug"]
    config = args["config"]
    warnings = []
    rewrites = 0

    def A(prompt, opts):
        return agent(prompt, opts, args, log_fn=log_fn)

    # Resume support: an item carrying `_resume` with already-completed brief/write
    # results skips those (costly) stages and picks the pipeline back up from Hero
    # onward. Used to recover a run that failed on a later stage without re-paying
    # for brief+write.
    resume = item.get("_resume") or {}
    if resume.get("brief") and resume.get("write"):
        brief_result = resume["brief"]
        write_result = resume["write"]
        if log_fn:
            log_fn("resumed from prior brief+write results, skipping those stages")
    else:
        brief_result = A(brief_prompt(item, args), {"phase": "Brief", "label": f"brief:{slug}", "schema": BRIEF_RESULT_SCHEMA})
        if not brief_result or not brief_result.get("ok"):
            return skipped(slug, "brief_failed")
        if brief_result.get("cannibalization_detected"):
            return {"slug": slug, "status": "failed", "score": None,
                    "reason": f"cannibalization: {brief_result.get('cannibalization_reason', 'overlap detected')}",
                    "warnings": ["cannibalization"]}

        write_result = A(write_prompt(brief_result, item, args), {"phase": "Write", "label": f"write:{slug}", "schema": WRITE_RESULT_SCHEMA})
        if not write_result or not write_result.get("ok"):
            return skipped(slug, "write_failed")

        tax_violation = (not config.get("allowTaxLanguage")) and (write_result.get("tax_phrase_count") or 0) > 0
        em_dash_count = write_result.get("em_dash_count") or 0
        if em_dash_count > 0 or tax_violation:
            warnings.append(f"hard_rule_violation_pre_rewrite em={em_dash_count} tax={write_result.get('tax_phrase_count')} "
                             f"taxAllowed={bool(config.get('allowTaxLanguage'))}")
            issues = []
            if em_dash_count > 0:
                issues.append({"severity": "CRITICAL", "issue": f"em dash count = {em_dash_count}",
                                "fix": "replace every U+2014 with comma, period, or colon. Do not introduce new ones."})
            if tax_violation:
                issues.append({"severity": "CRITICAL", "issue": f"tax phrase count = {write_result.get('tax_phrase_count')}",
                                "fix": "remove every tax-credit reference (ITC, Section 25D, federal tax, rebate, "
                                       "incentive). Replace with non-tax framing or drop."})
            A(rewrite_prompt(item, args, {"issues": issues}, write_result["path"]), {"phase": "Write", "label": f"rewrite:hardrules:{slug}"})
            rewrites += 1

        word_target = (item.get("word_count") or brief_result.get("word_target") or 1500) * 0.9
        if (write_result.get("word_count_body") or 0) < word_target:
            warnings.append(f"underweight_body wc={write_result.get('word_count_body')} target={word_target}")
            A(rewrite_prompt(item, args, f"Expand the body to at least {item.get('word_count')} words. Add depth to "
                              "weakest H2 sections.", write_result["path"]),
              {"phase": "Write", "label": f"rewrite:wordcount:{slug}"})
            rewrites += 1

    hero_enabled = (not config.get("hero")) or config["hero"].get("enabled") is not False
    if hero_enabled:
        hero_result = A(hero_prompt(write_result, item, args), {"phase": "Hero", "label": f"hero:{slug}", "schema": HERO_RESULT_SCHEMA})
        if not hero_result or not hero_result.get("ok"):
            return skipped(slug, "hero_failed")
    else:
        cover = item.get("coverImage") or (item.get("inlineImages") or [None])[0] \
            or extract_frontmatter_field(write_result["path"], "coverImage")
        if not cover:
            return skipped(slug, "hero_disabled_no_cover")
        public_dir = config.get("publicDir", "public")
        cover_fs_path = f"{args['projectDir']}/{public_dir}{'' if cover.startswith('/') else '/'}{cover}" \
            if not os.path.isabs(cover) else cover
        hero_result = {"ok": True, "path": cover_fs_path, "source": "real-photo-bank"}

    if resume.get("schema"):
        schema_result = resume["schema"]
        if log_fn:
            log_fn("resumed from prior schema result, skipping that stage")
    else:
        schema_result = A(schema_prompt(write_result, item, args), {"phase": "Schema", "label": f"schema:{slug}", "schema": SCHEMA_RESULT_SCHEMA})
        if not schema_result or not schema_result.get("ok"):
            return skipped(slug, "schema_failed")

    seo_result = A(seo_prompt(write_result, schema_result, item, args), {"phase": "SEO check", "label": f"seo:{slug}", "schema": SEO_RESULT_SCHEMA})
    if not seo_result:
        return skipped(slug, "seo_failed")
    if not seo_result.get("passed") and (seo_result.get("critical_count") or 0) > 0:
        A(rewrite_prompt(item, args, {"issues": [{"severity": "CRITICAL", "issue": "SEO critical fails",
                                                    "fix": seo_result.get("report_summary")}]}, write_result["path"]),
          {"phase": "SEO check", "label": f"seo-rewrite:{slug}"})
        rewrites += 1
        seo_result = A(seo_prompt(write_result, schema_result, item, args), {"phase": "SEO check", "label": f"seo:retry:{slug}", "schema": SEO_RESULT_SCHEMA})
        if not seo_result or (not seo_result.get("passed") and (seo_result.get("critical_count") or 0) > 0):
            return {"slug": slug, "status": "failed", "score": None, "reason": "seo_critical_persisted",
                    "warnings": warnings, "rewrites_applied": rewrites}

    score = 0
    attempts = 0
    prev_issues = None
    audit_result = None
    while attempts < 3:
        audit_result = A(audit_prompt(write_result, item, args, prev_issues), {"phase": "Audit", "label": f"audit:{slug}#{attempts}", "schema": AUDIT_RESULT_SCHEMA})
        if not audit_result:
            return {"slug": slug, "status": "failed", "score": None, "reason": "audit_returned_null",
                    "warnings": warnings, "rewrites_applied": rewrites}
        score = audit_result.get("score") or 0
        if score >= 70:
            break
        if attempts >= 2:
            break
        A(rewrite_prompt(item, args, audit_result, write_result["path"]), {"phase": "Audit", "label": f"rewrite:audit:{slug}#{attempts}"})
        rewrites += 1
        prev_issues = audit_result.get("issues")
        attempts += 1
    if score < 70:
        return {"slug": slug, "status": "failed", "score": score, "reason": "audit_below_70_after_retries",
                "warnings": warnings, "rewrites_applied": rewrites}

    factcheck_result = None
    if config.get("factcheck", {}).get("enabled"):
        factcheck_result = A(factcheck_prompt(write_result, item, args, None), {"phase": "Factcheck", "label": f"factcheck:{slug}", "schema": FACTCHECK_RESULT_SCHEMA})
        if not factcheck_result:
            return {"slug": slug, "status": "failed", "score": score, "reason": "factcheck_returned_null",
                    "warnings": warnings, "rewrites_applied": rewrites}
        if factcheck_result.get("blocking"):
            warnings.append(f"factcheck_failing_pre_rewrite n={len(factcheck_result.get('failing') or [])}")
            A(rewrite_prompt(item, args, {"issues": [{
                "severity": "CRITICAL",
                "issue": "cited statistics do not match their source URLs (fabricated or misattributed)",
                "fix": "For EACH failing claim: either replace it with a source that literally supports the "
                       "number (verify by WebFetch first; prefer sources from the project verified-sources "
                       "library if present, e.g. docs/blog-fontes-verificadas.md, or newly verified ones), or "
                       "remove the citation and reframe as first-hand experience / qualitative. Never keep a "
                       "citation whose URL does not contain the number, and never substitute a statistic from "
                       "an adjacent topic as if it covered this one.",
                "failing": factcheck_result.get("failing"),
            }]}, write_result["path"]), {"phase": "Factcheck", "label": f"rewrite:factcheck:{slug}"})
            rewrites += 1
            factcheck_result = A(factcheck_prompt(write_result, item, args, factcheck_result.get("failing")),
                                  {"phase": "Factcheck", "label": f"factcheck:retry:{slug}", "schema": FACTCHECK_RESULT_SCHEMA})
            if not factcheck_result or factcheck_result.get("blocking"):
                return {"slug": slug, "status": "failed", "score": score, "reason": "factcheck_failing_persisted",
                        "warnings": warnings, "rewrites_applied": rewrites, "factcheck": factcheck_result}

    preflight_result = None
    if (not config.get("preflight")) or config["preflight"].get("enabled") is not False:
        preflight_result = A(preflight_prompt(write_result, schema_result, hero_result, item, args),
                              {"phase": "Preflight", "label": f"preflight:{slug}", "schema": PREFLIGHT_RESULT_SCHEMA})
        if not preflight_result or preflight_result.get("blocked"):
            return {"slug": slug, "status": "failed", "score": score, "reason": "preflight_blocked",
                    "warnings": warnings, "rewrites_applied": rewrites, "preflight": preflight_result}

    return {
        "slug": slug,
        "status": "ok",
        "score": score,
        "briefPath": brief_result["path"],
        "postPath": write_result["path"],
        "schemaPath": schema_result["path"],
        "heroPath": hero_result["path"],
        "rewrites_applied": rewrites,
        "factcheck": ({"checked": factcheck_result.get("checked"), "verified": factcheck_result.get("verified"),
                        "uncited_count": factcheck_result.get("uncited_count")} if factcheck_result else None),
        "warnings": warnings,
        "item": item,
    }


# ---------------------------------------------------------------------------
# Batch runner + CLI entry point
# ---------------------------------------------------------------------------

def make_log_fn(progress_file, slug):
    if not progress_file:
        return None

    def _log(msg):
        line = json.dumps({"ts": time.time(), "slug": slug, "msg": msg}, ensure_ascii=False)
        try:
            with open(progress_file, "a", encoding="utf-8") as f:
                f.write(line + "\n")
        except Exception:
            pass
        print(f"[{slug}] {msg}", file=sys.stderr, flush=True)

    return _log


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--args-file", help="Path to a JSON file with the Workflow-style args object")
    ap.add_argument("--args-json", help="The Workflow-style args object as a raw JSON string")
    ns = ap.parse_args()

    if ns.args_file:
        with open(ns.args_file, "r", encoding="utf-8") as f:
            args = json.load(f)
    elif ns.args_json:
        args = json.loads(ns.args_json)
    else:
        print(json.dumps({"error": "must pass --args-file or --args-json"}))
        sys.exit(2)

    batch_items = args.get("batchItems") or []
    if not batch_items:
        print(json.dumps({"results": [], "totalItems": 0, "message": "no items to process"}))
        return

    concurrency = args.get("concurrency") or min(len(batch_items), args.get("config", {}).get("batchSize", 2), 3)
    progress_file = args.get("progressFile")

    print(f"blog-loop-agent-cli start: {len(batch_items)} items, projectDir={args.get('projectDir')}, "
          f"concurrency={concurrency}", file=sys.stderr)

    results = []
    with ThreadPoolExecutor(max_workers=max(1, concurrency)) as pool:
        futures = {}
        for item in batch_items:
            log_fn = make_log_fn(progress_file, item["slug"])
            fut = pool.submit(run_item_pipeline, item, args, log_fn)
            futures[fut] = item["slug"]
        for fut in as_completed(futures):
            slug = futures[fut]
            try:
                results.append(fut.result())
            except Exception as e:
                results.append({"slug": slug, "status": "failed", "score": None,
                                 "reason": f"pipeline_exception: {e}",
                                 "warnings": [traceback.format_exc()[-1500:]]})

    summary = {
        "totalItems": len(batch_items),
        "ok": sum(1 for r in results if r and r.get("status") == "ok"),
        "failed": sum(1 for r in results if r and r.get("status") == "failed"),
        "null_results": sum(1 for r in results if not r),
    }
    print(f"blog-loop-agent-cli done: ok={summary['ok']} failed={summary['failed']}", file=sys.stderr)

    print(json.dumps({"results": [r for r in results if r], "summary": summary,
                       "iterationId": args.get("iterationId")}, ensure_ascii=False))


if __name__ == "__main__":
    main()
