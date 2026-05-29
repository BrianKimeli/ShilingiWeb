import Link from "next/link";
import type { Article } from "@/lib/articles";

export default function ReadNext({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
      <p className="text-base font-semibold text-slate-900">Keep reading</p>
      <ul className="mt-4 space-y-3">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={`/times/${a.slug}`} className="text-base text-[#008060] hover:underline">
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
