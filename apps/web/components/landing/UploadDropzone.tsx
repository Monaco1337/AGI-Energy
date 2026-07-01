'use client';

import * as React from 'react';
import { cn } from '@elo/ui';

const ACCEPT = 'application/pdf,image/jpeg,image/jpg,image/png';
const MAX_MB = 10;
const MAX_BYTES = MAX_MB * 1024 * 1024;

function fmtBytes(n: number): string {
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

interface UploadDropzoneProps {
  file: File | null;
  onFile: (f: File | null) => void;
  error?: string;
  disabled?: boolean;
}

export function UploadDropzone({ file, onFile, error, disabled }: UploadDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [drag, setDrag] = React.useState(false);

  const accept = (list: FileList | null) => {
    const f = list?.[0];
    if (!f) return;
    if (f.size > MAX_BYTES) {
      // silently ignore oversized – parent will show error after upload attempt
      onFile(f);
      return;
    }
    onFile(f);
  };

  const open = () => { if (!disabled) inputRef.current?.click(); };

  return (
    <div className="space-y-1">
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={ACCEPT}
        disabled={disabled}
        onChange={(e) => accept(e.target.files)}
      />

      {file ? (
        /* ── Datei ausgewählt ── */
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl px-4 py-3',
            'border border-[rgba(57,216,232,0.22)] bg-[rgba(57,216,232,0.05)]',
          )}
        >
          <span
            aria-hidden
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[rgba(57,216,232,0.2)] bg-[rgba(57,216,232,0.08)] text-cyanDeep"
          >
            <DocIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-medium text-[rgba(245,250,255,0.93)] leading-snug">
              {file.name}
            </p>
            <p className="text-[11.5px] text-slate/80 leading-none mt-0.5">
              {fmtBytes(file.size)} · Rechnung angehängt
            </p>
          </div>
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              onFile(null);
              if (inputRef.current) inputRef.current.value = '';
            }}
            className="shrink-0 rounded-lg p-1.5 text-slate/60 transition-colors hover:bg-white/[0.06] hover:text-[rgba(255,90,90,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/50"
            aria-label="Datei entfernen"
          >
            <XIcon />
          </button>
        </div>
      ) : (
        /* ── Kein File: optionale Upload-Zeile ── */
        <div
          role="group"
          aria-label="Rechnung anhängen (optional)"
          onDragEnter={(e) => { e.preventDefault(); if (!disabled) setDrag(true); }}
          onDragOver={(e) => { e.preventDefault(); if (!disabled) setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            if (!disabled) accept(e.dataTransfer.files);
          }}
          className={cn(
            'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors',
            disabled && 'pointer-events-none opacity-50',
            error
              ? 'border border-error/30 bg-error/[0.04]'
              : drag
                ? 'border border-[rgba(57,216,232,0.3)] bg-[rgba(57,216,232,0.05)]'
                : 'border border-white/[0.07] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.04]',
          )}
        >
          {/* Icon */}
          <span
            aria-hidden
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors',
              drag
                ? 'border-[rgba(57,216,232,0.25)] bg-[rgba(57,216,232,0.08)] text-cyanDeep'
                : 'border-white/[0.07] bg-white/[0.03] text-slate/70',
            )}
          >
            <PaperclipIcon />
          </span>

          {/* Label */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 leading-none">
              <span className="text-[13.5px] font-medium text-[rgba(245,250,255,0.82)]">
                Rechnung anhängen
              </span>
              <span className="rounded-md border border-white/[0.1] bg-white/[0.04] px-1.5 py-px text-[9.5px] font-semibold uppercase tracking-[0.12em] text-slate/70">
                Optional
              </span>
            </div>
            <p className="mt-0.5 text-[11.5px] leading-snug text-slate/55">
              PDF oder Foto · max. 10 MB · für eine präzisere Einschätzung
            </p>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={open}
            disabled={disabled}
            className={cn(
              'shrink-0 rounded-lg border px-3.5 py-2 text-[12.5px] font-medium transition-colors',
              'border-white/[0.1] bg-white/[0.04] text-[rgba(235,245,250,0.72)]',
              'hover:border-[rgba(57,216,232,0.28)] hover:bg-[rgba(57,216,232,0.07)] hover:text-cyanDeep',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(57,216,232,0.5)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            )}
          >
            Auswählen
          </button>
        </div>
      )}

      {error && (
        <p className="text-[12px] text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function PaperclipIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21.44 11.05l-8.49 8.49a5.5 5.5 0 01-7.78-7.78l9.19-9.19a3.5 3.5 0 014.95 4.95l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8m-5-5l5 5m-5-5v5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
