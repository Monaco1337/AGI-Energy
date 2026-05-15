import * as React from 'react';
import { cn } from './cn';

export interface OptionCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  description?: string;
  selected?: boolean;
  icon?: React.ReactNode;
}

export const OptionCard = React.forwardRef<HTMLButtonElement, OptionCardProps>(function OptionCard(
  { label, description, selected, icon, className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={Boolean(selected)}
      data-selected={selected ? 'true' : 'false'}
      className={cn(
        'group relative flex w-full cursor-pointer items-center gap-4 text-left rounded-eloLg border-2 bg-card px-5 py-5 min-h-[72px] sm:min-h-[76px]',
        'transition-[transform,border-color,box-shadow,background-color]',
        'hover:border-slate/35 hover:shadow-glass active:scale-[0.992]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-softWhite focus-visible:ring-premiumBlue',
        selected
          ? 'border-energyGreen bg-energyGreen/[0.08] shadow-lift ring-1 ring-energyGreen/25'
          : 'border-borderLight',
        className,
      )}
      {...rest}
    >
      {icon && (
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full border',
            selected ? 'border-energyGreen bg-energyGreen text-white' : 'border-borderLight bg-softWhite text-navy',
          )}
          aria-hidden
        >
          {icon}
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span className="block text-[16.5px] sm:text-[17px] font-semibold leading-snug text-navy">
          {label}
        </span>
        {description && (
          <span className="block mt-1 text-[13.5px] text-slate leading-snug">{description}</span>
        )}
      </span>
      <span
        aria-hidden
        className={cn(
          'shrink-0 size-6 rounded-full border-2 transition-colors flex items-center justify-center',
          selected ? 'border-energyGreen bg-energyGreen' : 'border-borderLight group-hover:border-slate/50',
        )}
      >
        {selected && (
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M2.8 7.2L5.6 10L11.2 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
});
