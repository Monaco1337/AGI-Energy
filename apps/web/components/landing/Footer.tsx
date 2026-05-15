import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';

const linkCls = 'hover:text-cyan transition-colors';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-burgundyDeep text-softWhite">
      {/* dezente Premium-Ambiance */}
      <div
        className="pointer-events-none absolute -top-40 -left-32 size-[520px] rounded-full bg-warmAmber/6 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-32 size-[520px] rounded-full bg-cyan/5 blur-[140px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 grid-faint opacity-[0.08]" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8 pt-16 sm:pt-20 pb-10 grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
        <div className="sm:col-span-2 lg:col-span-5">
          <Logo variant="wordmark" size="lg" onDark showTagline />
          <p className="mt-7 text-[14.5px] text-softWhite/65 leading-relaxed max-w-sm">
            Persönliche Energieprüfung für Strom, Gas, Solar und Gewerbe. Vertraulich, individuell
            und ohne automatische Tarifvermittlung.
          </p>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-[11px] font-medium uppercase tracking-[0.22em] text-warmAmber/85">
            Bereiche
          </h4>
          <ul className="mt-5 space-y-3 text-[14px] text-softWhite/70">
            <li>
              <Link className={linkCls} href="/stromkosten-senken">
                Stromkosten senken
              </Link>
            </li>
            <li>
              <Link className={linkCls} href="/gaskosten-senken">
                Gaskosten senken
              </Link>
            </li>
            <li>
              <Link className={linkCls} href="/photovoltaik-beratung">
                Photovoltaik-Beratung
              </Link>
            </li>
            <li>
              <Link className={linkCls} href="/gewerbe-energiecheck">
                Gewerbe-Energie-Check
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-[11px] font-medium uppercase tracking-[0.22em] text-warmAmber/85">
            Service
          </h4>
          <ul className="mt-5 space-y-3 text-[14px] text-softWhite/70">
            <li>
              <Link className={linkCls} href="/energiecheck">
                Ausführlicher Energie-Check
              </Link>
            </li>
            <li>
              <Link className={linkCls} href="/energieberatung-deutschland">
                Energieberatung Deutschland
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-[11px] font-medium uppercase tracking-[0.22em] text-warmAmber/85">
            Rechtliches
          </h4>
          <ul className="mt-5 space-y-3 text-[14px] text-softWhite/70">
            <li>
              <Link className={linkCls} href="/datenschutz">
                Datenschutz
              </Link>
            </li>
            <li>
              <Link className={linkCls} href="/datenschutz/anfrage">
                Auskunft / Löschung
              </Link>
            </li>
            <li>
              <Link className={linkCls} href="/impressum">
                Impressum
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 py-6 text-[13px] text-softWhite/45 flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} AGI Energy</span>
          <span>Demo-Plattform · keine öffentliche Tarifliste.</span>
        </div>
      </div>
    </footer>
  );
}
