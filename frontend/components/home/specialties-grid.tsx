import { Section } from '@/components/layout/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { specialties } from '@/lib/data';

export const SpecialtiesGrid = () => (
  <Section bordered={false} testId="home-specialties">
    <SectionHeading
      eyebrow="What we work on"
      subtitle="Four coaching focuses, each with its own nutrition structure, training approach and tracking method."
      title="Specialities built for real Indian households"
    />

    <RevealList className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {specialties.map((specialty) => {
        const Icon = getIcon(specialty.icon);

        return (
          <RevealItem className="h-full" key={specialty.slug}>
            <Card className="flex h-full flex-col" data-testid={`specialty-card-${specialty.slug}`} interactive>
              <CardHeader>
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <CardTitle>{specialty.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p>{specialty.summary}</p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-hairline pt-4">
                  {specialty.outcomes.map((outcome) => (
                    <li className="text-xs font-medium text-slateink-soft" key={outcome}>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
