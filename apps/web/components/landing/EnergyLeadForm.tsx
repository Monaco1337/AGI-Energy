'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, Checkbox, Field, GlassCard, Badge } from '@elo/ui';
import { energyLandingContent } from '@/data/energyLandingContent';
import { validateLeadForm, toLeadPayload } from '@/lib/leadValidation';
import { leadMockSubmit } from '@/lib/leadMockSubmit';
import { ENERGY_LEAD_FORM_ID } from '@/lib/scrollToEnergyForm';
import type { LeadCategory, LeadFormErrors, SubmitStatus } from '@/types/lead';
import { CategorySelector } from './CategorySelector';
import { UploadDropzone } from './UploadDropzone';

interface EnergyLeadFormProps {
  defaultCategory?: LeadCategory | null;
  emphasize?: boolean;
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden className="shrink-0 text-cyanDeep">
      <path
        d="M10 2L3.5 4.5v5c0 4 2.8 7.5 6.5 8.5 3.7-1 6.5-4.5 6.5-8.5v-5L10 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7.5 10.2l1.8 1.8L13 8.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EnergyLeadForm({ defaultCategory = null, emphasize = false }: EnergyLeadFormProps) {
  const c = energyLandingContent.leadForm;
  const [category, setCategory] = React.useState<LeadCategory | null>(defaultCategory);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [file, setFile] = React.useState<File | null>(null);
  const [consent, setConsent] = React.useState(false);
  const [status, setStatus] = React.useState<SubmitStatus>('idle');
  const [errors, setErrors] = React.useState<LeadFormErrors>({});

  React.useEffect(() => {
    if (defaultCategory) setCategory(defaultCategory);
  }, [defaultCategory]);

  React.useEffect(() => {
    const h = (e: Event) => {
      const ce = e as CustomEvent<LeadCategory>;
      if (ce.detail) setCategory(ce.detail);
    };
    window.addEventListener('agi-preset-category', h as EventListener);
    return () => window.removeEventListener('agi-preset-category', h as EventListener);
  }, []);

  const reset = () => {
    setCategory(defaultCategory ?? null);
    setName('');
    setPhone('');
    setEmail('');
    setZip('');
    setFile(null);
    setConsent(false);
    setErrors({});
    setStatus('idle');
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('validating');
    const input = { category, name, phone, email, zip, file, consent };
    const next = validateLeadForm(input);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus('idle');
      return;
    }
    const payload = toLeadPayload(input);
    if (!payload) {
      setStatus('idle');
      return;
    }
    setStatus('submitting');
    try {
      await leadMockSubmit(payload);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrors({
        general:
          'Übermittlung fehlgeschlagen. Bitte versuchen Sie es erneut – Ihre Anfrage bleibt vertraulich.',
      });
    }
  }

  const busy = status === 'submitting';
  const locked = status === 'success' || busy;

  return (
    <GlassCard
      id={ENERGY_LEAD_FORM_ID}
      className={
        emphasize
          ? 'ring-1 ring-cyan/40 ring-offset-2 ring-offset-transparent scroll-mt-28'
          : 'scroll-mt-28'
      }
    >
      {status === 'success' ? (
        <div className="p-7 sm:p-10 text-center space-y-5">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-cyan/15 text-cyanDeep">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="font-display text-2xl sm:text-[26px] font-semibold text-navy tracking-tight">
            {c.successTitle}
          </h2>
          <p className="text-[14.5px] text-slate leading-relaxed max-w-md mx-auto">{c.successText}</p>
          <Button type="button" variant="primary" size="lg" className="mt-2" onClick={reset}>
            {c.successCta}
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-6" noValidate>
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-[20px] sm:text-[22px] font-semibold text-navy tracking-tight leading-snug">
                {c.cardTitle}
              </h2>
              <Badge tone="energy" className="shrink-0">
                {c.badgeFree}
              </Badge>
            </div>
            <p className="text-[13.5px] text-slate leading-relaxed">{c.cardSubline}</p>
          </div>

          <div className="hairline hairline-dark" aria-hidden />

          {errors.general && (
            <div
              role="alert"
              className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-[13.5px] text-error"
            >
              {errors.general}
            </div>
          )}

          <div className="space-y-2.5">
            <p className="text-[12.5px] font-medium text-slate uppercase tracking-wider">Bereich</p>
            <CategorySelector value={category} onChange={setCategory} disabled={locked} />
            {errors.category && (
              <p className="text-[13px] text-error" role="alert">
                {errors.category}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <UploadDropzone file={file} onFile={setFile} error={errors.file} disabled={locked} />
            <p className="flex items-start gap-2 text-[12.5px] text-slate leading-relaxed">
              <ShieldIcon />
              <span>{c.uploadTrustLine}</span>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              disabled={locked}
              required
            />
            <Field
              label="Telefonnummer"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              disabled={locked}
              required
            />
            <Field
              label="E-Mail-Adresse"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              disabled={locked}
              required
            />
            <Field
              label="PLZ"
              autoComplete="postal-code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              error={errors.zip}
              disabled={locked}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Checkbox
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={locked}
              label={
                <>
                  Ich stimme der vertraulichen Verarbeitung meiner Anfrage durch AGI Energy zu. Hinweise zur
                  Datenverarbeitung finden Sie in der{' '}
                  <Link
                    href="/datenschutz"
                    className="text-cyanDeep underline underline-offset-2 font-medium hover:text-cyan transition-colors"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </>
              }
            />
            {errors.consent && (
              <p className="text-[13px] text-error" role="alert">
                {errors.consent}
              </p>
            )}
          </div>

          <Button type="submit" variant="primary" size="xl" fullWidth disabled={locked}>
            {busy ? c.submitting : c.submit}
          </Button>

          <p className="text-center text-[12px] text-slate leading-relaxed">{c.submitFootnote}</p>
        </form>
      )}
    </GlassCard>
  );
}
