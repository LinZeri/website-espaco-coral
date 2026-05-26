import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogCard } from "@/components/blog/blog-card";
import { blogIndexSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo-config";
import {
  getAllPostSummaries,
  getAllPillars,
  pillarLabel,
} from "@/lib/blog-utils";

const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

export const metadata: Metadata = {
  title: "Blog do Espaço Coral",
  description:
    "Guias práticos para casamento, festa de 15 anos e eventos corporativos no interior de São Paulo. Como escolher espaço, planejar cerimônia, calcular capacidade e mais.",
  keywords: [
    "blog Espaço Coral",
    "dicas de casamento Batatais",
    "planejamento de festa de 15 anos",
    "guia de eventos interior SP",
    "como escolher espaço para casamento",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog do Espaço Coral | Guias para Eventos no Interior de SP",
    description:
      "Conteúdos editoriais sobre casamento, festa de 15 anos e eventos corporativos no interior de São Paulo.",
    url: `${SITE_URL}/blog`,
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Blog do Espaço Coral, guias para eventos no interior de SP",
      },
    ],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPostSummaries({ includeDrafts: false });
  const pillars = getAllPillars();

  const schema = blogIndexSchema(
    posts.slice(0, 10).map((post) => ({
      url: `/blog/${post.slug}`,
      headline: post.title,
      datePublished: post.publishDate,
    }))
  );

  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main>
        <PageHero
          title="Blog"
          subtitle="Guias e referências para o seu evento"
          imageSrc="/images/spaces/fachada-entardecer.webp"
          imageAlt="Fachada do Espaço Coral em Batatais ao entardecer"
        />

        {/* Intro */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-24 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
              Editorial · Espaço Coral
            </p>
            <p className="text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
              Reunimos aqui as perguntas que mais ouvimos de quem está
              planejando casamento, festa de 15 anos ou evento corporativo no
              interior de São Paulo, e as respostas que aprendemos com cada
              celebração que recebemos.
            </p>
          </div>
        </section>

        {/* Filtros por pilar */}
        {pillars.length > 0 && (
          <section className="bg-background px-6 pb-12 md:px-12 lg:px-20">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-wrap gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-gold-dark"
                >
                  Todos os posts
                </Link>
                {pillars.map(({ pillar, count }) => (
                  <Link
                    key={pillar}
                    href={`/blog/tag/${encodeURIComponent(pillar)}`}
                    className="inline-flex items-center bg-secondary px-4 py-2 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-gold hover:text-white"
                  >
                    {pillarLabel(pillar)} ({count})
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Grid de posts */}
        <section className="bg-background px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-32">
          <div className="mx-auto max-w-6xl">
            {posts.length === 0 ? (
              <div className="border border-dashed border-border bg-secondary/30 p-12 text-center">
                <p className="text-base text-muted-foreground">
                  Em breve, conteúdos editoriais sobre casamento, festa de 15
                  anos e eventos corporativos no Espaço Coral.
                </p>
                <p className="mt-2 text-sm text-muted-foreground/70">
                  Enquanto isso, fale com a nossa equipe pelo WhatsApp para
                  planejar o seu evento.
                </p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <BlogCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
