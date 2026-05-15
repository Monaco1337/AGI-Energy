import * as React from 'react';
import { cn } from './cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'light' | 'dark';
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { tone = 'light', className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl3 border shadow-premium',
        tone === 'light' &&
          'border-white/30 bg-card-glass shadow-glass backdrop-blur-glass text-navy',
        tone === 'dark' &&
          'border-white/10 bg-graphite/85 text-softWhite backdrop-blur-glass shadow-premium',
        className,
      )}
      {...rest}
    />
  );
});
