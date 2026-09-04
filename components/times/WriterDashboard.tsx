"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Save,
  CheckCircle2,
  Eye,
  PenSquare,
  Lock,
  Unlock,
  Copy,
  ExternalLink,
  LogOut,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { writers, Writer } from "@/lib/writers";
import { publishArticle } from "@/lib/cms";
import { categoriesList, ArticleCategory } from "@/lib/articles";
import RichArticleRenderer from "./RichArticleRenderer";

export default function WriterDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  const [selectedWriter, setSelectedWriter] = useState<Writer>(writers[0]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ArticleCategory>("Money");
  const [readTimeMinutes, setReadTimeMinutes] = useState<number>(4);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [subTagsText, setSubTagsText] = useState("Fintech, Personal Finance, Markets");
  const [content, setContent] = useState(`### Introduction

Write your story introduction here...

> [!NOTE]
> **Key Takeaway:** Add an executive takeaway or golden rule for your readers here.

> [!TIP]
> **Practical Pro-Tip:** Detail an actionable tactic (e.g. MMF liquidity allocation, M-Pesa float rules).

### Core Analysis & Breakdown

1. **First Pillar:** Detail your analysis and market data here.
2. **Second Pillar:** Explain the real-world impact for young professionals and savers.

> [!WARNING]
> **Risk Consideration:** Highlight any inflation, rate-hike, or fee factors readers should watch.`);

  const [previewMode, setPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [publishError, setPublishError] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Check persistent session on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("shilingi_editorial_key");
    if (saved) {
      setPasscode(saved);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError("Please enter your editorial passkey.");
      return;
    }
    // Default passkey fallback: shilingi2026
    sessionStorage.setItem("shilingi_editorial_key", passcode.trim());
    setIsAuthenticated(true);
    setAuthError("");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("shilingi_editorial_key");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !description.trim()) {
      setPublishError("Please complete all required fields (Title, Description, and Content).");
      return;
    }

    setIsPublishing(true);
    setPublishError("");

    const activeSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const subTags = subTagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await publishArticle(
      {
        title: title.trim(),
        slug: activeSlug,
        description: description.trim(),
        content: content.trim(),
        author: selectedWriter.name,
        writerId: selectedWriter.id,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        category,
        readTimeMinutes: Number(readTimeMinutes) || 4,
        featured: isFeatured,
        trending: isTrending,
        isPremium,
        subTags,
      },
      passcode
    );

    setIsPublishing(false);

    if (res.success && res.article) {
      setPublishedSlug(res.article.slug);
      setTimeout(() => setPublishedSlug(null), 8000);
    } else {
      setPublishError(res.error || "Failed to publish article. Check your passkey.");
    }
  };

  const copyGitTypeScriptCode = () => {
    const activeSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const subTags = subTagsText
      .split(",")
      .map((t) => `"${t.trim()}"`)
      .filter(Boolean)
      .join(", ");

    const codeSnippet = `  {
    id: "${activeSlug}",
    slug: "${activeSlug}",
    title: "${title.replace(/"/g, '\\"')}",
    description: "${description.replace(/"/g, '\\"')}",
    content: \`${content.replace(/`/g, "\\`").replace(/\${/g, "\\${")}\`,
    author: "${selectedWriter.name}",
    writerId: "${selectedWriter.id}",
    date: "${new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}",
    category: "${category}",
    readTimeMinutes: ${Number(readTimeMinutes) || 4},
    featured: ${isFeatured},
    trending: ${isTrending},
    isPremium: ${isPremium},
    likesCount: 120,
    subTags: [${subTags}],
  },`;

    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const insertSnippet = (snippet: string) => {
    setContent((prev) => prev + "\n\n" + snippet);
  };

  // 1. Password Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#008060]/10 text-[#008060]">
            <Lock className="h-7 w-7" />
          </div>

          <div className="mt-5 text-center">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              Editorial Studio
            </span>
            <h2 className="times-headline mt-2 text-2xl font-bold text-slate-900">
              Newsroom Access
            </h2>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Internal publishing portal for The Shilingi Times editorial team. Please enter your secret passkey to access drafting and publishing tools.
            </p>
          </div>

          {authError && (
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Editorial Passkey
              </label>
              <input
                type="password"
                required
                placeholder="Enter passkey..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-hidden focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/20"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#008060] py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-[#006b4f]"
            >
              <Unlock className="h-4 w-4" /> Unlock Editorial Desk
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Authenticated Editorial Desk
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#008060] px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider">
              Editorial Desk
            </span>
            <span className="text-xs text-slate-500">• 3-Person Newsroom (Editors, Writers & Tech Lead)</span>
          </div>
          <h1 className="times-headline mt-2 text-3xl font-bold text-slate-900">
            Publishing Desk & Content Engine
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Draft, preview rich callouts, format beats, and publish live to The Shilingi Times.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold border transition ${
              previewMode
                ? "border-[#008060] bg-[#008060]/10 text-[#008060]"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
            }`}
          >
            <Eye className="h-4 w-4" /> {previewMode ? "Edit Markdown" : "Live Preview"}
          </button>

          <button
            type="button"
            onClick={copyGitTypeScriptCode}
            className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            title="Copy article object code to paste into lib/articles.ts"
          >
            <Copy className="h-4 w-4 text-[#008060]" />
            <span>{copiedCode ? "Copied Git Code!" : "Export Git Code"}</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs sm:text-sm font-semibold text-rose-700 hover:bg-rose-100 transition"
          >
            <LogOut className="h-4 w-4" /> Lock Desk
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {publishedSlug && (
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-emerald-500/40 bg-emerald-50 p-4 text-emerald-900 shadow-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-[#008060] shrink-0" />
            <span className="text-sm font-semibold">
              Article published successfully to live newsroom!
            </span>
          </div>
          <Link
            href={`/times/${publishedSlug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#008060] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#006b4f]"
          >
            View Live Story <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* Error Banner */}
      {publishError && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-rose-500/40 bg-rose-50 p-4 text-rose-900 shadow-xs">
          <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
          <span className="text-sm font-semibold">{publishError}</span>
        </div>
      )}

      {previewMode ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#008060]">
              {category}
            </span>
            <h1 className="times-headline mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
              {title || "Untitled Story"}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-slate-600">{description}</p>
            <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
              <span className="font-semibold text-slate-800">{selectedWriter.name}</span>
              <span>•</span>
              <span>{readTimeMinutes} min read</span>
            </div>
          </div>
          <div className="pt-8">
            <RichArticleRenderer content={content} />
          </div>
        </div>
      ) : (
        <form onSubmit={handlePublish} className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editing Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Headline / Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g., The 50/30/20: Why Your M-Pesa Statement is Lying..."
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 font-serif placeholder-slate-400 outline-hidden transition focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/20"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                URL Slug
              </label>
              <input
                type="text"
                required
                placeholder="mpesa-50-30-20-rule"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-700 font-mono outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Executive Excerpt / Description
              </label>
              <textarea
                rows={2}
                required
                placeholder="Short 2-sentence summary for search engines, Google News, and social cards..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-hidden transition focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/20"
              />
            </div>

            {/* Rich Callout Inserts */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Insert Rich Editorial Callouts
              </span>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => insertSnippet("> [!NOTE]\n> **Key Takeaway:** Your note here.")}
                  className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-100"
                >
                  + Key Note Box
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("> [!TIP]\n> **Pro Tip:** Your pro-tip here.")}
                  className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 hover:bg-amber-100"
                >
                  + Pro-Tip Box
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet("> [!WARNING]\n> **Risk Warning:** Your risk warning here.")}
                  className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-900 hover:bg-rose-100"
                >
                  + Risk Warning Box
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Article Body (Markdown)
              </label>
              <textarea
                rows={14}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-4 text-sm font-mono text-slate-900 outline-hidden transition focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/20"
              />
            </div>
          </div>

          {/* Sidebar Meta Controls */}
          <div className="space-y-6">
            {/* Core Writer Selector */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Byline Author / Editor
              </label>
              <p className="mt-1 text-xs text-slate-500">
                Select which team member is publishing this story:
              </p>
              <div className="mt-3 space-y-2">
                {writers.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setSelectedWriter(w)}
                    className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition ${
                      selectedWriter.id === w.id
                        ? "border-[#008060] bg-[#008060]/10 text-slate-900"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#008060] text-xs font-bold text-white">
                      {w.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{w.name}</p>
                      <p className="text-[10px] text-slate-500">{w.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Beat */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Primary Beat Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-2.5 text-sm font-semibold text-slate-800 outline-hidden focus:border-[#008060]"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <div className="mt-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Estimated Read Time (Mins)
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={readTimeMinutes}
                  onChange={(e) => setReadTimeMinutes(Number(e.target.value))}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-hidden"
                />
              </div>

              <div className="mt-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Sub-Topic Tags
                </label>
                <input
                  type="text"
                  placeholder="Fintech, M-Pesa, MMFs"
                  value={subTagsText}
                  onChange={(e) => setSubTagsText(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 outline-hidden"
                />
              </div>
            </div>

            {/* Flags & Promotion */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3 text-xs">
              <label className="font-bold uppercase tracking-wider text-slate-600">
                Editorial Flags
              </label>
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-slate-300 text-[#008060] focus:ring-[#008060]"
                />
                <span>Set as Lead Hero Story</span>
              </label>
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTrending}
                  onChange={(e) => setIsTrending(e.target.checked)}
                  className="rounded border-slate-300 text-[#008060] focus:ring-[#008060]"
                />
                <span>Feature in Trending Column</span>
              </label>
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="rounded border-slate-300 text-[#008060] focus:ring-[#008060]"
                />
                <span>Times Insider Story</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isPublishing}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#008060] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#006b4f] disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isPublishing ? "Publishing Live..." : "Publish to Live Site"}
              </button>

              <p className="text-[11px] text-center text-slate-500">
                Instantly deployed to /times and saved in newsroom store.
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
