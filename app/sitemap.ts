import type { MetadataRoute } from "next";
import { getAllPublishedArticles } from "@/lib/server-cms";
import { SITE_URL } from "@/lib/site";
import { categoriesList } from "@/lib/articles";
import { writers } from "@/lib/writers";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllPublishedArticles();

  const articleUrls = articles.map((article) => ({
    url: `${SITE_URL}/times/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categoriesList.map((cat) => ({
    url: `${SITE_URL}/times/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const writerUrls = writers.map((w) => ({
    url: `${SITE_URL}/times/writers/${w.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1.0 },
    { url: `${SITE_URL}/times`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    ...articleUrls,
    ...categoryUrls,
    ...writerUrls,
  ];
}
