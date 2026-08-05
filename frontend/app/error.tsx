'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-24 sm:py-32" data-testid="error-page">
      <p className="eyebrow">Something broke</p>
      <h1 className="mt-6 text-display-lg font-semibold text-slateink">We could not load this section</h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-slateink-muted">
        This is on our side, not yours. Try again — and if it keeps happening, email contact@homework.fit and
        we will sort it out.
      </p>
      <Button className="mt-9" data-testid="error-retry-button" onClick={reset} size="lg">
        Try again
      </Button>
    </Container>
  );
}
