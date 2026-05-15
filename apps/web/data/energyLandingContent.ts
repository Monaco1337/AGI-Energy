/** Zentrale Copy für die Premium-Landingpage (AGI Energy). */

export const energyLandingContent = {
  hero: {
    eyebrow: 'PERSÖNLICHE ENERGIEPRÜFUNG',
    eyebrowCategories: 'STROM · GAS · SOLAR · GEWERBE',
    h1: 'Persönliche Energieprüfung statt anonymer Tarifportale.',
    h1Alt:
      'Ihre Energiekosten verstehen. Mit persönlicher Prüfung statt automatischer Tariflogik.',
    subline:
      'Laden Sie Ihre Jahresabrechnung hoch und erhalten Sie eine individuelle Einschätzung durch einen persönlichen Ansprechpartner – verständlich, transparent und auf Ihre Situation abgestimmt.',
    ctaPrimary: 'Persönliche Prüfung anfragen',
    ctaSecondary: 'So funktioniert es',
    trustLine:
      'Persönlicher Ansprechpartner · Vertrauliche Prüfung · Keine automatische Tarifentscheidung',
    process: [
      { step: '1', title: 'Unterlagen sicher übermitteln' },
      { step: '2', title: 'Persönliche Analyse' },
      { step: '3', title: 'Klare Rückmeldung' },
    ],
    uploadMicrocopy:
      'Ihre Unterlagen werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet – persönlich geprüft, nicht automatisiert.',
  },
  leadForm: {
    cardTitle: 'Kostenlose persönliche Energieprüfung starten',
    cardSubline:
      'Ihre Unterlagen werden nicht automatisiert ausgewertet, sondern persönlich geprüft und vertraulich behandelt.',
    badgeFree: 'Kostenlos',
    uploadHeadline: 'Jahresabrechnung vertraulich übermitteln',
    uploadHint: 'PDF oder Foto · sicher übertragen · max. 10 MB',
    uploadTrustLine:
      'Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.',
    submit: 'Jetzt persönlich prüfen lassen',
    submitting: 'Anfrage wird vertraulich übermittelt…',
    submitFootnote: 'Keine automatische Tarifentscheidung · Persönliche Rückmeldung',
    successTitle: 'Anfrage sicher eingegangen',
    successText:
      'Vielen Dank. Ihre Unterlagen wurden vertraulich übermittelt. Ein persönlicher Ansprechpartner prüft Ihre Anfrage und meldet sich mit einer klaren Einschätzung.',
    successCta: 'Weitere Anfrage starten',
    consentLabel:
      'Ich stimme der vertraulichen Verarbeitung meiner Anfrage durch AGI Energy zu. Hinweise zur Datenverarbeitung finden Sie in der Datenschutzerklärung.',
  },
  trustBar: {
    items: [
      'Persönlicher Ansprechpartner',
      'Keine automatische Tarifentscheidung',
      'Vertrauliche Prüfung Ihrer Unterlagen',
      'Individuelle Rückmeldung statt Standardvergleich',
      'DSGVO-orientierte Verarbeitung',
    ],
  },
  /** „Problem" → Trust-Section (persönliche Betreuung statt anonymer Vergleichslogik) */
  problem: {
    eyebrow: 'PERSÖNLICHE BETREUUNG',
    title: 'Persönliche Betreuung statt anonymer Vergleichslogik',
    intro:
      'Viele Plattformen zeigen automatisch generierte Tariflisten. Wir prüfen jede Anfrage individuell und melden uns persönlich mit einer verständlichen Einschätzung zurück.',
    cards: [
      {
        title: 'Persönlicher Ansprechpartner',
        text: 'Feste Kontaktperson statt anonymes Callcenter.',
      },
      {
        title: 'Individuelle Prüfung',
        text: 'Verbrauch, Laufzeiten, Region und Situation werden persönlich betrachtet.',
      },
      {
        title: 'Vertrauliche Behandlung',
        text: 'Ihre Unterlagen werden ausschließlich zur Anfragebearbeitung verwendet.',
      },
      {
        title: 'Verständliche Empfehlung',
        text: 'Keine komplizierten Tariftabellen, sondern klare Rückmeldungen.',
      },
    ],
  },
  process: {
    eyebrow: 'ABLAUF',
    title: 'In 3 Schritten zur persönlichen Energieprüfung',
    steps: [
      {
        title: 'Unterlagen sicher übermitteln',
        text: 'Laden Sie Ihre Jahresabrechnung vertraulich hoch.',
      },
      {
        title: 'Persönliche Analyse',
        text: 'Ein Ansprechpartner prüft Verbrauch, Tarifstruktur und Situation individuell.',
      },
      {
        title: 'Klare Rückmeldung',
        text: 'Sie erhalten eine verständliche Einschätzung statt unübersichtlicher Tariflisten.',
      },
    ],
  },
  categories: {
    eyebrow: 'BEREICHE',
    title: 'Eine Plattform für Strom, Gas, Solar und Gewerbe',
    cta: 'Persönlich prüfen lassen',
    cards: [
      {
        id: 'strom' as const,
        icon: '⚡',
        title: 'Strom',
        text: 'Prüfung Ihres aktuellen Stromvertrags anhand von Verbrauch, Region, Laufzeit und Tarifdetails.',
      },
      {
        id: 'gas' as const,
        icon: '🔥',
        title: 'Gas',
        text: 'Analyse Ihres Gastarifs mit Blick auf Verbrauch, Grundpreis und Vertragsbedingungen.',
      },
      {
        id: 'solar' as const,
        icon: '☀️',
        title: 'Solar',
        text: 'Vorqualifizierung für Photovoltaik- und Speicherlösungen inklusive Potenzialbewertung.',
      },
      {
        id: 'gewerbe' as const,
        icon: '🏢',
        title: 'Gewerbe',
        text: 'Individuelle Energieprüfung für Unternehmen mit komplexeren Verbrauchsstrukturen.',
      },
    ],
  },
  concierge: {
    eyebrow: 'IHR ANSPRECHPARTNER',
    title: 'Ein fester Ansprechpartner. Keine anonyme Tariflogik.',
    intro:
      'Unsere Plattform ist nicht darauf ausgelegt, Sie mit möglichst vielen Optionen zu überfordern. Wir bereiten eine ruhige, strukturierte Prüfung vor – persönlich begleitet, vertraulich behandelt.',
    bullets: [
      'fester persönlicher Ansprechpartner',
      'individuelle Prüfung Ihrer Unterlagen',
      'verständliche, ruhige Rückmeldung',
      'keine automatische Tarifvermittlung',
      'keine öffentliche Tarifliste',
      'für Strom, Gas, Solar und Gewerbe',
    ],
    previewStatuses: [
      'Anfrage sicher eingegangen',
      'Unterlagen vertraulich erfasst',
      'Persönliche Prüfung wird vorbereitet',
      'Ihr Ansprechpartner erstellt Ihre Einschätzung',
    ],
  },
  /** Anti-Scam – klares Vertrauenssignal */
  antiScam: {
    eyebrow: 'KLARE GRENZEN',
    title: 'Keine Massenvermittlung. Keine anonyme Tarifmaschine.',
    intro:
      'Die Plattform dient ausschließlich zur persönlichen Prüfung Ihrer Anfrage durch einen Ansprechpartner.',
    badges: [
      'Keine öffentliche Weitergabe Ihrer Daten',
      'Keine automatische Tarifvermittlung',
      'Keine Massenweiterleitung',
      'Persönliche Bearbeitung',
      'Vertrauliche Anfrageprüfung',
    ],
  },
  security: {
    eyebrow: 'DATENSCHUTZ',
    title: 'Ihre Daten werden zweckgebunden verarbeitet',
    intro:
      'Die übermittelten Unterlagen werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht öffentlich verarbeitet.',
    points: [
      'Upload nur mit Zustimmung',
      'Vertrauliche Verarbeitung',
      'Keine öffentliche Veröffentlichung',
      'DSGVO-orientierte Prozesse',
      'Persönliche Anfragebearbeitung',
    ],
  },
  finalCta: {
    title: 'Jetzt persönliche Energieprüfung anfragen',
    text: 'Starten Sie die kostenlose Prüfung Ihrer aktuellen Energieverträge und erhalten Sie eine persönliche Rückmeldung.',
    button: 'Persönliche Prüfung starten',
    trust:
      'Persönlicher Ansprechpartner · Vertrauliche Bearbeitung · Keine Tarifmaschine',
  },
  stickyMobile: {
    label: 'Persönliche Prüfung starten',
  },
  categorySelector: {
    strom: { label: 'Strom', hint: 'Haushalt' },
    gas: { label: 'Gas', hint: 'Wärme & Warmwasser' },
    solar: { label: 'Solar', hint: 'PV & Speicher' },
    gewerbe: { label: 'Gewerbe', hint: 'Unternehmen' },
  },
} as const;
