import { Section } from '@/components/layout/section';
import { ResourceCard } from '@/components/resources/resource-card';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { resources } from '@/lib/data';

export const ResourcesGrid = () => (
  <Section bordered={false} testId="resources-grid">
    <SectionHeading
      eyebrow="Free library"
      subtitle="These are the exact frameworks coaching clients receive in week one. No email gate, no upsell."
      title="Guides, checklists and calculators"
    />

    <RevealList className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <RevealItem className="h-full" key={resource.slug}>
          <ResourceCard resource={resource} />
        </RevealItem>
      ))}
    </RevealList>
  </Section>
);
