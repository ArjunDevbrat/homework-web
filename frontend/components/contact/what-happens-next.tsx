import { getIcon } from '@/components/ui/icon-registry';
import { consultationSteps } from '@/lib/data';

export const WhatHappensNext = () => (
  <div
    className="rounded-3xl border border-hairline bg-surface p-6 shadow-card"
    data-testid="contact-what-happens-next"
  >
    <h2 className="text-base font-semibold text-slateink">What happens next</h2>

    <ol className="mt-5 flex flex-col gap-5">
      {consultationSteps.map((step) => {
        const Icon = getIcon(step.icon);

        return (
          <li className="flex gap-4" key={step.step}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <Icon aria-hidden="true" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slateink">
                {step.step}. {step.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slateink-muted">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  </div>
);
