# Re-auditoria SEO (v2) — coraleventos.com.br

**Data:** 07/07/2026 (noite), re-auditoria de verificação após o deploy das correções da auditoria da manhã.
**Baseline:** `docs/audits/2026-07-07-seo/FULL-AUDIT-REPORT.md` (score 77/100).
**Escopo:** 46 URLs do sitemap live (14 páginas core, 23 posts, 9 tags), código em `origin/main` (commits `fe572f0` + `077e052` mergeados), dados live via DataForSEO (Lighthouse, SERP, backlinks, GBP API) e capturas Playwright desktop/mobile.
**Metodologia:** 8 especialistas em paralelo + verificações live do orquestrador. Relatórios brutos em `raw/`, screenshots em `screenshots/`.

---

## Sumário executivo

### SEO Health Score: 87/100 (antes: 77)

| Categoria | Peso | Antes | Agora | Ponderado |
|---|---|---|---|---|
| SEO Técnico | 22% | 72 | 89 | 19,6 |
| Qualidade de Conteúdo | 23% | 72 | 86 | 19,8 |
| On-Page SEO | 20% | 76 | 84 | 16,8 |
| Schema / Dados Estruturados | 10% | 80 | 86 | 8,6 |
| Performance (CWV) | 10% | 92 | 98 | 9,8 |
| AI Search Readiness (GEO) | 10% | 77 | 80 | 8,0 |
| Imagens | 5% | 85 | 85 | 4,3 |
| **Total** | | **77** | | **≈87** |

Scores complementares (fora da ponderação): **SEO Local 59/100** (antes 68; a queda não é regressão do site, e sim dados live novos que revelaram o tamanho real do gap competitivo) e **Sitemap 90/100** (antes 42).

**Leitura geral:** o dever de casa técnico foi feito e está em produção. Das 20 e poucas pendências da manhã, 15 foram confirmadas corrigidas ao vivo. O site agora tem fundação técnica de nível raro para o segmento (Lighthouse 99/87/100/100, sitemap limpo, schema consistente, headers de segurança). Os problemas remanescentes mudaram de natureza: saíram do código e foram para o mundo externo (reviews, backlinks, categoria do GBP) e para um único bug novo de layout mobile que afeta diretamente a conversão.

### Verificação das correções da auditoria da manhã

| Issue do baseline | Status live |
|---|---|
| 49 tag pages doorway (`MIN_POSTS_PER_TAG=1`) | CORRIGIDO (46 URLs no sitemap, 9 tags, todas com 3+ posts, `dynamicParams=false`) |
| URLs de tag com `%20`/acento (26 slugs) | CORRIGIDO (`slugifyTag()` kebab-case; URLs antigas retornam 404) |
| Coordenadas erradas no LocalBusiness (~1,3 km) | CORRIGIDO (-20.8809322, -47.5929521; bate com o GBP real) |
| Redirects 301 do WordPress só na branch | CORRIGIDO (`/fotos` → 308 `/galeria`, `/author/...` → 308 `/`, verificado live) |
| Páginas de cidade órfãs | CORRIGIDO (hub `/cidades` criado, links no footer, breadcrumb corrigido) |
| Headers de segurança ausentes | CORRIGIDO (HSTS full, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy; CSP adiada por decisão documentada) |
| Title template duplicando "Batatais, SP" | CORRIGIDO (`"%s | Espaço Coral"`) |
| Draft `teste-infraestrutura.mdx` público | CORRIGIDO (arquivo removido, URL retorna 404) |
| FAQs duplicadas verbatim entre posts | CORRIGIDO na essência (respostas reescritas; resta 1 pergunta com `name` igual no JSON-LD) |
| Canibalização do cluster "casamento ao ar livre" | CORRIGIDO (pilar + 3 satélites diferenciados linkando ao pilar) |
| Estatísticas sem fonte | CORRIGIDO no corpo dos posts (CNC/ABRAFESTA, IBGE, SEBRAE, INMET); frontmatter `faq:` ainda sem atribuição |
| authorBio idêntica em 23/23 posts | PENDENTE |
| IndexNow | PENDENTE |
| Backlinks / autoridade externa ~zero | PENDENTE (índice continua vazio) |
| Corroboração externa de marca (sameAs, portais, YouTube) | PENDENTE |

### Top 5 issues atuais (pós-correções)

1. **[NOVO, Critical] Home mobile esconde o CTA de WhatsApp e o menu.** Overflow horizontal real na home (layout de ~708px num viewport de 390px, reproduzido com preset iPhone 13) empurra os elementos `position: fixed` para fora da tela. O canal único de conversão fica invisível na página mais importante. Candidatos a causa: carrossel de depoimentos e carrossel do hero, sem contenção de overflow. Detalhe em `raw/visual.md`.
2. **[High] Gap de reviews no GBP: 41 vs 316/164/135 dos concorrentes do local pack.** (O relatório citava 36, snapshot de abril da Business Listings API; o GBP live confirmado em 08/07 tem 41.) O Coral está fora do local pack para "espaço para casamento em batatais" com rating 5.0 perfeito. Volume de avaliações é o delta mais claro. Detalhe em `raw/local.md` e `raw/dataforseo.md`.
3. **[High] Categoria primária do GBP subótima.** "Function room facility" alinha com queries genéricas (Coral aparece 3º para "espaço para eventos batatais") mas não com a query de maior valor comercial ("espaço para casamento em batatais"), onde o Coral não entra no pack. Categoria primária é o fator nº 1 de ranking local.
4. **[High] Autoridade externa continua zero.** Índice de backlinks vazio, 1 única keyword ranqueada no índice do Labs ("espaço coral", posição 4, em queda), Instagram e Facebook de concorrente rankeando acima do site do Coral. Casamentos.com.br rankeia na página 1 das duas queries comerciais e o Coral não está listado lá.
5. **[High] authorBio idêntica byte a byte nos 23 posts.** Principal sinal remanescente de conteúdo AI-scaled perante o Helpful Content system.

### Top 5 quick wins

1. Atualizar `reviewCount` hardcoded no schema: está 40, o GBP live tem 41. A divergência é pequena, mas qualquer número fixo dessincroniza; atualizar para 41 e criar rotina de sincronização mensal.
2. Atualizar `public/llms.txt`: não lista o hub `/cidades` criado no mesmo commit; adicionar data/versão.
3. Solicitar mudança de categoria primária do GBP para categoria de casamento/eventos (ex: "Local para casamentos" / wedding venue).
4. Cadastrar o Espaço Coral no Casamentos.com.br (rankeia página 1 nas duas queries de maior valor; backlink + presença por procuração).
5. Aumentar o tap target do menu hambúrguer (28×28px hoje; mínimo recomendado 44×44px).

---

## 1. SEO Técnico — 89/100 (antes 72)

Verificação live do orquestrador confirmou produção: redirects WP ativos (308), headers de segurança presentes, draft e tags antigas em 404, host apex canônico.

Pendências: IndexNow não implementado (ganho para Bing/Copilot); TODO residual em `lib/seo-config.ts`; `/proposta` com disallow+noindex simultâneos (aceito por design, documentado).

Novos (baixa severidade): title de `/cidades` com 70 caracteres; `tagUrl()` como código morto em `lib/blog-utils.ts`; links de pilar usando `encodeURIComponent` direto em vez da função canônica; Meta Pixel ausente do código (presumivelmente dentro do GTM, confirmar no container). Detalhe: `raw/tecnico.md`.

## 2. Qualidade de Conteúdo — 86/100 (antes 72)

E-E-A-T ponderado 79/100 (Experience 74, Expertise 72, Authoritativeness 82, Trustworthiness 85). AI Citation Readiness 80/100.

Corrigidos: tags doorway, canibalização do cluster ar livre, draft removido, estatísticas com fonte no corpo do texto.
Pendente principal: authorBio idêntica em 23/23 posts.
Novos: ~12 dos 23 posts abaixo de 1.500 palavras (incluindo posts de decisão comercial como `casamento-pequeno-vs-grande` e `capacidade-espaco-casamento-calculo`); esqueleto narrativo repetitivo em escala; 1 pergunta de FAQ ainda com `name` duplicado no JSON-LD; meta descriptions de tags templáticas. Detalhe: `raw/conteudo.md`.

## 3. On-Page SEO — 84/100 (antes 76)

Title template corrigido em produção. Metadata e hierarquia de headings seguem sólidos. Remanescentes: H1 da home ainda é o wordmark decorativo "CORAL" (sem keyword local); title de `/cidades` acima de 60 caracteres; e o bug mobile do item crítico nº 1, que na prática anula o CTA WhatsApp na home mobile. Description exibida na SERP para a home vem do texto do GBP, sinal de que o Google está reescrevendo; vale revisar a meta description para a query principal.

## 4. Schema / Dados Estruturados — 86/100 (antes 80)

GEO e FAQPage duplicado corrigidos e validados contra o GBP real. Sem tipos depreciados; `@graph`/`@id` consistentes nas 13 páginas-tipo.

Novos: `aggregateRating` do negócio reciclado identicamente em 3 entidades `Service` (risco perante a diretriz do Google de rating específico por item); `reviewCount: 40` hardcoded, defasado do GBP live (41 em 08/07), sem rotina de sincronização; `SITE_URL` triplicado; `Person` do autor sem `url`/`sameAs`; `JsonLd` sem escape de `</script>`. Pendentes herdados: `ImageGallery` sem `image[]`; `BlogPosting.image` sem dimensões. Detalhe: `raw/schema.md`.

## 5. Performance (CWV) — 98/100 (antes 92)

Lighthouse live desktop: Performance 99, Accessibility 87, Best Practices 100, SEO 100. LCP 796 ms, CLS 0,001, TBT 66 ms, TTFB 13 ms, peso 1,02 MB. Conformidade 100% com as regras de performance do CLAUDE.md, verificada no código e no build real. Maior gap: CWV mobile nunca medido com dado real (requer API key do PSI ou CrUX). Meta Pixel pendente de confirmação no GTM. Detalhe: `raw/performance.md`.

## 6. Sitemap — 90/100 (antes 42)

46 URLs, XML válido, todas as URLs amostradas com 200 + canonical self-referencing, tags kebab-case com 3+ posts, `/proposta` e `/lp` fora. Restam ajustes cosméticos: `lastmod` de páginas estáticas usando timestamp de build, `priority`/`changefreq` supérfluos, `Host:` não padrão no robots.txt. Detalhe: `raw/sitemap.md`.

## 7. AI Search Readiness (GEO) — 80/100 (antes 77)

Todos os crawlers de IA liberados, llms.txt em produção sem drift, conteúdo 100% disponível sem JS, NAP consistente. Corrigidos: draft removido, GEO, FAQs. Pendente estrutural: corroboração externa de marca (o Bing não retorna o domínio; `sameAs` só com Instagram e Facebook). Novos: llms.txt desatualizado (sem o hub `/cidades`) e sem data/versão. Detalhe: `raw/geo.md`.

## 8. SEO Local — 59/100 (antes 68, rebaixado por dados live novos)

Dimensões: GBP 72, Reviews 50, On-page local 74, NAP/Citações 42, Schema local 83, Autoridade 12.

O que os dados live mostraram: GBP reivindicado com rating 5.0 (41 avaliações no GBP live de 08/07; o snapshot de abril da API mostrava 36, 100% cinco estrelas), NAP 100% consistente entre site, schema e GBP, coordenadas batendo. Mas o Coral está fora do local pack da query de maior valor, o gap de reviews é de 4x a 9x, a categoria primária está desalinhada e a autoridade externa é zero. `/cidades/ribeirao-preto` ainda não aparece no top 20 da query regional (esperado: página recém-linkada, sem autoridade). Detalhe: `raw/local.md` e `raw/dataforseo.md`.

## 9. Visual / Mobile

Capturas válidas (cache-busting confirmado com `/_next` no HTML, sem repetir o falso alarme da rodada anterior). H1 visível acima da dobra em tudo; CLS desprezível; boa legibilidade.

Issues: o crítico nº 1 (CTA WhatsApp e hambúrguer invisíveis na home mobile por overflow de ~708px vs 390px, exclusivo da home); overflow horizontal também na home desktop (scrollWidth 2712 vs 1920); tap targets pequenos (hambúrguer 28×28px). Detalhe: `raw/visual.md`.

---

## Dados live coletados (DataForSEO)

Resumo em `raw/dataforseo.md`: SERP das queries comerciais, perfil GBP completo, backlinks (vazio), keywords ranqueadas (1), Lighthouse. Destaques estratégicos:

1. Reviews são o gargalo do local pack, não proximidade nem NAP.
2. Perfis sociais de concorrentes rankeiam acima do site do Coral na query principal.
3. Casamentos.com.br é o atalho mais barato para backlink + presença página 1.
4. A tática do concorrente Espaço Terracota (artigo "Melhor espaço de eventos em Ribeirão Preto" rankeando na página 1) é replicável com o blog do Coral.

## Limitações desta rodada

- Sem credenciais Google (PSI/CrUX/GSC/GA4): CWV mobile e dados de indexação/tráfego reais ficaram de fora. Configurar `~/.config/claude-seo/google-api.json` habilita o agente seo-google na próxima rodada.
- Sandbox dos subagentes bloqueou rede em parte das verificações; o orquestrador cobriu as checagens live críticas (redirects, headers, sitemap, SERP, GBP).
- O bug mobile da home foi reproduzido em emulação (incluindo preset oficial iPhone 13); vale confirmação em dispositivo físico antes e depois do fix.
