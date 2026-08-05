import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  readonly interactive?: boolean;
};

export const Card = ({ interactive = false, className, ...props }: CardProps) => (
  <div
    className={cn(
      'rounded-2xl border border-hairline bg-surface shadow-card',
      interactive &&
        'transition-[box-shadow,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-card-hover',
      className,
    )}
    {...props}
  />
);

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pb-4', className)} {...props} />
);

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-lg font-semibold tracking-tight text-slateink', className)} {...props} />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('px-6 pb-6 text-sm leading-relaxed text-slateink-muted', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto border-t border-hairline px-6 py-4', className)} {...props} />
);
