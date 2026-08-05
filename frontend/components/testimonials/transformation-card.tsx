import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Transformation } from '@/types';

type TransformationCardProps = {
  readonly transformation: Transformation;
};

export const TransformationCard = ({ transformation }: TransformationCardProps) => (
  <Card
    className="flex h-full flex-col"
    data-testid={`transformation-card-${transformation.slug}`}
    interactive
  >
    <CardHeader>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="metric">{transformation.headlineMetric}</Badge>
        <Badge variant="outline">{transformation.durationLabel}</Badge>
        <Badge variant="neutral">{transformation.focus}</Badge>
      </div>
      <p className="mt-5 text-lg font-semibold text-slateink">
        {transformation.clientAlias}
        <span className="ml-2 text-sm font-normal text-slateink-soft">{transformation.ageBracket}</span>
      </p>
    </CardHeader>

    <CardContent className="flex flex-1 flex-col">
      <p>{transformation.story}</p>

      <ul className="mt-5 grid gap-2 border-t border-hairline pt-4 sm:grid-cols-3">
        {transformation.secondaryMetrics.map((metric) => (
          <li
            className="rounded-xl bg-surface-muted px-3 py-2 text-xs font-medium text-slateink"
            key={metric}
          >
            {metric}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);
