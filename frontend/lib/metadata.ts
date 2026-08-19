import type { Metadata } from 'next';

import { siteConfig } from '@/lib/data';
import { absoluteUrl, FALLBACK_PORTRAIT_IMAGE } from '@/lib/utils';

type PageMetadataInput = {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly keywords?: readonly string[];
};

/** Builds consistent, SEO-complete metadata for every route. */
export function buildPageMetadata({ title, description, path, keywords }: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      images: [{ url: FALLBACK_PORTRAIT_IMAGE, alt: `${title} | ${siteConfig.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [FALLBACK_PORTRAIT_IMAGE],
    },
  };
}
