import * as React from 'react';
import { cn } from './cn';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function Card({ className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-card border border-line rounded-eloLg shadow-eloSm print-card',
          className,
        )}
        {...rest}
      />
    );
  },
);
