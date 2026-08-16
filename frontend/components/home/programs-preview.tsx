import { Section } from '@/components/layout/section';
import { ProgramCard } from '@/components/programs/program-card';
import { ButtonLink } from '@/components/ui/button';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { programs } from '@/lib/data';

export const ProgramsPreview = () => (
  <Section testId="home-programs-preview" tone="surface">
    <SectionHeading
      action={
        <ButtonLink data-testid="home-programs-view-all" href="/programs" variant="secondary">
          Compare all programs
        </ButtonLink>
      }
      eyebrow="Coaching programs"
      subtitle="Training, nutrition, or both. Pick the level of support you actually need — the Exercise Only track starts with a 3-day free trial."
      title="Three ways to work together"
    />

    <RevealList className="mt-12 grid gap-5 lg:grid-cols-3">
      {programs.map((program) => (
        <RevealItem className="h-full" key={program.slug}>
          <ProgramCard program={program} />
        </RevealItem>
      ))}
    </RevealList>
  </Section>
);
