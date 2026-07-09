import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPostSummary } from "@/lib/blog-utils";
import { pillarLabel } from "@/lib/blog-utils";

interface RelatedPostsProps {
  posts: BlogPostSummary[];
  title?: string;
  eyebrow?: string;
}

/**
 * Bloco "Continue lendo": 3 posts relacionados em grid responsivo.
 * Selecionados por `getRelatedPosts()` com base em pilar + tags em comum.
 *
 * Não renderiza nada se `posts` estiver vazio (evita seção fantasma quando
 * o blog ainda tem poucos posts).
 */
export function RelatedPosts({
  posts,
  title = "Continue lendo",
  eyebrow = "Mais do blog",
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="bg-secondary/30 px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-xs uppercase tracking-widest text-gold">{eyebrow}</p>
          <h2 className="font-display text-3xl font-normal tracking-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt ?? post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary" />
                  )}
                  <div className="absolute left-3 top-3 inline-flex bg-background px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-foreground shadow-sm">
                    {pillarLabel(post.pillar)}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display mb-3 text-xl font-normal leading-tight tracking-tight text-foreground transition-colors group-hover:text-gold-dark md:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
                    <span>{post.readingMinutes} min de leitura</span>
                    <ArrowUpRight
                      size={16}
                      className="text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
