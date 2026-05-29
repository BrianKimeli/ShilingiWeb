import type { Metadata } from "next";
import type { Article } from "./articles";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

export function buildArticleMetadata(article: Article): Metadata {
  const url = `${SITE_URL}/times/${article.slug}`;
  const title = article.title;

  return {
    title,
    description: article.description,
    authors: [{ name: article.author }],
    keywords: [
      article.category,
      "personal finance",
      "Africa",
      "money",
      "The Shilingi Times",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: article.description,
      siteName: SITE_NAME,
      publishedTime: article.date,
      authors: [article.author],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: article.description,
    },
    robots: { index: true, follow: true },
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: article.author,
    },
    datePublished: article.date,
    articleSection: article.category,
    inLanguage: "en",
    mainEntityOfPage: `${SITE_URL}/times/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  };
}

export const timesHomeMetadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/times` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/times`,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};
