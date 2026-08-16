import { AboutHero } from '@/components/about/about-hero';
import { CoachingPhilosophy } from '@/components/about/coaching-philosophy';
import { CredentialsTimeline } from '@/components/about/credentials-timeline';
import { ClientJourney } from '@/components/home/client-journey';
import { CtaBand } from '@/components/layout/cta-band';
import { WorkflowSteps } from '@/components/programs/workflow-steps';
import { workflowSteps } from '@/lib/data';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'About Coach Samrat Aryan',
  description:
    'B.Sc Nutrition & Dietetics, Certification in Strength & Hypertrophy (HSF) and Certification in Yoga (Yoga and Happiness). Meet Coach Samrat Aryan, who has counselled 1500+ clients from home.',
  path: '/about-coach',
  keywords: [
    'Coach Samrat Aryan',
    'nutrition dietetics coach India',
    'certified strength coach',
    'certified yoga coach',
  ],
});

export default function AboutCoachPage() {
  return (
    <>
      <AboutHero />
      <CredentialsTimeline />
      <CoachingPhilosophy />
      <WorkflowSteps
        eyebrow="Working together"
        steps={workflowSteps}
        subtitle="The same five steps for every client, whether the goal is a first 5 kg or an HbA1c reduction."
        testId="about-workflow"
        title="What coaching actually looks like"
        tone="surface"
      />
      <ClientJourney />
      <CtaBand
        body="If the method above sounds like what you have been missing, the next step is a 20-minute call. No obligation, no sales script."
        testId="about-cta-band"
        title="Let us find out if this is a fit"
      />
    </>
  );
}
