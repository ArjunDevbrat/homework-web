'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, MessageCircle, TriangleAlert } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, ButtonLink } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input, Select, Textarea } from '@/components/ui/input';
import { submitConsultationAction } from '@/lib/actions';
import { genderOptions, goalOptions, programs } from '@/lib/data';
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

export const ConsultationForm = () => {
  const searchParams = useSearchParams();
  const preselectedProgram = searchParams.get('program') ?? '';
  const [result, setResult] = useState<ActionState>(emptyState);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationInput>({
    resolver: zodResolver(consultationSchema),
    defaultValues,
  });

  useEffect(() => {
    if (preselectedProgram && programs.some((program) => program.slug === preselectedProgram)) {
      setValue('programSlug', preselectedProgram);
    }
  }, [preselectedProgram, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setResult(emptyState);
    const response = await submitConsultationAction(values);
    setResult(response);

    if (response.status === 'success') {
      reset(defaultValues);
    }
  });

  return (
    <form
      className="rounded-3xl border border-hairline bg-surface p-6 shadow-card sm:p-8"
      data-testid="consultation-form"
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
            data-testid="consultation-full-name"
            id="fullName"
            placeholder="Anaya Rao"
            {...register('fullName')}
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
            data-testid="consultation-phone"
            id="phone"
            inputMode="tel"
            placeholder="+91 98765 43210"
            type="tel"
            {...register('phone')}
          />
        </FormField>

        <FormField error={errors.age?.message} htmlFor="age" label="Age" required>
          <Input
            data-testid="consultation-age"
            id="age"
            inputMode="numeric"
            max={95}
            min={14}
            placeholder="31"
            type="number"
            {...register('age')}
          />
        </FormField>

        <FormField error={errors.gender?.message} htmlFor="gender" label="Gender" required>
          <Select data-testid="consultation-gender" id="gender" {...register('gender')}>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField error={errors.goal?.message} htmlFor="goal" label="Primary goal" required>
          <Select data-testid="consultation-goal" id="goal" {...register('goal')}>
            {goalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField error={errors.profession?.message} htmlFor="profession" label="Profession" required>
          <Input
            data-testid="consultation-profession"
            id="profession"
            placeholder="IT project manager"
            {...register('profession')}
          />
        </FormField>

        <div className="sm:col-span-2">
          <FormField
            error={errors.healthIssue?.message}
            hint='Diagnosed conditions, medication, injuries. Write "None" if there are none.'
            htmlFor="healthIssue"
            label="Health issue or medical history"
            required
          >
            <Textarea
              data-testid="consultation-health-issue"
              id="healthIssue"
              placeholder="PCOS with irregular cycles, currently under gynaecologist care..."
              {...register('healthIssue')}
            />
          </FormField>
        </div>

        <FormField error={errors.email?.message} htmlFor="email" label="Email (optional)">
          <Input
            autoComplete="email"
            data-testid="consultation-email"
            id="email"
            inputMode="email"
            placeholder="you@example.com"
            type="email"
            {...register('email')}
          />
        </FormField>

        <FormField
          error={errors.programSlug?.message}
          hint="Leave on 'Not sure yet' and we will pick together on the call."
          htmlFor="programSlug"
          label="Program of interest"
        >
          <Select data-testid="consultation-program" id="programSlug" {...register('programSlug')}>
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
          data-testid="consultation-consent"
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
        data-testid="consultation-submit"
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
          data-testid={`consultation-${result.status}-message`}
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
                Want an answer sooner? Send the same details straight to WhatsApp — the message is already
                written for you.
              </p>
              <ButtonLink
                className="mt-3"
                data-testid="consultation-whatsapp-link"
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
  );
};
