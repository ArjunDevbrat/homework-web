import Link from 'next/link';

import { cn } from '@/lib/utils';

type LogoProps = {
  readonly className?: string;
  readonly testId?: string;
};

export const Logo = ({ className, testId = 'site-header-logo' }: LogoProps) => (
  <Link
    aria-label="HOMEWORK — go to homepage"
    className={cn(
      'group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring',
      className,
    )}
    data-testid={testId}
    href="/"
  >
    <span
      aria-hidden="true"
      className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-sm font-bold text-slateink shadow-cta transition-colors duration-200 group-hover:bg-accent-hover group-hover:text-white"
    >
      HW
    </span>
    <span className="flex flex-col leading-none">
      <span className="font-display text-base font-bold uppercase tracking-[0.18em] text-slateink">
        Homework
      </span>
      <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slateink-soft">
        Coach Samrat Aryan
      </span>
    </span>
  </Link>
);
