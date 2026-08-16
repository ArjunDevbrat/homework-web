import { Section } from '@/components/layout/section';
import { getIcon } from '@/components/ui/icon-registry';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { conditionsTreated } from '@/lib/data';
import type { ConditionCategory } from '@/types';

const categoryOrder: readonly ConditionCategory[] = [
  'Body composition',
  'Metabolic',
  'Hormonal',
  'Cardiovascular',
  'Lifestyle',
];

export const ConditionsTreated = () => (
  <Section testId="home-conditions-treated" tone="surface">
    <SectionHeading
      eyebrow={`${conditionsTreated.length} conditions treated`}
      subtitle="From body composition goals to physician-coordinated clinical support. If your condition is on this list, there is an established protocol for it."
      title="Conditions coached at HOMEWORK"
    />

    <div className="mt-12 flex flex-col gap-8">
      {categoryOrder.map((category, categoryIndex) => {
        const conditions = conditionsTreated.filter((condition) => condition.category === category);

        return (
          <Reveal delay={categoryIndex * 0.05} key={category}>
            <div
              className="rounded-2xl border border-hairline bg-surface-muted p-6"
              data-testid={`conditions-group-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slateink-soft">
                  {category}
                </h3>
                <span className="text-xs font-semibold text-slateink-soft">{conditions.length}</span>
              </div>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {conditions.map((condition) => {
                  const Icon = getIcon(condition.icon);

                  return (
                    <li
                      className="flex gap-3 rounded-xl border border-hairline bg-surface p-4 transition-shadow duration-300 ease-smooth hover:shadow-card"
                      data-testid={`condition-${condition.slug}`}
                      key={condition.slug}
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slateink">{condition.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slateink-soft">{condition.summary}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>

    <p className="mt-8 text-xs leading-relaxed text-slateink-soft">
      Coaching is nutrition and lifestyle education that runs alongside medical care. Medication is never
      started, stopped or altered by HOMEWORK.
    </p>
  </Section>
);
