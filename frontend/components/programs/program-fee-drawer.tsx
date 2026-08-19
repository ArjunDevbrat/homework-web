'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Check, X } from 'lucide-react';

import { buttonClasses } from '@/components/ui/button';
import type { ProgramPackage } from '@/types';

type ProgramFeeDrawerProps = {
  readonly program: ProgramPackage;
};

/** Right-side fee-structure drawer for a program. No invented pricing — shows priceLabel + inclusions. */
export const ProgramFeeDrawer = ({ program }: ProgramFeeDrawerProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button
        className={buttonClasses('secondary', 'md', 'w-full')}
        data-testid={`program-fee-trigger-${program.slug}`}
        type="button"
      >
        See fees & details
      </button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-slateink/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
      <Dialog.Content
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-y-auto border-l border-hairline bg-surface shadow-card-hover data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
        data-testid={`program-fee-drawer-${program.slug}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-hairline p-6">
          <div>
            <Dialog.Title className="text-lg font-semibold text-slateink">{program.name}</Dialog.Title>
            <p className="mt-1 text-sm text-slateink-muted">{program.tagline}</p>
          </div>
          <Dialog.Close
            aria-label="Close drawer"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-hairline bg-surface text-slateink transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </Dialog.Close>
        </div>

        <div className="flex-1 p-6">
          <Dialog.Description className="text-sm leading-relaxed text-slateink-muted">
            {program.summary}
          </Dialog.Description>

          <div className="mt-5 rounded-2xl border border-hairline bg-surface-muted p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slateink-soft">Fee structure</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slateink">{program.priceLabel}</p>
            {program.freeTrialDays ? (
              <p className="mt-2 text-sm font-medium text-accent">
                Starts with a {program.freeTrialDays}-day free trial
              </p>
            ) : null}
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slateink-soft">
            What is included
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {program.deliverables.map((item) => (
              <li className="flex items-start gap-3 text-sm leading-relaxed text-slateink-muted" key={item}>
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 rounded-2xl border border-hairline bg-surface-muted p-4 text-xs leading-relaxed text-slateink-soft">
            Best for: {program.bestFor}. Cadence: {program.cadence}.
          </p>
        </div>

        <div className="border-t border-hairline p-6">
          <a className={buttonClasses('primary', 'lg', 'w-full')} href="/contact">
            Book a free consultation
          </a>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
