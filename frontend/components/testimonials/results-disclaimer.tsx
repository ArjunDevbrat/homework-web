import { Section } from '@/components/layout/section';
import { SectionHeading } from '@/components/ui/section-heading';

export const ResultsDisclaimer = () => (
  <Section density="dense" testId="transformations-disclaimer" tone="surface">
    <SectionHeading
      eyebrow="Method &amp; disclaimer"
      subtitle="Every case study on this page is published with written client consent. Names are shortened and images are only used where explicitly permitted. Results vary with adherence, sleep, stress, medication and medical history — nothing here is a guarantee, and coaching never replaces medical treatment."
      title="How these results were achieved"
    />
  </Section>
);
