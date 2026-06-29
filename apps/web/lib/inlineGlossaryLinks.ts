import type { ReactNode } from 'react';
import { createElement, Fragment } from 'react';
import { GLOSSARY } from '@/data/energyGlossary';

/**
 * Automatisches Inline-Linking von Glossar-Begriffen innerhalb redaktioneller Texte.
 *
 * Ziel: SEO-Boost durch dichtere semantische Verlinkung *ohne* Over-Linking.
 * Strategie:
 *   - Pro Artikel/Body wird ein Begriff hoechstens EINMAL verlinkt (erste Erwaehnung).
 *   - Maximal `maxLinksPerText` Begriffe pro Aufruf, um Lesefluss zu schuetzen.
 *   - Match auf Wortgrenzen (case-insensitive), keine Teilstrings.
 *   - Begriffe in absteigender Laenge werden zuerst gematcht (z. B. "Heizwert" vor "Heiz").
 *
 * Rueckgabe: ReactNode (Mischung aus Strings und <a>-Elementen).
 */
export interface LinkOptions {
  /** Slugs, die explizit NICHT verlinkt werden sollen (z. B. der aktuelle Eintrag). */
  excludeSlugs?: string[];
  /** Obergrenze fuer Auto-Links im uebergebenen Text. Default 5. */
  maxLinksPerText?: number;
  /** Pfad-Praefix, default /glossar. */
  pathPrefix?: string;
  /** Zusaetzliche CSS-Klassen am Link. */
  linkClassName?: string;
}

interface IndexedTerm {
  slug: string;
  term: string;
  termLower: string;
}

let _indexed: IndexedTerm[] | null = null;

function index(): IndexedTerm[] {
  if (_indexed) return _indexed;
  _indexed = GLOSSARY.map((g) => ({
    slug: g.slug,
    term: g.term,
    termLower: g.term.toLowerCase(),
  })).sort((a, b) => b.term.length - a.term.length);
  return _indexed;
}

const DEFAULT_LINK_CLASS =
  'border-b border-dotted border-energyGreen/70 text-navy hover:text-energyGreen transition';

export function linkifyGlossary(
  text: string,
  options: LinkOptions = {},
): ReactNode {
  const {
    excludeSlugs = [],
    maxLinksPerText = 5,
    pathPrefix = '/glossar',
    linkClassName = DEFAULT_LINK_CLASS,
  } = options;
  if (!text || maxLinksPerText <= 0) return text;

  const excluded = new Set(excludeSlugs);
  const used = new Set<string>(); // bereits verlinkte Slugs in diesem Aufruf

  // Bestes Match (laengster Begriff) ab Position i suchen.
  function bestMatchAt(haystackLower: string, i: number): IndexedTerm | null {
    for (const t of index()) {
      if (used.has(t.slug) || excluded.has(t.slug)) continue;
      const end = i + t.termLower.length;
      if (end > haystackLower.length) continue;
      if (haystackLower.slice(i, end) !== t.termLower) continue;
      // Wortgrenze beidseitig pruefen (lat. Buchstaben, Ziffern, Umlaute, Bindestrich).
      const left = i === 0 ? ' ' : haystackLower[i - 1] ?? ' ';
      const right = end >= haystackLower.length ? ' ' : haystackLower[end] ?? ' ';
      if (isWordChar(left) || isWordChar(right)) continue;
      return t;
    }
    return null;
  }

  const lower = text.toLowerCase();
  const out: ReactNode[] = [];
  let buf = '';
  let i = 0;
  let placed = 0;
  while (i < text.length) {
    if (placed < maxLinksPerText) {
      const m = bestMatchAt(lower, i);
      if (m) {
        if (buf) out.push(buf);
        buf = '';
        const slice = text.slice(i, i + m.term.length);
        out.push(
          createElement(
            'a',
            {
              key: `g-${m.slug}-${i}`,
              href: `${pathPrefix}/${m.slug}`,
              className: linkClassName,
              'data-glossary': m.slug,
            },
            slice,
          ),
        );
        used.add(m.slug);
        placed += 1;
        i += m.term.length;
        continue;
      }
    }
    buf += text[i] ?? '';
    i += 1;
  }
  if (buf) out.push(buf);
  if (out.length === 0) return text;
  if (out.length === 1) return out[0];
  // Fragmente brauchen Keys; einfach durchnummerieren.
  return createElement(
    Fragment,
    null,
    ...out.map((n, k) =>
      typeof n === 'string'
        ? createElement(Fragment, { key: `t-${k}` }, n)
        : n,
    ),
  );
}

function isWordChar(ch: string): boolean {
  if (!ch) return false;
  const c = ch.charCodeAt(0);
  // ASCII a-z, A-Z, 0-9
  if ((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122)) return true;
  // Deutsche Umlaute & ß sowie eszett, akzentuierte Zeichen
  if ('äöüÄÖÜßéèáàíìóòúù'.includes(ch)) return true;
  return false;
}
