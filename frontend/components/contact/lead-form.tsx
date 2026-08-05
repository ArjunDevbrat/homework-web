'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, TriangleAlert } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input, Select, Textarea } from '@/components/ui/input';
import { submitLeadAction } from '@/lib/actions';
import { goalOptions, programs } from '@/lib/data';
import { leadSchema, type LeadInput } from '@/lib/validations';
import type { ActionState } from '@/types';

const emptyState: ActionState = { status: 'idle', message: '' };

export const LeadForm = () => {
  const searchParams = useSearchParams();
  const preselectedProgram = searchParams.get('program') ?? '';
  const [result, setResult] = useState<ActionState>(emptyState);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      goal: 'FAT_LOSS',
      programSlug: '',
      notes: '',
      consent: false as unknown as true,
    },
  });

  useEffect(() => {
    if (preselectedProgram && programs.some((program) => program.slug === preselectedProgram)) {
      setValue('programSlug', preselectedProgram);
    }
  }, [preselectedProgram, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setResult(emptyState);
    const response = await submitLeadAction(values);
    setResult(response);

    if (response.status === 'success') {
      reset({
        fullName: '',
        email: '',
        phone: '',
        goal: 'FAT_LOSS',
        programSlug: '',
        notes: '',
        consent: false as unknown as true,
      });
    }
  });

  return (
    <form
      className="rounded-3xl border border-hairline bg-surface p-6 shadow-card sm:p-8"
      data-testid="lead-form"
      noValidate
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-semibold text-slateink">Book your free consultation</h2>
      <p className="mt-2 text-sm leading-relaxed text-slateink-muted">
        A 20-minute call, no obligation. Coach Samrat reads every submission personally.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <FormField error={errors.fullName?.message} htmlFor="fullName" label="Full name" required>
          <Input
            autoComplete="name"
            data-testid="lead-form-full-name"
            id="fullName"
            placeholder="Anaya Rao"
            {...register('fullName')}
          />
        </FormField>

        <FormField error={errors.email?.message} htmlFor="email" label="Email" required>
          <Input
            autoComplete="email"
            data-testid="lead-form-email"
            id="email"
            inputMode="email"
            placeholder="you@example.com"
            type="email"
            {...register('email')}
          />
        </FormField>

        <FormField
          error={errors.phone?.message}
          hint="Used only to schedule your call."
          htmlFor="phone"
          label="Phone / WhatsApp"
          required
        >
          <Input
            autoComplete="tel"
            data-testid="lead-form-phone"
            id="phone"
            inputMode="tel"
            placeholder="+91 98765 43210"
            type="tel"
            {...register('phone')}
          />
        </FormField>

        <FormField error={errors.goal?.message} htmlFor="goal" label="Primary goal" required>
          <Select data-testid="lead-form-goal" id="goal" {...register('goal')}>
            {goalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <div className="sm:col-span-2">
          <FormField
            error={errors.programSlug?.message}
            hint="Optional — leave it on 'Not sure yet' and we will pick together on the call."
            htmlFor="programSlug"
            label="Program of interest"
          >
            <Select data-testid="lead-form-program" id="programSlug" {...register('programSlug')}>
              <option value="">Not sure yet</option>
              {programs.map((program) => (
                <option key={program.slug} value={program.slug}>
                  {program.name} — {program.durationWeeks} weeks
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <div className="sm:col-span-2">
          <FormField
            error={errors.notes?.message}
            hint="Medical history, past attempts, schedule constraints — anything that helps."
            htmlFor="notes"
            label="Anything I should know?"
          >
            <Textarea
              data-testid="lead-form-notes"
              id="notes"
              placeholder="I work night shifts and have been diagnosed with PCOS..."
              {...register('notes')}
            />
          </FormField>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-hairline bg-surface-muted p-4">
        <input
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline text-accent accent-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
          data-testid="lead-form-consent"
          id="consent"
          type="checkbox"
          {...register('consent')}
        />
        <label className="text-xs leading-relaxed text-slateink-muted" htmlFor="consent">
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
        data-testid="lead-form-submit"
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
              ? 'mt-5 flex items-start gap-3 rounded-2xl border border-hairline bg-[#E7F7F2] p-4'
              : 'mt-5 flex items-start gap-3 rounded-2xl border border-hairline bg-[#FDECEC] p-4'
          }
          data-testid={`lead-form-${result.status}-message`}
          role="status"
        >
          {result.status === 'success' ? (
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#1F9D7A]" />
          ) : (
            <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#c2413a]" />
          )}
          <p className="text-sm leading-relaxed text-slateink">{result.message}</p>
        </div>
      ) : null}
    </form>
  );
};
