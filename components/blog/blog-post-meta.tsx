import { Clock, Calendar, User } from "lucide-react";
import Link from "next/link";
import { pillarLabel, type BlogPillar } from "@/lib/blog-utils";

interface BlogPostMetaProps {
  publishDate: string;
  lastUpdated?: string;
  author?: string;
  pillar: BlogPillar;
  readingMinutes: number;
  className?: string;
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function formatDate(date: string): string {
  // publishDate vem como "YYYY-MM-DD". Sem timezone inferido pelo Date().
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;
  return dateFormatter.format(new Date(year, month - 1, day));
}

/**
 * Bloco de metadados do post, exibido logo abaixo do título.
 * Inclui pílula do pilar (linkada para a página do pilar/tag),
 * data de publicação, autor e tempo de leitura estimado.
 */
export function BlogPostMeta({
  publishDate,
  lastUpdated,
  author,
  pillar,
  readingMinutes,
  className = "",
}: BlogPostMetaProps) {
  const showUpdate =
    lastUpdated && lastUpdated !== publishDate && lastUpdated.length === 10;

  return (
    <div
      className={`flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground ${className}`}
    >
      <Link
        href={`/blog/tag/${encodeURIComponent(pillar)}`}
        className="inline-flex items-center bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-gold hover:text-white"
      >
        {pillarLabel(pillar)}
      </Link>

      <span className="inline-flex items-center gap-2">
        <Calendar size={14} className="text-gold" aria-hidden="true" />
        <time dateTime={publishDate}>{formatDate(publishDate)}</time>
        {showUpdate && (
          <span className="text-xs text-muted-foreground/70">
            · atualizado em <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
          </span>
        )}
      </span>

      {author && (
        <span className="inline-flex items-center gap-2">
          <User size={14} className="text-gold" aria-hidden="true" />
          {author}
        </span>
      )}

      <span className="inline-flex items-center gap-2">
        <Clock size={14} className="text-gold" aria-hidden="true" />
        {readingMinutes} min de leitura
      </span>
    </div>
  );
}
