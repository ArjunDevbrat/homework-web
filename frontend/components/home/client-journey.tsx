import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { clientJourney } from '@/lib/data';

export const ClientJourney = () => (
  <Section testId="home-client-journey">
    <SectionHeading
      eyebrow="A day inside HOMEWORK"
      subtitle="Coaching is not a PDF you receive once. This is what an ordinary Tuesday actually looks like for a client."
      title="Seven touchpoints, every single day"
    />

    <RevealList className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {clientJourney.map((step) => {
        const Icon = getIcon(step.icon);

        return (
          <RevealItem className="h-full" key={step.step}>
            <div
              className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-5 shadow-card transition-shadow duration-300 ease-smooth hover:shadow-card-hover"
              data-testid={`client-journey-step-${step.step}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <Badge variant="metric">{step.timeLabel}</Badge>
              </div>

              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slateink-soft">
                Step {step.step}
              </p>
              <h3 className="mt-1 text-base font-semibold text-slateink">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slateink-muted">{step.description}</p>
            </div>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
