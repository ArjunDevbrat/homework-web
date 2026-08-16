import { Suspense } from 'react';

import { ContactChannels } from '@/components/contact/contact-channels';
import { ContactForm } from '@/components/contact/contact-form';
import { ConsultationForm } from '@/components/contact/consultation-form';
import { WhatHappensNext } from '@/components/contact/what-happens-next';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/layout/section';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Book a Free Consultation',
  description:
    'Book a free 20-minute consultation with Coach Samrat Aryan, or send a general question about HOMEWORK coaching programs, pricing and suitability.',
  path: '/contact',
  keywords: [
    'book nutrition consultation',
    'free coaching consultation India',
    'contact Coach Samrat Aryan',
  ],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        description="Tell me your goal, your profession and anything medical I should know. You will hear back within 48 hours with an honest assessment — including when coaching is not the right next step for you."
        eyebrow="Contact"
        testId="contact-hero"
        title="Book your free 20-minute consultation"
      />

      <Section bordered={false} testId="contact-main">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div
                  className="h-[820px] animate-pulse rounded-3xl border border-hairline bg-surface"
                  data-testid="consultation-form-skeleton"
                />
              }
            >
              <ConsultationForm />
            </Suspense>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5">
            <WhatHappensNext />
            <ContactChannels />
          </div>
        </div>

        <div className="mt-10">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
