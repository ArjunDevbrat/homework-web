import { Section } from '@/components/layout/section';
import { TransformationCard } from '@/components/testimonials/transformation-card';
import { ButtonLink } from '@/components/ui/button';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { transformations } from '@/lib/data';

export const TransformationsPreview = () => (
  <Section testId="home-transformations-preview">
    <SectionHeading
      action={
        <ButtonLink data-testid="home-transformations-view-all" href="/transformations" variant="secondary">
          Read all case studies
        </ButtonLink>
      }
      eyebrow="Client outcomes"
      subtitle="Documented, consented case studies with the numbers that actually mattered to each client."
      title="Progress that survived real life"
    />

    <RevealList className="mt-12 grid gap-5 lg:grid-cols-2">
      {transformations.slice(0, 2).map((transformation) => (
        <RevealItem className="h-full" key={transformation.slug}>
          <TransformationCard transformation={transformation} />
        </RevealItem>
      ))}
    </RevealList>

    <p className="mt-6 text-xs leading-relaxed text-slateink-soft">
      Case studies are shared with written client consent. Names are shortened and results vary with
      adherence, sleep, stress and medical history.
    </p>
  </Section>
);
