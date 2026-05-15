import * as React from 'react';
import { cn } from '@elo/ui';

type Variant = 'wordmark' | 'mark' | 'mark-on-light';
type Size = 'sm' | 'md' | 'lg';

interface LogoProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  textHiddenOnMobile?: boolean;
  /** Helles Wordmark für dunkle Header/Hero */
  onDark?: boolean;
  /** Tagline „Persönlich. Transparent. Zukunftssicher." anzeigen (Footer / Marketing). */
  showTagline?: boolean;
}

const ICON_PX: Record<Size, number> = { sm: 34, md: 42, lg: 64 };
const TEXT_PX: Record<Size, string> = {
  sm: 'text-[15px]',
  md: 'text-[18px]',
  lg: 'text-[26px]',
};
const TAG_PX: Record<Size, string> = {
  sm: 'text-[9px]',
  md: 'text-[10px]',
  lg: 'text-[11px]',
};
const GAP: Record<Size, string> = {
  sm: 'gap-2.5',
  md: 'gap-3',
  lg: 'gap-4',
};

/**
 * AGI Energy – Brand-Logo.
 * Top-Arc-Ring, geometrische A-Mark, Cyan-Swoosh + Wordmark.
 */
export function Logo({
  variant = 'wordmark',
  size = 'md',
  className,
  textHiddenOnMobile = false,
  onDark = false,
  showTagline = false,
}: LogoProps) {
  const px = ICON_PX[size];

  if (variant === 'mark' || variant === 'mark-on-light') {
    return <BrandMark size={px} onDark={variant === 'mark'} className={className} />;
  }

  return (
    <span className={cn('inline-flex items-center group', GAP[size], className)}>
      <BrandMark size={px} onDark={onDark} />
      <span
        className={cn(
          'flex flex-col leading-none',
          textHiddenOnMobile && 'hidden sm:flex',
        )}
      >
        <span
          className={cn(
            'font-display font-semibold tracking-[0.16em]',
            TEXT_PX[size],
          )}
        >
          <span className={onDark ? 'text-softWhite' : 'text-navy'}>AGI</span>
          <span aria-hidden> </span>
          <span className="text-cyan">ENERGY</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              'mt-2 uppercase tracking-[0.24em] font-medium',
              TAG_PX[size],
              onDark ? 'text-softWhite/55' : 'text-slate',
            )}
          >
            Persönlich. Transparent. Zukunftssicher.
          </span>
        )}
      </span>
    </span>
  );
}

function BrandMark({
  size,
  onDark = false,
  className,
}: {
  size: number;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative inline-flex items-center justify-center shrink-0',
        onDark ? 'text-softWhite' : 'text-navy',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 80 80"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="agi-ring" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="agi-swoosh" x1="0" y1="0.5" x2="1" y2="0.5">
            <stop offset="0" stopColor="#4FD1C5" stopOpacity="0" />
            <stop offset="0.22" stopColor="#4FD1C5" stopOpacity="1" />
            <stop offset="0.78" stopColor="#2BAFA2" stopOpacity="0.95" />
            <stop offset="1" stopColor="#4FD1C5" stopOpacity="0" />
          </linearGradient>
          <filter id="agi-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>

        {/* Top-Arc-Ring */}
        <path
          d="M12 42 A28 28 0 0 1 68 42"
          stroke="url(#agi-ring)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* A – als V-Stroke, der Querbalken wird durch den Swoosh ersetzt */}
        <path
          d="M22 62 L40 14 L58 62"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Cyan-Swoosh – sanfter Energie-Bogen unter dem A */}
        <path
          d="M4 38 C 22 58, 58 58, 76 38"
          stroke="url(#agi-swoosh)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Soft inner highlight am Swoosh-Peak */}
        <path
          d="M28 50 C 36 54, 44 54, 52 50"
          stroke="#9af0e7"
          strokeOpacity="0.55"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          filter="url(#agi-soft)"
        />
      </svg>
    </span>
  );
}
