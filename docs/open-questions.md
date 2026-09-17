# Decisões em Aberto — Espaço Coral

Este arquivo registra tópicos ainda não definidos. Consultar antes de tomar decisões nessas áreas.
Atualizar quando uma decisão for tomada — mover para o doc correspondente e remover daqui.

---

## Paleta de cores — afinação final

**Status:** parcialmente definida

A base preto/branco e o acento ouro champanhe (`#C9A96E`) estão definidos. O que falta:

- Confirmar se o logo tem versão colorida além do preto — verificar com o cliente
- Definir exatamente os tokens de gradiente de ouro (pode ser ajustado no início do desenvolvimento ao ver a paleta sobre fotos reais)
- Decidir se o site terá dark mode (não previsto por ora — manter como tema light apenas)

---

## Integração de depoimentos Google

**Status:** decidido integrar, forma ainda indefinida

Opções:
1. **JSON estático manual** — copiar as avaliações manualmente, atualizar quando necessário. Simples, zero custo, zero manutenção técnica.
2. **Google Places API** — buscar avaliações programaticamente. Requer chave de API, custo potencial, mais complexo.
3. **Widget embed** — terceiros (Elfsight, etc.). Custo mensal, dependência externa.

**Recomendação provável:** JSON estático para começar. Migrar para API se o volume de avaliações crescer muito.

---

## Sistema de fotos da galeria — organização

**Status:** estrutura definida (estática), curadoria pendente

O cliente enviou fotos para `_references/Photos/`:
- `25.10 Inauguração Espaço Coral/`
- `ALBUM PREVIA CASAMENTO L+N/`
- `Ensaio-guinza/`
- `Variadas/`

**Pendências:**
- Verificar conteúdo de cada pasta
- Selecionar as melhores fotos para cada seção do site
- Confirmar com o cliente quais fotos estão liberadas para uso no site
- Renomear e otimizar as selecionadas antes de mover para `/public/images/`

---

## Horário de atendimento

**Status:** não definido

Para a página de contato: qual é o horário de atendimento via WhatsApp? Sábados? Domingos?

---

## CMS para blog (quando criar)

**Status:** adiado — blog não existe ainda

Opções para quando o blog for criado:
1. **MDX puro** — arquivos `.mdx` em `/content/blog/`, Claude como editor, sem painel
2. **Contentlayer** — type-safe MDX processing, boa DX
3. **Outra solução** — a avaliar quando for o momento

**Decisão provável:** MDX puro + Contentlayer, dado que Claude é o editor.

---

## Páginas locais futuras

**Status:** não prioritário — expansão futura

Potencial de ranqueamento em cidades vizinhas:
- `/eventos-ribeirao-preto` ou `/ribeirao-preto`
- `/eventos-franca`
- Outras cidades da região

Criar apenas quando o site principal estiver bem ranqueado para Batatais.

---

## Estratégia de vídeo

**Status:** definido por ora (apenas fotos)

Hero usará apenas fotos por questão de performance — seguindo o template v0. Reavaliar no futuro se o cliente produzir um vídeo de alta qualidade do espaço.

---

## Políticas de privacidade / Termos

**Status:** não discutido

O site precisará de página de política de privacidade? Para campanhas de Meta Ads, pode ser obrigatório ter link para política de privacidade nas LPs.

---

## WhatsApp — integração avançada

**Status:** básico definido (link direto)

O número `(16) 99129-4178` será usado via link `https://wa.me/5516991294178`. 

Opções futuras:
- Mensagem pré-definida no link (ex: "Olá! Gostaria de saber mais sobre o Espaço Coral")
- WhatsApp Business API para automação
- Widget de chat flutuante

---

## Formulário de contato

**Status:** não discutido

O site terá formulário de contato além do WhatsApp? Se sim:
- Qual serviço de envio de email (Resend, Nodemailer, etc.)?
- Para onde vai o email de contato?
- Formulário simples ou qualificação (tipo de evento, data, número de convidados)?

**Observação:** dado o foco em WhatsApp como canal único, um formulário pode ser secundário ou desnecessário.
