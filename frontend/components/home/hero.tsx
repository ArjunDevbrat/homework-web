import Image from 'next/image';

import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { getIcon } from '@/components/ui/icon-registry';
import { coachProfile, heroContent, trustPromises } from '@/lib/data';
import { resolveImageUrl } from '@/lib/placeholders';

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
            {heroContent.headline}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slateink-muted text-pretty sm:text-lg">
            {heroContent.subheadline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink data-testid="home-hero-primary-cta" href="/contact" size="lg">
              {heroContent.primaryCtaLabel}
            </ButtonLink>
            <ButtonLink data-testid="home-hero-secondary-cta" href="/programs" size="lg" variant="secondary">
              {heroContent.secondaryCtaLabel}
            </ButtonLink>
          </div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-3" data-testid="home-hero-metrics">
            {heroContent.metrics.map((metric) => {
              const Icon = getIcon(metric.icon);

              return (
                <div
                  className="rounded-2xl border border-hairline bg-surface p-4 shadow-card"
                  data-testid={`hero-metric-${metric.id}`}
                  key={metric.id}
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <dt className="mt-3 text-lg font-semibold tracking-tight text-slateink">{metric.value}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-slateink">{metric.label}</dd>
                  <dd className="mt-1.5 text-xs leading-relaxed text-slateink-soft">{metric.detail}</dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <figure className="relative overflow-hidden rounded-3xl border border-hairline bg-surface p-3 shadow-card">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-muted">
              <Image
                alt={coachProfile.portraitAlt}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                src={resolveImageUrl(coachProfile.portraitUrl)}
              />
            </div>
            <figcaption className="px-3 pb-1 pt-4">
              <p className="text-sm font-semibold text-slateink">Coach {coachProfile.name}</p>
              <p className="mt-0.5 text-xs text-slateink-soft">{coachProfile.role}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {coachProfile.qualifications.map((qualification) => (
                  <li
                    className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-slateink"
                    key={qualification.abbreviation}
                    title={qualification.title}
                  >
                    {qualification.abbreviation}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>

          <ul className="mt-4 grid grid-cols-2 gap-2" data-testid="home-hero-promises">
            {trustPromises.map((promise) => (
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
