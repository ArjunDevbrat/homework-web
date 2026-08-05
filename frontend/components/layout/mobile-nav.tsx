'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ButtonLink } from '@/components/ui/button';
import { siteConfig } from '@/lib/data';
import { cn, isActiveRoute } from '@/lib/utils';
import type { NavItem } from '@/types';

type MobileNavProps = {
  readonly items: readonly NavItem[];
};

export const MobileNav = ({ items }: MobileNavProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger
        aria-label="Open navigation menu"
        className="grid h-11 w-11 place-items-center rounded-xl border border-hairline bg-surface text-slateink transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring lg:hidden"
        data-testid="site-header-mobile-menu-button"
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slateink/25 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-hairline bg-surface shadow-card-hover data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
          data-testid="mobile-nav-panel"
        >
          <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
            <Dialog.Title className="text-sm font-semibold uppercase tracking-[0.18em] text-slateink">
              {siteConfig.name}
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close navigation menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-hairline bg-surface text-slateink transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
              data-testid="mobile-nav-close-button"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <Dialog.Description className="sr-only">
            Site navigation for the HOMEWORK coaching platform
          </Dialog.Description>

          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
            {items.map((item) => {
              const active = isActiveRoute(pathname, item.href);

              return (
                <Link
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-xl border px-4 py-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring',
                    active
                      ? 'border-hairline bg-accent-soft'
                      : 'border-transparent hover:border-hairline hover:bg-surface-muted',
                  )}
                  data-testid={`mobile-nav-link-${item.href === '/' ? 'home' : item.href.replace('/', '')}`}
                  href={item.href}
                  key={item.href}
                >
                  <span className="block text-sm font-semibold text-slateink">{item.label}</span>
                  <span className="mt-0.5 block text-xs text-slateink-soft">{item.description}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-hairline p-4">
            <ButtonLink
              className="w-full"
              data-testid="mobile-nav-book-consultation-button"
              href="/contact"
              size="lg"
            >
              Book Free Consultation
            </ButtonLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
