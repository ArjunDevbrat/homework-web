'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

import type { FAQItem } from '@/types';

type AccordionProps = {
  readonly items: readonly FAQItem[];
  readonly testIdPrefix: string;
};

export const Accordion = ({ items, testIdPrefix }: AccordionProps) => (
  <AccordionPrimitive.Root
    className="divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface shadow-card"
    collapsible
    type="single"
  >
    {items.map((item, index) => (
      <AccordionPrimitive.Item key={item.id} value={item.id}>
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger
            className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring sm:px-6"
            data-testid={`${testIdPrefix}-trigger-${index}`}
          >
            <span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slateink-soft">
                {item.category}
              </span>
              <span className="mt-1.5 block text-base font-medium text-slateink">{item.question}</span>
            </span>
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-hairline bg-surface-muted text-accent transition-transform duration-300 ease-smooth group-data-[state=open]:rotate-45">
              <Plus aria-hidden="true" className="h-4 w-4" />
            </span>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content
          className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
          data-testid={`${testIdPrefix}-content-${index}`}
        >
          <p className="px-5 pb-6 text-sm leading-relaxed text-slateink-muted sm:px-6">{item.answer}</p>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    ))}
  </AccordionPrimitive.Root>
);
