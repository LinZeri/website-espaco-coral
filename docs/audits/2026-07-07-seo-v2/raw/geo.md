# GEO / AI Search Readiness — Re-auditoria 07/07/2026 (v2)

**Score AI Readiness: 80/100** (baseline 07/07: 77/100)

Dimensões (0-100): Citabilidade 88 (=), Estrutura 90 (=), Multi-modal 58 (+3), Autoridade/marca 52 (+2), Acessibilidade técnica 93 (+1).

Scores por plataforma (estimativa, sem mudança relevante de metodologia): Google AIO ~79, Perplexity ~81, ChatGPT ~66, Bing Copilot ~56.

Metodologia: WebFetch ao vivo em coraleventos.com.br (robots.txt, llms.txt, home, /sobre, /cidades, /eventos/casamentos, post de blog), leitura do codigo-fonte pos-commit 077e052 (app/robots.ts, lib/schema.ts, lib/seo-config.ts, app/sitemap.ts, content/blog/*.mdx) e comparacao linha a linha com docs/audits/2026-07-07-seo/raw/geo.md (score 77).

---

## O que mudou desde o baseline (commit 077e052)

| Item do baseline | Status | Evidencia |
|---|---|---|
| BAIXA - teste-infraestrutura.mdx (draft) acessivel em producao | CORRIGIDO | Arquivo removido do repo; nao existe mais em content/blog/*.mdx |
| Coordenadas GEO do schema (~1,3 km de erro) | CORRIGIDO | lib/seo-config.ts agora usa -20.8809322, -47.5929521 (nao estava na lista de issues do GEO, mas afeta desambiguacao de entidade local) |
| ALTA - corroboracao externa de marca quase inexistente | PENDENTE | lib/seo-config.ts SOCIAL ainda so tem instagram + facebook; sameAs em organization()/venue() (lib/schema.ts:72,105) inalterado. Busca ao vivo no Bing por "Espaco Coral Batatais eventos" nao retorna o dominio nem mencoes em YouTube/portais/imprensa, identico ao baseline |
| MEDIA - intros de secao com framing antes da resposta direta | PENDENTE | quanto-custa-casar-batatais.mdx e capacidade-espaco-casamento-calculo.mdx nao foram tocados no commit 077e052; intro de ambos ainda abre com contextualizacao (~60-80 palavras) antes do bloco "Em resumo". /sobre tambem confirma o mesmo padrao de framing-primeiro ao vivo |
| MEDIA - autor do blog sem entidade Person com url/sameAs | PENDENTE (parcial) | lib/schema.ts:537-543 gera Person com name + worksFor, mas continua sem url nem sameAs. Nao houve alteracao neste trecho no commit |
| BAIXA - robots.ts nao referencia /llms.txt | PENDENTE | app/robots.ts inalterado, sem sitemap/comentario apontando para /llms.txt |
| BAIXA - graficos SVG sem tabela HTML equivalente | PENDENTE (mitigado) | O SVG de quanto-custa-casar-batatais.mdx usa elementos text nativos para os rotulos da legenda (ex. "Buffet: 35%"), o que os torna texto real no DOM/HTML (extraivel por parsers de LLM), mas os dados ainda duplicam o texto corrido em vez de uma table semantica dedicada, nao e um img opaco, porem nao e a melhor pratica |

## Issues novos encontrados nesta rodada

| Severidade | Issue | Detalhe |
|---|---|---|
| MEDIA (novo) | public/llms.txt desatualizado em relacao a nova arquitetura de paginas | O commit 077e052 criou o hub /cidades (com /cidades/ribeirao-preto e /cidades/franca) e o referenciou no sitemap e no rodape do site, mas a secao "Paginas principais" do llms.txt (linhas 40-50, live e local) nao lista /cidades. Como o llms.txt se declara fonte canonica ("em caso de divergencia... priorizar... este llms.txt"), um LLM que o consulte nao descobre a pagina de cidades atendidas nem pode cita-la corretamente |
| BAIXA (novo) | llms.txt sem data de ultima atualizacao / versao | Confirmado ao vivo: o arquivo nao expoe lastUpdated/versao, dificultando para um agente de IA avaliar frescor do conteudo canonico ao decidir se deve re-consultar. Nao e regressao, mas ficou mais evidente agora que o conteudo institucional mudou (cidades) e o arquivo de referencia nao acompanhou |
| BAIXA (novo, positivo a formalizar) | FAQs duplicadas verbatim entre posts foram reescritas com angulo proprio (como-escolher-espaco-casamento-interior-sp.mdx, guia-casamento-batatais-2027.mdx) | Reduz risco de um LLM tratar duas paginas como conteudo espelhado e preferir citar so uma; nao estava nas issues originais de GEO, mas beneficia diretamente a dimensao Autoridade/Citabilidade por diversidade de resposta. Sem acao pendente, apenas registrar o ganho |
| INFO | Headers de seguranca novos (next.config.mjs: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) | Confirmado que nenhuma dessas regras bloqueia ou distingue crawlers de IA, nao ha impacto negativo em GPTBot/ClaudeBot/PerplexityBot. Item apenas para constar na checagem tecnica |

---

## Checagens especificas pedidas

### 1. robots.txt ao vivo (coraleventos.com.br/robots.txt)

User-agent: * / Allow: / / Disallow: /lp/, /proposta/, /api/, /_next/ / Sitemap: coraleventos.com.br/sitemap.xml / Host: coraleventos.com.br

Nao ha regra dedicada por user-agent, a diretiva * cobre GPTBot, OAI-SearchBot, ClaudeBot, Claude-Web, PerplexityBot, Google-Extended, Bingbot e CCBot igualmente. Nenhum bot de IA (nem os "opcionais" CCBot/anthropic-ai) esta bloqueado. Identico ao baseline, nenhuma regressao.

### 2. llms.txt ao vivo (coraleventos.com.br/llms.txt)

Presente, retorna 200, conteudo identico ao arquivo local public/llms.txt (sem drift entre repo e producao). Estrutura permanece exemplar (identificacao, NAP, modelo de operacao, areas atendidas, redes sociais, notas para IA). Gap novo: nao reflete a criacao do hub /cidades (ver issue MEDIA acima) nem tem timestamp de versao.

### 3. Citabilidade passage-level (paginas core + 3-4 posts)

- Home: sem blocos "Em resumo", estrutura em cards tematicos ("Elegancia", "Natureza", "Conforto"), descritivo, pouco extraivel isoladamente, mas nao e o padrao dominante do baseline (FAQ/blog carregam essa funcao).
- /sobre: framing emocional antes do dado factual nas 3 secoes analisadas ("Quem somos", "Localizacao", "Nosso compromisso"), mesmo padrao do baseline nos posts, agora confirmado tambem em pagina institucional.
- /eventos/casamentos: FAQ visivel com 8 perguntas diretas e especificas ("Qual e a capacidade...", "Como funciona a sala privativa..."), bem estruturada para extracao, ponto forte confirmado, sem mudanca.
- /cidades (novo hub): intro dispersa a resposta direta (distancia/estrutura) em vez de compacta-la nas primeiras 40-60 palavras; sem bloco FAQ ou "Em resumo" nesta pagina nova, a mesma lacuna dos posts antigos foi reproduzida numa pagina recem-criada.
- quanto-custa-casar-batatais.mdx / capacidade-espaco-casamento-calculo.mdx: ambos mantem bloco "Em resumo" logo apos a intro e FAQ schema sincronizado com o texto visivel, estrutura forte, mas a intro em si ainda seria mais citavel com o numero na primeira frase.

### 4. Sinais de entidade (NAP + sameAs)

NAP consistente em todas as amostras verificadas: "(16) 99129-4178" e "Rua Matheus Marinelli, 18, Jardim Elena, Batatais, SP, CEP 14300-111" aparecem de forma identica na home, /sobre, lib/seo-config.ts (fonte unica) e llms.txt, sem divergencia. sameAs em organization()/venue() continua limitado a Instagram + Facebook; Google Maps e usado so como hasMap, nao como sameAs; nao ha Perfil de Empresa no Google (GBP) referenciado via sameAs nem entidade Wikipedia/Wikidata, gargalo de autoridade permanece o mesmo do baseline (dimensao em 52/100, ainda o ponto mais fraco).

### 5. Acessibilidade sem JS (SSR)

Confirmado via WebFetch (leitura de HTML bruto, sem execucao de JS) em home, /sobre e /cidades: headings, paragrafos, telefone, endereco, FAQs e links de rodape aparecem integralmente no HTML servido, nenhuma dependencia de hidratacao client-side para o conteudo textual principal. Consistente com SSG declarado no CLAUDE.md e com o score de Acessibilidade tecnica (93/100, +1 vs. baseline por nao haver mais draft acessivel via URL direta).

---

## Top 5 acoes priorizadas (ordem de impacto)

1. Atualizar public/llms.txt com o hub /cidades e as paginas de cidade em "Paginas principais"; adicionar um campo de data/versao no topo do arquivo. Esforco: baixo (15 min).
2. Enriquecer sameAs em lib/seo-config.ts / lib/schema.ts com a URL do Perfil de Empresa no Google e, se possivel, Wikidata; buscar 1 video institucional no YouTube (tour + depoimento) com VideoObject no schema, maior alavanca de corroboracao externa (correlacao ~0,74 com citacao em IA). Esforco: medio/alto (depende de terceiros).
3. Reordenar intros de quanto-custa-casar-batatais.mdx, capacidade-espaco-casamento-calculo.mdx e da nova pagina /cidades: numero/resposta na primeira frase (ate 25 palavras), framing depois. Esforco: baixo-medio (5-7 arquivos).
4. Adicionar url/sameAs ao Person da autora em lib/schema.ts (linhas ~537-543), mesmo sem pagina de autor dedicada, um perfil de Instagram/LinkedIn pessoal ja resolve. Esforco: baixo.
5. Referenciar /llms.txt em app/robots.ts (comentario ou campo customizado) e considerar table HTML paralela ao SVG de orcamento, ja que os dados de legenda hoje so existem como text dentro do SVG. Esforco: baixo.
