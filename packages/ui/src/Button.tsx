import * as React from 'react';
import { cn } from './cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const base =
  'inline-flex items-center justify-center font-semibold select-none rounded-elo transition-[transform,box-shadow,background-color,color,opacity] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-softWhite focus-visible:ring-cyan disabled:opacity-45 disabled:cursor-not-allowed min-h-[48px]';

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-br from-cyan to-cyanDeep text-white shadow-lift hover:shadow-premium hover:-translate-y-px',
  secondary:
    'bg-card/90 text-navy border border-borderLight backdrop-blur-glass hover:border-cyan/40 hover:bg-card shadow-glass',
  ghost: 'bg-transparent text-navy hover:bg-bgSoft/80 border border-transparent',
  danger: 'bg-error text-white hover:opacity-95 shadow-eloSm',
};

const sizes: Record<Size, string> = {
  md: 'h-12 px-5 text-[15px] gap-2',
  lg: 'h-14 px-7 text-[16px] gap-2',
  xl: 'h-16 px-8 text-[17px] gap-2',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...rest}
    />
  );
});
