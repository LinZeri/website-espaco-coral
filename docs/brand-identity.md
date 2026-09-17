# Identidade de Marca — Espaço Coral

## Posicionamento

O Espaço Coral é um espaço de eventos **alto padrão**. Tudo no site — visual, texto, ritmo, hierarquia — deve reforçar essa percepção. O site precisa fazer o visitante sentir que está olhando para algo especial antes mesmo de ler uma palavra.

**Palavras-chave de marca:** sofisticado · elegante · acolhedor · confiável · emocional · aspiracional

---

## O que evitar

Qualquer elemento que faça o espaço parecer:
- popular demais ou acessível a qualquer orçamento
- genérico (templates sem personalidade, fotos stock)
- barato (tipografias ruins, cores saturadas demais, botões berrantes)
- improvisado (layout desorganizado, inconsistências visuais)
- visualmente poluído (muita coisa competindo por atenção)

---

## Paleta de cores

### Base — derivada do template v0 (preto/branco premium)

| Token | Cor | Uso |
|---|---|---|
| `--background` | `#FFFFFF` | Fundo principal |
| `--foreground` | `#12100C` | Texto principal (cor do logo) |
| `--primary` | `#12100C` | Elementos primários, botões escuros |
| `--primary-foreground` | `#FFFFFF` | Texto sobre fundo escuro |
| `--secondary` | `#F5F5F5` | Fundos secundários, seções alternadas |
| `--muted-foreground` | `#737373` | Textos de suporte, legendas |
| `--border` | `#E5E5E5` | Bordas, separadores |

### Superfícies quentes — registro editorial (leveza)

Evolução da base: em vez de alternar branco puro com cinza frio e faixas pretas chapadas,
o site usa superfícies bege/creme quentes para transmitir leveza e refinamento editorial
(inspirado em wedding venues franceses). O escuro fica reservado a fotografia, não a painéis sólidos.

| Token | Cor | Uso |
|---|---|---|
| `--sand` | `#EBE3D4` | Bege dos painéis: page-hero das páginas internas e faixas de CTA (antes pretas) |
| `--cream` | `#F4EFE6` | Variação mais clara, para preencher seções alternadas inteiras (ex: depoimentos) |

`--background` (`#FFFFFF`) permanece nas seções principais/hero. O bege só aquece as seções alternadas e as faixas de conversão.

### Acento — Ouro champanhe (adição premium)

| Token | Cor | Uso |
|---|---|---|
| `--accent-gold` | `#C9A96E` | Detalhes, ícones, separadores, highlights |
| `--accent-gold-light` | `#E8D5A3` | Gradiente claro |
| `--accent-gold-dark` | `#A07840` | Gradiente escuro, hover states |

### Gradientes de ouro (CSS puro — zero impacto de performance)

```css
/* Gradiente horizontal decorativo */
background: linear-gradient(90deg, #A07840, #C9A96E, #E8D5A3, #C9A96E, #A07840);

/* Gradiente sutil em seções */
background: linear-gradient(135deg, #FFFFFF 0%, #FDF8F0 50%, #FFFFFF 100%);

/* Texto dourado */
background: linear-gradient(135deg, #C9A96E, #E8D5A3);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Nota sobre a paleta

A cor principal do logo (`#12100C`) é praticamente idêntica ao `#0A0A0A` do template v0 — a paleta base é diretamente compatível. O acento dourado `#C9A96E` não existe no logo; é uma adição estratégica para evocar celebração e luxo sem conflitar com a marca.

---

## Tipografia

### Fontes

| Tipo | Família | Uso |
|---|---|---|
| Display | **PP Editorial New** (serif) | Títulos principais, headlines aspiracionais, nome do espaço em destaque |
| Corpo | **Inter** (sans-serif) | Textos informativos, navegação, formulários, descrições |

**PP Editorial New** é uma fonte serif contemporânea com personalidade editorial e elegante — transmite sofisticação sem parecer antiquada. Funciona bem em tamanhos grandes com tracking reduzido.

**Inter** garante legibilidade perfeita em qualquer tamanho e dispositivo, sem competir com a display.

### Escalas e uso

- Títulos de seção: PP Editorial New, grande (48px+), tracking tight, weight regular ou light
- Subtítulos / copy de apoio: Inter, médio (16–20px), weight regular
- CTAs: Inter, weight medium ou semibold
- Labels e metadados: Inter, pequeno (12–14px), weight medium, uppercase com letter-spacing

### Tamanhos inspirados no template v0

O template usa tamanhos relativos ao viewport (`text-[22vw]`, `text-[12vw]`) para títulos de hero — criar impacto visual em qualquer tela. Essa abordagem deve ser mantida nos momentos aspiracionais do site.

---

## Tom de voz

### Para noivas e celebrações

- Emocional, sonhador, acolhedor
- Fala sobre o momento, não sobre o espaço
- "O lugar perfeito para o dia mais especial da sua vida" — não "temos 320 lugares disponíveis"
- Usa palavras como: eternizar, celebrar, inesquecível, exclusivo, cuidado, detalhe

### Para eventos corporativos e famílias

- Claro, objetivo, profissional
- Destaca estrutura, capacidade, praticidade
- "Espaço completo para o seu evento, do começo ao fim"

### Regras gerais de comunicação

- Nunca mencionar preços — sempre "consulte"
- Nunca prometer o que não foi confirmado
- CTA principal sempre → WhatsApp
- Linguagem em português do Brasil, sem anglicismos desnecessários
- Texto curto e impactante — menos é mais no estilo premium

---

## Referência visual

O template v0 (VILDMARK — outdoor gear) serve como referência de estética, não de conteúdo:

**O que herdar do template:**
- Grid bento no hero com scroll-parallax
- Grain overlay para textura premium
- Animações de reveal (scroll-triggered, suaves)
- Header com backdrop blur
- Clip-path diagonais para transições entre seções
- Proporções generosas de espaço em branco

**O que adaptar:**
- Substituir produtos por tipos de eventos e estrutura do espaço
- Adicionar gradientes de ouro em pontos estratégicos
- Fotos de casamentos e eventos em vez de produtos ao ar livre
- Copy emocional e aspiracional em vez de técnico/aventureiro

---

## Identidade visual existente

### Logos disponíveis (em `_references/Logo/`)

| Arquivo | Descrição | Uso recomendado |
|---|---|---|
| `logo-coral-completo.svg` | Logo completo (símbolo + logotipia) | Header, footer, materiais gerais |
| `logo-coral-logotipia.svg` | Apenas o nome/texto | Contextos onde o símbolo já aparece |
| `logo-coral-simbolo.svg` | Apenas o símbolo geométrico | Favicon, ícone, backgrounds decorativos |

**Cor do logo:** `#12100C` — praticamente preto. O logo é monocromático; a versão em branco pode ser usada sobre fundos escuros.

O símbolo é geométrico-arquitetural — formas angulares aninhadas que evocam estrutura, solidez e sofisticação. Essa linguagem visual deve ser reforçada no site.
