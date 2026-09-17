# Estratégia de Blog: Espaço Coral (coraleventos.com.br)

> Documento estratégico do blog. Consumido por `/blog calendar`, `/blog brief`, `/blog write`
> e pelo blog-loop (reabastecimento automático da fila de produção).
> **Revisão 2 (17/09/2026)**, substitui a versão de 08/07/2026. Base: 36 posts publicados, fila
> `docs/blog-queue.json` esgotada, auditoria de 16/09 (`coraleventos.com.br-audit/`), volumes e
> SERPs ao vivo do DataForSEO (Google BR) coletados em 17/09/2026.
> Subordinado às regras editoriais de `docs/diretrizes-blog.md` e ao `CLAUDE.md`. Em caso de
> conflito entre oportunidade de SEO e diretriz editorial, a diretriz editorial vence.

---

## Sumário executivo

O blog tem 36 posts, mas parou em 15/07/2026: a fila da revisão 1 foi toda publicada e nada
a reabasteceu. Nesses dois meses, o único cluster que ganhou tração orgânica mensurável foi
**15 anos** (checklist em 5º lugar, roteiro entre 9º e 14º). Os 19 posts de casamento aparecem
para uma única keyword rastreável (posição 14). A revisão 2 muda o foco de "cobrir todos os clusters" para
**três frentes com prazo**: (1) corporativo sazonal antes do pico de novembro e dezembro,
(2) expansão de 15 anos antes do pico de janeiro, (3) o cluster de mini wedding, que segue sem
nenhum post e tem 5.400 buscas/mês com dificuldade 4. Os cases de `/eventos-realizados` passam a
ser a camada de E-E-A-T que liga os clusters.

**Correção de premissa da revisão 1:** o Espaço Coral **não** é o único espaço de Batatais com
domínio próprio. Villa Casuarina e Espaço Terracota estão em Batatais, têm site e lideram o local
pack. A diferenciação continua sendo profundidade editorial e experiência real, não exclusividade.

---

## Estado atual (17/09/2026)

| Indicador | Valor | Leitura |
|---|---|---|
| Posts publicados | 36 (último em 15/07/2026) | Cadência de 15/mês nunca foi atingida desde julho |
| Fila do blog-loop | 12 itens, todos `published`, nenhum `pending` | O loop não tem o que produzir; este documento é a fonte do reabastecimento |
| Keywords ranqueadas (DataForSEO, Brasil) | 11 | 10 do cluster 15 anos, 1 de tendências de casamento 2027 (pos. 14) |
| Local pack "espaço para casamento batatais" | 3º lugar (44 avaliações, nota 5,0) | Atrás de Villa Casuarina (324) e Espaço Terracota (164) |
| Orgânico "espaço para casamento batatais" | Home em 5º, `/eventos/casamentos` em 12º | Página comercial fora do top 10 |
| Cases publicados | 1 em andamento (`casamento-nathalia-e-lin`) | Novo ativo de E-E-A-T, ainda não linkado pelo blog |
| Posts por pilar (frontmatter) | casamento 19, 15-anos 9, corporativo 4, estrutura 3, local 1 | Mini wedding: 0 |

### Keywords ranqueadas (baseline para medição)

| Keyword | Volume/mês | Posição | URL |
|---|---|---|---|
| check list festa de 15 anos | 260 | 5 | checklist-festa-15-anos-planejamento |
| festa de 15 anos organização | 140 | 7 | checklist-festa-15-anos-planejamento |
| roteiro festa de 15 anos | 320 | 9 | festa-15-anos-roteiro-hora-a-hora |
| roteiro para festa de 15 anos | 320 | 11 | festa-15-anos-roteiro-hora-a-hora |
| roteiro de festa de 15 anos | 260 | 13 | festa-15-anos-roteiro-hora-a-hora |
| cronograma festa de 15 anos | 390 | 14 | checklist-festa-15-anos-planejamento |
| cronograma de festa de 15 anos | 210 | 14 | festa-15-anos-roteiro-hora-a-hora |
| paleta de cores casamento 2027 | 170 | 14 | tendencias-casamento-2027 |
| festas 15 | 260 | 28 | checklist-festa-15-anos-planejamento |
| lista de festa de 15 anos simples | 390 | 31 | checklist-festa-15-anos-planejamento |
| o que precisa para festa de 15 anos | 170 | 33 | checklist-festa-15-anos-planejamento |

Obs.: o DataForSEO não rastreia bem cauda longa local de baixo volume. A leitura real de casamento
depende do Search Console (ver "Medição": o Claude ainda não tem acesso a ele).

---

## Audiências

### Segmento 1: Noiva de Ribeirão Preto e Batatais (primário)
- **Perfil:** mulher em planejamento de casamento, padrão premium, 25 a 38 anos
- **Dores:** escolher espaço sem se arrepender, data certa para cerimônia ao ar livre, coordenar fornecedores separados do espaço, orçamento sem referências regionais, montar a lista de convidados
- **Busca no Google:** "espaço para casamento ribeirão preto", "casamento ao ar livre", "padrinhos de casamento", "lista de convidados casamento"
- **Pergunta à IA:** "qual o melhor mês para casar ao ar livre no interior de SP?", "melhores espaços de casamento perto de Ribeirão Preto"
- **Formato preferido:** guias profundos, comparativos honestos, checklists, casamentos reais
- **Estágio:** awareness até decisão

### Segmento 2: Casal de mini wedding e casamento intimista (novo, destacado do segmento 1)
- **Perfil:** casal que quer poucos convidados sem abrir mão de estrutura (sala da noiva, área verde, estacionamento com orientadores); inclui renovação de votos
- **Dores:** espaços grandes parecem vazios para 60 pessoas; opções de mini wedding concentradas na capital; medo de "casamento pequeno parecer improvisado"
- **Busca no Google:** "mini wedding" (5.400/mês), "casamento intimista" (3.600), "decoração mini wedding" (320), "renovação de votos" (1.900)
- **Formato preferido:** inspiração visual, guias de formato, decoração
- **Estágio:** awareness e consideração, volume estável o ano todo

### Segmento 3: Mãe da debutante (15 anos)
- **Perfil:** mãe (às vezes com a filha decidindo junto), famílias premium da região
- **Dores:** planejar uma festa grande sem experiência recente, roteiro da noite, orçamento, festa menor mas bonita
- **Busca no Google:** "festa de 15 anos", "roteiro festa de 15 anos", "festa de 15 anos simples" (5.400/mês, pico de 8.100 em janeiro), "vestido de 15 anos" (14.800)
- **Formato preferido:** checklists por etapas, roteiros, listas de ideias
- **Estágio:** awareness e consideração, **pico de busca em janeiro** em todo o cluster

### Segmento 4: RH e gestor de empresas da região
- **Perfil:** responsável por confraternizações, convenções e lançamentos em Ribeirão Preto, Franca e Batatais
- **Dores:** espaço com estrutura previsível (estacionamento, gerador, capacidade), datas de fim de ano disputadas, evento que não pareça "mais do mesmo"
- **Busca no Google:** "confraternização de fim de ano" (390/mês, pico de 1.900 em dezembro), "ideias para confraternização de fim de ano empresa" (pico de 1.300 em nov/dez), "convenção de vendas" (880, CPC R$ 7,24, pico em janeiro)
- **Formato preferido:** roteiros prontos, listas de ideias, argumentos para aprovar internamente
- **Estágio:** consideração e decisão, sazonalidade extrema (buscas de confraternização caem para 50/mês em junho)

---

## Pilares de conteúdo e arquitetura de clusters

Regras transversais de linkagem interna (mantidas da revisão 1, com um acréscimo):
todo spoke linka o pilar do cluster e 2 a 3 spokes irmãos; todo post linka pelo menos uma página
comercial (`/eventos/casamentos`, `/eventos/15-anos`, `/eventos/corporativo`, `/estrutura`,
`/cidades/ribeirao-preto`, `/cidades/franca`); CTA final sempre WhatsApp. **Novo:** quando existir
um case em `/eventos-realizados/` do mesmo tipo de evento, o post linka o case ("veja um casamento
real no espaço") e o case linka de volta 3 a 5 spokes. Pilares com 3.000 a 4.000 palavras,
spokes com 1.500 a 2.500.

Legenda de status: **Publicado**, **Novo** (produzir), **Refresh** (atualizar post existente),
**Bloqueado** (depende do cliente), **Descartado**.

### Pilar 1: Casamento em Batatais e região (maduro: consolidar, expandir pouco)

- **Hub:** `guia-casamento-batatais-2027`
- **Diagnóstico:** 19 posts e uma única keyword rastreada (tendências 2027, pos. 14). O cluster não precisa de volume, precisa de spokes com demanda nacional comprovada e de sinais de experiência real (case Nathália e Lin)
- **Potencial de citação em IA:** alto para queries com "Batatais"; médio para as nacionais

| # | Tópico | Template | Keyword alvo (vol./mês) | Status |
|---|---|---|---|---|
| P | Guia definitivo de casamento em Batatais | pillar-page | casamento em Batatais | Publicado. Linkar o case |
| 1 | Como escolher o espaço (interior de SP) | how-to-guide | como escolher espaço de casamento | Publicado. **Refresh em dezembro** (título com "2026") |
| 2 | Quando reservar o espaço | how-to-guide | quando reservar espaço casamento | Publicado. **Refresh em dezembro** (título com "2026") |
| 3 | Quanto custa casar em Batatais | data-research | orçamento casamento interior SP | Publicado. **Refresh em dezembro** (título com "2026") |
| 4 | Acabei de noivar: primeiros passos | listicle | primeiros passos casamento | Publicado |
| 5 | Fornecedores em Batatais e Ribeirão | roundup | fornecedores casamento Ribeirão Preto | Publicado. Linkar o case (créditos de fornecedores reais) |
| 6 | Roteiro hora a hora do casamento | tutorial | cronograma do casamento | Publicado |
| 7 | Casamento em Ribeirão Preto e região | how-to-guide | casamento em Ribeirão Preto | Publicado. **Refresh em dezembro** (título com "2026") |
| 8 | Calendário regional: datas para marcar | listicle | melhor data casamento interior SP | Publicado. **Refresh em dezembro** (título com "2026") |
| 9 | Sala da noiva | thought-leadership | sala da noiva | Publicado. Linkar o case (fotos reais da sala) |
| 10 | Padrinhos de casamento: quantos, como convidar, onde entram | how-to-guide | padrinhos de casamento (5.400) | **Novo, prioridade alta** |
| 11 | Lista de convidados: como montar e cortar sem briga | how-to-guide | lista de convidados casamento (880, KD 9) | **Novo.** Diferenciar de `capacidade-espaco-casamento-calculo` (aquele responde "quantos cabem", este responde "quem entra") |
| 12 | Cerimônia religiosa em Batatais + recepção | how-to-guide | casamento igreja Batatais | **Bloqueado** (validação das igrejas e basílica pelo cliente) |
| x | Logística de convidados Ribeirão a Batatais | | | Descartado (canibaliza o spoke 7) |
| x | Casar em Batatais ou em Ribeirão Preto | | | Descartado (canibaliza o spoke 7) |

### Pilar 2: Casamento ao ar livre no interior de SP (completo: congelar produção)

- **Hub:** `casamento-ao-ar-livre-interior-sp-guia`
- **Diagnóstico:** hub + 7 spokes publicados. A auditoria de 16/09 aponta canibalização entre hub, `casamento-ar-livre-batatais`, `casamento-no-campo-interior-sp`, `cerimonia-por-do-sol-batatais` e `golden-hour-fotografia-casamento-batatais`. **Nenhum post novo neste cluster até resolver isso**
- **Ação:** eleger o hub como pilar, diferenciar ângulos (Batatais = local; campo = estilo; pôr do sol = cerimônia; golden hour = fotografia), relinkar todos para o hub com âncora exata, depois rodar `/blog cannibalization`
- **Case:** o casamento de Nathália e Lin (08/08/2025, cerimônia ao ar livre ao pôr do sol) é prova real da tese "agosto é época seca". Linkar de `casamento-inverno-interior-sp`, `cerimonia-por-do-sol-batatais` e `casamento-ar-livre-batatais`
- **Freshness:** revisão do cluster em abril de 2027 (60 dias antes de junho)
- **Regra editorial crítica (mantida):** plano B / chuva não ganha seção nem post

| # | Tópico | Status |
|---|---|---|
| P | Guia de casamento ao ar livre no interior de SP | Publicado. Pilar da desambiguação |
| 1 | Casamento ao ar livre em Batatais | Publicado. **Refresh em dezembro** (título com "2026") + diferenciar ângulo |
| 2 | Cerimônia ao pôr do sol | Publicado. Linkar case |
| 3 | Casamento na primavera | Publicado |
| 4 | Decoração de outono | Publicado. Linkar case (paleta "clima de outono") |
| 5 | Casamento de dia x de noite | Publicado |
| 6 | Casamento de inverno no interior | Publicado. Linkar case |
| 7 | Casamento no campo | Publicado |
| 8 | Golden hour e fotografia | Publicado |

### Pilar 3: Festa de 15 anos (o cluster que ranqueia: dobrar a aposta)

- **Hub:** `festa-de-15-anos-guia-completo`
- **Diagnóstico:** responsável por 10 das 11 keywords ranqueadas. Todo o cluster tem pico de busca em **janeiro** (roteiro 480, checklist 390, "festa de 15 anos simples" 8.100). Tudo que for novo precisa estar indexado até o fim de novembro
- **Ângulo único (mantido):** único editorial premium de 15 anos da região; sala privativa, espaço kids, case autorizado da Mel
- **Restrição de fontes:** nenhuma estatística de casamento; só setor de eventos (Sebrae/ABEOC) ou experiência da casa

| # | Tópico | Template | Keyword alvo (vol./mês) | Status |
|---|---|---|---|---|
| P | Guia completo da festa de 15 anos | pillar-page | festa de 15 anos | Publicado |
| 1 | Checklist mês a mês | how-to-guide | checklist festa de 15 anos | Publicado (pos. 5). **Refresh até 15/12**: reforçar "o que precisa para festa de 15 anos" e "lista de festa de 15 anos simples" (hoje pos. 31 a 33) |
| 2 | 15 ideias modernas de tema | listicle | tema festa 15 anos | Publicado |
| 3 | Valsa: tradição e variações | how-to-guide | valsa de 15 anos | Publicado |
| 4 | Roteiro hora a hora | tutorial | roteiro festa de 15 anos (320) | Publicado (pos. 9 a 14). **Refresh até 15/12** para buscar top 5 antes do pico |
| 5 | Como escolher o espaço | how-to-guide | espaço festa 15 anos | Publicado |
| 6 | Quanto custa | data-research | quanto custa festa de 15 anos | Publicado |
| 7 | Tendências 2027 | news-analysis | tendências festa 15 anos | Publicado |
| 8 | Guia da mãe da debutante | thought-leadership | como organizar festa de 15 anos da filha | Publicado |
| 9 | Festa de 15 anos intimista: menos convidados, mesma estrutura | how-to-guide | festa de 15 anos simples (5.400) | **Novo, prioridade máxima.** Ângulo "simples" = enxuta e bem feita, nunca "barata". Regra "sem mínimo de convidados" confirmada para 15 anos em 17/09/2026 |
| 10 | Vestido de 15 anos pensado para a noite inteira (troca de vestido, valsa, sala privativa) | listicle | vestido de 15 anos (14.800) | **Novo, prioridade alta.** Ângulo de venue, não de moda: a troca de vestido acontece na sala privativa |
| 11 | Entrada da debutante e cerimonial (entrada, 15 velas, homenagens) | tutorial | entrada da debutante (70) + variantes | **Novo, prioridade média.** Validar volumes das variantes antes do brief |
| C | Case: 15 anos da Mel em `/eventos-realizados/` | case-study | | **Novo (fora do blog).** Autorizado. Linkado por todos os spokes do cluster |

### Pilar 4: Eventos corporativos na região (janela sazonal aberta agora)

- **Hub:** `eventos-corporativos-interior-sp-guia` (publicado em 15/07)
- **Diagnóstico:** a busca de confraternização vai de 50/mês em junho para 1.900 em dezembro. Para ranquear no pico, o conteúdo precisa estar publicado e indexado **até meados de outubro**. Na SERP "confraternização de fim de ano empresa ribeirão preto" há AI Overview, páginas programáticas rasas (aspiranteachef, oHub) e um concorrente de Batatais (Espaço Terracota, 8º) com artigo local. Nenhum guia editorial de verdade
- **Estrutura que pode ser prometida (mantida):** TVs, som ambiente e Wi-Fi inclusos; telão de LED e projetor são fornecedor do cliente
- **Gargalo de imagem:** `scenes/bancos-gerais` tem 2 fotos corporativas. Antes do lote corporativo, olhar `_references/Photos/` e, se não houver, pedir fotos ao cliente. Até lá, usar salão e ambientes vazios

| # | Tópico | Template | Keyword alvo (vol./mês) | Status |
|---|---|---|---|---|
| P | Guia de eventos corporativos no interior de SP | pillar-page | evento corporativo | Publicado |
| 1 | Confraternização de fim de ano: como escolher o espaço | how-to-guide | confraternização de fim de ano (390, pico 1.900) | Publicado. **Refresh urgente, até 30/09**: é o post mais curto do cluster, com a keyword de maior pico |
| 2 | Formatura empresarial: roteiro | tutorial | formatura empresarial | Publicado |
| 3 | Lançamento de produto | how-to-guide | evento de lançamento de produto | Publicado |
| 4 | Ideias para a confraternização de fim de ano da empresa | listicle | ideias para confraternização de fim de ano empresa (260, pico 1.300) | **Novo, prioridade máxima, publicar até 10/10.** Intenção distinta do spoke 1 (formato e programação, não escolha de local) |
| 5 | Convenção de vendas: como organizar | how-to-guide | convenção de vendas (880, CPC R$ 7,24) | **Novo, prioridade alta, publicar até 15/11** (pico em janeiro, maior valor comercial do cluster) |
| 6 | Convenção, treinamento ou confraternização: formatos | comparison | tipos de eventos corporativos (90) | **Novo, prioridade baixa** |
| 7 | Evento corporativo ao ar livre: quando faz sentido | comparison | evento corporativo ao ar livre | **Novo, publicar em março de 2027** (mirar eventos de junho a agosto; não recomendar céu aberto de novembro a fevereiro) |
| x | Calendário corporativo da região | | | Descartado (janela de agosto perdida; conteúdo absorvido pelos spokes 4 e 5) |

### Pilar 5: Mini wedding e casamento intimista (criar agora, zero posts)

- **Hub a criar:** `mini-wedding-guia-completo`
- **Diagnóstico:** item de prioridade alta da revisão 1 que nunca foi produzido. "mini wedding" tem 5.400 buscas/mês e KD 4, estável o ano todo. A SERP "mini wedding interior de são paulo" é dominada por espaços da capital (Casa Quena, Casinha Quintal) e listas genéricas (Lápis de Noiva, Lejour, PHD Eventos). Nenhum resultado da região de Ribeirão Preto
- **Ângulo único:** mini wedding com estrutura completa e sem mínimo de convidados (fato cravado em 08/07/2026); o interior como alternativa aos espaços pequenos da capital
- **Atenção a canibalização:** `casamento-pequeno-vs-grande` responde "qual tamanho escolher"; `capacidade-espaco-casamento-calculo` responde "quantos cabem". O hub responde "o que é e como fazer". Rodar `/blog cannibalization` depois do hub

| # | Tópico | Template | Keyword alvo (vol./mês) | Status |
|---|---|---|---|---|
| P | Mini wedding: guia completo | pillar-page | mini wedding (5.400, KD 4) | **Novo, prioridade máxima, publicar até 15/10** |
| 1 | Casamento pequeno vs grande | comparison | casamento pequeno | Publicado. Relinkar para o hub |
| 2 | Capacidade: quantos convidados cabem | data-research | capacidade espaço casamento | Publicado. Relinkar para o hub |
| 3 | Casamento intimista no interior de SP | thought-leadership | casamento intimista (3.600) | **Novo, prioridade alta** |
| 4 | Decoração de mini wedding | listicle | decoração mini wedding (320) | **Novo, prioridade média.** Fotos de `decoracao-mesas` e `decoracao-flores` |
| 5 | Renovação de votos: como organizar a cerimônia | how-to-guide | renovação de votos (1.900) | **Novo, prioridade média.** Cerimônia ao ar livre, recomendar junho a agosto |
| 6 | Da capital para o interior: mini wedding com convidados de fora | thought-leadership | casamento no interior convidados capital | **Novo, prioridade baixa** (volume não medido) |

### Pilar 6 (proposto): Celebrações em família (bloqueado, depende do cliente)

`business-context.md` cita "famílias: festas de aniversário" como público secundário, mas nenhum
artigo pode prometer um tipo de evento que o espaço não quer vender. Há demanda real:

| Tópico candidato | Keyword (vol./mês) | Observação |
|---|---|---|
| Festa de bodas de prata | bodas de prata (18.100) | Intenção mista (significado, presentes); spoke deve mirar "como fazer a festa" |
| Festa de bodas de ouro | bodas de ouro festa (170) | Casa com o spoke de renovação de votos |
| Festa de 50 anos | festa de 50 anos (1.000) | |
| Festa de 60 anos | festa de 60 anos (590) | |
| Festa de noivado | festa de noivado (1.300) | Porta de entrada para o funil de casamento |

**Condição para liberar:** cliente confirmar que atende e quer esse público. Liberado, o pilar
sustenta 5 a 6 posts e é o caminho para chegar à cadência de 15/mês sem canibalizar os pilares 1 e 2.

### Temas avaliados e não recomendados agora

| Tema | Volume | Motivo |
|---|---|---|
| Chá revelação | 33.100 | Perfil de festa caseira e pequena, distante do posicionamento premium; só com confirmação do cliente |
| Festa de formatura (escolar/universitária) | 1.900, pico em dezembro | Não documentado que o espaço atende; perguntar ao cliente |
| Casamento em dezembro | 320, pico de 1.000 em dezembro | Mês de chuva pela diretriz; só faria sentido com cerimônia planejada no salão desde o início, ângulo que precisa de aval do cliente |

---

## Camada de E-E-A-T: eventos realizados

Os cases em `/eventos-realizados/[slug]` não são posts de blog, mas são o sinal de experiência que
nenhum portal consegue copiar. Regras para o blog:

1. Todo post de um cluster com case publicado linka o case pelo menos uma vez, no ponto em que o texto descreve algo que o case mostra (sala da noiva, cerimônia ao pôr do sol, fornecedores)
2. O case linka de volta de 3 a 5 spokes relevantes
3. Ordem de produção de cases: Nathália e Lin (em andamento) → 15 anos da Mel (autorizado) → um evento corporativo (também resolve a falta de fotos corporativas)
4. A auditoria de 16/09 pede página de autor com `Person` para "Lin Zeri". O case confirma o vínculo real do autor com o espaço; a página de autor deve linkar o case

---

## Posicionamento competitivo

### Quem compete pelo quê (atualizado com SERPs de 17/09/2026)

| Competidor | Força | Fraqueza explorável |
|---|---|---|
| Villa Casuarina (Batatais) | 1º no local pack, 324 avaliações, blog e SEO por cidade, agenda 2027 já divulgada | Acervo antigo e genérico; sem conteúdo de clima, logística ou casos reais detalhados |
| Espaço Terracota (Batatais) | 2º no local pack, 164 avaliações; artigo "Onde fazer confraternizações em Ribeirão Preto" em 8º; aparece via Casamentos.com.br | Artigos programáticos curtos, sem profundidade |
| Belaluma (Batatais) | Desde 2015, aparece em 10º com Instagram | Sem site próprio |
| Casamentos.com.br, Lápis de Noiva | Dominam SERPs comerciais e listas "espaços no interior de SP" (Lápis de Noiva atualizou a lista em 22/08/2026) | Boilerplate sem especificidade regional; o Coral não está listado em nenhum dos dois |
| Espaços de mini wedding da capital (Casa Quena, Casinha Quintal) | Dominam "mini wedding" | Zero presença no interior norte do estado |
| Buffets de Ribeirão (Black Tie, Âncora) | Presença em vídeo e Instagram nas buscas corporativas | Vendem buffet, não espaço; sem guia editorial |

**Tese de diferenciação (mantida e reforçada):** vencer por especificidade que só quem opera o
espaço tem. Clima e calendário da região, casos reais com fornecedores creditados, liberdade de
fornecedores, estrutura concreta (sala privativa, salão envidraçado climatizado, espaço kids). Nos
artigos, **nunca citar concorrentes nominalmente** (diretriz de 08/07).

### Mapa de citação em IA

| Query | Revisão 1 (08/07) | Revisão 2 (17/09) | Vácuo? |
|---|---|---|---|
| melhor espaço para casamento em Ribeirão Preto | Villa Casuarina, Villa Campesina, Casamentos.com.br | Não verificado | Coral ausente na última checagem |
| espaço de eventos Batatais | Só agregadores | Não verificado | Vácuo editorial |
| quando casar ao ar livre no interior de SP | Lejour e outras regiões | Não verificado | Vácuo regional |
| confraternização de fim de ano empresa ribeirão preto | (não medida) | AI Overview presente no Google; fontes não capturadas | Provável vácuo editorial |
| mini wedding interior de SP | (não medida) | Sem AI Overview; orgânico só com a capital | **Vácuo regional** |

ChatGPT e Perplexity não foram consultados nesta revisão (sem acesso direto). Refazer a checagem
manual das 5 queries nas três plataformas antes de 15/10 e registrar aqui.

---

## Estratégia de citação em IA (GEO)

### On-site (aplicar em todo post)

- Primeiro parágrafo de cada H2 com resposta direta de 40 a 60 palavras (citation capsule)
- 60 a 70% dos H2 formulados como pergunta, nunca acima disso (diretriz de 09/07)
- FAQ quando houver perguntas reais do público. Os posts geram FAQPage a partir do frontmatter `faq[]`; isso ajuda a clareza de entidade, mas **não gera rich result no Google** e não deve ser tratado como tática de SERP
- **Não usar HowTo** como tática (removido dos rich results do Google). Schema padrão: BlogPosting + Person + Organization + BreadcrumbList
- Clareza de entidade: sempre "Espaço Coral", "Batatais, SP", "região de Ribeirão Preto". Por causa da ambiguidade de marca (Espaço Coral de Psicologia, Espaço Coral em Rio das Ostras), preferir "Espaço Coral, em Batatais" na primeira menção
- Nomes de cidade no title e na meta description dos posts regionais
- Link para case real quando existir (sinal de experiência que a IA pode citar)

### Off-site (adaptado a negócio local)

| Canal | Papel | Ação |
|---|---|---|
| Google Business Profile | Maior alavanca local (44 avaliações, 5,0; 3º no local pack) | Post semanal no GBP apontando para um artigo; pedir avaliação após cada evento. Meta: fechar a distância para Terracota (164) |
| Casamentos.com.br, iCasei, Lápis de Noiva | A IA e a SERP de Batatais já citam esses diretórios; o Coral não está em nenhum | Criar perfis completos. Pedir inclusão na lista "espaços no interior de SP" do Lápis de Noiva com o ângulo de mini wedding |
| Instagram (@espaco.coral) | Prova visual e menções de marca | Reel por pilar e por case publicado. Usar "Espaço Coral Batatais" no nome do perfil |
| Fornecedores creditados nos cases | Backlinks regionais reais | Cada fornecedor citado no case recebe o link e o convite para repostar ou linkar |
| Imprensa regional | Autoridade local | Pauta com o case do casamento dos donos no próprio espaço |

---

## Padrões de qualidade de conteúdo

| Métrica | Alvo | Verificação |
|---|---|---|
| Score `/blog analyze` | 80+ antes de publicar | blog-loop (audit) |
| Factcheck | Toda estatística citada verificada na URL | blog-loop (factcheck bloqueante) |
| Conformidade com `diretrizes-blog.md` | 100% | Revisão em todo post |
| Sem preços, CTA WhatsApp | Obrigatório | Revisão em todo post |
| Sem travessão (em dash) | Obrigatório | Revisão em todo post |
| Links internos | 5+ por post (pilar, spokes irmãos, página comercial, case quando houver) | Auditoria de links |
| Imagens | 2+ reais por post, menos usadas em `data/images-usage.json`; conferir o pixel (nomes de arquivo não são confiáveis) | Workflow de imagens do CLAUDE.md |
| Fontes | Tier 1-3; nada de content mill; nada de estatística de casamento em 15 anos | factcheck + revisão |
| Schema | BlogPosting + Person + Organization + BreadcrumbList; FAQPage opcional | blog-seo-check |
| Extensão | 1.500+ spokes, 3.000+ pilares | Contagem |

---

## Velocidade de conteúdo

- **Meta de cadência:** 15 posts/mês (decisão de 08/07/2026, mantida)
- **Realidade:** zero posts desde 15/07. O backlog validado desta revisão tem **13 posts novos + 9 refreshes** (tabela abaixo). Isso cobre cerca de um mês de cadência cheia. Para sustentar 15/mês no trimestre é preciso liberar o Pilar 6 com o cliente; completar a cota com temas que canibalizam os pilares 1 e 2 prejudica mais do que ajuda
- **Freshness:** posts sazonais atualizados 60 dias antes do pico (15 anos em novembro/dezembro, ar livre em abril, confraternização em setembro)
- **Títulos com ano:** trocar "2026" por "2027" em dezembro, junto com revisão real e `lastUpdated`

### Backlog priorizado (ordem de produção)

| Ordem | Slug sugerido | Tipo | Pilar | Prazo |
|---|---|---|---|---|
| 1 | `confraternizacao-fim-ano-espaco-empresa` | Refresh | corporativo | 30/09 |
| 2 | `ideias-confraternizacao-fim-de-ano-empresa` | Novo | corporativo | 10/10 |
| 3 | `mini-wedding-guia-completo` | Novo (pilar) | mini-wedding | 15/10 |
| 4 | Linkagem do case Nathália e Lin em 7 posts + desambiguação do Pilar 2 | Refresh | casamento / ar-livre | 15/10 |
| 5 | `casamento-intimista-interior-sp` | Novo | mini-wedding | 25/10 |
| 6 | `padrinhos-de-casamento-guia` | Novo | casamento | 31/10 |
| 7 | `festa-15-anos-intimista` | Novo | 15-anos | 10/11 |
| 8 | `vestido-15-anos-festa` | Novo | 15-anos | 15/11 |
| 9 | `convencao-de-vendas-como-organizar` | Novo | corporativo | 15/11 |
| 10 | `lista-de-convidados-casamento` | Novo | casamento | 20/11 |
| 11 | `renovacao-de-votos-cerimonia` | Novo | mini-wedding | 25/11 |
| 12 | `entrada-debutante-cerimonial` | Novo | 15-anos | 30/11 |
| 13 | `decoracao-mini-wedding` | Novo | mini-wedding | 30/11 |
| 14 | `checklist-festa-15-anos-planejamento` e `festa-15-anos-roteiro-hora-a-hora` | Refresh | 15-anos | 15/12 |
| 15 | 6 posts com "2026" no title ou metaTitle (casamento-ribeirao-preto-regiao, casamento-ar-livre-batatais, quanto-custa-casar-batatais, quando-reservar-espaco-casamento, como-escolher-espaco-casamento-interior-sp, calendario-casamento-regiao-ribeirao-datas) | Refresh | casamento / ar-livre | 20/12 |
| 16 | `tipos-eventos-corporativos` | Novo | corporativo | Quando houver folga |
| 17 | `mini-wedding-convidados-capital-interior` | Novo | mini-wedding | Quando houver folga |

---

## Roadmap de 90 dias (17/09 a 17/12/2026)

### Mês 1 (até 17/10): janela corporativa + hub de mini wedding
- [ ] Reabastecer `docs/blog-queue.json` com os itens 1 a 13 do backlog (novos como `pending`; refreshes tratados à parte para o loop não regenerar posts publicados)
- [ ] Refresh do post de confraternização e publicação do spoke de ideias até 10/10
- [ ] Publicar `mini-wedding-guia-completo` e relinkar `casamento-pequeno-vs-grande` e `capacidade-espaco-casamento-calculo`
- [ ] Resolver a canibalização do Pilar 2 (auditoria, item 11)
- [ ] Linkar o case Nathália e Lin em 7 posts
- [ ] Checar as 5 queries do mapa de IA no ChatGPT, Perplexity e Google
- [ ] Criar perfis no Casamentos.com.br, iCasei e Lápis de Noiva

### Mês 2 (até 17/11): 15 anos antes do pico de janeiro + convenção
- [ ] Publicar os spokes 9 e 10 de 15 anos e o de convenção de vendas
- [ ] Publicar casamento intimista e padrinhos de casamento
- [ ] Produzir o case dos 15 anos da Mel e linkar o cluster inteiro
- [ ] Levar ao cliente as perguntas do Pilar 6 e dos temas não recomendados
- [ ] Levantar fotos corporativas (`_references/Photos/` primeiro, depois cliente)

### Mês 3 (até 17/12): refresh e medição
- [ ] Refresh de checklist e roteiro de 15 anos, com `lastUpdated` novo
- [ ] Trocar "2026" por "2027" nos títulos, com revisão real do conteúdo
- [ ] Se o Pilar 6 for liberado, produzir hub + 2 spokes
- [ ] Rodar `/blog audit` e `/blog cannibalization` (foco: mini wedding vs pequeno-vs-grande; confraternização vs ideias; checklist vs roteiro de 15 anos)
- [ ] Comparar keywords ranqueadas com o baseline de 17/09 e ajustar prioridades

---

## Medição

**Pré-requisito:** o Claude não tem acesso ao Search Console. O arquivo global
`~/.config/claude-seo/google-api.json` tem só um `default_property` de outro projeto e aponta para
credenciais que não existem. Criar uma conta de serviço, dar a ela acesso à propriedade
`coraleventos.com.br` no Search Console e rodar `/blog google` passando `--property` explícito, para
que `/blog google` e `/blog decay` leiam impressões e cliques reais.

**SEO tradicional:** Search Console (impressões e cliques de `/blog`, posição por cluster);
DataForSEO ranked keywords mensal comparado ao baseline de 17/09 (11 keywords). Metas para 17/12:
- 15 anos: checklist e roteiro no top 5; pelo menos 25 keywords ranqueadas no cluster
- Mini wedding: hub ranqueado (top 30) para "mini wedding" e top 10 para "mini wedding interior de SP"
- Corporativo: spoke de ideias no top 20 para "ideias para confraternização de fim de ano empresa" no pico de dezembro
- Local: `/eventos/casamentos` no top 10 para "espaço para casamento batatais"

**Citação em IA:** planilha mensal das 5 queries por plataforma; tráfego de referência de IA no
GA4 (origem contendo chatgpt, perplexity, claude, copilot, gemini).

**Negócio:** conversas de WhatsApp iniciadas a partir de posts (UTM nos CTAs do blog); pedidos de
orçamento de confraternização entre outubro e dezembro com origem no blog; eventos fechados que
citaram o blog no primeiro contato.

---

## Perguntas para o cliente (bloqueiam itens desta estratégia)

1. O espaço atende e quer vender **bodas, aniversários de 50/60 anos e festas de noivado**? (libera o Pilar 6)
2. Atende **chá revelação** e **formaturas escolares ou universitárias**?
3. Aceita um artigo sobre **casamento em dezembro com cerimônia no salão** desde o planejamento?
4. Há fotos de **eventos corporativos** que possam entrar no banco?
5. (Pendente desde julho) Fatos das igrejas e da basílica de Batatais para o post de cerimônia religiosa

~~"Sem número mínimo de convidados" vale também para festa de 15 anos?~~ Confirmado pelo cliente em 17/09/2026, ver `diretrizes-blog.md`.

---

## Restrições editoriais herdadas (resumo, fonte: diretrizes-blog.md e CLAUDE.md)

1. Melhores meses ao ar livre: junho, julho, agosto; depois maio, setembro, outubro; novembro a fevereiro é chuva, nunca recomendar para céu aberto
2. Plano B de chuva: sem seção dedicada, sem post dedicado, sem tenda; quando inevitável (FAQ), 1 a 2 frases positivas sobre o salão envidraçado
3. O Espaço Coral é o local, não buffet; capacidade 320 sentados; sala privativa; área verde
4. Nunca exibir preços; CTA sempre WhatsApp (16) 99129-4178
5. Nunca usar travessão (em dash) em textos
6. Nunca citar concorrentes nominalmente nos artigos
7. Estatística de casamento nunca em artigo de 15 anos; toda citação verificada e registrada em `blog-fontes-verificadas.md`
8. Fatos novos do cliente entram datados em `diretrizes-blog.md`, não aqui

## Próximos passos

1. Levar as 6 perguntas acima ao cliente (a 1 decide se a cadência de 15/mês é sustentável)
2. `/blog calendar` para transformar o backlog priorizado em calendário de outubro a dezembro e reabastecer a fila
3. `/blog brief ideias-confraternizacao-fim-de-ano-empresa` e `/blog rewrite confraternizacao-fim-ano-espaco-empresa` (prazo mais curto)
4. `/blog brief mini-wedding-guia-completo`
5. Dar ao Claude acesso ao Search Console de `coraleventos.com.br` (ver "Medição")
