import { Accordion } from '@/components/ui/accordion';
import { Section } from '@/components/layout/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { faqs } from '@/lib/data';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export const FAQ = () => (
  <Section testId="home-faq">
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      type="application/ld+json"
    />
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
