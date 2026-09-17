# Plano de Ação SEO — coraleventos.com.br (07/07/2026)

Priorizado por impacto/esforço. Referência completa: [FULL-AUDIT-REPORT.md](FULL-AUDIT-REPORT.md).

> **Status 07/07/2026 (mesmo dia, commit `077e052` mergeado em `main` e deployado):**
> Concluídos e verificados em produção: itens 1-10 (redirects WP live com 308, tags
> slugificadas e reduzidas de 62 para 9 com threshold 3, GEO real, hub /cidades +
> footer + breadcrumb, draft de QA removido, headers de segurança, titles revisados,
> FAQs duplicadas reescritas, GSC antigo cruzado: só 6 URLs indexadas, todas já
> cobertas). Pendentes (dependem do cliente): 11 (fluxo de reviews), 12 (Meta Pixel
> no GTM), 13-14 (autoridade externa/YouTube) e os itens Medium/Low.
> Nota: as URLs antigas de tag com %20 agora retornam 404 (as novas são slugificadas,
> ex. /blog/tag/interior-de-sp). Sem redirect por serem recentes e sem tração.

## 🔴 Critical — fazer imediatamente

| # | Ação | Onde | Esforço |
|---|---|---|---|
| 1 | Mergear `feat/migracao-buffet-decoracao-mobiliario` em `main` e deployar (restaura os redirects 301 do WordPress que hoje retornam 404 em produção) | Git/Vercel | 15 min |
| 2 | `MIN_POSTS_PER_TAG = 3` (remove ~49 tag pages doorway do site e do sitemap) | `lib/blog-utils.ts:213` | 1 linha |
| 3 | Corrigir coordenadas para -20.8809322, -47.5929521 (real do GBP; hoje ~1,3 km de erro) | `lib/seo-config.ts` (GEO) | 5 min |
| 4 | Linkar `/cidades/ribeirao-preto` e `/cidades/franca` no footer/home (hoje órfãs); criar hub `/cidades`; corrigir breadcrumb "Cidades atendidas" | `components/layout/footer.tsx`, `app/cidades/` | 2-4 h |
| 5 | Apagar `content/blog/teste-infraestrutura.mdx` (draft de QA live em produção) | content/blog | 1 min |

## 🟠 High — dentro de 1 semana

| # | Ação | Onde | Esforço |
|---|---|---|---|
| 6 | Adicionar `headers()` de segurança: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS com includeSubDomains (snippet em `raw/tecnico.md`); CSP depois em Report-Only | `next.config.mjs` | 30 min |
| 7 | Title template → `"%s | Espaço Coral"` e revisar titles longos de `/eventos`, `/estrutura`, `/estrutura/mobiliario` (~60 chars) | `app/layout.tsx:31` | 30 min |
| 8 | Slugificar tags (kebab-case sem acento) e remover a tag duplicada "15 anos" (colide com pillar `15-anos`) | `lib/blog-utils.ts`, `app/sitemap.ts`, frontmatters | 1-2 h |
| 9 | Reescrever as 2 FAQs duplicadas verbatim entre posts e definir `casamento-ar-livre-batatais` como pilar do cluster ar livre (satélites linkando para ele) | content/blog | 2-3 h |
| 10 | Cruzar lista completa de URLs indexadas do GSC do WordPress antigo com os 5 redirects atuais; adicionar faltantes | `next.config.mjs` | 1 h |
| 11 | Iniciar fluxo de pedido de avaliação pós-evento via WhatsApp (D+2, sem hiatos >18 dias) — maior alavanca do local pack (36-41 reviews vs 316 do líder Villa Casuarina) | Processo do negócio | contínuo |
| 12 | Confirmar Meta Pixel `1442151020219648` dentro do container GTM-NR95XJ6B (não está no código; se não estiver no GTM, conversões de campanhas não são rastreadas) | GTM | 15 min |

## 🟡 Medium — dentro de 1 mês

| # | Ação | Onde |
|---|---|---|
| 13 | Campanha de autoridade externa: listagem em 3-5 portais de casamento BR (Casar.com, Bodas.com.br, Zankyou), 1-2 matérias em imprensa regional (Batatais/Ribeirão/Franca). Backlinks hoje ~zero | Outreach |
| 14 | Canal YouTube com tour do espaço + depoimentos, `VideoObject` schema, embed em `/estrutura` e `/galeria` (maior correlação isolada com citação por IA) | Produção de conteúdo |
| 15 | Reordenar intros de 5-8 posts: resposta com número na 1ª frase, framing depois (janela 134-167 palavras) | content/blog |
| 16 | Atribuir fontes às estatísticas repetidas (IBGE, ABEOC, INMET) e variar authorBio + 1 caso real por post | content/blog |
| 17 | Popular `ImageGallery` de `/galeria` com as 16 imagens reais (gerar de `data/gallery.ts` compartilhado); adicionar width/height ao BlogPosting.image | `lib/schema.ts` |
| 18 | Enriquecer `Organization`: ContactPoint, address, telephone e Google Maps no sameAs; criar entidade Person da autora com url/sameAs | `lib/schema.ts` |
| 19 | `lastmod` real no sitemap: `post.lastUpdated ?? publishDate` nos posts; datas fixas por seção nas estáticas (hoje 77% das URLs usam timestamp do build) | `app/sitemap.ts` |
| 20 | Consolidar `SITE_URL`: importar de `lib/seo-config.ts` em `sitemap.ts`, `robots.ts` e `layout.tsx` (hoje 3 constantes duplicadas) | app/ |
| 21 | Atualizar `reviewCount` e documentar cadência mensal de sync com o GBP; exibir horário como texto em `/contato` | `lib/seo-config.ts`, `app/contato` |
| 22 | Rodar PSI/Lighthouse mobile e `@next/bundle-analyzer` (shared JS 233KB gz); `optimizePackageImports` para lucide-react | Build |
| 23 | H1 descritivo na home (complementar ao wordmark "CORAL"); garantir CTA WhatsApp acessível no header mobile | `components/sections/hero-section.tsx`, `header.tsx` |

## 🟢 Low — backlog

- IndexNow (chave em `public/` + ping pós-publish) para Bing/Yandex.
- Remover priority/changefreq do sitemap (ignorados pelo Google).
- Referência cruzada ao `/llms.txt` no robots; tabelas HTML paralelas aos gráficos SVG dos posts.
- Reduzir variantes do Playfair Display aos pesos/estilos usados.
- Limpar comentários TODO já resolvidos em `lib/seo-config.ts` (horário confirmado pelo GBP, fundação out/2024).
- Validar `["EventVenue","LocalBusiness"]` no Rich Results Test; verificar manualmente NAP nas bios do Instagram/Facebook e presença em diretórios.
- Documentar plano para `/proposta/` (disallow+noindex: se algo indexar, liberar crawl temporariamente para o Google ver o noindex).
- Repetir auditoria visual com Playwright local (screenshots desta rodada capturaram versão em cache e foram descartados).

## Expansão futura (quando houver capacidade editorial)

- Páginas de cidade para Sertãozinho, Brodowski, Altinópolis (hoje `areaServed` promete 8 municípios com só 2 páginas).
- Novos posts para engordar tags com 2 posts até o threshold de 3, reativando as tag pages naturalmente.
