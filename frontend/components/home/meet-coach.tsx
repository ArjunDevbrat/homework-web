import Image from 'next/image';

import { Section } from '@/components/layout/section';
import { ButtonLink } from '@/components/ui/button';
import { getIcon } from '@/components/ui/icon-registry';
import { Reveal } from '@/components/ui/reveal';
import { coachProfile } from '@/lib/data';
import { resolveImageUrl } from '@/lib/placeholders';

export const MeetCoach = () => (
  <Section testId="home-meet-coach">
    <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
      <Reveal className="lg:col-span-5">
        <figure className="overflow-hidden rounded-3xl border border-hairline bg-surface p-3 shadow-card">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-muted">
            <Image
              alt={coachProfile.portraitAlt}
              className="object-cover"
              fill
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
      </Reveal>

      <Reveal className="lg:col-span-7" delay={0.1}>
        <p className="eyebrow">Meet your coach</p>
        <h2 className="mt-6 text-display-md font-semibold text-slateink text-balance">
          {coachProfile.tagline}
        </h2>

        <div className="mt-5 space-y-4">
          {coachProfile.story.slice(0, 3).map((paragraph) => (
            <p className="text-base leading-relaxed text-slateink-muted text-pretty" key={paragraph.slice(0, 28)}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {coachProfile.principles.map((principle) => {
            const Icon = getIcon(principle.icon);

            return (
              <div
                className="flex gap-3 rounded-2xl border border-hairline bg-surface p-4 shadow-card"
                data-testid={`coach-principle-${principle.icon}`}
                key={principle.title}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slateink">{principle.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slateink-muted">{principle.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/about-coach" size="lg">
            Read the full story
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Book Free Consultation
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  </Section>
);
