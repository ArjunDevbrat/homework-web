import { Check, PlayCircle } from 'lucide-react';
import Image from 'next/image';

import { HeroVideoModal } from '@/components/home/hero-video-modal';
import { ButtonLink, buttonClasses } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { coachProfile, heroContent } from '@/lib/data';
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
        <div className="animate-fade-up lg:col-span-7">
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

          <ul className="mt-8 flex flex-wrap gap-2.5" data-testid="home-hero-badges">
            {heroContent.metrics.map((metric) => (
              <li
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3.5 py-2 text-sm font-medium text-slateink shadow-card"
                data-testid={`hero-badge-${metric.id}`}
                key={metric.id}
              >
                <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-accent" />
                <span>
                  <span className="font-semibold">{metric.value}</span> {metric.label}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink data-testid="home-hero-primary-cta" href="/contact" size="lg">
              {heroContent.primaryCtaLabel}
            </ButtonLink>
            <HeroVideoModal>
              <button
                className={buttonClasses('secondary', 'lg')}
                data-testid="home-hero-secondary-cta"
                type="button"
              >
                <PlayCircle aria-hidden="true" className="h-5 w-5 text-accent" />
                Watch How We Work
              </button>
            </HeroVideoModal>
          </div>
        </div>

        <div className="animate-fade-up lg:col-span-5" style={{ animationDelay: '120ms' }}>
          <HeroVideoModal>
            <button
              aria-label="Play coaching walkthrough"
              className="group relative block w-full overflow-hidden rounded-3xl border border-hairline bg-surface p-3 text-left shadow-card transition-shadow duration-300 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
              data-testid="home-hero-video-frame"
              type="button"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-muted">
                <Image
                  alt={coachProfile.portraitAlt}
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  src={resolveImageUrl(coachProfile.portraitUrl)}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-slateink/10 transition-colors duration-300 group-hover:bg-slateink/25"
                />
                <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-surface/90 text-accent shadow-cta transition-transform duration-300 group-hover:scale-110">
                    <PlayCircle className="h-8 w-8" />
                  </span>
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-surface/90 px-3 py-1 text-[11px] font-semibold text-slateink backdrop-blur">
                  Coaching walkthrough
                </span>
              </div>
            </button>
          </HeroVideoModal>

          <div className="mt-4 rounded-2xl border border-hairline bg-surface px-4 py-3 shadow-card">
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
          </div>
        </div>
      </div>
    </Container>
  </section>
);
