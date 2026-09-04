import Link from "next/link";
import { notFound } from "next/navigation";
import { getWriterById, writers } from "@/lib/writers";
import { ArticleRow } from "@/components/times/ArticleCard";
import { getPublishedArticlesByWriter } from "@/lib/server-cms";
import { Twitter, Linkedin, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return writers.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const writer = getWriterById(id);
  if (!writer) return { title: "Writer Not Found | The Shilingi Times" };
  return {
    title: `${writer.name} — Columnist at The Shilingi Times`,
    description: writer.bio,
  };
}

export default async function WriterProfilePage({ params }: PageProps) {
  const { id } = await params;
  const writer = getWriterById(id);
  if (!writer) notFound();

  const authorArticles = getPublishedArticlesByWriter(writer.id);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link
        href="/times"
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#008060] hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Shilingi Times
      </Link>

      {/* Writer Bio Header Card */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#008060] text-3xl font-bold text-white shadow-md">
            {writer.name.charAt(0)}
          </div>

          <div className="flex-1">
            <span className="rounded-full bg-[#008060]/10 px-3 py-1 text-xs font-bold text-[#008060]">
              Editors & Writers
            </span>
            <h1 className="times-headline mt-2 text-3xl font-bold text-slate-900">
              {writer.name}
            </h1>
            <p className="mt-1 text-sm font-semibold text-slate-600">{writer.role}</p>
            <p className="mt-3 text-base leading-relaxed text-slate-700">{writer.bio}</p>

            <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
              {writer.twitter && (
                <a
                  href={writer.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-[#008060]"
                >
                  <Twitter className="h-4 w-4" /> Twitter / X
                </a>
              )}
              {writer.linkedin && (
                <a
                  href={writer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-[#008060]"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Articles by Writer */}
      <section className="mt-10">
        <h2 className="times-headline text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Articles Authored by {writer.name} ({authorArticles.length})
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-4">
          {authorArticles.length > 0 ? (
            authorArticles.map((art) => <ArticleRow key={art.slug} article={art} />)
          ) : (
            <p className="text-sm text-slate-500 py-8 text-center">
              No articles published yet by this author.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
