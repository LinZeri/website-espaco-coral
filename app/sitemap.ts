import type { MetadataRoute } from "next";
import { getAllPostSummaries, getAllClusterSlugs } from "@/lib/blog-utils";

const SITE_URL = "https://coraleventos.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "monthly", priority: 1.0 },
    { path: "/eventos", changeFrequency: "monthly", priority: 0.9 },
    { path: "/eventos/casamentos", changeFrequency: "monthly", priority: 0.9 },
    { path: "/eventos/15-anos", changeFrequency: "monthly", priority: 0.9 },
    { path: "/eventos/corporativo", changeFrequency: "monthly", priority: 0.8 },
    { path: "/estrutura", changeFrequency: "monthly", priority: 0.8 },
    { path: "/estrutura/mobiliario", changeFrequency: "yearly", priority: 0.5 },
    { path: "/galeria", changeFrequency: "weekly", priority: 0.7 },
    { path: "/cidades/ribeirao-preto", changeFrequency: "monthly", priority: 0.7 },
    { path: "/cidades/franca", changeFrequency: "monthly", priority: 0.7 },
    { path: "/sobre", changeFrequency: "yearly", priority: 0.6 },
    { path: "/contato", changeFrequency: "yearly", priority: 0.6 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Posts publicados: getAllPostSummaries respeita status + publishDate.
  // Drafts e posts com publishDate futura não entram no sitemap.
  const blogPosts: MetadataRoute.Sitemap = getAllPostSummaries({
    includeDrafts: false,
  }).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Cluster pages (tags + pilares): só inclui se houver posts publicados
  // (getAllClusterSlugs() já consulta posts publicados e filtra por threshold).
  const tagPages: MetadataRoute.Sitemap = getAllClusterSlugs().map((tag) => ({
    url: `${SITE_URL}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogPosts, ...tagPages];
}
