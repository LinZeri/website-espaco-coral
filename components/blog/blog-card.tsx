import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPostSummary } from "@/lib/blog-utils";
import { pillarLabel } from "@/lib/blog-utils";

interface BlogCardProps {
  post: BlogPostSummary;
  variant?: "default" | "compact";
}

/**
 * Card de post para uso na listagem `/blog` e tag pages.
 * Compartilha visual com `<RelatedPosts />`, mas é um item isolado
 * (não envolve em <ul>/<li>).
 */
export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  return (
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
            sizes={
              variant === "compact"
                ? "(max-width: 768px) 100vw, 33vw"
                : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
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
        <h3
          className={`font-sans mb-3 font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-gold-dark ${
            variant === "compact"
              ? "text-lg md:text-xl"
              : "text-xl md:text-2xl"
          }`}
        >
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
  );
}
