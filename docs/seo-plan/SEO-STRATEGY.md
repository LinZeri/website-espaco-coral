# SEO Strategy — Espaço Coral

> Plano estratégico de 12 meses para ranqueamento orgânico, presença em pacotes locais (Local Pack) e captação de noivas, debutantes e famílias do interior paulista via WhatsApp.
>
> Documento mestre do `/seo-plan`. Complementa (não substitui) o `docs/seo-strategy.md`, que descreve a base técnica já implementada.

---

## 1. Discovery — Diagnóstico inicial

### 1.1 Tipo de negócio
- **Categoria:** Local Service Business — Buffet/Espaço de Eventos (sem produção de alimentos próprios; o cliente contrata fornecedores).
- **Modelo:** brick-and-mortar, atendimento físico no endereço Rua Matheus Marinelli, 18, Jardim Elena, Batatais, SP, 14300-111.
- **Sazonalidade:** alta — casamentos concentrados de março a novembro; 15 anos com pico em julho/agosto; corporativo concentrado em novembro/dezembro.

### 1.2 Audiência-alvo (priorizada)

| Persona | Volume relativo | Ticket médio relativo | Prioridade SEO |
|---|---|---|---|
| Noiva (planejamento de casamento) | Alto | Muito alto | **P1** |
| Família de debutante | Médio | Alto | **P1** |
| Comprador corporativo (RH / sec. executiva) | Baixo | Médio-alto | P2 |
| Famílias (aniversários, bodas, batizados) | Médio | Médio | P2 |

A maior alavanca de receita é a noiva — toda decisão de SEO desempata pelo benefício dela.

### 1.3 Diferenciais reais para usar como copy
- 12.000 m² (área generosa para foto, decoração e cerimônia ao ar livre).
- Capacidade até 320 convidados sentados.
- **Cerimônia ao céu aberto** com área verde — diferencial raro na região.
- **Sala privativa** da homenageada (com chuveiro, banheiro e maquiagem).
- **Espaço kids com monitora** — diferencial enorme para famílias e mães-noivas.
- 36 avaliações 100% 5★ no Google Business Profile (prova social pesada).
- Estacionamento orientado para 40 carros, gerador, climatização, banheiros com camareira.
- Cidade-sede Batatais com acesso fácil a Ribeirão Preto e Franca.

### 1.4 Avaliação rápida do site atual (em desenvolvimento)
| Item | Status atual | Observação |
|---|---|---|
| Stack | ✅ Next.js 14 App Router, SSG | Ideal para SEO local |
| Indexação | ✅ `robots.ts` correto, `/lp/` bloqueado | Implementado |
| Sitemap | ✅ `app/sitemap.ts` com 8 URLs | Falta sitemap de blog (futuro) |
| Metadata global | ✅ Title/description/OG configurados | Falta OG image otimizada |
| Schema | ⚠️ Não implementado ainda | LocalBusiness/EventVenue obrigatório na home |
| Imagens | ⚠️ Pasta `public/images/` ainda em curadoria | Otimizar via `scripts/optimize-images.mjs` |
| Páginas internas | ✅ `/eventos`, `/eventos/casamentos`, `/eventos/15-anos`, `/eventos/corporativo`, `/estrutura`, `/galeria`, `/contato` | Estrutura SEO-friendly |
| Blog | ❌ Não criado | Fase 3 do roadmap |
| GBP otimizado | ⚠️ Existe (36 reviews) | Auditar categorias, fotos, posts |

### 1.5 Restrições e premissas
- **Orçamento:** sem investimento em link building pago; foco 100% em SEO técnico, conteúdo e relacionamento local.
- **Timeline:** 12 meses para autoridade local consolidada.
- **Recurso editorial:** Claude como editor do blog — escrita ágil, sem CMS.
- **Conversão única:** WhatsApp `(16) 99129-4178`. Nenhum formulário substitui esse CTA.
- **Sem preços no site:** posicionamento premium — preço só em conversa.

### 1.6 KPIs principais
1. Posições no Local Pack (3-pack do Google Maps) para queries `[evento] Batatais` e `[evento] Ribeirão Preto`.
2. Volume de cliques no botão WhatsApp originados de orgânico (evento `whatsapp_click` no GTM).
3. Volume de impressões e cliques no Google Search Console.
4. Posição média e CTR para top 20 keywords-alvo.
5. Solicitação de rotas no Google Maps (proxy de visita real).
6. Avaliações novas no GBP por trimestre.

---

## 2. Competitive Analysis — Resumo executivo

> Detalhamento completo em `COMPETITOR-ANALYSIS.md`.

- O cluster competitivo principal é "espaço para casamento + Batatais/Ribeirão Preto/Franca".
- Players locais costumam ter sites datados, sem schema, com conteúdo curto e fotos pesadas — janela aberta para Espaço Coral dominar via base técnica + conteúdo aprofundado.
- Diferenciador competitivo: cerimônia ao céu aberto + sala privativa + 320 convidados é uma combinação rara — usar nos H1/H2 sempre que possível.
- E-E-A-T: o concorrente médio não tem páginas de "estrutura" detalhadas nem prova social com schema. Implementar AggregateRating na home é vantagem rápida.

---

## 3. Architecture Design

> Detalhamento completo em `SITE-STRUCTURE.md`.

Princípios:
- Hub-and-spoke: `/eventos` é hub; `/eventos/casamentos`, `/eventos/15-anos`, `/eventos/corporativo` são spokes.
- Páginas geo-localizadas (`/eventos-em-ribeirao-preto`, `/eventos-em-franca`) são spokes de `/`/Home, criadas só após home ranquear bem para Batatais.
- Blog em `/blog/[slug]` com tags `casamento`, `15-anos`, `corporativo`, `decoracao`, `fornecedores`, `batatais`.
- LPs de campanha em `/lp/[slug]` — `noindex`, sempre fora do sitemap, sem links internos.

### Limites de qualidade (quality gates)
- Páginas de localização: máximo 4 (Batatais, Ribeirão Preto, Franca, Sertãozinho/Brodowski combinadas em uma) na fase 12 meses.
- ⚠️ alerta a partir de 6 location pages.
- 🛑 hard stop em 10 location pages.
- Mínimo 600 palavras em location pages com 60%+ conteúdo único.
- Mínimo 800 palavras em service pages (`/eventos/[tipo]`) com 100% conteúdo original.

---

## 4. Content Strategy

> Calendário completo em `CONTENT-CALENDAR.md`.

### 4.1 Pilares de conteúdo (topic clusters)

1. **Casamento no interior de SP** — pilar comercial principal. Cluster: planejamento, checklist, custos, fornecedores, cerimônia ao ar livre, dicas de decoração.
2. **Festa de 15 anos** — pilar comercial secundário. Cluster: tema, valsa, organização, lista de convidados, decoração, kids.
3. **Eventos corporativos no interior** — pilar B2B. Cluster: confraternização, premiação, formatura, lançamento, capacidade técnica.
4. **Estrutura e diferenciais** — pilar de fundo de funil (decisão). Cluster: cerimônia ao céu aberto, sala da noiva, espaço kids, capacidade, estacionamento.
5. **Local — Batatais e região** — pilar geo. Cluster: roteiro, hotelaria, fornecedores locais, eventos da cidade.

### 4.2 Tipos de página e contagens estimadas (12 meses)

| Tipo | Quantidade | Onde ranqueia |
|---|---|---|
| Home | 1 | Termos amplos + brand |
| Service pages (`/eventos/[tipo]`) | 4 (existem 3 + ampliar) | Casamento Batatais, 15 anos Batatais, corporativo, festas |
| Estrutura | 1 | Termos de avaliação fundo de funil |
| Galeria | 1 | Imagens (Google Images) |
| Contato | 1 | Brand + endereço |
| Location pages | 3-4 | Ribeirão Preto, Franca, região |
| Blog posts | 24 (2/mês) | Cauda longa informacional |
| FAQ (na home + páginas) | 1 + embutido | AI Overviews + featured snippets |

Total previsto: ~36 URLs indexáveis em 12 meses.

### 4.3 Plano E-E-A-T

Como espaço físico que atende casamentos reais, o E-E-A-T não vem de "credenciais" técnicas, mas de **prova de eventos realizados**:

- **Experience:** publicar mini-cases reais de eventos (com foto, mês/ano, número de convidados, formato). 1 case/mês mínimo.
- **Expertise:** página "Sobre" com história do espaço, equipe, anos de operação, certificações de bombeiro, alvará.
- **Authoritativeness:** parcerias citáveis (assessoras de eventos, buffets, decoradores) — usar `sameAs` no schema e sempre linkar das páginas de blog.
- **Trustworthiness:** schema `AggregateRating` + reviews completos + transparência sobre o que o espaço inclui e o que não inclui (sem buffet próprio).

### 4.4 Ângulos de "information gain" para AI Overviews / GEO

- Informação que o concorrente não publica:
  - Capacidade exata por configuração (banquete, coquetel, cerimônia + recepção).
  - Lista honesta do que está incluso e o que não está.
  - Tempo de aluguel padrão e flexibilidade.
  - Como funciona logística de fornecedor externo (cozinha disponível, horários de montagem).
  - Acessibilidade real (PCD, banheiros, rampas).
  - Como escolher a data de casamento ao ar livre pela janela de menor chuva (meses secos no interior). Contingência de chuva tratada de forma discreta: a cerimônia migra para o salão envidraçado já incluso. Não vender "plano B" como gancho de conteúdo. Ver `docs/diretrizes-blog.md`.

> Esses temas viram FAQ + posts de blog; são as perguntas reais que noivas e debutantes fazem antes de visitar o espaço.

---

## 5. Technical Foundation

### 5.1 Performance & CWV
| Métrica | Meta |
|---|---|
| LCP | < 2.0s (above target de 2.5s) |
| INP | < 200ms |
| CLS | < 0.05 |
| TTFB | < 600ms (Vercel CDN) |

Ações: Hero image WebP 1280px qualidade 60, `priority` no hero, `next/font`, `next/dynamic` para below-fold, `sizes` correto em todo `<Image fill>`, evitar `useState` em scroll handlers (regra do CLAUDE.md).

### 5.2 Schema markup — plano por página

| Página | Schema | Notas |
|---|---|---|
| `/` (home) | `EventVenue` + `LocalBusiness` + `AggregateRating` + `BreadcrumbList` | usar `@graph` para encadear |
| `/estrutura` | `EventVenue` (com `amenityFeature[]`) | listar todas as amenidades |
| `/eventos` | `BreadcrumbList` + `ItemList` (com `Service` por tipo) | hub |
| `/eventos/casamentos` | `Service` + `EventVenue` + `FAQPage` | longo + FAQ |
| `/eventos/15-anos` | `Service` + `EventVenue` + `FAQPage` | longo + FAQ |
| `/eventos/corporativo` | `Service` + `EventVenue` + `FAQPage` | longo + FAQ |
| `/galeria` | `ImageGallery` | itens com nome e descrição |
| `/contato` | `ContactPage` + `LocalBusiness` (NAP completo) | `geo` lat/long |
| `/blog/[slug]` | `BlogPosting` + `BreadcrumbList` + `Person` (autor) | obrigatório em todo post |

### 5.3 Mobile-first
- Mais de 70% do tráfego de noiva é mobile. Hero deve carregar em < 2s no 4G simulado.
- Botão WhatsApp flutuante visível em mobile **sempre** — confirmar zero overlap com conteúdo.
- Tap targets ≥ 48px.

### 5.4 GBP (Google Business Profile) — auditoria e otimização

> Ver bloco específico em `IMPLEMENTATION-ROADMAP.md`. Resumo:

- Categoria primária: **Buffet** ou **Espaço para eventos** (decisão pendente — testar a que ranqueia melhor).
- Categorias secundárias: salão de festas, casa de eventos, espaço para casamento.
- Atualizar fotos: 1 lote/mês com legendas descritivas.
- Posts GBP: 1/semana mínimo (eventos realizados, novidades, FAQ rápida).
- Resposta a reviews: 100% das avaliações respondidas em até 72h.
- WhatsApp como canal de mensagens primário.
- Horário comercial: manter atualizado (fator top-5 de ranqueamento local em 2026).

### 5.5 GEO (Generative Engine Optimization)

Otimizar para citação em ChatGPT, Perplexity e AI Overviews:

- Trechos quotables curtos (40–60 palavras) em cada service page respondendo "qual o melhor espaço para casamento em Batatais?", "quanto cabe no Espaço Coral?", "tem cerimônia ao ar livre em Batatais?".
- FAQ explícita ao final de cada service page.
- LocalBusiness schema completo (geo, openingHours, areaServed, priceRange).
- Buscar inclusão em listas curadas tipo "melhores espaços para casamento no interior de SP" — outreach a portais como Casamentos.com.br, Zankyou, NoivasRJ/SP, blogs de assessoria.
- llms.txt: criar `/llms.txt` listando páginas-chave para crawlers de IA.

### 5.6 AI search readiness — checklist

- [ ] Robots.txt permite GPTBot, ClaudeBot, PerplexityBot.
- [ ] Conteúdo respondendo perguntas explícitas em formato Q&A.
- [ ] Citação em diretórios curados (Casamentos.com.br, Wedding Wire BR, Zankyou).
- [ ] NAP idêntico em todas as plataformas (Google, Bing, Apple Maps, Facebook, Instagram).
- [ ] Schema válido em todas as páginas (rich-results-test).
- [ ] Photos originais com EXIF e `alt` descritivo.

---

## 6. Implementation Roadmap (resumo)

> Detalhamento completo em `IMPLEMENTATION-ROADMAP.md`.

| Fase | Janela | Foco principal |
|---|---|---|
| **1 — Foundation** | semanas 1–4 | Site no ar, schema, GBP otimizado, Search Console |
| **2 — Expansion** | semanas 5–12 | Conteúdo das service pages, primeiros 6 posts, location pages Ribeirão/Franca |
| **3 — Scale** | semanas 13–24 | Blog cadenciado, link building local, GEO, otimização de Core Web Vitals |
| **4 — Authority** | meses 7–12 | Casos de eventos reais, parcerias com fornecedores, citações em portais nacionais |

---

## 7. KPI Targets — 12 meses

> Baseline assumida: site novo (zero tráfego orgânico). GBP já existe com 36 reviews 5★.

| Métrica | Baseline (mês 0) | 3 meses | 6 meses | 12 meses |
|---|---|---|---|---|
| Sessões orgânicas / mês | 0 | 250 | 800 | 2.500 |
| Cliques GSC / mês | 0 | 150 | 500 | 1.800 |
| Impressões GSC / mês | 0 | 8.000 | 25.000 | 80.000 |
| Posição média | — | 35 | 18 | 9 |
| Keywords ranqueando top 10 | 0 | 5 | 18 | 60 |
| Keywords ranqueando top 3 | 0 | 1 | 6 | 22 |
| Local Pack appearances (top 3) | 1 (brand) | 4 | 8 | 14 |
| Cliques WhatsApp/mês (orgânico) | 0 | 25 | 80 | 250 |
| Solicitações de rota GBP/mês | a medir | +30% | +80% | +200% |
| Reviews novos GBP/mês | base atual | +2/mês | +3/mês | +4/mês |
| Posts publicados | 0 | 6 | 14 | 24 |
| LCP mobile (75th pct) | — | < 2.5s | < 2.2s | < 2.0s |
| INP mobile (75th pct) | — | < 200ms | < 200ms | < 200ms |
| CLS (75th pct) | — | < 0.1 | < 0.05 | < 0.05 |

### Critérios de sucesso (gate por fase)
- **Fase 1 (mês 1):** site indexado, GSC validado, schema sem erros, GBP atualizado, 0 erros de Lighthouse SEO.
- **Fase 2 (mês 3):** ranquear top 10 para `espaço para casamento Batatais` e `salão de festas Batatais`. 6 posts publicados.
- **Fase 3 (mês 6):** Local Pack para queries `Batatais` e `Ribeirão Preto + casamento`. 800+ sessões/mês.
- **Fase 4 (mês 12):** ≥ 22 keywords top 3, ≥ 250 cliques WhatsApp/mês, presença em ≥ 3 portais curados.

---

## 8. Risk Mitigation

| Risco | Mitigação |
|---|---|
| Concorrência tradicional aprende e copia conteúdo | Differentiation por profundidade + foto original + reviews; conteúdo evergreen difícil de replicar rápido |
| Sazonalidade derruba pesquisas em jan/fev | Antecipar publicações de planejamento em out–dez (calendário sazonal) |
| Mudanças no algoritmo do Google (Helpful Content / Core Update) | E-E-A-T sólido + dados estruturados + experiência do usuário cuidam de 90% do risco |
| AI Overviews canibalizando cliques | GEO desde o início, schema completo, FAQ quotable. Em local pack o impacto é baixo (~0,14% das queries locais). |
| GBP suspenso por inconsistência NAP | Auditoria NAP cross-platform na fase 1 |
| Performance degrada após adicionar GTM, fontes, schema | Lighthouse mensal, alerta CWV no Search Console |
| Cliente envia poucos materiais novos (fotos, casos) | Workflow definido: cliente envia fotos pós-evento → curadoria + post em até 7 dias |

---

## 9. Documentos do plano

| Documento | Objetivo |
|---|---|
| `SEO-STRATEGY.md` | Este arquivo — plano estratégico mestre |
| `COMPETITOR-ANALYSIS.md` | Mapeamento competitivo, gaps e oportunidades |
| `SITE-STRUCTURE.md` | Arquitetura de URLs, hierarquia, internal linking |
| `CONTENT-CALENDAR.md` | Calendário editorial 12 meses, briefs por post |
| `IMPLEMENTATION-ROADMAP.md` | Plano fase-a-fase, semana-a-semana, com responsáveis |

---

## 10. Próximos passos imediatos (semana 1)

1. Validar este plano com o cliente — alinhar prioridades, revisar KPIs.
2. Auditoria GBP completa (categorias, fotos, posts, reviews respondidas).
3. Implementar `schema.org/EventVenue` + `AggregateRating` + `LocalBusiness` na home.
4. Criar conta no Google Search Console e Bing Webmaster Tools, submeter sitemap.
5. Configurar GA4 via GTM com evento `whatsapp_click` (todos os botões).
6. Testar Core Web Vitals na home e service pages com PageSpeed Insights.
7. Curadoria de fotos de `_references/Photos/` → `/public/images/` (otimizadas).
