import { CtaBand } from '@/components/layout/cta-band';
import { FaqSection } from '@/components/home/faq-section';
import { Hero } from '@/components/home/hero';
import { ProgramsPreview } from '@/components/home/programs-preview';
import { ResourcesPreview } from '@/components/home/resources-preview';
import { SpecialtiesGrid } from '@/components/home/specialties-grid';
import { TransformationsPreview } from '@/components/home/transformations-preview';
import { TrustStrip } from '@/components/home/trust-strip';
import { ProcessSteps } from '@/components/programs/process-steps';
import { buildPageMetadata } from '@/lib/metadata';
import { coachingProcess, homeFaqs } from '@/lib/data';

export const metadata = buildPageMetadata({
  title: 'Evidence-Based Nutrition & Fitness Coaching',
  description:
    'HOMEWORK by Coach Samrat Aryan — sustainable fat loss, muscle building, PCOS and diabetes management built around the food already cooked in your kitchen. Book a free consultation.',
  path: '/',
  keywords: ['online nutrition coach', 'fat loss coaching India', 'PCOS coach', 'strength coach'],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <SpecialtiesGrid />
      <ProgramsPreview />
      <ProcessSteps steps={coachingProcess} />
      <TransformationsPreview />
      <ResourcesPreview />
      <FaqSection items={homeFaqs} testId="home-faq" />
      <CtaBand />
    </>
  );
}
