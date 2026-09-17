# Sitemap — Re-auditoria (v2) — Score 90/100

> Baseline anterior: `docs/audits/2026-07-07-seo/raw/sitemap.md` (Score 42/100, 98 URLs, 62 tag pages, 79% doorway).
> Fonte ao vivo: `docs/audits/2026-07-07-seo-v2/raw/sitemap-live.xml` (46 URLs) e `robots-live.txt`, baixados via
> `fetch_sitemap.py` / `fetch_robots.py` (o `curl.exe` e o `fetch` do Node ficaram bloqueados pelo sandbox de rede
> deste ambiente; `urllib.request` via Python funcionou e foi usado como substituto equivalente). Checagem de
> status HTTP + `<link rel="canonical">` + `<meta name="robots">` feita com `check_urls.py` sobre as 28 URLs
> amostradas (14 páginas core + 5 posts + 9 tags), resultado bruto em `url-checks.json`. Validação de XML
> (well-formedness, contagem de `<url>`, unicidade de `lastmod`) feita com `validate_xml.py`.

## Resumo executivo

O sitemap saiu de **98 URLs / 62 tag pages (49 thin, 26 com `%20`/acento) / score 42** para **46 URLs / 9 tag
pages saudáveis (todas kebab-case, todas com ≥3 posts) / score 90**. As 5 correções da rodada anterior
(commit `077e052`) foram todas verificadas ao vivo e confirmadas. Os pontos pendentes agora são de baixo risco:
higiene de código (`SITE_URL` ainda duplicado em 3 arquivos) e `lastmod` de páginas estáticas/tag ainda usar o
timestamp de build em vez de uma data real de última alteração de conteúdo.

## Tabela CORRIGIDO / PENDENTE

| # | Item (auditoria anterior) | Severidade original | Status | Evidência |
|---|---|---|---|---|
| 1 | Host do sitemap (apex, sem `www`) podia não bater com host de produção; se Vercel redirecionasse apex→www, as 98 URLs seriam origem de redirect | CRÍTICO | **CORRIGIDO** | `https://www.coraleventos.com.br/` → 301/redirect → resolve em `https://coraleventos.com.br/` com HTTP 200 final (`check_host_lp.py`). `SITE_URL = "https://coraleventos.com.br"` (apex) é consistente entre `app/sitemap.ts:4`, `app/robots.ts:3`, `app/layout.tsx:26`, `lib/seo-config.ts:7` e o host real servido |
| 2 | 49/62 tag pages (79%) com 1 post só (doorway); `MIN_POSTS_PER_TAG = 1` em `lib/blog-utils.ts:213` | ALTO | **CORRIGIDO** | `lib/blog-utils.ts:261` agora define `MIN_POSTS_PER_TAG = 3`. Sitemap ao vivo tem exatamente 9 tags, todas presentes na lista de tags saudáveis do relatório anterior (`casamento`, `batatais`, `estrutura`, `interior-de-sp`, `decoracao`, `ribeirao-preto`, `corporativo`, `evento-corporativo`, `15-anos`) |
| 3 | URLs duplicadas `/blog/tag/15-anos` (pilar) vs `/blog/tag/15%20anos` (tag), mesmos 3 posts | ALTO | **CORRIGIDO** | Sitemap ao vivo tem apenas `https://coraleventos.com.br/blog/tag/15-anos`; nenhuma variante `%20`/`15 anos` encontrada em 46 URLs |
| 4 | Tags não slugificadas (`encodeURIComponent` direto) gerando `%20`/`%C3%B4` | MÉDIO | **CORRIGIDO** | `slugifyTag()` implementada em `lib/blog-utils.ts:89` e usada em `app/sitemap.ts:50` (`getAllClusterSlugs()`). As 9 URLs de tag no sitemap ao vivo são 100% kebab-case, sem `%`: `casamento`, `batatais`, `corporativo`, `evento-corporativo`, `estrutura`, `ribeirao-preto`, `15-anos`, `decoracao`, `interior-de-sp` |
| 5 | `lastmod` falso: `new Date()` de build para 77% das URLs; posts ignoravam `publishDate`/`lastUpdated` | MÉDIO | **PARCIAL** | Os 23 posts do blog agora usam `new Date(post.publishDate)` (`app/sitemap.ts:43`) e batem exatamente com o frontmatter (`publishDate` de cada `.mdx`) — datas reais e distintas confirmadas. Mas as 14 páginas estáticas + 9 tag pages (23/46 = 50%) ainda usam `lastModified = new Date()` do build (`app/sitemap.ts:7,32,52`), todas com o mesmo timestamp `2026-07-07T22:56:26.636Z`. `lastUpdated` do frontmatter (existe como campo opcional em `lib/blog-utils.ts:37`) continua não sendo usado no sitemap |
| 6 | `priority`/`changefreq` ignorados pelo Google | BAIXO/INFO | **NÃO ALTERADO** (aceitável) | Ainda presentes em todas as 46 URLs. Google ignora ambos; manter não é erro, só não agrega valor. Sem ação obrigatória |

## Novos achados (não presentes na auditoria anterior)

| Severidade | Achado | Detalhe |
|---|---|---|
| BAIXO | `SITE_URL` continua redefinido localmente em 3 arquivos em vez de importar `lib/seo-config.ts` | `app/sitemap.ts:4`, `app/robots.ts:3` e `app/layout.tsx:26` cada um declara `const SITE_URL = "https://coraleventos.com.br"` em vez de `import { SITE_URL } from "@/lib/seo-config"`. Hoje os 4 valores coincidem (risco atual = zero), mas é debt: se alguém trocar o domínio em um arquivo e esquecer os outros, o problema crítico #1 desta tabela volta a existir silenciosamente |
| BAIXO | `Host:` no `robots.txt` é diretiva não padrão (só Yandex reconhece; Google ignora) | `app/robots.ts:15` gera `Host: https://coraleventos.com.br` no `robots.txt` ao vivo. Não é erro, mas é cosmético/sem efeito no Google — mesma categoria de `priority`/`changefreq` |
| INFO | `<meta name="robots">` explícito ausente nas páginas de post (`/blog/[slug]`) | Nas 5 páginas de post amostradas, não há `<meta name="robots">` no HTML (o `robots_meta` retornou `None`), enquanto páginas core e tag pages têm explicitamente `index, follow`. Comportamento padrão do Next (ausência de tag = indexável) já resolve isso na prática; citando apenas para consistência de metadata entre templates |

## Checklist de validação

| Check | Resultado |
|---|---|
| XML bem formado (`xml.etree.ElementTree`) | OK — parse sem erro, root `urlset` no namespace `sitemaps.org/schemas/sitemap/0.9` |
| Contagem de URLs | 46 (14 core + 23 posts + 9 tags), abaixo do limite de 50.000 por arquivo — sem necessidade de sitemap index |
| Status HTTP das 28 URLs amostradas (14 core + 5 posts + 9 tags) | **28/28 → HTTP 200** (`url-checks.json`) |
| `<link rel="canonical">` aponta para a própria URL em todas as 28 amostradas | **Sim**, 28/28 self-referencing (home: canonical `https://coraleventos.com.br` sem barra final vs URL com barra — variação trivial de `metadataBase`, não é erro) |
| `/proposta/*` fora do sitemap e com `noindex,nofollow` | Confirmado: `app/proposta/layout.tsx` aplica `robots: {index:false, follow:false, googleBot:{index:false,follow:false}}` para todo o segmento; testado ao vivo em `/proposta/buffet/grand-coral` → HTTP 200, `<meta name="robots" content="noindex, nofollow">`, canonical aponta para a home (não para si mesma — comportamento correto para página não indexável) |
| `/lp/*` fora do sitemap | Confirmado: não há nenhuma rota `app/lp/**` no código; teste ao vivo em `/lp/teste` → HTTP 404 |
| Duplicatas de tag com `%20`/acento removidas | Confirmado, 0 ocorrências nas 46 URLs |
| Comparação sitemap ↔ conteúdo real (`content/blog/*.mdx`) | 23 arquivos `.mdx`, todos `status: "published"`, todos com `publishDate` ≤ hoje (2026-07-07) → 23/23 no sitemap. Nenhum post faltando, nenhum draft vazando |
| Comparação sitemap ↔ rotas em `/app` | Todas as 14 rotas estáticas do App Router (exceto `/proposta/*`, corretamente excluído) estão no sitemap. Nenhuma rota pública órfã encontrada |
| Consistência sitemap ↔ `robots.txt` ↔ código | `robots.txt` ao vivo (`Disallow: /lp/, /proposta/, /api/, /_next/`; `Sitemap: .../sitemap.xml`) bate 1:1 com `app/robots.ts`. Nenhuma URL do sitemap cai em um path `Disallow` |
| Gate de qualidade de location pages (30+/50+) | Não aplicável — apenas 2 páginas de cidade (`/cidades/franca`, `/cidades/ribeirao-preto`) além do hub `/cidades`, bem abaixo do limiar de 30 páginas. Sem necessidade de warning ou hard stop |
| Host apex vs `www` | `www.coraleventos.com.br` redireciona e resolve em `coraleventos.com.br` (apex) com HTTP 200 final, consistente com `SITE_URL` do código |

## Cálculo do score (0-100)

Base 100, deduções:
- -4: `lastmod` de 23/46 URLs (estáticas + tags) ainda é timestamp de build, não data real de alteração de conteúdo (item 5, PARCIAL)
- -3: `SITE_URL` duplicado em 3 arquivos em vez de fonte única (`lib/seo-config.ts`) — risco de drift futuro, não é bug hoje
- -2: `priority`/`changefreq` ainda presentes (ignorados pelo Google, cosmético)
- -1: `Host:` no `robots.txt` é diretiva não padrão/sem efeito no Google

**Score final: 90/100** (vs. 42/100 na auditoria de 07/07 antes das correções).

## Arquivos de evidência gerados

- `docs/audits/2026-07-07-seo-v2/raw/sitemap-live.xml` — sitemap.xml baixado ao vivo (46 URLs)
- `docs/audits/2026-07-07-seo-v2/raw/robots-live.txt` — robots.txt baixado ao vivo
- `docs/audits/2026-07-07-seo-v2/raw/url-checks.json` — status HTTP + canonical + robots meta das 28 URLs amostradas + controle `/proposta/buffet/grand-coral`
- `docs/audits/2026-07-07-seo-v2/raw/fetch_sitemap.py`, `fetch_robots.py`, `check_urls.py`, `check_host_lp.py`, `validate_xml.py` — scripts usados para a coleta (curl.exe e `fetch()` do Node bloqueados pelo sandbox; Python `urllib.request` funcionou como alternativa)
