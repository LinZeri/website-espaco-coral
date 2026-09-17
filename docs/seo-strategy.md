# Estratégia de SEO — Espaço Coral

## Princípios fundamentais

O site nasce com base técnica sólida de SEO. Isso significa:

- Arquitetura de informação clara e hierárquica
- Heading structure correta (H1 único por página, H2/H3 semânticos)
- Metadata única e descritiva por página (title tag + meta description)
- Performance forte (Core Web Vitals como meta de design, não otimização posterior)
- URLs limpas, descritivas e sem parâmetros desnecessários
- Imagens com `alt` text descritivo e relevante
- Schema markup implementado desde o início
- Sitemap XML gerado automaticamente pelo Next.js
- robots.txt correto desde o deploy

---

## SEO local

O Espaço Coral tem potencial forte de ranqueamento local. A estratégia prioriza:

### Mercado primário
- **Batatais** — cidade sede, todas as buscas locais diretas
- Termos: "espaço para eventos Batatais", "salão de festas Batatais", "espaço para casamento Batatais", "festa de 15 anos Batatais"

### Mercado secundário (tráfego regional)
- **Ribeirão Preto** — maior cidade próxima, fonte de noivas e eventos premium
- **Franca** — cidade vizinha relevante
- Termos: "espaço para casamento perto de Ribeirão Preto", "salão de eventos interior SP"

### Estratégia de geo-targeting
- Home e páginas principais: mencionar Batatais naturalmente no conteúdo
- Meta descriptions: sempre incluir localização
- Futuras páginas locais (ex: `/eventos-ribeirao-preto`) — registradas como expansão futura em `open-questions.md`

---

## Palavras-chave por intenção

### Intenção comercial (alta prioridade)

| Palavra-chave | Intenção | Página target |
|---|---|---|
| espaço para casamento Batatais | Comercial | Home / /eventos |
| salão de festas Batatais | Comercial | Home |
| espaço para eventos Batatais | Comercial | Home |
| festa de 15 anos Batatais | Comercial | /eventos |
| espaço para eventos corporativos Batatais | Comercial | /eventos |
| salão de festas perto de Ribeirão Preto | Comercial | Home |

### Intenção informacional (blog — futuro)

| Palavra-chave | Intenção | Formato |
|---|---|---|
| como escolher espaço para casamento | Informacional | Blog post |
| checklist festa de 15 anos | Informacional | Blog post |
| quanto custa casamento em Batatais | Informacional | Blog post |
| fornecedores de casamento Batatais | Informacional | Blog post / lista |

---

## Metadata — padrão por tipo de página

### Home
```
title: "Espaço Coral | Festas e Eventos em Batatais, SP"
description: "Espaço premium para casamentos, festas de 15 anos e eventos em Batatais, SP. 12.000 m², capacidade para 320 convidados. Consulte disponibilidade."
```

### Páginas internas
```
title: "[Nome da página] | Espaço Coral — Batatais, SP"
description: "[Descrição específica da página com palavra-chave e localização]"
```

### Landing pages de campanha
```
<meta name="robots" content="noindex,nofollow" />
```
(Sem necessidade de title/description otimizados para SEO — essas páginas não serão indexadas)

---

## Schema Markup

Implementar desde o início:

### LocalBusiness (na home)
```json
{
  "@context": "https://schema.org",
  "@type": "EventVenue",
  "name": "Espaço Coral",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Matheus Marinelli, 18",
    "addressLocality": "Batatais",
    "addressRegion": "SP",
    "postalCode": "14300-111",
    "addressCountry": "BR"
  },
  "telephone": "+5516991294178",
  "url": "https://coraleventos.com.br",
  "sameAs": [
    "https://www.instagram.com/espaco.coral",
    "https://www.facebook.com/EspacoCoralEventos"
  ]
}
```

### AggregateRating (depoimentos Google)
```json
{
  "@type": "AggregateRating",
  "ratingValue": "5",
  "reviewCount": "36",
  "bestRating": "5"
}
```

---

## Imagens e mídia

- Usar `next/image` sempre — compressão, lazy loading, formatos modernos (WebP/AVIF) automáticos
- `alt` text: descritivo e relevante ("Salão de festas do Espaço Coral decorado para casamento em Batatais")
- Nunca usar `alt=""` em imagens de conteúdo — reservado apenas para imagens decorativas
- Nomear arquivos de forma descritiva: `espaco-coral-salao-principal.jpg`, não `IMG_001.jpg`
- Dimensões otimizadas: nunca servir imagem maior que o necessário

---

## Depoimentos Google

O Espaço Coral tem 36 avaliações com 100% de 5 estrelas — ativo de SEO e conversão importante.

**Estratégia:**
- Exibir seção de depoimentos na home com schema Review/AggregateRating
- Isso melhora CTR nos resultados de busca (estrelas em rich snippets)
- Implementação: JSON estático com avaliações selecionadas manualmente (sem API por ora)
- Atualizar manualmente quando novas avaliações forem recebidas

---

## Blog (futuro)

O blog ainda não existe. Quando for criado:

- **Tecnologia:** MDX em `/content/blog/` + geração estática (Next.js)
- **Editor:** Claude (sem necessidade de CMS com interface gráfica)
- **Foco:** conteúdo informacional de cauda longa relacionado a eventos, casamentos e festas no interior de SP
- **Estrutura de URL:** `coraleventos.com.br/blog/[slug]`
- **Cada post deve ter:**
  - H1 com a palavra-chave principal
  - Meta description única
  - Schema BlogPosting
  - Link interno para pelo menos uma página do site principal
  - CTA ao final → WhatsApp

---

## Sitemap e robots.txt

### robots.txt (padrão)
```
User-agent: *
Allow: /

Disallow: /lp/

Sitemap: https://coraleventos.com.br/sitemap.xml
```

**Nota:** o `/lp/` estar no Disallow reforça o noindex nas landing pages, mas não substitui a meta tag noindex — ambos devem coexistir.

### Sitemap
Gerado automaticamente pelo Next.js via `app/sitemap.ts`. Incluir todas as páginas públicas. Excluir `/lp/*`.

---

## Core Web Vitals — metas de design

| Métrica | Meta | Como garantir |
|---|---|---|
| LCP | < 2.5s | Imagens hero otimizadas com `priority`, sem blocking resources |
| FID/INP | < 200ms | Minimal JS no critical path, SSG |
| CLS | < 0.1 | Reservar espaço para imagens (width/height no next/image), sem conteúdo que mude de posição |

A performance é tratada como requisito de design, não como otimização posterior.
