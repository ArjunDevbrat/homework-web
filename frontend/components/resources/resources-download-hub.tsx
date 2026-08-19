'use client';

import { CheckCircle2, Download, Loader2, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { type FormEvent, useState } from 'react';

import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { getIcon } from '@/components/ui/icon-registry';
import { Input } from '@/components/ui/input';
import { SectionHeading } from '@/components/ui/section-heading';
import { submitContactAction } from '@/lib/actions';
import { freeResources } from '@/lib/data';
import type { ActionState, FreeResource } from '@/types';

/** Free-resources download hub with a 1-click lead-capture modal (persists via submitContactAction). */
export const ResourcesDownloadHub = () => {
  const [selected, setSelected] = useState<FreeResource | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ActionState | null>(null);

  const open = (resource: FreeResource) => {
    setSelected(resource);
    setName('');
    setEmail('');
    setResult(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) {
      return;
    }
    setSubmitting(true);
    const response = await submitContactAction({
      fullName: name,
      email,
      subject: `Free guide request: ${selected.title}`,
      message: `Please send me the "${selected.title}" (${selected.pages}) guide.`,
    });
    setResult(response);
    setSubmitting(false);
  };

  return (
    <Section testId="resources-grid">
      <SectionHeading
        eyebrow={`${freeResources.length} free guides`}
        subtitle="Preview any guide, then have it emailed straight to your inbox — one click, no long form."
        title="Guides, checklists and food lists"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {freeResources.map((resource) => {
          const Icon = getIcon(resource.icon);

          return (
            <article
              className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 shadow-card"
              data-testid={`resource-card-${resource.slug}`}
              key={resource.slug}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <Badge variant="outline">{resource.format}</Badge>
              </div>
              <h3 className="mt-4 text-base font-semibold text-slateink">{resource.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slateink-muted">{resource.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {resource.highlights.map((highlight) => (
                  <li
                    className="rounded-full border border-hairline bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-slateink"
                    key={highlight}
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <span className="text-xs font-medium text-slateink-soft">{resource.pages}</span>
                <Button
                  data-testid={`resource-get-${resource.slug}`}
                  onClick={() => open(resource)}
                  size="sm"
                  type="button"
                  variant="secondary"
                >
                  <Download aria-hidden="true" className="h-4 w-4 text-accent" />
                  Get this guide
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <Dialog.Root onOpenChange={(isOpen) => (isOpen ? undefined : setSelected(null))} open={selected !== null}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-slateink/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-hairline bg-surface p-6 shadow-card-hover data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in"
            data-testid="resource-lead-modal"
          >
            <div className="flex items-start justify-between gap-4">
              <Dialog.Title className="text-lg font-semibold text-slateink">
                {selected ? `Get “${selected.title}”` : 'Get this guide'}
              </Dialog.Title>
              <Dialog.Close
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-hairline bg-surface text-slateink transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </Dialog.Close>
            </div>

            {result?.status === 'success' ? (
              <div className="mt-5 rounded-2xl border border-hairline bg-[#E7F7F2] p-4" data-testid="resource-lead-success">
                <div className="flex items-start gap-3">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1F9D7A]" />
                  <p className="text-sm leading-relaxed text-slateink">
                    Thanks! We have your request and will email this guide to you shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form className="mt-5" noValidate onSubmit={onSubmit}>
                <Dialog.Description className="text-sm leading-relaxed text-slateink-muted">
                  Enter your details and we will send the guide straight to your inbox.
                </Dialog.Description>
                <div className="mt-4 flex flex-col gap-4">
                  <FormField error={result?.fieldErrors?.fullName} htmlFor="rl-name" label="Full name" required>
                    <Input
                      data-testid="resource-lead-name"
                      id="rl-name"
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Anaya Rao"
                      value={name}
                    />
                  </FormField>
                  <FormField error={result?.fieldErrors?.email} htmlFor="rl-email" label="Email" required>
                    <Input
                      data-testid="resource-lead-email"
                      id="rl-email"
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      type="email"
                      value={email}
                    />
                  </FormField>
                </div>
                {result?.status === 'error' && !result.fieldErrors ? (
                  <p className="mt-3 text-xs font-medium text-[#c2413a]" role="alert">
                    {result.message}
                  </p>
                ) : null}
                <Button
                  className="mt-5 w-full"
                  data-testid="resource-lead-submit"
                  disabled={submitting}
                  size="lg"
                  type="submit"
                >
                  {submitting ? (
                    <>
                      <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    'Email me this guide'
                  )}
                </Button>
              </form>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Section>
  );
};
