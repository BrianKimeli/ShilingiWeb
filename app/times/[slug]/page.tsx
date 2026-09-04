import Link from "next/link";
import { notFound } from "next/navigation";
import RichArticleRenderer from "@/components/times/RichArticleRenderer";
import AppConversionCard from "@/components/times/AppConversionCard";
import AdPlacement from "@/components/times/AdPlacement";
import ReadingProgressBar from "@/components/times/ReadingProgressBar";
import JsonLd from "@/components/JsonLd";
import ShareButton from "@/components/times/ShareButton";
import ArticleClientActions from "./ArticleClientActions";
import {
  getAllPublishedArticles,
  getPublishedArticleBySlug,
} from "@/lib/server-cms";
import { getWriterById } from "@/lib/writers";
import { articleJsonLd, buildArticleMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const all = getAllPublishedArticles();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);
  if (!article) return { title: "Article Not Found | The Shilingi Times" };
  return buildArticleMetadata(article);
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getPublishedArticleBySlug(slug);

  if (!article) notFound();

  const writer = getWriterById(article.writerId || article.author.toLowerCase()) || {
    id: "finesse",
    slug: "finesse",
    name: article.author,
    role: "Senior Money & Behavioral Editor",
    bio: "Writing plain-English financial breakdowns.",
    articleCount: 3,
  };

  const allArticles = getAllPublishedArticles();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <ReadingProgressBar />
      <JsonLd data={articleJsonLd(article)} />
      <article className="pb-20">
        {/* Header Breadcrumb & Article Title Header */}
        <div className="border-b border-slate-200 bg-white px-4 py-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/times"
              className="text-xs font-semibold uppercase tracking-wider text-[#008060] hover:underline"
            >
              ← Back to All Stories
            </Link>

            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-full bg-[#008060]/10 px-3 py-1 text-xs font-bold text-[#008060]">
                {article.category}
              </span>
              {article.isPremium && (
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700">
                  Times Insider Exclusive
                </span>
              )}
            </div>

            <h1 className="times-headline mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-[2.65rem]">
              {article.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-slate-600 font-serif">
              {article.description}
            </p>

            {/* Author Bio Header & Client Actions */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3">
                <Link
                  href={`/times/writers/${writer.id}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#008060] font-bold text-white shadow-xs"
                >
                  {writer.name.charAt(0)}
                </Link>
                <div>
                  <Link
                    href={`/times/writers/${writer.id}`}
                    className="text-base font-bold text-slate-900 hover:text-[#008060]"
                  >
                    {writer.name}
                  </Link>
                  <p className="text-xs text-slate-500">
                    {writer.role} • {article.date} • {article.readTimeMinutes} min read
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShareButton title={article.title} />
              </div>
            </div>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="mx-auto max-w-3xl px-4 pt-8">
          {/* Formatted Article Content */}
          <RichArticleRenderer content={article.content} />

          {/* In-Article High Yield Monetization Slot */}
          <AdPlacement type="in-article" />

          {/* Client Interactive Actions: Tipping + Likes */}
          <ArticleClientActions writer={writer} initialLikes={article.likesCount ?? 84} />

          {/* Sponsored Partner Spotlight */}
          <AdPlacement type="sponsored" />

          {/* Native App Conversion Card */}
          <AppConversionCard />

          {/* Author Spotlight Card at Footer of Article */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#008060] text-xl font-bold text-white">
                {writer.name.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#008060]">
                  Written by
                </span>
                <h3 className="times-headline text-xl font-bold text-slate-900">
                  {writer.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{writer.bio}</p>
                <Link
                  href={`/times/writers/${writer.id}`}
                  className="mt-3 inline-block text-xs font-semibold text-[#008060] hover:underline"
                >
                  View all articles by {writer.name} →
                </Link>
              </div>
            </div>
          </div>

          {/* Related Stories */}
          {related.length > 0 && (
            <section className="mt-14 space-y-4">
              <h3 className="times-headline text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
                Read Next in Shilingi Times
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/times/${rel.slug}`}
                    className="group block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-[#008060]"
                  >
                    <p className="text-[11px] font-bold uppercase text-[#008060]">
                      {rel.category}
                    </p>
                    <h4 className="times-headline mt-1 text-base font-bold text-slate-900 group-hover:text-[#008060] line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-500">
                      {rel.author} • {rel.readTimeMinutes} min
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
