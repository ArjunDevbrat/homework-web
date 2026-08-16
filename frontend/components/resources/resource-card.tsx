import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getIcon } from '@/components/ui/icon-registry';
import type { FreeResource } from '@/types';

type ResourceCardProps = {
  readonly resource: FreeResource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const Icon = getIcon(resource.icon);

  return (
    <Card className="flex h-full flex-col" data-testid={`resource-card-${resource.slug}`} interactive>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <Badge variant="outline">{resource.format}</Badge>
        </div>
        <CardTitle className="mt-4">{resource.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        <p>{resource.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {resource.highlights.map((highlight) => (
            <li
              className="rounded-full border border-hairline bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-slateink"
              key={highlight}
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4">
          <p className="text-xs font-medium text-slateink-soft">{resource.pages}</p>
          <p className="text-xs font-medium text-slateink-soft">
            {resource.fileUrl ? 'Download available' : 'Shared on your consultation call'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
