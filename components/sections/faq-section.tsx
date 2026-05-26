import { Plus } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: FaqItem[];
}

/**
 * Bloco visual de FAQ com <details>/<summary> nativos
 * (acessível, expande sem JS, indexável pelo Google).
 *
 * O schema JSON-LD FAQPage NÃO é injetado aqui: é responsabilidade
 * do schema centralizado em lib/schema.ts (servicePageSchema, etc.),
 * para evitar duplicação no @graph da página.
 */
export function FaqSection({
  eyebrow = "Perguntas frequentes",
  title = "Tudo que você precisa saber",
  intro,
  items,
}: FaqSectionProps) {
  return (
    <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs uppercase tracking-widest text-gold">
            {eyebrow}
          </p>
          <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
          {intro && (
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
              {intro}
            </p>
          )}
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <li key={item.question}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left text-base font-medium text-foreground transition-colors hover:text-gold-dark md:text-lg">
                  <span>{item.question}</span>
                  <Plus
                    size={20}
                    className="mt-1 shrink-0 text-gold transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <div className="pb-6 pr-10 text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
