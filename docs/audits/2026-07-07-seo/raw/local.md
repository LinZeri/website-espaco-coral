# SEO Local — Score 68/100

Dimensões: GBP 80, Reviews 75, Local on-page 60, NAP/citações 60, Schema local 80, Autoridade local 40.
Tipo: brick-and-mortar híbrido com service area (8 municípios). Categoria GBP: Function room facility.

NAP: 100% consistente (código lib/seo-config.ts fonte única = footer = /contato = /sobre = JSON-LD = GBP). Ponto mais forte.

GBP: verificado, 5,0 com 36-41 reviews, 34 fotos, horário bate com schema. 3º no local pack "espaço para eventos batatais", atrás de Maria Flor (4,6/41) e Villa Casuarina (4,8/316 — quase 8x mais reviews).

Issues:
- CRÍTICO: GEO errado no schema: código usa -20.8911,-47.5856 (centro de Batatais); real do GBP: -20.8809322,-47.5929521 (~1,3km de erro). Proximidade = 55% da variância de ranking local. Corrigir lib/seo-config.ts.
- CRÍTICO: /cidades/ribeirao-preto e /cidades/franca ÓRFÃS: nenhum link interno (nav/footer/home), só sitemap. Não existe hub /cidades; breadcrumb "Cidades atendidas" aponta para /. Correção: seção "Atendemos" no footer/home + hub /cidades + corrigir breadcrumb.
- CRÍTICO (estratégico): déficit de volume de reviews vs Villa Casuarina. Campanha pós-evento via WhatsApp (D+2), regra dos 18 dias.
- ALTO: REVIEWS.reviewCount=40 hardcoded diverge (36-41); sem processo de sync. Cadência mensal.
- ALTO: areaServed com 8 municípios mas só 2 têm página (Sertãozinho, Brodowski, Altinópolis, Cravinhos sem conteúdo). Expandir ou reduzir claim.
- MÉDIO: horário só no schema, não visível em /contato; validar ["EventVenue","LocalBusiness"] no Rich Results Test; citações em diretórios não confirmadas (verificar manualmente Casar.com, Bodas, GuiaMais, TripAdvisor); NAP nas bios sociais não verificável.
- BAIXO: limpar comentários TODO residuais (founded já confirmado "outubro 2024" em /sobre).

Setor: fotos reais ✔, capacidade 320 ✔ (+maximumAttendeeCapacity), estrutura ✔, mapa embed ✔, depoimentos com nome/evento/"via Google" ✔.

Quick wins: (1) GEO real; (2) linkar cidades no footer/home + hub; (3) breadcrumb; (4) horário visível; (5) reviewCount atual + processo; (6) fluxo de review pós-evento; (7) 3-5 diretórios de casamento.
