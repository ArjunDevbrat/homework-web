import { Container } from '@/components/ui/container';
import { getIcon } from '@/components/ui/icon-registry';
import { coachProfile } from '@/lib/data';

const pillars = [
  {
    icon: 'graduation-cap' as const,
    title: 'Formally qualified',
    body: coachProfile.qualifications.map((qualification) => qualification.title).join(' · '),
  },
  {
    icon: 'heart-pulse' as const,
    title: 'Clinically aware',
    body: 'Diabetes, PCOS, thyroid and cardiovascular tracks run alongside your treating physician.',
  },
  {
    icon: 'shield-check' as const,
    title: 'No crash diets',
    body: 'No detoxes, no banned foods, no commission-driven supplement stacks. Ever.',
  },
];

export const TrustStrip = () => (
  <div className="border-y border-hairline bg-surface" data-testid="home-trust-strip">
    <Container className="py-8 sm:py-10">
      <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
        {pillars.map((pillar) => {
          const Icon = getIcon(pillar.icon);

          return (
            <li className="flex items-start gap-3" key={pillar.title}>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slateink">{pillar.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slateink-soft">{pillar.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  </div>
);
