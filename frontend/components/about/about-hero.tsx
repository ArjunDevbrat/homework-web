import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { siteConfig } from '@/lib/data';

export const AboutHero = () => (
  <section className="border-b border-hairline" data-testid="about-hero">
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow">About the coach</p>
          <h1 className="mt-6 text-display-lg font-semibold text-slateink text-balance">
            I am Samrat Aryan. I coach people who are done with restarting.
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-slateink-muted text-pretty">
            <p>
              I trained formally in nutrition and dietetics, then in strength and hypertrophy coaching, and
              finally in yoga — because the three answer different halves of the same problem: what you eat,
              how you train, and whether your body can recover from either.
            </p>
            <p>
              Most people who reach me have already lost the same 8 kilos three times. The plan was never the
              problem — the plan was simply impossible to run inside their real week. So HOMEWORK is built
              backwards: we start from your kitchen, your commute, your shift timings and your medical reports,
              then design a plan that fits inside them.
            </p>
            <p>
              I do not sell supplements, I do not prescribe medication, and I will tell you plainly when
              coaching is not what you need yet.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink data-testid="about-hero-primary-cta" href="/contact" size="lg">
              Book Free Consultation
            </ButtonLink>
            <ButtonLink
              data-testid="about-hero-secondary-cta"
              href={siteConfig.socials[0].href}
              rel="noopener noreferrer"
              size="lg"
              target="_blank"
              variant="secondary"
            >
              See daily coaching on Instagram
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-3xl border border-hairline bg-surface p-3 shadow-card">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-muted">
              <Image
                alt="Coach Samrat Aryan reviewing a client training log"
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                src="https://images.unsplash.com/photo-1595886509089-b691b210fc5c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
);
