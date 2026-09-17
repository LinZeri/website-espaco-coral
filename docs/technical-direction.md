# Direcionamento Técnico — Espaço Coral

## Stack

| Tecnologia | Versão / Detalhe | Justificativa |
|---|---|---|
| Next.js | 14+ (App Router) | Performance, SSG nativo, SEO-friendly, Vercel integration |
| TypeScript | Latest stable | Type safety, melhor DX, padrão de mercado |
| Tailwind CSS | v3+ | Utility-first, performance, consistência com o template v0 |
| shadcn/ui | new-york style | Componentes acessíveis, customizáveis, sem runtime overhead |
| React | Via Next.js | RSC (React Server Components) habilitado |

## Deploy e domínio

| Item | Valor |
|---|---|
| Plataforma | Vercel |
| Domínio | coraleventos.com.br |
| Branch principal | `main` |
| Deploy automático | Push para `main` → Vercel deploy automático |

---

## Geração de páginas — SSG

**Todas as páginas públicas devem ser geradas estaticamente (SSG).**

Justificativa:
- Performance máxima: páginas servidas como HTML estático via CDN
- SEO: crawlers recebem HTML completo imediatamente
- Custo: Vercel free tier suporta o volume esperado
- Simplicidade: sem banco de dados, sem servidor a manter

**Exceções ao SSG:** nenhuma prevista para o site atual.

---

## Analytics e rastreamento

| Ferramenta | ID / Detalhe | Onde incluir |
|---|---|---|
| Google Tag Manager | `GTM-NR95XJ6B` | Em todas as páginas (layout.tsx) |
| Meta Pixel | `1442151020219648` | Via GTM ou diretamente em layout.tsx |

**Implementação recomendada:**
```tsx
// app/layout.tsx
import Script from 'next/script'

// GTM no <head>
<Script id="gtm" strategy="afterInteractive">
  {`(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-NR95XJ6B');`}
</Script>

// GTM noscript no <body>
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NR95XJ6B" ...></iframe>
</noscript>
```

O Meta Pixel pode ser configurado via GTM para evitar código duplicado.

**Nas landing pages `/lp/`:** manter ambos os rastreamentos — são críticos para mensurar conversões de campanha.

---

## Estrutura de pastas

```
website-espaco-coral/
│
├── app/                          ← Rotas e páginas (Next.js App Router)
│   ├── layout.tsx                ← Layout raiz (GTM, fonts, providers)
│   ├── page.tsx                  ← Home
│   ├── estrutura/
│   │   └── page.tsx
│   ├── eventos/
│   │   └── page.tsx
│   ├── galeria/
│   │   └── page.tsx
│   ├── contato/
│   │   └── page.tsx
│   ├── blog/                     ← (futuro)
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── lp/                       ← Landing pages (NOINDEX)
│   │   └── [slug]/page.tsx
│   ├── sitemap.ts                ← Sitemap automático
│   └── robots.ts                 ← robots.txt programático
│
├── components/
│   ├── ui/                       ← shadcn/ui (não editar diretamente)
│   ├── sections/                 ← Seções de página
│   │   ├── hero-section.tsx
│   │   ├── gallery-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── events-section.tsx
│   │   └── ...
│   └── layout/                   ← Header, footer, nav
│       ├── header.tsx
│       ├── footer.tsx
│       └── whatsapp-cta.tsx
│
├── content/                      ← (futuro)
│   └── blog/                     ← Arquivos MDX de posts
│
├── lib/                          ← Utilitários, helpers
│   └── utils.ts
│
├── public/
│   └── images/
│       ├── hero/                 ← Fotos do hero da home
│       ├── gallery/              ← Galeria de eventos
│       ├── spaces/               ← Fotos das estruturas e ambientes
│       └── logo/                 ← Logos exportados para web
│
├── docs/                         ← Documentação do projeto
│   ├── business-context.md
│   ├── brand-identity.md
│   ├── seo-strategy.md
│   ├── content-architecture.md
│   ├── technical-direction.md   ← Este arquivo
│   ├── paid-traffic.md
│   └── open-questions.md
│
├── _references/                  ← GITIGNORE — assets brutos do cliente
│   ├── Logo/                     ← SVGs originais do logo
│   ├── Photos/                   ← Fotos brutas do cliente
│   │   ├── 25.10 Inauguração/
│   │   ├── ALBUM PREVIA CASAMENTO L+N/
│   │   ├── Ensaio-guinza/
│   │   └── Variadas/
│   └── *.zip                     ← Template v0 e outros assets
│
├── CLAUDE.md                     ← Documento mestre
├── .gitignore                    ← Incluir _references/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json               ← Configuração shadcn/ui
└── package.json
```

---

## `.gitignore` — regras obrigatórias

```gitignore
# Dependencies
node_modules/

# Next.js build
.next/
out/

# Environment
.env
.env.local
.env.*.local

# Assets brutos do cliente — NUNCA commitar
_references/

# OS
.DS_Store
Thumbs.db
```

---

## Performance — metas e estratégias

### Core Web Vitals

| Métrica | Meta |
|---|---|
| LCP | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |

### Estratégias

**Imagens:**
- `next/image` sempre — compressão automática, WebP/AVIF, lazy loading
- `priority` nas imagens above-the-fold (hero) para melhorar LCP
- Sempre definir `width` e `height` para evitar CLS

**Fonts:**
- `next/font` para PP Editorial New e Inter
- `display: 'swap'` para evitar FOIT
- Fonts pré-carregadas no `<head>`

**JavaScript:**
- SSG elimina necessidade de hidratação complexa no critical path
- Componentes de animação com `will-change-transform` (já usado no template v0)
- Lazy load de componentes pesados (lightbox da galeria, etc.)

**CSS:**
- Tailwind purge automático — apenas classes usadas no bundle
- Gradientes de ouro: CSS puro, zero overhead

---

## Tipografia — configuração Next.js

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const ppEditorialNew = localFont({
  src: [
    { path: '../public/fonts/PPEditorialNew-Regular.woff2', weight: '400' },
    { path: '../public/fonts/PPEditorialNew-Light.woff2', weight: '300' },
    { path: '../public/fonts/PPEditorialNew-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-display',
  display: 'swap',
})
```

**Nota:** PP Editorial New é uma fonte comercial. Verificar licença de uso web antes de adquirir. Arquivo deve ficar em `/public/fonts/` (não em `_references/`).

---

## Template v0 — uso como referência

O arquivo `.zip` em `_references/` contém o template VILDMARK do v0.app. Ele serve como:
- Referência de componentes Tailwind/shadcn/ui
- Referência de animações CSS (globals.css)
- Referência de estrutura de seções (hero, gallery, testimonials)
- Referência de padrões de performance (will-change, lazy loading)

**NÃO fazer:**
- Copiar o código diretamente sem adaptar para eventos
- Manter referências a "produtos", "coleções" ou e-commerce
- Usar imagens do template
- Manter a identidade VILDMARK/EVASION

---

## Shadcn/ui — configuração base

```json
{
  "style": "new-york",
  "tailwind": { "baseColor": "neutral", "cssVariables": true },
  "rsc": true,
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

---

## Metadata SEO — padrão Next.js

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://coraleventos.com.br'),
  title: {
    default: 'Espaço Coral | Festas e Eventos em Batatais, SP',
    template: '%s | Espaço Coral — Batatais, SP',
  },
  description: 'Espaço premium para casamentos, festas de 15 anos e eventos em Batatais, SP. 12.000 m², capacidade para 320 convidados.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://coraleventos.com.br',
    siteName: 'Espaço Coral',
  },
}
```

---

## Repositório Git

- **GitHub:** repositório ainda não criado — a criar no início do desenvolvimento
- Branch principal: `main`
- Conectar ao Vercel via integração GitHub para deploy automático
- Nunca fazer push de `_references/` — garantido pelo `.gitignore`
