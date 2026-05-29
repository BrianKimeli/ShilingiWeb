import { HeroArticle, ArticleRow, SectionDivider } from "@/components/times/ArticleCard";
import NewsletterCTA from "@/components/times/NewsletterCTA";
import JsonLd from "@/components/JsonLd";
import { articles, getFeaturedArticle } from "@/lib/articles";
import { websiteJsonLd } from "@/lib/seo";

export default function TimesHomePage() {
  const featured = getFeaturedArticle();
  const latest = articles.filter((a) => a.slug !== featured.slug);

  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <main className="mx-auto max-w-2xl space-y-10 px-5 pb-20 pt-8">
        <HeroArticle article={featured} />

        {latest.length > 0 && (
          <>
            <SectionDivider label="More stories" />
            <div className="space-y-4">
              {latest.map((article) => (
                <ArticleRow key={article.slug} article={article} />
              ))}
            </div>
          </>
        )}

        <NewsletterCTA />
      </main>
    </>
  );
}
