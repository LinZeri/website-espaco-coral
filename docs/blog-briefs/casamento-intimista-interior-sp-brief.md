# Content Brief: Casamento Intimista no Interior de SP: Por Que Vale a Pena

## Cannibalization Pre-Flight

**Status: overlap existe, mas com ângulo único definido. Não bloquear.**

Dois posts publicados já tocam o tema:
- `mini-wedding-guia-completo.mdx` (hub do Pilar 5, keyword primária "mini wedding"): responde **o que é e como organizar** um mini wedding/casamento intimista. FAQ do próprio hub já declara que os termos "mini wedding" e "casamento intimista" são usados de forma intercambiável no mercado.
- `casamento-pequeno-vs-grande.mdx` (comparison, keyword primária "casamento pequeno ou grande"): responde **qual tamanho escolher**, com "casamento intimista" como keyword secundária e faixa 30-100 convidados definida ali.

Isso é overlap de tema esperado e não é cannibalização: `docs/blog-strategy.md` (Pilar 5, seção "Atenção a canibalização") já mapeia a divisão de intenção do cluster:
- Hub (`mini-wedding-guia-completo`) = **O QUE é e COMO organizar** (how-to)
- `casamento-pequeno-vs-grande` = **QUAL TAMANHO** escolher (comparison)
- `capacidade-espaco-casamento-calculo` = **QUANTOS CABEM** (data-research)
- **Este post** = **POR QUE VALE A PENA** escolher o formato intimista (thought-leadership, ângulo de benefício/racional emocional, não definição nem comparação de tamanho)

**Regra de não-duplicação para quem escrever o artigo**: não redefinir o que é mini wedding/casamento intimista nem repetir a tabela de faixas por número de convidados (elopement/micro/mini/médio/grande). Ambos já existem nos posts irmãos. Linkar para lá em vez de reexplicar. Este post assume que o leitor já decidiu (ou está decidindo) pelo formato intimista e foca no **racional de decisão**: o que se ganha, o que se perde, como lidar com a pressão social da lista grande, e por que o interior de SP potencializa esse formato.

**Diagnóstico de SERP (WebSearch, 2026-09-21)**: a busca "casamento intimista interior de são paulo vale a pena" e "casamento intimista vantagens tendência 2026" retorna sobretudo (a) listas de espaços da capital/região metropolitana (Lápis de Noiva, Lejour, Casinha Le Julie, Ostartaris) e (b) artigos de tendência genéricos sem ângulo de decisão nem ancoragem de interior paulista específico (Batatais/Ribeirão Preto). Nenhum resultado nas primeiras posições é de um espaço da região. Confirma o diagnóstico já registrado em `blog-strategy.md` para o Pilar 5: gap real de conteúdo "por que vale a pena" ancorado no interior de SP.

`cannibalization_detected: false` — overlap de tema é por design de cluster (hub-and-spoke), com sub-intenção distinta e plano de link explícito entre os três posts.

---

## Template
**Recomendado**: `thought-leadership` — post de opinião fundamentada/racional de decisão, não guia instrucional nem comparação lado a lado. Consistente com o `template` já definido no item da fila (`thought-leadership`).
**Arquivo de referência**: `skills/blog/templates/thought-leadership.md` (se disponível no ambiente de escrita)

## Target Keywords
- **Primária**: casamento intimista (~3.600 buscas/mês, conforme `docs/blog-strategy.md`, Pilar 5)
- **Secundárias**: casamento intimista interior de são paulo; vantagens do casamento intimista; mini wedding vs casamento intimista
- **Perguntas (PAA-style)**:
  - Casamento intimista é mais barato?
  - Qual a diferença entre mini wedding e casamento intimista?
  - Casamento intimista no interior de SP vale a pena?
  - Como lidar com a família quando a lista é curada e alguém fica de fora?

## Search Intent
**Informacional com viés de decisão (não transacional puro).** O leitor já ouviu falar de casamento intimista/mini wedding e quer confirmar se é a escolha certa para o próprio casamento: o que ganha em experiência, o que enfrenta em termos de pressão social e orçamento por convidado, e por que fazer isso no interior de SP (vs capital) é vantagem, não concessão. CTA natural: WhatsApp para conversar sobre a estrutura do Espaço Coral para esse formato.

## Content Parameters
- **Word count**: 1.800 palavras (definido pelo item da fila)
- **Format**: MDX (frontmatter completo conforme contrato de `lib/blog-utils.ts`)
- **H2 sections**: 6
- **Cadência de H2 em pergunta**: 60-70% (misturar afirmativos e perguntas; diretriz do blog para não estourar padrão de IA)
- **Imagens**: cover + 2 inline (já definidas no item da fila, ambas com 0 usos em `data/images-usage.json`, seguras para usar)
- **FAQ**: 4 itens (ver abaixo), sem schema FAQPage dedicado (não é mais rich-result geral do Google; manter como seção de conteúdo)
- **Sem preços em nenhum momento do texto.** CTA sempre WhatsApp (16) 99129-4178.
- **Nunca usar travessão (—)** em nenhuma frase do artigo.

## Recommended Title
Casamento Intimista no Interior de SP: Por Que Vale a Pena
(já definido no item; 53 caracteres, dentro do limite de 60)

Alternativas:
1. Casamento Intimista: 5 Motivos Para Escolher o Interior de SP
2. Por Que Cada Vez Mais Casais Escolhem o Casamento Intimista

## Meta Description
"Casamento intimista no interior de SP: mais experiência por convidado, menos pressão de lista e cenário natural que a capital não oferece. Veja por que vale a pena." (~155 caracteres)

## TL;DR Draft
> **Resumindo:** casamento intimista não é casamento reduzido, é escolha deliberada de qualidade por convidado. No interior de SP, o formato ganha ainda mais força: área verde, estacionamento fácil e liberdade de fornecedores que a capital raramente oferece no mesmo espaço. Sem mínimo de convidados, o Espaço Coral atende esse formato com a estrutura completa.

## Information Gain Opportunities
- **[PERSONAL EXPERIENCE]**: observação em primeira pessoa (Lin Zeri) sobre o padrão que o espaço tem visto: casais que chegam decididos por um casamento grande e, na visita, reconsideram para uma lista mais curta depois de entender o ganho de experiência. Não inventar número, tratar como observação qualitativa de quem acompanha as visitas.
- **[UNIQUE INSIGHT]**: contra-narrativa ao mito "casamento intimista = orçamento apertado". O racional correto é custo por convidado mais alto, não mais baixo (mesmo ponto já registrado no hub e no comparativo, mas aqui aplicado ao argumento de "por que vale a pena": o dinheiro que sobra de não ter 200 convidados vira experiência, não economia).
- **[UNIQUE INSIGHT]**: ângulo "pressão social da lista": como decidir quem entra na lista curada sem drama familiar. Ângulo pouco explorado nos concorrentes de capital (que focam em espaço e decoração, não na conversa difícil de cortar convidados).

## Content Outline

### Introdução (120-150 palavras)
- Hook: em 2024, o Brasil registrou 948,9 mil casamentos civis ([IBGE, Registro Civil 2024](https://ibdfam.org.br/noticias/13484/Divórcios+caem+e+casamentos+sobem+em+2024,+aponta+IBGE), acesso em set. 2026). Dentro desse volume, cresce a fatia de quem escolhe fazer menos, e melhor.
- Problema: pressão social e dúvida sobre se "diminuir" a festa é abrir mão de algo.
- Promessa: o artigo mostra o racional de decisão, não redefine o formato (link para o hub).
- TL;DR logo após o hook, antes do primeiro H2.

### H2: O Que Muda Quando Você Escolhe um Casamento Intimista (afirmativo, 280-320 palavras)
- Não redefinir faixas de convidados (linkar `mini-wedding-guia-completo` para quem quiser a definição completa).
- Foco: o que muda na experiência do dia (tempo por convidado, ritmo, personalização), não a mecânica de organização.
- Imagem: cover, casal em ambiente intimista.

### H2: Casamento Intimista Sai Mais Barato? (pergunta, 280-320 palavras)
- Resposta direta: custo total menor, custo por convidado maior. Mesmo racional do hub e do comparativo, mas aplicado aqui ao argumento de valor (o orçamento concentrado vira experiência).
- Sem citar preço do Espaço Coral. CTA para WhatsApp para "consulte" no fechamento da seção.

### H2: Por Que o Interior de SP Potencializa o Casamento Intimista (afirmativo, 300-350 palavras)
- Ângulo central do post (é o que falta na SERP hoje: só listas de espaço da capital).
- Área verde para cerimônia ao ar livre, salão envidraçado climatizado, liberdade de fornecedores (diferencial cravado em `diretrizes-blog.md`), estacionamento com orientadores sem citar vagas.
- Não criar seção de plano B/chuva. Se citar clima, seguir a regra da casa: focar em meses secos (jun/jul/ago), sem dramatizar.
- Imagem inline 1 (varanda).

### H2: Como Montar a Lista Sem Drama Familiar (pergunta, 280-320 palavras)
- Ângulo de information gain: critério prático para decidir quem entra (proximidade real, não obrigação social).
- Sem estatística aqui; é conselho de experiência, primeira pessoa do espaço.

### H2: Mini Wedding e Casamento Intimista São a Mesma Coisa? (pergunta, 250-280 palavras)
- Responder de forma breve (o hub já cobre em profundidade); linkar `mini-wedding-guia-completo` como a referência completa.
- Fechar com o diferencial do Espaço Coral: sem número mínimo de convidados, mesma estrutura completa independentemente do tamanho.
- Imagem inline 2.

### FAQ (4 itens)
1. Casamento intimista é mais barato que um casamento grande? Custo total tende a ser menor; custo por convidado costuma ser maior, porque buffet e decoração escalam por pessoa.
2. Qual a diferença entre mini wedding e casamento intimista? Na prática os termos coexistem: casamento intimista descreve o espírito (proximidade, personalização); mini wedding é o formato com lista de 20 a 100 convidados (ver guia completo).
3. Como decidir quem entra na lista de convidados de um casamento intimista? Critério prático: presença real na vida do casal, não obrigação social. Conversas difíceis ficam mais fáceis quando a decisão é dos dois, não de terceiros.
4. O Espaço Coral tem número mínimo de convidados para casamento intimista? Não. A mesma estrutura completa (sala privativa, área verde, salão envidraçado, estacionamento com orientadores) atende qualquer tamanho de lista.

### Conclusão (120-150 palavras)
- Retomada dos pontos-chave (bullets).
- CTA: [WhatsApp (16) 99129-4178](https://wa.me/5516991294178?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20casamento%20intimista%20no%20Espa%C3%A7o%20Coral) para consultar disponibilidade e estrutura.

## Statistics to Include

Fonte única canônica: `docs/blog-fontes-verificadas.md`. Não citar nada fora desta lista (WebFetch bloqueado nesta rodada; factcheck desligado). Se um dado novo for necessário durante a escrita, seguir o fluxo buscar → verificar (WebFetch, quando disponível) → registrar → citar; se não for possível verificar, tratar como observação qualitativa e deixar nota para revisão humana.

| # | Estatística | Fonte | Ano | Seção |
|---|---|---|---|---|
| 1 | 948,9 mil casamentos civis no Brasil em 2024, alta de 0,9% sobre 2023 | [IBGE, Registro Civil 2024, via IBDFAM](https://ibdfam.org.br/noticias/13484/Divórcios+caem+e+casamentos+sobem+em+2024,+aponta+IBGE) | 2024 | Introdução (hook) |
| 2 | Idade média ao casar: 31,5 anos (homens) e 29,3 anos (mulheres) | [IBGE, Registro Civil 2024, via IBDFAM](https://ibdfam.org.br/noticias/13484/Divórcios+caem+e+casamentos+sobem+em+2024,+aponta+IBGE) | 2024 | H2: "O Que Muda Quando Você Escolhe..." (contexto: casais que decidem casar mais tarde tendem a priorizar experiência sobre volume; usar como observação, não causalidade direta não sustentada pela fonte) |

Nota: evitar repetir W4 (The Knot, média de 125 convidados/R$44 mil) como estatística central aqui, já é o dado de abertura de `mini-wedding-guia-completo` e `casamento-pequeno-vs-grande`. Usar no máximo como menção lateral, se necessário, sem duplicar o mesmo papel de "hook" que já cumpre nos dois posts irmãos.

## Citation Capsule Plan

| Seção | Foco da cápsula | Estatística-chave | Fonte |
|---|---|---|---|
| Introdução | Volume de casamentos no Brasil como pano de fundo do crescimento do formato intimista | 948,9 mil casamentos civis em 2024 | IBGE, Registro Civil 2024 |
| "Casamento Intimista Sai Mais Barato?" | Custo total menor, custo por convidado maior (racional, sem número fabricado) | Sem estatística nova; reforçar como observação do espaço | Experiência do Espaço Coral |
| "Por Que o Interior de SP Potencializa..." | Diferencial estrutural (área verde, liberdade de fornecedores, sem mínimo de convidados) | Fato cravado do negócio, não estatística de mercado | `diretrizes-blog.md` |

## Cover Image

| Opção | Detalhes |
|---|---|
| Foto real (obrigatório) | `/images/scenes/pessoas/casal/espaco-coral-pessoas-casal-02.webp` — já definida no item da fila. 0 usos em `data/images-usage.json`, segura. Alt sugerido: "Casal em momento intimista no Espaço Coral, em Batatais SP" |
| Geração por IA | **Proibido.** Governança do banco de imagens exige foto real (sinal E-E-A-T); `hero.enabled: false` no config confirma. |
| Dimensões | usar conforme padrão do projeto para `coverImage`/`ogImage` (1280px, qualidade WebP 65, já a resolução do arquivo existente) |

## Visual Element Plan

| # | Tipo | Conteúdo | Seção |
|---|---|---|---|
| 1 | Foto real (cover) | Casal em ambiente intimista, `.../pessoas-casal-02.webp` | Introdução / topo do post |
| 2 | Foto real (inline) | Casal, `.../pessoas-casal-03.webp` (0 usos) | H2: "Por Que o Interior de SP Potencializa..." |
| 3 | Foto real (inline) | Varanda do espaço, `.../ambientes-varanda-01.webp` (0 usos) | H2: "Mini Wedding e Casamento Intimista São a Mesma Coisa?" |

Sem gráficos: o post é de racional/opinião, não data-research. Não forçar chart para preencher cota.

## Competitive Gaps to Exploit
1. SERP hoje é dominada por listas de espaços da capital/região metropolitana e por artigos de tendência genéricos, sem ângulo de decisão nem ancoragem regional no interior paulista (Batatais/Ribeirão Preto). Nenhum concorrente nas primeiras posições fala a partir do interior de SP.
2. Concorrentes focam em decoração/estética do formato intimista; nenhum aborda o ângulo prático "como montar a lista sem drama familiar", que é dor real de quem está decidindo.
3. Diferencial estrutural verificável (sem mínimo de convidados, liberdade de fornecedores) que a maioria dos espaços de capital não oferece no mesmo pacote.

## Internal Link Architecture
- **Link TO** (deste post para páginas existentes):
  1. `/blog/mini-wedding-guia-completo` — anchor: "guia completo de mini wedding" (hub do cluster, usar na seção de definição e no FAQ)
  2. `/blog/casamento-pequeno-vs-grande` — anchor: "comparativo entre casamento pequeno e grande"
  3. `/blog/sala-da-noiva-importancia` — anchor: "sala privativa da noiva"
  4. `/estrutura` — anchor: "estrutura completa do Espaço Coral"
  5. WhatsApp (16) 99129-4178 — anchor: "fale com o Espaço Coral pelo WhatsApp" (CTA final, link `https://wa.me/5516991294178?text=...`)
- **Link FROM** (atualizar estes posts publicados para linkar para o novo post, depois que ele for publicado):
  1. `/blog/mini-wedding-guia-completo` — anchor: "por que vale a pena escolher o formato intimista" (o hub deveria apontar para os spokes, conforme plano do Pilar 5 em `blog-strategy.md`)
  2. `/blog/casamento-pequeno-vs-grande` — anchor: "motivos para escolher um casamento intimista"
  3. `/blog/capacidade-espaco-casamento-calculo` — anchor: "casamento intimista no interior de SP"
- **Pillar connection**: Pilar 5 (Mini wedding e casamento intimista), conforme `docs/blog-strategy.md`
- **Cluster position**: Spoke #3 do Pilar 5 (hub = `mini-wedding-guia-completo`)

## E-E-A-T Signals to Include
- **Experience**: observação em primeira pessoa de Lin Zeri sobre o padrão observado em visitas (casais reconsiderando o tamanho da lista); case indireto já autorizado de festas menores no espaço.
- **Expertise**: autoria fixa "Lin Zeri está à frente do Espaço Coral" (mesma authorBio usada nos posts irmãos do cluster).
- **Authority**: link cruzado com os outros dois posts publicados do mesmo cluster (hub + comparativo), reforçando coerência temática do site.
- **Trust**: nenhuma estatística sem fonte verificada em `blog-fontes-verificadas.md`; nenhum preço exibido; CTA sempre WhatsApp.

## Distribution Plan
- **Reddit**: não recomendado para este nicho local (baixo fit de subreddits brasileiros de casamento com intenção de busca local); pular.
- **YouTube**: não aplicável nesta fase (sem produção de vídeo no momento).
- **LinkedIn**: baixo fit (público de casamento, não corporativo); pular ou republicar apenas no Instagram/Facebook do espaço, fora do escopo deste brief.
- **Email**: se houver newsletter futura, trecho de 2-3 frases sobre "casamento intimista não é casamento menor, é casamento com mais atenção por convidado", CTA para o post completo.
- **Instagram/Facebook (canal real do negócio)**: trecho do racional "custo por convidado maior, não menor" como carrossel, linkando para o post via bio/link.

## Notas para quem for escrever o artigo (`/blog write`)
- Ler `docs/diretrizes-blog.md` inteiro antes de escrever (fatos cravados: capacidade 320, sem mínimo de convidados, sala privativa, área verde, salão envidraçado climatizado, liberdade de fornecedores, sem plano B estruturado/não criar seção de chuva).
- `pillar` no frontmatter MDX deve ser `"casamento"` (o valor `"mini-wedding"` não existe no contrato de `lib/blog-utils.ts`; o cluster mini-wedding mapeia para pillar `casamento`).
- `status: "published"` explícito no frontmatter (default do schema é `published`, mas não deixar implícito).
- Nenhum travessão (—) em nenhuma frase.
- Nenhum preço. CTA final sempre para WhatsApp (16) 99129-4178.
- Não citar concorrentes nominalmente (nem os espaços de capital encontrados na pesquisa de SERP).
- Não usar estatística de casamento fabricada; usar apenas as duas linhas da tabela "Statistics to Include" acima, ambas já verificadas em `docs/blog-fontes-verificadas.md`.
