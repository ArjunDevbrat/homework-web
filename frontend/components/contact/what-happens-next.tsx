import { consultationSteps } from '@/lib/data';

export const WhatHappensNext = () => (
  <div
    className="rounded-3xl border border-hairline bg-surface p-6 shadow-card"
    data-testid="contact-what-happens-next"
  >
    <h2 className="text-base font-semibold text-slateink">What happens next</h2>

    <ol className="mt-5 flex flex-col gap-5">
      {consultationSteps.map((step) => (
        <li className="flex gap-4" key={step.step}>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-accent text-xs font-bold text-slateink">
            {step.step}
          </span>
          <div>
            <p className="text-sm font-semibold text-slateink">{step.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-slateink-muted">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
);
