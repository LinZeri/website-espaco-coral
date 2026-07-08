import type { MetadataRoute } from "next";
import { getAllPostSummaries, getAllClusterSlugs, getPostsByTag } from "@/lib/blog-utils";
import { SITE_URL } from "@/lib/seo-config";

/**
 * Data da última alteração real de conteúdo das páginas estáticas.
 * Atualizar ao mudar conteúdo visível dessas páginas (não a cada build:
 * um lastmod que muda sem o conteúdo mudar ensina o Google a ignorá-lo).
 *
 * Sem changeFrequency/priority: o Google ignora ambos; lastmod é o único
 * campo que ele usa como sinal.
 */
const STATIC_CONTENT_UPDATED = new Date("2026-07-08");

const STATIC_PATHS = [
  "/",
  "/eventos",
  "/eventos/casamentos",
  "/eventos/15-anos",
  "/eventos/corporativo",
  "/estrutura",
  "/estrutura/mobiliario",
  "/galeria",
  "/cidades",
  "/cidades/ribeirao-preto",
  "/cidades/franca",
  "/sobre",
  "/contato",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: STATIC_CONTENT_UPDATED,
  }));

  // Posts publicados: getAllPostSummaries respeita status + publishDate.
  // Drafts e posts com publishDate futura não entram no sitemap.
  const posts = getAllPostSummaries({ includeDrafts: false });

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastUpdated ?? post.publishDate),
  }));

  // Cluster pages (tags + pilares): só inclui se houver posts publicados
  // (getAllClusterSlugs() já consulta posts publicados e filtra por threshold).
  // lastmod real: a data mais recente entre os posts do cluster.
  const tagPages: MetadataRoute.Sitemap = getAllClusterSlugs().map((tag) => {
    const newest = getPostsByTag(tag)
      .map((post) => post.lastUpdated ?? post.publishDate)
      .sort()
      .at(-1);
    return {
      url: `${SITE_URL}/blog/tag/${tag}`,
      lastModified: newest ? new Date(newest) : STATIC_CONTENT_UPDATED,
    };
  });

  return [...staticEntries, ...blogPosts, ...tagPages];
}
