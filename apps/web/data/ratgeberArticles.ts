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

export interface RatgeberHowToStep {
  name: string;
  text: string;
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
  /** Optional: HowTo-Schema fuer Google Rich-Snippet (nur bei klaren Schritt-Anleitungen). */
  howTo?: {
    name: string;
    description: string;
    totalTimeMinutes?: number;
    steps: RatgeberHowToStep[];
  };
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
  {
    slug: 'stromnachzahlung-was-tun',
    title: 'Stromnachzahlung erhalten – was Sie jetzt tun sollten',
    description:
      'Wenn die Jahresabrechnung mit einer hohen Nachforderung kommt: So prüfen Sie, ob die Nachzahlung berechtigt ist und welche Optionen Sie haben.',
    category: 'Strom',
    readingMinutes: 5,
    publishedAt: '2026-06-29',
    intro:
      'Eine hohe Nachzahlung wirkt erstmal wie ein Schock – ist aber nicht zwangsläufig gerechtfertigt. Bevor Sie zahlen, prüfen Sie systematisch, ob die Zahlen plausibel sind und welche Schritte Ihnen zustehen.',
    sections: [
      {
        heading: 'Schritt 1: Zählerstand abgleichen',
        body: 'Vergleichen Sie den Endzählerstand auf der Abrechnung mit dem Wert auf Ihrem realen Zähler. Geschätzte Stände werden manchmal zu hoch angesetzt – ein realer Stand ist immer Ihre stärkste Grundlage. Machen Sie ein Foto mit Datum für Ihre Unterlagen.',
      },
      {
        heading: 'Schritt 2: Verbrauchsanstieg plausibel?',
        body: 'Vergleichen Sie den Jahresverbrauch mit dem Vorjahr. Wenn er um mehr als 15 % gestiegen ist und es keinen erkennbaren Grund gibt (neuer Mitbewohner, neue Wärmepumpe, neue Geräte, Homeoffice), ist das verdächtig. Möglicherweise wurde abgelesen vom falschen Zähler oder eine Ablesung versäumt.',
      },
      {
        heading: 'Schritt 3: Tariferhöhung im Abrechnungsjahr?',
        body: 'Wenn der Anbieter im Lauf des Jahres den Arbeitspreis erhöht hat, muss er das schriftlich angekündigt haben – mit Sonderkündigungsrecht. Lesen Sie die Abrechnung: Steht dort eine Preiserhöhung? Wenn ja, prüfen Sie, ob Sie damals die Mitteilung erhalten haben.',
      },
      {
        heading: 'Schritt 4: Nachzahlung in Raten anbieten lassen',
        body: 'Wenn die Nachzahlung berechtigt ist, sie aber Ihre Liquidität sprengt: Anbieter sind verpflichtet, auf Antrag Ratenzahlung zu gewähren – meist 6 bis 12 Monate. Schreiben Sie das schriftlich und fügen Sie eine kurze Begründung bei.',
      },
      {
        heading: 'Schritt 5: Neuen Abschlag selbst anpassen',
        body: 'Wenn der neue monatliche Abschlag deutlich höher angesetzt wurde, können Sie eine Anpassung beantragen – sofern der Verbrauchsanstieg ein Einmal-Ereignis war (z.B. zusätzliche Person für ein Jahr).',
      },
      {
        heading: 'Schritt 6: Tarifcheck als Folge',
        body: 'Eine hohe Nachzahlung ist oft ein Signal, dass der Tarif nicht mehr passt. Vergleichen Sie ergebnisoffen, ob ein anderer Vertrag wirtschaftlich besser wäre – oder ob ein Bleiben aufgrund einer Preisgarantie sinnvoller ist.',
      },
    ],
    howTo: {
      name: 'Stromnachzahlung systematisch prüfen',
      description:
        'Sechs-Schritte-Anleitung zur strukturierten Prüfung einer Stromnachzahlung, bevor Sie sie akzeptieren oder zurückweisen.',
      totalTimeMinutes: 30,
      steps: [
        { name: 'Zählerstand abgleichen', text: 'Realen Zählerstand fotografieren und mit der Abrechnung vergleichen.' },
        { name: 'Verbrauch plausibilisieren', text: 'Jahresverbrauch mit Vorjahr vergleichen, Abweichungen über 15 % begründen können.' },
        { name: 'Tariferhöhung prüfen', text: 'Schauen, ob im Abrechnungsjahr eine Preiserhöhung kommuniziert wurde – inkl. Sonderkündigungsrecht.' },
        { name: 'Ratenzahlung beantragen', text: 'Falls Nachzahlung berechtigt: schriftlich Ratenzahlung über 6-12 Monate beim Anbieter beantragen.' },
        { name: 'Neuen Abschlag anpassen', text: 'Falls Verbrauchsanstieg einmalig war: Anpassung des neuen monatlichen Abschlags beantragen.' },
        { name: 'Tarif-Folgecheck', text: 'Persönlich prüfen lassen, ob der aktuelle Tarif noch passt – ergebnisoffen.' },
      ],
    },
    faq: [
      {
        q: 'Wie lange habe ich Zeit, die Nachzahlung zu prüfen?',
        a: 'Die Fälligkeit steht in der Abrechnung – meist 2-4 Wochen nach Rechnungsdatum. Sie können binnen dieser Frist Einspruch erheben oder Ratenzahlung anfragen.',
      },
      {
        q: 'Kann ich die Nachzahlung verweigern?',
        a: 'Nein, einseitige Verweigerung führt zu Mahnverfahren und Sperrandrohung. Wenn Sie Posten für falsch halten: schriftlich reklamieren, gleichzeitig den unstrittigen Teil zahlen.',
      },
    ],
    relatedLinks: [
      { href: '/jahresabrechnung-pruefen', label: 'Jahresabrechnung prüfen lassen' },
      { href: '/ratgeber/stromabrechnung-pruefen-checkliste', label: 'Checkliste: 8 Posten der Stromabrechnung' },
    ],
  },
  {
    slug: 'gaszaehler-ablesen-richtig',
    title: 'Gaszähler richtig ablesen: So vermeiden Sie Schätzfehler',
    description:
      'Den Gaszählerstand korrekt ablesen, dokumentieren und an den Anbieter übermitteln – mit dem Ziel, Schätzfehler in der Jahresabrechnung zu vermeiden.',
    category: 'Gas',
    readingMinutes: 4,
    publishedAt: '2026-06-29',
    intro:
      'Wer den Gaszähler einmal pro Jahr selbst abliest und an den Anbieter meldet, verhindert die häufigste Fehlerquelle in der Jahresabrechnung: geschätzte Verbräuche.',
    sections: [
      {
        heading: 'Welche Ziffern zählen?',
        body: 'Auf dem Gaszähler stehen schwarze Ziffern (vor dem Komma) und rote Ziffern (nach dem Komma). Für die Ablesung zählen nur die schwarzen Ziffern. Beispiel: Anzeige 12345,678 – Sie melden 12345.',
      },
      {
        heading: 'Wann ablesen?',
        body: 'Mindestens einmal pro Jahr zum Stichtag (steht auf der Ablesekarte), idealerweise zusätzlich Anfang Januar – das gibt Ihnen einen sauberen Vergleichswert für das Folgejahr.',
      },
      {
        heading: 'Mit Foto dokumentieren',
        body: 'Machen Sie immer ein Foto mit Datum, das die Zählernummer und den Stand zeigt. Das ist Ihre Absicherung gegen spätere Diskussionen über geschätzte Werte.',
      },
      {
        heading: 'Übermittlung an den Anbieter',
        body: 'Die meisten Anbieter haben ein Online-Portal oder eine App. Wer es analog macht, kann die Ablesekarte ausfüllen oder per E-Mail mit Foto melden. Wichtig: rechtzeitig vor dem Ablesestichtag.',
      },
      {
        heading: 'Was tun bei deutlicher Abweichung?',
        body: 'Wenn Ihr realer Stand deutlich von der bisherigen Schätzung des Anbieters abweicht, kann der Verbrauch unrealistisch hoch oder niedrig erscheinen. Bei Unklarheiten lohnt ein Anruf beim Anbieter – ggf. ist ein technischer Defekt vorgelegen.',
      },
    ],
    faq: [
      {
        q: 'Muss ich den Zähler selbst ablesen?',
        a: 'Wenn der Anbieter eine Ablesekarte schickt, sind Sie zur Mitwirkung verpflichtet. Wer nicht meldet, bekommt einen geschätzten Wert – meist zum Nachteil.',
      },
      {
        q: 'Was ist die Zählernummer?',
        a: 'Eine eindeutige Nummer (8-10 Stellen) auf dem Zähler – sie steht in jeder Abrechnung und auf der Ablesekarte. Bei Selbstablesung immer mitfotografieren.',
      },
    ],
    relatedLinks: [
      { href: '/gasvertrag-pruefen', label: 'Gasvertrag prüfen lassen' },
    ],
  },
  {
    slug: 'speicher-photovoltaik-sinnvoll',
    title: 'Photovoltaik-Speicher: Wann sich die Investition wirklich rechnet',
    description:
      'Stromspeicher erhöhen die Eigenverbrauchsquote – aber nicht jede Anlage profitiert. Welche Faktoren entscheiden, ob ein Speicher wirtschaftlich ist.',
    category: 'Photovoltaik',
    readingMinutes: 7,
    publishedAt: '2026-06-29',
    intro:
      'Speicher klingen logisch: Sonnenstrom tagsüber sammeln, abends nutzen. In der Wirtschaftlichkeitsrechnung gewinnen sie aber nur unter bestimmten Bedingungen.',
    sections: [
      {
        heading: 'Variable 1: Kosten pro kWh Speicherkapazität',
        body: 'Marktpreise 2026 für Lithium-Speicher: 700-1.000 Euro pro kWh nutzbarer Kapazität (inkl. Installation). Ein 10-kWh-Speicher kostet also 7.000-10.000 Euro. Wer mehrere Angebote einholt, kann 15-25 % Unterschied finden.',
      },
      {
        heading: 'Variable 2: Eigenverbrauchssteigerung',
        body: 'Ohne Speicher liegt die Eigenverbrauchsquote typisch bei 25-35 %. Mit passendem Speicher steigt sie auf 50-70 %. Aber: ein zu großer Speicher bringt keine zusätzliche Quote, nur höhere Kosten.',
      },
      {
        heading: 'Variable 3: Strompreis-Annahme über 20 Jahre',
        body: 'Speicher rechnen sich nur, wenn der Strompreis hoch ist oder weiter steigt. Bei konservativer Annahme (Preis stagniert um 30 Cent/kWh) ist die Amortisation grenzwertig. Wer mit deutlicher Steigerung rechnet, bekommt bessere Zahlen – muss aber die Annahme begründen können.',
      },
      {
        heading: 'Variable 4: Zyklen und Lebensdauer',
        body: 'Lithium-Speicher haben typisch 6.000-10.000 Ladezyklen Garantie. Bei einem Zyklus pro Tag entspricht das 16-27 Jahren – im Realbetrieb meist etwas weniger durch Effizienzverluste. Die wirtschaftliche Nutzungsdauer liegt bei 12-18 Jahren.',
      },
      {
        heading: 'Variable 5: Eignet sich Ihr Lastprofil?',
        body: 'Wer tagsüber wenig zuhause ist (klassischer Vollzeit-Job ohne Homeoffice) und keine Wärmepumpe / kein E-Auto hat, hat einen niedrigen Eigenverbrauch. Hier kann ein Speicher den Eigenverbrauch deutlich steigern. Wer hingegen schon einen hohen Tagverbrauch hat, profitiert weniger zusätzlich.',
      },
      {
        heading: 'Faustregel',
        body: 'Ein Speicher rechnet sich am besten, wenn (a) Strompreis voraussichtlich steigt, (b) Sie wenig Tagesverbrauch haben, aber abends viel, (c) die Anlage selbst eher klein-mittelgroß ist (5-10 kWp), (d) Wärmepumpe oder E-Auto in den nächsten 5 Jahren geplant ist. Trifft eines nicht zu, sollte die Wirtschaftlichkeit konkret nachgerechnet werden.',
      },
    ],
    faq: [
      {
        q: 'Wie groß sollte mein Speicher sein?',
        a: 'Faustregel: ungefähr 1 kWh Speicher pro 1 kWp Anlage und 1.000 kWh Verbrauch. Bei 8 kWp Anlage und 4.000 kWh Verbrauch also ~5-8 kWh Speicher.',
      },
      {
        q: 'Was passiert, wenn der Speicher voll ist?',
        a: 'Überschüssiger Strom wird ins Netz eingespeist – Sie erhalten die Einspeisevergütung (~7-8 Cent/kWh für Anlagen bis 10 kWp).',
      },
      {
        q: 'Muss ich den Speicher anmelden?',
        a: 'Ja, sowohl beim Netzbetreiber als auch in der Marktstammdatenregistratur. Ihr Installateur sollte das übernehmen.',
      },
    ],
    relatedLinks: [
      { href: '/photovoltaik-beratung', label: 'Photovoltaik-Beratung anfordern' },
      { href: '/ratgeber/photovoltaik-wirtschaftlichkeit-eigenheim', label: 'Wirtschaftlichkeit von PV im Eigenheim' },
    ],
  },
  {
    slug: 'smart-meter-pflicht',
    title: 'Smart Meter in Deutschland: Wer betroffen ist und was sich ändert',
    description:
      'Der schrittweise Smart-Meter-Rollout in Deutschland – wann Sie betroffen sind, welche Vorteile entstehen und welche Wahlmöglichkeiten Sie haben.',
    category: 'Strom',
    readingMinutes: 5,
    publishedAt: '2026-06-29',
    intro:
      'Smart Meter werden in Deutschland nach klaren Schwellenwerten verpflichtend eingebaut. Wer wann betroffen ist und welche Vorteile (und Kosten) tatsächlich entstehen.',
    sections: [
      {
        heading: 'Wer bekommt verpflichtend ein Smart Meter?',
        body: 'Verpflichtender Einbau (intelligentes Messsystem): bei einem Jahresverbrauch über 6.000 kWh sowie bei Erzeugern mit Photovoltaikanlagen über 7 kWp. Optional: alle anderen Haushalte können Smart Meter freiwillig beziehen.',
      },
      {
        heading: 'Was kostet ein Smart Meter?',
        body: 'Die Kosten sind gesetzlich gedeckelt. Für Privathaushalte unter 10.000 kWh Verbrauch: maximal 20 Euro pro Jahr. Bei höherem Verbrauch und besonderen Anlagen steigt der Preis – maximal 50-100 Euro/Jahr.',
      },
      {
        heading: 'Welche Vorteile entstehen?',
        body: 'Smart Meter ermöglichen variable Tarife (Spotmarkt-Tarif, Wärmepumpentarif, dynamische Tarife). Wer flexibel verbrauchen kann (Wärmepumpe, E-Auto, Waschmaschine zu günstigen Zeiten), kann Strompreis-Vorteile nutzen. Wer das nicht kann, profitiert wenig.',
      },
      {
        heading: 'Wer baut den Zähler ein?',
        body: 'Der grundzuständige Messstellenbetreiber – meist der lokale Netzbetreiber. Sie haben aber das Recht, einen anderen Messstellenbetreiber zu wählen, was bei besonderen Wünschen sinnvoll sein kann.',
      },
      {
        heading: 'Datenschutz: Wer sieht meine Daten?',
        body: 'Smart Meter senden im Standard nur in vereinbarten Intervallen Verbrauchsdaten an den Messstellenbetreiber. Ihre Daten sind verschlüsselt, dürfen nicht zu Werbezwecken verwendet werden und unterliegen strikten BSI-Sicherheitsanforderungen.',
      },
    ],
    faq: [
      {
        q: 'Kann ich den Einbau ablehnen?',
        a: 'Bei verpflichtenden Fällen (Verbrauch >6.000 kWh, große PV-Anlage): nein, der Einbau muss geduldet werden. Bei freiwilligem Einbau natürlich ja.',
      },
      {
        q: 'Lohnt sich ein dynamischer Tarif für mich?',
        a: 'Nur, wenn Sie Verbrauch zeitlich verschieben können (Wärmepumpe, E-Auto-Ladung, Geräte programmierbar). Sonst nicht.',
      },
    ],
    relatedLinks: [
      { href: '/stromvertrag-pruefen', label: 'Stromvertrag prüfen lassen' },
      { href: '/glossar/smart-meter', label: 'Glossar: Smart Meter' },
    ],
  },
  {
    slug: 'waermepumpe-stromtarif',
    title: 'Wärmepumpentarif: Was ihn günstiger macht und worauf Sie achten sollten',
    description:
      'Spezielle Wärmepumpentarife sind oft günstiger als der reguläre Hausstrom. Wie sie funktionieren, was sie kosten und welche Voraussetzungen gelten.',
    category: 'Strom',
    readingMinutes: 6,
    publishedAt: '2026-06-29',
    intro:
      'Wärmepumpen brauchen viel Strom. Mit einem speziellen Wärmepumpentarif können Sie das günstig machen – wenn der Zähler getrennt ist und der Netzbetreiber kooperiert.',
    sections: [
      {
        heading: 'Was ist ein Wärmepumpentarif?',
        body: 'Ein Stromtarif speziell für den Betrieb einer Wärmepumpe. Der Strom wird über einen separaten Zähler abgerechnet und ist im Arbeitspreis günstiger als der reguläre Haushaltsstrom – typisch 4-10 Cent/kWh weniger.',
      },
      {
        heading: 'Voraussetzung: getrennter Zähler',
        body: 'Wärmepumpentarife setzen einen separaten Zähler für die Wärmepumpe voraus. Bei Neubauten wird dieser meist direkt mit installiert. Bei bestehenden Anlagen muss er nachgerüstet werden – Kosten typisch 800-1.500 Euro inkl. Elektriker.',
      },
      {
        heading: 'Steuerbarkeit: Netzbetreiber darf abregeln',
        body: 'Ein Teil der Günstigkeit kommt davon, dass der Netzbetreiber die Wärmepumpe bei Netzengpässen kurzzeitig (max. 2 h am Stück, max. 3x täglich) abregeln darf. Moderne Wärmepumpen kompensieren das problemlos – das Haus wird nicht spürbar kalt.',
      },
      {
        heading: 'Kombi mit Photovoltaik',
        body: 'Ein Wärmepumpentarif lässt sich mit einer eigenen PV-Anlage kombinieren – wenn Sie tagsüber Eigenstrom in die Wärmepumpe schicken und nachts den günstigeren Netzstrom nutzen. Voraussetzung: passende Steuerung und ggf. ein dynamischer Tarif.',
      },
      {
        heading: 'Anbieterwahl',
        body: 'Wärmepumpentarife sind nicht überall verfügbar – das Angebot hängt vom Netzbetreiber und vom Versorger ab. Wer auf dem Land lebt, hat oft weniger Auswahl als in Großstädten. Eine ergebnisoffene Prüfung pro Postleitzahl ist sinnvoll.',
      },
    ],
    faq: [
      {
        q: 'Wie viel günstiger ist ein Wärmepumpentarif?',
        a: 'Typisch 15-25 % günstiger als regulärer Hausstrom – je nach Region und Anbieter. Bei 4.000 kWh Wärmepumpenverbrauch sind das 200-400 Euro Ersparnis pro Jahr.',
      },
      {
        q: 'Kann ich auch ohne separaten Zähler einen Wärmepumpentarif nutzen?',
        a: 'Nein. Ohne getrennte Zählung wird der Strom als regulärer Hausstrom abgerechnet. Die Nachrüstung kostet etwas, lohnt sich aber meist binnen 3-5 Jahren.',
      },
    ],
    relatedLinks: [
      { href: '/stromvertrag-pruefen', label: 'Stromvertrag prüfen lassen' },
      { href: '/glossar/waermepumpe', label: 'Glossar: Wärmepumpe' },
    ],
  },
  {
    slug: 'energiekosten-gewerbe-senken',
    title: 'Energiekosten im Unternehmen senken: 7 Hebel ohne große Investition',
    description:
      'Gewerbestrom und -gas verstehen, Lastprofile auswerten und Tarifoptionen prüfen – Hebel, die ohne große Investition Wirkung zeigen.',
    category: 'Gewerbe',
    readingMinutes: 7,
    publishedAt: '2026-06-29',
    intro:
      'Energiekosten im Gewerbe lassen sich auf mehreren Ebenen senken – nicht jeder Hebel erfordert eine teure Anlageninvestition. Sieben Hebel, die häufig übersehen werden.',
    sections: [
      {
        heading: '1. Lastprofil verstehen',
        body: 'Bei Verbräuchen über 100.000 kWh/Jahr wird viertelstündlich gemessen (RLM-Zählung). Die Lastspitzen werden separat abgerechnet. Wer seine Spitzen kennt, kann sie gezielt vermeiden – z.B. durch Lastversetzung großer Verbraucher.',
      },
      {
        heading: '2. Beschaffung in Tranchen statt Stichtag',
        body: 'Wer den gesamten Bedarf zu einem Stichtag einkauft, ist dem Marktpreis zu diesem Stichtag ausgeliefert. Tranchenbeschaffung – Aufteilung in 4-12 Käufe übers Jahr – mittelt das Marktrisiko aus.',
      },
      {
        heading: '3. Vertragslaufzeit anpassen',
        body: 'Längere Verträge (24-36 Monate) bringen oft kein besseres Konditionsverhältnis – zumindest dann nicht, wenn die Preise volatil sind. 12-monatige Verträge geben Flexibilität und ermöglichen, auf Marktveränderungen zu reagieren.',
      },
      {
        heading: '4. Stromsteuer-Ermäßigung prüfen',
        body: 'Produzierende Gewerbe können unter bestimmten Voraussetzungen eine Stromsteuer-Ermäßigung beantragen (Spitzenausgleich). Voraussetzung: Energie- oder Umweltmanagementsystem (z.B. ISO 50001 oder EMAS).',
      },
      {
        heading: '5. Photovoltaik mit Eigenverbrauch',
        body: 'Auf einem Gewerbedach wirkt PV oft besonders gut, weil der Stromverbrauch tagsüber stattfindet (genau wenn die Sonne scheint). Eigenverbrauchsquoten von 70-90 % sind realistisch – damit liegt die Amortisation oft unter 8 Jahren.',
      },
      {
        heading: '6. Anschlussleistung prüfen',
        body: 'Viele Betriebe zahlen für eine zu hohe Anschlussleistung, die sie real nie ausreizen. Eine technische Prüfung kann die nötige Leistung neu festlegen und damit den Leistungspreis senken.',
      },
      {
        heading: '7. Lieferantenbindung aufbrechen',
        body: 'Standardausschreibungen mit 2-3 alternativen Lieferanten pro Jahr disziplinieren den Bestandsanbieter und schaffen Preistransparenz. Eine ergebnisoffene Marktanalyse pro Standort lohnt sich gerade bei verstreuten Filialnetzen.',
      },
    ],
    faq: [
      {
        q: 'Ab welcher Größe lohnt ein professioneller Energieeinkauf?',
        a: 'Faustregel: ab 250.000 kWh Strom oder 500.000 kWh Gas pro Jahr lohnt eine professionelle Beschaffungsstrategie. Darunter reicht oft eine jährliche Marktanalyse.',
      },
      {
        q: 'Was ist der Spitzenausgleich?',
        a: 'Eine teilweise Rückerstattung der gezahlten Strom- und Energiesteuer für produzierende Unternehmen, gebunden an ein Energiemanagementsystem.',
      },
    ],
    relatedLinks: [
      { href: '/gewerbe-energiecheck', label: 'Gewerbe-Energie-Check anfordern' },
    ],
  },
];

export function getArticle(slug: string): RatgeberArticle | undefined {
  return RATGEBER_ARTICLES.find((a) => a.slug === slug);
}
