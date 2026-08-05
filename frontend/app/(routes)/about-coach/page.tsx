import { AboutHero } from '@/components/about/about-hero';
import { CoachingPhilosophy } from '@/components/about/coaching-philosophy';
import { CredentialsTimeline } from '@/components/about/credentials-timeline';
import { CtaBand } from '@/components/layout/cta-band';
import { ProcessSteps } from '@/components/programs/process-steps';
import { coachingProcess } from '@/lib/data';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'About Coach Samrat Aryan',
  description:
    'B.Sc Nutrition & Dietetics, Certified Strength & Hypertrophy Coach (HSF) and Certified Yoga Coach. Meet the coach behind HOMEWORK and the method used with every client.',
  path: '/about-coach',
  keywords: ['Coach Samrat Aryan', 'nutrition dietetics coach', 'certified strength coach India'],
});

export default function AboutCoachPage() {
  return (
    <>
      <AboutHero />
      <CredentialsTimeline />
      <CoachingPhilosophy />
      <ProcessSteps
        eyebrow="Working together"
        steps={coachingProcess}
        subtitle="The same three steps for every client, whether the goal is a first 5 kg or an HbA1c reduction."
        testId="about-process"
        title="What coaching actually looks like"
        tone="surface"
      />
      <CtaBand
        body="If the method above sounds like what you have been missing, the next step is a 20-minute call. No obligation, no sales script."
        testId="about-cta-band"
        title="Let us find out if this is a fit"
      />
    </>
  );
}
