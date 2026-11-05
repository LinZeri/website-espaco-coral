import type { Metadata } from "next";
import Image from "next/image";
import { ADDRESS, BUSINESS } from "@/lib/seo-config";

/**
 * Layout do segmento /lp: landing pages de campanhas pagas (Google Ads, Meta).
 *
 * Regras (docs/paid-traffic.md):
 *   - noindex,nofollow obrigatório. Declarado aqui, cascateia para TODAS as
 *     LPs. Cada página também repete o robots no próprio metadata, por
 *     redundância. Nunca remover.
 *   - Sem menu, sem links internos, fora do sitemap. A única saída é o WhatsApp.
 *   - GTM vem do layout raiz (app/layout.tsx), então o rastreamento é herdado.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  // O layout raiz define canonical = home; numa LP isso seria um sinal
  // contraditório. Sem canonical aqui.
  alternates: { canonical: null },
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-center px-6 md:justify-start lg:px-10">
          <Image
            src="/images/logo/logo-coral-completo.svg"
            alt="Espaço Coral"
            width={130}
            height={38}
            priority
            className="h-10 w-auto brightness-0 invert"
          />
        </div>
      </header>

      {children}

      <footer className="border-t border-border bg-background px-6 py-10 pb-28 text-center text-xs text-muted-foreground md:pb-10">
        <p>
          {BUSINESS.name} · {ADDRESS.streetAddress} · {ADDRESS.neighborhood} ·{" "}
          {ADDRESS.addressLocality}, {ADDRESS.addressRegion}
        </p>
        <p className="mt-2">© {new Date().getFullYear()} {BUSINESS.name}</p>
      </footer>
    </>
  );
}
