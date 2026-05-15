'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@elo/ui';
import { estimateBill, estimateRoof, type BillSegment } from '@/lib/savingsEstimate';

type Segment = BillSegment | 'pv';
type Phase = 'idle' | 'analyzing' | 'result';

const TABS: { id: Segment; label: string; kind: 'bill' | 'roof' }[] = [
  { id: 'strom', label: 'Strom', kind: 'bill' },
  { id: 'gas', label: 'Gas', kind: 'bill' },
  { id: 'gewerbe', label: 'Gewerbe', kind: 'bill' },
  { id: 'pv', label: 'PV', kind: 'roof' },
];

interface WizardInstantEstimateProps {
  /** Aus dem Funnel: Strom/Gas/PV → Tab-Vorauswahl */
  interestHint?: string | null;
}

export function WizardInstantEstimate({ interestHint }: WizardInstantEstimateProps) {
  const reduceMotion = useReducedMotion();
  const fileRef = React.useRef<HTMLInputElement>(null);

  const initialTab = React.useMemo((): Segment => {
    const h = (interestHint ?? '').toLowerCase();
    if (h.includes('gas') && !h.includes('strom')) return 'gas';
    if (h.includes('photo') || h.includes('pv')) return 'pv';
    if (h.includes('gewerbe') || h.includes('business')) return 'gewerbe';
    if (h.includes('strom')) return 'strom';
    return 'strom';
  }, [interestHint]);

  const [segment, setSegment] = React.useState<Segment>(initialTab);
  React.useEffect(() => {
    setSegment(initialTab);
  }, [initialTab]);

  const [phase, setPhase] = React.useState<Phase>('idle');
  const [files, setFiles] = React.useState<File[]>([]);
  const [scanStep, setScanStep] = React.useState(0);
  const [result, setResult] = React.useState<
    | { type: 'bill'; pctMin: number; pctMax: number; eurLow: number; eurHigh: number }
    | { type: 'roof'; kwpLo: number; kwpHi: number; areaLo: number; areaHi: number; perspectives: number }
    | null
  >(null);

  const active = TABS.find((t) => t.id === segment)!;
  const isRoof = active.kind === 'roof';

  React.useEffect(() => {
    if (phase !== 'analyzing') return;
    setScanStep(0);
    const steps = [0, 1, 2, 3];
    const interval = reduceMotion ? 100 : 420;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setScanStep(steps[Math.min(i, steps.length - 1)]!);
      if (i >= steps.length) {
        window.clearInterval(id);
        const next =
          active.kind === 'roof'
            ? { type: 'roof' as const, ...estimateRoof(files) }
            : { type: 'bill' as const, ...estimateBill(files, segment as BillSegment) };
        setResult(next);
        setPhase('result');
      }
    }, interval);
    return () => window.clearInterval(id);
  }, [phase, active.kind, segment, files, reduceMotion]);

  const onFiles = (list: FileList | null) => {
    if (!list?.length) return;
    setFiles(Array.from(list));
    setPhase('analyzing');
    setResult(null);
  };

  const reset = () => {
    setFiles([]);
    setPhase('idle');
    setResult(null);
    setScanStep(0);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="mb-6 rounded-eloLg border border-sage/20 bg-gradient-to-br from-sage/[0.06] to-brand/[0.05] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-sage font-semibold">Kostenloser Energietrick</p>
          <p className="mt-1 text-[13.5px] text-ink2 leading-snug">
            Datei per Drag-and-drop oder Klick – Sofort-Einordnung Ihres Sparpotenzials (ohne Upload zum Server).
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 p-1 rounded-elo bg-paper2/90 border border-line mb-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            disabled={phase === 'analyzing'}
            onClick={() => {
              setSegment(t.id);
              reset();
            }}
            className={cn(
              'relative flex-1 min-w-[4.5rem] py-2 px-2 rounded-[10px] text-[12px] font-medium transition-colors',
              segment === t.id ? 'text-ink' : 'text-muted hover:text-ink2',
              phase === 'analyzing' && 'opacity-50',
            )}
          >
            {segment === t.id && (
              <motion.span
                layoutId="wiz-tab"
                className="absolute inset-0 bg-card border border-line shadow-sm rounded-[9px]"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>

      <input
        ref={fileRef}
        type="file"
        className="sr-only"
        accept={isRoof ? 'image/jpeg,image/png,image/webp' : 'application/pdf,image/jpeg,image/png,image/webp'}
        multiple={isRoof}
        onChange={(e) => onFiles(e.target.files)}
      />

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.button
            key="idle"
            type="button"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.6 }}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onFiles(e.dataTransfer.files);
            }}
            className={cn(
              'w-full rounded-elo border-2 border-dashed border-lineStrong hover:border-sage/40',
              'bg-card/80 px-4 py-6 text-center transition-colors cursor-pointer',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2',
            )}
          >
            <p className="text-[14px] font-semibold text-ink">
              {isRoof ? 'Dachfotos hierher ziehen' : 'Rechnung hierher ziehen'}
            </p>
            <p className="mt-1 text-[12.5px] text-muted">
              {isRoof ? 'Mehrere Winkel möglich · JPG / PNG' : 'PDF oder Foto · eine Datei reicht'}
            </p>
          </motion.button>
        )}

        {phase === 'analyzing' && (
          <motion.div
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-elo border border-line bg-card/90 px-4 py-5"
          >
            <p className="text-center text-[13px] font-medium text-ink mb-3">
              {isRoof ? 'Flächen werden eingeordnet…' : 'Rechnung wird ausgewertet…'}
            </p>
            <div className="h-1 rounded-pill bg-line overflow-hidden mb-3">
              <motion.div
                className="h-full rounded-pill bg-sage"
                initial={{ width: '0%' }}
                animate={{ width: `${25 + scanStep * 25}%` }}
                transition={{ duration: 0.25 }}
              />
            </div>
            <p className="text-center text-[11px] text-muted">Nur in Ihrem Browser – keine Übertragung</p>
          </motion.div>
        )}

        {phase === 'result' && result && (
          <motion.div
            key="res"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-elo border border-line bg-card px-4 py-4 space-y-3"
          >
            {result.type === 'bill' ? (
              <>
                <p className="text-[20px] font-display text-ink leading-tight">
                  Bis zu{' '}
                  <span className="text-sage">
                    {result.pctMin}–{result.pctMax} %
                  </span>{' '}
                  Einsparpotenzial <span className="text-[13px] text-muted font-sans">(Korridor)</span>
                </p>
                <p className="text-[13px] text-ink2">
                  Grob entspricht das oft ca.{' '}
                  <strong className="text-ink">
                    {result.eurLow}–{result.eurHigh} €
                  </strong>{' '}
                  pro Monat – exakte Prüfung folgt nach Ihrer Auswahl unten.
                </p>
              </>
            ) : (
              <>
                <p className="text-[18px] font-display text-ink leading-tight">
                  Ca. {result.areaLo}–{result.areaHi} m² Dachfläche ·{' '}
                  <span className="text-brand2">{result.kwpLo}–{result.kwpHi} kWp</span> Bandbreite
                </p>
                <p className="text-[13px] text-ink2">
                  {result.perspectives} Ansicht{result.perspectives === 1 ? '' : 'en'} – Detailplanung im Check.
                </p>
              </>
            )}
            <button
              type="button"
              onClick={reset}
              className="text-[12.5px] font-medium text-sage underline underline-offset-4 hover:text-sage2"
            >
              Andere Datei testen
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
