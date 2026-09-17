export const meta = {
  name: 'blog-loop',
  description: 'Autonomous blog production: brief -> write -> hero -> schema -> SEO check -> audit -> factcheck -> preflight. Skill markdown is injected at runtime from args.skillMd so updates to ~/.claude/skills/blog-* propagate without editing this script. The factcheck stage is opt-in via config.factcheck.enabled.',
  phases: [
    { title: 'Brief' },
    { title: 'Write' },
    { title: 'Hero' },
    { title: 'Schema' },
    { title: 'SEO check' },
    { title: 'Audit' },
    { title: 'Factcheck' },
    { title: 'Preflight' },
  ],
}

const BRIEF_RESULT_SCHEMA = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    path: { type: 'string' },
    cannibalization_detected: { type: 'boolean' },
    cannibalization_reason: { type: 'string' },
    word_target: { type: 'number' },
    notes: { type: 'string' },
  },
  required: ['ok', 'path'],
}

const WRITE_RESULT_SCHEMA = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    path: { type: 'string' },
    word_count_body: { type: 'number' },
    frontmatter_complete: { type: 'boolean' },
    em_dash_count: { type: 'number' },
    tax_phrase_count: { type: 'number' },
    cta_count: { type: 'number' },
    internal_link_count: { type: 'number' },
  },
  required: ['ok', 'path', 'word_count_body'],
}

const HERO_RESULT_SCHEMA = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    path: { type: 'string' },
    width: { type: 'number' },
    height: { type: 'number' },
    format: { type: 'string' },
  },
  required: ['ok', 'path'],
}

const SCHEMA_RESULT_SCHEMA = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    path: { type: 'string' },
    entity_count: { type: 'number' },
    has_faq: { type: 'boolean' },
    has_breadcrumb: { type: 'boolean' },
  },
  required: ['ok', 'path'],
}

const SEO_RESULT_SCHEMA = {
  type: 'object',
  properties: {
    passed: { type: 'boolean' },
    critical_count: { type: 'number' },
    high_count: { type: 'number' },
    fixes_applied: { type: 'boolean' },
    report_summary: { type: 'string' },
  },
  required: ['passed', 'critical_count'],
}

const AUDIT_RESULT_SCHEMA = {
  type: 'object',
  properties: {
    score: { type: 'number' },
    category_scores: { type: 'object' },
    attempts: { type: 'number' },
    rewrites_applied: { type: 'number' },
    issues: { type: 'array' },
  },
  required: ['score', 'attempts'],
}

const FACTCHECK_RESULT_SCHEMA = {
  type: 'object',
  properties: {
    checked: { type: 'number' },   // cited claims examined (fetched their URL)
    verified: { type: 'number' },  // cited claims scoring >= 0.7
    failing: { type: 'array' },    // [{claim, url, score, status}] cited claims scoring < 0.7
    uncited_count: { type: 'number' }, // numbers with no source URL (informational, not blocking)
    blocking: { type: 'boolean' }, // true if any cited claim is fabricated/misattributed
    fixes_applied: { type: 'boolean' },
    summary: { type: 'string' },
  },
  required: ['blocking', 'checked'],
}

const PREFLIGHT_RESULT_SCHEMA = {
  type: 'object',
  properties: {
    passed: { type: 'boolean' },
    gates_run: { type: 'array' },
    blocked: { type: 'boolean' },
    violations: { type: 'array' },
    warnings: { type: 'array' },
  },
  required: ['passed', 'blocked'],
}

function projectContextBlock(args) {
  return [
    '--- PROJECT CONTEXT ---',
    `Project root: ${args.projectDir}`,
    '',
    'HARD RULES (from CLAUDE.md):',
    args.hardRules || '(none provided)',
    '',
    'CTA FRAMEWORK (from docs/blog-strategy.md):',
    args.ctaFramework || '(none provided)',
    '',
  ].join('\n')
}

function itemBlock(item) {
  return [
    '--- ITEM ---',
    '```json',
    JSON.stringify(item, null, 2),
    '```',
    '',
  ].join('\n')
}

function configBlock(config) {
  return [
    '--- CONFIG ---',
    '```json',
    JSON.stringify(config, null, 2),
    '```',
    '',
  ].join('\n')
}

function briefPrompt(item, args) {
  const briefPath = `${args.projectDir}/${args.config.briefDir}/${item.slug}-brief.md`
  return [
    'FIRST: Read the blog-brief skill instructions from this file (use the Read tool):',
    `  ${args.skillMdPaths.brief}`,
    'Apply that skill exactly. Then continue with the project context below.',
    '',
    projectContextBlock(args),
    itemBlock(item),
    configBlock(args.config),
    '--- TASK ---',
    `Run the blog-brief workflow on the item. Save the brief to: ${briefPath}`,
    '',
    'CANNIBALIZATION PRE-FLIGHT (hard gate):',
    `Before writing the brief, scan ${args.projectDir}/${args.config.blogDir}/ for any existing post that targets the same primary keyword or near-identical sub-intent as item.target_keyword (${item.target_keyword}). If overlap exists AND this post does not introduce a unique angle, set cannibalization_detected=true with reason. Otherwise proceed and save the brief.`,
    '',
    'Return ONLY the JSON via StructuredOutput.',
  ].join('\n')
}

function writePrompt(briefResult, item, args) {
  const ext = args.config.fileExtension || 'md'
  const postPath = `${args.projectDir}/${args.config.blogDir}/${item.slug}.${ext}`
  // Project-configurable contracts (defaults preserve legacy behavior):
  // - config.frontmatter.fields: exact frontmatter keys the project's blog engine reads
  // - config.ctaPattern: human-readable description of what counts as a CTA
  const fmFields = (args.config.frontmatter && Array.isArray(args.config.frontmatter.fields) && args.config.frontmatter.fields.length > 0)
    ? args.config.frontmatter.fields.join(', ')
    : 'title, description, date, lastUpdated, author, tags, coverImage, coverImageAlt, ogImage'
  const ctaPattern = args.config.ctaPattern
    || '[INTERNAL-LINK: ... -> /get-started?source=blog&slug=...]'
  return [
    'FIRST: Read the blog-write skill instructions from this file (use the Read tool):',
    `  ${args.skillMdPaths.write}`,
    'Apply that skill exactly. Then continue with the project context below.',
    '',
    projectContextBlock(args),
    itemBlock(item),
    `Brief is saved at: ${briefResult.path}`,
    `Save the post to: ${postPath}`,
    `Target publish date: ${item.publish_date}`,
    `Target lastUpdated:  ${item.publish_date}`,
    `Target author slug:  ${item.author}`,
    '',
    `FRONTMATTER CONTRACT (exact keys the project blog engine parses; use these and no others as top-level required keys): ${fmFields}`,
    '',
    'POST-WRITE COUNTERS (compute and return):',
    '- word_count_body: words in body (exclude frontmatter, code blocks, [INTERNAL-LINK ...], [CHART:...])',
    '- em_dash_count: occurrences of U+2014',
    '- tax_phrase_count: case-insensitive matches of (tax credit|ITC|Section 25D|federal tax|30% credit|rebate|incentive)',
    `- cta_count: number of CTAs matching the project pattern: ${ctaPattern}`,
    '- internal_link_count: total markdown internal links',
    `- frontmatter_complete: all of these present: ${fmFields}`,
    '',
    'Return ONLY the JSON via StructuredOutput.',
  ].join('\n')
}

function rewritePrompt(item, args, feedback, postPath) {
  return [
    'FIRST: Read the blog-rewrite skill instructions from this file (use the Read tool):',
    `  ${args.skillMdPaths.rewrite}`,
    'Apply that skill exactly. Then continue.',
    '',
    projectContextBlock(args),
    itemBlock(item),
    `Post path: ${postPath}`,
    '',
    '--- FEEDBACK TO APPLY ---',
    typeof feedback === 'string' ? feedback : JSON.stringify(feedback, null, 2),
    '',
    'Apply the fixes IN PLACE. Do not change the slug or filename. Return the JSON via StructuredOutput.',
  ].join('\n')
}

function stagingDir(item, args) {
  return `${args.projectDir}/.blog-loop-staging/${item.slug}`
}

function heroPrompt(writeResult, item, args) {
  const imgFormat = args.config.hero.format || 'webp'
  const finalHeroPath = `${args.projectDir}/${args.config.imageDir}/${item.slug}-hero.${imgFormat}`
  const staging = stagingDir(item, args)
  const briefPath = `${args.projectDir}/${args.config.briefDir}/${item.slug}-brief.md`
  const tags = Array.isArray(item.secondary_keywords) ? item.secondary_keywords.join(',') : ''
  return [
    'You are the hero-image stage of the blog-loop pipeline.',
    '',
    projectContextBlock(args),
    itemBlock(item),
    `Brief:             ${briefPath}`,
    `Post:              ${writeResult.path}`,
    `Staging dir:       ${staging}`,
    `Final hero path:   ${finalHeroPath}`,
    `Hero topic:        ${item.title}`,
    `Hero tags:         ${tags}`,
    `Model:             ${args.config.hero.model}`,
    `Final dimensions:  ${args.config.hero.size[0]}x${args.config.hero.size[1]}`,
    '',
    '--- TASK ---',
    `1. mkdir -p "${staging}"`,
    `2. Run: python ~/.claude/scripts/generate_hero.py \\`,
    `     --topic "${item.title}" \\`,
    `     --tags "${tags}" \\`,
    `     --out "${staging}" \\`,
    `     --width ${args.config.hero.size[0]} \\`,
    `     --height ${args.config.hero.size[1]} \\`,
    `     --model "${args.config.hero.model}" \\`,
    `     --json`,
    `3. After it finishes, the script writes "${staging}/hero.<ext>" + "${staging}/hero-credit.txt".`,
    `4. Copy "${staging}/hero.${imgFormat}" → "${finalHeroPath}" (use cp; create the parent dir if needed).`,
    `5. (Fallback) If generate_hero.py fails or is missing: first check <projectDir>/CLAUDE.md for a project-documented hero-generation method and use it; otherwise fetch a CC-licensed stock photo matching the topic (Openverse API needs no key), resize to the final dimensions and save at the final path AND at "${staging}/hero.${imgFormat}", recording the credit in "${staging}/hero-credit.txt".`,
    '',
    'Verify both the staging hero file and the final hero file exist with non-zero size, then return the JSON (path = final hero path).',
  ].join('\n')
}

function schemaPrompt(writeResult, item, args) {
  const schemaPath = `${args.projectDir}/${args.config.schemaDir}/${item.slug}.schema.json`
  return [
    'FIRST: Read the blog-schema skill instructions from this file (use the Read tool):',
    `  ${args.skillMdPaths.schema}`,
    'Apply that skill exactly. Then continue.',
    '',
    projectContextBlock(args),
    itemBlock(item),
    `Source post: ${writeResult.path}`,
    `Save sidecar schema to: ${schemaPath}`,
    '',
    'Required @graph entities at minimum:',
    '1. BlogPosting (with headline, description, datePublished, dateModified, inLanguage, wordCount, keywords, articleSection, articleBody summary, author ref, publisher ref, image ref, mainEntityOfPage, isPartOf blog, about Things)',
    '2. Person (author)',
    '3. Organization (publisher)',
    '4. Blog (parent)',
    '5. WebPage',
    '6. ImageObject (hero)',
    '7. BreadcrumbList (Home -> Blog -> Post)',
    '8. FAQPage (ONLY if the post actually has an FAQ section; never invent Q&A pairs)',
    '',
    'Return ONLY the JSON via StructuredOutput.',
  ].join('\n')
}

function seoPrompt(writeResult, schemaResult, item, args) {
  return [
    'FIRST: Read the blog-seo-check skill instructions from this file (use the Read tool):',
    `  ${args.skillMdPaths.seoCheck}`,
    'Apply that skill exactly. Then continue.',
    '',
    projectContextBlock(args),
    itemBlock(item),
    `Source post: ${writeResult.path}`,
    `Sidecar schema: ${schemaResult.path}`,
    '',
    'Run the full SEO check. If any CRITICAL fails are found, apply fixes in place via Edit and set fixes_applied=true.',
    'Return ONLY the JSON via StructuredOutput.',
  ].join('\n')
}

function auditPrompt(writeResult, item, args, prevIssues) {
  return [
    'FIRST: Read the blog-audit skill instructions from this file (use the Read tool):',
    `  ${args.skillMdPaths.audit}`,
    'Apply that skill exactly. Then continue.',
    '',
    projectContextBlock(args),
    itemBlock(item),
    `Source post: ${writeResult.path}`,
    prevIssues
      ? `\nPREVIOUS AUDIT ISSUES (already attempted to fix):\n${JSON.stringify(prevIssues, null, 2)}\n`
      : '',
    'Score the post with the 5-category 100-point system. Required threshold: 70. Return ONLY the JSON via StructuredOutput.',
  ].join('\n')
}

function factcheckPrompt(writeResult, item, args, prevFailing) {
  return [
    'FIRST: Read the blog-factcheck skill instructions from this file (use the Read tool):',
    `  ${args.skillMdPaths.factcheck}`,
    'Apply that skill exactly. Then continue.',
    '',
    projectContextBlock(args),
    itemBlock(item),
    `Source post: ${writeResult.path}`,
    `Verified-sources library (if present): ${args.projectDir}/docs/blog-fontes-verificadas.md`,
    prevFailing
      ? `\nPREVIOUS FAILING CLAIMS (already attempted to fix):\n${JSON.stringify(prevFailing, null, 2)}\n`
      : '',
    '--- TASK (blocking gate) ---',
    'Extract every statistical claim in the post that carries an inline citation (a markdown link / URL as its source). For EACH such CITED claim, fetch the cited URL via WebFetch and check whether the claimed number appears literally on the page in a matching context. Assign a match score per the blog-factcheck rubric (1.0 exact, 0.7-0.9 paraphrase, 0.3-0.6 weak, 0.0 not found).',
    '',
    'GATE LOGIC:',
    '- A CITED claim scoring < 0.7 means the URL does NOT support the number (fabricated or misattributed source). Add it to `failing`.',
    '- Set blocking=true if `failing` is non-empty.',
    '- Uncited numbers (statistics with NO source URL) are NOT a factcheck failure here: do not add them to `failing`. Count them in `uncited_count` and mention in `summary`.',
    '- Process at most 10 URLs (per the skill limit). If more cited claims exist, verify the first 10 and note the remainder in `summary`.',
    '',
    'Return ONLY the JSON via StructuredOutput (checked = cited claims examined, verified = those >= 0.7, failing = the sub-0.7 list, uncited_count, blocking).',
  ].join('\n')
}

function preflightPrompt(writeResult, schemaResult, heroResult, item, args) {
  const gates = (args.config.preflightGates || [1, 2, 5])
  const staging = stagingDir(item, args)
  const imgFormat = args.config.hero.format || 'webp'
  return [
    'You are the preflight stage of the blog-loop pipeline. Assemble the v1.9.1 draft folder and run blog_preflight.py.',
    '',
    projectContextBlock(args),
    itemBlock(item),
    `Post path (source):    ${writeResult.path}`,
    `Schema path (source):  ${schemaResult.path}`,
    `Hero path (source):    ${heroResult.path}`,
    `Staging draft dir:     ${staging}`,
    `Gates to run:          [${gates.join(', ')}]`,
    '',
    '--- TASK ---',
    'STEP 1 — Assemble the draft folder (blog_preflight.py expects a v1.9.x draft layout):',
    `  mkdir -p "${staging}"`,
    `  cp "${writeResult.path}" "${staging}/post.md"`,
    `  cp "${heroResult.path}"  "${staging}/hero.${imgFormat}"`,
    `  cp "${schemaResult.path}" "${staging}/schema.json"`,
    '',
    'STEP 2 — Render HTML + PDF into the staging dir (required for Gate 2):',
    `  python ~/.claude/scripts/blog_render.py --md "${staging}/post.md" --out-dir "${staging}" --hero "hero.${imgFormat}" --json`,
    '',
    'STEP 3 — Run each gate sequentially:',
    ...gates.map(g => `  python ~/.claude/scripts/blog_preflight.py --draft "${staging}" --gate ${g} --json`),
    '',
    'STEP 4 — Parse each gate JSON output. A gate that returns blocked=true or violations[] non-empty counts as failed.',
    '',
    'STEP 5 — If any gate is blocked, attempt ONE in-place fix:',
    '  - Edit the source post at writeResult.path (NOT the staging copy)',
    `  - Re-copy: cp "${writeResult.path}" "${staging}/post.md"`,
    `  - Re-render: python ~/.claude/scripts/blog_render.py --md "${staging}/post.md" --out-dir "${staging}" --hero "hero.${imgFormat}" --json`,
    '  - Re-run the failing gate(s).',
    '',
    'Aggregate ALL gate runs into the result schema (gates_run = list of gate numbers attempted; blocked = true if any gate STILL blocked after fix attempt; violations = aggregated; warnings = informational only).',
    '',
    'Return ONLY the JSON via StructuredOutput.',
  ].join('\n')
}

const skipped = (slug, reason) => ({ slug, status: 'failed', score: null, reason, warnings: [reason] })

async function runItemPipeline(item, args) {
  const startMs = Number(args.startMs) || 0
  const warnings = []
  let rewrites = 0
  let briefResult, writeResult, heroResult, schemaResult, seoResult, auditResult, factcheckResult, preflightResult

  briefResult = await agent(briefPrompt(item, args), {
    phase: 'Brief', label: `brief:${item.slug}`, schema: BRIEF_RESULT_SCHEMA,
  })
  if (!briefResult || !briefResult.ok) return skipped(item.slug, 'brief_failed')
  if (briefResult.cannibalization_detected) {
    return { slug: item.slug, status: 'failed', score: null, reason: `cannibalization: ${briefResult.cannibalization_reason || 'overlap detected'}`, warnings: ['cannibalization'] }
  }

  writeResult = await agent(writePrompt(briefResult, item, args), {
    phase: 'Write', label: `write:${item.slug}`, schema: WRITE_RESULT_SCHEMA,
  })
  if (!writeResult || !writeResult.ok) return skipped(item.slug, 'write_failed')

  // Tax-credit language is banned by default, but a project can opt out via
  // config.allowTaxLanguage (e.g. content strategies built around a tax-credit
  // expiry). When allowed, CLAUDE.md still governs HOW it must be handled.
  const taxViolation = !args.config.allowTaxLanguage && writeResult.tax_phrase_count > 0
  if (writeResult.em_dash_count > 0 || taxViolation) {
    warnings.push(`hard_rule_violation_pre_rewrite em=${writeResult.em_dash_count} tax=${writeResult.tax_phrase_count} taxAllowed=${!!args.config.allowTaxLanguage}`)
    const fb = {
      issues: [
        writeResult.em_dash_count > 0 ? { severity: 'CRITICAL', issue: `em dash count = ${writeResult.em_dash_count}`, fix: 'replace every U+2014 with comma, period, or colon. Do not introduce new ones.' } : null,
        taxViolation ? { severity: 'CRITICAL', issue: `tax phrase count = ${writeResult.tax_phrase_count}`, fix: 'remove every tax-credit reference (ITC, Section 25D, federal tax, rebate, incentive). Replace with non-tax framing or drop.' } : null,
      ].filter(Boolean),
    }
    await agent(rewritePrompt(item, args, fb, writeResult.path), {
      phase: 'Write', label: `rewrite:hardrules:${item.slug}`,
    })
    rewrites++
  }

  const wordTarget = (item.word_count || briefResult.word_target || 1500) * 0.9
  if (writeResult.word_count_body < wordTarget) {
    warnings.push(`underweight_body wc=${writeResult.word_count_body} target=${wordTarget}`)
    await agent(rewritePrompt(item, args, `Expand the body to at least ${item.word_count} words. Add depth to weakest H2 sections.`, writeResult.path), {
      phase: 'Write', label: `rewrite:wordcount:${item.slug}`,
    })
    rewrites++
  }

  // Hero stage. Default: generate an AI hero (unchanged behavior). A project can
  // set config.hero.enabled=false (e.g. cover strategy is a real-photo bank); then
  // we skip AI generation and use the item's own cover photo as the draft hero.
  const heroEnabled = !args.config.hero || args.config.hero.enabled !== false
  if (heroEnabled) {
    heroResult = await agent(heroPrompt(writeResult, item, args), {
      phase: 'Hero', label: `hero:${item.slug}`, schema: HERO_RESULT_SCHEMA,
    })
    if (!heroResult || !heroResult.ok) return skipped(item.slug, 'hero_failed')
  } else {
    const cover = item.coverImage || (Array.isArray(item.inlineImages) ? item.inlineImages[0] : null)
    if (!cover) return skipped(item.slug, 'hero_disabled_no_cover')
    const publicDir = args.config.publicDir || 'public'
    const coverFsPath = `${args.projectDir}/${publicDir}${cover.startsWith('/') ? '' : '/'}${cover}`
    heroResult = { ok: true, path: coverFsPath, source: 'real-photo-bank' }
  }

  schemaResult = await agent(schemaPrompt(writeResult, item, args), {
    phase: 'Schema', label: `schema:${item.slug}`, schema: SCHEMA_RESULT_SCHEMA,
  })
  if (!schemaResult || !schemaResult.ok) return skipped(item.slug, 'schema_failed')

  seoResult = await agent(seoPrompt(writeResult, schemaResult, item, args), {
    phase: 'SEO check', label: `seo:${item.slug}`, schema: SEO_RESULT_SCHEMA,
  })
  if (!seoResult) return skipped(item.slug, 'seo_failed')
  if (!seoResult.passed && seoResult.critical_count > 0) {
    await agent(rewritePrompt(item, args, { issues: [{ severity: 'CRITICAL', issue: 'SEO critical fails', fix: seoResult.report_summary }] }, writeResult.path), {
      phase: 'SEO check', label: `seo-rewrite:${item.slug}`,
    })
    rewrites++
    seoResult = await agent(seoPrompt(writeResult, schemaResult, item, args), {
      phase: 'SEO check', label: `seo:retry:${item.slug}`, schema: SEO_RESULT_SCHEMA,
    })
    if (!seoResult || (!seoResult.passed && seoResult.critical_count > 0)) {
      return { slug: item.slug, status: 'failed', score: null, reason: 'seo_critical_persisted', warnings, rewrites_applied: rewrites }
    }
  }

  let score = 0
  let attempts = 0
  let prevIssues = null
  while (attempts < 3) {
    auditResult = await agent(auditPrompt(writeResult, item, args, prevIssues), {
      phase: 'Audit', label: `audit:${item.slug}#${attempts}`, schema: AUDIT_RESULT_SCHEMA,
    })
    if (!auditResult) {
      return { slug: item.slug, status: 'failed', score: null, reason: 'audit_returned_null', warnings, rewrites_applied: rewrites }
    }
    score = auditResult.score || 0
    if (score >= 70) break
    if (attempts >= 2) break
    await agent(rewritePrompt(item, args, auditResult, writeResult.path), {
      phase: 'Audit', label: `rewrite:audit:${item.slug}#${attempts}`,
    })
    rewrites++
    prevIssues = auditResult.issues || null
    attempts++
  }
  if (score < 70) {
    return { slug: item.slug, status: 'failed', score, reason: 'audit_below_70_after_retries', warnings, rewrites_applied: rewrites }
  }

  // Factcheck gate (opt-in via config.factcheck.enabled). Verifies every CITED
  // statistic against its source URL and blocks on fabricated/misattributed
  // citations (score < 0.7). One rewrite attempt, then re-check.
  if (args.config.factcheck && args.config.factcheck.enabled) {
    factcheckResult = await agent(factcheckPrompt(writeResult, item, args, null), {
      phase: 'Factcheck', label: `factcheck:${item.slug}`, schema: FACTCHECK_RESULT_SCHEMA,
    })
    if (!factcheckResult) {
      return { slug: item.slug, status: 'failed', score, reason: 'factcheck_returned_null', warnings, rewrites_applied: rewrites }
    }
    if (factcheckResult.blocking) {
      warnings.push(`factcheck_failing_pre_rewrite n=${(factcheckResult.failing || []).length}`)
      await agent(rewritePrompt(item, args, {
        issues: [{
          severity: 'CRITICAL',
          issue: 'cited statistics do not match their source URLs (fabricated or misattributed)',
          fix: 'For EACH failing claim: either replace it with a source that literally supports the number (verify by WebFetch first; prefer sources from the project verified-sources library if present, e.g. docs/blog-fontes-verificadas.md, or newly verified ones), or remove the citation and reframe as first-hand experience / qualitative. Never keep a citation whose URL does not contain the number, and never substitute a statistic from an adjacent topic as if it covered this one.',
          failing: factcheckResult.failing,
        }],
      }, writeResult.path), {
        phase: 'Factcheck', label: `rewrite:factcheck:${item.slug}`,
      })
      rewrites++
      factcheckResult = await agent(factcheckPrompt(writeResult, item, args, factcheckResult.failing), {
        phase: 'Factcheck', label: `factcheck:retry:${item.slug}`, schema: FACTCHECK_RESULT_SCHEMA,
      })
      if (!factcheckResult || factcheckResult.blocking) {
        return { slug: item.slug, status: 'failed', score, reason: 'factcheck_failing_persisted', warnings, rewrites_applied: rewrites, factcheck: factcheckResult }
      }
    }
  }

  // Preflight stage: the standalone .md -> .html -> .pdf packaging contract.
  // Default: runs (unchanged). A project can set config.preflight.enabled=false
  // when this contract does not fit its stack (e.g. a Next.js/MDX app whose real
  // validation is its own build); then delivery quality is governed by the
  // seo/audit/factcheck gates plus the app build.
  if (!args.config.preflight || args.config.preflight.enabled !== false) {
    preflightResult = await agent(preflightPrompt(writeResult, schemaResult, heroResult, item, args), {
      phase: 'Preflight', label: `preflight:${item.slug}`, schema: PREFLIGHT_RESULT_SCHEMA,
    })
    if (!preflightResult || preflightResult.blocked) {
      return { slug: item.slug, status: 'failed', score, reason: 'preflight_blocked', warnings, rewrites_applied: rewrites, preflight: preflightResult }
    }
  }

  return {
    slug: item.slug,
    status: 'ok',
    score,
    briefPath: briefResult.path,
    postPath: writeResult.path,
    schemaPath: schemaResult.path,
    heroPath: heroResult.path,
    rewrites_applied: rewrites,
    factcheck: factcheckResult ? { checked: factcheckResult.checked, verified: factcheckResult.verified, uncited_count: factcheckResult.uncited_count } : null,
    warnings,
    item,
  }
}

phase('Brief')

// args may arrive as a JSON string from the tool boundary; normalize.
const A = (typeof args === 'string') ? JSON.parse(args) : args

log(`blog-loop start: ${A?.batchItems?.length || 0} items, projectDir=${A?.projectDir}, dryRun=${!!A?.dryRun}`)

if (!A || !A.batchItems || A.batchItems.length === 0) {
  return { results: [], totalItems: 0, message: 'no items to process', argsTypeReceived: typeof args }
}

const results = await pipeline(
  A.batchItems,
  item => runItemPipeline(item, A),
)

const summary = {
  totalItems: A.batchItems.length,
  ok: results.filter(r => r && r.status === 'ok').length,
  failed: results.filter(r => r && r.status === 'failed').length,
  null_results: results.filter(r => !r).length,
}

log(`blog-loop done: ok=${summary.ok} failed=${summary.failed} null=${summary.null_results}`)

return { results: results.filter(Boolean), summary, iterationId: A.iterationId }
