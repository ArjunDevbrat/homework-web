'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, MessageCircle, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Section } from '@/components/layout/section';
import { Button, ButtonLink } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { getIcon } from '@/components/ui/icon-registry';
import { Input, Select, Textarea } from '@/components/ui/input';
import { SectionHeading } from '@/components/ui/section-heading';
import { submitConsultationAction } from '@/lib/actions';
import { consultationSteps, genderOptions, goalOptions, programs } from '@/lib/data';
import { consultationSchema, type ConsultationInput } from '@/lib/validations';
import type { ActionState } from '@/types';

const emptyState: ActionState = { status: 'idle', message: '' };

const defaultValues = {
  fullName: '',
  phone: '',
  age: '' as unknown as number,
  gender: 'FEMALE' as const,
  goal: 'FAT_LOSS' as const,
  healthIssue: '',
  profession: '',
  email: '',
  programSlug: '',
  consent: false as unknown as true,
};

/** Homepage lead-capture form. Wired live to submitConsultationAction (Postgres) + WhatsApp handoff. */
export const ConsultationForm = () => {
  const [result, setResult] = useState<ActionState>(emptyState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async (values) => {
    setResult(emptyState);
    const response = await submitConsultationAction(values);
    setResult(response);
    if (response.status === 'success') {
      reset(defaultValues);
    }
  });

  return (
    <Section testId="home-consultation" tone="surface">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Book free consultation"
            subtitle="Tell us where you are today. Coach Samrat reads every submission personally — no sales team, no obligation."
            title="Start with a free 20-minute call"
          />
          <ol className="mt-8 space-y-4">
            {consultationSteps.map((step) => {
              const Icon = getIcon(step.icon);

              return (
                <li className="flex gap-4" data-testid={`consultation-step-${step.step}`} key={step.step}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slateink">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slateink-muted">{step.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <form
            className="rounded-3xl border border-hairline bg-canvas p-6 shadow-card sm:p-8"
            data-testid="home-consultation-form"
            noValidate
            onSubmit={onSubmit}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField error={errors.fullName?.message} htmlFor="hc-fullName" label="Full name" required>
                <Input
                  autoComplete="name"
                  data-testid="home-consultation-full-name"
                  id="hc-fullName"
                  placeholder="Anaya Rao"
                  {...register('fullName')}
                />
              </FormField>

              <FormField
                error={errors.phone?.message}
                hint="Used only to schedule your call."
                htmlFor="hc-phone"
                label="Phone / WhatsApp"
                required
              >
                <Input
                  autoComplete="tel"
                  data-testid="home-consultation-phone"
                  id="hc-phone"
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  type="tel"
                  {...register('phone')}
                />
              </FormField>

              <FormField error={errors.age?.message} htmlFor="hc-age" label="Age" required>
                <Input
                  data-testid="home-consultation-age"
                  id="hc-age"
                  inputMode="numeric"
                  max={95}
                  min={14}
                  placeholder="31"
                  type="number"
                  {...register('age')}
                />
              </FormField>

              <FormField error={errors.gender?.message} htmlFor="hc-gender" label="Gender" required>
                <Select data-testid="home-consultation-gender" id="hc-gender" {...register('gender')}>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField error={errors.goal?.message} htmlFor="hc-goal" label="Primary goal" required>
                <Select data-testid="home-consultation-goal" id="hc-goal" {...register('goal')}>
                  {goalOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField
                error={errors.profession?.message}
                htmlFor="hc-profession"
                label="Profession"
                required
              >
                <Input
                  data-testid="home-consultation-profession"
                  id="hc-profession"
                  placeholder="IT project manager"
                  {...register('profession')}
                />
              </FormField>

              <div className="sm:col-span-2">
                <FormField
                  error={errors.healthIssue?.message}
                  hint='Diagnosed conditions, medication, injuries. Write "None" if there are none.'
                  htmlFor="hc-healthIssue"
                  label="Health issue or medical history"
                  required
                >
                  <Textarea
                    data-testid="home-consultation-health-issue"
                    id="hc-healthIssue"
                    placeholder="PCOS with irregular cycles, currently under gynaecologist care..."
                    {...register('healthIssue')}
                  />
                </FormField>
              </div>

              <FormField error={errors.email?.message} htmlFor="hc-email" label="Email (optional)">
                <Input
                  autoComplete="email"
                  data-testid="home-consultation-email"
                  id="hc-email"
                  inputMode="email"
                  placeholder="you@example.com"
                  type="email"
                  {...register('email')}
                />
              </FormField>

              <FormField
                error={errors.programSlug?.message}
                hint="Leave on 'Not sure yet' and we will pick together."
                htmlFor="hc-program"
                label="Program of interest"
              >
                <Select data-testid="home-consultation-program" id="hc-program" {...register('programSlug')}>
                  <option value="">Not sure yet</option>
                  {programs.map((program) => (
                    <option key={program.slug} value={program.slug}>
                      {program.name}
                    </option>
                  ))}
                </Select>
              </FormField>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-hairline bg-surface-muted p-4">
              <input
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline accent-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
                data-testid="home-consultation-consent"
                id="hc-consent"
                type="checkbox"
                {...register('consent')}
              />
              <label className="text-xs leading-relaxed text-slateink-muted" htmlFor="hc-consent">
                I agree that my details may be used to contact me about coaching, as described in the{' '}
                <a
                  className="font-medium text-slateink underline decoration-hairline decoration-2 underline-offset-2 hover:decoration-accent"
                  href="/privacy-policy"
                >
                  privacy policy
                </a>
                . I understand coaching is not medical treatment.
              </label>
            </div>
            {errors.consent?.message ? (
              <p className="mt-2 text-xs font-medium text-[#c2413a]" role="alert">
                {errors.consent.message}
              </p>
            ) : null}

            <Button
              className="mt-7 w-full"
              data-testid="home-consultation-submit"
              disabled={isSubmitting}
              size="lg"
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                  Sending request
                </>
              ) : (
                'Request my free consultation'
              )}
            </Button>

            {result.status !== 'idle' ? (
              <div
                className={
                  result.status === 'success'
                    ? 'mt-5 rounded-2xl border border-hairline bg-[#E7F7F2] p-4'
                    : 'mt-5 rounded-2xl border border-hairline bg-[#FDECEC] p-4'
                }
                data-testid={`home-consultation-${result.status}-message`}
                role="status"
              >
                <div className="flex items-start gap-3">
                  {result.status === 'success' ? (
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1F9D7A]" />
                  ) : (
                    <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#c2413a]" />
                  )}
                  <p className="text-sm leading-relaxed text-slateink">{result.message}</p>
                </div>

                {result.status === 'success' && result.whatsappUrl ? (
                  <div className="mt-4">
                    <p className="text-xs leading-relaxed text-slateink-muted">
                      Want an answer sooner? Send the same details straight to WhatsApp — the message is
                      already written for you.
                    </p>
                    <ButtonLink
                      className="mt-3"
                      data-testid="home-consultation-whatsapp-link"
                      href={result.whatsappUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      variant="secondary"
                    >
                      <MessageCircle aria-hidden="true" className="h-4 w-4 text-accent" />
                      Continue on WhatsApp
                    </ButtonLink>
                  </div>
                ) : null}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </Section>
  );
};
