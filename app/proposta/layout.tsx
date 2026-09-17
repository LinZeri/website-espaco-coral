import type { Metadata } from "next";

/**
 * Layout do segmento /proposta: páginas privadas de fechamento (buffet e
 * decoração) enviadas a clientes específicos.
 *
 * O `robots: noindex,nofollow` aqui cascateia para TODAS as páginas filhas,
 * garantindo que nenhuma proposta seja indexada. Reforçado por:
 *   - ausência destas rotas em app/sitemap.ts
 *   - ausência de links na navegação pública (header/footer)
 *
 * `/proposta/` NÃO entra no disallow do app/robots.ts: bloquear via
 * robots.txt impediria o Google de rastrear a página e, portanto, de ler
 * este `noindex`. O noindex sozinho já é a forma correta de manter a URL
 * fora do índice (ver auditoria SEO de 16/09/2026).
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function PropostaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
