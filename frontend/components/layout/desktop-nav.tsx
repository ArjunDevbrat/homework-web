'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn, isActiveRoute } from '@/lib/utils';
import type { NavItem } from '@/types';

type DesktopNavProps = {
  readonly items: readonly NavItem[];
};

export const DesktopNav = ({ items }: DesktopNavProps) => {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex" data-testid="site-header-nav">
      {items.map((item) => {
        const active = isActiveRoute(pathname, item.href);

        return (
          <Link
            aria-current={active ? 'page' : undefined}
            className={cn(
              'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring',
              active ? 'text-slateink' : 'text-slateink-muted hover:text-slateink',
            )}
            data-testid={`nav-link-${item.href === '/' ? 'home' : item.href.replace('/', '')}`}
            href={item.href}
            key={item.href}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-accent transition-transform duration-300 ease-smooth',
                active ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
};
