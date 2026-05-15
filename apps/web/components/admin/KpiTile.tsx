import { cn } from '@elo/ui';

interface KpiTileProps {
  label: string;
  value: number | string;
  hint?: string;
  tone?: 'neutral' | 'red' | 'orange' | 'yellow' | 'blue' | 'sage';
}

const TONE: Record<NonNullable<KpiTileProps['tone']>, string> = {
  neutral: 'border-line',
  red: 'border-leadRed/50',
  orange: 'border-leadOrange/50',
  yellow: 'border-leadYellow/50',
  blue: 'border-leadBlue/50',
  sage: 'border-sage/50',
};

export function KpiTile({ label, value, hint, tone = 'neutral' }: KpiTileProps) {
  return (
    <div className={cn('rounded-eloLg border bg-card p-5', TONE[tone])}>
      <div className="text-[13px] uppercase tracking-[0.12em] text-muted">{label}</div>
      <div className="mt-2 font-display text-[28px] text-ink leading-tight">{value}</div>
      {hint && <div className="mt-1 text-[13px] text-muted">{hint}</div>}
    </div>
  );
}
