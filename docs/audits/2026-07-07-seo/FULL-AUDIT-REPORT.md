# Auditoria SEO Completa — coraleventos.com.br

**Data:** 07/07/2026
**Escopo:** 98 URLs do sitemap (13 páginas core, 23 posts de blog, 62 páginas de tag), código-fonte completo (Next.js 14 App Router, SSG, Vercel), dados live via DataForSEO (SERP, GBP, backlinks, Lighthouse).
**Metodologia:** 8 especialistas em paralelo (técnico, conteúdo, schema, sitemap, performance, GEO/IA, local, visual) + verificações ao vivo do orquestrador. Relatórios brutos em `raw/`.

---

## Sumário executivo

### SEO Health Score: 77/100

| Categoria | Peso | Score | Ponderado |
|---|---|---|---|
| SEO Técnico | 22% | 72 | 15,8 |
| Qualidade de Conteúdo | 23% | 72 | 16,6 |
| On-Page SEO | 20% | 76 | 15,2 |
| Schema / Dados Estruturados | 10% | 80 | 8,0 |
| Performance (CWV) | 10% | 92 | 9,2 |
| AI Search Readiness (GEO) | 10% | 77 | 7,7 |
| Imagens | 5% | 85 | 4,3 |
| **Total** | | | **≈77** |

Score complementar (fora da ponderação): **SEO Local 68/100**.

**Tipo de negócio detectado:** serviço local brick-and-mortar (espaço de eventos em Batatais, SP, com área de cobertura regional).

**Leitura geral:** a fundação técnica é muito acima da média para um site desse porte (SSG puro, disciplina de CWV exemplar, schema em `@graph` com fonte única, llms.txt de referência, host canônico perfeitamente alinhado). Os problemas se concentram em três frentes: (1) o blog gera 49 páginas de tag thin/doorway indexáveis por causa de um filtro morto no código; (2) o schema local usa coordenadas erradas em ~1,3 km, num fator que responde por mais da metade do ranking local; (3) autoridade externa quase inexistente (backlinks ~zero, marca sem corroboração fora do próprio site e do GBP).

### Top 5 issues críticos

1. **49 de 62 páginas de tag são doorway pages indexáveis.** `MIN_POSTS_PER_TAG = 1` em `lib/blog-utils.ts:213` é um filtro que nunca filtra (o comentário do código documenta a intenção de evitar exatamente isso). 79% do sitemap de tags é conteúdo fino que dilui o site inteiro perante o Helpful Content system.
2. **Coordenadas geográficas erradas no schema LocalBusiness.** Código usa o centro de Batatais (-20.8911, -47.5856); o local real é -20.8809, -47.5930 (~1,3 km de erro). Proximidade é o maior fator de ranking do local pack.
3. **Redirects 301 do WordPress antigo não estão em produção.** `/fotos`, `/author/...` e `/uncategorized/...` retornam 404 ao vivo: o commit `fe572f0` com os redirects existe apenas na branch `feat/migracao-buffet-decoracao-mobiliario`, não em `main`. Link equity do site antigo sendo perdido agora.
4. **Páginas de cidade órfãs.** `/cidades/ribeirao-preto` e `/cidades/franca` têm bom conteúdo mas zero links internos (não estão no header, footer nem home) — só existem no sitemap. Breadcrumb "Cidades atendidas" aponta para `/`.
5. **Autoridade externa ~zero.** Perfil de backlinks vazio no índice, Bing não retorna a marca, sem presença em portais de casamento, imprensa ou YouTube. É o teto de crescimento orgânico e de citação por IA (ChatGPT/Bing Copilot).

### Top 5 quick wins

1. `MIN_POSTS_PER_TAG = 3` em `lib/blog-utils.ts:213` — 1 linha, remove ~49 URLs thin do site e do sitemap.
2. **Mergear a branch atual em `main` e deployar** — restaura os redirects 301 do WordPress imediatamente.
3. Corrigir `GEO` em `lib/seo-config.ts` para -20.8809322, -47.5929521.
4. Trocar o title template em `app/layout.tsx:31` de `"%s | Espaço Coral, Batatais, SP"` para `"%s | Espaço Coral"` (hoje duplica "Batatais, SP" e estoura 60 caracteres em várias páginas).
5. Apagar `content/blog/teste-infraestrutura.mdx` (draft de QA acessível em produção; o próprio frontmatter pede remoção).

### Falsos alarmes descartados na verificação

- **www vs não-www: NÃO é problema.** Verificado ao vivo sem follow de redirect: `www` → 308 → apex, `http` → 308 → `https`. Código, sitemap, canonical, robots e produção estão 100% alinhados no apex `coraleventos.com.br`.
- **"Produção é WordPress": falso.** A home live tem 384 referências a `/_next`, zero `wp-content`, H1 presente, 7 links `wa.me` e todas as rotas core retornam 200. O sandbox do agente visual capturou uma versão obsoleta em cache.

---

## 1. SEO Técnico — 72/100

**Verificado ao vivo:** host canônico correto (apex, 308 de www/http); todas as páginas core 200; 404 real funciona; HSTS presente; HTML com `Cache-Control: public, max-age=0, must-revalidate` (correto para SSG).

| Severidade | Issue | Evidência | Correção |
|---|---|---|---|
| Critical | Redirects WP antigos 404 em produção | `/fotos`, `/author/linzeripgmail-com`, `/uncategorized/...` → 404 live; commit `fe572f0` só na branch | Mergear em `main` + deploy; depois cruzar lista completa de URLs do GSC antigo (só 5 mapeados em `next.config.mjs`) |
| High | Headers de segurança ausentes | Live: só HSTS (sem includeSubDomains/preload); sem X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP | Adicionar `headers()` em `next.config.mjs` (snippet em `raw/tecnico.md`); CSP em Report-Only primeiro (GTM) |
| High | 49 tag pages thin indexáveis | `lib/blog-utils.ts:213` filtro morto | `MIN_POSTS_PER_TAG = 3` |
| High | URLs de tag com espaço/acento (%20, %C3%B4) | 26/62 slugs; `encodeURIComponent` direto sobre texto livre | `slugifyTag()` kebab-case sem acento em blog-utils, rota e sitemap |
| Medium | IndexNow não implementado | Sem chave em `public/`, sem ping | Chave + script npm de ping pós-publish (ganho para Bing) |
| Medium | `/proposta/` com disallow + noindex | Contradição clássica: bot bloqueado não vê o noindex | Documentar plano: se indexar, remover disallow temporariamente |
| Low | `founded`, comentários TODO residuais | `lib/seo-config.ts` | Limpar (dados já confirmados: fundação out/2024, horário bate com GBP) |

**Pontos fortes:** 100% SSG com conteúdo no HTML estático; scroll listeners passivos, sem useState de scroll, LCP com priority+sizes, dynamic imports, display swap, grain estático (todas as regras do CLAUDE.md seguidas); canonicals consistentes em 15+ páginas; robots/sitemap via MetadataRoute; `/proposta` isolado; `/lp` ainda não existe.

## 2. Qualidade de Conteúdo — 72/100 (E-E-A-T 68/100)

E-E-A-T: Experience 65, Expertise 70, Authoritativeness 55, Trustworthiness 80.

| Severidade | Issue | Evidência | Correção |
|---|---|---|---|
| Critical | 49 tag pages doorway (mesmo achado do técnico/sitemap) | H1 genérico + 1 card + meta templática | `MIN_POSTS_PER_TAG = 3` ou manter só pillars |
| High | FAQs duplicadas verbatim entre posts | "E se chover..." em `casamento-ar-livre-batatais` e `como-escolher-espaco-casamento-interior-sp`; "Vale a pena casar no interior..." em `como-escolher...` e `guia-casamento-batatais-2027` — vira FAQPage JSON-LD duplicado | Reescrever com ângulo próprio ou remover + link interno |
| High | Canibalização no cluster "casamento ao ar livre" | 4 posts sobrepostos (ar-livre, pôr do sol, primavera, outono) repetindo as mesmas afirmações centrais | `casamento-ar-livre-batatais` como pilar; satélites diferenciados linkando ao pilar |
| Medium | Draft de QA publicado | `teste-infraestrutura.mdx` live (200) via `includeDrafts:true` | Apagar o arquivo |
| Medium | Estrutura repetitiva em escala (sinal AI-scaled) | Mesma authorBio 23/23 posts, mesmos 4-5 FAQs, mesmo CTA | Variar bio por tema + 1 caso real por post (reforça Experience) |
| Medium | Estatísticas sem fonte | "1,3 milhão de casamentos" em 3 posts; pôr do sol; pluviometria | Atribuição inline (IBGE, ABEOC, INMET) |

**Pontos fortes:** `/cidades/*` NÃO são doorways (conteúdo único e útil); posts densos com números concretos; regra sem-preço 100% respeitada; sem em dash; CTAs WhatsApp consistentes.

## 3. On-Page SEO — 76/100

| Severidade | Issue | Evidência | Correção |
|---|---|---|---|
| High | Title template redundante | `app/layout.tsx:31` gera "… Batatais, SP \| Espaço Coral, Batatais, SP" (até 83 chars) | Template `"%s | Espaço Coral"` + revisar titles de `/eventos`, `/estrutura` |
| Medium | H1 da home é wordmark decorativo | "CORAL" letra a letra em spans animados | H1 descritivo com keyword local (visível ou complementar) |
| Medium | CTA WhatsApp oculto no header mobile | `header.tsx` com `hidden md:flex` | Confirmar botão flutuante (`whatsapp-button.tsx`) cobre mobile; senão, expor no header |
| Low | Meta descriptions templáticas nas tag pages | Fórmula "1 post publicado sobre X" | Resolve junto com o fix das tags |

Metadata, H1 únicos e hierarquia de headings estão bem implementados nas páginas core; title da home é bom ("Espaço Coral | Espaço para Casamentos e Eventos em Batatais, SP").

## 4. Schema / Dados Estruturados — 80/100

Arquitetura madura: `@graph` com `@id` estáveis, fonte única (`lib/seo-config.ts`), Organization + EventVenue/LocalBusiness + AggregateRating + WebSite + Service + FAQPage + BlogPosting + BreadcrumbList, sem tipos depreciados. Host das URLs do schema bate com o canônico (verificado).

| Severidade | Issue | Correção |
|---|---|---|
| Critical (local) | GEO errado (~1,3 km) | `lib/seo-config.ts` → -20.8809322, -47.5929521 |
| Medium | ImageGallery de `/galeria` sem imagens | Gerar `image[]` de um `data/gallery.ts` compartilhado com `gallery-grid.tsx` (JSON-LD pronto em `raw/schema.md`/transcript) |
| Medium | Organization sem telephone/address/ContactPoint; sameAs sem Google Maps | Enriquecer `organization()` (JSON-LD pronto) |
| Low | BlogPosting.image sem width/height | Declarar dimensões (1200px+) |
| Info | FAQPage não gera mais rich result (restrição Google ago/2023) | Manter pelo valor GEO; não expandir com expectativa de estrela |
| Info | openingHours/foundingDate tinham TODO | Horário bate com GBP (seg-sáb 9-18h) e fundação está em `/sobre`; limpar comentários |

## 5. Performance — 92/100

**Lighthouse live (desktop, home):** Performance 99, FCP 0,51s, LCP 0,66s, CLS 0,003, TBT 4,5ms, TTI 1,98s, peso 1,02MB. Accessibility 87, Best Practices 100, SEO 100. Mobile não medido nesta rodada (rodar PSI mobile como follow-up).

| Severidade | Issue | Correção |
|---|---|---|
| Medium | Shared JS ~233KB gzip em toda página | `@next/bundle-analyzer` no chunk `fd9d1056` (53,6KB gz); `optimizePackageImports` para lucide-react |
| Medium | Meta Pixel `1442151020219648` não encontrado no código | Confirmar se está no container GTM-NR95XJ6B; senão, é lacuna de rastreamento de conversão (regra do CLAUDE.md) |
| Low | Playfair Display 3 pesos × 2 estilos = 6 arquivos | Reduzir aos usados; confirmar preload de fonte em produção |

**Pontos fortes:** LCP com preload+fetchPriority; chunk da home 4,6KB gz; CSS 7,6KB gz; fontes self-hosted com fallback métrico; GTM afterInteractive; DOM ~430 elementos.

## 6. AI Search Readiness (GEO) — 77/100

Citabilidade 88, Estrutura 90, Multi-modal 55, Autoridade/marca 50, Acessibilidade técnica 92. Por plataforma (estimado): Google AIO ~78, Perplexity ~80, ChatGPT ~65, Bing Copilot ~55.

| Severidade | Issue | Correção |
|---|---|---|
| High | Corroboração externa de marca quase inexistente | YouTube (tour + depoimentos, correlação ~0.74 com citação em IA); 3-5 portais de casamento; imprensa local |
| Medium | Resposta direta chega depois do framing nas intros | Número na 1ª frase (≤25 palavras), nuance depois; ajustar 5-8 posts |
| Medium | Autor sem entidade (Person sem url/sameAs) | Bio da autora com URL própria + sameAs no schema |
| Low | robots.ts sem referência ao llms.txt; SVGs sem tabela HTML paralela | Comentário cruzado; `<table>` com os mesmos dados |

**Pontos fortes:** todos os bots de IA liberados; `public/llms.txt` exemplar; blocos "Em resumo" extraíveis; H2 em pergunta; FAQ schema sincronizado com conteúdo visível.

## 7. SEO Local — 68/100 (complementar)

**GBP:** verificado, 5,0★ com 36-41 avaliações, 34 fotos, NAP 100% consistente entre site/schema/GBP (ponto mais forte da auditoria). **Posição:** 3º no local pack de "espaço para eventos batatais", atrás de Maria Flor (4,6/41) e Villa Casuarina (4,8/316) — perde por volume de reviews, não por nota.

| Severidade | Issue | Correção |
|---|---|---|
| Critical | GEO errado no schema | (mesmo item do schema) |
| Critical | Páginas de cidade órfãs + sem hub `/cidades` | Seção "Atendemos" no footer/home; hub `/cidades`; corrigir breadcrumb |
| Critical (estratégico) | Déficit de reviews (36-41 vs 316 do líder) | Fluxo de pedido de avaliação pós-evento via WhatsApp (D+2); evitar hiatos >18 dias |
| High | `areaServed` com 8 municípios, só 2 com página | Expandir gradualmente (Sertãozinho, Brodowski...) ou reduzir claim |
| High | `reviewCount: 40` hardcoded sem processo de sync | Atualizar + cadência mensal documentada |
| Medium | Horário só no schema, não visível em `/contato` | Exibir como texto; verificar diretórios (Casar.com, Bodas, GuiaMais) manualmente |

## 8. Imagens — 85/100

WebP em todo o pipeline, `next/image` com alt e sizes, hero com priority, taxonomia própria sem stock. Gaps: ImageGallery schema vazio, BlogPosting.image sem dimensões, srcset até 3840w para fontes de 1280px (ruído inofensivo).

## Dados live (DataForSEO)

- **Rankings:** só 1 keyword no índice ("espaço coral", pos. 4, 170 buscas/mês). Blog ainda sem tração registrada no índice (recente).
- **SERP alvo:** 3º orgânico e 3º local pack para "espaço para eventos batatais"; Villa Casuarina domina (Instagram 13,9k, Facebook 30,2k, 316 reviews). Reel do próprio Espaço Coral é o 1º item do bloco de vídeos curtos.
- **Backlinks:** perfil vazio no índice — confirma o gap de autoridade.

## Limitações desta auditoria

- Sandbox dos subagentes sem rede: verificações live foram refeitas pelo orquestrador (host, headers, status codes, HTML). Screenshots do agente visual capturaram versão obsoleta em cache e foram descartados; repetir auditoria visual localmente.
- PSI/CrUX de campo não coletados (sem credenciais Google); Lighthouse mobile pendente.
- Citações em diretórios de terceiros e bios sociais: verificar manualmente.
