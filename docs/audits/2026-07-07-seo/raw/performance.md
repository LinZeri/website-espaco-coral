# Performance — Score real (Lighthouse desktop via DataForSEO): 99/100

Métricas live (desktop): FCP 512ms, LCP 665ms, SI 1.32s, TBT 4.5ms, CLS 0.003, TTI 1.98s, peso 1.02MB, SRT 7ms. Accessibility 87, Best Practices 100, SEO 100. Mobile não medido (estimativa do agente: 78-85; provável 90+ dado o desktop).

Análise estática do agente (build .next/):
- LCP image correta: priority + sizes=100vw, fetchPriority=high, preload no head.
- Code-splitting: next/dynamic nas seções below-fold; chunk da home 4.6KB gz; CSS 7.6KB gz.
- Fontes self-hosted next/font, display swap, fallback com métricas ajustadas (CLS ~0).
- GTM afterInteractive (não bloqueante).
- Scroll animations conformes ao CLAUDE.md (useRef + passive + rAF).
- DOM ~430 elementos.

Issues:
- MEDIUM: shared JS ~233KB gz em toda página (fd9d1056 53.6KB gz maior vendor chunk). Rodar @next/bundle-analyzer; optimizePackageImports para lucide-react.
- MEDIUM: sem preload explícito de .woff2 no HTML prerenderizado local (confirmar em produção); Playfair Display com 3 pesos × 2 estilos = 6 arquivos, reduzir aos usados.
- MEDIUM (rastreamento, não perf): Meta Pixel 1442151020219648 NÃO encontrado no código (grep fbq/id vazio). Se não estiver no container GTM, é lacuna de rastreamento de conversão exigida pelo CLAUDE.md. Confirmar no GTM.
- LOW: srcset até 3840w para fonte 1280px (ruído de markup); polyfills com noModule (não baixado por browsers modernos); sem headers() custom (Vercel default para /_next/static é immutable).
