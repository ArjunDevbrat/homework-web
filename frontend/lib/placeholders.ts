/**
 * Fallback assets.
 *
 * Content in lib/data.ts may legitimately have no image, video or downloadable file yet
 * (for example a client who has not consented to a photo). Rather than rendering a broken
 * element, consumers resolve through these helpers so every surface always has something
 * valid to show.
 */

export const FALLBACK_PORTRAIT_IMAGE =
  'https://images.unsplash.com/photo-1595886509089-b691b210fc5c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000';

export const FALLBACK_TESTIMONIAL_IMAGE =
  'https://images.pexels.com/photos/5714504/pexels-photo-5714504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

export const FALLBACK_RESOURCE_IMAGE =
  'https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000';

/** Returns the given image URL, or a safe branded fallback when it is missing. */
export function resolveImageUrl(url: string | null | undefined, fallback = FALLBACK_RESOURCE_IMAGE): string {
  if (typeof url === 'string' && url.trim().length > 0) {
    return url;
  }
  return fallback;
}

/** Returns a playable video URL, or null so callers can render a non-video fallback. */
export function resolveVideoUrl(url: string | null | undefined): string | null {
  if (typeof url === 'string' && url.trim().length > 0) {
    return url;
  }
  return null;
}

/** Returns a download URL, or null when the asset has not been uploaded yet. */
export function resolveFileUrl(url: string | null | undefined): string | null {
  if (typeof url === 'string' && url.trim().length > 0) {
    return url;
  }
  return null;
}
