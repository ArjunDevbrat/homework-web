import { Section } from '@/components/layout/section';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { conditionsTreated } from '@/lib/data';

export const ConditionsGrid = () => (
  <Section testId="home-conditions-grid">
    <SectionHeading
      eyebrow="Conditions we coach"
      subtitle="From body composition to clinical lifestyle conditions — every plan is built around your kitchen, your schedule and your medical reports."
      title="16 goals and conditions, one evidence-based system"
    />

    <RevealList className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {conditionsTreated.map((condition) => {
        const Icon = getIcon(condition.icon);

        return (
          <RevealItem key={condition.slug}>
            <article
              className="group h-full rounded-2xl border border-hairline bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover"
              data-testid={`condition-card-${condition.slug}`}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slateink">{condition.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                {condition.category}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slateink-muted">{condition.summary}</p>
            </article>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
