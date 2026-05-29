import Link from "next/link";
import { articles } from "@/lib/articles";

export default function TimesPreview() {
  const picks = articles.slice(0, 3);

  return (
    <section className="border-t border-slate-200 bg-white py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="times-masthead text-3xl font-bold italic text-slate-900 sm:text-4xl">
              The Shilingi Times
            </h2>
            <div className="my-2.5 h-px w-20 bg-slate-800" />
            <p className="text-sm font-semibold text-[#008060]">Your Financial Daily</p>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Straight talk on money from people who live with the same bills you do.
            </p>
          </div>
          <Link
            href="/times"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#008060] px-5 py-3 text-base font-semibold text-white hover:bg-[#006b4f]"
          >
            Open the publication
          </Link>
        </div>

        <ul className="mt-10 space-y-5">
          {picks.map((article) => (
            <li key={article.slug}>
              <Link href={`/times/${article.slug}`} className="group block">
                <p className="text-sm font-medium text-[#008060]">{article.category}</p>
                <h3 className="times-headline mt-1 text-xl text-slate-900 group-hover:text-[#008060]">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {article.author} · {article.readTimeMinutes} min
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
