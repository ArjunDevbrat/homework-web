import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getIcon } from '@/components/ui/icon-registry';
import type { Resource } from '@/types';

type ResourceCardProps = {
  readonly resource: Resource;
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
          <Badge variant="outline">{resource.type}</Badge>
        </div>
        <CardTitle className="mt-4">{resource.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <p>{resource.summary}</p>
        <p className="mt-5 border-t border-hairline pt-4 text-xs font-medium text-slateink-soft">
          {resource.readTime}
        </p>
      </CardContent>
    </Card>
  );
};
