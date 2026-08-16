import { Section } from '@/components/layout/section';
import { TestimonialCard } from '@/components/testimonials/testimonial-card';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { testimonials } from '@/lib/data';

export const TransformationsGrid = () => (
  <Section bordered={false} testId="transformations-grid">
    <SectionHeading
      eyebrow="Case studies"
      subtitle="Each story lists the constraint we had to work around — travel, no gym access, medication, shift work."
      title="Documented client outcomes"
    />

    <RevealList className="mt-12 grid gap-5 lg:grid-cols-2">
      {testimonials.map((testimonial) => (
        <RevealItem className="h-full" key={testimonial.slug}>
          <TestimonialCard testimonial={testimonial} />
        </RevealItem>
      ))}
    </RevealList>
  </Section>
);
