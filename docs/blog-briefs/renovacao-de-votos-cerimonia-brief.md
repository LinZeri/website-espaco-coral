# Content Brief: Renovação de Votos: Como Organizar a Cerimônia

> Item da fila: `p5-votos` · slug `renovacao-de-votos-cerimonia` · cluster `mini-wedding` (Pilar 5,
> `docs/blog-strategy.md`) · pillar de frontmatter: `casamento` (cluster mini-wedding mapeia para
> `casamento`, não existe valor `mini-wedding` no schema). Spoke, prioridade média.

## Pré-flight de canibalização (obrigatório, executado antes deste brief)

**Resultado: nenhuma canibalização detectada.** Busquei "renovação", "renovacao" e "votos" em
`content/blog/` (42 posts). Toda ocorrência de "votos" nos posts existentes é a palavra genérica
"trocar os votos" dentro da cerimônia de casamento tradicional (roteiro hora a hora, sala da
noiva, cerimônia ao pôr do sol, golden hour), nunca a renovação de votos como evento em si.
Nenhum post existente responde à intenção de busca "renovação de votos" (cerimônia sem valor
civil, para casais já casados, tipicamente em data simbólica). O próprio `docs/blog-strategy.md`
(linha 210) já cadastra este spoke como **Novo** dentro do Pilar 5 (mini wedding), reforçando que
é território ainda não coberto. Ângulo único deste post: cerimônia sem burocracia civil, focada em
casais já casados que querem reafirmar o compromisso, versus os posts de cerimônia de casamento
tradicional (que pressupõem casamento civil/religioso com todos os trâmites legais). Segue o brief.

## Template
**Recommended**: how-to-guide (definido pelo item da fila). Faz sentido: a busca "renovação de
votos" e as secundárias ("como organizar renovação de votos") são passo a passo, intenção
informacional com viés de planejamento prático, não comparação nem lista.
**Template file**: `skills/blog/templates/how-to-guide.md`

## Target Keywords
- **Primary**: renovação de votos (1.900 buscas/mês, `docs/blog-strategy.md` linha 76, dado
  DataForSEO da revisão 2 de 17/09/2026)
- **Secondary**: cerimônia de renovação de votos; como organizar renovação de votos; renovação de
  votos ao ar livre
- **Questions** (a partir da pesquisa de concorrência via WebSearch, ver Step 3): O que é a
  renovação de votos de casamento?; Precisa de celebrante ou pode ser sem?; Com quanto tempo de
  antecedência organizar?; Pode ser feita ao ar livre?; Renovação de votos tem valor legal?

## Search Intent
Informacional com intenção de planejamento (mid-funnel): quem busca já decidiu fazer a renovação e
quer entender como organizar (celebrante, roteiro, local, quando fazer), não está comparando
espaços ainda. O post deve responder à dúvida e conduzir para o Espaço Coral como o lugar certo
para realizar, sem nunca tratar como cerimônia "menor" que um casamento.

## Content Parameters
- **Word count**: 1.800 palavras (definido pelo item da fila; dentro da faixa de spoke, 1.500 a
  2.500, de `docs/blog-strategy.md` linha 103)
- **Reading level**: Flesch 60-70 (expert-accessible, tom da casa: consultivo, não robótico)
- **Format**: MDX (`content/blog/renovacao-de-votos-cerimonia.mdx`)
- **H2 sections**: 7
- **Images**: cover + 2 inline já reservadas pelo item da fila (ver "Cover Image" abaixo); ambas
  com 0 usos em `data/images-usage.json` no momento deste brief, então não há alerta de 3ª uso a
  disparar
- **Charts**: nenhum. Tema não comporta estatística de mercado própria (ver "Statistics to
  Include" abaixo) e o cluster mini-wedding não tem histórico de gráfico nos posts publicados
- **FAQ items**: 5, mapeando as question queries acima (frontmatter `faq[]`, alimenta o
  JSON-LD FAQPage do schema do post)

## Recommended Title
Renovação de Votos: Como Organizar a Cerimônia

Alternative titles:
1. Renovação de Votos ao Ar Livre: Guia Completo para Organizar
2. Como Organizar uma Cerimônia de Renovação de Votos

(Mantive o título do item da fila como principal: já usa a keyword primária no início e segue o
padrão dos títulos já publicados no cluster, ex. "Mini Wedding: Guia Completo".)

## Meta Description
"Renovação de votos: como organizar a cerimônia, escolher celebrante, decidir a data e montar o
roteiro. Guia completo para casais que querem reafirmar o compromisso ao ar livre."
(159 caracteres. Sem estatística, porque não há número de mercado verificável específico do tema,
ver seção de fontes abaixo; a diretriz de fontes proíbe inventar número só para preencher a meta
description.)

## TL;DR Draft
> **TL;DR:** A renovação de votos não tem valor civil, então o casal define celebrante, roteiro e
> local com total liberdade. O melhor cenário ao ar livre no interior de SP é entre junho e
> agosto, os meses mais secos do ano. Comece a organizar com 6 meses de antecedência (12 se for um
> evento grande) e escolha um espaço com estrutura completa para cerimônia e festa no mesmo lugar.

## Information Gain Opportunities
- **[PERSONAL EXPERIENCE]**: Observação em primeira pessoa (Lin Zeri) sobre como uma renovação de
  votos muda o tom da coordenação no espaço em relação a um casamento tradicional: menos
  formalidade de cerimonial civil, mais liberdade de roteiro, geralmente lista de convidados menor
  e mais próxima. Inserir como bloco de experiência real, não estatística.
- **[UNIQUE INSIGHT]**: Diferenciar explicitamente "renovação de votos" de "mini wedding" logo na
  introdução: mini wedding é um primeiro casamento com lista enxuta; renovação de votos é para
  quem já é casado e não tem trâmite civil nem religioso obrigatório. Esse esclarecimento é um gap
  real: nenhum concorrente pesquisado (ver Step 3) faz essa distinção de forma direta, todos tratam
  como sinônimos de "evento pequeno e romântico".
- **[ORIGINAL DATA]**: Não há dado proprietário disponível (o espaço ainda não realizou renovação
  de votos registrada como case). Não inventar número; deixar para uma atualização futura se e
  quando houver um evento real documentado.

## Content Outline

### Introduction (120-150 words)
- Hook: diferenciar renovação de votos de casamento tradicional logo na primeira frase (sem
  estatística, ver "Statistics to Include")
- Problema: casais não sabem por onde começar porque a renovação não segue o roteiro do casamento
  civil/religioso que todo mundo já conhece
- Promessa: guia prático de como organizar, do celebrante à data certa
- TL;DR box logo após o hook, antes do primeiro H2

### H2: O Que é a Renovação de Votos de Casamento? (250-300 words)
- Resposta direta: cerimônia simbólica sem valor legal, para casais já casados reafirmarem o
  compromisso, em data e formato livres
- Diferenciar de casamento civil/religioso (sem cartório, sem juiz de paz, sem padre/pastor
  obrigatório: pode ser conduzida por quem o casal escolher)
- Diferenciar de mini wedding (ver Information Gain acima)
- **Imagem**: cover, cerimônia ao ar livre montada (ambiente, não still de objeto)

### H2: Quando Fazer a Renovação de Votos? (200-250 words)
- Datas simbólicas comuns: bodas de casamento (aniversário de casamento), mas sem regra fixa
- Ângulo do espaço: se for ao ar livre, recomendar junho, julho e agosto (meses mais secos do
  interior leste paulista); depois maio, setembro e outubro; não recomendar novembro a fevereiro
  para cerimônia a céu aberto (regra cravada em `diretrizes-blog.md`)
- **Key stat**: precipitação mensal Ribeirão Preto (climatologia, Climatempo, fonte C1 já
  verificada, ver "Statistics to Include")

### H2: Precisa de Celebrante? Quem Pode Conduzir a Cerimônia (200-250 words)
- Como não há exigência civil, o celebrante pode ser um oficiante contratado, um religioso
  escolhido pelo casal, ou alguém querido (amigo, familiar) que o casal convide para conduzir
- Reforçar liberdade de fornecedores do Espaço Coral: o casal contrata quem quiser
- **Imagem**: inline 1, momento da cerimônia com celebrante/casal

### H2: Como Montar o Roteiro da Cerimônia (250-300 words)
- Estrutura sugerida: entrada do casal (juntos ou tradicional), leitura ou fala de coração a
  coração, troca de alianças (opcional, muitos optam por não trocar peça nova), selo simbólico
  (ex. abraço, brinde), saída
- Observação qualitativa (não estatística): cerimônias de renovação tendem a ser mais curtas e
  menos protocolares que o casamento civil, o que dá espaço para elementos pessoais (cartas,
  música ao vivo, participação de filhos)
- Linkar internamente para o roteiro do casamento tradicional como contraste

### H2: Onde Fazer: Ao Ar Livre ou no Salão? (200-250 words)
- Reforçar cerimônia ao ar livre na área verde como cenário natural, luz do fim de tarde
- Citar pôr do sol como referência de horário (fonte C2/C4, WeatherSpark/Meteogram, já verificada)
  sem se aprofundar (isso é o post `cerimonia-por-do-sol-batatais`, linkar)
- Sobre chuva: só se for citar, 1-2 frases positivas sobre o salão envidraçado como alternativa
  já inclusa (regra de "plano B" de `diretrizes-blog.md`: nunca seção dedicada, nunca tenda)
- **Imagem**: inline 2, ambiente/decoração da cerimônia ao ar livre

### H2: Quanto Tempo Antes Começar a Organizar (200-250 words)
- Prazo sugerido: 6 meses de antecedência para uma renovação de porte médio; 12 meses se for um
  evento grande com festa completa depois
- Passos: definir data e local, contratar celebrante, decidir lista de convidados (geralmente
  menor e mais próxima que o casamento original), fechar fornecedores (buffet, decoração,
  fotografia)
- Reforçar: o Espaço Coral não exige número mínimo de convidados (fato cravado, aplica-se ao
  cluster mini-wedding)

### H2: Depois da Cerimônia: Festa ou Celebração Íntima? (150-200 words)
- Duas rotas comuns: seguir para uma recepção com jantar e festa, ou manter um encontro mais
  íntimo (coquetel, brinde)
- Reforçar estrutura do Espaço Coral que serve os dois formatos no mesmo espaço (salão + área
  verde), sem necessidade de trocar de local entre cerimônia e festa

### Optional FAQ Section (5 items)
1. O que é a renovação de votos de casamento?: cerimônia simbólica sem valor civil, para reafirmar
   o compromisso; sem estatística, resposta conceitual
2. Precisa de celebrante para renovar os votos?: não há exigência legal; o casal escolhe quem
   conduz (oficiante, religioso ou pessoa querida)
3. Com quanto tempo de antecedência organizar a renovação de votos?: sugestão de 6 meses (12 para
   eventos grandes), sem fonte externa, orientação prática do espaço
4. Dá para fazer a renovação de votos ao ar livre?: sim, recomendar junho a agosto como janela mais
   seca (fonte C1, climatologia Climatempo)
5. A renovação de votos tem valor legal?: não, é só celebração; sem efeito civil ou religioso
   formal, diferente do casamento

### Conclusion (100-150 words)
- Recapitular: sem burocracia, roteiro livre, melhor época jun-ago para cerimônia ao ar livre
- CTA: convidar para conhecer a estrutura via WhatsApp, sem mencionar preço

## Statistics to Include

| # | Statistic | Source | Year | Section |
|---|-----------|--------|------|---------|
| 1 | Mês mais seco do interior leste de SP é agosto (~19 mm), seguido de julho (~20 mm) e junho (~28 mm); janeiro é o mais chuvoso (~254 mm) | Climatempo, climatologia de Ribeirão Preto (fonte **C1**, já verificada em `docs/blog-fontes-verificadas.md`): https://www.climatempo.com.br/climatologia/530/ribeiraopreto-sp | normais 30 anos | H2: Quando Fazer a Renovação de Votos |
| 2 | Pôr do sol varia de ~17h36 (início de junho) a ~18h58 (meados de janeiro) | WeatherSpark, Average Weather in Ribeirão Preto (fonte **C2**, já verificada): https://weatherspark.com/y/30208/Average-Weather-in-Ribeir%C3%A3o-Preto-S%C3%A3o-Paulo-Brazil-Year-Round | evergreen | H2: Onde Fazer: Ao Ar Livre ou no Salão (citação leve, só ancorar o link para o post de pôr do sol) |

**Nota sobre fontes deste brief (restrição do sandbox, factcheck desligado nesta rodada):**
Busquei "renovação de votos" no WebSearch (permitido) para mapear concorrência e estrutura de
conteúdo, mas **não usei WebFetch** para verificar nenhuma estatística nova, porque está bloqueado
nesta execução (EGRESS_BLOCKED, confirmado no config da tarefa). Não existe, em
`docs/blog-fontes-verificadas.md`, nenhuma estatística de mercado específica de renovação de votos
no Brasil (nem havia sido buscada antes). Duas restrições adicionais se aplicam a este post:
1. As estatísticas de mercado de **casamento** já verificadas (IBGE 948,9 mil casamentos civis,
   The Knot 125 convidados/R$44 mil, SEBRAE R$40 bilhões) medem casamento civil/religioso, **não
   renovação de votos**; usá-las aqui seria um número real citado fora de contexto, o que a regra
   de fontes trata como erro grave. **Não usar.**
2. As únicas estatísticas aproveitáveis para este tema são as de **clima/pôr do sol** (C1, C2,
   C4), porque a recomendação de mês (jun-ago) e a lógica de horário são idênticas às de qualquer
   cerimônia ao ar livre no espaço, já tratadas em `casamento-ao-ar-livre-interior-sp-guia` e
   `cerimonia-por-do-sol-batatais`.
Recomendação para quem escrever o artigo: **não citar nenhuma estatística de mercado de renovação
de votos.** Tratar o dimensionamento do tema (popularidade, tendência) como observação qualitativa
do espaço ("temos recebido mais pedidos de...") só se isso for um fato real que o cliente confirme;
caso contrário, omitir e deixar nota de revisão humana. Nota registrada abaixo em "notes" do item.

## Citation Capsule Plan

| Section | Capsule Focus | Key Stat | Source |
|---------|--------------|----------|--------|
| H2: O Que é a Renovação de Votos | A renovação de votos é uma cerimônia simbólica, sem valor civil ou religioso formal, em que um casal já casado reafirma o compromisso em data e formato livremente escolhidos. | nenhuma (conceitual) | n/a |
| H2: Quando Fazer | No interior leste de SP, agosto é o mês mais seco do ano (~19 mm de chuva), seguido de julho e junho, a melhor janela para cerimônia de renovação de votos ao ar livre. | ~19 mm (agosto) | Climatempo, climatologia de Ribeirão Preto |
| H2: Precisa de Celebrante | Como a renovação de votos não tem exigência civil, o casal escolhe livremente quem conduz a cerimônia: oficiante contratado, líder religioso ou alguém querido. | nenhuma (conceitual) | n/a |

## Cover Image

| Option | Details |
|--------|---------|
| Photo cover | `/images/scenes/decoracao/cerimonia-ar-livre/espaco-coral-decoracao-cerimonia-ar-livre-05.webp` (fixado pelo item da fila). 0 usos em `data/images-usage.json` no momento deste brief |
| Inline 1 | `/images/scenes/decoracao/cerimonia-ar-livre/espaco-coral-decoracao-cerimonia-ar-livre-06.webp` (fixado pelo item da fila). 0 usos |
| Inline 2 | `/images/scenes/decoracao/cerimonia-ar-livre/espaco-coral-decoracao-cerimonia-ar-livre-07.webp` (fixado pelo item da fila). 0 usos |
| Generated SVG | Não aplicável: cover é sempre foto real do banco (`coverStrategy: real-photos-bank` no config; nunca gerar hero por IA, política de governança de imagens) |
| Dimensions | Usar via `next/image` com `sizes` adequado; não recortar para 1200x630 fixo, seguir o padrão dos demais posts do blog (`fill` + `sizes`) |
| Alt text | Cover: "Cerimônia de renovação de votos ao ar livre no Espaço Coral em Batatais SP". Inline 1: "Celebrante conduzindo cerimônia ao ar livre no Espaço Coral em Batatais SP". Inline 2: "Decoração de cerimônia ao ar livre para renovação de votos no Espaço Coral em Batatais SP" |

## Visual Element Plan

| # | Type | Data | Section |
|---|------|------|---------|
| 1 | Imagem real (banco `scenes/decoracao/cerimonia-ar-livre`) | Cerimônia ao ar livre montada | Introdução / H2: O Que é a Renovação de Votos |
| 2 | Imagem real (banco `scenes/decoracao/cerimonia-ar-livre`) | Celebrante/casal | H2: Precisa de Celebrante |
| 3 | Imagem real (banco `scenes/decoracao/cerimonia-ar-livre`) | Decoração do cenário ao ar livre | H2: Onde Fazer: Ao Ar Livre ou no Salão |

Sem gráficos: tema não tem dado proprietário nem estatística de mercado própria verificável (ver
"Statistics to Include"), e nenhum post do cluster mini-wedding usa gráfico até agora.

## Competitive Gaps to Exploit
1. Os resultados pesquisados (icasei, Arthur Caliman, Embracon, Zankyou, Lápis de Noiva, Eventos
   Indaiá, Guia de Casamento, Noivas Online, Nossas Bodas, Welcome Weddings, Robes JB, Pousada dos
   Sonhos, Festas.biz) são majoritariamente genéricos e nacionais, sem ângulo regional. Nenhum é do
   interior de SP nem menciona Batatais/Ribeirão Preto: oportunidade clara de ranquear localmente.
2. Nenhum concorrente pesquisado diferencia claramente "renovação de votos" de "mini wedding"
   como dois eventos com propósitos distintos (ver Information Gain acima); a maioria trata como
   sinônimos vagos de "celebração romântica pequena".
3. Vantagem de formato: o post pode linkar direto para um espaço real com estrutura completa
   (sala privativa, área verde, salão climatizado) em vez de tratar o tema de forma abstrata como
   os concorrentes pesquisados, que em geral discutem local em termos genéricos (casa, praia,
   buffet) sem oferecer um venue concreto da região.

## Internal Link Architecture
- **Link TO** (from this new post to existing pages):
  1. `/blog/mini-wedding-guia-completo` - anchor text: "guia completo de mini wedding" (hub do
     Pilar 5, obrigatório por ser o pilar do cluster)
  2. `/blog/casamento-ao-ar-livre-interior-sp-guia` - anchor text: "casamento ao ar livre no
     interior de SP" (hub do Pilar 2, contexto de cerimônia a céu aberto)
  3. `/blog/cerimonia-por-do-sol-batatais` - anchor text: "cerimônia ao pôr do sol em Batatais"
     (spoke irmão, aprofunda horário e golden hour, evita duplicar esse conteúdo aqui)
  4. `/estrutura` - anchor text: "estrutura do Espaço Coral" (página comercial institucional,
     obrigatória por regra transversal de linkagem)
  5. WhatsApp (16) 99129-4178 - anchor text: "fale com a gente no WhatsApp" (CTA de conversão,
     `https://wa.me/5516991294178?text=...`, sem preço)
- **Link FROM** (update these existing pages to link to this new post):
  1. `/blog/mini-wedding-guia-completo` - anchor text: "renovação de votos: como organizar a
     cerimônia" (hub deve linkar seus spokes; regra transversal de linkagem interna)
  2. `/blog/casamento-pequeno-vs-grande` - anchor text: "renovação de votos" (spoke do mesmo
     pilar, mencionado na tabela de formatos do mini wedding)
  3. `/blog/cerimonia-por-do-sol-batatais` - anchor text: "cerimônia de renovação de votos"
     (cross-link natural, mesmo assunto de horário/luz)
  4. `/blog/casamento-ao-ar-livre-interior-sp-guia` - anchor text: "renovação de votos ao ar
     livre" (hub do Pilar 2, linkagem cruzada de cluster)
  Observação: estes 4 links de retorno exigem editar posts publicados; fora do escopo deste brief
  (que cobre só o post novo), mas devem entrar no checklist de quem escrever/revisar o artigo.
- **Pillar connection**: Pilar 5 (Mini wedding e casamento intimista), hub
  `mini-wedding-guia-completo`
- **Cluster position**: Spoke

## E-E-A-T Signals to Include
- **Experience**: observação em primeira pessoa de Lin Zeri sobre coordenar renovações de votos
  no espaço (tom de casa, sem inventar caso específico não documentado; se não houver evento real
  para citar, manter no genérico "o que costumamos observar")
- **Expertise**: autoria de Lin Zeri, à frente do Espaço Coral (authorBio já padronizado nos
  outros posts do cluster)
- **Authority**: link para o hub do cluster e para os posts irmãos de cerimônia ao ar livre,
  reforçando profundidade editorial do Espaço Coral no tema de cerimônias
- **Trust**: nenhuma estatística inventada; nenhuma citação de mercado fora de contexto; CTA
  sempre para WhatsApp, nunca preço exibido

## Distribution Plan
- **Reddit**: sem subreddit brasileiro de nicho relevante identificado para casamentos/eventos
  regionais; não priorizar este canal para este post
- **YouTube**: não aplicável nesta fase (sem produção de vídeo institucional ativa)
- **LinkedIn**: baixa prioridade, público de RH/corporativo não é o alvo deste tema
- **Email**: se houver newsletter ativa no futuro, excerto: "Renovação de votos não tem
  burocracia: veja como organizar a cerimônia certa para reafirmar o compromisso." CTA para o post
- **Twitter/X**: não é canal ativo do negócio; não priorizar

---

## Notas para revisão humana (rotina automatizada, sem acesso a WebFetch)

1. Nenhuma estatística de mercado específica de "renovação de votos" no Brasil foi encontrada em
   `docs/blog-fontes-verificadas.md`, e não pude verificar uma nova via WebFetch nesta execução
   (bloqueado pelo sandbox). Se o time de conteúdo tiver acesso a WebFetch depois, vale buscar um
   dado real de popularidade/tendência do tema para enriquecer a introdução; até lá, o brief
   recomenda tratamento qualitativo, sem número.
2. Se o Espaço Coral já tiver realizado alguma renovação de votos real (documentada, com
   permissão dos clientes para citar), isso viraria o melhor case de E-E-A-T do post; hoje não há
   esse dado, então o brief usa apenas observação genérica em primeira pessoa. Confirmar com o
   cliente se existe algum evento assim para citar antes da escrita.
