import { Section } from '@/components/layout/section';
import { ResourceCard } from '@/components/resources/resource-card';
import { ButtonLink } from '@/components/ui/button';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { resources } from '@/lib/data';

export const ResourcesPreview = () => (
  <Section testId="home-resources-preview" tone="surface">
    <SectionHeading
      action={
        <ButtonLink data-testid="home-resources-view-all" href="/free-resources" variant="secondary">
          Browse free resources
        </ButtonLink>
      }
      eyebrow="Free to use"
      subtitle="Start with the same frameworks paying clients get in week one — no email wall, no upsell."
      title="Free tools you can use tonight"
    />

    <RevealList className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {resources.slice(0, 3).map((resource) => (
        <RevealItem className="h-full" key={resource.slug}>
          <ResourceCard resource={resource} />
        </RevealItem>
      ))}
    </RevealList>
  </Section>
);
