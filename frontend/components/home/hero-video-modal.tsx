'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { PlayCircle, X } from 'lucide-react';
import type { ReactNode } from 'react';

import { ButtonLink } from '@/components/ui/button';

type HeroVideoModalProps = {
  readonly children: ReactNode;
};

/**
 * Wraps a trigger element in a Radix Dialog that shows a branded CSS placeholder
 * for the coaching walkthrough video. The real video is wired later once a URL is
 * available (coachProfile.introVideoUrl is currently null).
 */
export const HeroVideoModal = ({ children }: HeroVideoModalProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{children}</Dialog.Trigger>

    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-slateink/40 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in" />
      <Dialog.Content
        className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-hairline bg-surface p-3 shadow-card-hover data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in"
        data-testid="home-hero-video-modal"
      >
        <div className="flex items-center justify-between px-3 pb-3 pt-2">
          <Dialog.Title className="text-sm font-semibold text-slateink">How we work</Dialog.Title>
          <Dialog.Close
            aria-label="Close video"
            className="grid h-9 w-9 place-items-center rounded-xl border border-hairline bg-surface text-slateink transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
            data-testid="home-hero-video-modal-close"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </Dialog.Close>
        </div>

        <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-surface-muted text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(520px circle at 50% 40%, rgba(34,184,207,0.16), transparent 60%)',
            }}
          />
          <span className="relative grid h-16 w-16 place-items-center rounded-full bg-accent-soft text-accent">
            <PlayCircle aria-hidden="true" className="h-8 w-8" />
          </span>
          <p className="relative mt-4 text-base font-semibold text-slateink">
            Coaching walkthrough coming soon
          </p>
          <p className="relative mt-1 max-w-sm px-6 text-sm text-slateink-muted">
            A full video tour of how HOMEWORK coaching runs is on its way. In the meantime, book a free
            consultation to see the method live.
          </p>
          <ButtonLink className="relative mt-5" href="/contact" size="md">
            Book Free Consultation
          </ButtonLink>
        </div>

        <Dialog.Description className="sr-only">
          Placeholder for the HOMEWORK coaching walkthrough video.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
