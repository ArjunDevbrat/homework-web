'use client';

import { PlayCircle } from 'lucide-react';
import { useState } from 'react';

import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { RevealItem, RevealList } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';

type TabKey = 'written' | 'video';

export const Testimonials = () => {
  const [tab, setTab] = useState<TabKey>('written');

  return (
    <Section testId="home-testimonials">
      <SectionHeading
        eyebrow="Real results"
        subtitle="Names are aliased for privacy; every metric is a real client outcome. Individual results vary."
        title="Transformations that lasted"
      />

      <div
        className="mt-8 inline-flex rounded-full border border-hairline bg-surface p-1 shadow-card"
        data-testid="testimonials-tabs"
        role="tablist"
      >
        <button
          aria-selected={tab === 'written'}
          className={cn(
            'rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200',
            tab === 'written' ? 'bg-accent text-slateink' : 'text-slateink-muted hover:text-slateink',
          )}
          data-testid="testimonials-tab-written"
          onClick={() => setTab('written')}
          role="tab"
          type="button"
        >
          Written reviews
        </button>
        <button
          aria-selected={tab === 'video'}
          className={cn(
            'rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200',
            tab === 'video' ? 'bg-accent text-slateink' : 'text-slateink-muted hover:text-slateink',
          )}
          data-testid="testimonials-tab-video"
          onClick={() => setTab('video')}
          role="tab"
          type="button"
        >
          Video stories
        </button>
      </div>

      {tab === 'written' ? (
        <div data-testid="testimonials-written">
          <RevealList className="mt-8 grid gap-5 md:grid-cols-2">
            {testimonials.map((item) => (
              <RevealItem key={item.slug}>
                <figure
                  className="flex h-full flex-col rounded-3xl border border-hairline bg-surface p-6 shadow-card"
                  data-testid={`testimonial-${item.slug}`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="metric">{item.headlineResult}</Badge>
                    <Badge variant="neutral">{item.condition}</Badge>
                  </div>
                  <blockquote className="mt-4 text-base leading-relaxed text-slateink">
                    “{item.quote}”
                  </blockquote>
                  <p className="mt-3 text-sm leading-relaxed text-slateink-muted">{item.story}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.metrics.map((metric) => (
                      <li key={metric}>
                        <Badge variant="outline">{metric}</Badge>
                      </li>
                    ))}
                  </ul>
                  <figcaption className="mt-5 border-t border-hairline pt-4 text-sm">
                    <span className="font-semibold text-slateink">{item.clientAlias}</span>
                    <span className="text-slateink-soft">
                      {' '}
                      · {item.ageBracket} · {item.profession}
                    </span>
                    <span className="mt-0.5 block text-xs text-slateink-soft">
                      {item.durationLabel} program
                    </span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      ) : (
        <div
          className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-hairline bg-surface px-6 py-16 text-center"
          data-testid="testimonials-video"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent">
            <PlayCircle aria-hidden="true" className="h-8 w-8" />
          </span>
          <p className="mt-4 text-base font-semibold text-slateink">Video stories coming soon</p>
          <p className="mt-1 max-w-md text-sm text-slateink-muted">
            Filmed client interviews are on the way. Until then, explore the written transformations or book
            a free call to speak with the coach directly.
          </p>
        </div>
      )}
    </Section>
  );
};
