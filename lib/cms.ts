import { Article, articles as initialArticles } from "./articles";

const STORAGE_KEY = "shilingi_times_custom_articles";

export function getLocalArticles(): Article[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getAllArticles(): Article[] {
  const local = getLocalArticles();
  const map = new Map<string, Article>();

  for (const art of local) {
    map.set(art.slug, art);
  }
  for (const art of initialArticles) {
    if (!map.has(art.slug)) {
      map.set(art.slug, art);
    }
  }

  return Array.from(map.values());
}

export async function publishArticle(
  article: Omit<Article, "id"> & { id?: string },
  passcode: string
): Promise<{ success: boolean; article?: Article; error?: string }> {
  try {
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...article, passcode }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Failed to publish article" };
    }

    // Cache locally in browser
    if (typeof window !== "undefined" && data.article) {
      const custom = getLocalArticles();
      const idx = custom.findIndex((a) => a.slug === data.article.slug);
      if (idx >= 0) {
        custom[idx] = data.article;
      } else {
        custom.unshift(data.article);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
    }

    return { success: true, article: data.article };
  } catch (err: any) {
    return { success: false, error: err?.message || "Network error while publishing" };
  }
}

export function deleteArticle(id: string): void {
  if (typeof window !== "undefined") {
    const custom = getLocalArticles().filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
  }
}
