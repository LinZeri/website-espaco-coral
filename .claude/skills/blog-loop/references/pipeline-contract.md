# Pipeline contract

Per-stage input/output contract for `~/.claude/workflows/blog-loop.js`. Each
stage is an `agent()` invocation that is given the ABSOLUTE PATH to the relevant
skill markdown (via `args.skillMdPaths`) and instructed to read it with the Read
tool at runtime, plus a structured output schema. Stages run pipelined per item;
items run in parallel.

Why path-injection and not content-injection: the stage agent reading its own
single skill file keeps the orchestrator context lean (it never loads the six
SKILL.md files itself) and guarantees the latest version of each skill is picked
up on every iteration, with no skill text frozen into either this script or the
preamble. The preamble (SKILL.md step 9/11) therefore passes `skillMdPaths`, not
file contents.

## Shared item shape

```typescript
type QueueItem = {
  id: string,               // "n9", "d5", "p4-hub", etc.
  slug: string,             // url slug
  title: string,
  template: string,         // "how-to-guide", "listicle", "case-study", ...
  target_keyword: string,
  secondary_keywords: string[],
  word_count: number,       // target, ±10% accepted
  internal_links: string[], // required CTAs/links to weave in
  cluster: string,          // "Neighborhood", "Persona", ... or pillar.spoke
  notes: string,            // free-form orchestrator hints
  publish_date: string,     // YYYY-MM-DD (assigned by preamble)
  author: string,           // (assigned by preamble)
  // managed by helpers:
  status: "pending" | "in_progress" | "published" | "failed",
  attempts: number,
  last_error: string | null,
  started_at: string | null,
  last_score: number | null
}
```

## Stage 1 — Brief

**Skill md path injected:** `args.skillMdPaths.brief` → `blog-brief/SKILL.md`

**Input prompt template:**
```
FIRST: Read the blog-brief skill instructions from this file (Read tool):
  <args.skillMdPaths.brief>
Apply that skill exactly. Then continue with the project context below.

--- PROJECT CONTEXT ---
HARD RULES (from CLAUDE.md):
<hardRules>

CTA FRAMEWORK (from blog-strategy.md):
<ctaFramework>

--- ITEM ---
<JSON.stringify(item, null, 2)>

--- OUTPUT ---
Write the full brief to: <projectDir>/<config.briefDir>/<item.slug>-brief.md
Return ONLY the JSON object via StructuredOutput conforming to the schema below.
```

**Output schema (`BRIEF_RESULT_SCHEMA`):**
```json
{
  "type": "object",
  "properties": {
    "ok": {"type": "boolean"},
    "path": {"type": "string"},
    "cannibalization_detected": {"type": "boolean"},
    "cannibalization_reason": {"type": "string"},
    "word_target": {"type": "number"},
    "notes": {"type": "string"}
  },
  "required": ["ok", "path"]
}
```

**Failure handling:**
- `cannibalization_detected: true` → pipeline aborts for this item, returns
  `{slug, status: "failed", reason: "cannibalization", details}`.
- File not written → workflow throws, item recorded as failed.

## Stage 2 — Write

**Skill md path injected (read at runtime):** `blog-write/SKILL.md`

**Input includes:**
- Brief path from Stage 1.
- Target publish date, lastUpdated, author from preamble.
- Hard rules + CTA framework.

**Output schema (`WRITE_RESULT_SCHEMA`):**
```json
{
  "type": "object",
  "properties": {
    "ok": {"type": "boolean"},
    "path": {"type": "string"},
    "word_count_body": {"type": "number"},
    "frontmatter_complete": {"type": "boolean"},
    "em_dash_count": {"type": "number"},
    "tax_phrase_count": {"type": "number"},
    "cta_count": {"type": "number"},
    "internal_link_count": {"type": "number"}
  },
  "required": ["ok", "path", "word_count_body"]
}
```

**Hard-rule gate after Stage 2 (in-workflow grep check via Bash):**
```bash
grep -c $'\xe2\x80\x94' <post path>   # em dash count
grep -ci -E "(tax credit|ITC|Section 25D|30% credit|federal tax)" <post path>
```
If either > 0, invoke `blog-rewrite` skill (Stage 2b) to remove. If still > 0
after one rewrite, mark item failed.

## Stage 3 — Hero

**Tool used:** Bash invoking `~/.claude/scripts/generate_hero.py`.

**Input prompt template (agent constructs hero prompt from brief + CTA):**
```
You are an image-prompt engineer. From the brief at <briefPath>, craft a
1-sentence hero image prompt suitable for Imagen 4.0:
- editorial photojournalism tone
- no text overlays
- 16:9 framing
- <project-specific style cues from strategy.md>

Then run:
  python ~/.claude/scripts/generate_hero.py \
    --prompt "<crafted>" \
    --out <projectDir>/<config.imageDir>/<slug>-hero.<config.hero.format> \
    --model <config.hero.model> \
    --aspect <config.hero.aspectRatio> \
    --size <w>x<h>
```

**Output schema (`HERO_RESULT_SCHEMA`):**
```json
{
  "type": "object",
  "properties": {
    "ok": {"type": "boolean"},
    "path": {"type": "string"},
    "width": {"type": "number"},
    "height": {"type": "number"},
    "format": {"type": "string"}
  },
  "required": ["ok", "path"]
}
```

If `generate_hero.py` is absent, agent falls back to the in-prompt Python
snippet from CLAUDE.md (loads `../.env`, calls Gemini directly, saves WebP).

## Stage 4 — Schema

**Skill md path injected (read at runtime):** `blog-schema/SKILL.md`

**Output schema (`SCHEMA_RESULT_SCHEMA`):**
```json
{
  "type": "object",
  "properties": {
    "ok": {"type": "boolean"},
    "path": {"type": "string"},
    "entity_count": {"type": "number"},
    "has_faq": {"type": "boolean"},
    "has_breadcrumb": {"type": "boolean"}
  },
  "required": ["ok", "path"]
}
```

## Stage 5 — SEO check

**Skill md path injected (read at runtime):** `blog-seo-check/SKILL.md`

**Output schema (`SEO_RESULT_SCHEMA`):**
```json
{
  "type": "object",
  "properties": {
    "passed": {"type": "boolean"},
    "critical_count": {"type": "number"},
    "high_count": {"type": "number"},
    "fixes_applied": {"type": "boolean"},
    "report_summary": {"type": "string"}
  },
  "required": ["passed", "critical_count"]
}
```

If `critical_count > 0`, the workflow invokes the `blog-rewrite` skill md to
fix and re-runs Stage 5 ONE time. Still failing = item marked failed.

## Stage 6 — Audit (with auto-rewrite loop)

**Skill md path injected (read at runtime):** `blog-audit/SKILL.md` + `blog-rewrite/SKILL.md`

**Loop:**
```
attempt = 0
while attempt < 3:
  audit = agent(blog-audit prompt)
  if audit.score >= 70: break
  if attempt < 2:
    rewrite = agent(blog-rewrite prompt with audit feedback)
  attempt += 1
```

**Output schema (`AUDIT_RESULT_SCHEMA`):**
```json
{
  "type": "object",
  "properties": {
    "score": {"type": "number"},
    "category_scores": {
      "type": "object",
      "properties": {
        "content_quality": {"type": "number"},
        "seo_optimization": {"type": "number"},
        "eeat": {"type": "number"},
        "technical": {"type": "number"},
        "ai_citation": {"type": "number"}
      }
    },
    "attempts": {"type": "number"},
    "rewrites_applied": {"type": "number"},
    "issues": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "severity": {"type": "string"},
          "category": {"type": "string"},
          "issue": {"type": "string"},
          "fix": {"type": "string"}
        }
      }
    }
  },
  "required": ["score", "attempts"]
}
```

## Stage 7 — Preflight

**Tool used:** Bash invoking `~/.claude/scripts/blog_preflight.py`.

**Behavior:** runs gates from `config.preflightGates` (default `[1, 2, 5]`).

**Output schema (`PREFLIGHT_RESULT_SCHEMA`):**
```json
{
  "type": "object",
  "properties": {
    "passed": {"type": "boolean"},
    "gates_run": {"type": "array", "items": {"type": "number"}},
    "blocked": {"type": "boolean"},
    "violations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "gate": {"type": "number"},
          "rule": {"type": "string"},
          "detail": {"type": "string"}
        }
      }
    },
    "warnings": {"type": "array", "items": {"type": "string"}}
  },
  "required": ["passed", "blocked"]
}
```

If `blocked: true` after one fix attempt → item marked failed.

## Final item result (returned by pipeline)

```typescript
type ItemResult = {
  slug: string,
  status: "ok" | "failed",
  score: number | null,
  reason?: string,
  briefPath: string,
  postPath: string,
  schemaPath: string,
  heroPath: string,
  attempts: { brief: number, write: number, audit: number, preflight: number },
  rewrites_applied: number,
  duration_seconds: number,
  warnings: string[]
}
```

The SKILL.md preamble uses this to drive commit/push/mark-published or
mark-failed loops, then ScheduleWakeup.
