import { AtSign, ExternalLink } from "lucide-react";
import type { CaseStudyVendor } from "@/lib/case-studies";

interface VendorCreditsProps {
  vendors: CaseStudyVendor[];
}

/**
 * Créditos dos fornecedores do evento (fotografia, decoração, buffet, etc).
 * Cada crédito linka para o Instagram (@handle) ou uma URL externa, quando
 * fornecidos. Bom para reciprocidade de menção e sinais locais de SEO.
 *
 * Links externos usam rel="noopener" (aberto em nova aba) e, por serem
 * parcerias comerciais, `nofollow sponsored` para higiene de link.
 */
export function VendorCredits({ vendors }: VendorCreditsProps) {
  if (vendors.length === 0) return null;

  return (
    <section className="bg-sand px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-text">
          Quem fez acontecer
        </p>
        <h2 className="font-display mb-10 text-3xl font-normal leading-tight tracking-tight text-foreground md:text-4xl">
          Fornecedores do evento
        </h2>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          {vendors.map((vendor) => {
            const href = vendor.url
              ? vendor.url
              : vendor.handle
                ? `https://www.instagram.com/${vendor.handle}`
                : undefined;

            return (
              <li
                key={`${vendor.role}-${vendor.name}`}
                className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-foreground/70">
                    {vendor.role}
                  </p>
                  <p className="mt-1 text-base font-medium text-foreground">
                    {vendor.name}
                  </p>
                </div>

                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener nofollow sponsored"
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm text-gold transition-colors hover:text-gold-dark"
                  >
                    {vendor.handle ? (
                      <>
                        <AtSign size={15} aria-hidden="true" />
                        {vendor.handle}
                      </>
                    ) : (
                      <>
                        <ExternalLink size={15} aria-hidden="true" />
                        Site
                      </>
                    )}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
