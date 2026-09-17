# .blog-loop.config.json schema

Per-project config for the `/blog-loop` skill. Lives at `<project>/.blog-loop.config.json`.
All fields optional; defaults applied by `blog_loop_helpers.py load-config`.

## Schema

```jsonc
{
  // Git operations
  "branch": "vercel-deploy",       // working branch; loop refuses to run elsewhere
  "remote": "origin",              // git remote name

  // Paths (relative to project root)
  "blogDir": "blog/posts",
  "schemaDir": "blog/schemas",
  "briefDir": "briefs",
  "imageDir": "public/blog/images",
  "queueFile": "docs/blog-queue.json",
  "logFile": "docs/blog-loop-log.md",
  "strategyFile": "docs/blog-strategy.md",
  "lockFile": "docs/.blog-loop.lock",
  "drySentinel": "docs/.blog-loop-dry-run",

  // Project blog-engine contract (v1.1 — all optional, defaults = legacy behavior)
  "fileExtension": "md",           // post file extension: "md" | "mdx" | ...
  "frontmatter": {
    "fields": null                 // exact frontmatter keys the project's engine parses,
                                   // e.g. ["titulo","descricao","data","autor","imagem"]
                                   // null → legacy English field list
  },
  "ctaPattern": null,              // human-readable CTA convention for the cta_count
                                   // counter, e.g. "markdown link to wa.me with UTM".
                                   // null → legacy [INTERNAL-LINK ...] pattern
  "verifyCommand": null,           // command run once per batch before committing,
                                   // e.g. "npm run build" for Next.js/MDX projects.
                                   // Non-zero exit blocks the whole batch.
  "allowTaxLanguage": false,       // true disables the legacy tax-phrase hard gate
                                   // (irrelevant outside US-solar-style projects)

  // Batch behavior
  "batchSize": 5,                  // items per workflow fire
  "replenishThresholdMultiplier": 2, // replenish when pending < batchSize * this
  "postsPerDay": 1,                // publish dates per weekday (schedule compression);
                                   // also passed as --cap to author-for-date.
                                   // Dates are always >= today; backdating is not supported

  // Scheduling
  "reschedule": "auto",            // auto | off
  "scheduleCadence": "daily-09-central",
                                   // daily-09-central | every-4h | continuous | <int seconds>

  // Quality gates
  "preflightGates": [1, 2, 5],     // which blog_preflight.py --gate N to enforce
                                   // 1=capabilities 2=format 3=visual 4=content 5=assets

  // Hero generation
  "hero": {
    "enabled": true,               // false = skip AI hero; item.coverImage becomes the hero
    "model": "imagen-4.0-generate-001",
    "aspectRatio": "16:9",
    "format": "webp",              // saved as <slug>-hero.<format>
    "size": [1200, 630]            // final dimensions after PIL resize
  },

  // Optional stages
  "factcheck": { "enabled": false }, // blocking citation verification (see SKILL.md)
  "preflight": { "enabled": true },  // false = skip blog_preflight.py packaging gates
                                     // (use with verifyCommand on app-build projects)

  // Deploy
  "deploy": {
    "mode": "auto-push",           // auto-push | pr-only | manual
    "prTarget": null               // if pr-only: target branch for the PR (e.g. "main")
  },

  // Escalation
  "escalationChannel": "push-notification"  // push-notification | log-only
}
```

## Defaults

If `.blog-loop.config.json` is absent, every field above takes its shown default.

## Per-project recipes

### Eos-style (vercel-deploy auto-push)
```json
{
  "branch": "vercel-deploy",
  "batchSize": 5,
  "scheduleCadence": "daily-09-central",
  "deploy": { "mode": "auto-push", "prTarget": null }
}
```

### Conservative (PR to main with human review)
```json
{
  "branch": "blog-staging",
  "batchSize": 3,
  "deploy": { "mode": "pr-only", "prTarget": "main" },
  "escalationChannel": "push-notification"
}
```

### Maximum quality (all 5 preflight gates)
```json
{
  "preflightGates": [1, 2, 3, 4, 5],
  "batchSize": 2
}
```

### High velocity (continuous loop)
```json
{
  "batchSize": 10,
  "scheduleCadence": "continuous",
  "replenishThresholdMultiplier": 3
}
```

### Next.js App Router + MDX (Etuos-style: build is the real gate)
```json
{
  "branch": "main",
  "blogDir": "content/blog",
  "fileExtension": "mdx",
  "schemaDir": "content/blog/schemas",
  "imageDir": "public/images/blog",
  "frontmatter": { "fields": ["titulo", "descricao", "data", "autor", "imagem"] },
  "ctaPattern": "link para wa.me da Etuos no fim do artigo",
  "preflight": { "enabled": false },
  "verifyCommand": "npm run build",
  "factcheck": { "enabled": true },
  "allowTaxLanguage": true
}
```
