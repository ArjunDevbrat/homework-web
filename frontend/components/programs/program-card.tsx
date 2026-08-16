import { ButtonLink } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckList } from '@/components/ui/check-list';
import { getIcon } from '@/components/ui/icon-registry';
import type { ProgramPackage } from '@/types';

type ProgramCardProps = {
  readonly program: ProgramPackage;
};

export const ProgramCard = ({ program }: ProgramCardProps) => {
  const Icon = getIcon(program.icon);

  return (
    <Card className="flex h-full flex-col" data-testid={`program-card-${program.slug}`} interactive>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="flex flex-wrap justify-end gap-2">
            {program.featured ? (
              <Badge data-testid={`program-card-${program.slug}-featured`} variant="metric">
                Most chosen
              </Badge>
            ) : null}
            {program.freeTrialDays ? (
              <Badge data-testid={`program-card-${program.slug}-trial`} variant="metric">
                {program.freeTrialDays}-day free trial
              </Badge>
            ) : null}
          </div>
        </div>

        <CardTitle className="mt-4 text-xl">{program.name}</CardTitle>
        <p className="mt-1.5 text-sm font-medium text-slateink">{program.tagline}</p>
        <p className="mt-3 text-xs text-slateink-soft">{program.cadence}</p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        <p>{program.summary}</p>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slateink-soft">Best for</p>
        <p className="mt-1.5 text-sm text-slateink">{program.bestFor}</p>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slateink-soft">
          What you get
        </p>
        <CheckList className="mt-3" items={program.deliverables} />

        <p className="mt-5 border-t border-hairline pt-4 text-sm font-medium text-slateink">
          {program.priceLabel}
        </p>
      </CardContent>

      <CardFooter>
        <ButtonLink
          className="w-full"
          data-testid={`program-card-${program.slug}-cta`}
          href={`/contact?program=${program.slug}`}
          variant={program.featured ? 'primary' : 'secondary'}
        >
          {program.freeTrialDays ? `Start the ${program.freeTrialDays}-day free trial` : `Apply for ${program.name}`}
        </ButtonLink>
      </CardFooter>
    </Card>
  );
};
