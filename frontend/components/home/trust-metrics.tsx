import { Section } from '@/components/layout/section';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { coachProfile, heroContent } from '@/lib/data';
import type { IconName } from '@/types';

const clientsMetric = heroContent.metrics.find((metric) => metric.id === 'clients-counselled');

type StatCard = {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly detail: string;
  readonly icon: IconName;
};

const stats: readonly StatCard[] = [
  {
    id: 'credentials',
    value: `${coachProfile.qualifications.length}`,
    label: 'Degrees & certifications',
    detail: coachProfile.qualifications.map((qualification) => qualification.abbreviation).join('  ·  '),
    icon: 'graduation-cap',
  },
  {
    id: 'experience',
    value: '3+',
    label: 'Years coaching experience',
    detail: 'Refining an evidence-based, home-first method with real clients.',
    icon: 'calendar-check',
  },
  {
    id: 'clients',
    value: clientsMetric?.value ?? '1500+',
    label: 'Clients counselled',
    detail: clientsMetric?.detail ?? 'Across fat loss, muscle building and clinical lifestyle conditions.',
    icon: 'users',
  },
];

export const TrustMetrics = () => (
  <Section testId="home-trust-metrics" tone="surface">
    <SectionHeading
      align="center"
      eyebrow="Why HOMEWORK"
      subtitle="Evidence-based coaching backed by formal qualifications and thousands of real client hours."
      title="A qualified coach, a proven method, and results at scale"
    />

    <RevealList className="mt-12 grid gap-5 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = getIcon(stat.icon);

        return (
          <RevealItem key={stat.id}>
            <div
              className="flex h-full flex-col rounded-2xl border border-hairline bg-canvas p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              data-testid={`trust-metric-${stat.id}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <p className="mt-5 text-display-md font-semibold tracking-tight text-slateink">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-slateink">{stat.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-slateink-muted">{stat.detail}</p>
            </div>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
