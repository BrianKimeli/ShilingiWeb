import Link from "next/link";
import { notFound } from "next/navigation";
import { categoriesList, ArticleCategory } from "@/lib/articles";
import { getAllPublishedArticles } from "@/lib/server-cms";
import { ArticleRow } from "@/components/times/ArticleCard";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return categoriesList.map((cat) => ({
    category: cat.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: catParam } = await params;
  const categoryName = categoriesList.find(
    (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-") === catParam
  );
  if (!categoryName) return { title: "Category Not Found | The Shilingi Times" };
  return {
    title: `${categoryName} — The Shilingi Times`,
    description: `Read all articles and reports in ${categoryName} on The Shilingi Times.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: catParam } = await params;
  const categoryName = categoriesList.find(
    (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-") === catParam
  );

  if (!categoryName) notFound();

  const allArticles = getAllPublishedArticles();
  const categoryArticles = allArticles.filter(
    (a) => a.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link
        href="/times"
        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#008060] hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Shilingi Times
      </Link>

      <div className="mt-4 border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#008060]">
          Category Archive
        </span>
        <h1 className="times-headline mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
          {categoryName}
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Showing all published stories and analytical reports tagged under {categoryName}.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {categoryArticles.length > 0 ? (
          categoryArticles.map((art) => <ArticleRow key={art.slug} article={art} />)
        ) : (
          <p className="text-sm text-slate-500 py-12 text-center">
            No articles published yet in this category. Check back soon!
          </p>
        )}
      </div>
    </main>
  );
}
