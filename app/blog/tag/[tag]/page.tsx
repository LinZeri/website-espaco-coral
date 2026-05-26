import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogCard } from "@/components/blog/blog-card";
import { blogTagSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo-config";
import {
  getAllClusterSlugs,
  getPostsByTag,
  pillarLabel,
  type BlogPillar,
} from "@/lib/blog-utils";

const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

interface BlogTagPageProps {
  params: { tag: string };
}

const KNOWN_PILLARS: BlogPillar[] = [
  "casamento",
  "15-anos",
  "corporativo",
  "estrutura",
  "local",
];

function isPillar(slug: string): slug is BlogPillar {
  return KNOWN_PILLARS.includes(slug as BlogPillar);
}

function tagDisplayName(slug: string): string {
  if (isPillar(slug)) return pillarLabel(slug);
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateStaticParams() {
  return getAllClusterSlugs().map((tag) => ({ tag }));
}

export function generateMetadata({ params }: BlogTagPageProps): Metadata {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) return { title: "Tag não encontrada" };

  const display = tagDisplayName(tag);
  const url = `${SITE_URL}/blog/tag/${encodeURIComponent(tag)}`;

  return {
    title: `${display} | Blog do Espaço Coral`,
    description: `Conteúdos do blog do Espaço Coral sobre ${display.toLowerCase()}. ${posts.length} ${posts.length === 1 ? "post publicado" : "posts publicados"}.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${display} | Blog do Espaço Coral`,
      description: `Posts editoriais sobre ${display.toLowerCase()} no Espaço Coral.`,
      url,
      images: [
        {
          url: "/og/home.jpg",
          width: 1200,
          height: 630,
          alt: `Blog do Espaço Coral: ${display}`,
        },
      ],
    },
  };
}

export default function BlogTagPage({ params }: BlogTagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  const display = tagDisplayName(tag);

  const schema = blogTagSchema(
    tag,
    posts.map((post) => ({
      url: `/blog/${post.slug}`,
      headline: post.title,
      datePublished: post.publishDate,
    })),
    [
      { name: "Início", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: display, url: `/blog/tag/${encodeURIComponent(tag)}` },
    ]
  );

  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main>
        <section className="bg-background px-6 pb-12 pt-32 md:px-12 md:pb-16 md:pt-40 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Voltar para o blog
            </Link>
            <p className="mb-4 text-xs uppercase tracking-widest text-gold">
              Categoria
            </p>
            <h1 className="font-display mb-6 text-5xl font-normal tracking-tight text-foreground md:text-6xl">
              {display}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post publicado" : "posts publicados"}{" "}
              sobre {display.toLowerCase()}.
            </p>
          </div>
        </section>

        <section className="bg-background px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
          <div className="mx-auto max-w-6xl">
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
