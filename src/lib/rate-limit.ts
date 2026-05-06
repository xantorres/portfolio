import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

function buildLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "rl:contact",
  });
}

let cachedLimiter: Ratelimit | null | undefined;

function getLimiter(): Ratelimit | null {
  if (cachedLimiter === undefined) cachedLimiter = buildLimiter();
  return cachedLimiter;
}

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSec: number };

export async function rateLimit(key: string): Promise<RateLimitResult> {
  const limiter = getLimiter();
  if (limiter === null) return { ok: true }; // Not configured, allow silently.

  const { success, reset } = await limiter.limit(key);
  if (success) return { ok: true };
  return { ok: false, retryAfterSec: Math.max(1, Math.ceil((reset - Date.now()) / 1000)) };
}
