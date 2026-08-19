import { Section } from '@/components/layout/section';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { workflowSteps } from '@/lib/data';

export const HowItWorks = () => (
  <Section testId="home-how-it-works" tone="surface">
    <SectionHeading
      eyebrow="How it works"
      subtitle="A clear, step-by-step path from your first call to a lasting transformation — no guesswork, no crash diets, no gym dependency."
      title="From first call to lasting transformation"
    />

    <RevealList className="mt-14 grid gap-6 md:grid-cols-5">
      {workflowSteps.map((step, index) => {
        const Icon = getIcon(step.icon);
        const isLast = index === workflowSteps.length - 1;

        return (
          <RevealItem className="relative" key={step.step}>
            {!isLast ? (
              <span
                aria-hidden="true"
                className="absolute right-[-1.75rem] top-8 hidden h-px w-14 bg-gradient-to-r from-accent/60 to-hairline md:block lg:right-[-1.5rem]"
              />
            ) : null}
            <div
              className="relative flex h-full flex-col items-center rounded-2xl border border-hairline bg-canvas p-6 text-center shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              data-testid={`how-it-works-step-${step.step}`}
            >
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent-soft text-accent">
                <Icon aria-hidden="true" className="h-7 w-7" />
              </span>
              <span className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slateink-soft">
                Step {step.step}
              </span>
              <h3 className="mt-1 text-base font-semibold text-slateink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slateink-muted">{step.description}</p>
            </div>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
