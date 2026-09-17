# Sitemap — Score 42/100

- CRÍTICO: host do sitemap (apex, sem www) não bate com host de produção (www). SITE_URL redefinido localmente em app/sitemap.ts:4, app/robots.ts:3, app/layout.tsx:24 (lib/seo-config.ts existe como "fonte única" mas NÃO é importado por eles). Sem redirect apex↔www em next.config.mjs nem middleware — só possível no Vercel dashboard. Se Vercel redireciona apex→www, TODAS as 98 URLs do sitemap são origem de redirect. Correção: decidir host canônico (conferir GSC), importar SITE_URL de lib/seo-config.ts nos 3 arquivos, 301 no Vercel.
- ALTO: 49/62 tag pages (79%) têm 1 post só (doorway). Causa raiz: lib/blog-utils.ts:213 MIN_POSTS_PER_TAG = 1 (filtro morto, comentário diz que deveria evitar thin pages). Correção: = 3. Remove as 49 do generateStaticParams E do sitemap automaticamente. Tags saudáveis >=3 posts: casamento (31), batatais (22), estrutura (6), interior de sp (5), decoração (4), ribeirão preto (4), corporativo (3), evento corporativo (3), 15-anos/15 anos (3).
- ALTO: URLs duplicadas /blog/tag/15-anos (pillar) vs /blog/tag/15%20anos (tag) — mesmos 3 posts, 2 URLs indexáveis. Remover tag "15 anos" do frontmatter dos 3 posts ou slugificar tags.
- MÉDIO: tags não slugificadas (encodeURIComponent direto em lib/blog-utils.ts:275 e app/sitemap.ts:50) → URLs com %20/%C3%B4. Criar slugifyTag() (lowercase, sem acento, hífen).
- MÉDIO: lastmod falso: new Date() do build para 77% das URLs; posts usam publishDate e ignoram frontmatter lastUpdated. Correção: new Date(post.lastUpdated ?? post.publishDate).
- BAIXO: priority/changefreq ignorados pelo Google, candidatos a remoção.

Checklist: XML válido OK; 98 URLs OK; /proposta/* e drafts corretamente fora; todas as rotas indexáveis cobertas.

Quick wins: (1) MIN_POSTS_PER_TAG=3; (2) consolidar SITE_URL; (3) resolver apex vs www no Vercel/GSC; (4) remover tag "15 anos"; (5) lastUpdated no lastmod.
