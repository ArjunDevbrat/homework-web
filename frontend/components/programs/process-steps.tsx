import { Section } from '@/components/layout/section';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ProcessStep } from '@/types';

type ProcessStepsProps = {
  readonly steps: readonly ProcessStep[];
  readonly eyebrow?: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly testId?: string;
  readonly tone?: 'canvas' | 'surface';
};

export const ProcessSteps = ({
  steps,
  eyebrow = 'How it works',
  title = 'From first call to first result',
  subtitle = 'A deliberately small start. You leave every week knowing exactly what to do next.',
  testId = 'process-steps',
  tone = 'canvas',
}: ProcessStepsProps) => (
  <Section testId={testId} tone={tone}>
    <SectionHeading eyebrow={eyebrow} subtitle={subtitle} title={title} />

    <RevealList className="mt-12 grid gap-5 md:grid-cols-3">
      {steps.map((step) => (
        <RevealItem className="h-full" key={step.step}>
          <div
            className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 shadow-card"
            data-testid={`${testId}-item-${step.step}`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-sm font-bold text-slateink">
              {step.step}
            </span>
            <h3 className="mt-5 text-base font-semibold text-slateink">{step.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slateink-muted">{step.description}</p>
          </div>
        </RevealItem>
      ))}
    </RevealList>
  </Section>
);
