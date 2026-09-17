import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { AuthorBio } from "@/components/blog/author-bio";
import { blogMdxComponents } from "@/components/blog/mdx-components";
import { EventFacts } from "@/components/case-study/event-facts";
import { PhotoGallery } from "@/components/case-study/photo-gallery";
import { VendorCredits } from "@/components/case-study/vendor-credits";
import { CaseStudyTestimonial } from "@/components/case-study/case-study-testimonial";
import { caseStudySchema } from "@/lib/schema";
import { getPublicImageDims } from "@/lib/image-dims";
import { SITE_URL } from "@/lib/seo-config";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  formatEventDate,
} from "@/lib/case-studies";

const CtaSection = dynamic(() =>
  import("@/components/sections/cta-section").then((m) => m.CtaSection)
);

interface CaseStudyPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  // Inclui drafts para preview via URL direta em prod build. Drafts ficam fora
  // do sitemap e das listagens, e recebem robots=noindex em generateMetadata.
  return getAllCaseStudySlugs({ includeDrafts: true }).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: CaseStudyPageProps): Metadata {
  const item = getCaseStudyBySlug(params.slug);
  if (!item) return { title: "Evento não encontrado" };

  const fm = item.frontmatter;
  const url = `${SITE_URL}/eventos-realizados/${item.slug}`;
  const ogImage = fm.ogImage ?? fm.cover ?? "/og/home.jpg";
  const title = fm.metaTitle ?? fm.title;
  const description = fm.metaDescription ?? fm.description;
  const isPublic = (fm.status ?? "published") === "published";

  return {
    title,
    description,
    keywords: [
      fm.keywordPrimary,
      ...(fm.keywordSecondary ?? []),
      fm.eventType,
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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fm.coverAlt ?? fm.title,
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

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const item = getCaseStudyBySlug(params.slug);
  if (!item) notFound();

  const fm = item.frontmatter;
  const url = `${SITE_URL}/eventos-realizados/${item.slug}`;
  const wordCount = item.content.split(/\s+/).filter(Boolean).length;
  const coverDims = fm.cover ? getPublicImageDims(fm.cover) : undefined;
  const eventDate = formatEventDate(fm.eventDate);

  const schema = caseStudySchema(
    {
      url,
      headline: fm.title,
      description: fm.description,
      image: fm.cover,
      imageAlt: fm.coverAlt,
      imageWidth: coverDims?.width,
      imageHeight: coverDims?.height,
      datePublished: fm.publishDate,
      dateModified: fm.lastUpdated,
      authorName: fm.author,
      authorBio: fm.authorBio,
      keywords: [fm.keywordPrimary, ...(fm.keywordSecondary ?? []), fm.eventType].filter(
        Boolean
      ) as string[],
      wordCount,
      photos: fm.photos?.map((photo) => ({ url: photo.src, caption: photo.alt })),
    },
    [
      { name: "Início", url: "/" },
      { name: "Eventos realizados", url: "/eventos-realizados" },
      { name: fm.title, url: `/eventos-realizados/${item.slug}` },
    ],
    fm.faq
  );

  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main>
        <article>
          {/* Cabeçalho */}
          <header className="bg-background px-6 pb-10 pt-32 md:px-12 md:pb-14 md:pt-40 lg:px-20">
            <div className="mx-auto max-w-3xl">
              <Link
                href="/eventos-realizados"
                className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft size={14} className="text-gold" aria-hidden="true" />
                Voltar para eventos realizados
              </Link>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-text">
                {fm.eventType} real no Espaço Coral
              </p>
              <h1 className="font-display mb-6 text-4xl font-normal leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {fm.title}
              </h1>
              {fm.description && (
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {fm.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                {eventDate && (
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={14} className="text-gold" aria-hidden="true" />
                    {eventDate}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Clock size={14} className="text-gold" aria-hidden="true" />
                  {item.readingMinutes} min de leitura
                </span>
              </div>
            </div>
          </header>

          {/* Capa */}
          {fm.cover && (
            <div className="bg-background px-6 pb-12 md:px-12 lg:px-20">
              <div className="relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-md">
                <Image
                  src={fm.cover}
                  alt={fm.coverAlt ?? fm.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Ficha do evento */}
          <div className="bg-sand px-6 py-10 md:px-12 md:py-12 lg:px-20">
            <div className="mx-auto max-w-5xl">
              <EventFacts frontmatter={fm} />
            </div>
          </div>

          {/* Relato (MDX) */}
          <div className="bg-background px-6 pb-20 pt-16 md:px-12 md:pb-28 md:pt-20 lg:px-20">
            <div className="mx-auto max-w-3xl">
              <MDXRemote
                source={item.content}
                components={blogMdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
              {fm.author && fm.authorBio && (
                <AuthorBio name={fm.author} bio={fm.authorBio} />
              )}
            </div>
          </div>

          {/* Depoimento dos anfitriões */}
          {fm.testimonial && (
            <CaseStudyTestimonial testimonial={fm.testimonial} />
          )}

          {/* Galeria de fotos */}
          {fm.photos && fm.photos.length > 0 && (
            <PhotoGallery photos={fm.photos} />
          )}

          {/* Créditos de fornecedores */}
          {fm.vendors && fm.vendors.length > 0 && (
            <VendorCredits vendors={fm.vendors} />
          )}

          {/* FAQ opcional */}
          {fm.faq && fm.faq.length > 0 && (
            <FaqSection
              eyebrow="Perguntas frequentes"
              title="Dúvidas sobre celebrar no Espaço Coral"
              items={fm.faq}
            />
          )}
        </article>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
