import { Container } from '@/components/ui/container';
import { formatDate } from '@/lib/utils';
import type { ReactNode } from 'react';

type LegalPageProps = {
  readonly title: string;
  readonly summary: string;
  readonly updatedAt: string;
  readonly children: ReactNode;
  readonly testId: string;
};

export const LegalPage = ({ title, summary, updatedAt, children, testId }: LegalPageProps) => (
  <article data-testid={testId}>
    <section className="border-b border-hairline bg-surface-muted">
      <Container className="py-16 sm:py-20">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-5 text-display-lg font-semibold text-slateink text-balance">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slateink-muted">{summary}</p>
        <p className="mt-6 text-xs text-slateink-soft">Last updated {formatDate(updatedAt)}</p>
      </Container>
    </section>

    <Container className="py-16 sm:py-20">
      <div className="max-w-prose space-y-8">{children}</div>
    </Container>
  </article>
);

type LegalSectionProps = {
  readonly heading: string;
  readonly children: ReactNode;
};

export const LegalSection = ({ heading, children }: LegalSectionProps) => (
  <section className="space-y-3">
    <h2 className="text-lg font-semibold text-slateink">{heading}</h2>
    <div className="space-y-3 text-sm leading-relaxed text-slateink-muted">{children}</div>
  </section>
);
