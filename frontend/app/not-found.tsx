import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32" data-testid="not-found-page">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 text-display-lg font-semibold text-slateink">This page moved or never existed</h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-slateink-muted">
        The link you followed is not part of HOMEWORK. Head back to the homepage, or jump straight to booking a
        free consultation.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <ButtonLink data-testid="not-found-home-button" href="/" size="lg">
          Back to homepage
        </ButtonLink>
        <ButtonLink data-testid="not-found-contact-button" href="/contact" size="lg" variant="secondary">
          Book Free Consultation
        </ButtonLink>
      </div>
    </Container>
  );
}
