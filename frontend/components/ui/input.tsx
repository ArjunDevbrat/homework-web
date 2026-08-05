import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const fieldBase =
  'w-full rounded-xl border border-hairline bg-surface text-sm text-slateink placeholder:text-slateink-soft transition-[border-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent-ring disabled:opacity-60';

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={cn(fieldBase, 'h-11 px-3.5', className)} {...props} />
);

export const Textarea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={cn(fieldBase, 'min-h-[132px] resize-y px-3.5 py-3', className)} {...props} />
);

export const Select = ({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={cn(
      fieldBase,
      "h-11 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235A6B7B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:18px_18px] bg-[right_0.85rem_center] bg-no-repeat pl-3.5 pr-10",
      className,
    )}
    {...props}
  />
);
