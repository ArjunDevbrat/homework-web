'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input, Textarea } from '@/components/ui/input';
import { submitContactAction } from '@/lib/actions';
import { contactSchema, type ContactInput } from '@/lib/validations';
import type { ActionState } from '@/types';

const emptyState: ActionState = { status: 'idle', message: '' };

export const ContactForm = () => {
  const [result, setResult] = useState<ActionState>(emptyState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: '', email: '', subject: '', message: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setResult(emptyState);
    const response = await submitContactAction(values);
    setResult(response);

    if (response.status === 'success') {
      reset();
    }
  });

  return (
    <form
      className="rounded-3xl border border-hairline bg-surface-muted p-6 sm:p-8"
      data-testid="contact-form"
      noValidate
      onSubmit={onSubmit}
    >
      <h2 className="text-xl font-semibold text-slateink">Ask a general question</h2>
      <p className="mt-2 text-sm leading-relaxed text-slateink-muted">
        Not ready for a call? Send a question about programs, pricing or suitability.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <FormField error={errors.fullName?.message} htmlFor="contact-name" label="Full name" required>
          <Input
            autoComplete="name"
            data-testid="contact-form-full-name"
            id="contact-name"
            placeholder="Karthik S"
            {...register('fullName')}
          />
        </FormField>

        <FormField error={errors.email?.message} htmlFor="contact-email" label="Email" required>
          <Input
            autoComplete="email"
            data-testid="contact-form-email"
            id="contact-email"
            inputMode="email"
            placeholder="you@example.com"
            type="email"
            {...register('email')}
          />
        </FormField>

        <div className="sm:col-span-2">
          <FormField error={errors.subject?.message} htmlFor="contact-subject" label="Subject" required>
            <Input
              data-testid="contact-form-subject"
              id="contact-subject"
              placeholder="Is the Clinical Care Track right for prediabetes?"
              {...register('subject')}
            />
          </FormField>
        </div>

        <div className="sm:col-span-2">
          <FormField error={errors.message?.message} htmlFor="contact-message" label="Message" required>
            <Textarea
              data-testid="contact-form-message"
              id="contact-message"
              placeholder="Tell me a little about your situation..."
              {...register('message')}
            />
          </FormField>
        </div>
      </div>

      <Button
        className="mt-7 w-full"
        data-testid="contact-form-submit"
        disabled={isSubmitting}
        size="lg"
        type="submit"
        variant="secondary"
      >
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            Sending message
          </>
        ) : (
          'Send message'
        )}
      </Button>

      {result.status !== 'idle' ? (
        <div
          className={
            result.status === 'success'
              ? 'mt-5 flex items-start gap-3 rounded-2xl border border-hairline bg-[#E7F7F2] p-4'
              : 'mt-5 flex items-start gap-3 rounded-2xl border border-hairline bg-[#FDECEC] p-4'
          }
          data-testid={`contact-form-${result.status}-message`}
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
