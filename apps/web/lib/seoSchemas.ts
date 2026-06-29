/**
 * JSON-LD-Helfer fuer SEO/Rich-Snippets.
 * Wirkt ohne Werbe-Spend: erhoeht CTR in den SERPs (FAQ-Snippets, Sitelinks,
 * Organization-Karte) und verbessert die maschinelle Verstaendlichkeit der Seite.
 */

export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.agienergy.de').replace(/\/$/, '');

const BRAND = 'AGI Energy';
const TAGLINE = 'Persönliche Energieprüfung statt anonymer Tarifportale.';

export function organizationSchema() {
  const contactEmail = process.env.SALES_INBOX_EMAIL;
  const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE;

  const contactPoints: Record<string, unknown>[] = [];
  if (contactEmail) {
    contactPoints.push({
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: contactEmail,
      availableLanguage: ['de'],
      areaServed: 'DE',
    });
  }
  if (contactPhone) {
    contactPoints.push({
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: contactPhone,
      availableLanguage: ['de'],
      areaServed: 'DE',
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    legalName: 'AGI Energy by AGI Works',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon-512`,
    description: TAGLINE,
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    sameAs: [] as string[],
    ...(contactPoints.length > 0 ? { contactPoint: contactPoints } : {}),
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BRAND,
    description: TAGLINE,
    inLanguage: 'de-DE',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

interface ServiceSchemaInput {
  path: string;
  name: string;
  description: string;
  serviceType: string;
}

export function serviceSchema({ path, name, description, serviceType }: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name,
    serviceType,
    description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    audience: { '@type': 'Audience', audienceType: 'Privatpersonen und Gewerbe in Deutschland' },
    url: `${SITE_URL}${path}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      description: 'Unverbindliche Erstprüfung – keine automatische Vertragsumstellung.',
    },
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

interface ArticleSchemaInput {
  path: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  category?: string;
}

export function articleSchema({
  path,
  title,
  description,
  datePublished,
  dateModified,
  category,
}: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}${path}#article`,
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: 'de-DE',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    image: `${SITE_URL}/icon-512`,
    ...(category ? { articleSection: category } : {}),
  };
}

interface DefinedTermSchemaInput {
  path: string;
  term: string;
  definition: string;
  category?: string;
}

export function definedTermSchema({ path, term, definition, category }: DefinedTermSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}${path}#term`,
    name: term,
    description: definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'AGI Energy – Energie-Glossar',
      url: `${SITE_URL}/glossar`,
    },
    ...(category ? { termCode: category } : {}),
  };
}

interface HowToStepInput {
  name: string;
  text: string;
}

interface HowToSchemaInput {
  path: string;
  name: string;
  description: string;
  totalTimeMinutes?: number;
  steps: HowToStepInput[];
}

export function howToSchema({ path, name, description, totalTimeMinutes, steps }: HowToSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}${path}#howto`,
    name,
    description,
    ...(totalTimeMinutes ? { totalTime: `PT${totalTimeMinutes}M` } : {}),
    step: steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

interface LocalBusinessSchemaInput {
  path: string;
  city: string;
  postalCodePrefix?: string;
  region: string;
  lat?: number;
  lng?: number;
}

export function localBusinessSchema({
  path,
  city,
  region,
  postalCodePrefix,
  lat,
  lng,
}: LocalBusinessSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}${path}#localbusiness`,
    name: `AGI Energy – Energieberatung ${city}`,
    description: `Persönliche Energieprüfung für Strom, Gas, Photovoltaik und Gewerbe in ${city} und Umgebung. Ohne automatische Vertragsumstellung.`,
    url: `${SITE_URL}${path}`,
    image: `${SITE_URL}/icon-512`,
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'AdministrativeArea', name: region },
    },
    ...(lat && lng
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: lat,
            longitude: lng,
          },
        }
      : {}),
    ...(postalCodePrefix
      ? {
          serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: lat && lng ? { '@type': 'GeoCoordinates', latitude: lat, longitude: lng } : undefined,
            description: `Postleitzahlenraum ${postalCodePrefix}*`,
          },
        }
      : {}),
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  };
}

export function jsonLdScriptProps(payload: unknown) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(payload) },
  } as const;
}
