/**
 * Ratgeber-Artikel fuer organischen Long-Tail-Traffic.
 * Inhalt: aufklaerend, ergebnisoffen, ohne Werbeversprechen oder absolute Ersparnis-Zahlen.
 *
 * Wenn ein neuer Artikel hinzukommt, wird er automatisch in /ratgeber gelistet,
 * unter /ratgeber/[slug] gerendert und in /sitemap.xml ausgespielt.
 */

export interface RatgeberSection {
  heading?: string;
  body: string;
}

export interface RatgeberFaq {
  q: string;
  a: string;
}

export interface RatgeberArticle {
  slug: string;
  title: string;
  description: string;
  category: 'Strom' | 'Gas' | 'Wechsel' | 'Photovoltaik' | 'Gewerbe' | 'Grundlagen';
  readingMinutes: number;
  publishedAt: string;
  intro: string;
  sections: RatgeberSection[];
  faq?: RatgeberFaq[];
  relatedLinks?: { href: string; label: string }[];
}

export const RATGEBER_ARTICLES: RatgeberArticle[] = [
  {
    slug: 'stromabrechnung-pruefen-checkliste',
    title: 'Stromabrechnung prüfen: 8 Posten, die Sie selbst kontrollieren können',
    description:
      'Welche Positionen in der Stromabrechnung am häufigsten falsch oder ungünstig sind – und wie Sie sie ohne Fachwissen selbst überprüfen.',
    category: 'Strom',
    readingMinutes: 6,
    publishedAt: '2026-06-29',
    intro:
      'Eine Stromabrechnung besteht aus mehreren Positionen, die zusammenpassen müssen. Wenn eine Stelle nicht stimmt, kippt schnell der ganze Jahresbetrag. Diese acht Punkte können Sie selbst kontrollieren, bevor Sie eine Nachzahlung akzeptieren – oder eine Erstattung anfordern.',
    sections: [
      {
        heading: '1. Zählerstand: Schätzwert oder echter Wert?',
        body: 'Auf der Abrechnung steht immer, ob der Endzählerstand abgelesen oder geschätzt wurde. Geschätzte Werte sind erlaubt, aber häufig zu hoch angesetzt. Vergleichen Sie den Wert mit Ihrem realen Zählerstand am Stichtag – Abweichungen über 5 % sind ein Grund, eine Korrektur anzufordern.',
      },
      {
        heading: '2. Verbrauch im Vergleich zum Vorjahr',
        body: 'Ihr Jahresverbrauch sollte plausibel zu Ihrem Haushalt und zum Vorjahr passen. Größere Sprünge ohne erkennbaren Grund (kein Umzug, kein neues Gerät, keine geänderte Personenzahl) sind verdächtig. Realistischer Verbrauch: 1 Person ~1.500 kWh, 2 Personen ~2.500 kWh, 4 Personen ~4.000 kWh – je nach Geräten und Heizung.',
      },
      {
        heading: '3. Arbeitspreis: aktueller Vertragspreis?',
        body: 'Der Arbeitspreis (Cent pro kWh) muss dem Stand entsprechen, der für den Abrechnungszeitraum vertraglich galt. Häufiger Fehler: Anbieter erhöhen den Preis im laufenden Jahr und rechnen den höheren Preis rückwirkend für mehr Monate ab, als zulässig.',
      },
      {
        heading: '4. Grundpreis: monatlich konstant?',
        body: 'Der Grundpreis ist meist ein fester Betrag pro Monat (z.B. 12 € × 12). Prüfen Sie, ob er sauber multipliziert wurde und ob es einen Wechsel im Tarif gab.',
      },
      {
        heading: '5. Boni und Wechselprämien tatsächlich verrechnet?',
        body: 'Wenn Ihnen beim Vertragsabschluss ein Sofortbonus oder Neukundenrabatt zugesagt wurde, muss er in der Jahresabrechnung sichtbar abgezogen sein. Sehr häufiges Missgeschick: Boni "vergessen" und nur auf Reklamation hin nachgebucht.',
      },
      {
        heading: '6. Abschlagshöhe und Anzahl',
        body: 'Auf der Abrechnung ist üblicherweise gelistet, wie viele Abschläge in welcher Höhe Sie geleistet haben. Die Summe muss exakt der von Ihnen gezahlten Summe entsprechen. Ein typischer Fehler: ein verrechneter, nicht aber tatsächlich abgezogener Abschlag.',
      },
      {
        heading: '7. Steuern und Umlagen',
        body: 'Stromsteuer, Konzessionsabgabe, KWKG, Offshore-Netzumlage und Umsatzsteuer sind gesetzlich festgelegt – aber pro Cent abhängig vom Arbeitspreis. Wenn der Arbeitspreis falsch ist, ist auch die Umsatzsteuer falsch.',
      },
      {
        heading: '8. Neuer Abschlag für das Folgejahr',
        body: 'Der neue monatliche Abschlag basiert auf dem letzten Jahresverbrauch und dem aktuellen Tarif. Wenn Ihr Verbrauch im Vorjahr ungewöhnlich hoch war (z.B. durch ein einmaliges Ereignis), können Sie eine Anpassung nach unten beantragen, um keine Liquidität unnötig zu binden.',
      },
    ],
    faq: [
      {
        q: 'Was tun, wenn ich eine Position für falsch halte?',
        a: 'Schicken Sie dem Anbieter eine schriftliche Reklamation mit der konkreten Position und Ihrer Berechnung. Wenn die Reklamation nicht ernsthaft bearbeitet wird, kann eine persönliche Prüfung sinnvoll sein, um den Streitpunkt einzuordnen.',
      },
      {
        q: 'Wie lange habe ich Zeit zu reklamieren?',
        a: 'Energie-Forderungen verjähren in der Regel nach 3 Jahren. Reklamationen sollten dennoch zeitnah erfolgen – am besten innerhalb von 6 Wochen nach Rechnungserhalt.',
      },
    ],
    relatedLinks: [
      { href: '/jahresabrechnung-pruefen', label: 'Jahresabrechnung prüfen lassen' },
      { href: '/stromvertrag-pruefen', label: 'Stromvertrag prüfen lassen' },
    ],
  },
  {
    slug: 'anbieterwechsel-wann-lohnt-er-sich',
    title: 'Anbieterwechsel bei Strom und Gas: Wann er sich wirklich lohnt',
    description:
      'Wechseln ist Mittel, nicht Ziel. Was Sie wirklich rechnen müssen, bevor Sie den Stromanbieter wechseln – und wann es besser ist, zu bleiben.',
    category: 'Wechsel',
    readingMinutes: 7,
    publishedAt: '2026-06-29',
    intro:
      'Anbieterwechsel werden in der Werbung oft als selbstverständliche Spar-Aktion dargestellt. In der Praxis sind sie eine Vertragsentscheidung, die sich nur lohnt, wenn mehrere Faktoren zusammenpassen. Was Sie konkret prüfen sollten.',
    sections: [
      {
        heading: 'Faktor 1: Tatsächliche Preisdifferenz über die volle Laufzeit',
        body: 'Vergleichen Sie nicht den ersten Monat, sondern die volle Laufzeit – inkl. Arbeitspreis, Grundpreis und Boni. Sofort- und Neukundenbonus wirken nur einmal. Im zweiten Jahr fällt der Preis oft wieder auf das Marktniveau zurück. Eine ehrliche Rechnung über 24 oder 36 Monate sieht anders aus als die Werbeüberschrift.',
      },
      {
        heading: 'Faktor 2: Preisgarantie versus Preisgleitklausel',
        body: 'Eine echte Preisgarantie deckt Arbeitspreis und Grundpreis (eingeschränkt: nur Arbeitspreis, oder nur "Netto"). Lesen Sie genau: "Nettopreisgarantie" schließt staatliche Abgaben aus – die können dennoch steigen. "Eingeschränkte Preisgarantie" hat Ausnahmen.',
      },
      {
        heading: 'Faktor 3: Laufzeit und Kündigungsfristen',
        body: 'Tarife mit 12 oder 24 Monaten Mindestlaufzeit und 6 Wochen Kündigungsfrist sind Standard. Wenn Sie nicht rechtzeitig kündigen, läuft der Vertrag um 12 Monate weiter – meist zu schlechteren Konditionen.',
      },
      {
        heading: 'Faktor 4: Anbieter-Bonität',
        body: 'Billigste Anbieter sind nicht immer die stabilsten. Vergangene Insolvenzen einzelner Discount-Anbieter haben Kunden mit Nachforderungen oder kurzfristigen Tarifumstellungen erwischt. Ein etwas teurerer, finanziell solider Anbieter kann unter dem Strich besser sein.',
      },
      {
        heading: 'Faktor 5: Sonderkündigungsrechte nutzen',
        body: 'Bei Preiserhöhungen, Tarifumstellungen oder bestimmten Vertragsänderungen haben Sie ein Sonderkündigungsrecht – meist 2-6 Wochen Frist. Wer dieses Recht kennt, kann ohne Laufzeitbindung wechseln.',
      },
      {
        heading: 'Wann sich ein Wechsel nicht lohnt',
        body: 'Wenn Sie noch in einer guten Preisgarantie sind, wenn der neue Tarif nur durch einen einmaligen Bonus billiger wirkt, oder wenn der Anbieter unbekannte Bonität hat – dann ist Bleiben oft die rationalere Entscheidung. Eine seriöse Prüfung sagt Ihnen das auch ehrlich.',
      },
    ],
    faq: [
      {
        q: 'Wie lange dauert ein Anbieterwechsel?',
        a: 'In der Regel 3–6 Wochen. Sie haben in der Zeit keine Versorgungslücke – der neue Anbieter übernimmt automatisch.',
      },
      {
        q: 'Was passiert mit meiner alten Rechnung?',
        a: 'Der alte Anbieter schickt eine Schlussrechnung mit Endzählerstand. Bewahren Sie diese auf – sie ist Grundlage einer eventuellen Reklamation.',
      },
      {
        q: 'Kann ich einen Wechsel widerrufen?',
        a: 'Ja, in der Regel 14 Tage nach Vertragsabschluss (Fernabsatz-Widerruf). Danach gelten die Vertragslaufzeiten.',
      },
    ],
    relatedLinks: [
      { href: '/anbieterwechsel-pruefen', label: 'Anbieterwechsel persönlich prüfen lassen' },
      { href: '/stromvertrag-pruefen', label: 'Stromvertrag prüfen lassen' },
      { href: '/gasvertrag-pruefen', label: 'Gasvertrag prüfen lassen' },
    ],
  },
  {
    slug: 'photovoltaik-wirtschaftlichkeit-eigenheim',
    title: 'Photovoltaik im Eigenheim: Wirtschaftlichkeit ehrlich gerechnet',
    description:
      'Wann sich Photovoltaik für ein Eigenheim rechnet – und welche Annahmen die Wirtschaftlichkeit am stärksten beeinflussen.',
    category: 'Photovoltaik',
    readingMinutes: 8,
    publishedAt: '2026-06-29',
    intro:
      'Photovoltaik wird oft als selbstverständliche Spar-Maßnahme verkauft. In Wahrheit ist es eine Investitionsentscheidung mit klaren Variablen. Wer diese Variablen versteht, kann eine ehrliche Wirtschaftlichkeit rechnen – statt einem Werbe-Bestfall zu vertrauen.',
    sections: [
      {
        heading: 'Variable 1: Spezifischer Ertrag in kWh pro kWp',
        body: 'Die wichtigste Größe. In Deutschland realistisch: 850–1.050 kWh pro kWp installierter Leistung und Jahr, je nach Region und Ausrichtung. Werbeangaben über 1.100 kWh/kWp gelten nur für optimale Bedingungen – nicht für reale Dächer mit Verschattung und Witterung.',
      },
      {
        heading: 'Variable 2: Eigenverbrauchsquote',
        body: 'Strom, den Sie selbst verbrauchen, ist ungefähr 3-4× wertvoller als eingespeister Strom. Ohne Speicher liegt die Eigenverbrauchsquote typisch bei 25–35 %. Mit Speicher 50–70 %. Wer tagsüber zuhause ist (Homeoffice, Rente) und Wärmepumpe/Elektroauto nutzt, kommt höher.',
      },
      {
        heading: 'Variable 3: Anlagenpreis und Speicherpreis',
        body: 'Marktpreise 2026 für schlüsselfertige Anlagen: ~1.300–1.700 € pro kWp ohne Speicher, mit Speicher (10 kWh) etwa 700–1.000 € pro kWh Speicher zusätzlich. Wer mehrere Angebote einholt, kann 15–25 % Unterschied finden.',
      },
      {
        heading: 'Variable 4: Strompreis-Annahme',
        body: 'Wer mit 50 Cent/kWh in 10 Jahren rechnet, kommt zu rosigeren Ergebnissen als bei 35 Cent. Beide sind möglich, keiner ist sicher. Ehrliche Wirtschaftlichkeit rechnet mit drei Szenarien: konservativ (Strompreis stagniert), mittel (~2 % Steigerung/Jahr), optimistisch.',
      },
      {
        heading: 'Variable 5: Amortisationszeit',
        body: 'Realistische Amortisation 2026 für ein Eigenheim mit 5–10 kWp ohne Speicher: 10–14 Jahre. Mit Speicher: 12–16 Jahre. Wer Ihnen unter 8 Jahre verspricht, rechnet mit Bestfall-Annahmen oder verschweigt Wartungs- und Versicherungskosten.',
      },
      {
        heading: 'Wann sich Photovoltaik besonders lohnt',
        body: 'Bei hohem Eigenverbrauch (Wärmepumpe, E-Auto, Homeoffice), bei guter Süd-/Ost-West-Ausrichtung ohne Verschattung, bei stabilem Eigenkapital (Kredit drückt die Rendite) und bei Bauherren, die ohnehin eine neue Dacheindeckung machen.',
      },
      {
        heading: 'Wann eher nicht',
        body: 'Bei stark verschattetem Dach, bei niedrigem Stromverbrauch (<2.000 kWh/Jahr), bei unsicherer Wohnsituation (Verkaufsabsicht in <8 Jahren), oder wenn die Anlage rein aus Förder-Hype gekauft wird ohne klare Eigenverbrauchs-Strategie.',
      },
    ],
    faq: [
      {
        q: 'Brauche ich zwingend einen Speicher?',
        a: 'Nein. Speicher erhöhen den Eigenverbrauchsanteil, verschlechtern aber die Amortisation. Ob er sich lohnt, hängt vom Lastprofil ab.',
      },
      {
        q: 'Was ist mit der Einspeisevergütung?',
        a: 'Die Einspeisevergütung deckt nur einen Bruchteil des Strompreises (Stand 2026: ca. 7–8 Cent/kWh für Anlagen bis 10 kWp). Der Hebel liegt im Eigenverbrauch, nicht in der Einspeisung.',
      },
      {
        q: 'Wie wichtig ist die Ausrichtung?',
        a: 'Süd ist optimal, aber Ost-West-Anlagen liefern oft besser zum tatsächlichen Verbrauchsprofil. Eine ehrliche Rechnung zeigt beide Varianten.',
      },
    ],
    relatedLinks: [
      { href: '/photovoltaik-beratung', label: 'Photovoltaik-Beratung anfordern' },
    ],
  },
];

export function getArticle(slug: string): RatgeberArticle | undefined {
  return RATGEBER_ARTICLES.find((a) => a.slug === slug);
}
