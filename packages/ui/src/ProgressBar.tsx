import * as React from 'react';
import { cn } from './cn';

export interface ProgressBarProps {
  value: number; // 0..1
  label?: string;
  className?: string;
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <div className={cn('flex flex-col gap-2', className)} aria-live="polite">
      <div className="flex justify-between text-sm text-muted">
        <span>{label}</span>
        <span>{Math.round(pct * 100)}%</span>
      </div>
      <div className="h-2 rounded-full bg-paper2 overflow-hidden">
        <div
          className="h-full bg-sage transition-[width]"
          style={{ width: `${pct * 100}%`, transitionDuration: 'var(--elo-dur)' }}
        />
      </div>
    </div>
  );
}
