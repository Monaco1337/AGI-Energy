'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Checkbox, Field, GlassCard } from '@elo/ui';
import { energyLandingContent } from '@/data/energyLandingContent';
import { validateLeadForm, toLeadPayload } from '@/lib/leadValidation';
import { submitLandingLead } from '@/lib/leadSubmit';
import { uploadLeadFile } from '@/lib/uploadFile';
import { ENERGY_LEAD_FORM_ID } from '@/lib/scrollToEnergyForm';
import { CONSENT_TEXTS } from '@/lib/consent';
import type { LeadCategory, LeadFormErrors, SubmitStatus } from '@/types/lead';
import { CategorySelector } from './CategorySelector';
import { UploadDropzone } from './UploadDropzone';

interface EnergyLeadFormProps {
  defaultCategory?: LeadCategory | null;
  emphasize?: boolean;
  onCategoryChange?: (category: LeadCategory | null) => void;
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

export function EnergyLeadForm({
  defaultCategory = null,
  emphasize = false,
  onCategoryChange,
}: EnergyLeadFormProps) {
  const c = energyLandingContent.leadForm;
  const router = useRouter();
  const [category, setCategory] = React.useState<LeadCategory | null>(defaultCategory);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [zip, setZip] = React.useState('');
  const annualConsumptionKwh = '';
  const [file, setFile] = React.useState<File | null>(null);
  const [consent, setConsent] = React.useState(false);
  const [whatsappConsent, setWhatsappConsent] = React.useState(false);
  const [status, setStatus] = React.useState<SubmitStatus>('idle');
  const [errors, setErrors] = React.useState<LeadFormErrors>({});

  React.useEffect(() => {
    if (defaultCategory) setCategory(defaultCategory);
  }, [defaultCategory]);

  React.useEffect(() => {
    onCategoryChange?.(category);
  }, [category, onCategoryChange]);

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
    setWhatsappConsent(false);
    setErrors({});
    setStatus('idle');
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('validating');
    const input = {
      category,
      name,
      phone,
      email,
      zip,
      annualConsumptionKwh,
      file,
      consent,
      whatsappConsent,
    };
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
      if (file) {
        try {
          const uploaded = await uploadLeadFile(file);
          payload.filePathname = uploaded.pathname;
          payload.fileName = uploaded.fileName;
          payload.fileType = uploaded.fileType;
          payload.fileSize = uploaded.fileSize;
        } catch (uploadErr) {
          setStatus('idle');
          setErrors({
            file:
              uploadErr instanceof Error
                ? uploadErr.message
                : 'Die Datei konnte nicht hochgeladen werden.',
          });
          return;
        }
      }
      const result = await submitLandingLead(payload);
      setStatus('success');
      const params = new URLSearchParams();
      if (result.referralCode) params.set('ref', result.referralCode);
      if (result.confirmationEmailStatus === 'sent') params.set('mail', 'sent');
      const qs = params.toString();
      router.push(`/danke${qs ? `?${qs}` : ''}`);
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
      tone="dark"
      className={
        'hero-form-card scroll-mt-28 ' +
        (emphasize ? 'ring-1 ring-cyan/40 ring-offset-2 ring-offset-transparent' : '')
      }
    >
      {status === 'success' ? (
        <div className="px-6 py-10 sm:px-8 sm:py-12 text-center space-y-5">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[rgba(57,216,232,0.12)] text-cyanDeep">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-[rgba(245,250,255,0.95)] tracking-tight">
              {c.successTitle}
            </h2>
            <p className="mt-2 text-[13.5px] text-slate/80 leading-relaxed max-w-sm mx-auto">
              {c.successText}
            </p>
          </div>
          <Button type="button" variant="primary" size="lg" className="mt-1" onClick={reset}>
            {c.successCta}
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="p-5 sm:p-6" noValidate>

          {/* Subline */}
          <p className="text-[13px] text-slate/70 leading-[1.5] mb-5">
            {c.cardSubline}
          </p>

          {/* Fehler-Banner */}
          {errors.general && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-error/30 bg-error/[0.06] px-4 py-3 text-[13px] text-error"
            >
              {errors.general}
            </div>
          )}

          {/* ① Bereich */}
          <fieldset className="mb-5 border-0 p-0 m-0">
            <legend className="text-[10.5px] font-semibold text-slate/55 uppercase tracking-[0.15em] mb-2.5">
              Bereich
            </legend>
            <CategorySelector value={category} onChange={setCategory} disabled={locked} />
            {errors.category && (
              <p className="mt-1.5 text-[12.5px] text-error" role="alert">
                {errors.category}
              </p>
            )}
          </fieldset>

          {/* ② Kontaktfelder – 2-spaltig ab sm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
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

          {/* ③ Upload – volle Breite, klar optional */}
          <div className="mb-5">
            <UploadDropzone file={file} onFile={setFile} error={errors.file} disabled={locked} />
            {!file && (
              <p className="mt-1.5 flex items-start gap-1.5 text-[11px] text-slate/50 leading-[1.4]">
                <ShieldIcon />
                <span>Nur zur Bearbeitung Ihrer Anfrage · vertraulich behandelt.</span>
              </p>
            )}
          </div>

          {/* ④ Einwilligungen */}
          <div className="mb-5 space-y-3.5 border-t border-white/[0.06] pt-5">
            <Checkbox
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={locked}
              label={
                <>
                  Ich habe die{' '}
                  <Link
                    href="/datenschutz"
                    className="text-cyanDeep underline underline-offset-2 font-medium hover:text-cyan transition-colors"
                  >
                    Datenschutzerklärung
                  </Link>{' '}
                  gelesen und bin damit einverstanden, dass meine Angaben zur
                  Bearbeitung meiner Anfrage zur persönlichen Energieprüfung
                  verarbeitet werden. Mir ist bekannt, dass ich per Telefon oder
                  E-Mail kontaktiert werden kann.
                </>
              }
            />
            {errors.consent && (
              <p className="text-[12.5px] text-error" role="alert">
                {errors.consent}
              </p>
            )}
            <Checkbox
              checked={whatsappConsent}
              onChange={(e) => setWhatsappConsent(e.target.checked)}
              disabled={locked}
              label={CONSENT_TEXTS.whatsapp}
            />
          </div>

          {/* ⑤ Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={locked}
            className="h-[52px] text-[14.5px] tracking-[-0.01em]"
          >
            {busy ? c.submitting : 'Kostenlose Energieprüfung anfragen'}
          </Button>

          <p className="mt-3 text-center text-[11px] text-slate/45 leading-[1.5]">
            Mit dem Absenden werden Ihre Angaben zur Anfrage verarbeitet.{' '}
            <Link
              href="/datenschutz"
              className="text-slate/60 underline underline-offset-2 hover:text-cyanDeep transition-colors"
            >
              Datenschutzerklärung
            </Link>
          </p>
        </form>
      )}
    </GlassCard>
  );
}
