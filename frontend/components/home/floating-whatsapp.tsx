import { MessageCircle } from 'lucide-react';

import { siteConfig } from '@/lib/data';

const waDigits = siteConfig.whatsappNumber.replace(/\D/g, '');
const message = encodeURIComponent(
  `Hi Coach Samrat, I would like to know more about ${siteConfig.name} coaching.`,
);
const href = waDigits.length > 0 ? `https://wa.me/${waDigits}?text=${message}` : `https://wa.me/?text=${message}`;

/** Fixed bottom-right WhatsApp action button. */
export const FloatingWhatsApp = () => (
  <a
    aria-label="Chat with HOMEWORK on WhatsApp"
    className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-slateink shadow-cta transition-[transform,background-color,color] duration-200 hover:scale-105 hover:bg-accent-hover hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring sm:bottom-6 sm:right-6"
    data-testid="floating-whatsapp"
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    <MessageCircle aria-hidden="true" className="h-5 w-5" />
    <span className="hidden sm:inline">Chat on WhatsApp</span>
  </a>
);
