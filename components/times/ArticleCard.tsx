import Link from "next/link";
import { Newspaper } from "lucide-react";
import type { Article } from "@/lib/articles";

function AuthorLine({ article }: { article: Article }) {
  return (
    <p className="text-sm text-slate-500">
      <span className="font-medium text-slate-700">{article.author}</span>
      <span className="text-slate-400"> · </span>
      {article.date}
      <span className="text-slate-400"> · </span>
      {article.readTimeMinutes} min read
    </p>
  );
}

export function HeroArticle({ article }: { article: Article }) {
  return (
    <Link href={`/times/${article.slug}`} className="group block">
      <article>
        <div className="relative mb-6 flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-[#008060]/8 to-[#008060]/20 sm:h-56">
          <span className="absolute right-4 top-4 rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
            Featured
          </span>
          <Newspaper className="h-16 w-16 text-[#008060]/30" strokeWidth={1.25} aria-hidden />
        </div>

        <p className="text-sm font-medium text-[#008060]">{article.category}</p>
        <h2 className="times-headline mt-2 text-2xl leading-snug text-slate-900 transition group-hover:text-[#008060] sm:text-[1.75rem]">
          {article.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate-600">{article.description}</p>
        <div className="mt-5">
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
        <p className="text-sm font-medium text-[#008060]">{article.category}</p>
        <h3 className="times-headline mt-2 text-xl leading-snug text-slate-900 group-hover:text-[#008060]">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-base leading-relaxed text-slate-600">
          {article.description}
        </p>
        <div className="mt-4">
          <AuthorLine article={article} />
        </div>
      </article>
    </Link>
  );
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <h2 className="border-t border-slate-200 pt-10 text-sm font-semibold text-slate-500">{label}</h2>
  );
}
