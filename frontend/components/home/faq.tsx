import { Accordion } from '@/components/ui/accordion';
import { Section } from '@/components/layout/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { faqs } from '@/lib/data';

export const FAQ = () => (
  <Section testId="home-faq">
    <SectionHeading
      align="center"
      eyebrow="Questions & answers"
      subtitle="Everything people ask before starting — from complete beginners to those managing PCOS, thyroid or diabetes."
      title="Frequently asked questions"
    />
    <div className="mx-auto mt-10 max-w-3xl">
      <Accordion items={faqs} testIdPrefix="home-faq" />
    </div>
  </Section>
);
