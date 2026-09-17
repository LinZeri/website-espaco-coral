<#
.SYNOPSIS
  Vendoriza (copia) as skills e scripts globais do blog-loop para dentro deste
  repositorio, para que rotinas em nuvem (Claude Code CCR, sem acesso a
  ~/.claude/ desta maquina) consigam usa-los a partir de um clone git puro.

.DESCRIPTION
  Roda manualmente sempre que uma das skills globais blog-* for atualizada em
  ~/.claude/skills/. Nao e automatico de proposito (a skill global e
  compartilhada entre outros projetos e pode evoluir de forma independente).

  Depois de rodar, revise com `git status` / `git diff` e comite manualmente.

.EXAMPLE
  .\.claude\scripts\sync-blog-skills.ps1
#>

$ErrorActionPreference = "Stop"

$Skills = @(
  "blog-loop", "blog-brief", "blog-write", "blog-schema", "blog-seo-check",
  "blog-audit", "blog-rewrite", "blog-factcheck", "blog-strategy"
)

$SrcSkills = Join-Path $env:USERPROFILE ".claude\skills"
$DstSkills = Join-Path $PSScriptRoot "..\skills"

New-Item -ItemType Directory -Force -Path $DstSkills | Out-Null

foreach ($s in $Skills) {
  $from = Join-Path $SrcSkills $s
  $to = Join-Path $DstSkills $s
  if (-not (Test-Path $from)) {
    Write-Warning "skill nao encontrada em $from, pulando: $s"
    continue
  }
  if (Test-Path $to) { Remove-Item -Recurse -Force $to }
  Copy-Item -Recurse $from $to
  Write-Host "synced skill: $s"
}

$SrcScripts = Join-Path $env:USERPROFILE ".claude\scripts"
$Scripts = @("blog_loop_helpers.py", "blog_loop_agent_cli.py")

foreach ($f in $Scripts) {
  $from = Join-Path $SrcScripts $f
  $to = Join-Path $PSScriptRoot $f
  if (-not (Test-Path $from)) {
    Write-Warning "script nao encontrado em $from, pulando: $f"
    continue
  }
  Copy-Item -Force $from $to
  Write-Host "synced script: $f"
}

# blog-loop.js: usado pela tool Workflow nativa DENTRO das rotinas em nuvem
# (confirmado disponivel la via smoke test em 17/09/2026; nao existe neste
# harness local VSCode extension, que por isso usa blog_loop_agent_cli.py).
$SrcWorkflows = Join-Path $env:USERPROFILE ".claude\workflows"
$DstWorkflows = Join-Path $PSScriptRoot "..\workflows"
New-Item -ItemType Directory -Force -Path $DstWorkflows | Out-Null
$wfFrom = Join-Path $SrcWorkflows "blog-loop.js"
$wfTo = Join-Path $DstWorkflows "blog-loop.js"
if (Test-Path $wfFrom) {
  Copy-Item -Force $wfFrom $wfTo
  Write-Host "synced workflow: blog-loop.js"
} else {
  Write-Warning "workflow nao encontrado em $wfFrom, pulando"
}

Write-Host ""
Write-Host "Done. Revise com 'git status' / 'git diff' dentro de .claude/skills/, .claude/scripts/ e .claude/workflows/, e comite manualmente."
