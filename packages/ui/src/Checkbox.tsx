import * as React from 'react';
import { cn } from './cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, id, className, ...rest },
  ref,
) {
  const reactId = React.useId();
  const fid = id ?? `c-${reactId.replace(/:/g, '')}`;
  return (
    <label htmlFor={fid} className="flex gap-3 items-start cursor-pointer select-none min-h-[44px]">
      <input
        ref={ref}
        id={fid}
        type="checkbox"
        className={cn(
          'mt-1 size-5 min-w-[20px] rounded border border-lineStrong accent-energyGreen shrink-0',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-softWhite focus-visible:ring-premiumBlue',
          className,
        )}
        {...rest}
      />
      <span className={cn('text-[15px] leading-snug text-navy', error && 'text-error')}>
        {label}
      </span>
    </label>
  );
});
