/**
 * Utilitários do blog: parsing de MDX, ordenação, filtros e relacionamento.
 *
 * Toda função é síncrona e roda em build time (SSG). Nenhum acesso a DB.
 * Os arquivos `.mdx` ficam em `content/blog/` e são lidos via `fs`.
 *
 * Convenção de slug: o nome do arquivo (sem extensão) é o slug.
 * Convenção de status:
 *   - `draft`            → não aparece em listagens nem sitemap, mas rota acessível em dev
 *   - `published`        → visível e indexável; só aparece se publishDate <= hoje
 *   - `needs-human-review` → escrito mas com issues após auto-rewrite; bloqueado do sitemap
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPillar = "casamento" | "15-anos" | "corporativo" | "estrutura" | "local";
export type BlogStatus = "draft" | "published" | "needs-human-review";

export interface BlogFaq {
  question: string;
  answer: string;
}

/**
 * Frontmatter aceito em cada `.mdx`. Campos opcionais permitem evolução
 * gradual do schema sem quebrar posts antigos.
 */
export interface BlogFrontmatter {
  title: string;
  description: string;
  publishDate: string;
  lastUpdated?: string;
  status?: BlogStatus;
  author?: string;
  authorBio?: string;
  pillar: BlogPillar;
  tags?: string[];
  keywordPrimary?: string;
  keywordSecondary?: string[];
  metaTitle?: string;
  metaDescription?: string;
  coverImage?: string;
  coverImageAlt?: string;
  ogImage?: string;
  faq?: BlogFaq[];
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingMinutes: number;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  pillar: BlogPillar;
  tags: string[];
  coverImage?: string;
  coverImageAlt?: string;
  readingMinutes: number;
}

const PILLAR_LABELS: Record<BlogPillar, string> = {
  casamento: "Casamento",
  "15-anos": "15 Anos",
  corporativo: "Corporativo",
  estrutura: "Estrutura",
  local: "Batatais e região",
};

export function pillarLabel(pillar: BlogPillar): string {
  return PILLAR_LABELS[pillar] ?? pillar;
}

/**
 * Slug URL-safe de uma tag: minúsculas, sem acentos, espaços viram hífen.
 * "Cerimônia ao ar livre" → "cerimonia-ao-ar-livre". Pilares já são slugs
 * e passam inalterados. É a forma canônica usada em URLs e comparações.
 */
export function slugifyTag(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Palavras que ficam minúsculas em labels (exceto se forem a primeira). */
const LABEL_LOWERCASE = new Set(["de", "do", "da", "dos", "das", "ao", "aos", "a", "o", "e", "em", "no", "na", "para"]);
/** Siglas que ficam em caixa alta em labels. */
const LABEL_UPPERCASE = new Set(["sp", "mg", "led"]);

function titleCaseTag(tag: string): string {
  return tag
    .split(/\s+/)
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (LABEL_UPPERCASE.has(lower)) return lower.toUpperCase();
      if (i > 0 && LABEL_LOWERCASE.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

/**
 * Nome de exibição de um cluster a partir do slug. Pilares usam o label
 * oficial; tags livres recuperam a grafia original do frontmatter (com
 * acentos e espaços). Fallback: title-case do próprio slug.
 */
export function tagLabel(slug: string): string {
  if (slug in PILLAR_LABELS) return PILLAR_LABELS[slug as BlogPillar];

  for (const post of getAllPostSummaries()) {
    for (const tag of post.tags) {
      if (slugifyTag(tag) === slug) return titleCaseTag(tag);
    }
  }
  return titleCaseTag(slug.replace(/-/g, " "));
}

function ensureBlogDir(): boolean {
  return fs.existsSync(BLOG_DIR);
}

function listMdxFiles(): string[] {
  if (!ensureBlogDir()) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"));
}

function readPostFile(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const frontmatter = parsed.data as BlogFrontmatter;

  if (!frontmatter.title || !frontmatter.publishDate || !frontmatter.pillar) {
    throw new Error(
      `Frontmatter inválido em ${slug}.mdx: campos obrigatórios title, publishDate, pillar.`
    );
  }

  return {
    slug,
    frontmatter,
    content: parsed.content,
    readingMinutes: Math.max(1, Math.round(readingTime(parsed.content).minutes)),
  };
}

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    publishDate: post.frontmatter.publishDate,
    pillar: post.frontmatter.pillar,
    tags: post.frontmatter.tags ?? [],
    coverImage: post.frontmatter.coverImage,
    coverImageAlt: post.frontmatter.coverImageAlt,
    readingMinutes: post.readingMinutes,
  };
}

/**
 * Verdade canônica para "esse post deve ser exibido publicamente?".
 * Posts com status=draft não aparecem mesmo se publishDate já passou.
 * Em dev (`NODE_ENV !== 'production'`) drafts continuam acessíveis por URL direta.
 */
export function isPostVisible(frontmatter: BlogFrontmatter, now = new Date()): boolean {
  const status = frontmatter.status ?? "published";
  if (status !== "published") return false;
  const publish = new Date(frontmatter.publishDate);
  return publish.getTime() <= now.getTime();
}

/**
 * Lê todos os posts do disco. Em produção, filtra para `published` cuja
 * publishDate já passou. Em dev, retorna tudo (para preview de drafts).
 */
export function getAllPosts(options: { includeDrafts?: boolean } = {}): BlogPost[] {
  const includeDrafts = options.includeDrafts ?? process.env.NODE_ENV !== "production";

  return listMdxFiles()
    .map((file) => readPostFile(file.replace(/\.mdx$/, "")))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => includeDrafts || isPostVisible(post.frontmatter))
    .sort((a, b) => b.frontmatter.publishDate.localeCompare(a.frontmatter.publishDate));
}

export function getAllPostSummaries(options: { includeDrafts?: boolean } = {}): BlogPostSummary[] {
  return getAllPosts(options).map(toSummary);
}

export function getPostBySlug(slug: string): BlogPost | null {
  return readPostFile(slug);
}

/**
 * Lista de slugs para `generateStaticParams`.
 *
 * Por padrão inclui drafts em ambientes não-prod (NODE_ENV !== "production"),
 * permitindo preview local. Passe `{ includeDrafts: true }` explicitamente
 * para gerar SSG de drafts mesmo em prod build (drafts ainda ficam fora do
 * sitemap e das listagens, só acessíveis via URL direta).
 */
export function getAllPostSlugs(options: { includeDrafts?: boolean } = {}): string[] {
  return getAllPosts(options).map((post) => post.slug);
}

export function getPostsByPillar(pillar: BlogPillar): BlogPostSummary[] {
  return getAllPostSummaries().filter((post) => post.pillar === pillar);
}

/**
 * Filtra por tag, comparando pela forma slugificada (aceita "Decoração",
 * "decoracao" ou "decoração"). Como conveniência, posts cujo `pillar`
 * corresponde ao slug também são incluídos. Isso permite usar o mesmo
 * roteador `/blog/tag/[tag]` tanto para pilares quanto para tags livres.
 */
export function getPostsByTag(tag: string): BlogPostSummary[] {
  const slug = slugifyTag(tag);
  return getAllPostSummaries().filter((post) => {
    if (slugifyTag(post.pillar) === slug) return true;
    return post.tags.some((t) => slugifyTag(t) === slug);
  });
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const post of getAllPostSummaries()) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Slugs de todas as páginas-cluster válidas: tags livres + pilares.
 * Usado em `generateStaticParams` da rota `/blog/tag/[tag]`.
 *
 * Filtra para incluir só clusters com >= MIN_POSTS_PER_TAG posts (evita
 * páginas thin com 1 post, má prática de SEO programático).
 */
const MIN_POSTS_PER_TAG = 3;

export function getAllClusterSlugs(): string[] {
  const tagCounts: Record<string, number> = {};

  for (const post of getAllPostSummaries()) {
    // Slugifica pilar e tags: "15 anos" e o pilar "15-anos" contam juntos
    // e viram um único cluster.
    const clusterSlugs = new Set([
      slugifyTag(post.pillar),
      ...post.tags.map(slugifyTag),
    ]);
    clusterSlugs.forEach((slug) => {
      tagCounts[slug] = (tagCounts[slug] ?? 0) + 1;
    });
  }

  return Object.entries(tagCounts)
    .filter(([, count]) => count >= MIN_POSTS_PER_TAG)
    .map(([slug]) => slug);
}

export function getAllPillars(): { pillar: BlogPillar; count: number }[] {
  const counts: Partial<Record<BlogPillar, number>> = {};
  for (const post of getAllPostSummaries()) {
    counts[post.pillar] = (counts[post.pillar] ?? 0) + 1;
  }
  return (Object.entries(counts) as Array<[BlogPillar, number]>)
    .map(([pillar, count]) => ({ pillar, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Posts relacionados: prioriza mesmo pilar, depois tags em comum.
 * Exclui o post atual. Retorna até `limit` itens.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPostSummary[] {
  const target = getPostBySlug(slug);
  if (!target) return [];

  const all = getAllPostSummaries().filter((p) => p.slug !== slug);
  const targetTags = new Set((target.frontmatter.tags ?? []).map(slugifyTag));

  const scored = all.map((post) => {
    let score = 0;
    if (post.pillar === target.frontmatter.pillar) score += 10;
    for (const tag of post.tags) {
      if (targetTags.has(slugifyTag(tag))) score += 3;
    }
    return { post, score };
  });

  return scored
    .sort((a, b) => b.score - a.score || b.post.publishDate.localeCompare(a.post.publishDate))
    .slice(0, limit)
    .map((entry) => entry.post);
}

/**
 * Slug → URL absoluta (para uso em sitemap/schema). Não tem trailing slash.
 */
export function blogPostUrl(slug: string, siteUrl: string): string {
  return `${siteUrl}/blog/${slug}`;
}

export function tagUrl(tag: string, siteUrl: string): string {
  return `${siteUrl}/blog/tag/${slugifyTag(tag)}`;
}
