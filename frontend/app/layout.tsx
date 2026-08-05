import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { siteConfig } from '@/lib/data';
import { absoluteUrl } from '@/lib/utils';

import './globals.css';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const sans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.coachName }],
  creator: siteConfig.coachName,
  keywords: [
    'nutrition coach India',
    'evidence based fat loss coaching',
    'PCOS nutrition coach',
    'diabetes lifestyle coaching',
    'online strength coach',
    'Coach Samrat Aryan',
  ],
  alternates: { canonical: absoluteUrl('/') },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: absoluteUrl('/'),
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  category: 'health',
};

export const viewport: Viewport = {
  themeColor: '#F8FCFD',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  email: siteConfig.email,
  url: siteConfig.url,
  founder: {
    '@type': 'Person',
    name: siteConfig.coachName,
    jobTitle: 'Nutrition & Strength Coach',
  },
  sameAs: siteConfig.socials.map((social) => social.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${sans.variable} ${display.variable}`} lang="en">
      <body className="min-h-dvh bg-canvas font-sans text-slateink antialiased">
        <a
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:border focus:border-hairline focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
          href="#main-content"
        >
          Skip to content
        </a>

        <Header />
        <main id="main-content">{children}</main>
        <Footer />

        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
