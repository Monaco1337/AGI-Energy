'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Button } from '@elo/ui';
import { cn } from '@elo/ui';
import { estimateBill, estimateRoof, type BillSegment } from '@/lib/savingsEstimate';

type Segment = BillSegment | 'pv';

type Phase = 'idle' | 'analyzing' | 'result';

const SEGMENTS: {
  id: Segment;
  label: string;
  short: string;
  kind: 'bill' | 'roof';
  hint: string;
}[] = [
  {
    id: 'strom',
    label: 'Strom',
    short: 'Strom',
    kind: 'bill',
    hint: 'Aktuelle Stromrechnung (PDF oder Foto)',
  },
  {
    id: 'gas',
    label: 'Gas',
    short: 'Gas',
    kind: 'bill',
    hint: 'Aktuelle Gasrechnung (PDF oder Foto)',
  },
  {
    id: 'gewerbe',
    label: 'Gewerbe',
    short: 'Gewerbe',
    kind: 'bill',
    hint: 'Gewerbe-Strom- oder Gasrechnung',
  },
  {
    id: 'pv',
    label: 'Photovoltaik',
    short: 'PV',
    kind: 'roof',
    hint: 'Fotos Ihrer Dachflächen (mehrere Winkel)',
  },
];

interface HeroInstantPanelProps {
  /** URL-Param: Panel scrollen & leicht hervorheben */
  initialTrickOpen?: boolean;
}

export function HeroInstantPanel({ initialTrickOpen }: HeroInstantPanelProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const [segment, setSegment] = React.useState<Segment>('strom');
  const [phase, setPhase] = React.useState<Phase>('idle');
  const [files, setFiles] = React.useState<File[]>([]);
  const [scanStep, setScanStep] = React.useState(0);
  const [result, setResult] = React.useState<
    | { type: 'bill'; pctMin: number; pctMax: number; eurLow: number; eurHigh: number }
    | { type: 'roof'; kwpLo: number; kwpHi: number; areaLo: number; areaHi: number; perspectives: number }
    | null
  >(null);

  const active = SEGMENTS.find((s) => s.id === segment)!;
  const isRoof = active.kind === 'roof';

  React.useEffect(() => {
    if (!initialTrickOpen || !rootRef.current) return;
    const t = window.setTimeout(() => {
      rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);
    return () => window.clearTimeout(t);
  }, [initialTrickOpen]);

  React.useEffect(() => {
    if (phase !== 'analyzing') return;
    setScanStep(0);
    const steps = [0, 1, 2, 3];
    const interval = reduceMotion ? 120 : 520;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setScanStep(steps[Math.min(i, steps.length - 1)]!);
      if (i >= steps.length) {
        window.clearInterval(id);
        const next =
          active.kind === 'roof'
            ? {
                type: 'roof' as const,
                ...estimateRoof(files),
              }
            : {
                type: 'bill' as const,
                ...estimateBill(files, segment as BillSegment),
              };
        setResult(next);
        setPhase('result');
      }
    }, interval);
    return () => window.clearInterval(id);
  }, [phase, active.kind, segment, files, reduceMotion]);

  const onFilesPicked = (list: FileList | null) => {
    if (!list?.length) return;
    const arr = Array.from(list);
    setFiles(arr);
    setPhase('analyzing');
    setResult(null);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (phase === 'analyzing') return;
    onFilesPicked(e.dataTransfer.files);
  };

  const reset = () => {
    setFiles([]);
    setPhase('idle');
    setResult(null);
    setScanStep(0);
    if (fileRef.current) fileRef.current.value = '';
  };

  const onSegmentChange = (id: Segment) => {
    setSegment(id);
    reset();
  };

  return (
    <div
      ref={rootRef}
      id="hero-energietrick"
      className={cn(
        'relative scroll-mt-24 rounded-eloLg border border-line/80 bg-gradient-to-br from-card via-card to-paper2/90 shadow-elo overflow-hidden',
        initialTrickOpen && 'ring-2 ring-sage/25 ring-offset-2 ring-offset-paper',
      )}
    >
      {/* Licht-Rand */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-eloLg opacity-[0.45]"
        style={{
          background:
            'linear-gradient(135deg, rgba(56,99,77,0.12) 0%, transparent 42%, transparent 58%, rgba(232,182,106,0.14) 100%)',
        }}
      />

      <div className="relative px-5 sm:px-6 pt-5 pb-5 sm:pt-6 sm:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="size-8 rounded-full bg-gradient-to-br from-sage/20 to-brand/15 border border-sage/25 flex items-center justify-center"
              >
                <BoltIcon />
              </span>
              <div>
                <h2 className="text-[15px] font-semibold text-ink tracking-tight leading-tight">
                  Sofort-Einordnung
                </h2>
                <p className="text-[12px] text-muted mt-0.5 leading-snug">
                  {isRoof
                    ? 'Keine Rechnung nötig – laden Sie Ihre Dachflächen ein.'
                    : 'Laden Sie Ihre aktuelle Rechnung hoch – wir zeigen Ihr Potenzial.'}
                </p>
              </div>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted shrink-0 sm:pt-1">
            Live-Vorschau
          </span>
        </div>

        {/* Segment-Tabs */}
        <div
          className="flex p-1 rounded-elo bg-paper2/80 border border-line/90 mb-5 gap-0.5"
          role="tablist"
          aria-label="Energieart"
        >
          {SEGMENTS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={segment === s.id}
              disabled={phase === 'analyzing'}
              onClick={() => onSegmentChange(s.id)}
              className={cn(
                'relative flex-1 min-w-0 py-2.5 px-1 sm:px-2 rounded-[calc(var(--elo-radius)-4px)] text-[12px] sm:text-[13px] font-medium transition-colors',
                segment === s.id ? 'text-ink' : 'text-muted hover:text-ink2',
                phase === 'analyzing' && 'opacity-60',
              )}
            >
              {segment === s.id && (
                <motion.span
                  layoutId="hero-tab-bg"
                  className="absolute inset-0 bg-card shadow-sm border border-line/80 rounded-[calc(var(--elo-radius)-6px)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 whitespace-nowrap">{s.short}</span>
            </button>
          ))}
        </div>

        <input
          ref={fileRef}
          type="file"
          className="sr-only"
          accept={isRoof ? 'image/jpeg,image/png,image/webp' : 'application/pdf,image/jpeg,image/png,image/webp'}
          multiple={isRoof}
          onChange={(e) => onFilesPicked(e.target.files)}
        />

        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.div
              key="idle"
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
            >
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={onDrop}
                className={cn(
                  'group w-full rounded-elo border-2 border-dashed border-lineStrong hover:border-sage/45',
                  'bg-paper2/25 hover:bg-paper2/45 transition-colors text-left',
                  'px-5 py-8 sm:py-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-card',
                )}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <span className="size-14 rounded-2xl bg-sage/10 border border-sage/20 flex items-center justify-center text-sage group-hover:bg-sage/15 transition-colors">
                    {isRoof ? <RoofIcon /> : <DocIcon />}
                  </span>
                  <div>
                    <p className="text-[15px] sm:text-[16px] font-semibold text-ink">
                      {isRoof ? 'Dachflächen hierher ziehen' : 'Rechnung hierher ziehen'}
                    </p>
                    <p className="mt-1.5 text-[13px] text-muted max-w-sm mx-auto leading-relaxed">
                      {active.hint}
                      {isRoof ? ' – je mehr Perspektiven, desto präziser die Ersteinschätzung.' : ' – lesbar, eine Datei reicht für den ersten Korridor.'}
                    </p>
                  </div>
                  <span className="mt-1 inline-flex items-center gap-2 text-[13px] font-medium text-sage">
                    oder klicken zum Auswählen
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </button>
            </motion.div>
          )}

          {phase === 'analyzing' && (
            <motion.div
              key="scan"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              className="rounded-elo border border-line bg-paper2/30 px-5 py-8 sm:py-10"
            >
              <div className="max-w-sm mx-auto space-y-4">
                <p className="text-center text-[14px] font-medium text-ink">
                  {isRoof ? 'Flächen werden eingeordnet …' : 'Rechnung wird ausgewertet …'}
                </p>
                <ScanLine active={reduceMotion ? 3 : scanStep} />
                <ul className="space-y-2.5 text-[13px] text-ink2">
                  <ScanRow done={scanStep >= 0} label={isRoof ? 'Perspektiven & Kontrast' : 'Datei & Lesbarkeit'} />
                  <ScanRow done={scanStep >= 1} label={isRoof ? 'Neigung & Verschattung (heuristisch)' : 'Preisbestandteile strukturiert'} />
                  <ScanRow done={scanStep >= 2} label={isRoof ? 'Modulfläche grob geschätzt' : 'Vergleichskorridor berechnet'} />
                  <ScanRow done={scanStep >= 3} label="Ergebnis vorbereitet" />
                </ul>
                <p className="text-center text-[11.5px] text-muted leading-snug pt-1">
                  Dateien verlassen Ihren Browser nicht. Es findet keine automatische Vertragsprüfung statt.
                </p>
              </div>
            </motion.div>
          )}

          {phase === 'result' && result && (
            <motion.div
              key="result"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="space-y-5"
            >
              {result.type === 'bill' ? (
                <div className="rounded-elo border border-line bg-card px-5 py-6 sm:px-6 sm:py-7 shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-sage font-medium">
                    Erste Einordnung · {SEGMENTS.find((s) => s.id === segment)?.label}
                  </p>
                  <p className="mt-3 text-[22px] sm:text-[26px] font-display text-ink leading-tight">
                    Bis zu{' '}
                    <span className="bg-gradient-to-r from-sage to-sage2 bg-clip-text text-transparent">
                      {result.pctMin}–{result.pctMax} %
                    </span>{' '}
                    im Arbeitspreis- und Grundpreis-Korridor
                  </p>
                  <p className="mt-3 text-[14px] text-ink2 leading-relaxed">
                    Typisches Wechsel- und Verhandlungspotenzial gegenüber häufigen Grundversorger-Profilen –
                    nicht Ihr garantiertes Ergebnis, aber eine belastbare Richtung.
                  </p>
                  <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-[13px] text-muted">Häufig entspricht das grob</span>
                    <span className="text-[17px] font-semibold text-ink tabular-nums">
                      ca. {result.eurLow}–{result.eurHigh} €
                    </span>
                    <span className="text-[13px] text-muted">pro Monat – abhängig von Verbrauch und Tarif.</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-elo border border-line bg-card px-5 py-6 sm:px-6 sm:py-7 shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-brand2 font-medium">
                    Dachflächen · {result.perspectives} Perspektive{result.perspectives === 1 ? '' : 'n'}
                  </p>
                  <p className="mt-3 text-[22px] sm:text-[26px] font-display text-ink leading-tight">
                    Geschätzte Modulfläche{' '}
                    <span className="text-brand2">
                      ca. {result.areaLo}–{result.areaHi} m²
                    </span>
                  </p>
                  <p className="mt-3 text-[14px] text-ink2 leading-relaxed">
                    Übliche technische Bandbreite für eine PV-Erweiterung oder Neuanlage an diesem Haus:{' '}
                    <strong className="text-ink font-semibold">
                      ca. {result.kwpLo}–{result.kwpHi} kWp
                    </strong>{' '}
                    – Detailplanung, Statik und Wirtschaftlichkeit klären wir im PV-Check.
                  </p>
                </div>
              )}

              <p className="text-[11.5px] text-muted leading-relaxed px-0.5">
                Kein Rechts- oder Investmentrat. Verbindliche Zahlen erhalten Sie nach Prüfung durch unsere
                Berater im nächsten Schritt.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/energiecheck" className="sm:flex-1">
                  <Button variant="primary" size="lg" fullWidth>
                    Kostenlosen Check abschließen
                  </Button>
                </Link>
                <Button type="button" variant="ghost" size="lg" fullWidth className="sm:flex-none" onClick={reset}>
                  Neue Datei
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScanRow({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={cn(
          'size-5 rounded-full border flex items-center justify-center shrink-0 transition-colors',
          done ? 'border-sage bg-sage text-paper' : 'border-line bg-paper2 text-transparent',
        )}
      >
        {done ? <CheckTiny /> : null}
      </span>
      <span className={cn('transition-colors', done ? 'text-ink' : 'text-muted')}>{label}</span>
    </li>
  );
}

function ScanLine({ active }: { active: number }) {
  return (
    <div className="h-1 rounded-pill bg-line overflow-hidden">
      <motion.div
        className="h-full rounded-pill bg-gradient-to-r from-sage via-sage to-brand"
        initial={{ width: '0%' }}
        animate={{ width: `${25 + active * 25}%` }}
        transition={{ duration: 0.35 }}
      />
    </div>
  );
}

function CheckTiny() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 5L4.2 7.2L8 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="text-current">
      <path
        d="M8 4h6l4 4v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M14 4v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 13h6M9 16h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function RoofIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden className="text-current">
      <path d="M3 12l9-7 9 7v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-sage">
      <path
        d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}
