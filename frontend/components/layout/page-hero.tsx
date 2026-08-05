import type { ReactNode } from 'react';

import { Container } from '@/components/ui/container';

type PageHeroProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly children?: ReactNode;
  readonly testId: string;
};

export const PageHero = ({ eyebrow, title, description, children, testId }: PageHeroProps) => (
  <section className="relative overflow-hidden border-b border-hairline" data-testid={testId}>
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          'radial-gradient(700px circle at 12% 0%, rgba(34,184,207,0.10), transparent 60%), radial-gradient(560px circle at 88% 10%, rgba(34,184,207,0.07), transparent 62%)',
      }}
    />
    <Container className="relative py-16 sm:py-20 lg:py-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 max-w-3xl text-display-lg font-semibold text-slateink text-balance">{title}</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-slateink-muted text-pretty sm:text-lg">
        {description}
      </p>
      {children ? <div className="mt-8">{children}</div> : null}
    </Container>
  </section>
);
