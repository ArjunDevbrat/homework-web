import { ClientJourneyTimeline } from '@/components/home/client-journey-timeline';
import { ConditionsGrid } from '@/components/home/conditions-grid';
import { ConsultationForm } from '@/components/home/consultation-form';
import { FAQ } from '@/components/home/faq';
import { FloatingWhatsApp } from '@/components/home/floating-whatsapp';
import { Hero } from '@/components/home/hero';
import { HowItWorks } from '@/components/home/how-it-works';
import { MeetCoach } from '@/components/home/meet-coach';
import { Programs } from '@/components/home/programs';
import { Testimonials } from '@/components/home/testimonials';
import { TrustMetrics } from '@/components/home/trust-metrics';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { CtaBand } from '@/components/layout/cta-band';
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
      <WhyChooseUs />
      <Programs />
      <ClientJourneyTimeline />
      <Testimonials />
      <ConsultationForm />
      <FAQ />
      <CtaBand />
      <FloatingWhatsApp />
    </>
  );
}
