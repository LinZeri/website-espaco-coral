# Implementation Roadmap — Espaço Coral

> Plano fase-a-fase de execução do SEO em 12 meses, com tarefas semana-a-semana, responsáveis e critérios de saída de cada fase.
>
> **Mês 0 = Maio/2026 (mês de lançamento).**

---

## Visão geral das fases

| Fase | Janela | Resultado esperado |
|---|---|---|
| **1 — Foundation** | semanas 1–4 (mai/2026) | Site no ar, indexado, schema válido, GBP otimizado, Search Console e GA4 funcionando |
| **2 — Expansion** | semanas 5–12 (jun–jul/2026) | Service pages aprofundadas, blog lançado com 4 posts, location pages criadas |
| **3 — Scale** | semanas 13–24 (ago–out/2026) | Blog com 12 posts, link building local, GEO, otimização CWV |
| **4 — Authority** | meses 7–12 (nov/2026 a abr/2027) | 24 posts publicados, casos reais documentados, parcerias com fornecedores, citações em portais |

---

## Convenções

- **Owner:** quem executa. Nomes possíveis: Cliente, Editor (Claude), Dev, Designer.
- **DOR (Definition of Ready):** condições para começar a tarefa.
- **DOD (Definition of Done):** condições para considerar completa.
- **Bloqueador:** dependência externa.

---

## Fase 1 — Foundation (semanas 1–4)

### Objetivos da fase
1. Site no ar com SEO técnico irretocável.
2. Search Console + GA4 + GTM funcionando.
3. GBP auditado e otimizado.
4. Schema implementado em todas as páginas existentes.

### Semana 1 — Diagnóstico e setup técnico

| # | Tarefa | Owner | DOD |
|---|---|---|---|
| 1.1 | Validar plano SEO com cliente | Editor + Cliente | Plano aprovado por escrito |
| 1.2 | Auditoria GBP (categorias, NAP, fotos, reviews, posts) | Editor | Relatório `gbp-audit.md` em `docs/seo-plan/` |
| 1.3 | Ajustar categoria primária GBP (testar Buffet vs Espaço para eventos) | Cliente | GBP atualizado |
| 1.4 | Verificar idade do domínio coraleventos.com.br (Wayback + WHOIS) | Editor | Documentado |
| 1.5 | Criar conta Google Search Console e validar via DNS | Dev | Propriedade verificada |
| 1.6 | Criar Bing Webmaster Tools | Dev | Validado |
| 1.7 | Configurar GA4 + GTM (eventos: `whatsapp_click`, `scroll_75`, `outbound`) | Dev | Eventos disparando em preview |
| 1.8 | Validar Lighthouse mobile em todas as páginas existentes | Dev | Score SEO = 100, Perf ≥ 85 |

### Semana 2 — Schema + metadata

| # | Tarefa | Owner | DOD |
|---|---|---|---|
| 2.1 | Implementar `EventVenue` + `LocalBusiness` + `AggregateRating` na home (JSON-LD em `<Script type="application/ld+json">`) | Dev | Validado em rich-results-test |
| 2.2 | Schema `Service` em `/eventos/casamentos`, `/15-anos`, `/corporativo` | Dev | Validado |
| 2.3 | Schema `EventVenue` com `amenityFeature` em `/estrutura` | Dev | Validado |
| 2.4 | Schema `ContactPage` + `geo` em `/contato` | Dev | Validado |
| 2.5 | OG image 1200x630 específicas por seção (home, casamentos, 15 anos, corporativo, estrutura) | Designer | Imagens em `/public/og/` |
| 2.6 | Atualizar metadata por página (title 50–60c, description 140–160c) | Editor | Checklist validado |
| 2.7 | Implementar canonical em todas as páginas | Dev | Verificado em todas as URLs |

### Semana 3 — Conteúdo das páginas existentes

| # | Tarefa | Owner | DOD |
|---|---|---|---|
| 3.1 | Reescrever `/eventos/casamentos` para 1.500 palavras + FAQ | Editor | Word count atingido, FAQ com 8 perguntas |
| 3.2 | Reescrever `/eventos/15-anos` para 1.300 palavras + FAQ | Editor | DOD acima |
| 3.3 | Reescrever `/eventos/corporativo` para 1.100 palavras + FAQ | Editor | DOD acima |
| 3.4 | Aprofundar `/estrutura` (tabela de capacidade + bloco "incluso vs separado") | Editor | Publicado |
| 3.5 | Adicionar FAQ na home (6 perguntas) | Editor | Schema `FAQPage` + visual implementado |
| 3.6 | Curadoria de fotos `_references/Photos/` → `/public/images/` (otimizadas via `scripts/optimize-images.mjs`) | Editor + Cliente | 30+ fotos otimizadas e taggeadas |
| 3.7 | Adicionar `alt` text descritivo em todas as imagens | Editor | Auditoria 100% das `<Image>` |

### Semana 4 — `/sobre`, `/llms.txt`, indexação

| # | Tarefa | Owner | DOD |
|---|---|---|---|
| 4.1 | Criar `/sobre` (E-E-A-T) — história, equipe, certificações | Editor + Cliente | Página publicada com schema `AboutPage` |
| 4.2 | Criar `public/llms.txt` | Editor | Acessível em `/llms.txt` |
| 4.3 | Adicionar bloco de depoimentos com schema `Review` na home | Dev + Editor | 6 reviews exibidos |
| 4.4 | Submeter sitemap no GSC e Bing | Dev | Confirmação de indexação |
| 4.5 | Solicitar indexação manual de todas as páginas no GSC | Dev | Pages submitted |
| 4.6 | Configurar IndexNow (opcional, ajuda Bing/Yandex) | Dev | Implementado |
| 4.7 | Ler e revisar este roadmap com cliente — ajustes de fase 2 | Editor + Cliente | Plano fase 2 aprovado |

### Critério de saída — Fase 1

- ✅ 100% das páginas existentes indexadas (verificável via `site:coraleventos.com.br`)
- ✅ Lighthouse SEO = 100 em todas as páginas
- ✅ Lighthouse Performance ≥ 85 mobile
- ✅ Schema válido em todas as páginas (rich-results-test)
- ✅ GBP otimizado (categorias, NAP, fotos, posts, WhatsApp)
- ✅ GSC + GA4 + GTM funcionando, eventos disparando
- ✅ Página `/sobre` publicada
- ✅ `/llms.txt` no ar

---

## Fase 2 — Expansion (semanas 5–12)

### Objetivos da fase
1. Service pages aprofundadas com FAQ e schema.
2. Lançamento do blog com 4 posts.
3. Criação de location pages (Ribeirão Preto, Franca).
4. Início de outreach para diretórios e parcerias.

### Semana 5 — Setup blog técnico

| # | Tarefa | Owner | DOD |
|---|---|---|---|
| 5.1 | Implementar pasta `content/blog/` + parser MDX | Dev | `/blog` lista posts |
| 5.2 | Criar `/blog/page.tsx` (listagem) + `/blog/[slug]/page.tsx` | Dev | Rotas funcionais |
| 5.3 | Criar `/blog/tag/[tag]/page.tsx` (cluster pages) | Dev | Listagem por tag |
| 5.4 | Schema `BlogPosting` + `BreadcrumbList` em posts | Dev | Validado |
| 5.5 | Atualizar sitemap.ts para incluir posts e tags dinamicamente | Dev | Sitemap reflete posts |
| 5.6 | Criar componente `<RelatedPosts />` | Dev | Renderiza 3 posts |

### Semana 6 — Criar `/faq`

| # | Tarefa | Owner | DOD |
|---|---|---|---|
| 6.1 | Levantar 25–30 perguntas reais (cliente + WhatsApp + PAA) | Editor + Cliente | Lista validada |
| 6.2 | Redigir respostas (60–100 palavras cada) | Editor | Publicado |
| 6.3 | Schema `FAQPage` agregado | Dev | Validado |
| 6.4 | Internal linking de cada FAQ para página relacionada | Editor | 100% das FAQs com link |

### Semana 7 — Posts 1 e 2 do blog

| # | Tarefa | Owner | Notas |
|---|---|---|---|
| 7.1 | Brief + outline do post #1 ("Como Escolher Espaço para Casamento") | Editor | Modelo do `CONTENT-CALENDAR.md` |
| 7.2 | Redigir post #1 (1.800 palavras) | Editor | — |
| 7.3 | Imagens hero + inline | Editor + Designer | 5 imagens otimizadas |
| 7.4 | Publicar post #1 (`2026-07-03`) | Editor | URL ativa |
| 7.5 | Submeter URL no GSC | Editor | Indexed status verificado |

### Semana 8 — Post 2 + location page Ribeirão Preto (start)

| # | Tarefa | Owner |
|---|---|---|
| 8.1 | Brief + outline post #2 ("Checklist Festa de 15 Anos") | Editor |
| 8.2 | Redigir post #2 | Editor |
| 8.3 | Publicar post #2 (`2026-07-17`) | Editor |
| 8.4 | Estrutura técnica `/cidades/[cidade]/page.tsx` | Dev |
| 8.5 | Pesquisa de conteúdo para `/cidades/ribeirao-preto` | Editor |

### Semana 9 — Location page Ribeirão Preto

| # | Tarefa | Owner |
|---|---|---|
| 9.1 | Redigir `/cidades/ribeirao-preto` (1.000 palavras, 60%+ único) | Editor |
| 9.2 | Schema `LocalBusiness` com `areaServed` | Dev |
| 9.3 | Mini-case real com noivos de RP | Editor + Cliente |
| 9.4 | Publicar e submeter no GSC | Editor |

### Semana 10 — Posts 3 e 4

| # | Tarefa | Owner |
|---|---|---|
| 10.1 | Post #3 ("Casamento ao Ar Livre em Batatais") — 1.500 palavras | Editor |
| 10.2 | Post #4 ("Quando Reservar o Espaço") — 1.200 palavras | Editor |

### Semana 11 — Location page Franca + outreach

| # | Tarefa | Owner |
|---|---|---|
| 11.1 | Redigir e publicar `/cidades/franca` | Editor |
| 11.2 | Cadastrar perfil completo em Casamentos.com.br | Cliente + Editor |
| 11.3 | Cadastrar perfil completo em Zankyou | Cliente + Editor |
| 11.4 | Cadastrar perfil completo em Wedding Wire BR | Cliente + Editor |
| 11.5 | Cadastrar/atualizar Apontador, Guia Mais, TripAdvisor (se aplicável) | Cliente + Editor |
| 11.6 | NAP audit cross-platform — Bing Places, Apple Maps | Editor |

### Semana 12 — Auditoria e ajustes

| # | Tarefa | Owner |
|---|---|---|
| 12.1 | GSC audit — corrigir warnings e erros | Dev |
| 12.2 | Análise de queries no GSC (queries com impressões mas sem cliques) | Editor |
| 12.3 | Atualizar metas KPI com dados reais (mês 3) | Editor |
| 12.4 | Re-Lighthouse de todas as páginas | Dev |
| 12.5 | Plan review — alinhamento fase 3 com cliente | Editor + Cliente |

### Critério de saída — Fase 2

- ✅ Blog lançado com 4 posts publicados e indexados
- ✅ 2 location pages criadas e indexadas
- ✅ `/faq` publicada
- ✅ Cadastros em ≥ 3 diretórios verticais
- ✅ NAP idêntico em ≥ 5 plataformas
- ✅ Top 10 ranking para `espaço para casamento Batatais` (ou tendência clara)
- ✅ ≥ 250 sessões orgânicas no mês

---

## Fase 3 — Scale (semanas 13–24, ago/2026 a out/2026)

### Objetivos da fase
1. Cadência de 2 posts/mês mantida — total 12 posts até semana 24.
2. Outreach a assessoras de casamento e fornecedores.
3. Otimização de Core Web Vitals com base em dados de campo (CrUX).
4. GEO ativo: monitorar citação em ChatGPT, Perplexity.
5. Subpáginas de estrutura (`/estrutura/cerimonia-ao-ar-livre`, `/estrutura/sala-da-noiva`) opcionais.

### Tarefas-chave por bloco quinzenal

#### Sprint 13–14 (ago/2026)
- Post #5, post #6 (calendário)
- Outreach a 5 assessoras de casamento (Ribeirão Preto)
- Auditoria CWV via CrUX (campo) — comparar com lab Lighthouse

#### Sprint 15–16 (set/2026)
- Post #7, post #8
- Outreach a 5 fornecedores (fotógrafos, decoradores, buffets)
- Refresh de fotos do GBP

#### Sprint 17–18 (out/2026)
- Post #9, post #10
- Mini-case real publicado
- Pitch a 2 portais nacionais (Zankyou destaque, Casamentos.com.br case)

#### Sprint 19–20 (nov/2026)
- Pico de buscas — manter consistência
- Post #11, post #12
- Avaliar se vale criar `/eventos/aniversarios`

#### Sprint 21–22 (dez/2026)
- Post #13, post #14 (já em fase 4)
- Retrospectiva semestral com métricas

#### Sprint 23–24 (revisão)
- Audit competitivo trimestral
- Audit de internal linking — corrigir orphan pages

### Critério de saída — Fase 3 (mês 6)

- ✅ 12 posts publicados
- ✅ ≥ 800 sessões orgânicas/mês
- ✅ Local Pack para `[evento] Batatais` consistente (top 3 mensal)
- ✅ Top 3 para ≥ 6 keywords-alvo
- ✅ ≥ 5 backlinks de domínios relevantes
- ✅ CWV mobile (75th pct): LCP < 2.2s, INP < 200ms, CLS < 0.05
- ✅ NAP consistente em ≥ 8 plataformas
- ✅ ≥ 80 cliques WhatsApp/mês originados de orgânico

---

## Fase 4 — Authority (meses 7–12, nov/2026 a abr/2027)

### Objetivos da fase
1. Completar 24 posts (calendário cumprido).
2. Cases reais documentados (mínimo 6 cases).
3. Parcerias estabelecidas com 10+ fornecedores citáveis.
4. Citações em portais nacionais (mínimo 3).
5. AI search visibility: aparecer em respostas de Perplexity/ChatGPT para queries-alvo.

### Iniciativas-chave

#### Mês 7 (nov/2026)
- Post #11, post #12
- Tentativa de aparição em portais (Zankyou, Casamentos.com.br destaque)
- Avaliar criação de subpáginas `/estrutura/[diferencial]`

#### Mês 8 (dez/2026)
- Post #13, post #14
- Retrospectiva 2026 com cases (post mega-guide)
- Atualizar todos os schemas com `dateModified` recente

#### Mês 9 (jan/2027)
- Post #15, post #16
- Atualização anual `/sobre` com novos números
- Criar `/galeria/cases/[slug]` para 3 melhores cases

#### Mês 10 (fev/2027)
- Post #17, post #18
- Refresh dos 3 posts mais antigos (atualização de dados)
- Audit competitivo semestral

#### Mês 11 (mar/2027)
- Post #19, post #20
- Outreach a portais nacionais — pitch case "casamento dos sonhos"
- Mega-guide `Guia Definitivo de Casamento em Batatais [2027]`

#### Mês 12 (abr/2027)
- Post #21–24
- Revisão completa — KPI vs metas
- Plano para ano 2

### Critério de saída — Fase 4 (mês 12)

- ✅ 24 posts publicados
- ✅ ≥ 22 keywords top 3
- ✅ ≥ 60 keywords top 10
- ✅ ≥ 2.500 sessões orgânicas/mês
- ✅ ≥ 250 cliques WhatsApp/mês
- ✅ Domain Authority subiu (referência inicial vs final)
- ✅ Citações em ≥ 3 portais nacionais
- ✅ ≥ 10 backlinks de domínios relevantes
- ✅ AI visibility: marca aparece em respostas Perplexity para `melhores espaços de casamento Batatais`

---

## Resource requirements

### Recurso humano (estimado por mês)

| Papel | Horas/mês na fase 1 | Horas/mês fases 2–4 |
|---|---|---|
| Editor (Claude) | ~20h | ~20h |
| Dev | ~30h | ~5h |
| Designer | ~10h | ~3h |
| Cliente | ~8h | ~4h |

### Custos externos previstos

| Item | Custo estimado |
|---|---|
| Domínio coraleventos.com.br (renovação anual) | já existe |
| Vercel (hosting) | free tier |
| Fonte PP Editorial New (licença web) | ~USD 200 (one-time, opcional) |
| OG image generation (Gemini via MCP) | desprezível |
| DataForSEO (opcional, queries esporádicas) | ~USD 50/mês se usado |
| Diretórios verticais (cadastros gratuitos preferencialmente) | 0 |
| Ferramentas de monitoramento (GSC + GA4 são free) | 0 |

---

## Dependências e bloqueadores

| Bloqueador | Mitigação |
|---|---|
| Cliente sem tempo para revisão de conteúdo | Brief detalhado + perguntas específicas → reduz tempo de revisão a 15min |
| Fotos novas dependem de eventos novos | Antecipar com sessão de fotos institucional do espaço vazio |
| Reviews novos dependem do volume de eventos | Fluxo automatizado: cliente envia link de review pós-evento via WhatsApp |
| Backlinks dependem de outreach | Começar cedo — semana 11 da fase 2 |
| Sazonalidade de busca | Calendário sazonal no `CONTENT-CALENDAR.md` |
| Mudanças no algoritmo Google | Manter E-E-A-T + schema + UX em dia (cobertura natural) |

---

## Risk register

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Indexação atrasada (novo domínio) | Média | Alto | GSC manual + sitemap + IndexNow |
| GBP suspenso por inconsistência | Baixa | Muito alto | NAP audit semanal nos primeiros 3 meses |
| Google Update destrutivo | Baixa | Médio | E-E-A-T + qualidade de conteúdo |
| Concorrente direto lança site moderno | Média | Médio | Velocidade de execução = vantagem |
| Cliente atrasa envio de fotos/cases | Alta | Médio | Workflow pré-acordado, banco de fotos buffer |
| Performance degrada com adição de schema/scripts | Média | Médio | Lighthouse mensal + CrUX alerts |
| Reviews caem abaixo de 5★ | Baixa | Alto | Resposta rápida + pedido proativo de review |

---

## Cadência de monitoramento

| Frequência | Item |
|---|---|
| Diário | GSC errors |
| Semanal | Reviews novas no GBP, CTR no GSC |
| Quinzenal | Posts publicados, indexação |
| Mensal | KPI report (sessões, cliques, posições, CWV, conversões WhatsApp) |
| Trimestral | Audit competitivo, refresh de posts antigos, NAP audit |
| Semestral | Backlink audit, GBP audit completo, plan review |
| Anual | Refresh de mega-guides, atualização `/sobre`, plano ano seguinte |

---

## Reporting

### Template mensal de report

```
# Report SEO — [Mês/Ano]

## KPIs principais
- Sessões orgânicas: X (vs meta Y, vs mês anterior Z)
- Cliques GSC: X
- Impressões GSC: X
- Posição média: X
- Cliques WhatsApp orgânicos: X

## Rankings
- Top 3: N keywords (lista)
- Top 10: N keywords (lista)
- Movimentações: subiram X, caíram Y, novas Z

## Conteúdo publicado
- Post #N: [título] — performance preliminar
- Páginas atualizadas: [lista]

## GBP
- Reviews novos: N (média de estrelas)
- Posts publicados: N
- Cliques no botão: N

## Próximas ações
- [...]

## Riscos / Bloqueadores
- [...]
```

---

## Próxima ação imediata

Após aprovação deste plano:

1. **Cliente:** confirmar aprovação por escrito.
2. **Editor:** iniciar tarefa 1.2 (auditoria GBP) e gerar `gbp-audit.md`.
3. **Dev:** abrir issues no GitHub para tarefas da semana 2 (schema markup).
4. **Designer:** preparar lista de OG images necessárias.
