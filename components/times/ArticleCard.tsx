import Link from "next/link";
import { Newspaper, Sparkles, Clock, User } from "lucide-react";
import type { Article } from "@/lib/articles";

export function AuthorLine({ article }: { article: Article }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <span className="flex items-center gap-1 font-semibold text-slate-700">
        <User className="h-3.5 w-3.5 text-[#008060]" />
        {article.author}
      </span>
      <span>•</span>
      <span>{article.date}</span>
      <span>•</span>
      <span className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {article.readTimeMinutes} min read
      </span>
    </div>
  );
}

export function HeroArticle({ article }: { article: Article }) {
  return (
    <Link href={`/times/${article.slug}`} className="group block">
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs transition hover:border-[#008060]/40 hover:shadow-md">
        <div className="relative mb-6 flex h-48 sm:h-64 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#008060]/10 via-[#008060]/5 to-emerald-50/40 border border-emerald-500/10">
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-md bg-slate-900 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
              Lead Story
            </span>
            {article.isPremium && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-2.5 py-1 text-xs font-bold text-white">
                <Sparkles className="h-3 w-3" /> Insider
              </span>
            )}
          </div>
          <Newspaper className="h-20 w-20 text-[#008060]/30 transition group-hover:scale-105" strokeWidth={1.2} />
        </div>

        <p className="text-xs font-bold uppercase tracking-wider text-[#008060]">
          {article.category}
        </p>
        <h2 className="times-headline mt-2 text-2xl leading-snug font-bold text-slate-900 transition group-hover:text-[#008060] sm:text-3xl">
          {article.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600 line-clamp-3">
          {article.description}
        </p>
        <div className="mt-6 border-t border-slate-100 pt-4">
          <AuthorLine article={article} />
        </div>
      </article>
    </Link>
  );
}

export function ArticleRow({ article }: { article: Article }) {
  return (
    <Link
      href={`/times/${article.slug}`}
      className="group block rounded-xl border border-slate-200 bg-white p-5 transition hover:border-[#008060]/40 hover:shadow-sm"
    >
      <article>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#008060]">
            {article.category}
          </span>
          {article.isPremium && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
              <Sparkles className="h-3 w-3 text-amber-500" /> Premium
            </span>
          )}
        </div>
        <h3 className="times-headline mt-2 text-xl font-bold leading-snug text-slate-900 group-hover:text-[#008060]">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {article.description}
        </p>
        <div className="mt-4 border-t border-slate-100 pt-3">
          <AuthorLine article={article} />
        </div>
      </article>
    </Link>
  );
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="my-8 flex items-center justify-between border-b border-slate-200 pb-3">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">{label}</h2>
    </div>
  );
}
