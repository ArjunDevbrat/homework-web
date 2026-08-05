import { LegalPage, LegalSection } from '@/components/layout/legal-page';
import { siteConfig } from '@/lib/data';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'How HOMEWORK collects, stores and uses the personal information you share when booking a consultation or contacting Coach Samrat Aryan.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      summary="This policy explains exactly what we collect when you submit a form on this site, why we collect it, how long we keep it and how you can have it deleted."
      testId="privacy-policy-page"
      title="Privacy Policy"
      updatedAt="2026-01-01"
    >
      <LegalSection heading="What we collect">
        <p>
          When you submit the consultation form we store your name, email address, phone number, selected
          goal, optional program interest and any notes you choose to share. When you submit the general
          enquiry form we store your name, email address, subject and message.
        </p>
        <p>We do not run advertising pixels, cross-site trackers or third-party analytics profiling on this site.</p>
      </LegalSection>

      <LegalSection heading="Why we collect it">
        <p>
          Your details are used for one purpose: to contact you about coaching and to prepare for your
          consultation call. We never sell, rent or share your data with advertisers or data brokers.
        </p>
      </LegalSection>

      <LegalSection heading="Health information">
        <p>
          If you voluntarily share health information (for example a PCOS or diabetes diagnosis) it is treated
          as confidential and used only to assess suitability and design your coaching plan. Coaching is
          nutrition and lifestyle education, not medical treatment, and we never alter or prescribe medication.
        </p>
      </LegalSection>

      <LegalSection heading="Storage and retention">
        <p>
          Submissions are stored in an access-controlled PostgreSQL database. Consultation requests that do not
          convert into coaching are deleted within 12 months. Active client records are retained for the
          duration of coaching plus 24 months for continuity of care.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can request a copy of your data, a correction, or complete deletion at any time by emailing{' '}
          {siteConfig.email}. Deletion requests are actioned within 30 days.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>Questions about this policy can be sent to {siteConfig.email}.</p>
      </LegalSection>
    </LegalPage>
  );
}
