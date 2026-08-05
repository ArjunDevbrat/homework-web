import { LegalPage, LegalSection } from '@/components/layout/legal-page';
import { siteConfig } from '@/lib/data';
import { buildPageMetadata } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: 'Refund Policy',
  description:
    'Cancellation and refund terms for HOMEWORK coaching programs, including the first-week window, medical exits and program pauses.',
  path: '/refund-policy',
});

export default function RefundPolicyPage() {
  return (
    <LegalPage
      summary="Coaching only works when both sides want to be there. These are the conditions under which a program can be cancelled, paused or refunded."
      testId="refund-policy-page"
      title="Refund Policy"
      updatedAt="2026-01-01"
    >
      <LegalSection heading="First-week window">
        <p>
          If you decide within 7 days of your program start date that coaching is not right for you, you
          receive a full refund minus any payment gateway charges already deducted.
        </p>
      </LegalSection>

      <LegalSection heading="After the first week">
        <p>
          Beyond 7 days, refunds are calculated pro-rata on the unused full weeks of your program, less a 15%
          administrative fee covering plan design already delivered.
        </p>
      </LegalSection>

      <LegalSection heading="Medical exits">
        <p>
          If a physician advises you to stop nutrition or training changes, your program is refunded pro-rata
          on unused weeks with no administrative fee, on submission of the medical advice.
        </p>
      </LegalSection>

      <LegalSection heading="Pauses instead of refunds">
        <p>
          Programs can be paused once for up to 4 weeks for travel, illness or work pressure. Paused weeks are
          preserved in full and resume on the date you choose.
        </p>
      </LegalSection>

      <LegalSection heading="Non-refundable items">
        <p>
          Completed weeks of coaching and free resources are non-refundable. Free consultations are, by
          definition, free — nothing is charged before you agree to a program.
        </p>
      </LegalSection>

      <LegalSection heading="How to request">
        <p>
          Email {siteConfig.email} with your name and program start date. Requests are acknowledged within 3
          working days and processed within 14 working days of approval.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
