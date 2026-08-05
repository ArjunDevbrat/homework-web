import { Instagram, Mail, Youtube } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/ui/container';
import { credentials, legalNav, primaryNav, siteConfig } from '@/lib/data';

const socialIcons = {
  instagram: Instagram,
  youtube: Youtube,
} as const;

export const Footer = () => (
  <footer className="border-t border-hairline bg-surface" data-testid="site-footer">
    <Container className="py-14 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-lg font-bold uppercase tracking-[0.2em] text-slateink">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slateink-muted">{siteConfig.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {credentials.map((credential) => (
              <li
                className="rounded-full border border-hairline bg-surface-muted px-3 py-1 text-xs font-semibold text-slateink"
                key={credential.abbreviation}
                title={credential.title}
              >
                {credential.title}
              </li>
            ))}
          </ul>

          <a
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slateink underline decoration-hairline decoration-2 underline-offset-4 transition-colors duration-200 hover:decoration-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
            data-testid="site-footer-email-link"
            href={`mailto:${siteConfig.email}`}
          >
            <Mail aria-hidden="true" className="h-4 w-4 text-accent" />
            {siteConfig.email}
          </a>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slateink-soft">Explore</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-sm text-slateink-muted transition-colors duration-200 hover:text-slateink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
                  data-testid={`site-footer-nav-${item.href === '/' ? 'home' : item.href.replace('/', '')}`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slateink-soft">Legal</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-sm text-slateink-muted transition-colors duration-200 hover:text-slateink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
                  data-testid={`site-footer-${item.href.replace('/', '')}-link`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slateink-soft">Follow</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {siteConfig.socials.map((social) => {
              const Icon = socialIcons[social.platform];

              return (
                <li key={social.href}>
                  <a
                    className="inline-flex items-center gap-2 text-sm text-slateink-muted transition-colors duration-200 hover:text-slateink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-ring"
                    data-testid={`site-footer-${social.platform}-link`}
                    href={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4 text-accent" />
                    {social.handle}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slateink-soft">
          &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
        </p>
        <p className="max-w-xl text-xs leading-relaxed text-slateink-soft">
          Coaching is nutrition and lifestyle education, not medical treatment. Always consult your physician
          before changing medication or starting a new program.
        </p>
      </div>
    </Container>
  </footer>
);
