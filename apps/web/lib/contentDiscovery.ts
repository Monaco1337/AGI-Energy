import { RATGEBER_ARTICLES, type RatgeberArticle } from '@/data/ratgeberArticles';
import type { GlossaryEntry } from '@/data/energyGlossary';

/**
 * Findet thematisch passende Ratgeber-Artikel zu einem Glossar-Begriff.
 * Strategie:
 *   1. Suche nach exakter Erwaehnung des Term im Title/Intro/Sections.
 *   2. Fallback ueber Kategorie-Mapping (Glossar.category -> Ratgeber.category).
 *   3. Maximal `limit` Treffer, gewichtet nach Title-Match > Intro > Body.
 */
const CATEGORY_MAP: Record<GlossaryEntry['category'], RatgeberArticle['category'][]> = {
  Strom: ['Strom', 'Wechsel', 'Grundlagen'],
  Gas: ['Gas', 'Wechsel', 'Grundlagen'],
  Photovoltaik: ['Photovoltaik', 'Grundlagen'],
  Vertrag: ['Wechsel', 'Strom', 'Gas', 'Grundlagen'],
  Technik: ['Photovoltaik', 'Grundlagen'],
  Recht: ['Wechsel', 'Grundlagen'],
  Gewerbe: ['Gewerbe', 'Wechsel'],
};

export function findRelatedArticlesForTerm(
  entry: GlossaryEntry,
  limit = 3,
): RatgeberArticle[] {
  const termLower = entry.term.toLowerCase();
  const scored = RATGEBER_ARTICLES.map((a) => {
    let score = 0;
    if (a.title.toLowerCase().includes(termLower)) score += 5;
    if (a.description.toLowerCase().includes(termLower)) score += 3;
    if (a.intro.toLowerCase().includes(termLower)) score += 2;
    for (const sec of a.sections) {
      if (sec.body.toLowerCase().includes(termLower)) score += 1;
    }
    const allowedCats = CATEGORY_MAP[entry.category] ?? [];
    if (allowedCats.includes(a.category)) score += 0.5;
    return { article: a, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((r) => r.article);
}

/**
 * Findet die 3 thematisch passendsten Ratgeber-Artikel fuer eine Stadt-Seite.
 * Strategie: Mischung aus Strom, Gas und Wechsel - die universellsten Themen
 * fuer eine Stadt-LP.
 */
export function pickArticlesForCity(limit = 3): RatgeberArticle[] {
  const priorityCats: RatgeberArticle['category'][] = ['Wechsel', 'Strom', 'Gas'];
  const seen = new Set<string>();
  const out: RatgeberArticle[] = [];
  for (const cat of priorityCats) {
    const found = RATGEBER_ARTICLES.find((a) => a.category === cat && !seen.has(a.slug));
    if (found) {
      out.push(found);
      seen.add(found.slug);
      if (out.length >= limit) return out;
    }
  }
  for (const a of RATGEBER_ARTICLES) {
    if (out.length >= limit) break;
    if (seen.has(a.slug)) continue;
    out.push(a);
    seen.add(a.slug);
  }
  return out;
}
