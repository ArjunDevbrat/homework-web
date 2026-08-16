import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { TestimonialItem } from '@/types';

type TestimonialCardProps = {
  readonly testimonial: TestimonialItem;
};

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <Card
    className="flex h-full flex-col overflow-hidden"
    data-testid={`testimonial-card-${testimonial.slug}`}
    interactive
  >
    {testimonial.imageUrl ? (
      <div className="relative aspect-[16/9] w-full border-b border-hairline bg-surface-muted">
        <Image
          alt={`${testimonial.clientAlias} — ${testimonial.condition} transformation`}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          src={testimonial.imageUrl}
        />
      </div>
    ) : null}

    <CardHeader>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="metric">{testimonial.headlineResult}</Badge>
        <Badge variant="outline">{testimonial.durationLabel}</Badge>
        <Badge variant="neutral">{testimonial.condition}</Badge>
      </div>

      <p className="mt-5 text-lg font-semibold text-slateink">
        {testimonial.clientAlias}
        <span className="ml-2 text-sm font-normal text-slateink-soft">{testimonial.ageBracket}</span>
      </p>
      <p className="mt-0.5 text-xs text-slateink-soft">{testimonial.profession}</p>
    </CardHeader>

    <CardContent className="flex flex-1 flex-col">
      <blockquote className="border-l-2 border-accent pl-4 text-sm font-medium italic text-slateink">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <p className="mt-4">{testimonial.story}</p>

      <ul className="mt-5 grid gap-2 border-t border-hairline pt-4 sm:grid-cols-3">
        {testimonial.metrics.map((metric) => (
          <li className="rounded-xl bg-surface-muted px-3 py-2 text-xs font-medium text-slateink" key={metric}>
            {metric}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);
