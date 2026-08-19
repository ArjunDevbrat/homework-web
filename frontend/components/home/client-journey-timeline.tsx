'use client';

import { useState } from 'react';

import { Section } from '@/components/layout/section';
import { getIcon } from '@/components/ui/icon-registry';
import { SectionHeading } from '@/components/ui/section-heading';
import { clientJourney } from '@/lib/data';
import { cn } from '@/lib/utils';

/** Interactive horizontal timeline for "A Day Inside HOMEWORK". */
export const ClientJourneyTimeline = () => {
  const [active, setActive] = useState(0);
  const activeStep = clientJourney[active];
  const ActiveIcon = getIcon(activeStep.icon);

  return (
    <Section testId="home-client-journey" tone="surface">
      <SectionHeading
        eyebrow="A day inside HOMEWORK"
        subtitle="Tap any moment to see how a typical coaching day unfolds — from the morning class to the Sunday celebration."
        title="A day in the life of a HOMEWORK client"
      />

      <div className="mt-12">
        <div className="relative">
          <div aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-px bg-hairline md:block" />
          <ol
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-7"
            data-testid="client-journey-rail"
          >
            {clientJourney.map((step, index) => {
              const isActive = index === active;
              const Icon = getIcon(step.icon);

              return (
                <li key={step.step}>
                  <button
                    aria-current={isActive ? 'step' : undefined}
                    className="group flex w-full flex-col items-center text-center focus-visible:outline-none"
                    data-testid={`client-journey-node-${step.step}`}
                    onClick={() => setActive(index)}
                    type="button"
                  >
                    <span
                      className={cn(
                        'relative grid h-10 w-10 place-items-center rounded-full border transition-colors duration-300',
                        isActive
                          ? 'border-accent bg-accent text-white'
                          : 'border-hairline bg-canvas text-accent group-hover:border-accent',
                      )}
                    >
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span
                      className={cn(
                        'mt-2 text-xs font-semibold',
                        isActive ? 'text-slateink' : 'text-slateink-soft',
                      )}
                    >
                      {step.timeLabel}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          className="mt-8 flex items-start gap-4 rounded-3xl border border-hairline bg-canvas p-6 shadow-card"
          data-testid="client-journey-detail"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
            <ActiveIcon aria-hidden="true" className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {activeStep.timeLabel}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slateink">{activeStep.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slateink-muted">{activeStep.description}</p>
          </div>
        </div>
      </div>
    </Section>
  );
};
