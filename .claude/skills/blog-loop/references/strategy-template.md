# [Project Name] Blog Strategy

Starter template for a new project's `docs/blog-strategy.md`. The `/blog-loop`
skill reads the CTA Framework section verbatim, and `/blog-strategy replenish`
reads cluster definitions to auto-fill queue items.

---

## Project Snapshot

- **Business:** [What the company does, who buys]
- **Site URL:** [https://example.com]
- **Primary funnel:** [Cold blog → lead → quote → sale, or similar]
- **Target geography:** [Region or "global"]
- **Primary CTA:** `/get-started` (or `/contact`, `/book-demo`, etc.)
- **Authors:** [list of author slugs that rotate in queue.json `authors`]

## North Star Metrics (90 days)

- [N] posts published
- [N] qualified leads via `?source=blog` UTM
- [N] cluster pages with first-page Google ranking
- [N] AI-Overview citations (track via blog-geo)

---

## CTA Framework

The `/blog-loop` skill injects this section into every Brief and Write stage
prompt. Keep it self-contained and explicit.

### Primary CTA

**Target:** `/get-started` with UTM `?source=blog&slug=<ITEM.slug>` for attribution.

### Mandatory placements (every post)

1. **Above-the-fold** (after intro / Key Takeaways box):
   `[INTERNAL-LINK: <copy> → /get-started?source=blog&slug=<slug>]`
2. **Mid-article** (after sizing, cost, or comparison section):
   `[INTERNAL-LINK: <copy> → /get-started?source=blog&slug=<slug>]`
   OR a cluster-specific destination (see below).
3. **End of article** (before FAQ):
   `[INTERNAL-LINK: <copy> → /get-started?source=blog&slug=<slug>]`
   + phone fallback sentence: "Or call [phone] for [next step]."

### Per-cluster extras

| Cluster | 4th CTA / specific destination |
|---|---|
| [Cluster A] | [Pattern, e.g. /locations/<slug>] |
| [Cluster B] | [Pattern, e.g. /plans/<tier>] |
| [Cluster C] | [Pattern, e.g. /compare/<slug>] |

### Copy rotation pool

Pick one per slot, vary per post:

```
[INTERNAL-LINK: <call to action 1> → /get-started?source=blog&slug=<slug>]
[INTERNAL-LINK: <call to action 2> → /get-started?source=blog&slug=<slug>]
[INTERNAL-LINK: <call to action 3> → /get-started?source=blog&slug=<slug>]
[INTERNAL-LINK: <call to action 4> → /get-started?source=blog&slug=<slug>]
```

---

## Topic Clusters

Each cluster defines a content category with a target post count, a search
intent profile, and an anti-cannibalization rule. The `/blog-strategy
replenish` skill reads this section to propose new queue items when pending
falls below threshold.

### Cluster A — [Name]

- **Target count:** [N posts]
- **Search intent:** [Informational / Commercial / Transactional]
- **Audience segment:** [%]
- **Anti-cannibalization rule:** [How posts in this cluster differentiate, e.g.
  "each post must target a unique [city / persona / objection / product]"]
- **Required hyperlocal/proof data per post:** [3+ stats from local sources]
- **Status:** [open / closed / refresh-only]
- **Example slugs:**
  - `<slug-1>`
  - `<slug-2>`
- **Replenish source list:** [List of remaining candidate topics, e.g. cities
  not yet covered, personas not yet written, products not yet evaluated]

### Cluster B — [Name]

[Repeat structure]

### Cluster C — [Name]

[Repeat structure]

---

## Hard rules (extracted from CLAUDE.md)

> The `/blog-loop` skill reads this from `<project>/CLAUDE.md`. Keep this
> section in strategy.md only as a human-readable reminder. Source of truth
> is CLAUDE.md.

- No em dashes (`—`). Use commas, periods, colons.
- No tax-credit language: ITC, Section 25D, federal tax credit, rebate, incentive.
- Use the exact phrase `<canonical product term>` (e.g. "home battery backup",
  not "backup battery" or "residential energy storage").
- No banned AI-flag phrases: "in today's world", "delve into", "leverage" as
  verb, "seamlessly", "harness the power of", "navigate the complexities",
  "game-changer", "revolutionary", "ultimate guide", "robust", "tapestry",
  "embark", "in essence", "at its core".

---

## Closed clusters (no new posts; refresh only)

[List clusters that have saturated cannibalization-wise. The replenish skill
treats these as off-limits.]

---

## E-E-A-T sources

[List the publications, government sites, manufacturer docs, etc. that the
blog cites for Tier 1-3 sourcing. Helps the brief stage know what's
authoritative for this niche.]

---

## Distribution (optional)

- **Reddit:** [target subs, posting cadence]
- **YouTube:** [companion video plan]
- **LinkedIn:** [excerpt strategy]
- **Email:** [newsletter integration]
