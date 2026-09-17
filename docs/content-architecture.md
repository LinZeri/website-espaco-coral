# Arquitetura de Conteúdo — Espaço Coral

## Mapa do site

```
coraleventos.com.br/
│
├── /                        → Home
├── /estrutura               → O Espaço (estrutura física, fotos, diferenciais)
├── /eventos                 → Tipos de eventos (casamentos, 15 anos, corporativo, festas)
├── /galeria                 → Galeria de fotos de eventos realizados
├── /contato                 → Formulário + WhatsApp + mapa + localização
│
├── /blog/                   → (futuro)
│   └── /blog/[slug]         → Posts individuais
│
└── /lp/                     → Landing pages de campanha (NOINDEX)
    ├── /lp/casamentos        → LP para campanha de casamentos
    ├── /lp/15-anos           → LP para campanha de festas de 15 anos
    └── /lp/[slug]            → Outras campanhas
```

---

## Navegação principal

Menu do site (header):

```
Início  |  O Espaço  |  Eventos  |  Galeria  |  Contato
```

- **Sem links para `/lp/`** na navegação principal — landing pages são completamente isoladas
- CTA de WhatsApp fixo no header (botão ou ícone)
- Logo leva sempre para a home

---

## Páginas — objetivo e conteúdo

### `/` — Home

**Objetivo:** primeira impressão premium, aspiracional. Convencer o visitante de que o Espaço Coral é o lugar certo para o evento mais importante da sua vida.

**Estrutura sugerida (inspirada no template v0, adaptada):**

1. **Hero** — Bento grid com fotos do espaço em scroll-parallax. Título grande e aspiracional. CTA → WhatsApp.
2. **Números / Diferenciais** — 12.000 m², 320 convidados, X anos de história — impacto rápido
3. **Tipos de eventos** — Cards para casamentos, 15 anos, corporativo — link para `/eventos`
4. **Espaço em destaque** — fotos dos ambientes principais (salão, cerimônia ao céu aberto, sala privativa)
5. **Depoimentos** — seção com avaliações do Google (5★, 36 avaliações)
6. **CTA final** — "Agende uma visita" → WhatsApp
7. **Footer** — endereço, redes sociais, links

**Palavras-chave alvo:** "espaço para casamento Batatais", "salão de festas Batatais"

---

### `/estrutura` — O Espaço

**Objetivo:** mostrar em detalhes toda a estrutura do espaço para convencer clientes que estão comparando opções.

**Conteúdo:**
- Visão geral: 12.000 m², capacidade 320 convidados
- Lista de itens com fotos: salão principal, sala privativa, espaço kids, cerimônia ao céu aberto, cozinha, estacionamento
- Detalhes técnicos: climatização, som ambiente, TVs, cervejeiras, gerador
- Serviços inclusos: camareira, orientadores de estacionamento, monitora (espaço kids), banheiros separados para staff
- CTA → WhatsApp para agendar visita

**Palavras-chave alvo:** "estrutura espaço de eventos Batatais", detalhes específicos do espaço

---

### `/eventos` — Tipos de Eventos

**Objetivo:** página de destino para visitantes que buscam por tipo de evento específico. Potencial de ranqueamento por cada segmento.

**Conteúdo:**
- Seção: **Casamentos** — o espaço como cenário perfeito, cerimônia ao céu aberto, sala da noiva
- Seção: **Festas de 15 Anos** — ambiente exclusivo, capacidade, espaço kids, sala privativa para a debutante
- Seção: **Eventos Corporativos** — estrutura, AV, capacidade, privacidade
- Seção: **Festas e Confraternizações** — flexibilidade do espaço

Cada seção com fotos específicas e CTA → WhatsApp.

**Palavras-chave alvo:** "casamento Batatais", "festa de 15 anos Batatais", "evento corporativo Batatais"

---

### `/galeria` — Galeria

**Objetivo:** prova visual do nível de qualidade. Mostrar eventos reais realizados no espaço.

**Conteúdo:**
- Grid de fotos de alta qualidade
- Organização por categoria (casamentos, festas, 15 anos)
- Fotos das pastas: `_references/Photos/ALBUM PREVIA CASAMENTO L+N/`, `_references/Photos/Variadas/`, `_references/Photos/25.10 Inauguração/`
- Galeria estática (imagens em `/public/images/gallery/`)

**Implementação técnica:**
- Imagens servidas via `next/image` com lazy loading
- Grid responsivo (masonry ou grade regular — a decidir)
- Lightbox para visualização ampliada (componente leve)

---

### `/contato` — Contato

**Objetivo:** facilitar o contato. Página de conversão secundária (após o CTA do WhatsApp no header/hero).

**Conteúdo:**
- **CTA principal:** botão WhatsApp grande e visível — `(16) 99129-4178`
- Endereço completo: Rua Matheus Marinelli, 18, Jardim Elena, Batatais, SP, 14300-111
- Google Maps embed
- Redes sociais: Instagram e Facebook
- Horário de atendimento (a definir com cliente)
- Depoimentos do Google (reforçar prova social)

---

### `/lp/[slug]` — Landing Pages de Campanha

Ver [docs/paid-traffic.md](paid-traffic.md) para toda a documentação sobre LPs.

**Regra absoluta:** `noindex, nofollow` em todas as LPs. Sem exceção.

---

### `/blog/[slug]` — Blog (futuro)

Ver [docs/seo-strategy.md](seo-strategy.md) para diretrizes do blog.

**Quando implementar:** a critério do cliente. A estrutura técnica (MDX + SSG) já estará preparada para receber o blog sem refatoração.

---

## Footer

Conteúdo mínimo do footer:
- Logo
- Endereço: Rua Matheus Marinelli, 18, Jardim Elena, Batatais, SP, 14300-111
- WhatsApp: (16) 99129-4178
- Instagram + Facebook (links)
- Links: O Espaço | Eventos | Galeria | Contato
- Copyright e nome do espaço

---

## Hierarquia de importância de páginas

Para fins de SEO e prioridade de desenvolvimento:

1. **Home** — porta de entrada principal, maior tráfego
2. **Eventos** — maior potencial de ranqueamento por segmento
3. **Estrutura** — conteúdo de decisão (fundo de funil)
4. **Galeria** — prova social visual, influencia conversão
5. **Contato** — conversão direta

---

## Expansões futuras (registradas, não prioritárias)

- `/eventos/casamentos` — página dedicada para casamentos (SEO)
- `/eventos/15-anos` — página dedicada para 15 anos (SEO)
- `/ribeirao-preto` ou `/eventos-ribeirao-preto` — página geo-targeted para maior cidade próxima
- `/franca` — idem para Franca
- `/blog` — conteúdo informacional para tráfego de topo de funil
