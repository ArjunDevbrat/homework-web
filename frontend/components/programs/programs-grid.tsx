import { Section } from '@/components/layout/section';
import { ProgramCard } from '@/components/programs/program-card';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { programs } from '@/lib/data';

export const ProgramsGrid = () => (
  <Section bordered={false} testId="programs-grid">
    <SectionHeading
      eyebrow="Choose a track"
      subtitle="Every track uses the same method — what changes is pacing, medical caution and how much strength work is programmed."
      title="Three coaching blocks"
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
