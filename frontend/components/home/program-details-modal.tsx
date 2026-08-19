'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Check, X } from 'lucide-react';

import { buttonClasses } from '@/components/ui/button';
import type { ProgramPackage } from '@/types';

type ProgramDetailsModalProps = {
  readonly program: ProgramPackage;
};

/** Program details modal. Shows what is included and the priceLabel copy — no invented pricing. */
export const ProgramDetailsModal = ({ program }: ProgramDetailsModalProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button
        className={buttonClasses('secondary', 'md', 'w-full')}
        data-testid={`program-details-trigger-${program.slug}`}
        type="button"
      >
        View details
      </button>
    </Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-slateink/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
      <Dialog.Content
        className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-hairline bg-surface p-6 shadow-card-hover data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in sm:p-7"
        data-testid={`program-details-modal-${program.slug}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Dialog.Title className="text-lg font-semibold text-slateink">{program.name}</Dialog.Title>
            <p className="mt-1 text-sm text-slateink-muted">{program.tagline}</p>
          </div>
          <Dialog.Close
            aria-label="Close details"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-hairline bg-surface text-slateink transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </Dialog.Close>
        </div>

        <Dialog.Description className="mt-4 text-sm leading-relaxed text-slateink-muted">
          {program.summary}
        </Dialog.Description>

        <dl className="mt-5 grid gap-3 rounded-2xl border border-hairline bg-surface-muted p-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slateink-soft">Cadence</dt>
            <dd className="text-right font-medium text-slateink">{program.cadence}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slateink-soft">Best for</dt>
            <dd className="text-right font-medium text-slateink">{program.bestFor}</dd>
          </div>
          {program.freeTrialDays ? (
            <div className="flex justify-between gap-4">
              <dt className="text-slateink-soft">Free trial</dt>
              <dd className="text-right font-medium text-slateink">{program.freeTrialDays} days</dd>
            </div>
          ) : null}
        </dl>

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

        <div className="mt-6 rounded-2xl border border-hairline bg-surface-muted p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slateink-soft">Pricing</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slateink">{program.priceLabel}</p>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
