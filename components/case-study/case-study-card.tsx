import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  formatEventDate,
  type CaseStudySummary,
} from "@/lib/case-studies";

interface CaseStudyCardProps {
  item: CaseStudySummary;
}

/**
 * Card de estudo de caso para a listagem `/eventos-realizados`.
 * Espelha o visual do BlogCard, mas exibe tipo e data do evento no lugar
 * do pilar/tempo de leitura.
 */
export function CaseStudyCard({ item }: CaseStudyCardProps) {
  const eventDate = formatEventDate(item.eventDate);

  return (
    <Link
      href={`/eventos-realizados/${item.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.cover}
          alt={item.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 inline-flex bg-background px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-foreground shadow-sm">
          {item.eventType}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-sans mb-3 text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-gold-dark md:text-2xl">
          {item.title}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
          <span>{eventDate ?? "Evento real"}</span>
          <ArrowUpRight
            size={16}
            className="text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </Link>
  );
}
