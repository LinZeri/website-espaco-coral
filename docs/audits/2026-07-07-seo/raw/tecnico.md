# Técnico — Score 64/100 (agente, pré-verificação) → recalibrar para ~78 após verificação live do orquestrador

CORREÇÃO DO ORQUESTRADOR (verificado ao vivo, sem redirect-follow):
- https://coraleventos.com.br/ => 200 (host primário)
- https://www.coraleventos.com.br/ => 308 → apex ✔
- http://coraleventos.com.br/ => 308 → https apex ✔
- http://www → 308 → https://www → 308 → apex (2 hops, aceitável)
- CONCLUSÃO: C1 (duplicação www/non-www) NÃO EXISTE. Código (SITE_URL apex), sitemap, canonical, robots e produção 100% alinhados. O falso alarme veio dos sandboxes sem rede.

Issues reais (confirmadas no código):
- HIGH C2: nenhum header de segurança (next.config.mjs sem headers(); sem vercel.json/middleware). Adicionar HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy (snippet pronto no transcript). CSP com cuidado por causa do GTM.
- HIGH H1: 49/62 tag pages thin (MIN_POSTS_PER_TAG=1 é filtro morto em lib/blog-utils.ts:213) — mesmo achado dos agentes de conteúdo/sitemap.
- HIGH H2: tags não slugificadas (%20, acentos) — 26/62 com espaço.
- HIGH H3: só 5 redirects do WordPress antigo em next.config.mjs; comentário referencia levantamento maior no GSC antigo. Cruzar lista completa do GSC.
- MEDIUM M1: IndexNow não implementado (ganho fácil para Bing).
- MEDIUM M2: GEO aproximado em lib/seo-config.ts:31-39.
- MEDIUM M3: OPENING_HOURS não confirmado (lib/seo-config.ts:88-94) — mas GBP real mostra seg-sáb 9-18h, batendo.
- MEDIUM M4: /proposta/ com disallow+noindex (contradição clássica: bot bloqueado não vê o noindex). Documentar plano se algo indexar.
- LOW: founded "2024" não confirmado; generateMetadata da tag page com título genérico redundante.

Pontos fortes: 100% SSG com conteúdo no HTML estático; disciplina CWV exemplar (passive scroll, sem useState de scroll, priority+sizes no LCP, dynamic imports, display swap, grain estático); canonicals 100% consistentes; robots/sitemap via MetadataRoute; /proposta isolado; /lp ainda não existe.

Subscores do agente: Crawlability 85, Indexability 50, Security 35, URL 70, Mobile 85, CWV-código 88, Schema 88, JS rendering 95, IndexNow 0.

## Verificação live adicional (orquestrador)
- Headers de segurança live (apex): HSTS presente (max-age=63072000, sem includeSubDomains/preload); X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy TODOS AUSENTES. Confirma C2.
- REDIRECTS WORDPRESS QUEBRADOS EM PRODUÇÃO: /fotos, /author/linzeripgmail-com e /uncategorized/... retornam 404 ao vivo. Causa: commit fe572f0 (redirects 301) está APENAS na branch feat/migracao-buffet-decoracao-mobiliario, não em origin/main (produção está em 486896b). Correção: mergear a branch para main e deployar. Vira issue HIGH acionável imediata.
- Status codes: todas as 8 páginas core amostradas 200; tag pages 200; 404 real para URL inexistente OK.
- /blog/teste-infraestrutura retorna 200 em produção (draft de QA live, com noindex) — confirma achado GEO/conteúdo: apagar arquivo.
- Cache-Control do HTML: public, max-age=0, must-revalidate (correto para SSG na Vercel).
