import * as React from 'react';
import { cn } from './cn';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, hint, error, id, className, ...rest },
  ref,
) {
  const reactId = React.useId();
  const fid = id ?? `f-${reactId.replace(/:/g, '')}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fid} className="text-[15px] font-medium text-navy">
        {label}
      </label>
      <input
        id={fid}
        ref={ref}
        className={cn(
          'min-h-[48px] h-12 px-4 rounded-elo border bg-card text-navy placeholder:text-slate/70',
          'border-borderLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-softWhite focus-visible:ring-premiumBlue',
          error && 'border-error/60 ring-1 ring-error/20',
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={hint || error ? `${fid}-desc` : undefined}
        {...rest}
      />
      {(hint || error) && (
        <p
          id={`${fid}-desc`}
          className={cn('text-sm', error ? 'text-error' : 'text-slate')}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
});
