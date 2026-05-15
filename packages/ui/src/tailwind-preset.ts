import type { Config } from 'tailwindcss';

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        /* AGI Premium */
        navy: 'var(--agi-navy)',
        graphite: 'var(--agi-graphite)',
        softWhite: 'var(--agi-soft-white)',
        bgSoft: 'var(--agi-bg-soft)',
        energyGreen: 'var(--agi-energy-green)',
        premiumBlue: 'var(--agi-premium-blue)',
        softGold: 'var(--agi-soft-gold)',
        slate: 'var(--agi-slate)',
        borderLight: 'var(--agi-border-light)',
        success: 'var(--agi-success)',
        warning: 'var(--agi-warning)',
        error: 'var(--agi-error)',
        /* Premium Dark Hero */
        burgundy: 'var(--agi-burgundy)',
        burgundyDeep: 'var(--agi-burgundy-deep)',
        charcoal: 'var(--agi-charcoal)',
        charcoal2: 'var(--agi-charcoal-2)',
        warmAmber: 'var(--agi-warm-amber)',
        cyan: 'var(--agi-cyan)',
        cyanDeep: 'var(--agi-cyan-deep)',
        /* Legacy (map to tokens.css) */
        paper: 'var(--elo-paper)',
        paper2: 'var(--elo-paper-2)',
        card: 'var(--elo-card)',
        ink: 'var(--elo-ink)',
        ink2: 'var(--elo-ink-2)',
        muted: 'var(--elo-muted)',
        line: 'var(--elo-line)',
        lineStrong: 'var(--elo-line-strong)',
        sage: 'var(--elo-sage)',
        sage2: 'var(--elo-sage-2)',
        gold: 'var(--elo-gold)',
        gold2: 'var(--elo-gold-2)',
        brand: 'var(--elo-brand)',
        brand2: 'var(--elo-brand-2)',
        leadRed: 'var(--elo-red)',
        leadOrange: 'var(--elo-orange)',
        leadYellow: 'var(--elo-yellow)',
        leadBlue: 'var(--elo-blue)',
        leadGray: 'var(--elo-gray)',
        leadBlack: 'var(--elo-black)',
      },
      fontFamily: {
        sans: ['var(--elo-font-sans)'],
        display: ['var(--elo-font-display)'],
      },
      borderRadius: {
        elo: 'var(--elo-radius)',
        eloLg: 'var(--elo-radius-lg)',
        xl3: 'var(--agi-radius-xl)',
      },
      boxShadow: {
        eloSm: 'var(--elo-shadow-sm)',
        elo: 'var(--elo-shadow)',
        eloLg: 'var(--elo-shadow-lg)',
        glass: 'var(--agi-shadow-glass)',
        premium: 'var(--agi-shadow-premium)',
        lift: 'var(--agi-shadow-lift)',
      },
      backdropBlur: {
        glass: '18px',
      },
    },
  },
};

export default preset;
