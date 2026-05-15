'use client';

import { useEffect, useState } from 'react';

const COOKIE = 'comfort';

function readCookie(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split('; ').some((c) => c.startsWith(`${COOKIE}=1`));
}

function writeCookie(on: boolean) {
  const oneYear = 60 * 60 * 24 * 365;
  if (on) {
    document.cookie = `${COOKIE}=1; max-age=${oneYear}; path=/; samesite=lax`;
    document.documentElement.dataset.comfort = '1';
  } else {
    document.cookie = `${COOKIE}=0; max-age=${oneYear}; path=/; samesite=lax`;
    document.documentElement.dataset.comfort = '0';
  }
}

export function ComfortToggle({ appearance = 'solid' }: { appearance?: 'solid' | 'ghost' }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const initial =
      readCookie() ||
      (typeof window !== 'undefined' && window.matchMedia('(prefers-contrast: more)').matches);
    setOn(initial);
    if (initial) writeCookie(true);
  }, []);

  const ghost = appearance === 'ghost';

  return (
    <button
      type="button"
      onClick={() => {
        const next = !on;
        setOn(next);
        writeCookie(next);
      }}
      aria-pressed={on}
      title="Komfort-Modus für größere Schrift und höhere Kontraste"
      className={
        ghost
          ? 'inline-flex items-center gap-2 h-10 px-3 rounded-elo border border-white/20 bg-white/5 text-[14px] text-softWhite hover:bg-white/10'
          : 'inline-flex items-center gap-2 h-10 px-3 rounded-elo border border-line bg-card text-[14px] text-ink hover:border-lineStrong'
      }
    >
      <span aria-hidden className="text-[16px]">A+</span>
      <span className="hidden sm:inline">{on ? 'Komfort an' : 'Komfort'}</span>
    </button>
  );
}
