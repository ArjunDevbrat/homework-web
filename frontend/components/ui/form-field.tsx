import type { LabelHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

export const Label = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn('block text-sm font-medium text-slateink', className)} {...props} />
);

type FormFieldProps = {
  readonly htmlFor: string;
  readonly label: string;
  readonly hint?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly children: ReactNode;
};

export const FormField = ({ htmlFor, label, hint, error, required, children }: FormFieldProps) => (
  <div className="flex flex-col gap-2">
    <Label htmlFor={htmlFor}>
      {label}
      {required ? (
        <span aria-hidden="true" className="ml-1 text-slateink-soft">
          *
        </span>
      ) : null}
    </Label>
    {children}
    {hint && !error ? <p className="text-xs text-slateink-soft">{hint}</p> : null}
    {error ? (
      <p className="text-xs font-medium text-[#c2413a]" id={`${htmlFor}-error`} role="alert">
        {error}
      </p>
    ) : null}
  </div>
);
