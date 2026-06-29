'use client';

import { useState, type FormEvent } from 'react';

interface Props {
  source?: string;
  /** Optionaler Default-Schalter, ob das PLZ-Feld angezeigt werden soll. */
  showPostalCode?: boolean;
  /** Visuelle Variante. */
  variant?: 'block' | 'inline';
}

type State =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; resent: boolean; alreadyConfirmed: boolean }
  | { kind: 'error'; message: string };

export default function NewsletterForm({
  source = 'newsletter-page',
  showPostalCode = false,
  variant = 'block',
}: Props) {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(''); // Honeypot

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (state.kind === 'submitting') return;
    if (!consent) {
      setState({ kind: 'error', message: 'Bitte Einwilligung bestätigen.' });
      return;
    }
    setState({ kind: 'submitting' });
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          postalCode: postalCode || undefined,
          source,
          consent,
          company,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        resent?: boolean;
        alreadyConfirmed?: boolean;
      };
      if (!res.ok || !json.ok) {
        setState({
          kind: 'error',
          message: json.error ?? 'Anmeldung fehlgeschlagen. Bitte später erneut.',
        });
        return;
      }
      setState({
        kind: 'success',
        resent: Boolean(json.resent),
        alreadyConfirmed: Boolean(json.alreadyConfirmed),
      });
    } catch {
      setState({
        kind: 'error',
        message: 'Verbindung fehlgeschlagen. Bitte später erneut.',
      });
    }
  }

  if (state.kind === 'success') {
    return (
      <div className="rounded-elo border border-energyGreen/40 bg-energyGreen/5 p-6">
        <p className="font-display text-[18px] font-semibold text-navy">
          {state.alreadyConfirmed
            ? 'Sie sind bereits angemeldet.'
            : 'Fast geschafft. Bitte Posteingang prüfen.'}
        </p>
        <p className="mt-2 text-[14px] text-slate leading-relaxed">
          {state.alreadyConfirmed
            ? 'Ihre E-Mail-Adresse ist bereits aktiv eingetragen. Sie müssen nichts weiter tun.'
            : state.resent
              ? 'Wir haben Ihnen einen frischen Bestätigungslink an Ihre Adresse gesendet. Bitte klicken Sie ihn an, um die Anmeldung abzuschließen.'
              : 'Wir haben Ihnen eine E-Mail mit einem Bestätigungslink geschickt. Bitte klicken Sie ihn an, um die Anmeldung abzuschließen (Double-Opt-In).'}
        </p>
      </div>
    );
  }

  const inputBase =
    'w-full rounded-elo border border-borderLight bg-white px-4 py-3 text-[15px] text-navy placeholder:text-slate/60 focus:border-energyGreen focus:outline-none focus:ring-2 focus:ring-energyGreen/30';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className={variant === 'inline' ? 'grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3' : 'space-y-3'}>
        <div className={variant === 'inline' ? '' : 'space-y-3'}>
          <label className="block">
            <span className="block text-[13px] font-medium text-slate mb-1.5">E-Mail-Adresse</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ihre@adresse.de"
              className={inputBase}
            />
          </label>
          {variant === 'block' && (
            <label className="block">
              <span className="block text-[13px] font-medium text-slate mb-1.5">
                Vorname <span className="text-slate/60 font-normal">(optional)</span>
              </span>
              <input
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Max"
                className={inputBase}
              />
            </label>
          )}
          {showPostalCode && (
            <label className="block">
              <span className="block text-[13px] font-medium text-slate mb-1.5">
                PLZ <span className="text-slate/60 font-normal">(optional, für regionale Tipps)</span>
              </span>
              <input
                type="text"
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={5}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                placeholder="10115"
                className={inputBase}
              />
            </label>
          )}
        </div>
        {variant === 'inline' && (
          <button
            type="submit"
            disabled={state.kind === 'submitting'}
            className="self-end inline-flex items-center justify-center bg-navy text-white px-6 py-3 rounded-elo font-medium hover:bg-navy/90 transition disabled:opacity-60"
          >
            {state.kind === 'submitting' ? 'Wird gesendet…' : 'Anmelden'}
          </button>
        )}
      </div>

      <label className="flex items-start gap-3 text-[13.5px] text-slate leading-relaxed">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 h-4 w-4 accent-energyGreen"
        />
        <span>
          Ich möchte den AGI-Energy-Newsletter erhalten und stimme zu, dass meine Anmeldung in einer
          Bestätigungsmail bestätigt wird (Double-Opt-In). Eine Abmeldung ist jederzeit möglich.
          Weitere Infos in der{' '}
          <a href="/datenschutz" className="underline hover:text-navy">
            Datenschutzerklärung
          </a>
          .
        </span>
      </label>

      {/* Honeypot */}
      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {state.kind === 'error' && (
        <p className="rounded-elo border border-red-200 bg-red-50 p-3 text-[13.5px] text-red-900">{state.message}</p>
      )}

      {variant === 'block' && (
        <button
          type="submit"
          disabled={state.kind === 'submitting'}
          className="w-full inline-flex items-center justify-center bg-navy text-white px-6 py-3.5 rounded-elo font-medium hover:bg-navy/90 transition disabled:opacity-60"
        >
          {state.kind === 'submitting' ? 'Wird gesendet…' : 'Newsletter abonnieren'}
        </button>
      )}
    </form>
  );
}
