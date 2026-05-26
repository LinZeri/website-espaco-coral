# OG Images — Espaço Coral

Imagens 1200x630px usadas em compartilhamentos sociais (Facebook, Instagram, WhatsApp, X/Twitter, LinkedIn) e como preview em mensagens.

## Especificações técnicas

- **Dimensões:** 1200x630 px (proporção 1.91:1)
- **Formato:** JPG (preferido) ou PNG
- **Peso:** < 200 KB (idealmente < 100 KB)
- **Espaço seguro:** manter logo e texto principal a pelo menos 80px das bordas (algumas plataformas cortam)
- **Texto:** mínimo 60px de altura para legibilidade em thumbnails
- **Cor de fundo:** harmônica com a paleta da marca (preto + ouro champanhe `#C9A96E`)

## Arquivos esperados

| Arquivo | Página | Conteúdo sugerido |
|---|---|---|
| `home.jpg` | `/` | Foto hero do espaço + logo + tagline "Espaço para Eventos em Batatais, SP" |
| `eventos.jpg` | `/eventos` | Composição de 3 fotos (casamento + 15 anos + corporativo) + título "Eventos no Espaço Coral" |
| `casamentos.jpg` | `/eventos/casamentos` | Cerimônia ao ar livre + "Casamentos em Batatais — Espaço Coral" |
| `15-anos.jpg` | `/eventos/15-anos` | Salão decorado para 15 anos + "Festas de 15 Anos em Batatais — Espaço Coral" |
| `corporativo.jpg` | `/eventos/corporativo` | Salão profissional + "Eventos Corporativos em Batatais — Espaço Coral" |
| `estrutura.jpg` | `/estrutura` | Vista panorâmica do salão + "12.000 m² de Estrutura Premium — Espaço Coral" |
| `galeria.jpg` | `/galeria` | Mosaico de fotos de eventos + "Galeria — Espaço Coral" |
| `contato.jpg` | `/contato` | Fachada do espaço + WhatsApp em destaque + "Fale Conosco — (16) 99129-4178" |

## Status

- [ ] `home.jpg`
- [ ] `eventos.jpg`
- [ ] `casamentos.jpg`
- [ ] `15-anos.jpg`
- [ ] `corporativo.jpg`
- [ ] `estrutura.jpg`
- [ ] `galeria.jpg`
- [ ] `contato.jpg`

## Como gerar

Opções:
1. **Designer manual** (Figma/Photoshop) — recomendado para a home (peça-chave)
2. **AI generation** via Gemini/nanobanana — usar `/blog image` ou skill `seo-image-gen` com prompt baseado nas fotos brutas em `_references/Photos/`
3. **Template programático** — criar `app/og/[slug]/route.tsx` com `next/og` (ImageResponse) usando layout fixo + foto + texto via parâmetros

## Validação

Após upload, validar cada URL em:
- https://www.opengraph.xyz/
- https://cards-dev.twitter.com/validator
- https://developers.facebook.com/tools/debug/
- https://www.linkedin.com/post-inspector/

## Fallback

Enquanto as imagens não estiverem prontas, as referências em `metadata.openGraph.images` apontam para arquivos inexistentes — o Next.js retornará 404 e as plataformas sociais farão fallback para imagens da própria página (primeira `<img>` ou hero). **Prioridade:** `home.jpg` primeiro (afeta brand search), depois `casamentos.jpg` e `15-anos.jpg` (afetam compartilhamento das LPs e service pages).
