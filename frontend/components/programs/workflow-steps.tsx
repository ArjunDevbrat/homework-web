import { Section } from '@/components/layout/section';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import type { WorkflowStep } from '@/types';

type WorkflowStepsProps = {
  readonly steps: readonly WorkflowStep[];
  readonly eyebrow?: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly testId?: string;
  readonly tone?: 'canvas' | 'surface';
};

export const WorkflowSteps = ({
  steps,
  eyebrow = 'How it works',
  title = 'From first call to first result',
  subtitle = 'A deliberately small start. You leave every week knowing exactly what to do next.',
  testId = 'workflow-steps',
  tone = 'canvas',
}: WorkflowStepsProps) => (
  <Section testId={testId} tone={tone}>
    <SectionHeading eyebrow={eyebrow} subtitle={subtitle} title={title} />

    <RevealList className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step) => {
        const Icon = getIcon(step.icon);

        return (
          <RevealItem className="h-full" key={step.step}>
            <div
              className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 shadow-card"
              data-testid={`${testId}-item-${step.step}`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-sm font-bold text-slateink">
                  {step.step}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-slateink">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slateink-muted">{step.description}</p>
            </div>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
