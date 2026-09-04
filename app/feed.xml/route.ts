import { NextResponse } from "next/server";
import { getAllPublishedArticles } from "@/lib/server-cms";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = getAllPublishedArticles();

  const itemsXml = articles
    .map((art) => {
      const link = `${SITE_URL}/times/${art.slug}`;
      const pubDate = new Date(art.date).toUTCString();

      return `    <item>
      <title>${escapeXml(art.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <dc:creator>${escapeXml(art.author)}</dc:creator>
      <category>${escapeXml(art.category)}</category>
      <description>${escapeXml(art.description)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/times</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
