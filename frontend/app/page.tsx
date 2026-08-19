import { ConditionsGrid } from '@/components/home/conditions-grid';
import { FaqSection } from '@/components/home/faq-section';
import { Hero } from '@/components/home/hero';
import { HowItWorks } from '@/components/home/how-it-works';
import { MeetCoach } from '@/components/home/meet-coach';
import { ProgramsPreview } from '@/components/home/programs-preview';
import { ResourcesPreview } from '@/components/home/resources-preview';
import { TransformationsPreview } from '@/components/home/transformations-preview';
import { TrustMetrics } from '@/components/home/trust-metrics';
import { CtaBand } from '@/components/layout/cta-band';
import { homeFaqs } from '@/lib/data';
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
      <TrustMetrics />
      <ConditionsGrid />
      <HowItWorks />
      <MeetCoach />
      {/* Lower-half sections retained as-is for Phase 3B */}
      <ProgramsPreview />
      <TransformationsPreview />
      <ResourcesPreview />
      <FaqSection items={homeFaqs} testId="home-faq" />
      <CtaBand />
    </>
  );
}
