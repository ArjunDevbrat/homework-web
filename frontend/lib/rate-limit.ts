/**
 * Minimal in-memory fixed-window rate limiter for Server Actions.
 *
 * Scope: a single Next.js server process. This is intentionally dependency-free and
 * good enough to stop casual form spam in preview and single-instance deployments.
 * For multi-instance production, swap the store for Upstash/Redis behind this same API.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const store = new Map<string, Bucket>();

export type RateLimitResult = {
  readonly allowed: boolean;
  readonly retryAfterSeconds: number;
};

/**
 * Records a hit for `key` and reports whether it is within the allowed window.
 *
 * @param key       Unique bucket key, e.g. `consultation:<ip>`.
 * @param limit     Max allowed hits per window (default 5).
 * @param windowMs  Window length in milliseconds (default 10 minutes).
 */
export function checkRateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): RateLimitResult {
  const now = Date.now();

  // Opportunistic prune so the map cannot grow unbounded.
  if (store.size > 5000) {
    for (const [k, bucket] of store) {
      if (now >= bucket.resetAt) {
        store.delete(k);
      }
    }
  }

  const existing = store.get(key);

  if (!existing || now >= existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
