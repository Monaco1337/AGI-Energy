import { Section } from './Section';

const STEPS = [
  {
    n: '01',
    t: 'Einfacher Energie-Check',
    d: 'Sie beantworten in ca. 2 Minuten ein paar einfache Fragen zu Ihrer Situation. Keine Anmeldung, keine Verpflichtung.',
    note: 'Dauer: ca. 2 Minuten',
  },
  {
    n: '02',
    t: 'Persönliche Prüfung',
    d: 'Wir prüfen Ihre Angaben individuell – kein automatisierter Vergleichs-Output. Wir schauen auf Ihre konkrete Konstellation.',
    note: 'Durch erfahrene Mitarbeiter',
  },
  {
    n: '03',
    t: 'Ehrliche Einschätzung',
    d: 'Wenn ein Einsparpotenzial besteht, melden wir uns mit einer verständlichen Auswertung. Wenn nicht, sagen wir das auch.',
    note: 'Verständlich erklärt',
  },
];

export function HowItWorks() {
  return (
    <Section
      eyebrow="Ablauf"
      title="So einfach läuft Ihr Energie-Check."
      intro="Drei Schritte. Keine Anmeldung. Keine versteckten Kosten."
    >
      <ol className="relative grid md:grid-cols-3 gap-5">
        {/* Verbindungslinie auf Desktop */}
        <span
          aria-hidden
          className="hidden md:block absolute top-[34px] left-[16%] right-[16%] h-px bg-line"
        />
        {STEPS.map((s) => (
          <li
            key={s.n}
            className="relative bg-card border border-line rounded-eloLg p-7 hover:border-lineStrong transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                aria-hidden
                className="relative z-10 size-10 rounded-full border border-sage/40 bg-sage/10 text-sage flex items-center justify-center font-display text-[15px] font-semibold"
              >
                {s.n}
              </div>
              <div className="text-[11.5px] uppercase tracking-[0.14em] text-muted">
                Schritt {parseInt(s.n, 10)}
              </div>
            </div>
            <div className="mt-4 text-[19px] font-semibold text-ink leading-snug">{s.t}</div>
            <p className="mt-2.5 text-[15px] text-ink2 leading-relaxed">{s.d}</p>
            <div className="mt-5 pt-4 border-t border-line text-[12.5px] text-muted">{s.note}</div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
