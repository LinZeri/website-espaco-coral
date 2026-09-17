# Visual/UX — Score do agente 32/100 DESCARTADO (falso alarme)

O Playwright do agente capturou um WordPress legado (wp-content, Elementor, 404 em /blog, /contato). REFUTADO pelo orquestrador ao vivo: a home real tem 384 refs a /_next, 0 wp-content, 1 h1, title "Espaço Coral | Espaço para Casamentos e Eventos em Batatais, SP", canonical apex, 7 links wa.me, e todas as rotas core retornam 200. O sandbox do agente resolveu DNS para uma versão obsoleta/cache.

Observações de CÓDIGO aproveitáveis (repo):
- MÉDIO: h1 da home é o wordmark "CORAL" animado letra a letra (spans) — semanticamente pobre; considerar h1 descritivo (sr-only ou complementar) com keyword local.
- MÉDIO: header.tsx: CTA WhatsApp "Agendar visita" com hidden md:flex (não aparece no header mobile; mitigado se whatsapp-button.tsx for flutuante fixo — confirmar).
- MÉDIO: hero de ~200vh de scroll sem CTA textual visível até rolar — atenção à rejeição mobile.
- Screenshots (do site errado) em scratchpad/screenshots/ — ignorar.

Ação: repetir auditoria visual com Playwright localmente (fora do sandbox) numa próxima rodada; score Visual/UX excluído da agregação ou estimado por código (~75, sem evidência de tela real).
