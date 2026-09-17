param([string]$Strategy = "mobile")

$pages = @("/", "/eventos/casamentos", "/estrutura", "/galeria", "/blog", "/blog/guia-casamento-batatais-2027", "/cidades/ribeirao-preto")
$outFile = "w:\Etuos Clientes\Espaço Coral\website-espaco-coral\docs\audits\2026-07-07-seo\raw\psi-$Strategy.jsonl"
if (Test-Path $outFile) { Remove-Item $outFile -Force }

foreach ($p in $pages) {
  $target = [uri]::EscapeDataString("https://coraleventos.com.br$p")
  $api = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=$target&strategy=$Strategy&category=performance"
  $attempt = 0
  $done = $false
  while (-not $done -and $attempt -lt 3) {
    $attempt++
    try {
      $resp = Invoke-RestMethod -Uri $api -TimeoutSec 120
      $lh = $resp.lighthouseResult
      $a = $lh.audits
      $opps = @()
      foreach ($key in $a.PSObject.Properties.Name) {
        $aud = $a.$key
        if ($aud.details -and $aud.details.type -eq "opportunity" -and $aud.details.overallSavingsMs -gt 100) {
          $opps += "$key=$([math]::Round($aud.details.overallSavingsMs))ms"
        }
      }
      $row = [pscustomobject]@{
        page  = $p
        strategy = $Strategy
        score = [math]::Round($lh.categories.performance.score * 100)
        fcp   = $a.'first-contentful-paint'.numericValue
        lcp   = $a.'largest-contentful-paint'.numericValue
        cls   = $a.'cumulative-layout-shift'.numericValue
        tbt   = $a.'total-blocking-time'.numericValue
        si    = $a.'speed-index'.numericValue
        ttfb  = $a.'server-response-time'.numericValue
        weight = $a.'total-byte-weight'.numericValue
        opportunities = ($opps -join "; ")
      }
      $row | ConvertTo-Json -Compress | Add-Content -Encoding utf8 $outFile
      Write-Output "OK $Strategy $p score=$($row.score)"
      $done = $true
    } catch {
      Write-Output "ERR $Strategy $p tentativa $attempt : $($_.Exception.Message)"
      Start-Sleep -Seconds 30
    }
  }
  Start-Sleep -Seconds 18
}
Write-Output "FIM $Strategy"
