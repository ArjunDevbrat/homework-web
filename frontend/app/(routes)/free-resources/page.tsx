import { CtaBand } from '@/components/layout/cta-band';
import { PageHero } from '@/components/layout/page-hero';
import { ResourcesGrid } from '@/components/resources/resources-grid';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Free Resources',
  description:
    'Eight free guides from Coach Samrat Aryan — the Healthy Plate Concept, Fat Loss, Muscle Building, PCOS Diet, Pregnancy & Lactation, Gym Goers, Diabetes Diet and a High Protein Foods list.',
  path: '/free-resources',
  keywords: [
    'free healthy plate guide',
    'PCOS diet guide',
    'diabetes diet guide',
    'high protein Indian foods list',
  ],
});

export default function FreeResourcesPage() {
  return (
    <>
      <PageHero
        description="No email gate, no upsell, no download funnel. These are the same eight frameworks paying clients receive in week one — published openly because most people only need a starting point."
        eyebrow="Free resources"
        testId="resources-hero"
        title="Eight guides you can start tonight"
      />
      <ResourcesGrid />
      <CtaBand
        body="If you have used these for a few weeks and want the version tailored to your body, schedule and reports, that is what coaching is for."
        testId="resources-cta-band"
        title="Outgrown the free guides?"
      />
    </>
  );
}
