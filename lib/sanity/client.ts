import { articles as localArticles, Article } from "../articles";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

/**
 * Native GROQ fetch client for Sanity CDN.
 * Uses built-in fetch without requiring third-party npm packages.
 */
export async function fetchAllPosts(): Promise<Article[]> {
  if (!projectId) return localArticles;

  const query = encodeURIComponent(`*[_type == "post"] | order(publishedAt desc) {
    "id": _id,
    "slug": slug.current,
    title,
    "description": excerpt,
    "content": body,
    "author": author->name,
    "writerId": author->slug.current,
    "date": publishedAt,
    "category": category->title,
    readTimeMinutes,
    "featured": isFeatured,
    "trending": isTrending,
    isPremium
  }`);

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return localArticles;
    const data = await res.json();
    return data.result && data.result.length > 0 ? data.result : localArticles;
  } catch (error) {
    console.warn("Sanity CDN fetch failed, using preserved fallback articles", error);
    return localArticles;
  }
}
