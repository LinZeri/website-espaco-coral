import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogPostMeta } from "@/components/blog/blog-post-meta";
import { RelatedPosts } from "@/components/blog/related-posts";
import { blogMdxComponents } from "@/components/blog/mdx-components";
import { blogPostingSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo-config";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  pillarLabel,
} from "@/lib/blog-utils";

const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  // Inclui drafts para que autores possam previsualizar URL direta em prod build.
  // Drafts ainda ficam fora do sitemap, das listagens e dos filtros; só são
  // acessíveis se você souber o slug.
  return getAllPostSlugs({ includeDrafts: true }).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post não encontrado" };

  const fm = post.frontmatter;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = fm.ogImage ?? fm.coverImage ?? "/og/home.jpg";
  const title = fm.metaTitle ?? fm.title;
  const description = fm.metaDescription ?? fm.description;

  // Drafts e posts em revisão são SSG'd para preview, mas marcados noindex.
  // Só `status: "published"` (default quando ausente) gera robots=index.
  const isPublic = (fm.status ?? "published") === "published";

  return {
    title,
    description,
    keywords: [
      fm.keywordPrimary,
      ...(fm.keywordSecondary ?? []),
      ...(fm.tags ?? []),
    ].filter(Boolean) as string[],
    alternates: { canonical: url },
    robots: isPublic
      ? undefined
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      publishedTime: fm.publishDate,
      modifiedTime: fm.lastUpdated ?? fm.publishDate,
      authors: fm.author ? [fm.author] : undefined,
      tags: fm.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fm.coverImageAlt ?? fm.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const fm = post.frontmatter;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;

  const schema = blogPostingSchema(
    {
      url,
      headline: fm.title,
      description: fm.description,
      image: fm.coverImage,
      imageAlt: fm.coverImageAlt,
      datePublished: fm.publishDate,
      dateModified: fm.lastUpdated,
      authorName: fm.author,
      keywords: [fm.keywordPrimary, ...(fm.keywordSecondary ?? []), ...(fm.tags ?? [])].filter(
        Boolean
      ) as string[],
      articleSection: pillarLabel(fm.pillar),
      wordCount,
    },
    [
      { name: "Início", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: fm.title, url: `/blog/${post.slug}` },
    ],
    fm.faq
  );

  const related = getRelatedPosts(post.slug, 3);

  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main>
        {/* Cabeçalho do post */}
        <article>
          <header className="bg-background px-6 pb-10 pt-32 md:px-12 md:pb-14 md:pt-40 lg:px-20">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft size={14} className="text-gold" aria-hidden="true" />
                Voltar para o blog
              </Link>
              <h1 className="font-display mb-6 text-4xl font-normal leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {fm.title}
              </h1>
              {fm.description && (
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {fm.description}
                </p>
              )}
              <BlogPostMeta
                publishDate={fm.publishDate}
                lastUpdated={fm.lastUpdated}
                author={fm.author}
                pillar={fm.pillar}
                readingMinutes={post.readingMinutes}
              />
            </div>
          </header>

          {/* Cover image */}
          {fm.coverImage && (
            <div className="bg-background px-6 pb-12 md:px-12 lg:px-20">
              <div className="relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-md">
                <Image
                  src={fm.coverImage}
                  alt={fm.coverImageAlt ?? fm.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Corpo MDX */}
          <div className="bg-background px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
            <div className="mx-auto max-w-3xl">
              <MDXRemote source={post.content} components={blogMdxComponents} />
            </div>
          </div>

          {/* FAQ: se o frontmatter incluir */}
          {fm.faq && fm.faq.length > 0 && (
            <FaqSection
              eyebrow="Perguntas frequentes"
              title="Dúvidas comuns sobre este tema"
              items={fm.faq}
            />
          )}
        </article>

        <RelatedPosts posts={related} />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
