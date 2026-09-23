# Content Brief: Convenção, Treinamento ou Confraternização: Qual Formato Escolher

## Cannibalization Pre-Flight
**Resultado: sem sobreposição.** O pilar `eventos-corporativos-interior-sp-guia.mdx` tem uma
seção "Quais São os Principais Tipos de Evento Corporativo?" mas ela responde "qual espaço
serve para cada tipo de evento" em ~500 palavras de visão geral (um parágrafo por formato,
com link para cada spoke). Nenhum post existente tem como keyword primária "tipos de eventos
corporativos" nem responde, com profundidade, a pergunta deste post: "que formato de evento
minha empresa deveria fazer, e por quê". Os spokes vizinhos (`confraternizacao-fim-ano-espaco-empresa`
responde "como escolher o espaço"; `ideias-confraternizacao-fim-de-ano-empresa` responde "o
que fazer na programação"; `convencao-de-vendas-como-organizar` é um how-to de execução de UM
formato específico) cobrem ângulos distintos. Confirmado também em `docs/blog-strategy.md`
(Pilar 4, item 6): "tipos de eventos corporativos (90 buscas/mês), comparison, prioridade
baixa" é um spoke planejado à parte, sem conflito.

## Template
**Recommended**: `comparison`: o post decide entre 3 formatos (convenção, treinamento,
confraternização) por critério, não lista genérica nem guia de execução de um único formato.
**Template file**: `skills/blog/templates/comparison.md`

## Target Keywords
- **Primary**: tipos de eventos corporativos (90 buscas/mês, conforme `docs/blog-strategy.md`, Pilar 4)
- **Secondary**: diferença entre convenção e confraternização, formatos de evento corporativo,
  qual evento corporativo fazer, evento corporativo interior de SP
- **Questions**: "Qual a diferença entre convenção e confraternização?", "Convenção de vendas
  é a mesma coisa que treinamento?", "Que tipo de evento devo fazer para minha equipe?",
  "Confraternização substitui a convenção anual?"

## Search Intent
**Comercial/informacional de decisão**: o leitor (RH, gestor ou dono de empresa da região de
Batatais/Ribeirão Preto/Franca) já sabe que vai fazer "algum evento de empresa" mas não decidiu
o formato. Ele quer um critério objetivo (objetivo do evento, público, época do ano, formato de
cronograma) para escolher entre convenção, treinamento e confraternização, e só depois pensar em
espaço e fornecedores.

## Content Parameters
- **Word count**: 1.800 palavras (definido no item da fila; não usar a faixa padrão de
  2.000-2.500 da skill)
- **Reading level**: direto, frases curtas, sem jargão de agência de eventos
- **Format**: MDX (`.mdx`), frontmatter conforme `lib/blog-utils.ts` (ver Frontmatter abaixo)
- **H2 sections**: 6
- **Images**: 2 fotos reais do banco (capa + 1 inline), já reservadas no item da fila (ver Cover Image)
- **Charts**: nenhum. Tema é decisão qualitativa por critério, não dado numérico seriado; uma
  tabela comparativa em Markdown substitui o gráfico
- **FAQ items**: 4 (mapeiam as question queries acima), formatadas via `frontmatter.faq[]`
  (o schema FAQPage é gerado em render, não editorial)

## Recommended Title
Convenção, Treinamento ou Confraternização: Qual Escolher (56 caracteres)

Alternative titles:
1. Tipos de Eventos Corporativos: Como Escolher o Formato Certo
2. Convenção x Treinamento x Confraternização: A Diferença

## Meta Description
Convenção, treinamento ou confraternização: veja a diferença de objetivo, público e formato
entre os 3 tipos de evento corporativo e escolha o certo para sua empresa. (153 caracteres)

## TL;DR Draft
> **TL;DR:** Convenção de vendas alinha metas e mistura conteúdo com celebração; treinamento
> prioriza concentração e acústica; confraternização celebra o time em ritmo de festa. O
> formato certo depende do objetivo do encontro, não do orçamento disponível. Fale com o
> Espaço Coral pelo [WhatsApp (16) 99129-4178](https://wa.me/5516991294178) para planejar.

## Information Gain Opportunities
- **[PERSONAL EXPERIENCE]**: relatar, em primeira pessoa (Lin Zeri), o padrão observado nos
  eventos corporativos já recebidos no Espaço Coral: empresas que erram o formato (ex.:
  tratam convenção como confraternização e o time não sai alinhado; ou fazem treinamento em
  espaço decorado como festa e a atenção cai).
- **[UNIQUE INSIGHT]**: o ponto já usado no pilar, aprofundado aqui: o mesmo espaço atende os
  3 formatos ao longo do ano mudando apenas a montagem, então a decisão de formato e a decisão
  de espaço não precisam ser resolvidas juntas, o que tira pressão de quem está decidindo pela
  primeira vez.
- **[ORIGINAL DATA]**: não há dado proprietário disponível para este post; não inventar. Se o
  cliente futuramente quiser compartilhar contagem de eventos corporativos recebidos por
  formato, isso vira um dado próprio citável em refresh futuro (registrar em nota, não inventar
  agora).

## Content Outline

### Introdução (100-150 palavras)
- Hook: a confusão real ("marcamos uma confraternização, mas era treinamento que a equipe
  precisava" ou inverso), sem estatística de abertura forçada
- Problema: empresas decidem o espaço antes de decidir o formato, e isso gera evento com
  cronograma errado para o objetivo
- Promessa: um critério simples para escolher entre os 3 formatos antes de cuidar da logística
- TL;DR box logo após o hook, antes do primeiro H2

### H2: O Que Diferencia Convenção, Treinamento e Confraternização? (250-300 palavras)
- Resposta direta logo na abertura: os 3 têm objetivo, público e ritmo diferentes, não são
  intercambiáveis
- Definir cada um em 1-2 frases (convenção = alinhamento + celebração; treinamento =
  concentração; confraternização = celebração pura)
- Não usar estatística aqui; é definição, não dado de mercado

### H2: Convenção de Vendas ou Kickoff: Quando Faz Sentido (250-300 palavras)
- Objetivo: alinhar metas no início de ciclo, reunir o time comercial
- Formato típico: conteúdo pela manhã, integração à noite (mesmo espaço muda de função no
  mesmo dia)
- Estrutura pedida: TVs e som ambiente para a parte de conteúdo (inclusos no Espaço Coral),
  Wi-Fi para os participantes (incluso); **projetor e telão de LED são contratados à parte
  pelo cliente, nunca prometer como incluso**
- Link interno: [convenção de vendas: como organizar](/blog/convencao-de-vendas-como-organizar)
  para quem já decidiu esse formato

### H2: Treinamento ou Workshop: Quando Faz Sentido (250-300 palavras)
- Objetivo: capacitação, concentração, grupo menor
- Formato típico: disposição de sala, boa acústica, pouca ou nenhuma celebração
- Estrutura pedida: som ambiente e TVs inclusos; Wi-Fi incluso; sem necessidade de
  cenografia de festa
- Diferença prática com a convenção: treinamento raramente combina conteúdo com
  confraternização no mesmo evento

### H2: Confraternização de Fim de Ano: Quando Faz Sentido (250-300 palavras)
- Objetivo: celebrar o ano, reconhecer o time, reduzir a hierarquia por uma noite
- Formato típico: ritmo de festa, cronograma mais condensado, maior público (costuma ser o
  evento de empresa com mais convidados no ano)
- Estrutura pedida: som ambiente incluso; aqui a capacidade real do espaço (até 320 convidados
  sentados) e o estacionamento com orientadores pesam mais do que nos outros dois formatos
- Link interno: [ideias de confraternização de fim de ano](/blog/ideias-confraternizacao-fim-de-ano-empresa)
  para programação, e [como escolher o espaço da confraternização](/blog/confraternizacao-fim-ano-espaco-empresa)
  para critérios de espaço

### H2: Como Escolher Entre os Três (Tabela Comparativa) (300-350 palavras)
- Tabela Markdown comparando os 3 formatos por: objetivo principal, público típico, formato do
  cronograma (conteúdo x celebração), estrutura mais exigida, época do ano mais comum
  (confraternização concentra em novembro/dezembro; convenção costuma abrir o ciclo comercial
  no início do ano; treinamento acontece o ano todo)
- Reforçar o insight do pilar: o mesmo espaço recebe os 3 ao longo do ano, então decidir o
  formato primeiro simplifica a escolha do fornecedor depois
- **Nunca cruzar número de vagas do estacionamento com capacidade de convidados**

### H2: Minha Empresa Pode Fazer Mais de um Formato no Mesmo Ano? (150-200 palavras)
- Resposta direta: sim, é comum (ex.: convenção em janeiro/fevereiro, confraternização em
  dezembro); reforça o ângulo de "espaço como decisão de médio prazo" do pilar
- Link interno para o pilar como leitura de continuidade

### FAQ (4 itens)
1. Qual a diferença entre convenção e confraternização? Convenção tem foco de alinhamento
   comercial com conteúdo pela manhã; confraternização é celebração do time, sem pauta de
   trabalho.
2. Convenção de vendas é a mesma coisa que treinamento? Não: convenção mistura conteúdo e
   celebração para o time comercial; treinamento é só capacitação, com grupo geralmente menor.
3. Que tipo de evento devo fazer para minha equipe? Depende do objetivo do momento: alinhar
   metas (convenção), capacitar (treinamento) ou celebrar (confraternização).
4. Dá para fazer treinamento e confraternização no mesmo espaço? Sim, o mesmo espaço recebe os
   3 formatos ao longo do ano, mudando a montagem, não o endereço.

### Conclusão (100-150 palavras)
- Retomar: o formato se decide pelo objetivo do encontro, não pelo orçamento ou pela data
  disponível
- CTA: falar com o Espaço Coral pelo WhatsApp para descrever o objetivo do evento e já sair
  com uma sugestão de formato e estrutura

## Statistics to Include

**Recomendação deste brief: usar no máximo 1 estatística externa, ou nenhuma.** Levantamento
em `content/blog/` mostra que a estatística ABEOC/DataEventos 2025 (E3, alta de 15,96% na
procura por eventos corporativos) já aparece no pilar, em `ideias-confraternizacao-fim-de-ano-empresa`
e em `convencao-de-vendas-como-organizar`; a estatística Sebrae/ABEOC de dimensionamento do
setor (E1, R$ 813,5 bilhões/2024) já aparece em praticamente todo post do cluster corporativo
e do cluster 15 anos. Reutilizar qualquer uma delas aqui estufaria ainda mais o mesmo dado.
Este post é uma comparação de formatos, não uma peça de dimensionamento de mercado: prefira
abrir com a observação de experiência do espaço (ver Information Gain) em vez de estatística.
Se o time editorial quiser 1 dado de contexto mesmo assim, `E4` (Ubrafe/SPTuris, 1.511 eventos
B2B de grande porte em SP em 2025, +22%) é a opção menos repetida no cluster (usada 1x, em
`ideias-confraternizacao-fim-de-ano-empresa`) e já está verificada em
`docs/blog-fontes-verificadas.md`. Não buscar fonte nova: WebFetch para domínios externos está
bloqueado nesta execução (EGRESS_BLOCKED); qualquer estatística fora da lista verificada deve
ficar de fora e virar nota para revisão humana.

| # | Statistic | Source | Year | Section |
|---|-----------|--------|------|---------|
| 1 (opcional) | 1.511 eventos B2B de grande porte em SP, +22% vs 2024 | Barômetro Eventos B2B 2025, Ubrafe/SPTuris, via Panrotas: https://www.panrotas.com.br/destinos/pesquisas-e-estatisticas/2026/02/eventos-b2b-crescem-22-em-sao-paulo-e-geram-impacto-recorde-de-r-14-bilhoes-em-2025_225901.html | 2025 | Introdução ou H2 final (contexto de demanda, não como abertura estatística) |

## Citation Capsule Plan
| Section | Capsule Focus | Key Stat | Source |
|---------|--------------|----------|--------|
| H2: O Que Diferencia os Três | Convenção, treinamento e confraternização têm objetivo, público e ritmo diferentes; não são o mesmo evento com nome trocado | nenhuma (definição) | experiência do espaço |
| H2: Convenção de Vendas | Convenção mistura conteúdo pela manhã e celebração à noite; TVs, som e Wi-Fi já inclusos, telão e projetor são fornecedor à parte | nenhuma | experiência do espaço |
| H2: Como Escolher Entre os Três | O mesmo espaço recebe os 3 formatos ao longo do ano mudando a montagem, então decidir o formato primeiro simplifica a escolha do fornecedor | opcional: 1.511 eventos B2B SP 2025 (+22%) | Ubrafe/SPTuris via Panrotas |

## Cover Image

| Option | Details |
|--------|---------|
| Foto real (obrigatório, `coverStrategy: real-photos-bank`) | `/images/scenes/ambientes/marquise/espaco-coral-ambientes-marquise-01.webp` (zero usos em `data/images-usage.json`; `scenes/bancos-gerais/corporativo` está esgotado, 2/2 fotos já com 2-3 usos cada, mesmo precedente adotado em `convencao-de-vendas-como-organizar`) |
| Alt sugerido | "Marquise do Espaço Coral, ambiente flexível para receber convenção, treinamento ou confraternização de empresa em Batatais SP" |
| Dimensions | usar a imagem como está (pipeline `scenes/*` já processa em 1080px/q60); não gerar capa nova, não gerar SVG |

## Visual Element Plan

| # | Type | Data | Section |
|---|------|------|---------|
| 1 | Foto real (capa) | `/images/scenes/ambientes/marquise/espaco-coral-ambientes-marquise-01.webp` | Topo do post |
| 2 | Foto real (inline) | `/images/scenes/ambientes/marquise/espaco-coral-ambientes-marquise-02.webp` | H2: Convenção de Vendas ou Kickoff (ambiente que "vira de manhã para a noite") |
| 3 | Foto real (inline) | `/images/scenes/ambientes/entrada-salao/espaco-coral-ambientes-entrada-salao-03.webp` | H2: Como Escolher Entre os Três (fecha o post mostrando o espaço pronto para receber qualquer formato) |

Nota: `data/images-usage.json` tem uma entrada residual apontando
`espaco-coral-ambientes-entrada-salao-01.webp` para `content/blog/tipos-eventos-corporativos.mdx`
(arquivo não existe atualmente no repo, provável resíduo de uma tentativa anterior revertida
deste mesmo item de fila). Não usar essa imagem 01 aqui para não colidir com esse resíduo;
as imagens 02 e 03 acima estão limpas.

## Competitive Gaps to Exploit
1. Não foi possível rodar WebSearch/WebFetch de concorrentes nesta passada por restrição de
   sandbox (fact-check e fetch externo desligados); usar o padrão já mapeado em
   `docs/blog-strategy.md` (Pilar 4): SERPs corporativas do cluster têm páginas programáticas
   rasas e falta de guia editorial de verdade comparando formatos por critério de decisão, não
   só listando o que é cada um.
2. Diferencial: framing de decisão (qual formato serve ao MEU objetivo) em vez de definição
   enciclopédica de cada tipo de evento.
3. Diferencial de formato: tabela comparativa objetiva substituindo texto corrido, que é o que
   a maioria dos concorrentes entrega.

## Internal Link Architecture
- **Link TO** (do novo post para páginas existentes):
  1. `/blog/eventos-corporativos-interior-sp-guia` — anchor: "guia completo de eventos
     corporativos no interior de SP" (pilar do cluster)
  2. `/blog/convencao-de-vendas-como-organizar` — anchor: "como organizar a convenção de
     vendas" (spoke irmão, formato 1)
  3. `/blog/ideias-confraternizacao-fim-de-ano-empresa` — anchor: "ideias de programação para
     a confraternização de fim de ano" (spoke irmão, formato 3)
  4. `/blog/confraternizacao-fim-ano-espaco-empresa` — anchor: "como escolher o espaço para a
     confraternização" (spoke irmão, critério de espaço)
  5. `/eventos/corporativo` — anchor: "estrutura do Espaço Coral para eventos corporativos"
     (página comercial)
  6. `/estrutura` — anchor: "conheça a estrutura do espaço" (página comercial)
  7. CTA: [WhatsApp (16) 99129-4178](https://wa.me/5516991294178) (conversão)
- **Link FROM** (atualizar estas páginas para linkar o novo post, quando houver folga de
  refresh; não obrigatório para publicar):
  1. `/blog/eventos-corporativos-interior-sp-guia` — na seção "Quais São os Principais Tipos
     de Evento Corporativo?", anchor: "veja o comparativo completo entre convenção, treinamento
     e confraternização"
  2. `/blog/convencao-de-vendas-como-organizar` — anchor: "compare com outros formatos de
     evento corporativo"
  3. `/blog/ideias-confraternizacao-fim-de-ano-empresa` — anchor: "confraternização é o formato
     certo para sua empresa?"
- **Pillar connection**: `eventos-corporativos-interior-sp-guia` (Pilar 4, `pillar: "corporativo"`)
- **Cluster position**: Spoke (item 6 do Pilar 4 em `docs/blog-strategy.md`)

## E-E-A-T Signals to Include
- **Experience**: observação em primeira pessoa (Lin Zeri) sobre padrões de acerto e erro de
  formato vistos em eventos corporativos recebidos no Espaço Coral
- **Expertise**: `authorBio` padrão do cluster corporativo (Lin Zeri coordena confraternizações,
  formaturas e lançamentos de empresas da região)
- **Authority**: link para o pilar e para os spokes de execução (convenção, confraternização),
  mostrando cobertura consistente do tema
- **Trust**: sem preços, sem promessa de telão/projetor incluso, sem número de vagas de
  estacionamento, estacionamento e capacidade citados dentro dos limites factuais de
  `docs/diretrizes-blog.md`

## Distribution Plan
- **LinkedIn**: ângulo para RH e gestores administrativos da região (Batatais, Ribeirão Preto,
  Franca): "Sua empresa está marcando o evento certo para o objetivo do momento?", linkando o
  post; horário de publicação sugerido: terça ou quarta de manhã (público corporativo B2B)
- **Email**: se houver newsletter B2B futura, excerto de 2-3 frases sobre a tabela comparativa,
  assunto sugerido: "Convenção, treinamento ou confraternização: qual sua empresa precisa agora"
- **Reddit**: baixa prioridade para este tema (nicho local/B2B, pouca tração em r/brasil ou
  subs de eventos); pular por ora
- **YouTube**: não priorizado neste post (tema não visual o suficiente para vídeo dedicado sem
  orçamento de produção)
- **Twitter/X**: não priorizado (público corporativo local não está concentrado na plataforma)

## Frontmatter (contrato de `lib/blog-utils.ts`)
- `pillar: "corporativo"`
- `status: "published"` (escrever explícito)
- `author: "Lin Zeri"` (autor humano do queue item é `lin-zeri`; usar o mesmo padrão de nome
  completo já usado nos demais posts do cluster)
- `coverImage`: `/images/scenes/ambientes/marquise/espaco-coral-ambientes-marquise-01.webp`
- `ogImage`: mesma imagem da capa
- `keywordPrimary`: "tipos de eventos corporativos"
- `keywordSecondary`: as 4 secondary_keywords do item da fila
- `publishDate`: "2026-10-02" (conforme item da fila)

## Regras factuais obrigatórias na escrita (não repetir na revisão, só cumprir)
- TVs, som ambiente e Wi-Fi para convidados: inclusos. Telão de LED e projetor: NUNCA
  prometer como incluso (são fornecedor contratado pelo cliente), mesmo havendo fotos de telão
  no banco de imagens.
- Capacidade: até 320 convidados sentados (não inventar número diferente por formato).
- Estacionamento: citar apenas "com orientadores", nunca número de vagas, nunca cruzar vagas
  com capacidade de convidados.
- Espaço Coral é o local, não buffet: fornecedores contratados livremente pelo cliente, sem
  exclusividade (pode citar como diferencial, mas sem nome de concorrente).
- Sem preços em nenhum momento; todo CTA aponta para WhatsApp (16) 99129-4178.
- Sem travessão (em dash) em nenhum trecho do artigo.
- Sem citar concorrentes nominalmente.
- Nenhuma estatística fora de `docs/blog-fontes-verificadas.md`; se o fact-check ao vivo não
  puder validar um número novo (WebFetch bloqueado nesta execução), não citar: usar linguagem
  qualitativa e deixar nota para revisão humana.
