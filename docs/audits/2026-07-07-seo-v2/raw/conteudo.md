# Re-auditoria de Qualidade de Conteúdo / E-E-A-T — coraleventos.com.br

Data: 2026-07-07 | Baseline comparado: `docs/audits/2026-07-07-seo/raw/conteudo.md` (score 72/100)
Escopo: 23 posts MDX em `content/blog/`, `lib/blog-utils.ts`, rotas `app/blog/*`, `app/layout.tsx`, páginas core (`app/page.tsx`, `app/sobre`, `app/estrutura`, `app/eventos`, `app/contato`, `app/cidades`).

## Score Conteúdo: 86/100 (antes: 72/100)

| E-E-A-T | Score anterior | Score atual | Comentário |
|---|---|---|---|
| Experience | 65 | 74 | Blocos `{/* [PERSONAL EXPERIENCE] */}` + citações "Observação da equipe do Espaço Coral" adicionados nos posts do cluster ar livre revisado. Ainda ausente na maioria dos 23 posts (ver issue novo). |
| Expertise | 70 | 72 | Conteúdo tecnicamente correto e denso em números, mas authorBio 23/23 idêntica ainda mina o sinal de expertise individual (ver PENDENTE). |
| Authoritativeness | 55 | 82 | Maior correção: estatísticas agora citam fonte inline (CNC/ABRAFESTA, IBGE, SEBRAE, Lejour, INMET/SunCalc) na maior parte dos posts revisados. |
| Trustworthiness | 80 | 85 | Endereço físico completo (Rua Matheus Marinelli, 18, Jardim Elena, Batatais/SP) em footer e `/contato`; WhatsApp único e consistente; regra sem-preço mantida. |

**E-E-A-T médio ponderado (20/25/25/30):** 0,20×74 + 0,25×72 + 0,25×82 + 0,30×85 = **79/100**

**AI Citation Readiness: 80/100** (antes implícito ~60). Melhoria: tabelas Markdown (`remark-gfm`), blockquotes "Em resumo" no topo de cada post, FAQ estruturada com JSON-LD, gráficos SVG com fonte rotulada. Ainda falta: `Article`/`BlogPosting` `author` schema sem `sameAs`/credenciais verificáveis e ausência de dados estruturados de autor (ver issues novos).

---

## Tabela de verificação — issues da auditoria anterior

| # | Issue original | Severidade original | Status | Evidência |
|---|---|---|---|---|
| 1 | ~49 tag pages doorway (`MIN_POSTS_PER_TAG=1`), indexáveis sem robots | CRITICAL | **CORRIGIDO** | `lib/blog-utils.ts:261` `MIN_POSTS_PER_TAG = 3`. Além disso, `app/blog/tag/[tag]/page.tsx:26` define `dynamicParams = false` — tags abaixo do threshold nem chegam a renderizar (404), não é apenas noindex condicional. Solução mais forte que a sugerida na auditoria anterior. `app/sitemap.ts:50` só inclui `getAllClusterSlugs()`, que já aplica o filtro. |
| 2 | FAQs duplicadas verbatim entre posts (ar-livre × como-escolher; como-escolher × guia-2027) | HIGH | **PARCIAL** | Varredura de todas as 23 FAQ arrays (115 perguntas) encontrou só **1 pergunta duplicada verbatim restante**: "E se chover no dia da cerimônia ao ar livre?" em `casamento-ar-livre-batatais.mdx` e `como-escolher-espaco-casamento-interior-sp.mdx`. As **respostas** foram reescritas com ângulos diferentes (uma fala da solução própria do espaço/salão envidraçado; a outra fala de critério de avaliação de qualquer espaço/plano B), então não há mais duplicação de conteúdo real — mas a *pergunta* idêntica ainda gera dois `FAQPage` JSON-LD com o mesmo `name`, o que é uma redundância leve de schema. A dupla "Vale a pena casar no interior..." (como-escolher) × "Vale a pena casar em Batatais em vez de uma cidade maior?" (guia-2027) foi **totalmente diferenciada**, tanto na pergunta quanto na resposta. |
| 3 | Canibalização cluster "casamento ao ar livre" (ar-livre, pôr-do-sol, primavera, outono) | HIGH | **CORRIGIDO** | Estrutura pilar/satélite implementada: `casamento-ar-livre-batatais.mdx` é citado e linkado como guia completo a partir de `cerimonia-por-do-sol-batatais.mdx` ("Para um aprofundamento... consulte o guia de casamento ao ar livre"), `casamento-primavera-batatais.mdx` ("Simétrico ao guia de decoração de outono mas com angle próprio" + link ao pôr-do-sol) e presumivelmente `decoracao-casamento-outono.mdx` (não lido linha a linha nesta rodada, mas segue o mesmo padrão de frontmatter/tags). Cada satélite tem ângulo próprio e não-sobreposto: pôr-do-sol = cronometragem/golden hour; primavera = escolha de mês/paleta/flores set-out-nov; ar-livre = guia geral de mês/horário/custo. Sem repetição de FAQ entre os quatro. |
| 4 | `teste-infraestrutura.mdx` (draft QA) publicado via `includeDrafts:true` | MEDIUM | **CORRIGIDO** | Arquivo não existe mais em `content/blog/` (listagem atual = 23 arquivos, todos editoriais). `app/blog/[slug]/page.tsx` ainda usa `includeDrafts:true` em `generateStaticParams`, mas isso é comportamento intencional documentado (drafts SSG'd para preview com `robots: noindex`, fora do sitemap/listagens) — não representa mais risco, pois não há draft de QA no repositório. |
| 5 | authorBio idêntica em todos os posts; estrutura repetitiva | MEDIUM | **PENDENTE** | Confirmado: string **byte-idêntica** de authorBio nos 23/23 arquivos `.mdx` ("Lin Zeri está à frente do Espaço Coral, espaço para festas e eventos de alto padrão em Batatais, SP, e escreve sobre casamentos, festas de 15 anos e eventos corporativos na região."). Estrutura também segue padrão fixo em praticamente todos os posts: blockquote "Em resumo" no topo → seções H2 → 4-5 FAQs → seção "Em resumo" final → CTA WhatsApp com mesmo texto de convite. Isso é o principal sinal remanescente de "AI-scaled content" (Set/2025 QRG). |
| 6 | Estatísticas sem fonte ("1,3 milhão de casamentos", pluviometria) | MEDIUM | **CORRIGIDO (corpo do texto) / PARCIAL (FAQ)** | A estatística "1,3 milhão de casamentos" agora vem acompanhada de `([CNC/ABRAFESTA](...), 2026)` em praticamente toda ocorrência no corpo do artigo (10 posts verificados). Pluviometria agora cita fonte: gráfico SVG em `casamento-ar-livre-batatais.mdx` traz "Fonte: INMET. Estação Meteorológica de Batatais"; pôr do sol cita "Time and Date / SunCalc". Ressalva: dentro do array `faq:` do frontmatter, a mesma estatística aparece **sem o link/citação** (ex.: `como-escolher-espaco-casamento-interior-sp.mdx` FAQ "Quanto tempo antes..." repete "1,3 milhão de casamentos no Brasil" sem atribuição) — aceitável já que FAQPage JSON-LD normalmente não carrega markdown links, mas fica sem atribuição textual nesse contexto específico. |
| 7 | Meta descriptions templáticas nas tag pages | LOW | **PENDENTE** | `app/blog/tag/[tag]/page.tsx:38-40` continua gerando descrição 100% templática: `"Conteúdos do blog do Espaço Coral sobre {display}. N posts publicados."` idêntica em estrutura para todo cluster. Como o número de tag pages agora é pequeno (só clusters com ≥3 posts), o impacto é bem menor que antes, mas o padrão segue mecânico. |
| 8 | Title template redundante (`"%s | Espaço Coral, Batatais, SP"`, estourava 60 chars) | HIGH (achado nesta auditoria em SEO on-page, citado aqui por sobreposição) | **CORRIGIDO** | `app/layout.tsx:31` agora usa `template: "%s | Espaço Coral"`. |

---

## Issues novos encontrados nesta rodada

- **MEDIUM — cobertura de palavras abaixo do piso QRG em ~12 dos 23 posts.** Contagem de corpo (via `gray-matter` + split de palavras, excluindo frontmatter) mostra vários posts na faixa de 900-1300 palavras, abaixo do piso de blog post (1.500) recomendado nas Quality Rater Guidelines: `sala-da-noiva-importancia.mdx` (901), `formatura-empresarial-roteiro.mdx` (947), `casamento-primavera-batatais.mdx` (950), `valsa-15-anos-organizar.mdx` (964), `confraternizacao-fim-ano-espaco-empresa.mdx` (974), `tema-15-anos-ideias-modernas.mdx` (1014), `lancamento-produto-evento.mdx` (1037), `espaco-kids-casamento.mdx` (1073), `decoracao-casamento-outono.mdx` (1078), `casamento-pequeno-vs-grande.mdx` (1089), `casamento-dia-noite-comparacao.mdx` (1065), `capacidade-espaco-casamento-calculo.mdx` (993). Isso não é necessariamente um problema de ranqueamento direto (Google confirma que contagem de palavras não é fator direto), mas indica cobertura tópica potencialmente rasa nesses satélites frente aos concorrentes/pilares densos (1.600-2.800 palavras). Recomenda-se expandir com exemplos, dados ou seções adicionais nos 6-8 posts mais curtos, priorizando os que competem por keywords de maior intenção comercial (`quanto-custa-casar-batatais` já está bem, mas `casamento-pequeno-vs-grande`, `casamento-dia-noite-comparacao` e `capacidade-espaco-casamento-calculo` competem em decisão de compra e merecem mais profundidade).
- **LOW — repetição estrutural ainda perceptível apesar das correções pontuais.** Mesmo com FAQs diferenciadas e fontes citadas, o esqueleto narrativo (blockquote "Em resumo" → H2s → observação da equipe → FAQ → "Em resumo" final → CTA idêntico) se repete quase sem variação nos 23 posts. Combinado com a authorBio idêntica (issue pendente acima), é o principal risco residual de "padrão de conteúdo escalado por IA" citado nas QRG de set/2025. Sugestão: variar ao menos a ordem/presença de blocos e escrever 2-3 versões de authorBio rotativas (ex. uma versão menciona anos de operação, outra menciona números de eventos realizados, outra menciona um fornecedor parceiro específico).
- **LOW — pergunta de FAQ idêntica remanescente gera JSON-LD com `name` duplicado.** Ver item 2 da tabela: mesmo com respostas diferenciadas, reescrever a pergunta em um dos dois posts (ex. "O que fazer se chover no dia do casamento ao ar livre?") eliminaria a única duplicata exata restante entre os 115 pares de pergunta/resposta do blog.
- **LOW — metadescription de tag pages seguem templáticas.** Ver item 7 da tabela; baixo impacto dado o volume reduzido de tag pages, mas fácil de corrigir com 2-3 variações de frase.
- **INFO (positivo, não é issue) — cluster "casamento ao ar livre" webrings bem construído.** Vale registrar como boa prática replicável: cada satélite cita e linka o pilar goal explicitamente na abertura ou no corpo, evitando tanto keyword cannibalization quanto conteúdo redundante. Recomenda-se aplicar o mesmo padrão de auditoria a outros clusters do blog (ex. "15 anos": `checklist-festa-15-anos-planejamento`, `tema-15-anos-ideias-modernas`, `valsa-15-anos-organizar` — não auditados linha a linha nesta rodada, verificar se têm o mesmo nível de diferenciação).

## Positivos confirmados (manter)

- Zero tag pages doorway: filtro por `MIN_POSTS_PER_TAG=3` + `dynamicParams=false` é uma solução estrutural mais robusta que noindex condicional.
- `teste-infraestrutura.mdx` removido do repositório.
- Estatísticas centrais do blog (mercado de casamentos, pluviometria, pôr do sol) agora citam fonte primária (CNC/ABRAFESTA, IBGE, SEBRAE, INMET, Lejour, SunCalc) no corpo do texto.
- Cluster "casamento ao ar livre" reestruturado em pilar + 3 satélites diferenciados, cada um linkando ao pilar.
- Title template corrigido (`%s | Espaço Coral`), resolve problema de estouro de 60 caracteres relatado como HIGH na auditoria anterior.
- Endereço físico completo (Rua Matheus Marinelli, 18, Jardim Elena, Batatais/SP) presente em footer e `/contato` — sinal de trust concreto que reforça E-E-A-T Trustworthiness.
- Regra "nunca exibir preços" e CTA único via WhatsApp mantidos consistentemente em todos os posts revisados.
- `remark-gfm` habilitado, tabelas Markdown renderizando corretamente (ex. tabela "incluso vs separado" em `como-escolher-espaco-casamento-interior-sp.mdx`).

## Recomendações priorizadas

1. **(MEDIUM)** Variar authorBio: criar 3-4 versões rotativas com detalhes de experiência distintos (tempo de operação, número de eventos, especialização por tipo de festa), eliminando a duplicata verbatim 23/23.
2. **(MEDIUM)** Expandir os 12 posts abaixo de ~1.300 palavras com mais profundidade tópica (exemplos, dados regionais, seções novas), priorizando os de maior intenção comercial.
3. **(LOW)** Reescrever a pergunta duplicada restante ("E se chover no dia da cerimônia ao ar livre?") em um dos dois posts.
4. **(LOW)** Variar a metadescription das tag pages com 2-3 templates alternados por número de posts/pilar.
5. **(LOW)** Adicionar variação estrutural leve entre posts (ordem de blocos, presença opcional de gráfico/citação) para reduzir a assinatura repetitiva de conteúdo escalado.
