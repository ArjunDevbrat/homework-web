import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  readonly eyebrow?: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly align?: 'left' | 'center';
  readonly as?: 'h1' | 'h2' | 'h3';
  readonly action?: ReactNode;
  readonly className?: string;
};

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  as: Heading = 'h2',
  action,
  className,
}: SectionHeadingProps) => (
  <div
    className={cn(
      'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
      align === 'center' && 'md:flex-col md:items-center',
      className,
    )}
  >
    <div className={cn('max-w-2xl', align === 'center' && 'text-center')}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-slateink-soft">{eyebrow}</p>
      ) : null}
      <Heading className="text-display-md font-semibold text-slateink text-balance">{title}</Heading>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-slateink-muted text-pretty">{subtitle}</p>
      ) : null}
    </div>
    {action ? <div className="shrink-0">{action}</div> : null}
  </div>
);
