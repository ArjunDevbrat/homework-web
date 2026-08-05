import { Instagram, Mail, Youtube } from 'lucide-react';

import { siteConfig } from '@/lib/data';

const icons = { instagram: Instagram, youtube: Youtube } as const;

export const ContactChannels = () => (
  <div className="rounded-3xl border border-hairline bg-surface p-6 shadow-card" data-testid="contact-channels">
    <h2 className="text-base font-semibold text-slateink">Other ways to reach me</h2>

    <ul className="mt-5 flex flex-col gap-3">
      <li>
        <a
          className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface-muted px-4 py-3 transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
          data-testid="contact-channel-email"
          href={`mailto:${siteConfig.email}`}
        >
          <Mail aria-hidden="true" className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-slateink">{siteConfig.email}</span>
        </a>
      </li>
      {siteConfig.socials.map((social) => {
        const Icon = icons[social.platform];

        return (
          <li key={social.href}>
            <a
              className="flex items-center gap-3 rounded-2xl border border-hairline bg-surface-muted px-4 py-3 transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
              data-testid={`contact-channel-${social.platform}`}
              href={social.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon aria-hidden="true" className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-slateink">{social.handle}</span>
            </a>
          </li>
        );
      })}
    </ul>

    <p className="mt-5 text-xs leading-relaxed text-slateink-soft">
      Weekday replies within 24 hours. For anything urgent and medical, please contact your physician
      directly.
    </p>
  </div>
);
