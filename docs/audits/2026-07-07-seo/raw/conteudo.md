# Conteúdo — Score 72/100 | On-Page — Score 76/100 | E-E-A-T 68/100

E-E-A-T: Experience 65 (sem casos reais nos posts), Expertise 70 (bio genérica repetida 23/23), Authoritativeness 55 (estatísticas sem fonte), Trustworthiness 80.

## Issues

- CRITICAL: ~49 páginas /blog/tag/* com 1 único post, indexáveis (app/blog/tag/[tag]/page.tsx sem robots). 60 tags únicas, 49 com 1 post. Padrão doorway/thin content. Correção: noindex,follow em tags com <3 posts (manter: Batatais 22, casamento 17, interior de SP 5, Ribeirão Preto 4, decoração 4, estrutura/15 anos/evento corporativo 3) ou eliminar tags livres e manter só pillars.
- HIGH: FAQs duplicadas verbatim entre posts (casamento-ar-livre-batatais × como-escolher-espaco-casamento-interior-sp: "E se chover..."; como-escolher × guia-casamento-batatais-2027: "Vale a pena casar no interior..."). Vira FAQPage JSON-LD duplicado. Reescrever com ângulo próprio.
- HIGH: Title template redundante (app/layout.tsx:31 "%s | Espaço Coral, Batatais, SP") duplica "Batatais, SP" e estoura 60 chars (ex. /eventos com 83 chars). Trocar para "%s | Espaço Coral".
- HIGH: Canibalização cluster "casamento ao ar livre": 4 posts sobrepostos (casamento-ar-livre-batatais, cerimonia-por-do-sol-batatais, casamento-primavera-batatais, decoracao-casamento-outono). Definir casamento-ar-livre-batatais como pilar, satélites diferenciados linkando pro pilar.
- MEDIUM: teste-infraestrutura.mdx (draft de QA) publicado via includeDrafts:true em app/blog/[slug]/page.tsx:38 — apagar.
- MEDIUM: estrutura repetitiva em escala (mesma authorBio 23/23, mesmos 4-5 FAQs, mesmo CTA) — sinal AI-scaled content. Variar bio + 1 detalhe de experiência real por post.
- MEDIUM: estatísticas repetidas sem fonte ("1,3 milhão de casamentos 2026" em 3 posts; pôr do sol; pluviometria). Adicionar atribuição (IBGE, ABEOC, INMET).
- LOW: meta descriptions templáticas nas tag pages.

## Positivos (não mexer)
- /cidades/* NÃO são doorways: dados únicos (distância, rodovia, hospedagem, FAQ próprio), ~500-600 palavras.
- Schema amplo e correto; posts densos com números concretos; regra sem-preço respeitada; sem em dash; CTAs WhatsApp consistentes.

## Quick wins
1. noindex condicional nas tag pages de 1 post
2. apagar teste-infraestrutura.mdx
3. title template "%s | Espaço Coral"
4. reescrever 2 FAQs duplicadas
5. pilar + satélites no cluster ar livre
