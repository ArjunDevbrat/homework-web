import { Section } from '@/components/layout/section';
import { Accordion } from '@/components/ui/accordion';
import { SectionHeading } from '@/components/ui/section-heading';
import type { FaqItem } from '@/types';

type FaqSectionProps = {
  readonly items: readonly FaqItem[];
  readonly eyebrow?: string;
  readonly title?: string;
  readonly subtitle?: string;
  readonly testId?: string;
  readonly tone?: 'canvas' | 'surface';
};

export const FaqSection = ({
  items,
  eyebrow = 'Questions',
  title = 'The things everyone asks first',
  subtitle = 'Straight answers, no hedging. If your question is not here, email the coach directly.',
  testId = 'faq-section',
  tone = 'canvas',
}: FaqSectionProps) => (
  <Section testId={testId} tone={tone}>
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <SectionHeading eyebrow={eyebrow} subtitle={subtitle} title={title} />
      </div>
      <div className="lg:col-span-7">
        <Accordion items={items} testIdPrefix={testId} />
      </div>
    </div>
  </Section>
);
