"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeroArticle, ArticleRow, SectionDivider } from "@/components/times/ArticleCard";
import NewsletterBox from "@/components/times/NewsletterBox";
import AppConversionCard from "@/components/times/AppConversionCard";
import AdPlacement from "@/components/times/AdPlacement";
import JsonLd from "@/components/JsonLd";
import { fetchAllPosts } from "@/lib/sanity/client";
import { articles as defaultArticles, categoriesList, Article } from "@/lib/articles";
import { websiteJsonLd } from "@/lib/seo";
import { writers } from "@/lib/writers";
import { TrendingUp, Users, ArrowRight } from "lucide-react";

export default function TimesHomePage() {
  const [articleList, setArticleList] = useState<Article[]>(defaultArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    async function loadData() {
      const posts = await fetchAllPosts();
      if (posts && posts.length > 0) {
        setArticleList(posts);
      }
    }
    loadData();
  }, []);

  const featured = articleList.find((a) => a.featured) || articleList[0];
  const remaining = articleList.filter((a) => a.slug !== featured.slug);

  const filteredArticles =
    selectedCategory === "All"
      ? remaining
      : remaining.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 pb-20 pt-6">
        {/* Hero & Trending Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Hero Column */}
          <div className="lg:col-span-2 space-y-6">
            <HeroArticle article={featured} />
          </div>

          {/* Sidebar Trending & Columnists */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <TrendingUp className="h-4 w-4 text-[#008060]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Trending Analysis
                </h3>
              </div>
              <div className="mt-4 space-y-4 divide-y divide-slate-100">
                {articleList.slice(1, 4).map((art, idx) => (
                  <Link
                    key={art.slug}
                    href={`/times/${art.slug}`}
                    className="group block pt-3 first:pt-0"
                  >
                    <div className="flex gap-3">
                      <span className="text-2xl font-bold font-serif text-slate-300 group-hover:text-[#008060]">
                        0{idx + 1}
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase text-[#008060]">
                          {art.category}
                        </p>
                        <h4 className="times-headline text-sm font-bold text-slate-900 group-hover:text-[#008060] line-clamp-2">
                          {art.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-500">{art.author}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Editorial Team */}
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-900 to-slate-950 p-5 text-white shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Editorial Team
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Newsroom
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Independent reporting across Tech, Business, Markets, Wealth, and Policy.
              </p>
              <div className="mt-4 space-y-3">
                {writers.map((writer) => (
                  <Link
                    key={writer.id}
                    href={`/times/writers/${writer.id}`}
                    className="flex items-center justify-between rounded-xl bg-slate-800/80 p-2.5 transition hover:bg-slate-800"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{writer.name}</p>
                      <p className="text-[11px] text-slate-400">{writer.role}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* High-Yield Monetization Banner */}
        <AdPlacement type="leaderboard" />

        {/* Native App Conversion Card */}
        <AppConversionCard />

        {/* Category Filter & Main Feed */}
        <section className="mt-12">
          <SectionDivider label="Latest Editorial Stories & Market Reports" />

          {/* Filter Pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition ${
                selectedCategory === "All"
                  ? "border-[#008060] bg-[#008060] text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              All Beats ({remaining.length})
            </button>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition ${
                  selectedCategory === cat
                    ? "border-[#008060] bg-[#008060] text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article) => (
              <ArticleRow key={article.slug} article={article} />
            ))}
          </div>
        </section>

        {/* Newsletter Growth Form */}
        <NewsletterBox />
      </main>
    </>
  );
}
