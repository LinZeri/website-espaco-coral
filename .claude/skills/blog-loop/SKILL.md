---
name: blog-loop
description: |
  Autonomous blog production loop. Generalizes the per-project blog-loop-orchestrator
  into a global skill that drives a parallel-batch pipeline (brief → write → hero →
  schema → SEO check → audit → factcheck → preflight → commit → push) by reading the latest
  blog-* skills at runtime and injecting their markdown into Workflow agents.
  Reads project config from .blog-loop.config.json + CLAUDE.md + docs/blog-strategy.md.
  Auto-replenishes the queue via the blog-strategy skill. Escalates only via
  PushNotification when a cluster genuinely exhausts. Designed to be 100% autonomous
  across iterations via ScheduleWakeup.
metadata:
  version: 1.0.0
  category: blog
  invocation:
    - /blog-loop
    - /blog-loop run
    - /blog-loop run --project=. --batch=5 --reschedule=auto
    - /blog-loop status
    - /blog-loop replenish
    - /blog-loop dry-run
---

# blog-loop — Autonomous Blog Production Skill

## What this skill does

Produces blog posts end-to-end with zero human intervention between iterations. One
invocation can produce a batch of N posts in parallel via the Workflow tool, then
chain itself for the next batch via `ScheduleWakeup`.

### Factcheck gate (opt-in, off by default)

Between `audit` and `preflight` there is an optional **factcheck** stage that fetches
every cited source URL and blocks publication if a cited statistic does not appear on
its page (fabricated or misattributed citation, match score < 0.7). It is **off by
default** so existing projects are unaffected. Enable per project in
`.blog-loop.config.json`:

```json
"factcheck": { "enabled": true }
```

When enabled, the workflow reads `skillMdPaths.factcheck` (already wired in step 11)
and runs `blog-factcheck`; one rewrite attempt is made on failure, then the item fails
if any cited claim still does not match its URL. Uncited numbers are not blocked here
(that is an editorial matter for the writer + project diretrizes). This gate exists
because the write step alone does not verify that citations match their sources.

The skill is project-agnostic: it reads `<project>/.blog-loop.config.json` for
paths and behavior, `<project>/CLAUDE.md` for writing hard rules, and
`<project>/docs/blog-strategy.md` for cluster definitions and CTA framework.

## When to invoke this skill

- The user explicitly types `/blog-loop ...` or asks you to run the autonomous blog loop.
- A scheduled wake-up fires with this skill as the next-iteration target.
- You are the orchestrator of a previously approved blog production plan and the next
  step is to execute one batch.

## Argument shapes

```
/blog-loop                                       → run --project=. --batch=auto --reschedule=auto
/blog-loop run [--project=DIR] [--batch=N] [--reschedule=auto|off]
/blog-loop status [--project=DIR]                → prints queue/log summary, no work
/blog-loop replenish [--project=DIR] [--count=N] → only invokes blog-strategy replenish
/blog-loop dry-run [--project=DIR] [--batch=N]   → as run but skips git push
```

## Required project state

`<project>/.blog-loop.config.json` (optional; defaults via `blog_loop_helpers.py load-config`).

`<project>/CLAUDE.md` (required). Read the writing-rules block. If absent, abort with
PushNotification "missing CLAUDE.md hard rules — refusing to run unguarded".

`<project>/docs/blog-strategy.md` (required). Read the cluster definitions and CTA
framework. If absent, abort with PushNotification "missing strategy file".

`<project>/docs/blog-queue.json` (required). If absent, create it from the template
in `references/queue-template.json` and abort with notification.

## Preamble (always run before launching the workflow)

You MUST execute these steps in order, using the Bash + Read tools. Each step is a
short bash command or read; do not skip any.

### 1. Resolve project config

```bash
python ~/.claude/scripts/blog_loop_helpers.py load-config --project <project>
```

Capture the JSON output into the variable `CONFIG`. All subsequent paths derive
from this (e.g., `<project>/<CONFIG.queueFile>`).

### 2. Lock check + acquire

```bash
python ~/.claude/scripts/blog_loop_helpers.py check-lock \
    --lock <project>/<CONFIG.lockFile> --ttl 7200
```

If `{locked: true, stale: false}` → log warning, do NOT proceed. Schedule wakeup
in 30 minutes and exit.

If `{locked: false}` or `{locked: true, stale: true}` → acquire:

```bash
python ~/.claude/scripts/blog_loop_helpers.py acquire-lock \
    --lock <project>/<CONFIG.lockFile> --iteration <random-hex-8>
```

### 3. Recover stale in-progress

```bash
python ~/.claude/scripts/blog_loop_helpers.py recover-stale \
    --queue <project>/<CONFIG.queueFile> --ttl 7200
```

### 4. Branch sanity + pull

```bash
cd <project> && git rev-parse --abbrev-ref HEAD
```

If output != `CONFIG.branch` → release lock, abort with PushNotification
"wrong branch: expected X got Y". Do not reschedule.

```bash
cd <project> && git fetch origin <CONFIG.branch> && git pull --ff-only origin <CONFIG.branch>
```

If pull fails → release lock, abort with PushNotification "git pull failed".

### 5. Replenish queue if low

```bash
python ~/.claude/scripts/blog_loop_helpers.py replenish-check \
    --queue <project>/<CONFIG.queueFile> --batch-size <CONFIG.batchSize>
```

If `need_replenish: true`:

Invoke the `blog-strategy` skill with `replenish` action. Pass:
- `--strategy <project>/<CONFIG.strategyFile>`
- `--existing-posts <project>/<CONFIG.blogDir>`
- `--queue <project>/<CONFIG.queueFile>`
- `--count <count_to_add>`
- `--cluster auto`

If `blog-strategy` returns `{exhausted: true, cluster}`:
- Edit `<project>/<CONFIG.strategyFile>` to mark that cluster `closed`.
- PushNotification: "Cluster <cluster> exhausted in <project>: expand strategy.md".
- If after this no pending items remain → release lock, exit (no reschedule).

### 6. Pick batch

```bash
python ~/.claude/scripts/blog_loop_helpers.py pick-batch \
    --queue <project>/<CONFIG.queueFile> --n <CONFIG.batchSize>
```

Capture into `BATCH` (JSON array of items). If empty after replenishment → release
lock, exit, no reschedule.

### 7. Assign dates + authors

Let `PER_DAY = CONFIG.postsPerDay || 1` (how many posts may share one publish
date). Dates are always real calendar dates >= today: never backdate.

For each item in `BATCH`:
- If `item.publish_date` AND `item.author` are set → use as-is.
- Else: candidate date = the earliest weekday >= max(today, latest already
  assigned or scheduled future post date) that has fewer than `PER_DAY` items
  assigned to it (count queue items of ANY status with that publish_date,
  including ones assigned earlier in this same batch). Then:

```bash
python ~/.claude/scripts/blog_loop_helpers.py author-for-date \
    --queue <project>/<CONFIG.queueFile> --date <publish_date> --cap <PER_DAY>
```

  If it reports no eligible author (exit code 2) → bump publish_date to the
  next weekday and retry.
  Mark `item.publish_date` and `item.author` in the JSON.

### 8. Mark items in-progress

For each `item` in `BATCH`:

```bash
python ~/.claude/scripts/blog_loop_helpers.py mark-in-progress \
    --queue <project>/<CONFIG.queueFile> --slug <item.slug> --iteration <iteration-id>
```

### 9. Resolve skill markdown paths for injection

Do NOT read these into memory. The workflow passes each path to the relevant
stage agent, which reads its own skill file at runtime (keeps the orchestrator
context lean and always picks up the latest skill version on every iteration).

Collect the ABSOLUTE paths (the `~` shorthand does not expand inside the Read
tool, so resolve to a full path). On this machine:
- `C:\Users\Lin\.claude\skills\blog-brief\SKILL.md`
- `C:\Users\Lin\.claude\skills\blog-write\SKILL.md`
- `C:\Users\Lin\.claude\skills\blog-schema\SKILL.md`
- `C:\Users\Lin\.claude\skills\blog-seo-check\SKILL.md`
- `C:\Users\Lin\.claude\skills\blog-audit\SKILL.md`
- `C:\Users\Lin\.claude\skills\blog-rewrite\SKILL.md`
- `C:\Users\Lin\.claude\skills\blog-factcheck\SKILL.md`

### 10. Read project context for injection

- Read `<project>/CLAUDE.md` → extract the writing hard-rules block verbatim into
  `HARD_RULES`. Section names vary by project and language: look for "Writing rules",
  "Pricing", "Regras inegociáveis", "Regras", or any block that states non-negotiable
  content/formatting rules. If several qualify, concatenate them.
- Read `<project>/<CONFIG.strategyFile>` → extract the CTA section verbatim into
  `CTA_FRAMEWORK`. Look for "CTA Framework", "CTA", "Conversão" or equivalent; if the
  strategy has no such section, use the strategy's stated primary conversion action
  as a one-line CTA_FRAMEWORK instead of leaving it empty.

### 11. Launch workflow

```
Workflow({
  scriptPath: "~/.claude/workflows/blog-loop.js",
  args: {
    projectDir: "<absolute project path>",
    config: CONFIG,
    batchItems: BATCH,
    hardRules: HARD_RULES,
    ctaFramework: CTA_FRAMEWORK,
    skillMdPaths: {
      brief: "C:\\Users\\Lin\\.claude\\skills\\blog-brief\\SKILL.md",
      write: "C:\\Users\\Lin\\.claude\\skills\\blog-write\\SKILL.md",
      schema: "C:\\Users\\Lin\\.claude\\skills\\blog-schema\\SKILL.md",
      seoCheck: "C:\\Users\\Lin\\.claude\\skills\\blog-seo-check\\SKILL.md",
      audit: "C:\\Users\\Lin\\.claude\\skills\\blog-audit\\SKILL.md",
      rewrite: "C:\\Users\\Lin\\.claude\\skills\\blog-rewrite\\SKILL.md",
      factcheck: "C:\\Users\\Lin\\.claude\\skills\\blog-factcheck\\SKILL.md",
    },
    iterationId: <iteration-id>,
    dryRun: <exists docs/.blog-loop-dry-run>,
  }
})
```

Wait for completion. The workflow returns `{ results: [{ slug, status, score, ... }] }`.

### 12. Post-workflow per-item commit

Before any commit, if `CONFIG.verifyCommand` is set (e.g. `"npm run build"` for a
Next.js/MDX project), run it once from `<project>` with ALL produced files in the
working tree. If it fails: do not commit anything; attempt ONE fix pass on the
offending file(s) and re-run. If it still fails, mark every item of this batch
`failed` with reason `verify_command_failed` and notify.

For each result with `status: "ok"` (`<ext>` = `CONFIG.fileExtension`, default `md`):

```bash
cd <project>
git add <CONFIG.blogDir>/<slug>.<ext> <CONFIG.schemaDir>/<slug>.schema.json \
        <CONFIG.briefDir>/<slug>-brief.md <CONFIG.imageDir>/<slug>-hero.<img-ext>
git commit -m "$(cat <<'EOF'
blog: publish <slug> by <author> (scheduled <publish_date>)

Auto-generated via /blog-loop iteration <iteration-id>. Score: <score>/100.

<standard Co-Authored-By trailer of the current model/harness>
EOF
)"
```

Respect any project git rules in CLAUDE.md (account, e-mail, gh auth checks)
before committing or pushing.

If NOT dry-run:
```bash
git push origin <CONFIG.branch>
```

Capture `commit_sha` from `git rev-parse HEAD`. Then:

```bash
python ~/.claude/scripts/blog_loop_helpers.py mark-published \
    --queue <project>/<CONFIG.queueFile> --slug <slug> --score <score> \
    --commit <commit_sha> --date <publish_date>

python ~/.claude/scripts/blog_loop_helpers.py append-log \
    --log <project>/<CONFIG.logFile> --timestamp <ISO-now> --slug <slug> \
    --cluster <cluster> --author <author> --score <score> --rewrites <count> \
    --date <publish_date> --commit <commit_sha> --duration <wall-min> \
    --warnings "blog_loop_skill,batch_<n>"
```

For each result with `status: "failed"`:

```bash
python ~/.claude/scripts/blog_loop_helpers.py mark-failed \
    --queue <project>/<CONFIG.queueFile> --slug <slug> --error "<reason>"
```

And call `PushNotification("blog-loop failure: <slug> — <reason>")`.

### 13. Release lock + reschedule

```bash
python ~/.claude/scripts/blog_loop_helpers.py release-lock \
    --lock <project>/<CONFIG.lockFile>
```

If `reschedule=auto` AND queue has pending items remaining:

```
ScheduleWakeup({
  delaySeconds: <derived from CONFIG.scheduleCadence>,
  prompt: "/blog-loop run --project=<project> --batch=<CONFIG.batchSize>",
  reason: "next blog-loop iteration (cadence: <CONFIG.scheduleCadence>)"
})
```

Cadence map:
- `daily-09-central` → next 14:00 UTC (≈ 09:00 CDT / 08:00 CST)
- `every-4h` → 14400
- `continuous` → 60 (caps at runtime min)
- explicit seconds (integer string) → as-is

If queue is empty after this batch → do not reschedule. The blog-strategy
replenish path will be re-triggered the next time a human kicks the skill.

## Quality gates summary

| Gate | Auto-retry? | Failure mode |
|---|---|---|
| Cannibalization | No (1 chance) | `failed` + PushNotification |
| Hard rules (em-dash, banned phrases) | Yes (1 rewrite) | `failed` if still present |
| Frontmatter completeness | Yes (Edit fix) | `failed` if still incomplete |
| Word count ≥ 90% target | Yes (rewrite expand) | `failed` if still short |
| blog-seo-check pass | Yes (1 rewrite) | `failed` if critical remains |
| blog-audit score ≥ 70 | Yes (max 2 rewrites) | `failed` after 2 |
| preflight gates 1+2+5 | Yes (1 fix attempt) | `failed` if still blocked |

## Stop conditions (no reschedule)

- Wrong branch
- Pull failed
- All clusters exhausted
- Queue empty after replenish attempt
- Lock held by another live iteration

## References

- `references/config-schema.md` — full config schema and defaults
- `references/pipeline-contract.md` — per-stage I/O contract for the workflow
- `references/strategy-template.md` — starter template for a new project's `docs/blog-strategy.md`
- `references/queue-template.json` — starter queue file
- `~/.claude/workflows/blog-loop.js` — the workflow script
- `~/.claude/scripts/blog_loop_helpers.py` — Bash-facing helpers
- `~/.claude/scripts/blog_preflight.py` — gate runner (already exists)
- `~/.claude/scripts/blog_render.py` — markdown → HTML/PDF (already exists)
- `~/.claude/scripts/generate_hero.py` — Gemini hero image (already exists)
