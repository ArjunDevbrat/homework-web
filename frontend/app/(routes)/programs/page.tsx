import { CtaBand } from '@/components/layout/cta-band';
import { PageHero } from '@/components/layout/page-hero';
import { FaqSection } from '@/components/home/faq-section';
import { ProcessSteps } from '@/components/programs/process-steps';
import { ProgramsGrid } from '@/components/programs/programs-grid';
import { WhatsIncluded } from '@/components/programs/whats-included';
import { coachingProcess, programFaqs } from '@/lib/data';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Coaching Programs',
  description:
    'Compare the Foundation 12, Strength & Recomp and Clinical Care coaching tracks — durations, inclusions, pricing and who each program is built for.',
  path: '/programs',
  keywords: ['online coaching programs', 'PCOS coaching program', 'strength recomposition coaching'],
});

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        description="Every track uses the same evidence-based method. What changes is pacing, medical caution and how much strength work is programmed. All prices are transparent — nothing is revealed only on a call."
        eyebrow="Programs"
        testId="programs-hero"
        title="Coaching built around your week, not an ideal one"
      />
      <ProgramsGrid />
      <WhatsIncluded />
      <ProcessSteps steps={coachingProcess} testId="programs-process" />
      <FaqSection
        eyebrow="Program questions"
        items={programFaqs}
        subtitle="Pricing, switching tracks, travel and supplements — answered before you book."
        testId="programs-faq"
        title="Before you commit"
        tone="surface"
      />
      <CtaBand
        body="Not sure which track fits? Book the free consultation and we will pick one together — or I will tell you if you do not need coaching at all yet."
        testId="programs-cta-band"
        title="Still deciding between tracks?"
      />
    </>
  );
}
