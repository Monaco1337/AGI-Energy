import { Section } from './Section';

const Q = [
  {
    q: 'Ist der Energie-Check wirklich kostenlos?',
    a: 'Ja. Es entstehen für Sie keine Kosten – weder direkt noch versteckt. Sie gehen mit dem Check keine Verpflichtung ein.',
  },
  {
    q: 'Wer ruft mich an?',
    a: 'Wenn Sie der Kontaktaufnahme zugestimmt haben und eine sinnvolle Einschätzung möglich ist, meldet sich ein Mitarbeiter unseres Teams persönlich – ruhig und ohne Druck.',
  },
  {
    q: 'Wie lange dauert der Check?',
    a: 'Etwa 2 Minuten. Sie können jederzeit zurück und Ihre Antworten ändern.',
  },
  {
    q: 'Wie schützt ihr meine Daten?',
    a: 'Wir verwenden keine externen Tracker. Ihre Daten werden in Deutschland verarbeitet und nur zur Auswertung verwendet.',
  },
  {
    q: 'Was, wenn ich keine Telefonnummer angeben möchte?',
    a: 'Sie können den Check auch ohne Telefonnummer abschließen. Eine schriftliche Einschätzung per E-Mail ist möglich.',
  },
];

export function Faq() {
  return (
    <Section eyebrow="FAQ" title="Häufige Fragen">
      <div className="bg-card border border-line rounded-eloLg overflow-hidden">
        {Q.map((item, i) => (
          <details key={item.q} className="group border-b border-line last:border-0">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 hover:bg-paper2/50">
              <span className="text-[16px] sm:text-[17px] font-medium text-ink">{item.q}</span>
              <span aria-hidden className="text-muted text-[18px] transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="px-6 pb-6 -mt-1 text-[15px] text-ink2 leading-relaxed">{item.a}</div>
          </details>
        ))}
      </div>
    </Section>
  );
}
