import Link from "next/link";
import { articles } from "@/lib/articles";
import { ArrowRight, Newspaper } from "lucide-react";

export default function TimesPreview() {
  const picks = articles.slice(0, 3);

  return (
    <section className="border-t border-slate-200 bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-8">
          <div>
            <span className="rounded-md bg-[#008060]/10 px-3 py-1 text-xs font-bold text-[#008060]">
              Official Media Engine
            </span>
            <h2 className="times-masthead mt-2 text-3xl font-bold italic text-slate-900 sm:text-4xl">
              The Shilingi Times
            </h2>
            <p className="mt-2 text-sm font-semibold text-[#008060]">
              East Africa's Financial Daily
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-600 max-w-xl">
              Plain-spoken money analysis, chama group wealth strategies, T-bill guides, and fintech insights from expert Kenyan columnists.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/times"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#008060] px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-[#006b4f]"
            >
              Explore Publication <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {picks.map((article) => (
            <Link
              key={article.slug}
              href={`/times/${article.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition hover:border-[#008060]/50 hover:bg-white hover:shadow-md"
            >
              <div>
                <p className="text-xs font-bold uppercase text-[#008060]">
                  {article.category}
                </p>
                <h3 className="times-headline mt-2 text-lg font-bold text-slate-900 group-hover:text-[#008060]">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs text-slate-600">
                  {article.description}
                </p>
              </div>
              <div className="mt-6 border-t border-slate-200/60 pt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-800">{article.author}</span>
                <span>{article.readTimeMinutes} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
