import { Section } from '@/components/layout/section';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { coachingPrinciples } from '@/lib/data';

export const CoachingPhilosophy = () => (
  <Section testId="about-philosophy">
    <SectionHeading
      eyebrow="Coaching philosophy"
      subtitle="Three rules that decide every recommendation you will ever get from me."
      title="How I decide what to tell you"
    />

    <RevealList className="mt-12 grid gap-5 md:grid-cols-3">
      {coachingPrinciples.map((principle) => {
        const Icon = getIcon(principle.icon);

        return (
          <RevealItem className="h-full" key={principle.title}>
            <div
              className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 shadow-card"
              data-testid="about-principle-card"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-slateink">{principle.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slateink-muted">{principle.description}</p>
            </div>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
