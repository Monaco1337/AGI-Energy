/**
 * Zentrale FAQ-Bibliothek fuer AGI Energy.
 * Wird im FAQ-Hub (/fragen-antworten) gerendert und ueber FAQ-Schema bei Google
 * fuer Rich-Snippets ausgespielt. Inhalte: substanziell, ergebnisoffen, ohne
 * Werbeversprechen - DSGVO/UWG-konform.
 */

export interface FaqEntry {
  q: string;
  a: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  intro: string;
  items: FaqEntry[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'ablauf',
    title: 'Ablauf der Prüfung',
    intro:
      'Wie eine persönliche Energieprüfung bei AGI Energy konkret ablaeuft – von der Anfrage bis zur Rueckmeldung.',
    items: [
      {
        q: 'Wie läuft die Prüfung der Jahresabrechnung ab?',
        a: 'Sie schicken uns Ihre Eckdaten – optional auch die Jahresabrechnung. Wir prüfen Verbrauch, Abschlag und Tarifposten persönlich und melden uns innerhalb von 24 Stunden an Werktagen mit einer verständlichen Einschätzung.',
      },
      {
        q: 'Wie schnell bekomme ich eine Rückmeldung?',
        a: 'In der Regel innerhalb von 24 Stunden an Werktagen. Bei kurzfristigen Wechselfristen priorisieren wir die Prüfung.',
      },
      {
        q: 'Wer meldet sich bei mir?',
        a: 'Ein persönlicher Ansprechpartner – kein Callcenter und kein Tarif-Roboter. Sie hören die Stimme einer realen Person, die Ihre Zahlen vor dem Anruf bereits gesichtet hat.',
      },
      {
        q: 'Kann ich die Prüfung auch ohne Telefon machen?',
        a: 'Ja. Wenn Sie nur per E-Mail erreichbar sein möchten, geben Sie das im Formular an. Wir respektieren Ihren Wunsch nach dem von Ihnen gewählten Kanal.',
      },
      {
        q: 'Wechseln Sie nach der Prüfung automatisch meinen Anbieter?',
        a: 'Nein. Wir prüfen und beraten – die Entscheidung bleibt vollständig bei Ihnen. Ein Wechsel passiert nur, wenn Sie ihn ausdrücklich beauftragen.',
      },
    ],
  },
  {
    id: 'kosten',
    title: 'Kosten & Verpflichtungen',
    intro:
      'Was die Pruefung kostet und woran Sie erkennen, dass wir keine versteckten Verpflichtungen aufbauen.',
    items: [
      {
        q: 'Was kostet die Prüfung?',
        a: 'Die Erstprüfung ist für Sie kostenfrei und unverbindlich – ohne automatische Vertragsumstellung und ohne Verpflichtung. Sie zahlen nichts und müssen sich zu nichts verpflichten.',
      },
      {
        q: 'Verdienen Sie an einem Anbieterwechsel?',
        a: 'Wenn ein Wechsel zustande kommt und Sie das ausdrücklich beauftragen, erhalten wir vom neuen Anbieter eine marktübliche Provision. Diese hat keinen Einfluss auf unsere ergebnisoffene Prüfung – wir empfehlen einen Wechsel nur dann, wenn er sich für Sie rechnet.',
      },
      {
        q: 'Entstehen versteckte Kosten?',
        a: 'Nein. Es gibt keine Abos, keine Bearbeitungsgebühren und keine Vermittlungsentgelte, die Sie tragen müssten.',
      },
      {
        q: 'Was ist, wenn sich ein Wechsel nicht lohnt?',
        a: 'Dann sagen wir Ihnen das auch ehrlich. Eine seriöse Prüfung ist ergebnisoffen – wir empfehlen nur dann einen Schritt, wenn er sich für Sie wirklich rechnet.',
      },
    ],
  },
  {
    id: 'daten',
    title: 'Daten & Datenschutz',
    intro:
      'Was mit Ihren Daten passiert, wer sie sieht und wie wir DSGVO und IT-Sicherheit umsetzen.',
    items: [
      {
        q: 'Werden meine Daten an Dritte weitergegeben?',
        a: 'Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Eine Weitergabe an Dritte erfolgt nur, wenn ein Anbieterwechsel ausdrücklich von Ihnen beauftragt wird – und auch dann nur zweckgebunden.',
      },
      {
        q: 'Wo werden meine Daten gespeichert?',
        a: 'Auf Servern in der Europäischen Union, DSGVO-konform. Wir nutzen keine US-Cloud-Anbieter für Ihre personenbezogenen Daten.',
      },
      {
        q: 'Kann ich meine Daten löschen lassen?',
        a: 'Ja, jederzeit und ohne Begründung. Auf unserer Datenschutz-Anfrageseite können Sie Auskunft, Berichtigung oder Löschung Ihrer Daten anstoßen.',
      },
      {
        q: 'Bekomme ich nach der Prüfung Werbeanrufe?',
        a: 'Nein. Wir kontaktieren Sie nur, wenn Sie der gewählten Kontaktart ausdrücklich zugestimmt haben – und nur zum Zweck Ihrer konkreten Anfrage.',
      },
      {
        q: 'Muss ich die Jahresabrechnung hochladen?',
        a: 'Nein. Der Upload beschleunigt die Prüfung, ist aber optional. Sie können auch nur Ihre Eckdaten angeben.',
      },
    ],
  },
  {
    id: 'strom-gas',
    title: 'Strom & Gas',
    intro:
      'Die haeufigsten Fragen rund um Strom- und Gasvertraege, Tarife und Wechselsituationen.',
    items: [
      {
        q: 'Warum nicht einfach ein Tarifportal nutzen?',
        a: 'Tarifportale rechnen Theorie auf Basis weniger Eingaben. Wir prüfen Ihren konkreten Vertrag, Ihren tatsächlichen Verbrauch und Ihre Lebenssituation – und sagen Ihnen, ob ein Wechsel überhaupt sinnvoll ist.',
      },
      {
        q: 'Mein Gasabschlag wurde stark erhöht – ist das gerechtfertigt?',
        a: 'Das hängt von mehreren Faktoren ab: Verbrauchsentwicklung, aktueller Arbeitspreis, gesetzliche Umlagen und Preisgleitklauseln im Vertrag. Wir prüfen das und ordnen die Erhöhung ein.',
      },
      {
        q: 'Lohnt sich ein Anbieterwechsel beim Gas aktuell?',
        a: 'Manchmal ja, manchmal nicht. Wir vergleichen Ihren bestehenden Vertrag mit realistischen Alternativen und sagen Ihnen, ob ein Wechsel sich für Sie konkret rechnet.',
      },
      {
        q: 'Wie lange dauert ein Anbieterwechsel?',
        a: 'In der Regel 3–6 Wochen, abhängig von Ihrer aktuellen Kündigungsfrist. Wir kümmern uns auf Wunsch um den Übergang, sodass Sie ohne Versorgungslücke wechseln.',
      },
      {
        q: 'Bekommt der alte Anbieter mit, dass ich mich beraten lasse?',
        a: 'Nein. Die Prüfung passiert vertraulich. Ein Wechsel wird – wenn überhaupt – erst nach Ihrer expliziten Zustimmung initiiert.',
      },
    ],
  },
  {
    id: 'photovoltaik',
    title: 'Photovoltaik',
    intro:
      'Was Sie ueber eine ehrliche Wirtschaftlichkeitspruefung bei Photovoltaik wissen sollten.',
    items: [
      {
        q: 'Lohnt sich Photovoltaik für mein Haus überhaupt?',
        a: 'Das hängt von Dachfläche, Ausrichtung, Verschattung, Verbrauchsprofil und Speichersituation ab. Wir rechnen mit konservativen Annahmen und sagen Ihnen ehrlich, wo die Wirtschaftlichkeit kippt.',
      },
      {
        q: 'Brauche ich zwingend einen Speicher?',
        a: 'Nicht zwingend. Ein Speicher kann die Wirtschaftlichkeit verbessern, kann aber auch verschlechtern – je nach Lastprofil und Preisniveau. Wir zeigen Ihnen beide Rechnungen.',
      },
      {
        q: 'Wie schnell rechnet sich Photovoltaik?',
        a: 'Realistisch zwischen 10 und 15 Jahren – je nach Dach, Eigenverbrauch und Anlagenpreis. Wer Ihnen unter 8 Jahre verspricht, rechnet meist mit Bestfall-Annahmen.',
      },
    ],
  },
  {
    id: 'gewerbe',
    title: 'Gewerbe & Unternehmen',
    intro:
      'Energie-Pruefung fuer Unternehmen: Lastprofile, Beschaffungslogik und Eigenstromnutzung.',
    items: [
      {
        q: 'Ist die Prüfung auch für mein Unternehmen geeignet?',
        a: 'Ja. Für Unternehmen prüfen wir Strom, Gas und Photovoltaik-Potenziale gemeinsam – mit Blick auf Lastprofil, Beschaffungsoptionen und Eigenstromnutzung am Standort.',
      },
      {
        q: 'Welche Branchen profitieren besonders?',
        a: 'Standortgebundene Betriebe mit hohem Thermo-, Kälte- oder Prozessenergiebedarf: Bäckereien, Gastronomie und Hotellerie, Pflege und Medizin, Fitness, Handel und Werkstätten, Produktion und Logistik, Immobilienbestände sowie viele landwirtschaftliche Betriebe.',
      },
      {
        q: 'Wer berät bei Gewerbe-Anfragen?',
        a: 'Ein Ansprechpartner mit Erfahrung in gewerblichen Energieprojekten – nicht ein Berater, der ausschließlich Privattarife kennt.',
      },
    ],
  },
];

export function flattenFaq(): FaqEntry[] {
  return FAQ_CATEGORIES.flatMap((c) => c.items);
}
