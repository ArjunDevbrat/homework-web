import { LegalPage, LegalSection } from '@/components/layout/legal-page';
import { siteConfig } from '@/lib/data';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Terms of Service',
  description:
    'The terms that govern coaching services provided by HOMEWORK and Coach Samrat Aryan, including scope, medical disclaimers and client responsibilities.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalPage
      summary="These terms describe what HOMEWORK coaching includes, what it explicitly does not include, and what is expected from both sides."
      testId="terms-page"
      title="Terms of Service"
      updatedAt="2026-01-01"
    >
      <LegalSection heading="Scope of service">
        <p>
          HOMEWORK provides online nutrition, training and lifestyle coaching. Deliverables include a nutrition
          target, a training plan, written weekly check-in reviews and weekday messaging support for the
          duration of your program.
        </p>
      </LegalSection>

      <LegalSection heading="Not medical advice">
        <p>
          Coaching is educational and does not constitute medical diagnosis, treatment or prescription. Coach
          Samrat Aryan does not start, stop or modify medication. If you have a diagnosed condition you must
          remain under the care of your treating physician throughout coaching.
        </p>
      </LegalSection>

      <LegalSection heading="Client responsibilities">
        <p>
          You agree to disclose relevant medical conditions, injuries and medication, to report adverse
          symptoms promptly, and to submit weekly check-ins honestly. Coaching outcomes depend heavily on
          adherence and accurate reporting.
        </p>
      </LegalSection>

      <LegalSection heading="No guaranteed outcomes">
        <p>
          Results vary with adherence, sleep, stress, medication, genetics and medical history. No specific
          weight, body composition or biomarker outcome is guaranteed.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          Plans, guides and resources shared with you are licensed for your personal use only and may not be
          resold, redistributed or used to coach third parties.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>For questions about these terms, email {siteConfig.email}.</p>
      </LegalSection>
    </LegalPage>
  );
}
