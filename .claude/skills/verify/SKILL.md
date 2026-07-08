---
name: verify
description: Como buildar, rodar e observar o site Espaço Coral (Next.js SSG) para verificar mudanças visuais e de comportamento em runtime.
---

# Verificação runtime — website Espaço Coral

## Subir o app

```powershell
npm run dev   # background; porta 3000, pronto em ~10s
```

Smoke test (PowerShell; curl do Git Bash pode ser bloqueado pelo sandbox):

```powershell
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
```

## Screenshots (Playwright, sem dependência no projeto)

Playwright NÃO está no package.json. Usar o CLI via npx (browsers já instalados em `%LOCALAPPDATA%\ms-playwright`; se faltar, `npx playwright install chromium`):

```powershell
npx playwright screenshot --browser=chromium --viewport-size="1440,900" --wait-for-timeout=3000 "http://localhost:3000" out.png
npx playwright screenshot --browser=chromium --viewport-size="390,844" --wait-for-timeout=3000 "http://localhost:3000" out-mobile.png
```

Gotcha: `--device="iPhone 13"` falha (exige WebKit não instalado). Emular mobile só por viewport.

## Scripts Playwright (scroll, medições no DOM)

Para cenas de scroll pinadas (hero, philosophy, technology, gallery usam `sticky` + espaçador de 200vh), screenshot estático não basta: rodar um script `.cjs` com `page.evaluate(window.scrollTo...)`. O módulo `playwright` resolve via cache do npx:

```powershell
$env:NODE_PATH = "<dir em $env:LOCALAPPDATA\npm-cache\_npx que contenha node_modules\playwright na versão compatível com os browsers>"
node script.cjs
```

Localizar o dir: iterar `Get-ChildItem "$env:LOCALAPPDATA\npm-cache\_npx" -Directory` testando `node_modules\playwright`. Se houver mais de um, usar o que não reclamar de browser ausente (versões antigas apontam para builds de browser antigos).

Usar `.cjs` + `require` (NODE_PATH não funciona com import ESM).

## Fluxos que valem dirigir

- Home: hero pinado (painel `.hero-panel`, 88vh desktop / 85vh mobile, com faixa branca inferior proposital) + 200vh de scroll de animação; timeline: CORAL some → grade de fotos forma → tagline entra com scrim.
- Pontos de scroll úteis: `innerHeight * 1.4` (meio da cena), `* 2` (desafixação exata), `* 2.5` (transição para PhilosophySection "Casamentos & Eventos.").

## Gotchas de ambiente

- Sandbox: Bash (Git Bash) pode bloquear `curl`/`sleep` e leitura fora de `W:\Etuos Clientes`; preferir PowerShell e manter artefatos dentro do repo (ex: pasta temporária `.verify-shots/`, deletar depois).
