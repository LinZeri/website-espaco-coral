# Schema / Dados Estruturados — Re-auditoria (07/07/2026, pós-commit 077e052)

> **Correção 08/07/2026 sobre o issue N2:** o valor "36 avaliações" veio de um snapshot da Business Listings API de 23/04/2026. O GBP live tem **41 avaliações** (verificado pelo cliente). O `reviewCount: 40` está defasado em 1 para menos, não em 4 para mais. A recomendação central do N2 continua: não manter número hardcoded sem rotina de sincronização; atualizar para 41.

## Metodologia e limitação desta rodada

Fonte primária: leitura completa de `lib/schema.ts` (gerador central de JSON-LD via
`@graph`) e `lib/seo-config.ts` (NAP/GEO/reviews, fonte única), mais o uso real dessas
funções em todas as rotas (`app/page.tsx`, `app/eventos/*`, `app/cidades/*`,
`app/blog/[slug]/page.tsx`, `app/blog/page.tsx`, `app/blog/tag/[tag]/page.tsx`,
`app/estrutura/*`, `app/galeria/page.tsx`, `app/sobre/page.tsx`, `app/contato/page.tsx`).
Como o site é 100% SSG e o JSON-LD é gerado por essas funções puras (sem lógica
condicional dependente de runtime/client), a leitura de código é equivalente ao HTML
que sai em produção para essas páginas.

**Importante:** o ambiente de execução desta subagente não teve acesso de rede (todas
as tentativas de `curl.exe`, incluindo a hosts neutros como `example.com`, e um teste
via `node -e fetch(...)`, foram bloqueadas pelo sandbox). Não foi possível confirmar
via HTTP ao vivo que o HTML servido em `coraleventos.com.br` bate 100% com o código-fonte
lido. Meça isso como uma verificação pendente para um agente com rede liberada (ex.:
`curl.exe -s https://coraleventos.com.br/ | grep -A200 "application/ld+json"`). Como
cross-check parcial, usei o dado fornecido pelo orquestrador via Google Business Profile
API (coordenadas, rating, endereço, telefone) contra as constantes em `lib/seo-config.ts`
— ver seção de validação abaixo.

---

## 1. Tabela de status: issues da auditoria de 07/07 (baseline)

| Issue (baseline) | Severidade baseline | Status | Evidência |
|---|---|---|---|
| GEO errado (~1,3 km do endereço real) | Critical | **CORRIGIDO** | `lib/seo-config.ts:35-38` → `latitude: -20.8809322, longitude: -47.5929521`. Bate com o dado de GBP API fornecido pelo orquestrador (`-20.881, -47.593`, mesma coordenada arredondada). Comentário no código cita a fonte ("Confirmadas em 07/07/2026 via ficha do Google Maps"). |
| FAQPage duplicado verbatim entre posts (`como-escolher-espaco-casamento-interior-sp` × `guia-casamento-batatais-2027`) | Medium/High (thin/duplicate content) | **CORRIGIDO** | Diff do commit `077e052` reescreve as duas respostas com ângulo próprio. Varredura em todos os 23 posts (`grep -h "answer:" content/blog/*.mdx \| sort \| uniq -c`) não encontrou nenhuma resposta repetida (109 perguntas, todas com contagem 1). Varredura equivalente nas 2 páginas de cidade (`franca`, `ribeirao-preto`) também não encontrou pergunta/resposta duplicada — são localizadas com números, rodovias e ângulos diferentes. |
| Host mismatch www/não-www (issue do schema.md antigo, score 76) | Critical (histórico) | **CORRIGIDO** (herdado, sem regressão) | `SITE_URL` consistente em `lib/seo-config.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`: todos apontam para `https://coraleventos.com.br` (não-www). Já havia sido validado como resolvido no relatório anterior (score 80); não há regressão no código atual. |
| ImageGallery de `/galeria` sem `image[]` | Medium | **PENDENTE** | `lib/schema.ts` função `galeriaSchema()` (linhas 326-346) não inclui array `image`. `components/sections/gallery-grid.tsx` renderiza 17 fotos (`grep -c "src:"` = 17) que não estão listadas no schema. |
| Organization sem `telephone`/`address`/`ContactPoint`; `sameAs` sem Google Maps | Medium | **PARCIAL** | `organization()` (linhas 61-74) continua sem `telephone`, `address` e `contactPoint` próprios, e `sameAs` só tem Instagram+Facebook. Porém o `venue()` (LocalBusiness/EventVenue, que é a entidade que de fato aparece nos resultados de negócio local) já tem `telephone`, `address`, `geo` e `hasMap` (linha 96, que é a propriedade schema.org correta para o link do Maps — mais adequada que forçar a URL do Maps dentro de `sameAs`). Rebaixo a urgência do "Google Maps em sameAs" porque `hasMap` já cumpre esse papel tecnicamente; mantenho pendente o enriquecimento da entidade `Organization` abstrata (usada como `publisher`/`author` em blog e `provider` em Service). |
| BlogPosting.image sem `width`/`height` | Low | **PENDENTE** | `lib/schema.ts` linhas 546-552: `blogPosting.image` só tem `@type`, `url`, `caption`. Sem `width`/`height` (Google recomenda ≥1200px explícito). |
| FAQPage não gera mais rich result para sites comerciais (restrição ago/2023) | Info | **PENDENTE (por natureza, não é "bug")** | `FAQPage` continua presente em `servicePageSchema` (casamentos/15-anos/corporativo) e `cityPageSchema` (Franca/Ribeirão Preto) e em posts de blog com `faq` no frontmatter. Site é comercial (venue de eventos), não gov/saúde → sem elegibilidade a rich result no Google. Manter apenas pelo valor de citação em IA (ChatGPT/Perplexity/Google AIO), não expandir com expectativa de estrela no SERP. Nenhuma ação corretiva necessária — é orientação, não bug. |
| `openingHours`/`foundingDate` com comentário TODO no código | Info | **PENDENTE (cosmético)** | `lib/seo-config.ts:16` (`founded: "2024", // confirmar com cliente`) e linha 89 (`// TODO: confirmar horário real com cliente`) continuam no código. O valor em si já foi validado contra o GBP real (seg-sáb 9h-18h) na rodada anterior — falta só limpar o comentário morto. |

---

## 2. Issues novos encontrados nesta rodada

| # | Severidade | Issue | Onde | Detalhe |
|---|---|---|---|---|
| N1 | **Medium** | `aggregateRating` idêntico reaplicado em 3 entidades `Service` distintas | `lib/schema.ts` função `service()` (linha 166) usada em `/eventos/casamentos`, `/eventos/15-anos`, `/eventos/corporativo` | As diretrizes do Google para review/rating structured data dizem explicitamente que o rating deve ser sobre o item específico marcado, não reaproveitado entre itens diferentes. Hoje o mesmo `AggregateRating` do negócio como um todo (5,0 / 40 avaliações) é copiado sem alteração para os três `Service` (casamentos, 15 anos, corporativo) — nenhum desses serviços tem 40 avaliações próprias, o rating é do negócio (`LocalBusiness`), não do "serviço de casamento" isoladamente. Isso é o padrão que o Google classifica como uso indevido de marcação de avaliação (risco de ação manual "Marcação de dados estruturados abusiva", categoria review markup). Recomendação: remover `aggregateRating` de `service()` e mantê-lo só em `venue()` (LocalBusiness/EventVenue), que é a entidade real avaliada no Google Business Profile. |
| N2 | **Medium** | `reviewCount: 40` desatualizado frente ao dado real do GBP | `lib/seo-config.ts:60` (`REVIEWS.reviewCount = 40`) | Dado confirmado nesta rodada via Google Business Profile API (fornecido pelo orquestrador): **36 avaliações**, não 40. O `ratingValue: 5` bate (GBP = 5,0★), mas o `reviewCount` está desatualizado em +4 (~11% acima do real). Um `AggregateRating.reviewCount` que não bate com a contagem pública do GBP é um risco de credibilidade/compliance de review markup (o usuário pode clicar e ver "36" no Maps vs "40" no schema/rich result). Corrigir para 36 em `lib/seo-config.ts` e documentar um processo de sync mensal (já listado como item 21 do action plan anterior, mas sem valor de referência até agora — agora há um valor real para aplicar). |
| N3 | **Low** | `SITE_URL` triplicado (não importado de `lib/seo-config.ts`) | `app/layout.tsx:26`, `app/sitemap.ts:4`, `app/robots.ts:3` | Os três arquivos redeclaram `const SITE_URL = "https://coraleventos.com.br"` em vez de importar de `lib/seo-config.ts` (que já exporta `SITE_URL`). Hoje os quatro valores (schema + esses 3) estão sincronizados manualmente, mas é risco de drift silencioso: se alguém trocar domínio/protocolo em um arquivo e esquecer os outros, os `@id` do `@graph` passam a apontar para hosts diferentes do canônico/sitemap/robots. Item 20 do plano de ação anterior, ainda não aplicado. |
| N4 | **Low** | `Person` do autor do post sem `url`/`sameAs`/`@id` | `lib/schema.ts` linhas 537-543 (`author` dentro de `blogPostingSchema`) | O autor é serializado como `{"@type": "Person", "name": ..., "worksFor": {"@id": ORG_ID}}`, sem `url` nem `sameAs`. Isso limita a entidade do autor a texto solto, sem link para uma página de autor ou perfil (bio). Já apontado na seção de AI Search Readiness do relatório anterior como item de E-E-A-T; replicando aqui porque também é uma lacuna de schema estrito (Person sem identidade própria enfraquece `author` do `BlogPosting`/`NewsArticle` nas diretrizes do Google para artigos). |
| N5 | **Info** | `JsonLd` usa `JSON.stringify` sem sanitização de `</script>` | `components/seo/json-ld.tsx:10` | `dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}` não escapa `<` dentro de strings. Risco teórico apenas: nenhum campo hoje contém `</script>` ou HTML bruto (todo o conteúdo vem de constantes/frontmatter controlados pelo próprio time), mas se um `FaqItem.answer` de um post futuro contiver a sequência `</script>` dentro do texto, quebra o parsing do restante da página. Mitigação de baixo esforço: `JSON.stringify(data).replace(/</g, "\\u003c")`. |

---

## 3. Validação de sintaxe e estrutura por tipo de página

| Página-tipo | Função geradora | `@context` | `@graph`/`@id` | Tipos presentes | Depreciados? | Observação |
|---|---|---|---|---|---|---|
| Home (`/`) | `homeSchema()` | `https://schema.org` ✅ | `@graph` com `#organization`, `#website`, `#venue` ✅ | Organization, WebSite, [EventVenue,LocalBusiness], BreadcrumbList | Nenhum | AggregateRating correto aqui (é a entidade certa: o negócio). |
| `/eventos/casamentos` (e 15-anos, corporativo) | `servicePageSchema()` | ✅ | `@graph`; `Service.@id` = `{url}#service` ✅ | Organization, [EventVenue,LocalBusiness], Service, BreadcrumbList, FAQPage | Nenhum | Ver N1 (aggregateRating reaproveitado no Service). FAQPage: ver nota Info da tabela 1. |
| `/cidades/ribeirao-preto`, `/cidades/franca` | `cityPageSchema()` | ✅ | `@graph`; `FAQPage.@id` = `{url}#faq` ✅ | Organization, [EventVenue,LocalBusiness], FAQPage, BreadcrumbList | Nenhum | FAQs conferidas: sem duplicação verbatim entre as duas cidades (perguntas e respostas usam distância/rodovia/ângulo próprios de cada cidade). |
| Post de blog (ex. `guia-casamento-batatais-2027`) | `blogPostingSchema()` | ✅ | `@graph`; `BlogPosting.@id` = `{url}#article`; `mainEntityOfPage.@id` = URL canônica; `isPartOf` → `{SITE_URL}/blog#blog` ✅ | Organization, BlogPosting, BreadcrumbList, FAQPage (se houver `faq` no frontmatter) | Nenhum | `headline` truncado a 110 chars (linha 525) ✅. `image` presente em 100% dos 23 posts (frontmatter `coverImage` obrigatório), mas sem `width`/`height` (pendente, ver tabela 1). `author` sempre presente (100% dos posts têm `author:` no frontmatter). `datePublished`/`dateModified` presentes (fallback correto quando `lastUpdated` ausente). |
| `/blog` (índice) | `blogIndexSchema()` | ✅ | `@graph`; `Blog.@id` = `#blog` ✅ | Organization, Blog, BreadcrumbList | Nenhum | `blogPost[]` lista os posts recentes só com `headline`/`url`/`datePublished` (sem `@id` cross-referenciando o `BlogPosting.@id` de cada post individual — oportunidade de link mais forte, severidade Baixa/Info). |
| `/blog/tag/[tag]` | `blogTagSchema()` | ✅ | `@graph`; `CollectionPage.@id` = `#collection` ✅ | Organization, CollectionPage, ItemList (aninhado, sem `@id` próprio), BreadcrumbList | Nenhum | Estrutura ok. Threshold de 3 posts/tag (fix do commit 077e052) já reduz risco de thin content nessas páginas. |
| `/galeria` | `galeriaSchema()` | ✅ | `@graph`; `ImageGallery.@id` = `#gallery` ✅ | Organization, ImageGallery, BreadcrumbList | Nenhum | `ImageGallery` sem `image[]` (pendente, tabela 1). |
| `/sobre` | `sobreSchema()` | ✅ | `@graph` com `isPartOf`→website, `about`→organization, `mainEntity`→venue, todos por `@id` ✅ | Organization, [EventVenue,LocalBusiness], AboutPage, BreadcrumbList | Nenhum | Cross-linking por `@id` é o ponto mais forte do schema deste site. |
| `/contato` | `contatoSchema()` | ✅ | `@graph`; `ContactPage.about`→`{@id: VENUE_ID}` ✅ | Organization, [EventVenue,LocalBusiness], ContactPage, BreadcrumbList | Nenhum | OK. |
| `/estrutura`, `/estrutura/mobiliario` | `estruturaSchema()`/`mobiliarioSchema()` | ✅ | `@graph` ✅ | Organization, [EventVenue,LocalBusiness], BreadcrumbList | Nenhum | Breadcrumb de mobiliário aninha corretamente (Início > Estrutura > Mobiliário). |
| `/eventos` (hub) | `eventosHubSchema()` | ✅ | `@graph`; `ItemList.@id` = `#itemlist` ✅ | Organization, ItemList, BreadcrumbList | Nenhum | OK. |
| `/cidades` (hub) | `cidadesHubSchema()` | ✅ | `@graph`; `ItemList.@id` = `#itemlist` ✅ | Organization, [EventVenue,LocalBusiness], ItemList, BreadcrumbList | Nenhum | OK. |

**Nenhum tipo depreciado (`HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`,
`LearningVideo`) encontrado em nenhum arquivo do projeto** (`grep -rn` em `app/`, `lib/`,
`components/` retornou zero ocorrências).

---

## 4. AggregateRating: fonte e uso

- **Fonte:** Google Business Profile do Espaço Coral (mesma ficha usada para `hasMap`,
  endereço e telefone). Confirmado nesta rodada via GBP API (fornecido pelo orquestrador):
  **5,0★, 36 avaliações**.
- **Uso correto:** na entidade `venue()` ([EventVenue, LocalBusiness]), replicada nas
  páginas onde essa entidade aparece (home, `/sobre`, `/contato`, `/estrutura`,
  `/cidades/*`, hub `/cidades`). Isso é apropriado: é o mesmo negócio, mesma nota, em
  todas as páginas.
- **Uso questionável:** reaproveitado também dentro de `service()`, aplicado
  identicamente aos 3 `Service` de `/eventos/casamentos`, `/eventos/15-anos` e
  `/eventos/corporativo` (ver N1 acima). Seriam 3 entidades diferentes exibindo a
  mesma nota/contagem de um negócio, não de um "serviço" com avaliações próprias.
- **Discrepância a corrigir:** `reviewCount` hardcoded em 40, real é 36 (N2).

---

## 5. BreadcrumbList

Implementação única (`breadcrumb()` em `lib/schema.ts`) usada em todas as páginas.
Sempre inclui "Início" como primeiro item, `position` sequencial a partir de 1, e
resolve URLs relativas para absolutas (`item.url.startsWith("http") ? ... : SITE_URL + url`).
Sem inconsistências encontradas. Hub `/cidades` com breadcrumb "Cidades atendidas"
corrigido no commit 077e052 (antes apontava para a home).

---

## 6. Oportunidades de schema ainda não exploradas

| Oportunidade | Prioridade sugerida | Nota |
|---|---|---|
| `ImageObject[]` populando `ImageGallery.image` em `/galeria` | Medium | Já mapeado no plano de ação anterior (item 17); gerar de `data/gallery.ts` compartilhado com `gallery-grid.tsx` para não duplicar fonte. |
| `VideoObject` para vídeo institucional/depoimentos (se/quando existir canal YouTube) | Baixa (depende de produção de conteúdo ainda não feita) | Consultar `~/.claude/skills/seo/schema/templates.json` quando houver vídeo real para não inventar URLs/duração. |
| `Event` para evento pontual real (ex.: se o Espaço Coral abrir para visitação pública em data específica, tipo "casa aberta") | Baixa/oportunista | Não recomendado para os serviços recorrentes (casamentos/15 anos/corporativo) — `Event` no schema.org é para uma ocorrência com data/hora específica, não um tipo de serviço contínuo. Usar apenas se houver um evento datado real (ex. aniversário do espaço, feira de noivas no local). |
| `Person` com `url`/`sameAs` para a autora do blog | Low | Ver N4. Reforça E-E-A-T e permite reaproveitar a mesma entidade `Person` (`@id`) em todos os posts da autora. |
| `Review` individuais (não só `AggregateRating`) na home ou em página de depoimentos | Low/oportunista | Hoje só há o agregado. Reviews individuais com `author`/`reviewBody` reais (não inventados) reforçam prova social, mas exigem texto verbatim de clientes reais — não gerar sem esse insumo. |

---

## Score Schema: 86/100

**Composição do score:**
- Arquitetura (`@graph`/`@id`, fonte única, zero tipos depreciados, BreadcrumbList
  consistente em 100% das páginas-tipo): forte, sem regressão.
- Os dois itens que motivaram a nota anterior de 80 (GEO errado, FAQ duplicado
  verbatim) estão **confirmados corrigidos** nesta rodada — ganho real de pontos.
- Descontos desta rodada: `aggregateRating` reaproveitado indevidamente em 3 páginas
  de `Service` (N1, Medium — risco de guideline de review markup), `reviewCount`
  desatualizado frente ao GBP real (N2, Medium), `ImageGallery` ainda sem `image[]`
  (pendente, Medium), `Organization` ainda sem `telephone`/`address`/`contactPoint`
  próprios (parcial, Medium), mais itens de cauda longa (Low): `BlogPosting.image`
  sem dimensões, `SITE_URL` triplicado, `Person` do autor sem identidade própria.
- Nenhum item Critical remanescente.

---

## Referências de arquivo

- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\lib\schema.ts`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\lib\seo-config.ts`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\components\seo\json-ld.tsx`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\app\page.tsx`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\app\eventos\casamentos\page.tsx`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\app\cidades\ribeirao-preto\page.tsx`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\app\cidades\franca\page.tsx`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\app\blog\[slug]\page.tsx`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\app\galeria\page.tsx`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\app\layout.tsx`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\app\sitemap.ts`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\app\robots.ts`
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\docs\audits\2026-07-07-seo\FULL-AUDIT-REPORT.md` (baseline, seção 4)
- `w:\Etuos Clientes\Espaço Coral\website-espaco-coral\docs\audits\2026-07-07-seo\ACTION-PLAN.md` (baseline, itens 3, 9, 17, 18, 19, 20, 21)
