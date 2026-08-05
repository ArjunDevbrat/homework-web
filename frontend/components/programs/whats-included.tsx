import { Section } from '@/components/layout/section';
import { CheckList } from '@/components/ui/check-list';
import { SectionHeading } from '@/components/ui/section-heading';
import { programInclusions } from '@/lib/data';

export const WhatsIncluded = () => (
  <Section testId="programs-whats-included" tone="surface">
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <SectionHeading
          eyebrow="Included in every program"
          subtitle="Regardless of the track you pick, these are non-negotiable parts of coaching at HOMEWORK."
          title="What you always get"
        />
      </div>
      <div className="lg:col-span-7">
        <div className="rounded-2xl border border-hairline bg-surface-muted p-6 sm:p-8">
          <CheckList items={programInclusions} testId="programs-inclusions-list" />
        </div>
      </div>
    </div>
  </Section>
);
