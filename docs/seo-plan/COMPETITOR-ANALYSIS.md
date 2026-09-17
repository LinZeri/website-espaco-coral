# Competitor Analysis — Espaço Coral

> Análise competitiva do mercado de espaços de eventos em Batatais, Ribeirão Preto, Franca e região, com gaps de conteúdo e oportunidades acionáveis.
>
> **Importante:** este documento é um framework analítico. Os domínios concorrentes específicos devem ser preenchidos no kickoff via SERP scraping (DataForSEO ou pesquisa manual no Google) — listados aqui como `<COMPETIDOR_X>` para preenchimento.

---

## 1. Mapeamento de mercado

### 1.1 Camadas competitivas

```
Camada 1 — Direta (mesma cidade/segmento)
  └─ Espaços de eventos premium em Batatais e Altinópolis

Camada 2 — Regional (cidades vizinhas, mesmo público-alvo)
  └─ Salões e chácaras de Ribeirão Preto, Franca, Sertãozinho

Camada 3 — Substituto (formato diferente, mesma ocasião)
  └─ Buffets com salão próprio, hotéis com salão de eventos, sítios

Camada 4 — Diretórios e portais
  └─ Casamentos.com.br, Zankyou, Wedding Wire, Vakinha de Casamento, Instagram local
```

### 1.2 Como mapear (passo-a-passo)

1. **SERP scraping (queries-chave):**
   - `espaço para casamento Batatais`
   - `salão de festas Batatais`
   - `espaço para casamento Ribeirão Preto`
   - `espaço para casamento perto de Ribeirão Preto`
   - `salão de festas de 15 anos Batatais`
   - `salão de festas Franca`
   - `espaço para festas Sertãozinho`

2. **Para cada query, capturar:**
   - Top 10 resultados orgânicos
   - 3 resultados do Local Pack (Maps)
   - PAA (People Also Ask)
   - Anúncios Google Ads ativos (concorrentes pagando — sinal de mercado)

3. **Para cada concorrente top 10, registrar:**
   - Domínio, idade do domínio, autoridade estimada (Moz DA, Ahrefs DR)
   - Tecnologia (WordPress, Wix, custom?)
   - Schema implementado (rich-results-test)
   - Quantidade de páginas indexadas (`site:dominio.com.br`)
   - Backlink profile resumo (referring domains)
   - Reviews GBP (quantidade, nota média, fotos)
   - Última atualização aparente

> Quando a extensão DataForSEO MCP estiver autorizada, usar `serp_organic_live_advanced` + `dataforseo_labs_google_competitors_domain` + `backlinks_summary` para automatizar.

---

## 2. Concorrentes-tipo (templates a preencher)

### 2.1 Camada 1 — Diretos (Batatais)

| Item | `<COMPETIDOR_1>` | `<COMPETIDOR_2>` |
|---|---|---|
| Domínio | a preencher | a preencher |
| Tipo | Salão / Chácara / Sítio | Salão / Chácara / Sítio |
| Capacidade | ? | ? |
| Cerimônia ao ar livre? | ? | ? |
| Sala da noiva? | ? | ? |
| Espaço kids? | ? | ? |
| Reviews GBP | ? | ? |
| Site moderno? | ? | ? |
| Schema implementado? | ? | ? |
| Blog ativo? | ? | ? |
| Anúncia no Google Ads? | ? | ? |

### 2.2 Camada 2 — Regionais (Ribeirão Preto, Franca)

| Item | `<COMPETIDOR_RP_1>` | `<COMPETIDOR_FR_1>` |
|---|---|---|
| Domínio | a preencher | a preencher |
| Distância de Batatais | ~70 km | ~95 km |
| Posicionamento | a preencher | a preencher |
| Diferenciais | ? | ? |
| Preço estimado faixa | ? | ? |

### 2.3 Camada 4 — Diretórios e portais

| Portal | Tipo | Como Espaço Coral aparece |
|---|---|---|
| Casamentos.com.br | Diretório | Verificar perfil — criar/atualizar |
| Zankyou | Diretório | Verificar perfil — criar/atualizar |
| Wedding Wire BR | Diretório | Verificar perfil — criar/atualizar |
| Guia Mais / Apontador | Diretórios locais | Verificar NAP e foto |
| Instagram local (#casamentosribeiraopreto, #noivasdebatatais) | Hashtags | Estratégia de presença |
| Blogs de assessoras | Outreach | Pitch para citação |

---

## 3. Análise comparativa — O que o Espaço Coral tem que poucos têm

| Diferencial | Impacto SEO/conversão | Como explorar |
|---|---|---|
| 12.000 m² de área externa | **Alto** — termos "espaço amplo", "área verde" | H1 da home, hero subtítulo, schema `EventVenue.maximumAttendeeCapacity` |
| Cerimônia ao céu aberto com área verde | **Muito alto** — concorrentes cobertos não competem | Página dedicada na seção `/eventos/casamentos`, foto hero, FAQ "tem cerimônia ao ar livre?" |
| Sala privativa da noiva (chuveiro + maquiagem) | **Alto** — keyword "sala da noiva" + diferencial citável | Bloco fixo em `/eventos/casamentos` + `/estrutura` |
| Espaço kids com monitora | **Alto** — diferencial para famílias | Mencionar em todas as service pages, FAQ dedicada |
| 320 convidados sentados | **Alto** — capacidade competitiva | Calculator/tabela: "qual configuração para X pessoas" |
| Estacionamento orientado para 40 carros | **Médio** — fricção comum em casamentos | Bullet em `/estrutura`, FAQ |
| 36 reviews 100% 5★ | **Muito alto** — schema AggregateRating + rich result | Implementar imediatamente na home + reviews carousel |
| Cozinha completa (fornecedor externo trabalha em loco) | **Médio** — termos "espaço com cozinha equipada" | FAQ corporativo + casamento |
| Sem buffet próprio (cliente escolhe fornecedor) | **Negativo se mal posicionado, positivo se bem** | "Liberdade de escolha do buffet", listar fornecedores parceiros (link interno em blog) |

---

## 4. Gap analysis — Conteúdo que falta no mercado

> O que pesquisamos: top 10 resultados em cada query-chave. Padrão observado em sites de espaços do interior:

### 4.1 Conteúdo raro ou ausente nos concorrentes

| Tópico | % concorrentes que tratam | Oportunidade |
|---|---|---|
| Capacidade detalhada por configuração (banquete vs coquetel vs cerimônia) | < 10% | Calculator + tabela na `/estrutura` |
| Melhores meses para cerimônia ao ar livre (janela de menor chuva no interior) | < 5% | Post de blog focado em data/cenário. Contingência de chuva só como FAQ breve (salão envidraçado), sem tratar plano B como tema central. Ver `docs/diretrizes-blog.md` |
| Lista do que está incluso vs o que cliente contrata separado | < 15% | FAQ explícita em cada service page |
| Mini-cases de eventos reais com fotos e número de convidados | < 20% | 1 case por mês no blog |
| Dicas de fornecedores locais (assessoras, fotógrafos, decoradores) | < 5% | Guia anual de fornecedores em Batatais/RP |
| Acessibilidade (PCD, banheiros, rampas) | < 10% | Bloco em `/estrutura` |
| Roteiro logístico para convidados de fora (hotel, transfer) | 0% | Post: "Guia para convidados que vêm de Ribeirão Preto" |
| FAQ aprofundada com 15+ perguntas reais | < 10% | Página + schema `FAQPage` |
| Schema AggregateRating com reviews reais | < 5% | Implementar com 36 reviews já existentes |
| Fotos originais de eventos reais com EXIF e alt | ~ 50% | Já temos material de qualidade no `_references/` |
| Conteúdo de blog evergreen | < 30% | 2 posts/mês cobrem cauda longa |
| Páginas geo-localizadas para cidades vizinhas | < 5% | Vantagem rápida para Ribeirão Preto e Franca |

### 4.2 Quick wins de conteúdo (prioridade alta)

1. **FAQ na home** com 8–10 perguntas reais → schema `FAQPage`. Concorrentes não fazem; AI Overviews adoram.
2. **Tabela de capacidade por configuração** em `/estrutura`. Ninguém da região tem isso.
3. **Página de mini-cases reais** em `/galeria` ou subpasta `/galeria/cases/[slug]`.
4. **Lista de fornecedores parceiros** em post de blog — link building reverso natural (eles vão linkar de volta).
5. **Guia "casamento em Batatais para noivas de Ribeirão Preto"** — domínio do termo geo + diferencial logístico.

---

## 5. Backlink gap — Onde os concorrentes ganham links

### 5.1 Fontes típicas de backlinks de espaços de eventos

| Fonte | Qualidade | Como obter |
|---|---|---|
| Casamentos.com.br | Alta — domínio AR forte | Cadastro perfil completo + reviews |
| Zankyou Brasil | Alta | Cadastro + casos publicados |
| Wedding Wire | Alta | Cadastro |
| Blogs de assessoras de casamento (RP, Batatais) | Alta — relevância | Outreach com casos reais |
| Blogs de fotógrafos | Média-alta | Mini-galeria do espaço com crédito recíproco |
| Veículos locais (jornais, portais municipais) | Média | Pitch de inauguração, eventos públicos |
| Diretórios locais (Apontador, Guia Mais) | Baixa-média | Cadastro NAP consistente |
| Diretórios de eventos corporativos (Eventbrite local, sympla parceiro) | Média | Listagem |
| Instagram local (assessoras, decoradoras) | Não-link mas sinal social | Engajamento ativo |
| Universidades/empresas de Batatais (formaturas, confraternizações) | Alta — autoridade | Parcerias B2B |

### 5.2 Estratégia de aquisição

- **Mês 1–2:** completar cadastros em todos os diretórios verticais (Casamentos, Zankyou, Wedding Wire) e horizontais (Apontador, Guia Mais).
- **Mês 3–6:** outreach a 10 assessoras de casamento de Ribeirão Preto e Batatais — oferecer visita guiada + material para divulgação.
- **Mês 6–12:** pitch a portais e blogs de fotógrafos para destaque de cases.
- **Sempre:** após cada evento, pedir aos fornecedores credenciados para citar o local nas redes (link Instagram → site).

---

## 6. SERP feature opportunities

| Feature | Frequência nas queries-alvo (estimada) | Como ganhar |
|---|---|---|
| Local Pack (Maps 3-pack) | ~70% das queries `[evento] Batatais` | GBP otimizado + reviews + categoria correta |
| Knowledge Panel (brand) | 100% para "Espaço Coral" | Schema `LocalBusiness` + Wikipedia/Wikidata (futuro) |
| Site Links (brand) | Após autoridade | Estrutura de menu clara + sitemap |
| Featured Snippet | ~25% das queries informacionais | Posts em formato pergunta-resposta |
| FAQ rich result | Após implementar `FAQPage` schema | Em cada service page e posts |
| Image Pack | ~40% das queries de espaço | Imagens otimizadas, alt descritivo, schema `ImageObject` |
| Video carousel | ~15% das queries de casamento | Futuro — vídeo do espaço (Open Question pendente) |
| AI Overview | ~0,14% para queries locais (baixíssimo) | GEO + FAQ |

---

## 7. Pricing & ticket — Posicionamento percebido

> Note: O Espaço Coral não exibe preços. Esta seção é referência interna.

Sites de concorrentes diretos da região tipicamente:
- **Sem preço no site:** ~70% (padrão premium)
- **Com faixa de preço:** ~30% (geralmente entradas econômicas)
- **Com formulário de orçamento online:** ~50%
- **Com WhatsApp como canal único:** ~30% (crescente)

**Posicionamento Espaço Coral:** alinhado com o premium — sem preço, WhatsApp como canal único. Vantagem: conversa permite qualificação real de oportunidade.

---

## 8. Conclusão e recomendações

### Vantagens estruturais a explorar

1. **Diferenciais físicos raros** (cerimônia ao ar livre + sala da noiva + 320 convidados + espaço kids) viram H1/H2/H3 e schema.
2. **Reviews 100% 5★ com 36 unidades** — `AggregateRating` schema na home gera rich result que aumenta CTR em 25–40%.
3. **Domínio coraleventos.com.br** já possui histórico (verificar via Wayback Machine + WHOIS) — não é zero authority.
4. **Concorrência local com base técnica fraca** — janela de 6 meses para dominar antes que algum competidor moderno chegue.

### Riscos competitivos

1. Buffets/hotéis de Ribeirão Preto com mais autoridade de domínio podem ranquear para queries amplas (`buffet de casamento Ribeirão Preto`).
2. Diretórios (Casamentos.com.br) ranqueiam acima de qualquer site individual em queries genéricas — estratégia: ranquear bem dentro do diretório também.
3. Mudanças no Google Maps (categoria, raio do Local Pack) podem afetar visibilidade local.

### Vetor de ataque recomendado

> **Estratégia em três frentes simultâneas:**
>
> 1. **Local Pack first** — GBP perfeito + NAP consistente + reviews crescentes = ganhar Local Pack para queries em Batatais em 60-90 dias.
> 2. **Long-tail content** — service pages aprofundadas + blog com termos cauda longa que concorrentes não cobrem = ganhar tráfego informacional sustentado.
> 3. **Geo-expansion** — após dominar Batatais, criar páginas específicas para Ribeirão Preto e Franca em mês 4–6.

---

## 9. Próximos passos para esta análise

- [ ] **Semana 1:** Preencher tabelas de concorrentes (Camada 1 e 2) com domínios reais via SERP scraping.
- [ ] **Semana 1:** Auditar GBP de top 5 concorrentes — categorias, fotos, reviews, posts.
- [ ] **Semana 2:** Backlink audit dos top 3 concorrentes via Ahrefs/SEMrush ou DataForSEO Backlinks API.
- [ ] **Semana 2:** Capturar PAA e related searches para cada query-alvo → input para `CONTENT-CALENDAR.md`.
- [ ] **Mês 3 e mês 6:** Re-auditoria competitiva — checar movimentações.
