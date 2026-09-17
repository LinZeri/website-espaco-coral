import Link from "next/link";
import { getAllClusterSlugs, slugifyTag } from "@/lib/blog-utils";

interface BlogPostTagsProps {
  tags?: string[];
  className?: string;
}

/**
 * Tags do post como links para `/blog/tag/[tag]`. Só linka tags que têm
 * página gerada (cluster com >= 3 posts, ver getAllClusterSlugs em
 * lib/blog-utils.ts); as demais não aparecem, para não repetir o problema
 * de link para 404 que a pílula de pilar tinha (ver auditoria SEO de
 * 16/09/2026, que também apontou 11 páginas de tag sem nenhum link interno
 * de entrada: este componente é o que passa a linká-las).
 */
export function BlogPostTags({ tags, className = "" }: BlogPostTagsProps) {
  if (!tags || tags.length === 0) return null;

  const clusterSlugs = getAllClusterSlugs();
  const linkable = tags
    .map((tag) => ({ tag, slug: slugifyTag(tag) }))
    .filter(({ slug }) => clusterSlugs.includes(slug));

  if (linkable.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {linkable.map(({ tag, slug }) => (
        <Link
          key={slug}
          href={`/blog/tag/${slug}`}
          className="inline-flex items-center border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
