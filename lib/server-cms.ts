import fs from "fs";
import path from "path";
import { Article, articles as initialArticles } from "./articles";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "articles.json");
const TMP_FILE = path.join("/tmp", "shilingi_articles.json");

export function getStoredArticles(): Article[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not read from data/articles.json:", err);
  }

  try {
    if (fs.existsSync(TMP_FILE)) {
      const raw = fs.readFileSync(TMP_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not read from tmp storage:", err);
  }

  return [];
}

export function saveStoredArticles(articles: Article[]): boolean {
  let saved = false;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), "utf-8");
    saved = true;
  } catch (err) {
    console.warn("Local filesystem write skipped:", err);
  }

  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(articles, null, 2), "utf-8");
    saved = true;
  } catch (err) {
    console.warn("Tmp storage write skipped:", err);
  }

  return saved;
}

export function getAllPublishedArticles(): Article[] {
  const custom = getStoredArticles();
  const map = new Map<string, Article>();

  // Custom articles override initial articles with same slug
  for (const art of custom) {
    map.set(art.slug, art);
  }
  for (const art of initialArticles) {
    if (!map.has(art.slug)) {
      map.set(art.slug, art);
    }
  }

  return Array.from(map.values());
}

export function getPublishedArticleBySlug(slug: string): Article | undefined {
  const all = getAllPublishedArticles();
  return all.find((a) => a.slug === slug);
}

export function getPublishedArticlesByCategory(category: string): Article[] {
  const all = getAllPublishedArticles();
  return all.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export function getPublishedArticlesByWriter(writerId: string): Article[] {
  const all = getAllPublishedArticles();
  return all.filter(
    (a) => a.writerId === writerId || a.author.toLowerCase() === writerId.toLowerCase()
  );
}
