/**
 * Glossar deutscher Energie-Fachbegriffe.
 * Jeder Eintrag wird auf /glossar/[slug] gerendert und ueber DefinedTerm-Schema
 * fuer maschinelle Verstaendlichkeit ausgespielt. Long-Tail-Hebel.
 *
 * Inhalt: aufklaerend, ergebnisoffen, ohne Werbeversprechen.
 */

export interface GlossaryEntry {
  slug: string;
  term: string;
  shortDefinition: string;
  longExplanation: string;
  category: 'Strom' | 'Gas' | 'Photovoltaik' | 'Vertrag' | 'Technik' | 'Recht' | 'Gewerbe';
  related?: { slug: string; label: string }[];
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    slug: 'arbeitspreis',
    term: 'Arbeitspreis',
    shortDefinition:
      'Preis pro verbrauchter Kilowattstunde (kWh) Strom oder Gas, ohne den fixen Grundpreis.',
    longExplanation:
      'Der Arbeitspreis ist der variable Teil Ihrer Energierechnung. Er wird in Cent pro kWh angegeben und mit Ihrem tatsächlichen Verbrauch multipliziert. Bei einem Strompreis von 30 Cent/kWh und einem Verbrauch von 3.000 kWh zahlen Sie für den Arbeitspreis allein 900 Euro im Jahr. Der Arbeitspreis enthält in Deutschland auch Steuern, Umlagen und Netzentgelte.',
    category: 'Vertrag',
    related: [{ slug: 'grundpreis', label: 'Grundpreis' }],
  },
  {
    slug: 'grundpreis',
    term: 'Grundpreis',
    shortDefinition:
      'Fester monatlicher oder jährlicher Betrag, unabhängig vom Verbrauch.',
    longExplanation:
      'Der Grundpreis deckt anbieterseitige Fixkosten ab (Zählermiete, Abrechnung, Netzanschluss). Er liegt typisch bei 8-15 Euro pro Monat. Wer wenig Strom verbraucht, zahlt anteilig mehr für den Grundpreis als für den Verbrauch selbst – deshalb lohnt sich ein Tarifvergleich bei niedrigen Verbräuchen anders als bei hohen.',
    category: 'Vertrag',
    related: [{ slug: 'arbeitspreis', label: 'Arbeitspreis' }],
  },
  {
    slug: 'jahresverbrauch',
    term: 'Jahresverbrauch',
    shortDefinition:
      'Die Menge an Strom oder Gas, die Sie in einem Abrechnungsjahr verbraucht haben (in kWh).',
    longExplanation:
      'Der Jahresverbrauch ist die wichtigste Kenngröße für jeden Tarifvergleich. Typische Werte: 1 Person ~1.500 kWh Strom, 2 Personen ~2.500, 4 Personen ~4.000. Beim Gas hängt der Verbrauch stark von der Wohnfläche und der Heizungsart ab: 80 m² Wohnung mit Gasheizung ~12.000-15.000 kWh/Jahr.',
    category: 'Vertrag',
  },
  {
    slug: 'abschlag',
    term: 'Abschlag',
    shortDefinition:
      'Monatliche Vorauszahlung an den Energieversorger, basierend auf dem geschätzten Jahresverbrauch.',
    longExplanation:
      'Anbieter rechnen das Jahr nicht im Voraus ab, sondern verlangen 11 oder 12 Abschläge auf Basis des Vorjahresverbrauchs. Am Ende des Abrechnungsjahres gleicht eine Jahresabrechnung Über- oder Unterzahlung aus. Wenn Ihr Verbrauch sinkt, können Sie eine Anpassung des Abschlags beantragen – das spart Liquidität.',
    category: 'Vertrag',
  },
  {
    slug: 'nachzahlung',
    term: 'Nachzahlung',
    shortDefinition:
      'Differenzbetrag, den Sie nach der Jahresabrechnung schulden, wenn Ihre Abschläge nicht ausgereicht haben.',
    longExplanation:
      'Eine Nachzahlung entsteht, wenn der tatsächliche Verbrauch über dem geschätzten lag oder wenn die Preise im Abrechnungsjahr gestiegen sind. Hohe Nachzahlungen sind ein klares Signal, dass entweder der Abschlag zu niedrig angesetzt war oder der Tarif nicht mehr passt – beides ist prüfenswert.',
    category: 'Vertrag',
    related: [{ slug: 'abschlag', label: 'Abschlag' }],
  },
  {
    slug: 'preisgarantie',
    term: 'Preisgarantie',
    shortDefinition:
      'Vertraglich zugesicherter, in der Höhe oder Komponente begrenzter Schutz gegen Preiserhöhungen.',
    longExplanation:
      'Eine echte Preisgarantie deckt Arbeitspreis und Grundpreis vollständig. Eine "eingeschränkte Preisgarantie" schließt staatliche Abgaben aus – die können dennoch steigen. Eine "Nettopreisgarantie" garantiert nur den Anbieterteil, nicht die gesetzlichen Bestandteile. Lesen Sie immer die genaue Definition im Vertrag.',
    category: 'Vertrag',
  },
  {
    slug: 'sonderkuendigungsrecht',
    term: 'Sonderkündigungsrecht',
    shortDefinition:
      'Recht, einen Energievertrag außerhalb der regulären Kündigungsfrist zu beenden.',
    longExplanation:
      'Bei Preiserhöhungen, Umzug oder bestimmten Vertragsänderungen haben Sie ein Sonderkündigungsrecht. Die Frist beträgt meist 2-6 Wochen nach Mitteilung des Anlasses. Wer das Recht nicht innerhalb der Frist nutzt, ist daran gebunden – auch bei deutlichen Preiserhöhungen.',
    category: 'Recht',
  },
  {
    slug: 'grundversorgung',
    term: 'Grundversorgung',
    shortDefinition:
      'Standard-Strom- oder Gasversorgung durch den lokalen Grundversorger ohne expliziten Vertrag.',
    longExplanation:
      'Wer keinen aktiven Energievertrag hat (Umzug, Anbieterwechsel, Ausfall), wird automatisch über die Grundversorgung beliefert. Die Tarife sind in der Regel teurer als am freien Markt. Kündigungsfrist: 2 Wochen. Wer in der Grundversorgung ist, kann jederzeit zu einem günstigeren Tarif wechseln.',
    category: 'Recht',
  },
  {
    slug: 'zaehlerstand',
    term: 'Zählerstand',
    shortDefinition:
      'Aktueller Wert auf Ihrem Strom- oder Gaszähler – Grundlage jeder Verbrauchsabrechnung.',
    longExplanation:
      'Der Zählerstand wird mindestens einmal im Jahr abgelesen, entweder durch den Netzbetreiber, durch Sie selbst (Ablesekarte) oder automatisch (Smart Meter). Bei der Selbstablesung zur Jahresabrechnung lohnt es sich, ein Foto des Zählerstands zu machen – das ist Ihre Absicherung gegen Schätzfehler.',
    category: 'Technik',
  },
  {
    slug: 'smart-meter',
    term: 'Smart Meter',
    shortDefinition:
      'Digitaler Stromzähler, der Verbrauchsdaten elektronisch übermittelt.',
    longExplanation:
      'Smart Meter sind moderne Messeinrichtungen mit einer Kommunikationseinheit. Sie übermitteln Verbrauchsdaten automatisch an den Netzbetreiber und ermöglichen variable, lastabhängige Tarife. In Deutschland gilt eine schrittweise Einbaupflicht – ab 6.000 kWh Verbrauch verpflichtend, darunter optional.',
    category: 'Technik',
  },
  {
    slug: 'netzbetreiber',
    term: 'Netzbetreiber',
    shortDefinition:
      'Unternehmen, das die örtlichen Strom- oder Gasnetze betreibt – unabhängig vom Stromlieferanten.',
    longExplanation:
      'Der Netzbetreiber ist NICHT Ihr Stromlieferant. Er sorgt für die physische Versorgung und das Funktionieren des Netzes – egal von welchem Anbieter Sie Strom kaufen. Sie können den Lieferanten frei wechseln, den Netzbetreiber nicht.',
    category: 'Technik',
  },
  {
    slug: 'lastprofil',
    term: 'Lastprofil',
    shortDefinition:
      'Verlauf Ihres Stromverbrauchs über Tag, Woche und Jahr.',
    longExplanation:
      'Das Lastprofil zeigt, wann Sie wie viel Strom verbrauchen. Für Privathaushalte ohne Smart Meter wird ein standardisiertes Profil ("H0") angenommen. Bei Photovoltaik und Wärmepumpe ist das echte Lastprofil entscheidend für die Wirtschaftlichkeit.',
    category: 'Technik',
  },
  {
    slug: 'eigenverbrauchsquote',
    term: 'Eigenverbrauchsquote',
    shortDefinition:
      'Anteil des selbst produzierten Solarstroms, den Sie direkt selbst verbrauchen.',
    longExplanation:
      'Strom, den Sie selbst nutzen, ist 3-4× wertvoller als eingespeister Strom (weil Sie ihn nicht teurer zukaufen müssen). Ohne Speicher liegt die Eigenverbrauchsquote typisch bei 25-35 %, mit Speicher bei 50-70 %. Wer tagsüber zuhause ist oder Wärmepumpe/E-Auto nutzt, kommt höher.',
    category: 'Photovoltaik',
  },
  {
    slug: 'einspeiseverguetung',
    term: 'Einspeisevergütung',
    shortDefinition:
      'Gesetzlich festgelegter Betrag, den Sie für ins Netz eingespeisten Solarstrom erhalten.',
    longExplanation:
      'Wer Strom aus seiner Photovoltaik-Anlage ins öffentliche Netz einspeist, erhält über 20 Jahre eine fixe Vergütung. Die Höhe hängt vom Inbetriebnahme-Zeitpunkt und der Anlagengröße ab. Aktuell für Anlagen bis 10 kWp etwa 7-8 Cent/kWh – deutlich weniger als der reguläre Strompreis, weshalb Eigenverbrauch wirtschaftlich attraktiver ist.',
    category: 'Photovoltaik',
  },
  {
    slug: 'kwp',
    term: 'kWp (Kilowatt-Peak)',
    shortDefinition:
      'Maximale Leistung einer Photovoltaik-Anlage unter Standard-Testbedingungen.',
    longExplanation:
      'kWp gibt die Nennleistung an, die ein Solarmodul oder eine Anlage bei optimaler Einstrahlung liefern würde. Real liefert eine Anlage in Deutschland 850-1.050 kWh pro kWp und Jahr – abhängig von Ausrichtung, Verschattung, Region und Modulqualität. Eine 10-kWp-Anlage produziert also typisch 8.500-10.500 kWh/Jahr.',
    category: 'Photovoltaik',
  },
  {
    slug: 'speicher',
    term: 'Stromspeicher (Batteriespeicher)',
    shortDefinition:
      'Batterie, die selbst produzierten Solarstrom für späteren Verbrauch zwischenspeichert.',
    longExplanation:
      'Speicher erhöhen die Eigenverbrauchsquote, kosten aber auch. Marktpreise 2026: ~700-1.000 Euro pro kWh Speicherkapazität. Ein 10-kWh-Speicher kostet also 7.000-10.000 Euro. Ob sich das rechnet, hängt vom Lastprofil ab – nicht jeder Haushalt profitiert wirtschaftlich.',
    category: 'Photovoltaik',
  },
  {
    slug: 'waermepumpe',
    term: 'Wärmepumpe',
    shortDefinition:
      'Heizungssystem, das Umweltwärme (Luft, Erdreich, Grundwasser) mit Strom nutzbar macht.',
    longExplanation:
      'Eine Wärmepumpe braucht Strom – aber sie produziert pro kWh Strom 3-5 kWh Wärme. Sie ist die wirtschaftlich beste Heizungsergänzung zu Photovoltaik. Aber: nicht jedes Gebäude eignet sich, vor allem unsanierte Altbauten brauchen oft zusätzliche Dämmung, damit eine Wärmepumpe effizient läuft.',
    category: 'Technik',
  },
  {
    slug: 'kuendigungsfrist',
    term: 'Kündigungsfrist',
    shortDefinition:
      'Zeitraum vor Vertragsende, in dem ein Energievertrag schriftlich gekündigt werden muss.',
    longExplanation:
      'Typische Kündigungsfristen bei Strom-/Gasverträgen: 6 Wochen vor Vertragsende. Wer die Frist versäumt, verlängert den Vertrag um 12 Monate – oft zu schlechteren Konditionen. In der Grundversorgung beträgt die Frist nur 2 Wochen.',
    category: 'Vertrag',
  },
  {
    slug: 'wechselbonus',
    term: 'Wechselbonus / Neukundenbonus',
    shortDefinition:
      'Einmaliger Geldbetrag, der nach erfolgreichem Anbieterwechsel verrechnet wird.',
    longExplanation:
      'Boni klingen attraktiv, sind aber nur ein Einmaleffekt. Wer ehrlich vergleicht, muss den Bonus auf die gesamte Vertragslaufzeit verteilen. Ein 200-Euro-Bonus auf 12 Monate sind nur ~16 Euro pro Monat – der laufende Tarifpreis ist auf Dauer entscheidender.',
    category: 'Vertrag',
  },
  {
    slug: 'oekostrom',
    term: 'Ökostrom',
    shortDefinition:
      'Strom aus erneuerbaren Quellen (Wind, Sonne, Wasser, Biomasse).',
    longExplanation:
      'In Deutschland muss "Ökostrom" durch Herkunftsnachweise belegt sein. Wirklich relevant ist, ob der Tarif auch in neue Anlagen investiert (Label "Grüner Strom Label", "ok-power") – sonst handelt es sich nur um umetikettierten Strom aus bestehenden Wasserkraftwerken in Skandinavien.',
    category: 'Strom',
  },
  {
    slug: 'arbeitspreis-brutto-netto',
    term: 'Brutto- vs. Nettopreis',
    shortDefinition:
      'Bruttopreis = inklusive Mehrwertsteuer, Nettopreis = ohne.',
    longExplanation:
      'Verbraucherpreise werden in Deutschland brutto angegeben. Wenn ein Tarif "ab 25 Cent netto" wirbt, sind es real 29,75 Cent brutto. Bei Vergleichen immer auf die gleiche Größe achten.',
    category: 'Vertrag',
  },
  {
    slug: 'konzessionsabgabe',
    term: 'Konzessionsabgabe',
    shortDefinition:
      'Gebühr, die Energieversorger an die Kommune für die Nutzung öffentlicher Wege zahlen.',
    longExplanation:
      'Die Konzessionsabgabe ist ein gesetzlich festgelegter Bestandteil des Strompreises. Sie liegt je nach Gemeindegröße bei 1,32 bis 2,39 Cent/kWh und ist nicht verhandelbar – wer die Stadt wechselt, kann sich dadurch leichte Preisunterschiede erklären.',
    category: 'Recht',
  },
  {
    slug: 'stromsteuer',
    term: 'Stromsteuer',
    shortDefinition:
      'Bundessteuer auf den Verbrauch von elektrischem Strom.',
    longExplanation:
      'Die Stromsteuer beträgt 2,05 Cent/kWh und fließt direkt an den Bund. Bestimmte Gewerbebetriebe können Ermäßigungen beantragen – für Privathaushalte ist die Steuer fix.',
    category: 'Recht',
  },
  {
    slug: 'netzentgelt',
    term: 'Netzentgelt',
    shortDefinition:
      'Gebühr für die Nutzung der Strom- oder Gasnetze, vom Netzbetreiber erhoben.',
    longExplanation:
      'Das Netzentgelt deckt Betrieb und Ausbau der Netze. Es macht je nach Region 25-30 % des Strompreises aus und unterscheidet sich pro Postleitzahl. Wer in einer Region mit hohem Netzentgelt wohnt, zahlt mehr – egal welcher Anbieter.',
    category: 'Recht',
  },
  {
    slug: 'mehrwertsteuer-energie',
    term: 'Mehrwertsteuer auf Energie',
    shortDefinition:
      'Umsatzsteuer auf Strom und Gas, aktuell 19 % auf den Gesamtpreis.',
    longExplanation:
      'Die Mehrwertsteuer wird auf den kompletten Strom- oder Gaspreis erhoben, also auch auf Konzessionsabgabe und Stromsteuer (Steuer auf Steuer). Eine Senkung – wie zeitweise auf Gas zur Krise 2022/2023 – wird vom Gesetzgeber kommuniziert.',
    category: 'Recht',
  },
  {
    slug: 'umsatzsteuer-id',
    term: 'Umsatzsteuer-ID (Gewerbe)',
    shortDefinition:
      'Identifikationsnummer für Unternehmen im EU-Mehrwertsteuersystem.',
    longExplanation:
      'Gewerbekunden geben bei der Energieversorgung ihre Umsatzsteuer-ID an, um die Vorsteuer korrekt verrechnen zu können. Bei einem Wechsel auf einen Gewerbestromtarif wird die ID üblicherweise abgefragt.',
    category: 'Gewerbe',
  },
  {
    slug: 'lastspitze',
    term: 'Lastspitze (Gewerbe)',
    shortDefinition:
      'Höchste innerhalb eines Abrechnungszeitraums erreichte Leistungsspitze.',
    longExplanation:
      'Bei gewerblichen Stromkunden ab 100.000 kWh/Jahr wird oft nicht nur der Verbrauch, sondern auch die Leistungsspitze (in kW) abgerechnet. Lastmanagement – das gezielte Vermeiden gleichzeitiger Spitzen – kann erhebliche Kosten sparen.',
    category: 'Gewerbe',
  },
  {
    slug: 'rlm-zaehlung',
    term: 'RLM-Zählung (Registrierende Leistungsmessung)',
    shortDefinition:
      'Viertelstündliche Aufzeichnung des Stromverbrauchs bei Gewerbekunden ab 100.000 kWh/Jahr.',
    longExplanation:
      'Bei RLM-Kunden zählt nicht nur die Jahresmenge, sondern auch das genaue zeitliche Profil. Damit lassen sich individuelle Beschaffungsstrategien (Spotmarkt, Termingeschäft, Tranchenkauf) sinnvoll umsetzen.',
    category: 'Gewerbe',
  },
  {
    slug: 'brennwert',
    term: 'Brennwert (Gas)',
    shortDefinition:
      'Energiegehalt des Erdgases pro Kubikmeter, in kWh/m³.',
    longExplanation:
      'Erdgas wird in Kubikmetern gemessen, aber in kWh abgerechnet. Der Brennwert (typisch 9-11 kWh/m³) wird mit dem verbrauchten Volumen multipliziert. Die Höhe schwankt je nach Gasqualität in Ihrer Region – steht auf der Abrechnung.',
    category: 'Gas',
  },
  {
    slug: 'zustandszahl',
    term: 'Zustandszahl (Gas)',
    shortDefinition:
      'Korrekturfaktor für die Umrechnung von gemessenem Gasvolumen in standardisierte Energiemenge.',
    longExplanation:
      'Da Gas temperatur- und druckabhängig ist, wird das gemessene Volumen mit einer Zustandszahl korrigiert. Sie liegt typisch bei 0,9 bis 1,0 und ist Bestandteil jeder Gasabrechnung. Wer prüfen will, ob die Abrechnung stimmt, multipliziert: Volumen × Brennwert × Zustandszahl = kWh.',
    category: 'Gas',
  },
  {
    slug: 'preisgleitklausel',
    term: 'Preisgleitklausel',
    shortDefinition:
      'Vertragsklausel, die Preisanpassungen an einen Index (z.B. Großhandelspreis) bindet.',
    longExplanation:
      'Im Gasvertrag bedeutet eine Preisgleitklausel: Wenn der Großhandelspreis steigt, steigt auch Ihr Preis – meist mit Verzögerung. Wer eine echte Preisgarantie hat, ist davor geschützt. Wer eine Preisgleitklausel hat, sollte die Indexbasis kennen.',
    category: 'Vertrag',
  },
  {
    slug: 'energieausweis',
    term: 'Energieausweis',
    shortDefinition:
      'Dokument, das die energetische Qualität eines Gebäudes bewertet (Klasse A+ bis H).',
    longExplanation:
      'Beim Verkauf oder bei der Vermietung von Immobilien ist ein Energieausweis Pflicht. Er gibt Aufschluss über den zu erwartenden Energieverbrauch und beeinflusst Verkaufspreis und Mietfähigkeit. Bei Wärmepumpen-Eignung ist Klasse C oder besser empfehlenswert.',
    category: 'Recht',
  },
  {
    slug: 'co2-preis',
    term: 'CO2-Preis (BEHG)',
    shortDefinition:
      'Gesetzlich festgelegter Preis auf den CO2-Ausstoß beim Verbrennen fossiler Brennstoffe (Gas, Öl).',
    longExplanation:
      'Seit 2021 zahlen Verbraucher in Deutschland einen CO2-Preis auf Gas und Heizöl. 2026 liegt er bei ~55 Euro pro Tonne CO2 – das entspricht etwa 1 Cent/kWh Gas. Der Preis steigt schrittweise an und macht fossile Heizungen über die Zeit teurer.',
    category: 'Recht',
  },
  {
    slug: 'cashflow-stromtarif',
    term: 'Cashflow im Stromtarif',
    shortDefinition:
      'Zeitliche Verteilung von Zahlungen und Gegenleistungen über die Vertragslaufzeit.',
    longExplanation:
      'Wer einen Bonus erst am Vertragsende ausgezahlt bekommt, hat ein anderes Risiko als bei sofortiger Verrechnung. Lesen Sie genau, wann und wie ein Bonus tatsächlich fließt – manche Anbieter verrechnen ihn mit der Schlussrechnung, andere monatlich.',
    category: 'Vertrag',
  },
  {
    slug: 'spotmarkt-tarif',
    term: 'Spotmarkt-Tarif / Dynamischer Tarif',
    shortDefinition:
      'Stromtarif, dessen Preis stundenweise dem Großhandelspreis folgt.',
    longExplanation:
      'Dynamische Tarife können günstig sein – wenn Sie Verbrauch verschieben können (Wärmepumpe, E-Auto-Ladung, Waschmaschine). Wer kein Smart Meter hat oder den Verbrauch nicht steuern kann, profitiert wenig. Voraussetzung: ein intelligentes Messsystem.',
    category: 'Strom',
  },
  {
    slug: 'volllaststunden',
    term: 'Volllaststunden',
    shortDefinition:
      'Theoretische Stundenzahl pro Jahr, in der eine Anlage bei Nennleistung produzieren müsste, um den Jahresertrag zu erreichen.',
    longExplanation:
      'Bei Photovoltaik in Deutschland: typisch 900-1.000 Volllaststunden pro Jahr. Bei Windkraft an Land: 1.800-2.500. Diese Zahl gibt einen guten Vergleichswert für die Wirtschaftlichkeit einer Anlage.',
    category: 'Photovoltaik',
  },
  {
    slug: 'mieterstrom',
    term: 'Mieterstrom',
    shortDefinition:
      'Solarstrom, der direkt vom Dach an die Mieter eines Mehrfamilienhauses geliefert wird.',
    longExplanation:
      'Vermieter können auf ihrem Mehrfamilienhaus eine PV-Anlage betreiben und den Strom direkt an Mieter verkaufen – günstiger als der reguläre Marktpreis. Voraussetzung: Lieferantenstatus oder Kooperation mit einem Energiedienstleister. Mieter dürfen frei wählen, ob sie den Mieterstrom annehmen.',
    category: 'Photovoltaik',
  },
  {
    slug: 'wallbox',
    term: 'Wallbox',
    shortDefinition:
      'Ladestation für Elektrofahrzeuge mit dauerhafter Hausanschluss-Installation.',
    longExplanation:
      'Wallboxen haben 3,7-22 kW Ladeleistung. Mit Photovoltaik gekoppelt können sie überschüssigen Solarstrom für das Auto nutzen ("PV-Überschussladen"). Eine Anmeldung beim Netzbetreiber ist meist erforderlich.',
    category: 'Technik',
  },
  {
    slug: 'umlage',
    term: 'EEG-Umlage / KWK-Umlage / Offshore-Umlage',
    shortDefinition:
      'Gesetzlich festgelegte Aufschläge auf den Strompreis zur Finanzierung der Energiewende.',
    longExplanation:
      'Die EEG-Umlage wurde 2022 abgeschafft (aus dem Bundeshaushalt finanziert), die KWK-Umlage und die Offshore-Netzumlage sind nach wie vor Bestandteil des Strompreises. Sie werden jährlich neu festgesetzt – für 2026 zusammen unter 1 Cent/kWh.',
    category: 'Recht',
  },
  {
    slug: 'dublette',
    term: 'Dublette (Lead)',
    shortDefinition:
      'Doppelte Anfrage einer Person, oft binnen kurzer Zeit über verschiedene Kanäle.',
    longExplanation:
      'Bei AGI Energy prüfen wir bei jedem Lead per E-Mail, Telefon und Postleitzahl auf Dubletten, um Sie nicht doppelt anzusprechen. Falls Sie zwei Anfragen geschickt haben, melden wir uns nur einmal – und mit der vollständigen Sicht beider Anfragen.',
    category: 'Vertrag',
  },
];

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((g) => g.slug === slug);
}

export function glossaryByCategory(): Record<GlossaryEntry['category'], GlossaryEntry[]> {
  return GLOSSARY.reduce(
    (acc, entry) => {
      (acc[entry.category] ??= []).push(entry);
      return acc;
    },
    {} as Record<GlossaryEntry['category'], GlossaryEntry[]>,
  );
}
