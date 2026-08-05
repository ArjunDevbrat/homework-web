import { Section } from '@/components/layout/section';
import { TransformationCard } from '@/components/testimonials/transformation-card';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { transformations } from '@/lib/data';

export const TransformationsGrid = () => (
  <Section bordered={false} testId="transformations-grid">
    <SectionHeading
      eyebrow="Case studies"
      subtitle="Each story lists the constraint we had to work around — travel, no gym access, medication, shift work."
      title="Documented client outcomes"
    />

    <RevealList className="mt-12 grid gap-5 lg:grid-cols-2">
      {transformations.map((transformation) => (
        <RevealItem className="h-full" key={transformation.slug}>
          <TransformationCard transformation={transformation} />
        </RevealItem>
      ))}
    </RevealList>
  </Section>
);
