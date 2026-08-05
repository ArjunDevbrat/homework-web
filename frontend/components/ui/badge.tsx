import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export type BadgeVariant = 'metric' | 'neutral' | 'outline';

const variants: Record<BadgeVariant, string> = {
  metric: 'border-transparent bg-accent-soft text-slateink',
  neutral: 'border-hairline bg-surface text-slateink-muted',
  outline: 'border-hairline bg-surface-muted text-slateink',
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  readonly variant?: BadgeVariant;
};

export const Badge = ({ variant = 'neutral', className, ...props }: BadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
      variants[variant],
      className,
    )}
    {...props}
  />
);
