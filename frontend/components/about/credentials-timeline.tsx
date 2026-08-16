import { GraduationCap } from 'lucide-react';

import { Section } from '@/components/layout/section';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { coachProfile } from '@/lib/data';

export const CredentialsTimeline = () => (
  <Section testId="about-credentials" tone="surface">
    <SectionHeading
      eyebrow="Qualifications"
      subtitle="Formal education first, certifications second, and continuing study in clinical nutrition alongside client work."
      title="Where the method comes from"
    />

    <RevealList className="mt-12 grid gap-5 md:grid-cols-3">
      {coachProfile.qualifications.map((qualification) => (
        <RevealItem className="h-full" key={qualification.abbreviation}>
          <div
            className="flex h-full flex-col rounded-2xl border border-hairline bg-surface-muted p-6"
            data-testid={`about-credential-${qualification.abbreviation.toLowerCase()}`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
              <GraduationCap aria-hidden="true" className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-slateink">{qualification.title}</h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slateink-soft">
              {qualification.issuer}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slateink-muted">{qualification.detail}</p>
          </div>
        </RevealItem>
      ))}
    </RevealList>
  </Section>
);
