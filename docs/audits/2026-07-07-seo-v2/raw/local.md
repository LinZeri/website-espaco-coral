# Re-auditoria SEO Local — Espaço Coral (coraleventos.com.br)

**Data:** 07/07/2026
**Baseline anterior:** `docs/audits/2026-07-07-seo/raw/local.md` (score 68/100)
**Commit de correção auditado:** `077e052` (mesclado em `origin/main` via `5d7ce3e`, portanto em produção)
**Método:** revisão de código (`lib/seo-config.ts`, `lib/schema.ts`, `components/layout/footer.tsx`, `app/cidades/**`) + checagem live via WebFetch (curl bloqueado pelo sandbox desta sessão, ver Limitações) + dados live de Google Business Profile e SERP fornecidos por ferramenta externa (DataForSEO/GBP API) na coordenação da tarefa.

> **Correção 08/07/2026:** o dado de "36 avaliações" usado neste relatório veio de um snapshot da Business Listings API datado de 23/04/2026. O GBP live, verificado pelo cliente em 08/07, mostra **5,0 com 41 avaliações**. Portanto o `reviewCount: 40` do site está defasado em 1 (para menos), não inflado. O gap competitivo (41 vs 316/164/135) e todas as demais conclusões permanecem válidos; a ação correta é atualizar para 41 e criar rotina de sincronização.

## Score SEO Local: 59/100

> Cai em relação ao score de baseline (68) **não porque o site piorou** — na verdade quase todos os itens técnicos e on-page marcados como CRÍTICO/ALTO no baseline foram corrigidos e confirmados em produção. O score cai porque esta rodada incorporou dados live que o baseline não tinha (posição real no local pack para a query de maior intenção comercial, índice de backlinks do domínio, contagem exata de reviews via API do GBP). Esses dados expõem um gap competitivo e de autoridade mais severo do que o baseline havia estimado. Em resumo: **dívida técnica paga, dívida competitiva revelada.**

| Dimensão | Peso | Score | Ponderado |
|---|---|---|---|
| GBP Signals | 25% | 72 | 18.0 |
| Reviews & Reputation | 20% | 50 | 10.0 |
| Local On-Page SEO | 20% | 74 | 14.8 |
| NAP Consistency & Citations | 15% | 42 | 6.3 |
| Local Schema Markup | 10% | 83 | 8.3 |
| Local Link & Authority Signals | 10% | 12 | 1.2 |
| **Total** | | | **58.6 → 59** |

**Tipo de negócio:** brick-and-mortar híbrido com service area declarada (8 municípios: Batatais + Ribeirão Preto, Franca, Sertãozinho, Brodowski, Altinópolis, Cravinhos + "interior de SP"). Endereço visível, iframe de mapa embutido em `/contato`, link direto para Google Maps no footer e no schema (`hasMap`).

**Vertical detectado:** espaço para eventos / casamentos (venue de casamentos, 15 anos e corporativo). Não mapeia 1:1 nas verticais padrão (restaurante, saúde, jurídico, home services, imobiliário, automotivo); tratado como "Event Venue / Banquet Hall", tipo schema.org correto = `EventVenue` (usado em combinação com `LocalBusiness`, ver Schema abaixo). Diretórios-alvo específicos do setor: Casamentos.com.br, iCasei, Bodas.com.br, Zankyou, GuiaMais, TripAdvisor, WeddingWire Brasil.

---

## Tabela CORRIGIDO / PENDENTE (issues do baseline)

| # | Issue do baseline (07/07, score 68) | Severidade original | Status | Evidência |
|---|---|---|---|---|
| 1 | GEO errado no schema (-20.8911,-47.5856, centro de Batatais; ~1,3km de erro) | CRÍTICO | **CORRIGIDO** | `lib/seo-config.ts:35-38` agora usa `-20.8809322, -47.5929521`, idêntico às coordenadas retornadas pela API do GBP (-20.881/-47.593). 5 casas decimais, dentro do recomendado. |
| 2 | `/cidades/ribeirao-preto` e `/cidades/franca` órfãs (sem link em nav/footer/home) | CRÍTICO | **CORRIGIDO** | Hub `/cidades` criado (`app/cidades/page.tsx`) com cards para as duas cidades; footer (`components/layout/footer.tsx:17-21`) tem seção "Atendemos" com os 3 links em **todas as páginas do site**. Confirmado live: WebFetch em `/cidades` retorna links para `/cidades/ribeirao-preto`, `/cidades/franca` e volta para `/`. |
| 3 | Breadcrumb "Cidades atendidas" apontava para `/` | CRÍTICO | **CORRIGIDO** | `lib/schema.ts:232-235` (hub) e páginas de cidade (`app/cidades/ribeirao-preto/page.tsx:85-88`, `app/cidades/franca/page.tsx:85-88`) usam `{ name: "Cidades atendidas", url: "/cidades" }` — não mais `/`. |
| 4 | Déficit estratégico de volume de reviews vs concorrência | CRÍTICO (estratégico) | **PENDENTE — mais grave do que se sabia** | Ver seção Reviews abaixo: 36 reviews confirmadas via GBP API vs 316 (Villa Casuarina), 164 (Espaço Terracota), 135 (Belaluma). Gap de 4x a 9x, sem evidência de processo de captação pós-evento. |
| 5 | `REVIEWS.reviewCount=40` hardcoded divergindo do real (36-41) | ALTO | **PENDENTE — divergência confirmada** | GBP API (live) = **36 avaliações**. Código (`lib/seo-config.ts:60`) e página `/contato` (live, "40 evaliações no Google") = **40**. Overstatement de ~11%. Risco de inconsistência frente ao Google (schema markup guidelines exigem que `aggregateRating` reflita dado real e verificável) e frente ao usuário que abre o perfil do Google e vê um número menor. |
| 6 | `areaServed` com 8 municípios mas só 2 com página dedicada | ALTO | **PARCIALMENTE CORRIGIDO** | Hub `/cidades` agora resolve isso com uma frase honesta ("Também recebemos com frequência eventos de Sertãozinho, Brodowski, Altinópolis, Cravinhos...") em vez de criar páginas finas (thin content) para as 4 cidades restantes. Solução adequada: evita doorway pages, mas essas 4 cidades continuam sem equity de página própria — aceitável dado o volume de busca provavelmente baixo, mas vale revisitar se alguma delas mostrar demanda. |
| 7 | Horário só no schema, não visível em `/contato` | MÉDIO | **PENDENTE** | Confirmado live: `/contato` mostra endereço, telefone, mapa, mas nenhum texto "Seg-Sáb, 9h às 18h". Schema mantém `openingHours: ["Mo-Sa 09:00-18:00"]`, que bate com o horário real do GBP (seg-sáb 9h-18h), mas o usuário humano na página não vê isso. |
| 8 | Citações em diretórios não confirmadas (Casar.com, Bodas, GuiaMais, TripAdvisor) | MÉDIO | **PENDENTE — não verificável nesta rodada** | Tentativa de busca via WebFetch em site:casamentos.com.br / icasei.com.br / bodas.com.br / guiamais.com.br não retornou resultados utilizáveis (bloqueio de busca). Combinado com o índice de backlinks vazio (ver Autoridade), a hipótese mais provável é ausência quase total de citações no nicho de casamentos — tratar como não confirmado, mas de alto risco. |
| 9 | Limpar comentários TODO residuais (founded já confirmado) | BAIXO | **CORRIGIDO** | `/sobre` (live) mostra "outubro 2024" sem placeholder; WebFetch não encontrou texto TODO/placeholder na página. |

---

## Achado NOVO desta rodada (não estava no baseline)

### CRÍTICO — Categoria primária do GBP provavelmente incorreta/subótima para a query de maior valor comercial
Dado live (GBP API): categoria primária = **"Function room facility"**.
Dado live (SERP): para **"espaço para casamento em batatais"** (query de intenção comercial mais alta do negócio), o Espaço Coral **não aparece no local pack** e cai para a 4ª posição orgânica. O top 3 do pack é 100% ocupado por concorrentes com categorias mais específicas de casamento (Villa Casuarina 4,8★/316 avaliações, Espaço Terracota 4,8★/164, Belaluma 4,8★/135) — inclusive o Instagram (13,9 mil seguidores) e o Facebook (30,2 mil) do Villa Casuarina ranqueiam **acima do site do Coral**.

Isso é consistente com o baseline, que registrava o Coral em 3º lugar no pack para "espaço para eventos batatais" — uma query mais genérica, mais alinhada à categoria atual "Function room facility". Ou seja: **a categoria do GBP parece estar otimizada para "evento" genérico, não para "casamento"**, que é o principal serviço e a query mais valiosa do negócio.

Segundo o Whitespark 2026, categoria primária do GBP é o fator #1 de ranking local (score 193) e categoria errada é o fator negativo #1 (score 176). Esta é a ação de maior alavancagem disponível nesta auditoria.

**Recomendação:** revisar a categoria primária no GBP para algo mais específico ao core business ("Wedding venue" / "Banquet hall" / "Event venue", conforme disponibilidade no Google) e considerar categorias secundárias adicionais alinhadas a "casamento" e "festa de 15 anos". Validar antes/depois com tracking de posição para as duas queries.

### ALTO — Índice de backlinks do domínio vazio (zero autoridade externa detectada)
Ferramenta de backlinks não encontrou nenhum domínio referenciando coraleventos.com.br. Combinado com a ausência de confirmação de citações em diretórios de casamento, isso indica que o site opera hoje com **autoridade de link praticamente nula**. Isso también explica por que concorrentes com redes sociais fortes (13,9 mil / 30,2 mil seguidores) conseguem superar o Coral organicamente mesmo em queries locais.

### ALTO — Visibilidade orgânica não-branded praticamente inexistente
Único keyword ranqueado no índice de keywords: **"espaço coral"** (posição 4, 170 buscas/mês) — uma query de marca (branded). Não há evidência de ranking para nenhuma keyword não-branded ("espaço para casamento em batatais", "salão de festas batatais" etc.), apesar de todo o trabalho on-page (páginas de cidade, FAQ, títulos otimizados) já implementado. Isso reforça o diagnóstico: o problema atual não é mais on-page/técnico (essa parte está bem encaminhada), é **autoridade + categoria + volume de prova social**.

---

## NAP — Auditoria de consistência

| Fonte | Nome | Endereço | Telefone | Match? |
|---|---|---|---|---|
| `lib/seo-config.ts` (fonte única no código) | Espaço Coral (legalName: Espaço Coral Eventos) | Rua Matheus Marinelli, 18, Jardim Elena, Batatais - SP, CEP 14300-111 | +55 16 99129-4178 / (16) 99129-4178 | — |
| Footer (live, todas as páginas) | Espaço Coral | Rua Matheus Marinelli, 18 · Jardim Elena, Batatais - SP · CEP 14300-111 | (16) 99129-4178 | ✔ |
| `/contato` (live) | Espaço Coral | Rua Matheus Marinelli, 18, Jardim Elena, Batatais, SP, CEP 14300-111 | (16) 99129-4178 | ✔ |
| `/sobre` (live) | Espaço Coral | Rua Matheus Marinelli, 18, Jardim Elena, Batatais, SP, CEP 14300-111 | (16) 99129-4178 | ✔ |
| JSON-LD (`lib/schema.ts`, revisão de código) | Espaço Coral / Espaço Coral Eventos | mesmo endereço, `PostalAddress` completo | `+5516991294178` | ✔ (não verificável live nesta sessão, ver Limitações) |
| **Google Business Profile (API, live)** | Espaço Coral | Rua Matheus Marinelli, 18 - Jardim Elena, Batatais - SP, 14300-111 | +55 16 99129-4178 | ✔ **idêntico ao site** |

**Conclusão:** NAP 100% consistente entre site e GBP — continua sendo o ponto mais forte da conta, confirmado agora com dado live de GBP API. A única divergência numérica no sistema não é de NAP, é de **reviewCount** (40 no site vs 36 no GBP real, ver issue #5 acima).

---

## GBP — Checklist de otimização

| Item | Status |
|---|---|
| Perfil reivindicado | ✔ Confirmado (GBP API) |
| Categoria primária correta | ✘ **Provável gap** — "Function room facility" é genérica demais para o core business de casamentos (ver achado novo CRÍTICO) |
| Endereço/telefone batendo com o site | ✔ |
| Horário de funcionamento preenchido | ✔ Seg-Sáb 9h-18h, bate com `openingHours` do schema |
| Fotos | ✔ 34 fotos |
| Descrição preenchida | ✔ |
| Rating/contagem de reviews | ✔ presente, mas ver divergência de contagem (issue #5) |
| Link para o Maps / embed no site | ✔ iframe em `/contato` (`app/contato/page.tsx:162-171`) + link direto no footer e no schema (`hasMap`) |
| Posts do GBP | Não verificável nesta auditoria (sem acesso à aba Posts da API) |
| Presença no local pack para queries de casamento | ✘ **Fora do pack** para "espaço para casamento em batatais" (achado novo CRÍTICO) |
| Presença no local pack para queries de evento genérico | ✔ 3º lugar para "espaço para eventos batatais" (dado do baseline, não re-testado nesta rodada) |

---

## Reviews — Snapshot de saúde

| Métrica | Espaço Coral | Villa Casuarina | Espaço Terracota | Belaluma |
|---|---|---|---|---|
| Rating | 5,0 | 4,8 | 4,8 | 4,8 |
| Nº de avaliações (GBP live) | **36** | 316 | 164 | 135 |
| Nº exibido no site | 40 (⚠ diverge do GBP) | — | — | — |

- Rating perfeito (5,0), mas volume 4x a 9x menor que os 3 concorrentes do local pack — o principal fator, junto com a categoria, para a ausência do pack em queries de casamento.
- Regra dos 18 dias (Sterling Sky): sem visibilidade sobre a cadência real de novos reviews; risco de estagnação não pode ser descartado sem processo formal de captação.
- Sem evidência de padrão de resposta do proprietário aos reviews (não verificável via dados disponíveis nesta sessão).
- Ação prioritária: campanha ativa de solicitação de review pós-evento (D+2 via WhatsApp, que já é o canal de conversão do negócio) com meta de cadência ≤18 dias entre novos reviews.

---

## Citações — Status (Tier 1 + nicho de casamentos)

| Diretório | Status |
|---|---|
| Google Business Profile | ✔ Confirmado, reivindicado, completo |
| Facebook | ✔ Página existe (`facebook.com/EspacoCoralEventos`), engajamento não confirmável nesta sessão (fetch truncado) |
| Instagram | ✔ Perfil existe (`@espaco.coral`), sem dado de seguidores coletado nesta sessão |
| Casamentos.com.br / iCasei / Bodas.com.br / GuiaMais | **Não confirmado** — busca via WebFetch falhou (bloqueio de busca do Google); ausência de backlinks no índice sugere que a probabilidade de listagem ativa é baixa |
| TripAdvisor | **Não confirmado** |
| Yelp / BBB | Baixa relevância para o mercado brasileiro de casamentos; não prioritário |

Combinado com o índice de backlinks vazio, o quadro mais provável é **déficit real de citações no nicho**, não apenas falta de confirmação manual. Recomenda-se criação ativa de perfil em pelo menos 3-5 diretórios de casamento (Casamentos.com.br e iCasei são os de maior tráfego no Brasil) como ação de curto prazo — são também fonte direta de link/citação que hoje inexiste.

---

## Schema Local — Validação

Tipo usado: `["EventVenue", "LocalBusiness"]` combinado — correto para o vertical (evita usar apenas `LocalBusiness` genérico).

| Propriedade | Status |
|---|---|
| `name`, `address` (obrigatórias) | ✔ |
| `geo` com 5 casas decimais | ✔ Corrigido nesta rodada, bate com coordenada real do GBP |
| `telephone` | ✔ |
| `url` | ✔ |
| `openingHoursSpecification` | ⚠ Presente como array de strings (`"Mo-Sa 09:00-18:00"`) em vez do objeto `OpeningHoursSpecification` estruturado (`dayOfWeek`/`opens`/`closes`) — funciona, mas o formato estruturado é mais robusto para parsing do Google |
| `aggregateRating` | ⚠ Presente, mas `reviewCount: 40` diverge do valor real do GBP (36) |
| `hasMap`, `priceRange`, `amenityFeature`, `areaServed`, `maximumAttendeeCapacity` | ✔ Todos presentes (`lib/schema.ts:80-108`) |
| `BreadcrumbList` | ✔ Presente em todas as páginas revisadas, corrigido para apontar `/cidades` corretamente |
| `FAQPage` nas páginas de cidade | ✔ Presente e sincronizado com o conteúdo visível |

**Limitação importante:** não foi possível validar o JSON-LD live via Rich Results Test ou parser HTML bruto nesta sessão (ver Limitações). A avaliação acima é baseada em revisão de código-fonte de `lib/schema.ts` e `lib/seo-config.ts`, confirmado como mesclado em produção (`origin/main`).

---

## Qualidade das páginas de cidade (multi-location)

`/cidades/ribeirao-preto` e `/cidades/franca`:
- Conteúdo único e não-template: distância/rota específica, ângulo editorial próprio ("noivas que buscam área verde fora da capital regional" vs "famílias grandes que precisam de espaço sem aperto"), FAQs distintas (não duplicadas entre si), imagens diferentes.
- Teste de doorway-page swap: **passa** — se o nome da cidade fosse trocado entre as duas páginas, o texto perderia sentido (referências a rodovias específicas — Anhanguera SP-330 vs Cândido Portinari SP-345 —, tempos de trajeto diferentes, e ângulos editoriais diferentes).
- Profundidade de link interno: 1 clique a partir de qualquer página do site (footer sitewide) + 1 clique a partir do hub `/cidades`. Boa.
- CTA de WhatsApp com mensagem pré-preenchida específica por cidade (ex: "Estou em Ribeirão Preto e gostaria de conhecer...").
- Isso atende ao "dedicated service/location pages = fator #1 local organic e #2 AI visibility" citado no briefing — ponto forte real do site.

---

## Top 10 ações prioritizadas

1. **CRÍTICO** — Revisar/corrigir a categoria primária do GBP ("Function room facility" → categoria mais específica de casamento/banquete) e monitorar posição para "espaço para casamento em batatais" antes/depois.
2. **CRÍTICO** — Iniciar campanha estruturada de captação de reviews pós-evento via WhatsApp (D+2), com meta de cadência ≤18 dias e objetivo de fechar o gap de volume vs Villa Casuarina/Terracota/Belaluma.
3. **CRÍTICO** — Construir citações ativas em 3-5 diretórios de casamento (priorizar Casamentos.com.br e iCasei) — hoje o índice de backlinks do domínio está vazio.
4. **ALTO** — Corrigir `REVIEWS.reviewCount` em `lib/seo-config.ts` para refletir o valor real do GBP (36, não 40) e estabelecer processo de sincronização mensal.
5. **ALTO** — Formato estruturado de `openingHoursSpecification` (objeto `dayOfWeek`/`opens`/`closes`) em vez de string simples, para parsing mais robusto pelo Google.
6. **ALTO** — Buscar/gerar backlinks editoriais reais (imprensa local, blogs de casamento, parcerias com fornecedores — fotógrafos, cerimonialistas, buffets parceiros que já linkam para seus próprios clientes).
7. **MÉDIO** — Tornar o horário de funcionamento visível como texto em `/contato` (hoje só existe no schema, invisível ao usuário humano).
8. **MÉDIO** — Investigar e reforçar presença/atividade no Instagram e Facebook (concorrentes têm 13,9 mil e 30,2 mil seguidores respectivamente; sinais sociais parecem correlacionar com a posição no pack nesta vertical).
9. **BAIXO** — Reavaliar periodicamente se alguma das 4 cidades sem página dedicada (Sertãozinho, Brodowski, Altinópolis, Cravinhos) justifica página própria com base em volume de busca real.
10. **BAIXO** — Confirmar manualmente (fora deste sandbox) a presença/ausência em TripAdvisor, Yelp e diretórios locais brasileiros adicionais, já que a busca automatizada falhou nesta sessão.

---

## Limitações desta auditoria

- **Rede via `curl` bloqueada no ambiente sandbox desta sessão** (qualquer chamada de rede via Bash retornou "Blocked: bash path outside allowed directories", incluindo `curl --version` funcionando mas `curl` para qualquer host externo sendo recusado). Todas as checagens live foram feitas via WebFetch.
- **WebFetch converte HTML para markdown antes da análise**, o que remove tags `<script>` (JSON-LD) e `<iframe>` (mapa embutido) do conteúdo processado. Isso gerou falsos negativos em checagens live (ex: WebFetch reportou "sem mapa embutido" e "sem JSON-LD" em páginas que, por revisão direta do código-fonte, de fato têm ambos implementados e mesclados em produção). Sempre que possível, essas checagens foram cruzadas com revisão de código-fonte e commit confirmado em `origin/main`.
- **Busca via Google (site: search) para diretórios de casamento falhou** (página de erro retornada pelo WebFetch), impedindo confirmação direta de listagens em Casamentos.com.br, iCasei, Bodas.com.br, GuiaMais e TripAdvisor. Tratado como não confirmado, não como "ausente".
- **Dados de GBP, SERP (local pack), backlinks e keyword ranking** foram fornecidos por ferramenta externa (API de Google Business Profile / DataForSEO) na coordenação da tarefa e não foram re-verificados de forma independente nesta sessão; tratados como corretos para efeito desta análise.
- **Sem acesso a Rich Results Test/Schema Validator interativo** para validação automatizada do JSON-LD live; validação feita por revisão de código-fonte (`lib/schema.ts`) e confirmação de merge em produção.
- **Engajamento real do Facebook/Instagram do Espaço Coral** (seguidores, frequência de posts) não coletado nesta sessão — comparação com concorrentes é unilateral (só temos os números dos concorrentes).
