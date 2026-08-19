import { ProgramDetailsModal } from '@/components/home/program-details-modal';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { buttonClasses } from '@/components/ui/button';
import { CheckList } from '@/components/ui/check-list';
import { getIcon } from '@/components/ui/icon-registry';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { programs, siteConfig } from '@/lib/data';

const waDigits = siteConfig.whatsappNumber.replace(/\D/g, '');

function joinNowHref(programName: string): string {
  const text = encodeURIComponent(
    `Hi Coach Samrat, I would like to join the ${programName} at ${siteConfig.name}. Please share the next steps.`,
  );
  return waDigits.length > 0 ? `https://wa.me/${waDigits}?text=${text}` : `https://wa.me/?text=${text}`;
}

export const Programs = () => (
  <Section testId="home-programs">
    <SectionHeading
      align="center"
      eyebrow="Coaching programs"
      subtitle="Three ways to work together. Not sure which fits? Book a free consultation and we will choose together."
      title="Choose the program that fits your life"
    />

    <RevealList className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
      {programs.map((program) => {
        const Icon = getIcon(program.icon);

        return (
          <RevealItem key={program.slug}>
            <article
              className={`flex h-full flex-col rounded-3xl border bg-surface p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-7 ${
                program.featured ? 'border-accent ring-1 ring-accent-ring' : 'border-hairline'
              }`}
              data-testid={`program-card-${program.slug}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                {program.featured ? <Badge variant="metric">Most popular</Badge> : null}
                {program.freeTrialDays ? (
                  <Badge variant="metric">{program.freeTrialDays}-day free trial</Badge>
                ) : null}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slateink">{program.name}</h3>
              <p className="mt-1.5 text-sm text-slateink-muted">{program.tagline}</p>

              <p className="mt-4 rounded-2xl bg-surface-muted px-4 py-3 text-sm leading-relaxed text-slateink">
                {program.priceLabel}
              </p>

              <CheckList
                className="mt-5"
                items={program.deliverables}
                testId={`program-deliverables-${program.slug}`}
              />

              <div className="mt-auto flex flex-col gap-3 pt-7">
                <a
                  className={buttonClasses('primary', 'lg', 'w-full')}
                  data-testid={`program-join-${program.slug}`}
                  href={joinNowHref(program.name)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Join Now on WhatsApp
                </a>
                <ProgramDetailsModal program={program} />
              </div>
            </article>
          </RevealItem>
        );
      })}
    </RevealList>
  </Section>
);
