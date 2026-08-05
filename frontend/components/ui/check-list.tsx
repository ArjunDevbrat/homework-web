import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

type CheckListProps = {
  readonly items: readonly string[];
  readonly className?: string;
  readonly testId?: string;
};

export const CheckList = ({ items, className, testId }: CheckListProps) => (
  <ul className={cn('flex flex-col gap-3', className)} data-testid={testId}>
    {items.map((item) => (
      <li className="flex items-start gap-3 text-sm leading-relaxed text-slateink-muted" key={item}>
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
          <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
        </span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
