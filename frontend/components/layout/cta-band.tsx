import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import { siteConfig } from '@/lib/data';

type CtaBandProps = {
  readonly title?: string;
  readonly body?: string;
  readonly testId?: string;
};

export const CtaBand = ({
  title = 'Ready to stop restarting every January?',
  body = 'Book a free 20-minute consultation. You will get an honest assessment of what will work for your schedule, your kitchen and your medical history — even if that means coaching is not the right fit yet.',
  testId = 'cta-band',
}: CtaBandProps) => (
  <section className="border-t border-hairline bg-surface-muted" data-testid={testId}>
    <Container className="py-14 sm:py-16">
      <Reveal className="grid gap-8 rounded-3xl border border-hairline bg-surface p-8 shadow-card lg:grid-cols-12 lg:items-center lg:p-10">
        <div className="lg:col-span-8">
          <h2 className="text-display-md font-semibold text-slateink text-balance">{title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slateink-muted text-pretty">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
          <ButtonLink data-testid={`${testId}-primary-button`} href="/contact" size="lg">
            Book Free Consultation
          </ButtonLink>
          <ButtonLink
            data-testid={`${testId}-email-button`}
            href={`mailto:${siteConfig.email}`}
            size="lg"
            variant="secondary"
          >
            Email the coach
          </ButtonLink>
        </div>
      </Reveal>
    </Container>
  </section>
);
