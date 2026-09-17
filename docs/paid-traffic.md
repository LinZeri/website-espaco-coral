# Landing Pages — Tráfego Pago

## Visão geral

O site comporta **landing pages específicas para campanhas pagas** (Google Ads, Meta Ads). Essas páginas são completamente separadas do site principal em termos de indexação e navegação, mas compartilham a identidade visual da marca.

---

## Regra absoluta: noindex

**Toda página sob `/lp/` deve ter:**

```tsx
// app/lp/[slug]/page.tsx
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}
```

Ou no HTML diretamente:
```html
<meta name="robots" content="noindex,nofollow" />
```

**Nunca remover ou condicionar esse noindex.** Essas páginas não devem aparecer no Google sob nenhuma circunstância — indexar uma LP de campanha desperdiça budget e confunde o usuário.

---

## Estrutura de URLs

```
coraleventos.com.br/lp/casamentos
coraleventos.com.br/lp/15-anos
coraleventos.com.br/lp/corporativo
coraleventos.com.br/lp/[nome-da-campanha]
```

O slug deve refletir a campanha de forma descritiva para facilitar organização interna.

---

## Isolamento de navegação

**LPs não aparecem:**
- No menu principal do site
- No sitemap.xml
- Em links internos de qualquer outra página
- No footer

**LPs possuem:**
- Header simplificado — apenas o logo (sem menu de navegação)
- Sem links que levem o usuário para fora da LP (exceto WhatsApp)
- Footer mínimo — apenas informações legais essenciais se necessário

---

## Rastreamento em LPs

GTM e Meta Pixel devem estar **presentes** nas landing pages para rastreamento de conversão.

```tsx
// As LPs herdam o layout raiz que já inclui GTM e Meta Pixel
// Se a LP tiver layout próprio, incluir manualmente
```

**Eventos de conversão a configurar no GTM:**
- Clique no botão de WhatsApp
- Scroll até 50% / 75% / 100% da página (engajamento)
- Tempo na página (> 30s, > 60s)

---

## Princípios de design e copy para LPs

### Foco único
Cada LP tem um único objetivo: levar o visitante ao WhatsApp. Eliminar qualquer distração.

### Estrutura recomendada

1. **Hero** — headline impactante + subheadline + CTA WhatsApp above the fold
2. **Prova social** — avaliações 5★ do Google (36 avaliações)
3. **Diferenciais rápidos** — 3 a 5 bullets visuais dos principais diferenciais
4. **Fotos** — 3 a 6 fotos de alta qualidade do espaço
5. **CTA final** — botão grande de WhatsApp + texto de urgência/exclusividade
6. **Localização** — breve menção ao endereço e cidades atendidas

### Copy

- **Headline:** emocional e direto ao ponto. Ex: "O Espaço Perfeito para o Casamento dos Seus Sonhos"
- **Subheadline:** contexto e localização. Ex: "12.000 m² de estrutura premium em Batatais, SP"
- **CTA:** ação clara. Ex: "Agendar Visita pelo WhatsApp" ou "Consultar Disponibilidade"
- Nunca mencionar preços — sempre "consulte"
- Criar senso de exclusividade sem ser agressivo

### Visual

- Manter identidade visual do site principal (paleta, tipografia)
- LPs podem ter variações: fundo mais escuro, mais fotos, menos texto
- Manter o padrão premium — sem elementos que pareçam baratos ou genéricos

---

## Diferenças permitidas em LPs vs. site principal

| Aspecto | Site principal | Landing pages |
|---|---|---|
| Navegação | Menu completo | Apenas logo, sem menu |
| Objetivo | Informar + converter | Converter apenas |
| Conteúdo | Completo, informativo | Conciso, focado em conversão |
| SEO | Otimizado | noindex — irrelevante |
| Analytics | GTM + GA4 (orgânico) | GTM + conversões de campanha |
| Velocidade | Alta prioridade | Alta prioridade |
| Visual | Premium, editorial | Premium, direto |

---

## robots.txt — exclusão de LPs

```
User-agent: *
Disallow: /lp/
```

Isso garante que crawlers não sigam links para LPs mesmo que existam. Complementa (não substitui) o noindex.

---

## Criação de novas LPs

Ao criar uma nova landing page:

1. Criar arquivo em `app/lp/[slug]/page.tsx`
2. Adicionar `robots: { index: false, follow: false }` no metadata
3. Usar layout sem navegação global (`layout.tsx` específico para `/lp/`)
4. Configurar eventos de conversão no GTM antes de ativar a campanha
5. Testar: acessar a URL e inspecionar o `<head>` para confirmar o noindex
6. Nunca criar link interno do site principal para a LP

---

## Campanhas previstas

| Campanha | URL | Status |
|---|---|---|
| Casamentos | `/lp/casamentos` | A criar |
| Festas de 15 anos | `/lp/15-anos` | A criar |
| Corporativo | `/lp/corporativo` | A criar |

Novas campanhas a serem adicionadas conforme necessidade.
