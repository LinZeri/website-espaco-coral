# Plano de ação — re-auditoria SEO v2 (07/07/2026)

Priorizado por impacto. Critical: corrigir imediatamente. High: até 1 semana. Medium: até 1 mês. Low: backlog.

## Critical

1. **Corrigir o overflow da home mobile que esconde o CTA de WhatsApp e o menu.**
   Sintoma: layout de ~708px num viewport de 390px só na home; elementos `position: fixed` (botão WhatsApp flutuante e hambúrguer) ficam fora da área visível. Candidatos: carrossel de depoimentos e carrossel do hero, sem contenção de overflow.
   Como atacar: reproduzir com Playwright preset iPhone 13 (script de referência na conversa da auditoria), inspecionar `scrollWidth` por seção para isolar o componente, aplicar contenção (`overflow-x: clip` no wrapper da seção ou `max-width: 100vw` no track do carrossel). Validar em dispositivo físico depois do fix.
   Impacto: conversão direta; o canal único de contato fica invisível na página de maior tráfego em mobile.

## High (até 1 semana)

2. **Campanha permanente de reviews no GBP.** 41 avaliações vs 316/164/135 dos três do local pack. Processo sugerido: pedido padrão pós-evento via WhatsApp com link direto de avaliação (`https://g.page/r/...`), meta de 8 a 12 novas avaliações/mês. É a alavanca nº 1 para entrar no pack.
3. **Trocar a categoria primária do GBP.** De "Function room facility" para categoria de casamento/eventos (avaliar "Local para eventos" vs "Local para casamento"; testar a que os 3 concorrentes do pack usam). Manter a atual como secundária.
4. **Cadastrar o negócio no Casamentos.com.br** (e avaliar iCasei/Zankyou). Rankeia página 1 para as duas queries de maior valor; gera citação NAP, backlink e leads.
5. **Variar a authorBio dos 23 posts** (3 a 5 variações por tema, com experiência específica no assunto). Último sinal forte de AI-scaled content.
6. **Atualizar `reviewCount` no schema: 40 → 41** (valor live do GBP em 08/07) com rotina de sincronização mensal, e **remover o `aggregateRating` reciclado das 3 entidades `Service`**, mantendo-o apenas no LocalBusiness.
7. **Aumentar tap target do hambúrguer para 44×44px** (hoje 28×28px).

## Medium (até 1 mês)

8. **Atualizar `public/llms.txt`**: incluir hub `/cidades` e páginas de cidade, adicionar data/versão.
9. **Expandir os posts comerciais abaixo de 1.500 palavras** (12 de 23 posts entre 900 e 1300). Começar pelos de decisão: `casamento-pequeno-vs-grande`, `capacidade-espaco-casamento-calculo`, `quando-reservar-espaco-casamento`.
10. **Publicar conteúdo regional espelhando a tática do Terracota**: artigo pilar "espaço de eventos perto de Ribeirão Preto" linkando `/cidades/ribeirao-preto` (que ainda não rankeia no top 20).
11. **Corrigir o overflow horizontal da home desktop** (scrollWidth 2712 vs 1920); provavelmente a mesma causa raiz do item 1.
12. **Implementar IndexNow** (chave em `public/` + ping pós-publish). Ganho para Bing e Copilot, relevante para citação por IA.
13. **Reescrever intros answer-first** em `quanto-custa-casar-batatais` e `capacidade-espaco-casamento-calculo` (resposta direta no primeiro parágrafo).
14. **Confirmar o Meta Pixel no container GTM** (`1442151020219648` não aparece no código; se não estiver no GTM, a mensuração de campanhas está quebrada).
15. **Configurar credenciais Google** (`google-api.json` com API key mínima) para medir CWV mobile real (PSI/CrUX) e habilitar GSC/GA4 na próxima auditoria.
16. **Ampliar `sameAs` da Organization**: URL do GBP/Maps, YouTube se criado, e perfis em portais conforme item 4.

## Low (backlog)

17. Importar `SITE_URL` de `lib/seo-config.ts` em `app/layout.tsx`, `app/sitemap.ts` e `app/robots.ts` (hoje triplicado).
18. Adicionar `url`/`sameAs` ao `Person` do autor do blog.
19. Adicionar `image[]` ao `ImageGallery` de `/galeria` e `width`/`height` ao `BlogPosting.image`.
20. Encurtar o title de `/cidades` (70 → até 60 caracteres).
21. `lastmod` real (data de edição de conteúdo) para páginas estáticas e tags; remover `priority`/`changefreq` e a diretiva `Host:` do robots.txt.
22. Reformular a última pergunta de FAQ com `name` duplicado entre posts; adicionar fontes no array `faq:` do frontmatter.
23. Remover `tagUrl()` morto ou usá-lo nos links de pilar; limpar TODO residual em `lib/seo-config.ts`.
24. H1 da home: manter o wordmark visual, mas avaliar H1 textual descritivo com keyword local (ou `sr-only` complementar).
25. Investigar Accessibility 87 do Lighthouse (contraste/aria) junto com o item 7.

## O que NÃO fazer

- Não reintroduzir tag pages com threshold menor que 3 posts.
- Não adicionar CSP às pressas; quando for fazer, começar em Report-Only por causa do GTM.
- Não exibir preços em nenhuma página nova criada por este plano; CTA sempre WhatsApp (16) 99129-4178.

## Métricas de acompanhamento (30 dias)

- Entrada no local pack de "espaço para casamento em batatais" (hoje: fora; 3 concorrentes com 4.8).
- Reviews GBP: 41 → 65+.
- Primeiros backlinks no índice (hoje: zero) via portais de casamento.
- `/cidades/ribeirao-preto` aparecendo no top 50 da query regional.
- Conversões WhatsApp mobile antes/depois do fix do item 1 (GTM).
