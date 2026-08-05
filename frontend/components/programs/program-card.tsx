import { ButtonLink } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckList } from '@/components/ui/check-list';
import type { Program } from '@/types';

type ProgramCardProps = {
  readonly program: Program;
};

export const ProgramCard = ({ program }: ProgramCardProps) => (
  <Card className="flex h-full flex-col" data-testid={`program-card-${program.slug}`} interactive>
    <CardHeader>
      <div className="flex items-center justify-between gap-3">
        <Badge variant="outline">{program.durationWeeks} weeks</Badge>
        {program.featured ? (
          <Badge data-testid={`program-card-${program.slug}-featured`} variant="metric">
            Most chosen
          </Badge>
        ) : null}
      </div>
      <CardTitle className="mt-4 text-xl">{program.name}</CardTitle>
      <p className="mt-2 text-sm font-medium text-slateink">{program.priceLabel}</p>
      <p className="mt-1 text-xs text-slateink-soft">{program.format}</p>
    </CardHeader>

    <CardContent className="flex flex-1 flex-col">
      <p>{program.summary}</p>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-slateink-soft">Best for</p>
      <p className="mt-1.5 text-sm text-slateink">{program.bestFor}</p>

      <CheckList className="mt-5 border-t border-hairline pt-5" items={program.inclusions} />
    </CardContent>

    <CardFooter>
      <ButtonLink
        className="w-full"
        data-testid={`program-card-${program.slug}-cta`}
        href={`/contact?program=${program.slug}`}
        variant={program.featured ? 'primary' : 'secondary'}
      >
        Apply for {program.name}
      </ButtonLink>
    </CardFooter>
  </Card>
);
