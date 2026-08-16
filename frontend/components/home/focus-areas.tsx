import { Section } from '@/components/layout/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { featuredConditions } from '@/lib/data';

export const FocusAreas = () => (
  <Section bordered={false} testId="home-focus-areas">
    <SectionHeading
      eyebrow="Most common goals"
      subtitle="These four bring most people to HOMEWORK. Each one has its own nutrition structure, training approach and tracking method."
      title="What we work on most"
    />

    <RevealList className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {featuredConditions.map((condition) => {
        const Icon = getIcon(condition.icon);

        return (
          <RevealItem className="h-full" key={condition.slug}>
            <Card
              className="flex h-full flex-col"
              data-testid={`focus-area-card-${condition.slug}`}
              interactive
            >
              <CardHeader>
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slateink-soft">
                  {condition.category}
                </p>
                <CardTitle className="mt-1.5">{condition.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{condition.summary}</p>
              </CardContent>
            </Card>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
