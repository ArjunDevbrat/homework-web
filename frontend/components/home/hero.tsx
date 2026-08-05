import Image from 'next/image';

import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { credentials, siteConfig, trustPromises } from '@/lib/data';

const heroMetrics = [
  { label: '1:1 coaching', detail: 'Every plan written by Samrat, never templated' },
  { label: 'Weekly reviews', detail: 'Written feedback on your data within 24 hours' },
  { label: 'Habit-first', detail: 'Two habits at a time, so they actually stick' },
] as const;

export const Hero = () => (
  <section className="relative overflow-hidden" data-testid="home-hero">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          'radial-gradient(820px circle at 8% 4%, rgba(34,184,207,0.13), transparent 58%), radial-gradient(640px circle at 92% 12%, rgba(34,184,207,0.08), transparent 62%)',
      }}
    />

    <Container className="relative py-16 sm:py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow" data-testid="home-hero-eyebrow">
            Evidence-based coaching
          </p>

          <h1
            className="mt-6 text-display-xl font-semibold text-slateink text-balance"
            data-testid="home-hero-title"
          >
            Transform your health with evidence-based nutrition &amp; fitness coaching
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slateink-muted text-pretty sm:text-lg">
            Sustainable fat loss, muscle building and PCOS or diabetes management — built around the food
            already cooked in your kitchen. No crash diets. No gym dependency. No supplement selling.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink data-testid="home-hero-primary-cta" href="/contact" size="lg">
              Book Free Consultation
            </ButtonLink>
            <ButtonLink data-testid="home-hero-secondary-cta" href="/programs" size="lg" variant="secondary">
              View Programs
            </ButtonLink>
          </div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-3" data-testid="home-hero-metrics">
            {heroMetrics.map((metric) => (
              <div className="rounded-2xl border border-hairline bg-surface p-4 shadow-card" key={metric.label}>
                <dt className="text-sm font-semibold text-slateink">{metric.label}</dt>
                <dd className="mt-1.5 text-xs leading-relaxed text-slateink-soft">{metric.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <figure className="relative overflow-hidden rounded-3xl border border-hairline bg-surface p-3 shadow-card">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-muted">
              <Image
                alt={`${siteConfig.coachName}, nutrition and strength coach`}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                src="https://images.unsplash.com/photo-1595886509089-b691b210fc5c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000"
              />
            </div>
            <figcaption className="px-3 pb-1 pt-4">
              <p className="text-sm font-semibold text-slateink">{siteConfig.coachName}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {credentials.map((credential) => (
                  <li
                    className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-slateink"
                    key={credential.abbreviation}
                  >
                    {credential.abbreviation}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>

          <ul className="mt-4 grid grid-cols-2 gap-2" data-testid="home-hero-promises">
            {trustPromises.slice(0, 4).map((promise) => (
              <li
                className="rounded-xl border border-hairline bg-surface px-3 py-2.5 text-xs font-medium text-slateink-muted"
                key={promise}
              >
                {promise}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  </section>
);
