import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seoSchemas';
import { RATGEBER_ARTICLES } from '@/data/ratgeberArticles';

interface SitemapEntry {
  path: string;
  priority?: number;
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
  lastModified?: Date;
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/energiecheck', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/stromkosten-senken', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gaskosten-senken', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/photovoltaik-beratung', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gewerbe-energiecheck', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/energieberatung-deutschland', priority: 0.7, changeFrequency: 'weekly' },

  // Neue intent-spezifische Landingpages (No-Spend SEO-Hebel)
  { path: '/stromvertrag-pruefen', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/gasvertrag-pruefen', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/jahresabrechnung-pruefen', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/anbieterwechsel-pruefen', priority: 0.8, changeFrequency: 'weekly' },

  // Hilfsseiten / Topic-Authority
  { path: '/fragen-antworten', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/ratgeber', priority: 0.7, changeFrequency: 'weekly' },

  // Rechtliche Pflicht-/Hilfsseiten
  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const articleEntries: SitemapEntry[] = RATGEBER_ARTICLES.map((a) => ({
    path: `/ratgeber/${a.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: new Date(a.publishedAt),
  }));

  return [...STATIC_ENTRIES, ...articleEntries].map((e) => ({
    url: `${SITE_URL}${e.path}`,
    lastModified: e.lastModified ?? now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
