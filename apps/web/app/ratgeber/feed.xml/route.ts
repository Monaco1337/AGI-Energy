import { NextResponse } from 'next/server';
import { RATGEBER_ARTICLES } from '@/data/ratgeberArticles';
import { SITE_URL } from '@/lib/seoSchemas';

/**
 * RSS-2.0-Feed der Ratgeber-Artikel.
 * Zweck: Crawler-Beschleunigung, RSS-Aggregatoren (Feedly, Inoreader),
 * Discovery durch Themenportale - ohne Spend.
 */
export const dynamic = 'force-static';
export const revalidate = 3600;

function escapeXml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function rfc822(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

export function GET() {
  const articles = [...RATGEBER_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const lastBuild = articles[0]?.publishedAt ?? new Date().toISOString();

  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/ratgeber/${a.slug}`;
      return `<item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(a.publishedAt)}</pubDate>
      <category>${escapeXml(a.category)}</category>
      <description>${escapeXml(a.description)}</description>
    </item>`;
    })
    .join('\n    ');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AGI Energy - Ratgeber</title>
    <link>${SITE_URL}/ratgeber</link>
    <description>Aufklaerende Artikel rund um Strom, Gas und Photovoltaik. Herstellerunabhaengig, ergebnisoffen.</description>
    <language>de-DE</language>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
    <atom:link href="${SITE_URL}/ratgeber/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
