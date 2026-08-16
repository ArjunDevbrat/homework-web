import Image from 'next/image';

import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { coachProfile, siteConfig } from '@/lib/data';
import { resolveImageUrl, resolveVideoUrl } from '@/lib/placeholders';

export const AboutHero = () => {
  const introVideoUrl = resolveVideoUrl(coachProfile.introVideoUrl);

  return (
    <section className="border-b border-hairline" data-testid="about-hero">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="eyebrow">About the coach</p>
            <h1 className="mt-6 text-display-lg font-semibold text-slateink text-balance">
              I am {coachProfile.name}. I coach people who are done with restarting.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium text-slateink">{coachProfile.tagline}</p>

            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-slateink-muted text-pretty">
              {coachProfile.story.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
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
            <div className="overflow-hidden rounded-3xl border border-hairline bg-surface p-3 shadow-card">
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
              <div className="px-3 pb-1 pt-4">
                <p className="text-sm font-semibold text-slateink">Coach {coachProfile.name}</p>
                <p className="mt-0.5 text-xs text-slateink-soft">{coachProfile.role}</p>
              </div>
            </div>

            {introVideoUrl ? (
              <a
                className="mt-4 block rounded-2xl border border-hairline bg-surface px-4 py-3 text-sm font-medium text-slateink transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
                data-testid="about-intro-video-link"
                href={introVideoUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Watch the 2-minute introduction
              </a>
            ) : (
              <p
                className="mt-4 rounded-2xl border border-hairline bg-surface-muted px-4 py-3 text-xs leading-relaxed text-slateink-soft"
                data-testid="about-intro-video-fallback"
              >
                An introduction video is being filmed. Until then, the daily coaching sessions on Instagram and
                YouTube show exactly how classes run.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
