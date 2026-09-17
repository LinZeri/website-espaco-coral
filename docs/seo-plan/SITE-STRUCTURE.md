# Site Structure — Espaço Coral

> Hierarquia completa de URLs, internal linking e arquitetura de informação otimizada para SEO local + GEO.
>
> **Importante:** este documento expande `docs/content-architecture.md` adicionando detalhamento de URL slugs, internal linking, schema por página, prioridade no sitemap e regras de quality gate. Onde houver conflito, este documento prevalece para decisões de SEO.

---

## 1. Mapa do site (12 meses)

```
coraleventos.com.br/
│
├── /                                  ← Home (HUB GERAL)
│
├── /eventos                           ← HUB de tipos de evento
│   ├── /eventos/casamentos            ← Spoke principal P1
│   ├── /eventos/15-anos               ← Spoke P1
│   ├── /eventos/corporativo           ← Spoke P2
│   └── /eventos/aniversarios          ← Spoke P3 (criar fase 2)
│
├── /estrutura                         ← HUB de estrutura física
│   ├── /estrutura/cerimonia-ao-ar-livre   ← (futuro — fase 3)
│   ├── /estrutura/sala-da-noiva           ← (futuro — fase 3)
│   └── /estrutura/espaco-kids             ← (futuro — fase 3)
│
├── /galeria                           ← HUB visual
│   └── /galeria/casamentos            ← (opcional — fase 3)
│   └── /galeria/15-anos               ← (opcional — fase 3)
│
├── /cidades                           ← HUB geo (criar fase 2)
│   ├── /cidades/ribeirao-preto        ← Location page P1
│   ├── /cidades/franca                ← Location page P2
│   └── /cidades/regiao                ← Location page P3 (Brodowski/Sertãozinho/Altinópolis)
│
├── /blog                              ← HUB editorial (lançamento fase 2)
│   ├── /blog/[slug]                   ← Posts (24 em 12 meses)
│   └── /blog/tag/[tag]                ← Tag archive (cluster pages)
│
├── /sobre                             ← (criar fase 1) E-E-A-T
├── /contato
├── /faq                               ← (criar fase 2) GEO + AI Overview
├── /politica-de-privacidade           ← Footer (LGPD/Meta Ads)
│
├── /lp/                               ← LANDING PAGES (NOINDEX, fora do sitemap)
│   ├── /lp/casamentos
│   ├── /lp/15-anos
│   └── /lp/[slug]
│
├── sitemap.xml                        ← gerado por app/sitemap.ts
├── robots.txt                         ← gerado por app/robots.ts
└── llms.txt                           ← criar fase 1 (GEO)
```

---

## 2. Convenções de URL

### Regras
- Slugs em **kebab-case**, minúsculo, sem acentos.
- Sem trailing slash (Next.js default).
- Sem extensão `.html`.
- Sem stop words desnecessárias (`de`, `para`, `o` evitar quando não agregam keyword).
- Localizados em PT-BR, sem internacionalização (sem subdiretório `/pt-br/`).
- Profundidade máxima: 3 níveis (`/cidades/ribeirao-preto/casamentos` é o limite — usar com parcimônia).

### Exemplos válidos
- ✅ `/eventos/casamentos`
- ✅ `/cidades/ribeirao-preto`
- ✅ `/blog/checklist-casamento-batatais`
- ❌ `/Eventos/Casamentos` (case)
- ❌ `/eventos/casamento_no_ar_livre` (underscore)
- ❌ `/blog/2026/04/checklist` (data no slug — gera URL frágil)

---

## 3. Detalhamento por página

### 3.1 `/` — Home

| Item | Valor |
|---|---|
| Prioridade sitemap | 1.0 |
| Change frequency | monthly |
| H1 | "Espaço Coral — Eventos premium em Batatais, SP" |
| Title | "Espaço Coral \| Festas e Eventos em Batatais, SP" |
| Meta description | "Espaço premium para casamentos, festas de 15 anos e eventos em Batatais, SP. 12.000 m², capacidade para 320 convidados. Consulte disponibilidade." |
| Keywords-alvo | espaço para eventos Batatais, salão de festas Batatais, espaço para casamento Batatais |
| Schema | `EventVenue` + `LocalBusiness` + `AggregateRating` + `BreadcrumbList` (em `@graph`) |
| Internal links de saída | `/eventos`, `/eventos/casamentos`, `/eventos/15-anos`, `/eventos/corporativo`, `/estrutura`, `/galeria`, `/contato`, `/blog` (após lançar) |
| OG image | 1200x630 — foto hero do espaço com logo overlay |

**Conteúdo (resumo das seções):**
1. Hero com headline aspiracional + CTA WhatsApp.
2. Diferenciais rápidos (12.000 m², 320 convidados, cerimônia ao ar livre, sala da noiva).
3. Tipos de eventos (cards → spokes).
4. Espaço em destaque (galeria mini).
5. Depoimentos com schema `Review`.
6. FAQ (6–8 perguntas) com schema `FAQPage`.
7. CTA final + footer.

---

### 3.2 `/eventos` — Hub de eventos

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.9 |
| H1 | "Eventos no Espaço Coral" |
| Title | "Tipos de Eventos no Espaço Coral — Casamentos, 15 Anos, Corporativo" |
| Meta description | "Casamentos, festas de 15 anos, eventos corporativos e celebrações familiares em Batatais, SP. Conheça os tipos de eventos no Espaço Coral." |
| Schema | `BreadcrumbList` + `ItemList` (com `Service` por tipo) |
| Internal links | Para cada `/eventos/[tipo]` + retorno para `/` + lateral para `/estrutura` e `/galeria` |

**Conteúdo:** introdução curta + 4 cards (casamentos, 15 anos, corporativo, aniversários/festas) com foto + bullets diferenciais + CTA "Ver mais". Bloco de FAQ no rodapé.

---

### 3.3 `/eventos/casamentos` — Service page P1

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.9 |
| H1 | "Espaço para Casamentos em Batatais — Cerimônia ao Ar Livre e Sala da Noiva" |
| Title | "Casamentos em Batatais, SP \| Espaço Coral" |
| Meta description | "Casamentos no Espaço Coral: cerimônia ao céu aberto, sala privativa da noiva, 320 convidados, 12.000 m² em Batatais. Atendemos noivas de Ribeirão Preto, Franca e região." |
| Keywords-alvo | espaço para casamento Batatais, casamento ao ar livre Batatais, salão de casamento Ribeirão Preto, casamento perto de Ribeirão Preto |
| Word count target | 1.200–1.800 palavras |
| Schema | `Service` + `EventVenue` + `FAQPage` + `BreadcrumbList` |
| Internal links saída | `/estrutura`, `/galeria`, `/cidades/ribeirao-preto`, posts de blog relacionados |

**Estrutura de conteúdo:**
1. H1 + parágrafo aspiracional (60–80 palavras "quotable" para AI).
2. H2: "O Espaço para o Seu Casamento" — descrição do salão + cerimônia ao ar livre.
3. H2: "Sala Privativa da Noiva" — diferencial.
4. H2: "Capacidade e Configurações" — tabela.
5. H2: "Casamentos Realizados" — galeria mini + 1 mini-case.
6. H2: "FAQ — Casamento no Espaço Coral" — 8–10 perguntas.
7. CTA WhatsApp final.

---

### 3.4 `/eventos/15-anos` — Service page P1

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.9 |
| H1 | "Festa de 15 Anos em Batatais — Espaço Premium para Debutantes" |
| Title | "Festa de 15 Anos em Batatais, SP \| Espaço Coral" |
| Meta description | "Festa de 15 anos no Espaço Coral: sala privativa da debutante, espaço kids, 320 convidados, 12.000 m² em Batatais. Atendemos famílias de Ribeirão Preto e região." |
| Keywords-alvo | festa de 15 anos Batatais, salão de 15 anos Ribeirão Preto, espaço para debutante Batatais |
| Word count target | 1.200–1.500 palavras |
| Schema | `Service` + `EventVenue` + `FAQPage` |

---

### 3.5 `/eventos/corporativo` — Service page P2

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.8 |
| H1 | "Eventos Corporativos em Batatais — Capacidade até 320 Pessoas" |
| Title | "Eventos Corporativos em Batatais, SP \| Espaço Coral" |
| Meta description | "Espaço para eventos corporativos em Batatais: confraternizações, formaturas, premiações e lançamentos com estrutura completa para até 320 pessoas." |
| Keywords-alvo | espaço para eventos corporativos Batatais, espaço para confraternização Ribeirão Preto, formatura Batatais |
| Word count target | 1.000–1.300 palavras |
| Schema | `Service` + `EventVenue` + `FAQPage` |

---

### 3.6 `/eventos/aniversarios` — Service page P3 (criar fase 2)

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.7 |
| H1 | "Festas de Aniversário em Batatais — Espaço Coral" |
| Title | "Festa de Aniversário em Batatais, SP \| Espaço Coral" |
| Word count target | 800–1.100 palavras |

---

### 3.7 `/estrutura` — Hub de estrutura

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.8 |
| H1 | "Estrutura do Espaço Coral — 12.000 m² em Batatais" |
| Title | "Estrutura e Diferenciais \| Espaço Coral — Batatais, SP" |
| Meta description | "Conheça a estrutura completa do Espaço Coral: 12.000 m², 320 convidados, cerimônia ao ar livre, sala da noiva, espaço kids, climatização, gerador, estacionamento." |
| Word count target | 900–1.200 palavras |
| Schema | `EventVenue` (com `amenityFeature[]` listando todas as amenidades) + `BreadcrumbList` |

**Conteúdo:**
1. Visão geral com fotos.
2. Tabela de capacidade por configuração.
3. Galeria de ambientes (salão, cerimônia, sala da noiva, espaço kids, cozinha, estacionamento).
4. Lista detalhada de itens inclusos.
5. Bloco "o que está incluso e o que cliente contrata separado".
6. FAQ.

---

### 3.8 `/galeria` — Hub visual

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.7 |
| Change frequency | weekly |
| H1 | "Galeria — Eventos Realizados no Espaço Coral" |
| Schema | `ImageGallery` + `BreadcrumbList` |
| Filtros (UX) | Casamentos / 15 Anos / Corporativo / Aniversários |

**SEO de imagens:** cada foto com `alt` descritivo (ex: "Casamento ao ar livre no Espaço Coral em Batatais — cerimônia com 180 convidados, abril 2026"), filename descritivo, dimensões otimizadas.

---

### 3.9 `/cidades/ribeirao-preto` — Location page P1 (criar fase 2)

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.7 |
| H1 | "Espaço para Eventos para Ribeirão Preto — Espaço Coral em Batatais" |
| Title | "Espaço para Casamentos e Eventos perto de Ribeirão Preto \| Espaço Coral" |
| Meta description | "A 70 km de Ribeirão Preto, o Espaço Coral é a escolha de noivas e famílias que buscam estrutura premium fora da capital regional. Cerimônia ao ar livre, 320 convidados." |
| Keywords-alvo | espaço para casamento perto de Ribeirão Preto, salão de festas próximo a Ribeirão Preto |
| Word count target | 800–1.100 palavras (60%+ único — quality gate) |
| Schema | `LocalBusiness` (com `areaServed: "Ribeirão Preto"`) + `BreadcrumbList` |

**Conteúdo único obrigatório (não copiar de outras páginas):**
1. Distância e tempo de viagem desde RP (~70 km, ~50 min).
2. Por que noivas de RP escolhem Batatais (diferencial premium fora da concorrência da capital).
3. Logística para convidados de RP (hospedagem em Batatais, transfer).
4. Mini-case de casamento real com noivos de RP.
5. Lista de fornecedores de RP que já trabalharam no Espaço Coral.
6. FAQ específica.

---

### 3.10 `/cidades/franca` — Location page P2 (criar fase 2)

Estrutura análoga a Ribeirão Preto, adaptada para Franca (~95 km).

---

### 3.11 `/cidades/regiao` — Location page P3 (criar fase 3)

Cobertura de cidades menores (Brodowski, Sertãozinho, Altinópolis, Cravinhos). Apenas se houver demanda real verificada via Search Console.

---

### 3.12 `/blog` — Hub editorial (criar fase 2)

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.5 |
| H1 | "Blog do Espaço Coral — Casamentos e Eventos no Interior de SP" |
| Schema | `Blog` + `BreadcrumbList` |
| Estrutura | Lista paginada (12 posts/página) + sidebar com tags + posts mais lidos |

### 3.13 `/blog/[slug]` — Post individual

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.6 (variável) |
| H1 | Título do post (com keyword principal) |
| Schema | `BlogPosting` + `BreadcrumbList` + `Person` (autor) + `FAQPage` se aplicável |
| Internal links saída | mínimo 2 para service pages + 1 para outro post relacionado |

### 3.14 `/blog/tag/[tag]` — Cluster pages

Tags ativas: `casamento`, `15-anos`, `corporativo`, `decoracao`, `fornecedores`, `batatais`, `ribeirao-preto`, `planejamento`. Cluster pages devem ter mínimo 3 posts antes de existir (evita thin tag archive).

---

### 3.15 `/sobre` — Página E-E-A-T (criar fase 1)

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.6 |
| H1 | "Sobre o Espaço Coral — Nossa História em Batatais" |
| Schema | `AboutPage` + `Organization` + `Person` (proprietário se aplicável) |

**Conteúdo (E-E-A-T):**
- História: ano de fundação, evolução do espaço.
- Equipe: foto, nome e função (proprietário, equipe de eventos).
- Certificações: alvará de funcionamento, AVCB, vigilância sanitária.
- Filosofia / propósito.
- Estatística: total de eventos realizados (atualizar anualmente).

---

### 3.16 `/contato` — Página de conversão

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.6 |
| Change frequency | yearly |
| H1 | "Contato — Espaço Coral em Batatais" |
| Schema | `ContactPage` + `LocalBusiness` (NAP completo + `geo` com lat/long) |
| Conteúdo | CTA WhatsApp grande + endereço + Google Maps embed + redes sociais + horário + reviews |

---

### 3.17 `/faq` — Página agregada (criar fase 2)

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.6 |
| H1 | "Perguntas Frequentes — Espaço Coral" |
| Schema | `FAQPage` (todas as perguntas) + `BreadcrumbList` |
| Word count target | 1.500+ palavras |

20–30 perguntas reais (extraídas de PAA, mensagens recebidas via WhatsApp, e fluxo do cliente). Esta página é uma das mais importantes para GEO/AI Overviews.

---

### 3.18 `/politica-de-privacidade` — Footer

| Item | Valor |
|---|---|
| Prioridade sitemap | 0.3 |
| Robots | index (Meta Ads exige link público) |

---

### 3.19 `/lp/[slug]` — Landing pages de campanha

Ver `docs/paid-traffic.md`. Sumário de regras SEO:
- `noindex, nofollow` obrigatório.
- Excluídas do sitemap.
- Disallow no robots.txt para `/lp/` (já implementado).
- Sem links internos do site principal.

---

## 4. Internal linking — Estratégia

### 4.1 Princípios

- **Hub-and-spoke:** hubs (`/eventos`, `/estrutura`, `/galeria`, `/blog`) recebem links de toda a navegação; spokes recebem links contextuais de hubs e cross-links entre si quando relevante.
- **Anchor text descritivo:** nunca "clique aqui" — sempre keyword ou variação ("ver casamentos no Espaço Coral", "estrutura completa").
- **Blog → service pages:** cada post deve linkar pelo menos 2 service pages e 1 post relacionado.
- **Service page → blog:** cada service page tem bloco "leituras relacionadas" com 3 posts.
- **Sem orphan pages:** toda página deve ter ≥ 2 links internos apontando para ela (excluindo footer/header).

### 4.2 Mapa de internal linking — visão de alto nível

```
                    ┌────────────────┐
                    │       /        │
                    └───┬─────────┬──┘
        ┌──────────────┼─────────┼──────────────┐
        ▼              ▼         ▼              ▼
   /eventos       /estrutura  /galeria      /cidades
        │              │         │              │
   ┌────┼─────┐        │         │         ┌────┼────┐
   ▼    ▼     ▼        ▼         ▼         ▼    ▼    ▼
 /casa /15  /corp     /faq    posts blog  /rp /fr /reg
   │    │     │
   └────┴─────┴───────► /faq, /sobre, /contato (sempre)
                       │
                       └─► /blog/[posts relacionados]
```

### 4.3 Header (menu principal)
```
Início  |  O Espaço  |  Eventos ▾  |  Galeria  |  Blog  |  Contato
                       └─ Casamentos
                       └─ 15 Anos
                       └─ Corporativo
                       └─ Aniversários
```

### 4.4 Footer
```
Coluna 1 — Espaço          Coluna 2 — Eventos        Coluna 3 — Conteúdo      Coluna 4 — Contato
- O Espaço                 - Casamentos              - Galeria                 - WhatsApp
- Sobre                    - 15 Anos                 - Blog                    - Endereço
- Estrutura                - Corporativo             - FAQ                     - Mapa
- Política de privacidade  - Aniversários                                      - Instagram / Facebook
```

---

## 5. Quality gates

| Gate | Limite | Ação ao ultrapassar |
|---|---|---|
| Location pages | ⚠️ 6 / 🛑 10 | Avaliar canonicalização ou remoção |
| Service pages | ⚠️ 8 / 🛑 12 | Idem |
| Blog posts/mês | ⚠️ 6 / 🛑 10 | Manter qualidade > volume |
| Tag archive — mínimo de posts | < 3 | Não publicar tag archive |
| Word count `/eventos/[tipo]` | < 800 | Não publicar |
| Word count `/cidades/[cidade]` | < 600 | Não publicar |
| % conteúdo único `/cidades/[cidade]` | < 60% | Reescrever |
| Internal links de saída | < 2 | Adicionar contexto |
| Internal links chegando | < 2 | Adicionar de hubs |

---

## 6. Sitemap — Configuração detalhada

### 6.1 `app/sitemap.ts` — estrutura final esperada

```
Prioridade 1.0  → /
Prioridade 0.9  → /eventos, /eventos/casamentos, /eventos/15-anos
Prioridade 0.8  → /eventos/corporativo, /estrutura, /cidades/ribeirao-preto
Prioridade 0.7  → /eventos/aniversarios, /galeria, /cidades/franca, /cidades/regiao
Prioridade 0.6  → /sobre, /contato, /faq, /blog, /blog/[posts]
Prioridade 0.5  → /blog/tag/[tags]
Prioridade 0.3  → /politica-de-privacidade
```

### 6.2 Exclusões obrigatórias

- `/lp/*` — sempre fora do sitemap.
- `/api/*` — sempre.
- `/_next/*` — sempre (já blocked no robots).
- Páginas em rascunho (drafts) — usar flag no front-matter de MDX.

---

## 7. URL changes / redirects

> Quando houver mudança de URL (raro neste projeto greenfield), aplicar 301 via `next.config.mjs`.

```js
async redirects() {
  return [
    { source: '/old-path', destination: '/new-path', permanent: true },
  ]
}
```

Manter log em `docs/seo-plan/redirects-log.md` (criar quando necessário).

---

## 8. Canonicalização

- Toda página tem `<link rel="canonical">` apontando para si própria.
- `metadataBase: new URL('https://coraleventos.com.br')` no layout (já configurado).
- Nunca canonicalize service page para hub (`/eventos/casamentos` não deve canonicalize para `/eventos`).
- Tag archives em `/blog/tag/[tag]` têm canonical para si mesmas (não para `/blog`).

---

## 9. llms.txt — Optimização para AI crawlers

Criar arquivo `public/llms.txt` (criar fase 1):

```
# Espaço Coral — Eventos premium em Batatais, SP

> Espaço para festas e eventos com 12.000 m², capacidade para 320 convidados,
> cerimônia ao ar livre, sala privativa da noiva e espaço kids com monitora.
> Localizado em Batatais, SP, atende noivas e famílias de Ribeirão Preto, Franca e região.

## Páginas principais
- [Home](https://coraleventos.com.br/): visão geral do espaço
- [Casamentos](https://coraleventos.com.br/eventos/casamentos): cerimônias e recepções
- [15 Anos](https://coraleventos.com.br/eventos/15-anos): festas de debutantes
- [Corporativo](https://coraleventos.com.br/eventos/corporativo): eventos empresariais
- [Estrutura](https://coraleventos.com.br/estrutura): detalhes físicos do espaço
- [FAQ](https://coraleventos.com.br/faq): perguntas frequentes
- [Contato](https://coraleventos.com.br/contato): WhatsApp (16) 99129-4178

## Diferenciais
- 12.000 m² de área total
- 320 convidados sentados
- Cerimônia ao céu aberto com área verde
- Sala privativa para a homenageada
- Espaço kids com monitora
- 36 avaliações 5 estrelas no Google
```

---

## 10. Checklist de validação por página (publicação)

- [ ] Title 50–60 caracteres com keyword principal
- [ ] Meta description 140–160 caracteres com keyword + localização + CTA
- [ ] H1 único na página, contém keyword principal
- [ ] H2/H3 estruturados, sem pulos hierárquicos
- [ ] URL slug curto, com keyword
- [ ] Canonical apontando para si
- [ ] OG image 1200x630 — específica da página (não usar a global em todas)
- [ ] Schema JSON-LD validado em rich-results-test
- [ ] Mínimo 2 internal links de saída
- [ ] Mínimo 2 internal links chegando (de outras páginas)
- [ ] Word count atinge mínimo do tipo de página
- [ ] Imagens com `alt` descritivo, `next/image`, `sizes` correto
- [ ] Mobile: zero overlap do botão WhatsApp com conteúdo crítico
- [ ] Lighthouse Performance ≥ 90 (mobile)
- [ ] Lighthouse SEO = 100
- [ ] CTA WhatsApp visível em pelo menos 2 pontos
