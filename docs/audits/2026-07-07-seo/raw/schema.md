# Schema — Score 76/100

Implementação centralizada (lib/schema.ts, @graph com @id cross-linking), sem tipos depreciados.

Inventário: Organization+WebSite+EventVenue/LocalBusiness(+AggregateRating)+BreadcrumbList na home; Service+FAQPage nos /eventos/*; AboutPage/ContactPage; cityPageSchema com FAQPage; Blog/BlogPosting/CollectionPage; ImageGallery em /galeria (vazio, sem imagens).

Issues:
- CRÍTICO: mismatch www/não-www. SITE_URL hardcoded https://coraleventos.com.br em lib/seo-config.ts, app/layout.tsx (metadataBase/canonical), app/sitemap.ts, app/robots.ts, mas produção serve www. Invalida cadeia de @id se Google preferir a URL servida. Alinhar SITE_URL ao domínio primário do Vercel + 301.
- MÉDIO: dados não confirmados em produção: OPENING_HOURS "Mo-Sa 09:00-18:00" (TODO confirmar; docs/open-questions.md diz "não definido") e founded "2024" → remover do schema até confirmação. OBS: o GBP real mostra seg-sáb 9-18h, então o horário BATE com o Google — rebaixar urgência, mas confirmar com cliente.
- MÉDIO: GEO aproximado (centro de Batatais, não o lat/long da Rua Matheus Marinelli 18; GBP real: -20.881, -47.593). Corrigir em lib/seo-config.ts.
- MÉDIO: ImageGallery sem image[] (16 fotos renderizadas em gallery-grid.tsx não listadas). Gerar dinamicamente de um data/gallery.ts compartilhado. JSON-LD pronto no transcript do agente.
- BAIXO/INFO: FAQPage não gera mais rich result para sites não-gov/saúde (desde ago/2023) — manter pelo valor GEO, não expandir com essa expectativa.
- BAIXO: BlogPosting.image sem width/height (recomendado 1200px+).
- BAIXO: Organization sem telephone/address/ContactPoint próprios e sameAs sem Google Maps. JSON-LD pronto no transcript.

Lacunas prioritárias: (1) resolver host, (2) confirmar openingHours/foundingDate, (3) GEO real, (4) ImageGallery populado, (5) ContactPoint+sameAs Maps.
