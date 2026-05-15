import type { AnswerState, FunnelConfig, FunnelStep } from '@elo/core';

const STEPS: FunnelStep[] = [
  {
    id: 'interests',
    question: 'Wobei möchten Sie sparen?',
    helpText: 'Wählen Sie aus, was am ehesten zu Ihnen passt. Sie können das später noch ändern.',
    type: 'single_choice',
    field: 'interests',
    options: [
      { id: 'strom', label: 'Strom', description: 'Tarif & Verbrauch im Haushalt' },
      { id: 'gas', label: 'Gas', description: 'Heizung oder Warmwasser' },
      { id: 'strom_gas', label: 'Strom und Gas', description: 'Beides gemeinsam prüfen' },
      { id: 'photovoltaik', label: 'Photovoltaik', description: 'Eigenstrom vom Dach' },
      { id: 'unknown', label: 'Ich bin unsicher', description: 'Wir helfen Ihnen weiter' },
    ],
  },
  {
    id: 'customerType',
    question: 'Für wen ist der Check?',
    helpText: 'Damit wir die richtige Auswertung für Sie vorbereiten.',
    type: 'single_choice',
    field: 'customerType',
    options: [
      { id: 'private', label: 'Privathaushalt', description: 'Mietwohnung oder eigene Wohnung' },
      { id: 'home_owner', label: 'Hauseigentümer', description: 'Eigenes Einfamilien- oder Mehrfamilienhaus' },
      { id: 'business', label: 'Gewerbe', description: 'Unternehmen, Praxis, Werkstatt, Handel' },
      { id: 'landlord', label: 'Vermieter', description: 'Vermietete Wohnungen oder Gebäude' },
      { id: 'unknown', label: 'Ich weiß es nicht', description: 'Auch das ist in Ordnung' },
    ],
    audienceOverrides: {
      business: { question: 'Wie hoch ist der Energieverbrauch in Ihrem Unternehmen?' },
    },
  },
  {
    id: 'urgency',
    question: 'Wie dringend ist Ihr Anliegen?',
    helpText: 'Es gibt kein „falsch". Wir arbeiten in Ihrem Tempo.',
    type: 'single_choice',
    field: 'urgency',
    options: [
      { id: 'immediate', label: 'Möglichst schnell sparen', description: 'Wechsel oder Anpassung in den nächsten Tagen' },
      { id: 'weeks', label: 'In den nächsten Wochen entscheiden', description: 'Etwas Zeit, aber konkretes Interesse' },
      { id: 'information', label: 'Erstmal nur informieren', description: 'Kein Druck, einfach prüfen' },
    ],
  },
  {
    id: 'hasInvoice',
    question: 'Haben Sie eine aktuelle Strom- oder Gasrechnung?',
    helpText: 'Kein Pflichtfeld. „Nein" oder „Weiß nicht" ist auch in Ordnung.',
    type: 'single_choice',
    field: 'hasInvoice',
    options: [
      { id: 'upload_now', label: 'Ja, ich möchte sie hochladen', description: 'Macht die Auswertung präziser' },
      { id: 'later', label: 'Ja, ich sende sie später', description: 'Per E-Mail oder im Gespräch' },
      { id: 'no', label: 'Nein', description: 'Wir prüfen mit Ihren Angaben' },
      { id: 'unknown', label: 'Ich weiß es nicht', description: 'Kein Problem, wir helfen' },
    ],
  },
  {
    id: 'monthlyEnergyCosts',
    question: 'Wie hoch sind Ihre Energiekosten ungefähr?',
    helpText: 'Eine grobe Einschätzung reicht völlig. Sie können später korrigieren.',
    type: 'single_choice',
    field: 'monthlyEnergyCosts',
    options: [
      { id: 'under_100', label: 'Unter 100 € monatlich' },
      { id: '100_200', label: '100–200 € monatlich' },
      { id: '200_400', label: '200–400 € monatlich' },
      { id: 'over_400', label: 'Über 400 € monatlich' },
      { id: 'unknown', label: 'Weiß ich nicht', description: 'Ist auch in Ordnung' },
    ],
  },
  {
    id: 'pvInterest',
    question: 'Interessieren Sie sich für Photovoltaik?',
    helpText: 'Auch „Vielleicht" ist eine vollwertige Antwort.',
    type: 'single_choice',
    field: 'pvInterest',
    options: [
      { id: 'home', label: 'Ja, für mein Haus', description: 'Eigentumshaus oder Eigentumswohnung' },
      { id: 'business', label: 'Ja, für mein Unternehmen', description: 'Gewerbeobjekt oder Halle' },
      { id: 'maybe', label: 'Vielleicht', description: 'Wenn es sich rechnet' },
      { id: 'no', label: 'Nein', description: 'Wir prüfen nur Strom/Gas' },
    ],
  },
  {
    id: 'ownsProperty',
    question: 'Besitzen Sie ein eigenes Dach oder Gebäude?',
    helpText: 'Wichtig nur für die Photovoltaik-Bewertung.',
    type: 'single_choice',
    field: 'ownsProperty',
    options: [
      { id: 'yes', label: 'Ja', description: 'Eigentum mit eigenem Dach' },
      { id: 'no', label: 'Nein', description: 'Mietwohnung oder Mietshaus' },
      { id: 'business_property', label: 'Gewerbeobjekt', description: 'Eigene Gewerbeimmobilie' },
      { id: 'rental_property', label: 'Vermietetes Objekt', description: 'Eigentum, vermietet' },
      { id: 'unknown', label: 'Unsicher', description: 'Wir klären das gemeinsam' },
    ],
    visibleIf: (s: AnswerState) =>
      s.pvInterest === 'home' || s.pvInterest === 'business' || s.pvInterest === 'maybe' || s.customerType === 'home_owner' || s.customerType === 'landlord',
  },
  {
    id: 'contactPreference',
    question: 'Wie möchten Sie kontaktiert werden?',
    helpText: 'Der schnellste Weg zu einer persönlichen Auswertung.',
    type: 'single_choice',
    field: 'contactPreference',
    options: [
      { id: 'phone', label: 'Telefon', description: 'Persönliches Gespräch, ca. 10 Minuten' },
      { id: 'whatsapp', label: 'WhatsApp', description: 'Bequem per Nachricht' },
      { id: 'email', label: 'E-Mail', description: 'Schriftliche Auswertung' },
    ],
  },
  {
    id: 'contact',
    question: 'Wie können wir Sie erreichen?',
    helpText:
      'Wir nutzen Ihre Daten ausschließlich zur Auswertung Ihres Energie-Checks. Keine Newsletter, keine Weitergabe.',
    type: 'contact',
  },
  {
    id: 'consent',
    question: 'Einverständnis und Datenschutz',
    helpText: 'Letzter Schritt. Sie können Ihre Einwilligung jederzeit widerrufen.',
    type: 'consent',
  },
];

export const funnelConfig: FunnelConfig = {
  version: '1.0.0',
  steps: STEPS,
};

export function visibleSteps(state: AnswerState, audience?: string): FunnelStep[] {
  return STEPS.map((s) => applyAudience(s, audience)).filter((s) => (s.visibleIf ? s.visibleIf(state) : true));
}

function applyAudience(step: FunnelStep, audience?: string): FunnelStep {
  if (!audience || !step.audienceOverrides) return step;
  const ov = (step.audienceOverrides as Record<string, Partial<FunnelStep>>)[audience];
  if (!ov) return step;
  return { ...step, ...ov };
}
