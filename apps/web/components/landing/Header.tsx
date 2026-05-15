'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button, cn } from '@elo/ui';
import { Logo } from '@/components/brand/Logo';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';

const NAV_LINKS = [
  { href: '/stromkosten-senken', label: 'Strom' },
  { href: '/gaskosten-senken', label: 'Gas' },
  { href: '/photovoltaik-beratung', label: 'Photovoltaik' },
  { href: '/gewerbe-energiecheck', label: 'Gewerbe' },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 isolate transition-all duration-300 ease-out',
        // Apple-style frosted glass
        'bg-white/55 supports-[backdrop-filter]:bg-white/55',
        '[backdrop-filter:saturate(180%)_blur(22px)]',
        '[-webkit-backdrop-filter:saturate(180%)_blur(22px)]',
        scrolled
          ? 'bg-white/72 supports-[backdrop-filter]:bg-white/72 shadow-[0_1px_0_rgba(7,17,31,0.06),0_10px_28px_-18px_rgba(7,17,31,0.18)]'
          : 'shadow-[inset_0_-1px_0_rgba(255,255,255,0.55),0_0_0_transparent]',
      )}
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      {/* Inner top highlight wie auf macOS */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-5 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center group shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-white/60"
          aria-label="AGI Energy – Startseite"
        >
          <Logo variant="wordmark" size="md" />
        </Link>

        <nav
          className="hidden md:flex items-center gap-0.5 text-[14px] font-medium"
          aria-label="Hauptnavigation"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-3.5 py-2 rounded-full text-navy/70 hover:text-navy transition-colors before:absolute before:inset-0 before:rounded-full before:bg-navy/0 hover:before:bg-navy/[0.045] before:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 focus-visible:ring-offset-1"
            >
              <span className="relative">{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="primary"
            size="md"
            className="hidden sm:inline-flex h-11 px-5 text-[14px] rounded-full"
            onClick={scrollToEnergyForm}
          >
            Persönliche Prüfung starten
          </Button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex size-10 items-center justify-center rounded-full border border-borderLight/80 bg-white/60 text-navy transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile glass drawer */}
      <div
        id="mobile-nav"
        className={cn(
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
          open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        )}
        aria-hidden={!open}
      >
        <div className="mx-auto max-w-6xl px-5 pb-5 pt-2">
          <div className="rounded-2xl border border-white/40 bg-white/65 [backdrop-filter:saturate(180%)_blur(22px)] [-webkit-backdrop-filter:saturate(180%)_blur(22px)] shadow-[0_10px_28px_-18px_rgba(7,17,31,0.25)] p-2">
            <ul className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-navy hover:bg-navy/[0.04] transition-colors"
                  >
                    <span>{l.label}</span>
                    <span className="text-slate/60" aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 px-2 pb-1.5">
              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                className="rounded-full"
                onClick={() => {
                  setOpen(false);
                  scrollToEnergyForm();
                }}
              >
                Persönliche Prüfung starten
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
