import type { MetadataRoute } from 'next';

import { legalNav, primaryNav } from '@/lib/data';
import { absoluteUrl } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-01-01');

  return [...primaryNav, ...legalNav].map((item) => ({
    url: absoluteUrl(item.href),
    lastModified,
    changeFrequency: item.href === '/' ? 'weekly' : 'monthly',
    priority: item.href === '/' ? 1 : 0.7,
  }));
}
