import { CtaBand } from '@/components/layout/cta-band';
import { PageHero } from '@/components/layout/page-hero';
import { ResultsDisclaimer } from '@/components/testimonials/results-disclaimer';
import { TransformationsGrid } from '@/components/testimonials/transformations-grid';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Client Transformations',
  description:
    'Documented HOMEWORK client case studies — fat loss, lean muscle gain, PCOS cycle regularity and HbA1c reduction, with the real-world constraints each client worked around.',
  path: '/transformations',
  keywords: ['client transformations', 'PCOS transformation', 'HbA1c reduction coaching', 'fat loss results'],
});

export default function TransformationsPage() {
  return (
    <>
      <PageHero
        description="No 30-day miracle photos. Each case study below lists the timeline, the metric that mattered most to that client, and the constraint we had to design around — travel, shift work, no gym access or medication."
        eyebrow="Transformations"
        testId="transformations-hero"
        title="Results that held up after coaching ended"
      />
      <TransformationsGrid />
      <ResultsDisclaimer />
      <CtaBand
        body="Every case study above started with a 20-minute call and an honest conversation about what was realistic."
        testId="transformations-cta-band"
        title="Your version of this starts with one call"
      />
    </>
  );
}
