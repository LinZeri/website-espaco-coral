# CLAUDE.md — Espaço Coral

> Documento mestre de contexto, regras e direcionamento do projeto.
> Deve ser lido por qualquer agente ou colaborador antes de tocar no código.

---

## Visão geral

O **Espaço Coral** é um espaço para festas e eventos de alto padrão localizado em Batatais, SP. Este repositório contém o site oficial do negócio, desenvolvido com foco em **SEO orgânico**, **performance** e **conversão via WhatsApp**.

O site também comporta **landing pages de campanhas pagas** (Google Ads, Meta) — essas páginas seguem regras estritas de isolamento e não-indexação.

---

## Objetivos do site

1. **Tráfego orgânico** — ranqueamento no Google para buscas locais e comerciais
2. **Conversão** — levar visitantes a entrar em contato via WhatsApp
3. **Campanhas pagas** — landing pages isoladas para Google Ads e Meta Ads (noindex)

---

## Stack técnico

| Item | Decisão |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS + shadcn/ui (new-york) |
| Geração | SSG — Static Site Generation |
| Deploy | Vercel |
| Domínio | coraleventos.com.br |
| Analytics | GTM: `GTM-NR95XJ6B` |
| Meta Pixel | `1442151020219648` |
| Blog | MDX em `/content/blog/` (futuro) |

---

## Contato e conversão

**Canal único de conversão: WhatsApp**
- Número: **(16) 99129-4178**
- Usar em todos os CTAs do site
- Nunca exibir preços — sempre "consulte" → WhatsApp

---

## Regras críticas

### 1. `_references/` sempre no `.gitignore`
A pasta `_references/` contém assets brutos, logos originais, fotos do cliente, o template v0 e outros materiais de referência. **Nunca deve ser commitada.**

### 2. Landing pages de campanha: noindex obrigatório
Toda página sob `/lp/[slug]` deve ter:
```html
<meta name="robots" content="noindex,nofollow" />
```
Sem exceção. Essas páginas não devem aparecer no Google.

### 3. GTM e Meta Pixel em todas as páginas públicas
Incluir GTM (`GTM-NR95XJ6B`) e Meta Pixel (`1442151020219648`) no layout principal.
Em LPs: manter ambos (para rastreamento de conversão de campanhas).
Em páginas noindex: manter rastreamento, mas garantir que o noindex está no head.

### 4. Sem cookie consent por ora
Não implementar banner de cookies neste momento.

### 5. Template v0 é referência visual, não código
O arquivo `.zip` em `_references/` é de um e-commerce de outdoor gear (VILDMARK). A identidade visual e os componentes servem de inspiração e base técnica, mas a estrutura de conteúdo deve ser completamente adaptada para um espaço de eventos (sem produtos, sem carrinho, sem SKUs).

---

## Estrutura de fotos

```
_references/Photos/          ← fotos brutas do cliente (GITIGNORE)
  ├── 25.10 Inauguração/
  ├── ALBUM PREVIA CASAMENTO L+N/
  ├── Ensaio-guinza/
  └── Variadas/

public/images/               ← fotos otimizadas para uso no site
  ├── hero/                  ← fotos do hero da home
  ├── gallery/               ← galeria de eventos realizados
  ├── spaces/                ← fotos das estruturas e ambientes
  └── logo/                  ← logos exportados para web (PNG/SVG otimizados)
```

O cliente envia fotos para `_references/Photos/`. A curadoria final (qual foto vai pro site, em qual pasta) é manual do user. Claude renomeia, otimiza, gera metadados.

### Estrutura `/public/images/`

```
/public/images/
├── hero/                 ← 5 imgs above-fold da home (ficam separadas por serem priority)
├── logo/                 ← logos exportados (SVG)
├── events/[slug]/        ← case studies, UMA pasta por evento real (alimenta /eventos-realizados/[slug])
│   ├── cover.webp
│   ├── NN-descricao.webp
│   └── meta.json
└── scenes/                ← assets reutilizáveis em blog e páginas institucionais
    │                         (taxonomia ANINHADA, espelho 1:1 de _references/Photos/scenes/)
    ├── pessoas/{casal,noiva,noivo,dia-da-noiva,dia-do-noivo,padrinhos,pajens,convidados,pessoas-dancando}
    ├── decoracao/{mesa-de-bolo-e-doces,decoracao-mesas,decoracao-flores,cerimonia-ar-livre,espaco-instagramavel,mesa-de-bem-casados,mesa-de-pais,pista-de-danca}
    ├── atracoes/{animadores,banda,orquestra,maquina-pelucias,massagem,telao-led,album-fotos-polaroid,receptivo-espumante}
    │   └── brincadeiras/{danca-da-cordinha,jogando-buque,jogando-whiskie,quebrando-pratos}
    ├── ambientes/{salao,entrada-salao,marquise,varanda,area-verde,gramado}
    ├── bancos-gerais/{corporativo}
    └── bar-de-drinks, buffet, buque-noiva, vestido-noiva
```

> A pasta de origem em `_references/Photos/scenes/<Grupo>/<sub>/` DEFINE a categoria de destino.
> Nomes de arquivo: `espaco-coral-<grupo>-<sub>-NN.webp` (sequencial). NÃO recriar a antiga
> convenção plana (`scenes/casamentos`, `scenes/atracoes-musica`) — foi substituída por esta.

### Workflow de imagens — divisão de responsabilidades

**Você (user):** seleciona fotos e despeja em `events/[slug]/` ou `scenes/[tema]/` com nome e formato originais (`IMG_1234.HEIC`, `foto.jpg`, etc). Não precisa renomear, converter ou avisar nada.

**Claude:** detecta arquivos brutos, escolhe nome SEO-friendly, converte para WebP com config certa, deleta original, atualiza `meta.json` (events) e `data/images-usage.json`. Reporta o que fez.

**Promoção events → scenes (sem duplicação manual):** se a mesma foto serve como case study E como cena reutilizável, o user copia o **mesmo arquivo bruto** para as duas pastas (`events/[slug]/IMG_1234.HEIC` + `scenes/[tema]/IMG_1234.HEIC`). Mesmo nome = sinal automático de link no `usage.json`.

### Regras que Claude DEVE seguir ao escolher imagens

1. **Sempre consultar `data/images-usage.json`** antes de escolher uma foto para blog ou seção institucional, priorizando as menos usadas dentro da categoria adequada.
2. **Avisar proativamente** quando:
   - Estiver prestes a usar uma foto pela 3ª vez em contextos diferentes
   - Uma categoria de `scenes/` tiver >70% das fotos com uso ativo
   - Categoria estiver esgotada ou inexistente para o tema solicitado
3. **Antes de pedir fotos novas ao fotógrafo,** olhar primeiro o banco bruto em `_references/Photos/` (estoque de reposição: Inauguração, Casamento L+N, Ensaio Guinza, EverTwo, Variadas, Selecionadas).

### Scripts disponíveis

- `npm run images:build-scenes` — regenera `public/images/scenes/` a partir da taxonomia curada em `_references/Photos/scenes/` (pasta = categoria; WebP 1080px/q60; nomes SEO sequenciais; alt por categoria). Rodar após despejar fotos novas numa categoria. HEIC não é suportado pelo sharp no Windows: converter para JPG antes.
- `npm run images:optimize` — scanner recursivo que converte qualquer bruto (jpg, png, heic) para WebP em hero/, events/, scenes/
- `npm run images:scan` — atualiza `data/images-usage.json` varrendo `/app`, `/components`, `/content`, `/lib`
- `npm run images:report` — relatório de saúde do banco no terminal (categorias esgotando, fotos super-usadas, candidatas a swap)

### Resoluções e qualidade

| Uso | Largura | Qualidade WebP |
|---|---|---|
| `hero/*` | 1280px | 60 |
| `events/*/cover.webp` | 1280px | 65 |
| `events/*/NN-*.webp` | 1080px | 60 |
| `scenes/*/*.webp` | 1080px | 60 |

Sempre `next/image` com prop `sizes` correta. Above-the-fold = `priority`.

Plano completo de governança: `C:\Users\Lin\.claude\plans\qual-a-melhor-forma-tender-meteor.md`

---

## Estrutura de pastas do projeto

```
/app                         ← rotas e páginas (Next.js App Router)
/components
  /ui                        ← shadcn/ui (não editar diretamente)
  /sections                  ← seções de página (hero, gallery, testimonials…)
  /layout                    ← header, footer, nav
/content
  /blog                      ← arquivos MDX de posts (futuro)
/public
  /images                    ← imagens do site (veja acima)
/docs                        ← documentação do projeto (este diretório)
_references/                 ← GITIGNORE — assets brutos
```

---

## Documentação auxiliar

| Arquivo | Conteúdo |
|---|---|
| [docs/diretrizes-blog.md](docs/diretrizes-blog.md) | Fatos do negócio e regras editoriais que todo artigo do blog deve seguir |
| [docs/business-context.md](docs/business-context.md) | Dados do negócio, estrutura física, público-alvo, presença digital |
| [docs/brand-identity.md](docs/brand-identity.md) | Posicionamento, paleta, tipografia, tom de voz, o que evitar |
| [docs/seo-strategy.md](docs/seo-strategy.md) | SEO técnico, local, palavras-chave, schema, blog |
| [docs/content-architecture.md](docs/content-architecture.md) | Mapa do site, hierarquia de páginas, estrutura de navegação |
| [docs/technical-direction.md](docs/technical-direction.md) | Stack, configurações, estrutura de pastas, performance |
| [docs/paid-traffic.md](docs/paid-traffic.md) | Landing pages de campanha, noindex, rastreamento, conversão |
| [docs/open-questions.md](docs/open-questions.md) | Decisões ainda em aberto |

---

## Regras de performance (SSG)

O site é servido como SSG estático via Vercel. Todas as decisões técnicas devem ser compatíveis com `output: static` ou geração estática padrão do Next.js.

### Animações de scroll
- **Nunca usar `useState` para armazenar progresso de scroll.** Isso causa re-render React a cada pixel — use `useRef` nos elementos animados e mute `element.style` diretamente no handler.
- Usar `{ passive: true }` em todos os `addEventListener("scroll", ...)`.
- Preferir `requestAnimationFrame` para animações com múltiplas propriedades.

### Imagens
- Todas as imagens devem estar em **WebP** (resoluções e qualidades por tipo: ver tabela na seção "Workflow de imagens" acima).
- Todo `<Image fill>` deve ter a prop `sizes` adequada ao contexto (ex: `"(max-width: 768px) 100vw, 50vw"`).
- Imagens above-the-fold devem ter `priority`.
- Rodar `npm run images:optimize` após despejar fotos brutas em `events/` ou `scenes/`.

### Grain overlay
- O `.grain::after` em `globals.css` usa textura estática (sem `animation`). **Nunca reintroduzir a `animation: grain`** — causa repaints contínuos em toda a página.
- O keyframe `grain` foi removido do `tailwind.config.ts` por este motivo.

### Carregamento de componentes
- Seções below-fold devem usar `next/dynamic` sem `ssr: false` (manter SSR para SSG).
- Hero e Philosophy ficam como imports estáticos (above-the-fold).

---

## Instruções para agentes e colaboradores

1. **Leia este arquivo inteiro antes de qualquer ação.**
2. **Consulte os docs auxiliares** para decisões de design, SEO, conteúdo e técnicas.
3. **Nunca invente dados do negócio.** Se precisar de informação não documentada, pergunte ao cliente.
4. **Nunca remova `noindex`** de páginas sob `/lp/`.
5. **Nunca commite `_references/`.**
6. **Nunca exiba preços.** CTA sempre → WhatsApp `(16) 99129-4178`.
7. **Blog:** Claude é o editor. Escrever arquivos `.mdx` em `/content/blog/`. Não criar painel de administração. Antes de escrever qualquer artigo, ler `docs/diretrizes-blog.md`.
8. **Imagens:** sempre usar `next/image` com `alt` descritivo e prop `sizes`. Nunca usar `<img>` diretamente.
9. **Galeria:** estática. Fotos em `/public/images/gallery/`. Sem CMS.
10. **Adaptação do template v0:** o template era e-commerce. Adaptar seções: "produtos" → tipos de eventos; CTAs de compra → WhatsApp; sem lógica de carrinho ou preços.
11. **Nunca usar em dash (—)** em textos gerados para o site ou documentação. Usar vírgula, ponto, dois-pontos ou reescrever a frase.
12. **Fontes e citações no blog:** só citar uma estatística se ela constar em `docs/blog-fontes-verificadas.md` OU se você a verificar por WebFetch (o número aparece literal na URL, em contexto compatível) e registrar lá na mesma passada. **Nunca inventar número ou URL.** Nunca citar `timeanddate.com` nem "INMET, Estação de Batatais" (não existe): pôr do sol via WeatherSpark, clima via Climatempo. **Nunca usar estatística de casamento (IBGE de casamentos, The Knot, CNDL 79%, ticket médio) em artigo de festa de 15 anos** (para 15 anos, só o setor de eventos Sebrae/ABEOC ou experiência do espaço). Toda citação com o FLOW triple (ano na prosa + publisher inline + URL + "acesso em mês/ano"). Regras completas: seção "Fontes e citações" em `docs/diretrizes-blog.md`.
