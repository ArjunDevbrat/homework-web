import { Section } from '@/components/layout/section';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { whyChooseUsFeatures } from '@/lib/data';

export const WhyChooseUs = () => (
  <Section testId="home-why-choose-us" tone="surface">
    <SectionHeading
      align="center"
      eyebrow="Why choose HOMEWORK"
      subtitle="Nine reasons people stay, transform, and then coach themselves long after the program ends."
      title="Built around your life, backed by evidence"
    />

    <RevealList className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {whyChooseUsFeatures.map((feature) => {
        const Icon = getIcon(feature.icon);

        return (
          <RevealItem key={feature.title}>
            <article
              className="group flex h-full gap-4 rounded-2xl border border-hairline bg-canvas p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover"
              data-testid={`why-choose-${feature.icon}`}
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-base font-semibold text-slateink">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slateink-muted">{feature.description}</p>
              </div>
            </article>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
