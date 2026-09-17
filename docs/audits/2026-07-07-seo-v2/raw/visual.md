# Auditoria Visual — coraleventos.com.br
Data: 2026-07-07 | Ferramenta: Playwright (Chromium) 1.61.1

## Metodologia e validação de cache

Rodada anterior havia capturado uma versão obsoleta (aparência de WordPress) por causa de cache.
Nesta rodada, todas as capturas usaram:
- Cache-busting via query string `?v=20260707b` (e variações `c`/`d`/`e`/`f` nos scripts de investigação complementares) em todas as URLs.
- Contexto novo do navegador (`browser.new_context(...)`) para cada bateria de testes, sem reaproveitar cache/estado.
- Validação obrigatória: `page.content()` inspecionado em busca da string `/_next` antes de aceitar qualquer screenshot como válido.

**Resultado da validação:** as 8 capturas principais (4 páginas × 2 viewports) contêm `/_next` no HTML (marcador `OK` em todas). Nenhuma captura precisou ser descartada. O site está servindo o build Next.js atual, não a versão WordPress em cache.

Páginas e URLs testadas:
- Home: `https://coraleventos.com.br/`
- Casamentos: `https://coraleventos.com.br/eventos/casamentos`
- Contato: `https://coraleventos.com.br/contato`
- Post do blog: `https://coraleventos.com.br/blog/casamento-ar-livre-batatais`

Viewports: Desktop 1920×1080, Mobile 390×844 (emulação `is_mobile=true`, `has_touch=true`, UA de iPhone). Screenshots salvos em `docs/audits/2026-07-07-seo-v2/screenshots/`.

---

## Resumo executivo

| Página | Desktop acima da dobra | Mobile acima da dobra | CTA WhatsApp visível (mobile) | Overflow horizontal |
|---|---|---|---|---|
| Home | OK — H1 "CORAL" + imagem hero + nav completa | H1 visível, mas **CTA WhatsApp e menu hambúrguer fora da área visível** | **NÃO** (crítico) | **SIM** (crítico, mobile e desktop) |
| Casamentos | OK — H1 "Casamentos em Batatais" + foto | OK — H1 visível, nav completa | Sim (visível, canto inferior direito) | Não |
| Contato | OK — H1 "Fale Conosco" + foto da fachada | OK — H1 visível, nav completa | Sim (visível) | Não |
| Blog post | OK — H1 do artigo, meta de autor/data | OK — H1 visível, nav completa | Sim (visível) | Não |

CLS medido via `PerformanceObserver({type:'layout-shift'})` durante o carregamento: **desprezível em todas as páginas** (desktop ≈ 0,0004; mobile = 0). Não há indício de layout shift perceptível.

---

## Achados detalhados

### 1. [CRÍTICO] Home mobile: viewport de layout "preso" em ~708px, quebrando position:fixed

**O que foi observado:** no screenshot acima-da-dobra da home em mobile (390×844), aparecem apenas o hero (foto + texto "CORAL") e o pill da logo "Coral" no canto superior esquerdo. **O ícone de menu hambúrguer e o botão flutuante do WhatsApp não aparecem em lugar nenhum da tela.** Nas outras 3 páginas (casamentos, contato, blog), o mesmo botão do WhatsApp aparece normalmente no canto inferior direito.

**Investigação técnica (via `page.evaluate`):**
- `window.visualViewport.width` = 390 (correto, bate com o dispositivo).
- `window.innerWidth` = 708 e `window.innerHeight` ≈ 1533–1206 (variou conforme a altura do viewport testada) — ou seja, o *layout viewport* usado pelo Chromium para elementos `position: fixed` está sendo calculado como se a tela tivesse ~708px de largura, não 390px.
- `document.documentElement.clientWidth` = 390 (correto) vs `scrollWidth` = 708 → **overflow horizontal real de ~318px (82% a mais que a tela)**.
- O botão do WhatsApp (`position: fixed; bottom-6 right-6`) tem `getBoundingClientRect()` = `top: 1465px, left: 632px` (em viewport 844px de altura) — muito abaixo e à direita da área visível. O computed style confirma `bottom: 24px; right: 24px` (corretos), mas o `top`/`left` resolvidos batem com um contêiner de ~708×1533/1206, não com a tela real.
- **Reproduzido em duas configurações independentes** para descartar artefato do Playwright: (a) viewport manual 390×844 com UA custom de iPhone, e (b) preset oficial `playwright.devices["iPhone 13"]` (390×664, DSF 3, WebKit UA). Em ambos os casos o `innerWidth` ficou em 708 e o botão do WhatsApp saiu da tela — ou seja, **não é um artefato de emulação do Playwright, é um comportamento reproduzível do próprio site**, condizente com o comportamento real de navegadores mobile quando o conteúdo força overflow horizontal (fixed elements passam a se posicionar em relação ao *layout viewport*, não ao *visual viewport*, até o usuário fazer scroll horizontal).
- Investigação da causa raiz (parcialmente conclusiva): `find_overflow.py` localizou vários elementos na home cujo `right` ultrapassa 390px, entre eles cards de um carrossel de depoimentos (`flex gap-6 px-6`, cards com `width: 331.5–342px`) e do carrossel de fotos do hero (`w-[85vw] flex-shrink-0`). `find_containing_block.py` **descartou** a hipótese mais comum (um ancestral com `transform`/`filter`/`perspective`/`will-change` quebrando o *containing block* do elemento fixed) — não foi encontrado nenhum ancestral do botão do WhatsApp com essas propriedades; o pai direto é o `<body>`, sem transform. `document.body`/`html` também têm `overflow-x: visible` (nenhuma contenção de overflow ali). **A causa exata (qual componente força o layout viewport a 708px) não foi identificada com certeza — recomenda-se investigação de código nos componentes de carrossel da home (`Hero`/depoimentos) e em qualquer hook de JS que leia `window.innerWidth` no mount.**
- Esse bug **não ocorre** nas páginas casamentos/contato/blog (scrollWidth == clientWidth, botão do WhatsApp visível corretamente).

**Impacto:** na página mais importante do site (home), usuários mobile não veem nem conseguem tocar no CTA de WhatsApp nem no menu de navegação sem antes rolar a página horizontalmente — algo que a esmagadora maioria dos usuários não faz. Isso derruba a conversão do canal único de contato (WhatsApp) justamente na porta de entrada do site.

**Severidade:** Crítica. Recomenda-se correção prioritária.

### 2. [MÉDIO] Home desktop: overflow horizontal real (sem impacto visual imediato)

`document.documentElement.scrollWidth` = 2712 vs `clientWidth` = 1920 (overflow de ~792px) na home em desktop. Diferente do mobile, aqui o botão do WhatsApp e o header continuam visíveis corretamente na dobra (confirmado visualmente no screenshot), mas o overflow real existe e provavelmente gera uma barra de rolagem horizontal indesejada ao usuário que rolar a página até o fim, ou expõe conteúdo do carrossel além do limite pretendido. Mesma causa provável do item 1 (carrossel de depoimentos/hero sem contenção adequada de largura).

**Severidade:** Média.

### 3. [MÉDIO] Tap targets abaixo do mínimo recomendado (mobile, todas as páginas)

Verificação de tamanho de área de toque (mínimo recomendado: 44×44px, ideal 48×48px) nas 4 páginas em mobile:

- **Botão "Abrir menu" (hambúrguer):** 28×28px em todas as páginas — bem abaixo do mínimo.
- **Link/logo "Coral" no header:** 63×36px — altura abaixo de 44px.
- **Botão flutuante do WhatsApp:** 52×44px — no limite mínimo aceitável (altura exatamente 44px).
- **Post do blog:** link "Voltar para o blog" 172×16px (altura bem pequena) e badge "Casamento" 107×24px (este último provavelmente não é interativo, apenas uma tag visual — impacto baixo).

**Severidade:** Média (hambúrguer é o mais crítico dos tap targets por ser navegação primária em mobile).

### 4. H1 e above-the-fold

Todas as 4 páginas têm H1 visível na dobra tanto em desktop quanto em mobile, confirmado via `getBoundingClientRect` (`visibleInViewport: true` em todos os casos) e visualmente nos screenshots:
- Home: wordmark gigante "CORAL" sobre foto do salão (funciona como H1 visual/hero, mas cabe confirmar no código se este elemento é de fato a tag `<h1>` semântica da página — recomenda-se checagem separada de SEO/semântica).
- Casamentos: "Casamentos em Batatais" sobre foto do casal.
- Contato: "Fale Conosco" sobre foto da fachada ao entardecer.
- Blog: título completo do artigo "Casamento ao Ar Livre em Batatais: Guia Prático para Noivas em 2026", com meta de categoria/data/autor/tempo de leitura visíveis.

Nenhum problema de sobreposição de texto ou corte de conteúdo (overflow de texto) foi observado nesses elementos.

### 5. Legibilidade

Contraste bom em todas as páginas: títulos serifados brancos sobre fotos com overlay escuro (casamentos, contato, blog) e overlay claro/pill na home. Texto de corpo em fundo branco com boa leitura (contato, blog). Nenhum problema de legibilidade identificado nas áreas capturadas.

### 6. CLS (Cumulative Layout Shift) visual

Medido com `PerformanceObserver` de `layout-shift` durante carregamento real de cada página/viewport:

| Página | Desktop | Mobile |
|---|---|---|
| Home | 0.0004 (1 shift, nav/logo) | 0 |
| Casamentos | 0.0004 (1 shift, nav/logo) | 0 |
| Contato | 0.0004 (1 shift, nav/logo) | 0 |
| Blog post | 0.0004 (1 shift, nav/logo) | 0 |

Valores extremamente baixos (limite "bom" do Core Web Vitals é <0.1). Sem indício de CLS perceptível.

---

## Lista de issues por severidade

**Crítico**
1. Home mobile: CTA de WhatsApp e menu hambúrguer ficam fora da área visível da tela por causa de overflow horizontal / layout viewport inflado (~708px em vez de 390px). Usuário não consegue converter via WhatsApp nem navegar pelo menu na home sem rolar horizontalmente.

**Médio**
2. Home desktop: overflow horizontal real (scrollWidth 2712 vs 1920px), mesma causa provável do item 1, sem impacto visual imediato na dobra mas gera barra de rolagem horizontal indevida.
3. Botão "Abrir menu" (hambúrguer) com tap target de 28×28px em todas as páginas mobile — abaixo do mínimo de acessibilidade recomendado (44×44px).
4. Logo/link do header com 63×36px (altura abaixo de 44px) em mobile.

**Baixo**
5. Botão flutuante do WhatsApp com 52×44px — no limite mínimo aceitável, mas sem folga.
6. Link "Voltar para o blog" no post (172×16px) e badge de categoria (107×24px) com áreas de toque pequenas.

**Sem problema (validado positivamente)**
- CLS desprezível em todas as páginas/viewports.
- H1 visível acima da dobra em todas as páginas testadas, desktop e mobile.
- CTA de WhatsApp visível e funcional em mobile nas páginas Casamentos, Contato e Blog.
- Nenhum overflow horizontal detectado em Casamentos, Contato e Blog (nem desktop nem mobile).
- Boa legibilidade/contraste em todas as páginas testadas.

---

## Observação sobre a investigação de causa raiz

A causa exata do bug de overflow/layout viewport na home (item crítico 1) não foi totalmente identificada neste teste visual — foi descartada a hipótese de um ancestral com `transform`/`filter`/`will-change` quebrando o *containing block* do botão fixo, e foram localizados componentes candidatos (carrossel de depoimentos e carrossel de fotos do Hero, ambos usando `flex`/`w-[Nvw]` sem contenção clara de overflow). Recomenda-se que um agente de investigação técnica/código confirme qual componente da Home está causando o `window.innerWidth` inflado para ~708px e aplique `overflow-x: hidden` no contêiner correto (ou corrija o cálculo de largura do carrossel).
