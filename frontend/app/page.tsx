import { CtaBand } from '@/components/layout/cta-band';
import { ClientJourney } from '@/components/home/client-journey';
import { ConditionsTreated } from '@/components/home/conditions-treated';
import { FaqSection } from '@/components/home/faq-section';
import { FocusAreas } from '@/components/home/focus-areas';
import { Hero } from '@/components/home/hero';
import { ProgramsPreview } from '@/components/home/programs-preview';
import { ResourcesPreview } from '@/components/home/resources-preview';
import { TransformationsPreview } from '@/components/home/transformations-preview';
import { TrustStrip } from '@/components/home/trust-strip';
import { WorkflowSteps } from '@/components/programs/workflow-steps';
import { homeFaqs, workflowSteps } from '@/lib/data';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Evidence-Based Nutrition & Fitness Coaching',
  description:
    'HOMEWORK by Coach Samrat Aryan — 1500+ clients counselled. Sustainable fat loss, muscle building, PCOS, thyroid and diabetes management, coached from home around the food your family already cooks.',
  path: '/',
  keywords: [
    'online nutrition coach India',
    'fat loss coaching',
    'PCOS diet coach',
    'diabetes lifestyle coach',
    'home workout coaching',
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FocusAreas />
      <ConditionsTreated />
      <ProgramsPreview />
      <WorkflowSteps steps={workflowSteps} />
      <ClientJourney />
      <TransformationsPreview />
      <ResourcesPreview />
      <FaqSection items={homeFaqs} testId="home-faq" />
      <CtaBand />
    </>
  );
}
