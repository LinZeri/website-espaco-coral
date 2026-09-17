# Relatório de Performance — coraleventos.com.br (07/07/2026)

**Método:** Lighthouse 13.4 via DataForSEO (desktop, throttling simulado) nas 7 páginas representativas + medições diretas de TTFB/peso + análise de bundle local (`@next/bundle-analyzer`). A API pública do PageSpeed Insights sem key retornou 429 para todas as chamadas (mobile e desktop), então não há medição mobile de lab nesta rodada; ver "Limitações".

## Resultado por página (Lighthouse desktop, produção)

| Página | Score | LCP | FCP | CLS | TBT | Peso total | TTFB real |
|---|---|---|---|---|---|---|---|
| `/` | 99 | 0,66s | 0,51s | 0,003 | 5ms | 1,02MB | 197ms |
| `/eventos/casamentos` | 100 | 0,58s | 0,33s | 0,001 | 47ms | 0,91MB | 84ms |
| `/estrutura` | 95 | 1,56s | 0,27s | 0,001 | 35ms | 1,16MB | 62ms |
| `/galeria` | 95 | 1,47s | 0,27s | 0,001 | 5ms | 1,20MB | 69ms |
| `/blog` | 100 | 0,66s | 0,30s | 0,001 | 24ms | 1,10MB | 95ms |
| `/blog/guia-casamento-batatais-2027` | 99 | 0,90s | 0,29s | 0,001 | 32ms | 0,86MB | 87ms |
| `/cidades/ribeirao-preto` | 100 | 0,60s | 0,31s | 0,001 | 53ms | 0,90MB | 75ms |

**Leitura:** site inteiro entre 95 e 100. CLS praticamente zero em todas as páginas, TBT desprezível, TTFB de edge (62-197ms). As duas páginas de 95 (`/estrutura` e `/galeria`) têm LCP ~1,5s puxado por imagem, não por JS.

## Checagens de infraestrutura (produção)

- **Fontes:** preload automático de `.woff2` presente no HTML live (3 links `as="font"`) — o gap visto no build local não existe em produção.
- **Cache:** `/_next/static/*` servido com `public, max-age=31536000, immutable`; HTML com `max-age=0, must-revalidate`. Correto.
- **HTML:** 64-159KB por página (blog maior por conteúdo + JSON-LD, aceitável).
- **Imagens via next/image:** derivativos leves (hero 147KB @1920, scenes 53-116KB). AVIF/WebP habilitados.

## Bundle JS

- Shared First Load JS: **87,3KB gzip** — composição via bundle-analyzer:
  - `fd9d1056` 52,4KB gz = **react-dom** (framework, irredutível)
  - `framework` 43,8KB + `main` 33,4KB + `117` 31KB = runtime Next/React
- Nenhuma lib de terceiros pesada no bundle (sem carrossel, animação ou UI kit externos); única lib cross-cutting é lucide-react, já tree-shaken.
- **Conclusão: o JS do site está no piso do que o Next 14 permite.** Não há gordura a cortar sem trocar de framework.

## Otimizações aplicadas nesta rodada

1. **Playfair Display reduzido de 6 variantes para 1** (`app/layout.tsx`): todo uso de `font-display` no site é peso 400 normal, sem itálico (verificado por grep em 84 ocorrências). CSS final agora declara só `normal-400` (antes 400/500/700 × normal/itálico). Menos bytes de CSS e zero risco de download de variante não usada.
2. **`priority` nas 4 primeiras fotos do grid da galeria** (`components/sections/gallery-grid.tsx`): a primeira fileira é visível logo abaixo do hero mas era 100% lazy — causa provável do LCP de 1,47s em `/galeria`.
3. **`experimental.optimizePackageImports: ["lucide-react"]`** (`next.config.mjs`): sem efeito no bundle de produção (ícones já eram tree-shaken), mantido pelo ganho de velocidade de build/dev.
4. **`@next/bundle-analyzer`** instalado como devDependency, ativado por `ANALYZE=true` (ferramenta permanente de diagnóstico).

Shared JS antes/depois: 87,3KB → 87,3KB (esperado: o gargalo nunca foi JS de aplicação).

## Recomendações restantes (não aplicadas)

| Prioridade | Item | Racional |
|---|---|---|
| Média | Medir mobile com dados reais: configurar Google API key (PSI/CrUX) ou aguardar dados de campo no Search Console | PSI sem key está 429; o lab desktop indica que mobile deve ficar 85-95, mas não há número real |
| Média | Investigar LCP de `/estrutura` (1,56s) com um trace local (`npx lighthouse --view`) | Imagem do PageHero tem priority e pesa só 116KB; o valor pode ser variância de lab (single run), confirmar antes de otimizar |
| Baixa | CSP em Report-Only | Único header de segurança ausente; exige nonce/unsafe-inline por causa do GTM |
| Baixa | GTM/Meta Pixel: auditar tags dentro do container | Third-parties são os únicos scripts além do framework; impacto hoje é baixo (TBT ≤53ms) |

## Limitações

- Sem medição mobile de lab (PSI 429 sem key; DataForSEO Lighthouse só oferece desktop). O perfil do site (CLS ~0, TBT ~0, imagens leves) indica que a diferença mobile virá só da rede simulada.
- Lighthouse de single run tem variância; os LCPs de 1,4-1,6s merecem confirmação em segunda medição pós-deploy.

## Adendo 08/07 — Medição mobile do usuário + correções (commit e8b9e3a, live)

O usuário mediu a home no Lighthouse mobile do Chrome: Performance 72, A11y 87. O 72 estava contaminado por extensões do Chrome (aviso do próprio Lighthouse; ~1.400ms dos 1.460ms de TBT vinham de chrome-extension://...web-client-content-script.js). Achados legítimos corrigidos e verificados em produção:

- Logo do header (elemento LCP na medição) era lazy → priority (live: sem lazy, fetchpriority=high)
- quality=60 nas imagens da home (galeria, philosophy, events, testimonials) → "Improve image delivery" (~66KiB); peso total da home caiu de 1,02MB para 0,97MB
- Stars com role="img" (ARIA proibido em div resolvido)
- Dots do carrossel: área de toque 24px (eram 8×8) e cor bg-muted-foreground (contraste ≥3:1)
- Scroll-reveal (TechnologySection): cor inicial var(--muted-foreground) 4,7:1 (era #e4e4e7, 1,1:1)
- Links dourados pequenos → text-gold-dark (testimonials + dropdown do header)
- Menu hambúrguer mobile: 44×44px

Regressão pós-deploy (Lighthouse desktop, home): Performance 99, **Accessibility 87 → 96**, Best Practices 100, SEO 100.

Não aplicado por decisão do usuário: browserslist moderno (11KiB de polyfills). Pendente de re-medição mobile pelo usuário em aba anônima (sem extensões).

## Adendo 08/07 (2) — Lighthouse mobile limpo (aba anônima) + rodada final

Re-medição do usuário em aba anônima (sem extensões): **Performance 94, Accessibility 96, Best Practices 100, SEO 100** — confirma que o 72 anterior era contaminação de extensão do Chrome (~1.400ms de TBT eram do adblock). Dado novo: o Legacy JS de terceiros veio de `connect.facebook.net`, ou seja, **o Meta Pixel está dentro do container GTM** (fecha a pendência da auditoria original).

Ajustes finais dos itens que sobraram (commits 5ba52cd + f2d10b7, live):
- `quality={60}` na imagem central do hero (era a de 70,5KiB com economia de 46,6KiB apontada) e nas laterais do hero + technology-section
- Contraste dos ~12 botões dourados: texto branco (2,2:1) → `text-foreground` #12100c (8,6:1); hover passa a `bg-gold-light`
- Endereço no CtaSection: `text-white/30` → `text-white/60`
- Novo token `--gold-text` (#8a6534, ≥4,5:1) para texto pequeno dourado sobre fundo claro (link de avaliações, item do dropdown do header)

Regressão pós-deploy (Lighthouse desktop): Performance **100**, A11y 96, BP 100, SEO 100; peso da home caiu de 967KB para 856KB, LCP 0,56s.

Continua não acionável: polyfills first-party (11KiB, recusado pelo usuário) e o cache TTL/legacy JS de GTM+Meta Pixel (scripts de terceiros).
