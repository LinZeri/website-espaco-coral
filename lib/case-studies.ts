/**
 * Utilitários dos estudos de caso de eventos reais (`/eventos-realizados`).
 *
 * Espelha o padrão de `lib/blog-utils.ts`, mas em pasta e tipos próprios para
 * não misturar cases com as listagens e clusters do blog. Toda função é
 * síncrona e roda em build time (SSG), lendo `.mdx` de `content/eventos-realizados/`.
 *
 * Convenção de slug: o nome do arquivo (sem extensão) é o slug.
 * Convenção de status (igual ao blog):
 *   - `draft`   → fora de listagens e sitemap; rota acessível em dev / URL direta.
 *   - `published` → visível e indexável; só aparece se publishDate <= hoje.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CASES_DIR = path.join(process.cwd(), "content", "eventos-realizados");

export type CaseStudyStatus = "draft" | "published";

export interface CaseStudyPhoto {
  src: string;
  alt: string;
}

export interface CaseStudyVendor {
  /** Papel do fornecedor (ex: "Fotografia", "Decoração", "Buffet"). */
  role: string;
  /** Nome do fornecedor ou estúdio. */
  name: string;
  /** @ do Instagram, sem o "@" (ex: "estudio.fulano"). Opcional. */
  handle?: string;
  /** URL externa (site ou perfil). Opcional. */
  url?: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
}

export interface CaseStudyFaq {
  question: string;
  answer: string;
}

/**
 * Frontmatter aceito em cada `.mdx`. Campos opcionais permitem evolução
 * gradual do schema sem quebrar cases antigos.
 */
export interface CaseStudyFrontmatter {
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  status?: CaseStudyStatus;
  /** Tipo do evento (ex: "Casamento", "Festa de 15 anos"). */
  eventType: string;
  /** Data do evento em "YYYY-MM" ou "YYYY-MM-DD". Exibida como mês/ano. */
  eventDate?: string;
  publishDate: string;
  lastUpdated?: string;
  author?: string;
  authorBio?: string;
  /** Número de convidados. */
  guests?: number;
  /** Formato do evento (ex: "Cerimônia ao ar livre e recepção no salão"). */
  format?: string;
  /** Período (ex: "Noturno", "Diurno"). */
  period?: string;
  /** Paleta / estilo da decoração. */
  palette?: string;
  cover: string;
  coverAlt: string;
  ogImage?: string;
  photos?: CaseStudyPhoto[];
  vendors?: CaseStudyVendor[];
  testimonial?: CaseStudyTestimonial;
  keywordPrimary?: string;
  keywordSecondary?: string[];
  faq?: CaseStudyFaq[];
}

export interface CaseStudy {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  content: string;
  readingMinutes: number;
}

export interface CaseStudySummary {
  slug: string;
  title: string;
  description: string;
  eventType: string;
  eventDate?: string;
  publishDate: string;
  lastUpdated?: string;
  cover: string;
  coverAlt: string;
  readingMinutes: number;
}

function ensureCasesDir(): boolean {
  return fs.existsSync(CASES_DIR);
}

function listMdxFiles(): string[] {
  if (!ensureCasesDir()) return [];
  return fs
    .readdirSync(CASES_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"));
}

function readCaseFile(slug: string): CaseStudy | null {
  const filePath = path.join(CASES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const frontmatter = parsed.data as CaseStudyFrontmatter;

  if (
    !frontmatter.title ||
    !frontmatter.publishDate ||
    !frontmatter.eventType ||
    !frontmatter.cover
  ) {
    throw new Error(
      `Frontmatter inválido em ${slug}.mdx: campos obrigatórios title, publishDate, eventType, cover.`
    );
  }

  return {
    slug,
    frontmatter,
    content: parsed.content,
    readingMinutes: Math.max(1, Math.round(readingTime(parsed.content).minutes)),
  };
}

function toSummary(item: CaseStudy): CaseStudySummary {
  return {
    slug: item.slug,
    title: item.frontmatter.title,
    description: item.frontmatter.description,
    eventType: item.frontmatter.eventType,
    eventDate: item.frontmatter.eventDate,
    publishDate: item.frontmatter.publishDate,
    lastUpdated: item.frontmatter.lastUpdated,
    cover: item.frontmatter.cover,
    coverAlt: item.frontmatter.coverAlt,
    readingMinutes: item.readingMinutes,
  };
}

/**
 * Verdade canônica para "esse case deve aparecer publicamente?".
 * Cases com status=draft não aparecem mesmo se publishDate já passou.
 * Em dev (`NODE_ENV !== 'production'`) drafts continuam acessíveis por URL direta.
 */
export function isCaseStudyVisible(
  frontmatter: CaseStudyFrontmatter,
  now = new Date()
): boolean {
  const status = frontmatter.status ?? "published";
  if (status !== "published") return false;
  const publish = new Date(frontmatter.publishDate);
  return publish.getTime() <= now.getTime();
}

/**
 * Lê todos os cases do disco. Em produção, filtra para `published` cuja
 * publishDate já passou. Em dev, retorna tudo (para preview de drafts).
 */
export function getAllCaseStudies(
  options: { includeDrafts?: boolean } = {}
): CaseStudy[] {
  const includeDrafts =
    options.includeDrafts ?? process.env.NODE_ENV !== "production";

  return listMdxFiles()
    .map((file) => readCaseFile(file.replace(/\.mdx$/, "")))
    .filter((item): item is CaseStudy => item !== null)
    .filter((item) => includeDrafts || isCaseStudyVisible(item.frontmatter))
    .sort((a, b) =>
      b.frontmatter.publishDate.localeCompare(a.frontmatter.publishDate)
    );
}

export function getAllCaseStudySummaries(
  options: { includeDrafts?: boolean } = {}
): CaseStudySummary[] {
  return getAllCaseStudies(options).map(toSummary);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  return readCaseFile(slug);
}

/**
 * Lista de slugs para `generateStaticParams`. Por padrão inclui drafts em
 * ambientes não-prod, permitindo preview local; drafts ainda ficam fora do
 * sitemap e das listagens.
 */
export function getAllCaseStudySlugs(
  options: { includeDrafts?: boolean } = {}
): string[] {
  return getAllCaseStudies(options).map((item) => item.slug);
}

/**
 * Rótulo de data do evento: "YYYY-MM" ou "YYYY-MM-DD" viram "mês de ano"
 * (ex: "maio de 2025"). Usado no cabeçalho da página e nos cards.
 */
const monthYearFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
});

export function formatEventDate(date?: string): string | undefined {
  if (!date) return undefined;
  const [year, month] = date.split("-").map(Number);
  if (!year || !month) return date;
  return monthYearFormatter.format(new Date(year, month - 1, 1));
}
