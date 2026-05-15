import * as React from 'react';
import { cn } from './cn';

type Tone =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'blue'
  | 'gray'
  | 'black'
  | 'sage'
  | 'gold'
  | 'neutral'
  | 'energy'
  | 'premium'
  | 'dark';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const tones: Record<Tone, string> = {
  red: 'bg-error/10 text-error border-error/25',
  orange: 'bg-leadOrange/10 text-leadOrange border-leadOrange/30',
  yellow: 'bg-warning/12 text-warning border-warning/30',
  blue: 'bg-premiumBlue/10 text-premiumBlue border-premiumBlue/25',
  gray: 'bg-slate/10 text-slate border-slate/25',
  black: 'bg-navy text-white border-navy',
  sage: 'bg-energyGreen/12 text-energyGreen border-energyGreen/30',
  gold: 'bg-softGold/15 text-graphite border-softGold/35',
  neutral: 'bg-bgSoft text-graphite border-borderLight',
  energy: 'bg-energyGreen/12 text-energyGreen border-energyGreen/30',
  premium: 'bg-premiumBlue/10 text-premiumBlue border-premiumBlue/25',
  dark: 'bg-navy/90 text-softWhite border-white/15',
};

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 h-6 text-xs font-semibold rounded-full border',
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}
