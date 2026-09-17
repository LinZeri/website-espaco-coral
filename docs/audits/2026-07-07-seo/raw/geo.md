# GEO / AI Readiness — Score 77/100

Dimensões: Citabilidade 88, Estrutura 90, Multi-modal 55, Autoridade/marca 50 (gargalo), Acessibilidade técnica 92.

Fortes: robots.txt libera todos os bots de IA; public/llms.txt existe e é exemplar; blocos "Em resumo" extraíveis; H2 em pergunta; fontes inline (ABRAFESTA, IBGE); FAQ schema sincronizado com bloco visível; entidade desambiguada via @graph com @id estáveis, geo, areaServed.

Issues:
- ALTA: corroboração externa de marca quase inexistente (Bing não retorna a marca; sem YouTube, portais de casamento, imprensa; sameAs só Instagram+Facebook, falta GBP)
- MÉDIA: intros de seção com 180-250 palavras, resposta direta vem depois do framing (quanto-custa-casar-batatais.mdx, capacidade-espaco-casamento-calculo.mdx) → inverter: número na 1ª frase
- MÉDIA: autor do blog (Lin Zeri) sem entidade Person com url/sameAs (lib/schema.ts ~509-515)
- BAIXA: content/blog/teste-infraestrutura.mdx (draft) acessível via URL direta, deletar
- BAIXA: robots.ts não referencia /llms.txt
- BAIXA: gráficos SVG sem tabela HTML equivalente para extração por LLM

Scores por plataforma (estimativa): Google AIO ~78, Perplexity ~80, ChatGPT ~65, Bing Copilot ~55.

Top 5: (1) YouTube tour+depoimentos com VideoObject; (2) 3-5 portais de casamento + imprensa local; (3) reordenar intros dos posts; (4) tabela HTML paralela aos SVGs; (5) enriquecer sameAs com GBP + Person da autora.
