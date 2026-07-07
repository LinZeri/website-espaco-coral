import type { Metadata } from "next";

/**
 * Layout do segmento /proposta: páginas privadas de fechamento (buffet e
 * decoração) enviadas a clientes específicos.
 *
 * O `robots: noindex,nofollow` aqui cascateia para TODAS as páginas filhas,
 * garantindo que nenhuma proposta seja indexada. Reforçado por:
 *   - app/robots.ts (disallow /proposta/)
 *   - ausência destas rotas em app/sitemap.ts
 *   - ausência de links na navegação pública (header/footer)
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
