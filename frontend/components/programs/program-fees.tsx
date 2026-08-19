import { ProgramFeeDrawer } from '@/components/programs/program-fee-drawer';
import { Section } from '@/components/layout/section';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { programs } from '@/lib/data';

export const ProgramFees = () => (
  <Section testId="programs-fees" tone="surface">
    <SectionHeading
      align="center"
      eyebrow="Fees & details"
      subtitle="Open any program to see its full fee structure and everything included. Exact pricing is confirmed on your free consultation call."
      title="Fee structure at a glance"
    />

    <RevealList className="mt-12 grid gap-6 lg:grid-cols-3">
      {programs.map((program) => {
        const Icon = getIcon(program.icon);

        return (
          <RevealItem key={program.slug}>
            <article
              className="flex h-full flex-col rounded-3xl border border-hairline bg-canvas p-6 shadow-card"
              data-testid={`program-fee-card-${program.slug}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-slateink">{program.name}</h3>
              <p className="mt-3 rounded-2xl bg-surface px-4 py-3 text-sm leading-relaxed text-slateink">
                {program.priceLabel}
              </p>
              <div className="mt-auto pt-6">
                <ProgramFeeDrawer program={program} />
              </div>
            </article>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
