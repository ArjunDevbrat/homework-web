import { CtaBand } from '@/components/layout/cta-band';
import { PageHero } from '@/components/layout/page-hero';
import { FaqSection } from '@/components/home/faq-section';
import { ProgramsGrid } from '@/components/programs/programs-grid';
import { WhatsIncluded } from '@/components/programs/whats-included';
import { WorkflowSteps } from '@/components/programs/workflow-steps';
import { programFaqs, workflowSteps } from '@/lib/data';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Coaching Programs',
  description:
    'Compare the three HOMEWORK coaching programs — Holistic Health (daily live classes + weekly diet plans), Diet Plans (weekly personalised nutrition) and Exercise Only (daily live classes with a 3-day free trial).',
  path: '/programs',
  keywords: [
    'online coaching programs India',
    'daily live exercise classes',
    'weekly personalised diet plan',
    'PCOS coaching program',
  ],
});

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        description="Every program uses the same evidence-based method. What changes is how much support you take: training, nutrition, or both. The Exercise Only track begins with a 3-day free trial so you can see a live class before deciding."
        eyebrow="Programs"
        testId="programs-hero"
        title="Coaching built around your week, not an ideal one"
      />
      <ProgramsGrid />
      <WhatsIncluded />
      <WorkflowSteps steps={workflowSteps} testId="programs-workflow" />
      <FaqSection
        eyebrow="Program questions"
        items={programFaqs}
        subtitle="Diet charts, vegetarian protein, travel weeks and how long coaching lasts — answered before you book."
        testId="programs-faq"
        title="Before you commit"
        tone="surface"
      />
      <CtaBand
        body="Not sure which program fits? Book the free consultation and we will pick one together — or I will tell you honestly if you do not need coaching at all yet."
        testId="programs-cta-band"
        title="Still deciding between programs?"
      />
    </>
  );
}
