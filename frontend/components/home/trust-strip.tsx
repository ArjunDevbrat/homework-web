import { GraduationCap, HeartPulse, ShieldCheck } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { credentials } from '@/lib/data';

const pillars = [
  {
    icon: GraduationCap,
    title: 'Formally qualified',
    body: credentials.map((credential) => credential.title).join(' · '),
  },
  {
    icon: HeartPulse,
    title: 'Clinically aware',
    body: 'PCOS, prediabetes and type 2 diabetes tracks run alongside your treating physician.',
  },
  {
    icon: ShieldCheck,
    title: 'No crash diets',
    body: 'No detoxes, no banned foods, no commission-driven supplement stacks. Ever.',
  },
] as const;

export const TrustStrip = () => (
  <div className="border-y border-hairline bg-surface" data-testid="home-trust-strip">
    <Container className="py-8 sm:py-10">
      <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
        {pillars.map((pillar) => (
          <li className="flex items-start gap-3" key={pillar.title}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <pillar.icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slateink">{pillar.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slateink-soft">{pillar.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  </div>
);
