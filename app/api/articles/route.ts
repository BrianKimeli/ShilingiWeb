import { NextResponse } from "next/server";
import { Article } from "@/lib/articles";
import {
  getStoredArticles,
  saveStoredArticles,
  getAllPublishedArticles,
} from "@/lib/server-cms";

const DEFAULT_PASSCODE = process.env.EDITORIAL_PASSCODE || "shilingi2026";

export async function GET() {
  const articles = getAllPublishedArticles();
  return NextResponse.json({
    success: true,
    articles,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode, ...articleData } = body;

    // Verify editorial passkey
    if (!passcode || passcode.trim() !== DEFAULT_PASSCODE) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid editorial passcode. Contact editor-in-chief for access." },
        { status: 401 }
      );
    }

    if (!articleData.title || !articleData.content) {
      return NextResponse.json(
        { error: "Missing required fields: Title and Content are mandatory." },
        { status: 400 }
      );
    }

    const custom = getStoredArticles();
    const slug =
      articleData.slug ||
      articleData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newArticle: Article = {
      id: articleData.id || `times-${Date.now()}`,
      slug,
      title: articleData.title,
      description: articleData.description || articleData.title,
      content: articleData.content,
      author: articleData.author || "The Shilingi Times Editorial Team",
      writerId: articleData.writerId || "finesse",
      date:
        articleData.date ||
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      category: articleData.category || "Money",
      readTimeMinutes: Number(articleData.readTimeMinutes) || 4,
      featured: Boolean(articleData.featured),
      trending: Boolean(articleData.trending),
      isPremium: Boolean(articleData.isPremium),
      likesCount: articleData.likesCount ?? 0,
      subTags: articleData.subTags || [],
    };

    const existingIndex = custom.findIndex((a) => a.slug === slug || a.id === newArticle.id);
    if (existingIndex >= 0) {
      custom[existingIndex] = newArticle;
    } else {
      custom.unshift(newArticle);
    }

    saveStoredArticles(custom);

    return NextResponse.json({
      success: true,
      message: "Article published successfully to live newsroom!",
      article: newArticle,
    });
  } catch (err: any) {
    console.error("API article publication error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to publish article" },
      { status: 500 }
    );
  }
}
