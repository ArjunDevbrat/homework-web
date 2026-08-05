import { CtaBand } from '@/components/layout/cta-band';
import { PageHero } from '@/components/layout/page-hero';
import { ResourcesGrid } from '@/components/resources/resources-grid';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Free Resources',
  description:
    'Free nutrition and training resources from Coach Samrat Aryan — the Indian Protein Guide, fat loss starter checklist, home workout library, PCOS plate framework and more.',
  path: '/free-resources',
  keywords: ['free Indian protein guide', 'fat loss checklist', 'home workout library', 'PCOS diet framework'],
});

export default function FreeResourcesPage() {
  return (
    <>
      <PageHero
        description="No email gate, no upsell, no 'download now' funnel. These are the same frameworks paying clients receive in week one — published openly because most people only need a starting point."
        eyebrow="Free resources"
        testId="resources-hero"
        title="Start tonight, for free"
      />
      <ResourcesGrid />
      <CtaBand
        body="If you have used these for a few weeks and want the version tailored to your body, schedule and reports, that is what coaching is for."
        testId="resources-cta-band"
        title="Outgrown the free stuff?"
      />
    </>
  );
}
