import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

// Bumped intentionally on any schema or signing change so older tokens stop validating.
const TOKEN_VERSION = "v1";

const SECRET = resolveSecret();

function resolveSecret(): string {
  const fromEnv = process.env.CONTACT_TOKEN_SECRET;
  if (fromEnv && fromEnv.length >= 16) return fromEnv;
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "[form-token] CONTACT_TOKEN_SECRET is missing or shorter than 16 chars in production. Rotate it before launch.",
    );
  }
  // Stable, well-known fallback so dev environments stay reproducible without env config.
  return "portfolio-contact-form-dev-fallback";
}

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("base64url");
}

export function mintFormToken(now: number = Date.now()): string {
  const payload = `${TOKEN_VERSION}.${now}`;
  return `${payload}.${sign(payload)}`;
}

export type VerifiedToken = { issuedAt: number };

export function verifyFormToken(token: string): VerifiedToken | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [version, issuedAtStr, signature] = parts;
  if (version !== TOKEN_VERSION) return null;

  const issuedAt = Number(issuedAtStr);
  if (!Number.isFinite(issuedAt) || issuedAt <= 0) return null;

  const expected = sign(`${version}.${issuedAtStr}`);
  const actualBuf = Buffer.from(signature, "base64url");
  const expectedBuf = Buffer.from(expected, "base64url");
  if (actualBuf.length !== expectedBuf.length) return null;
  if (!timingSafeEqual(actualBuf, expectedBuf)) return null;

  return { issuedAt };
}
