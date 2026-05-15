import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const now = new Date();
  const urls = [
    '',
    '/energiecheck',
    '/stromkosten-senken',
    '/gaskosten-senken',
    '/photovoltaik-beratung',
    '/gewerbe-energiecheck',
    '/energieberatung-deutschland',
    '/datenschutz',
  ];
  return urls.map((u) => ({ url: `${base}${u}`, lastModified: now, changeFrequency: 'weekly', priority: u === '' ? 1 : 0.7 }));
}
