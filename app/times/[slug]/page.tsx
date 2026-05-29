import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import JsonLd from "@/components/JsonLd";
import { ArticleRow } from "@/components/times/ArticleCard";
import ReadNext from "@/components/times/ReadNext";
import ShareButton from "@/components/times/ShareButton";
import { articles, getArticleBySlug } from "@/lib/articles";
import { articleJsonLd, buildArticleMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return buildArticleMetadata(article);
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <article className="pb-20">
        <div className="border-b border-slate-200 bg-white px-5 py-6">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/times"
              className="text-base font-medium text-[#008060] hover:underline"
            >
              ← Back to all stories
            </Link>

            <p className="mt-6 text-sm font-medium text-[#008060]">{article.category}</p>
            <h1 className="times-headline mt-2 text-3xl leading-tight text-slate-900 sm:text-[2.125rem]">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{article.description}</p>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#008060] text-sm font-semibold text-white">
                  {article.author.charAt(0)}
                </span>
                <div>
                  <p className="text-base font-medium text-slate-900">{article.author}</p>
                  <p className="text-sm text-slate-500">
                    {article.date} · {article.readTimeMinutes} min read
                  </p>
                </div>
              </div>
              <ShareButton title={article.title} />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-5 pt-10">
          <MarkdownContent content={article.content} />

          {related.length > 0 && (
            <section className="mt-14 space-y-6">
              <ReadNext articles={related} />
              <div className="space-y-4">
                {related.map((a) => (
                  <ArticleRow key={a.slug} article={a} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
