/**
 * Geradores de Schema.org JSON-LD reutilizáveis.
 *
 * Estratégia: usar @graph para encadear múltiplas entidades por página
 * (ex: home tem EventVenue + LocalBusiness + WebSite + BreadcrumbList).
 *
 * Validar sempre em https://search.google.com/test/rich-results após mudanças.
 */

import {
  ADDRESS,
  AREAS_SERVED,
  BUSINESS,
  CONTACT,
  GEO,
  OPENING_HOURS,
  SITE_URL,
  SOCIAL,
  VENUE,
} from "./seo-config";
import { GALLERY_IMAGES } from "@/data/gallery-images";

const ORG_ID = `${SITE_URL}/#organization`;
const VENUE_ID = `${SITE_URL}/#venue`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_URL = `${SITE_URL}/images/logo/logo-coral-completo.svg`;
const PERSON_ID = `${SITE_URL}/sobre#lin-zeri`;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: ADDRESS.streetAddress,
  addressLocality: ADDRESS.addressLocality,
  addressRegion: ADDRESS.addressRegion,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.addressCountry,
};

const geoCoordinates = {
  "@type": "GeoCoordinates",
  latitude: GEO.latitude,
  longitude: GEO.longitude,
};

// `aggregateRating` foi removido do venue() (ver git log): os valores que
// alimentavam esse bloco, em REVIEWS (lib/seo-config.ts), são as notas do
// Google Business Profile copiadas para dentro do nosso próprio schema. As
// diretrizes do Google tratam isso como review markup de fonte terceira
// ("don't use review markup... that reflects ratings pulled from another
// site"), independente de a nota ser real, e o valor também já estava
// desatualizado (última sync documentada: 08/07/2026). Reintroduzir só com
// uma fonte de avaliação própria de primeira parte (ex: formulário no site)
// ou uma sincronização automatizada com a API do Google Business Profile.
// Ver auditoria SEO de 16/09/2026.

const amenityFeatures = VENUE.amenities.map((name) => ({
  "@type": "LocationFeatureSpecification",
  name,
  value: true,
}));

/**
 * Organization: entidade abstrata da empresa.
 * Reutilizada como `publisher` em BlogPosting e como `provider` em Service.
 */
function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.googleMaps],
    employee: { "@id": PERSON_ID },
  };
}

/**
 * Autor único do blog e dos estudos de caso hoje: Lin Zeri, gestor do
 * Espaço Coral. Usa @id compartilhado ancorado em /sobre#lin-zeri, onde a
 * seção "Quem escreve" confirma nome, cargo e bio, para que o `author.url`
 * de cada post aponte para uma página que realmente identifica quem
 * escreveu (antes apontava para /sobre sem o nome aparecer lá em lugar
 * nenhum, ver auditoria SEO de 16/09/2026). `description` muda por post:
 * é a bio contextual ao tema do artigo, já escrita no frontmatter de cada
 * `.mdx`, não um texto fixo.
 */
function authorPerson(name: string, bio?: string) {
  if (name === "Lin Zeri") {
    return {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Lin Zeri",
      url: PERSON_ID,
      jobTitle: "Gestor do Espaço Coral",
      description: bio,
      worksFor: { "@id": ORG_ID },
    };
  }
  return {
    "@type": "Person",
    name,
    description: bio,
    worksFor: { "@id": ORG_ID },
  };
}

/**
 * EventVenue + LocalBusiness combinados (ambos os tipos via array).
 * Inclui AggregateRating e amenities completos.
 */
function venue() {
  return {
    "@type": ["EventVenue", "LocalBusiness"],
    "@id": VENUE_ID,
    name: BUSINESS.name,
    description: BUSINESS.description,
    url: SITE_URL,
    image: [
      `${SITE_URL}/images/scenes/fachada/fachada-entardecer.webp`,
      `${SITE_URL}/images/scenes/salao/salao-panoramica.webp`,
      `${SITE_URL}/images/scenes/cerimonia/cerimonia-arco.webp`,
    ],
    logo: LOGO_URL,
    telephone: CONTACT.phone,
    address: postalAddress,
    geo: geoCoordinates,
    hasMap: SOCIAL.googleMaps,
    openingHours: OPENING_HOURS as unknown as string[],
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: BUSINESS.currenciesAccepted,
    paymentAccepted: BUSINESS.paymentAccepted,
    maximumAttendeeCapacity: VENUE.maxAttendeeCapacity,
    areaServed: AREAS_SERVED as unknown as string[],
    amenityFeature: amenityFeatures,
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
    foundingDate: BUSINESS.founded,
  };
}

function website() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BUSINESS.name,
    inLanguage: "pt-BR",
    publisher: { "@id": ORG_ID },
  };
}

/**
 * BreadcrumbList: passar lista ordenada [{ name, url }].
 * Sempre incluir Home como primeiro item.
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

function breadcrumb(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Service: para páginas de tipo de evento.
 * `name` curto (ex: "Casamentos no Espaço Coral").
 * `serviceType` é a categoria amigável.
 *
 * Sem `aggregateRating`: as avaliações são do negócio (LocalBusiness/venue),
 * não de cada serviço isolado. Replicar o mesmo rating em vários Services
 * viola as diretrizes do Google de review markup específico por item.
 */
export interface ServiceInput {
  name: string;
  description: string;
  serviceType: string;
  url: string;
  image: string;
}

function service(input: ServiceInput) {
  return {
    "@type": "Service",
    "@id": `${input.url}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: input.url,
    image: input.image.startsWith("http") ? input.image : `${SITE_URL}${input.image}`,
    provider: { "@id": ORG_ID },
    areaServed: AREAS_SERVED as unknown as string[],
  };
}

/**
 * Home: graph completo: WebSite + Organization + EventVenue/LocalBusiness + Breadcrumb.
 */
export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      website(),
      venue(),
      breadcrumb([{ name: "Início", url: "/" }]),
    ],
  };
}

/**
 * /eventos: hub. ItemList com 3 serviços + breadcrumb.
 */
export function eventosHubSchema(services: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/eventos#itemlist`,
        name: "Tipos de eventos no Espaço Coral",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.name,
          url: `${SITE_URL}${s.url}`,
        })),
      },
      breadcrumb([
        { name: "Início", url: "/" },
        { name: "Eventos", url: "/eventos" },
      ]),
    ],
  };
}

/**
 * /cidades: hub das cidades atendidas. ItemList com as páginas de cidade.
 */
export function cidadesHubSchema(cities: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      venue(),
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/cidades#itemlist`,
        name: "Cidades atendidas pelo Espaço Coral",
        itemListElement: cities.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          url: `${SITE_URL}${c.url}`,
        })),
      },
      breadcrumb([
        { name: "Início", url: "/" },
        { name: "Cidades atendidas", url: "/cidades" },
      ]),
    ],
  };
}

/**
 * FAQPage: quando a página tiver bloco de perguntas frequentes.
 */
export interface FaqPair {
  question: string;
  answer: string;
}

function faqPage(pageUrl: string, items: FaqPair[]) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Service page: Service + EventVenue (referenciado) + Breadcrumb + FAQ opcional.
 */
export function servicePageSchema(
  serviceInput: ServiceInput,
  breadcrumbItems: BreadcrumbItem[],
  faq?: FaqPair[]
) {
  const graph: Array<Record<string, unknown>> = [
    organization(),
    venue(),
    service(serviceInput),
    breadcrumb(breadcrumbItems),
  ];

  if (faq && faq.length > 0) {
    graph.push(faqPage(serviceInput.url, faq));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * /estrutura: EventVenue completo + Breadcrumb.
 */
export function estruturaSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      venue(),
      breadcrumb([
        { name: "Início", url: "/" },
        { name: "Estrutura", url: "/estrutura" },
      ]),
    ],
  };
}

/**
 * /estrutura/mobiliario: EventVenue completo + Breadcrumb (filho de /estrutura).
 */
export function mobiliarioSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      venue(),
      breadcrumb([
        { name: "Início", url: "/" },
        { name: "Estrutura", url: "/estrutura" },
        { name: "Mobiliário", url: "/estrutura/mobiliario" },
      ]),
    ],
  };
}

/**
 * /galeria: ImageGallery + Breadcrumb.
 */
export function galeriaSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      {
        "@type": "ImageGallery",
        "@id": `${SITE_URL}/galeria#gallery`,
        name: "Galeria de eventos do Espaço Coral",
        description:
          "Fotos de casamentos, festas de 15 anos e eventos realizados no Espaço Coral em Batatais, SP.",
        url: `${SITE_URL}/galeria`,
        publisher: { "@id": ORG_ID },
        image: GALLERY_IMAGES.map((img) => ({
          "@type": "ImageObject",
          url: `${SITE_URL}${img.src}`,
          caption: img.alt,
        })),
      },
      breadcrumb([
        { name: "Início", url: "/" },
        { name: "Galeria", url: "/galeria" },
      ]),
    ],
  };
}

/**
 * /sobre: AboutPage + Organization + EventVenue + Person (autor) + Breadcrumb.
 *
 * Reforça sinais de E-E-A-T: identidade do negócio, localização,
 * histórico (foundingDate), identidade de quem escreve o blog (seção
 * "Quem escreve", ancorada em #lin-zeri) e relação com a página através
 * de `mainEntity`.
 */
export function sobreSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      venue(),
      authorPerson(
        "Lin Zeri",
        "Lin Zeri está à frente do Espaço Coral desde a inauguração, em outubro de 2024, e acompanha cada casamento, festa de 15 anos e evento corporativo da primeira visita ao dia da celebração."
      ),
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/sobre#aboutpage`,
        url: `${SITE_URL}/sobre`,
        name: `Sobre o ${BUSINESS.name}`,
        description: `Conheça a história, a equipe e os diferenciais do ${BUSINESS.name}, espaço para casamentos, festas de 15 anos e eventos em ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion}.`,
        inLanguage: "pt-BR",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        mainEntity: { "@id": VENUE_ID },
      },
      breadcrumb([
        { name: "Início", url: "/" },
        { name: "Sobre", url: "/sobre" },
      ]),
    ],
  };
}

/**
 * /contato: ContactPage + LocalBusiness com geo + Breadcrumb.
 */
export function contatoSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      venue(),
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contato#contactpage`,
        url: `${SITE_URL}/contato`,
        name: `Contato: ${BUSINESS.name}`,
        description: `Entre em contato com o ${BUSINESS.name} pelo WhatsApp ${CONTACT.phoneDisplay} ou visite-nos em ${ADDRESS.streetAddress}, ${ADDRESS.neighborhood}, ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion}.`,
        about: { "@id": VENUE_ID },
      },
      breadcrumb([
        { name: "Início", url: "/" },
        { name: "Contato", url: "/contato" },
      ]),
    ],
  };
}

/**
 * Location page (cidades atendidas): EventVenue/LocalBusiness com `areaServed`
 * já incluso via venue() + FAQPage + Breadcrumb.
 *
 * Sincronizar `faqs` com o conteúdo visível da página: cada Question.name e
 * Answer.text precisa aparecer no HTML para atender às guidelines do Google
 * sobre FAQ rich results.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export function cityPageSchema(
  url: string,
  faqs: FaqItem[],
  breadcrumbItems: BreadcrumbItem[]
) {
  const absoluteUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      venue(),
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl}#faq`,
        url: absoluteUrl,
        inLanguage: "pt-BR",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      breadcrumb(breadcrumbItems),
    ],
  };
}

/**
 * Blog index: `/blog`. Marca a coleção como Blog + lista os 10 posts mais
 * recentes via `blogPost`. Inclui Organization e BreadcrumbList.
 */
export interface BlogIndexEntry {
  url: string;
  headline: string;
  datePublished: string;
}

export function blogIndexSchema(recentPosts: BlogIndexEntry[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: `Blog do ${BUSINESS.name}`,
        description:
          "Guias, dicas e referências para quem está planejando casamento, festa de 15 anos ou evento corporativo no interior de São Paulo.",
        inLanguage: "pt-BR",
        publisher: { "@id": ORG_ID },
        blogPost: recentPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.headline,
          url: post.url.startsWith("http") ? post.url : `${SITE_URL}${post.url}`,
          datePublished: post.datePublished,
        })),
      },
      breadcrumb([
        { name: "Início", url: "/" },
        { name: "Blog", url: "/blog" },
      ]),
    ],
  };
}

/**
 * BlogPosting: post individual.
 *
 * Convenções:
 *   - `headline` máx 110 caracteres (limite Google rich results)
 *   - `dateModified` cai para `datePublished` quando não fornecido
 *   - `mainEntityOfPage` aponta para a URL canônica
 *   - Quando `faqs` é fornecido, agrega FAQPage no @graph (mesmo padrão de servicePageSchema)
 */
export interface BlogPostingInput {
  url: string;
  headline: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorBio?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
}

export function blogPostingSchema(
  post: BlogPostingInput,
  breadcrumbItems: BreadcrumbItem[],
  faqs?: FaqPair[]
) {
  const absoluteUrl = post.url.startsWith("http") ? post.url : `${SITE_URL}${post.url}`;
  const absoluteImage = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${SITE_URL}${post.image}`
    : undefined;

  const blogPosting: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl}#article`,
    headline: post.headline.slice(0, 110),
    description: post.description,
    url: absoluteUrl,
    inLanguage: "pt-BR",
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl,
    },
    publisher: { "@id": ORG_ID },
    author: post.authorName
      ? authorPerson(post.authorName, post.authorBio)
      : { "@id": ORG_ID },
  };

  if (absoluteImage) {
    const imageObject: Record<string, unknown> = {
      "@type": "ImageObject",
      url: absoluteImage,
      caption: post.imageAlt,
    };
    if (post.imageWidth && post.imageHeight) {
      imageObject.width = post.imageWidth;
      imageObject.height = post.imageHeight;
    }
    blogPosting.image = imageObject;
  }
  if (post.keywords && post.keywords.length > 0) {
    blogPosting.keywords = post.keywords.join(", ");
  }
  if (post.articleSection) {
    blogPosting.articleSection = post.articleSection;
  }
  if (typeof post.wordCount === "number") {
    blogPosting.wordCount = post.wordCount;
  }

  const graph: Array<Record<string, unknown>> = [
    organization(),
    blogPosting,
    breadcrumb(breadcrumbItems),
  ];

  if (faqs && faqs.length > 0) {
    graph.push(faqPage(absoluteUrl, faqs));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Tag/cluster page: `/blog/tag/<slug>`. CollectionPage + ItemList + Breadcrumb.
 */
export function blogTagSchema(
  tag: string,
  posts: Array<{ url: string; headline: string; datePublished: string }>,
  breadcrumbItems: BreadcrumbItem[],
  displayName = tag
) {
  const absoluteUrl = `${SITE_URL}/blog/tag/${tag}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl}#collection`,
        url: absoluteUrl,
        name: `${displayName} no Blog do ${BUSINESS.name}`,
        description: `Conteúdos do blog do ${BUSINESS.name} sobre ${displayName.toLowerCase()}.`,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.map((post, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: post.url.startsWith("http") ? post.url : `${SITE_URL}${post.url}`,
            name: post.headline,
          })),
        },
      },
      breadcrumb(breadcrumbItems),
    ],
  };
}

/**
 * Estudo de caso de evento real: `/eventos-realizados/<slug>`.
 *
 * Modelado como `Article` (relato experiencial em primeira pessoa) + `ImageGallery`
 * das fotos do evento + `BreadcrumbList`. O autor é uma `Person` que `worksFor` a
 * Organization, e o artigo aponta (`about`/`locationCreated`) para o `@id` do venue,
 * amarrando a experiência ao espaço físico.
 *
 * Não usa `Event`: schema.org/Event serve para eventos futuros/descobríveis, não
 * para um evento privado passado.
 */
export interface CaseStudySchemaInput {
  url: string;
  headline: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorBio?: string;
  keywords?: string[];
  wordCount?: number;
  /** Fotos do evento para o ImageGallery. */
  photos?: Array<{ url: string; caption: string }>;
}

export function caseStudySchema(
  input: CaseStudySchemaInput,
  breadcrumbItems: BreadcrumbItem[],
  faqs?: FaqPair[]
) {
  const absoluteUrl = input.url.startsWith("http")
    ? input.url
    : `${SITE_URL}${input.url}`;
  const toAbsolute = (src: string) =>
    src.startsWith("http") ? src : `${SITE_URL}${src}`;

  const article: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${absoluteUrl}#article`,
    headline: input.headline.slice(0, 110),
    description: input.description,
    url: absoluteUrl,
    inLanguage: "pt-BR",
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl },
    publisher: { "@id": ORG_ID },
    about: { "@id": VENUE_ID },
    locationCreated: { "@id": VENUE_ID },
    author: input.authorName
      ? authorPerson(input.authorName, input.authorBio)
      : { "@id": ORG_ID },
  };

  if (input.image) {
    const imageObject: Record<string, unknown> = {
      "@type": "ImageObject",
      url: toAbsolute(input.image),
      caption: input.imageAlt,
    };
    if (input.imageWidth && input.imageHeight) {
      imageObject.width = input.imageWidth;
      imageObject.height = input.imageHeight;
    }
    article.image = imageObject;
  }
  if (input.keywords && input.keywords.length > 0) {
    article.keywords = input.keywords.join(", ");
  }
  if (typeof input.wordCount === "number") {
    article.wordCount = input.wordCount;
  }

  const graph: Array<Record<string, unknown>> = [organization(), venue(), article];

  if (input.photos && input.photos.length > 0) {
    graph.push({
      "@type": "ImageGallery",
      "@id": `${absoluteUrl}#gallery`,
      name: input.headline,
      url: absoluteUrl,
      isPartOf: { "@id": `${absoluteUrl}#article` },
      publisher: { "@id": ORG_ID },
      image: input.photos.map((photo) => ({
        "@type": "ImageObject",
        url: toAbsolute(photo.url),
        caption: photo.caption,
      })),
    });
  }

  graph.push(breadcrumb(breadcrumbItems));

  if (faqs && faqs.length > 0) {
    graph.push(faqPage(absoluteUrl, faqs));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Índice `/eventos-realizados`: CollectionPage + ItemList + Breadcrumb.
 * Espelha o padrão de blogTagSchema.
 */
export function eventosRealizadosHubSchema(
  cases: Array<{ url: string; headline: string; datePublished: string }>
) {
  const absoluteUrl = `${SITE_URL}/eventos-realizados`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      venue(),
      {
        "@type": "CollectionPage",
        "@id": `${absoluteUrl}#collection`,
        url: absoluteUrl,
        name: `Eventos realizados no ${BUSINESS.name}`,
        description: `Estudos de caso de casamentos, festas de 15 anos e eventos reais realizados no ${BUSINESS.name}, em ${ADDRESS.addressLocality}, ${ADDRESS.addressRegion}.`,
        inLanguage: "pt-BR",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: cases.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
            name: item.headline,
          })),
        },
      },
      breadcrumb([
        { name: "Início", url: "/" },
        { name: "Eventos realizados", url: "/eventos-realizados" },
      ]),
    ],
  };
}
