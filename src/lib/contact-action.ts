"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { mintFormToken, verifyFormToken } from "@/lib/form-token";
import { rateLimit } from "@/lib/rate-limit";

const MIN_FILL_MS = 2_000;
// Tokens minted more than this many ms ago are stale and rejected.
const MAX_TOKEN_AGE_MS = 24 * 60 * 60 * 1_000;

// Disallow header-injection characters in fields that feed into the email subject/body envelope.
// Trim first so leading/trailing whitespace doesn't trip the no-newline regex.
const noControlChars = z
  .string()
  .trim()
  .regex(/^[^\r\n]*$/, "Invalid characters");

const ContactSchema = z.object({
  name: noControlChars.min(1, "Name is required").max(120),
  email: z.email("Enter a valid email"),
  company: noControlChars.max(200).optional().or(z.literal("")),
  message: z.string().trim().min(10, "At least 10 characters").max(5_000),
  // Spam controls.
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
  formToken: z.string().min(1, "Missing form token"),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof ContactSchema>;

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<string, string[]>> };

async function resolveClientIp(): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("cf-connecting-ip") ?? h.get("x-real-ip") ?? "anonymous";
}

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not configured, skip silently.
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("[contact] Turnstile verify failed:", err);
    return false;
  }
}

// Public helper the client form calls on mount to obtain a fresh, server-signed token.
// Each visit gets its own token whose `issuedAt` is the only thing the server trusts
// when computing the fill-time gate.
export async function requestFormToken(): Promise<string> {
  return mintFormToken();
}

export async function sendContact(input: ContactInput): Promise<ContactResult> {
  const parsed = ContactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { name, email, company, message, website, formToken, turnstileToken } = parsed.data;

  // Honeypot: silently succeed. Never tell the bot why it failed.
  if (website && website.length > 0) {
    console.warn("[contact] honeypot tripped");
    return { ok: true };
  }

  // Verify the server-signed time anchor. Forged tokens fail HMAC and look like a bot.
  const verified = verifyFormToken(formToken);
  if (!verified) {
    console.warn("[contact] invalid form token");
    return { ok: true };
  }

  const age = Date.now() - verified.issuedAt;
  // Sub-threshold fill time: humans take longer than MIN_FILL_MS from token mint to submit.
  if (age < MIN_FILL_MS) {
    console.warn("[contact] sub-threshold fill time");
    return { ok: true };
  }
  // Stale token: page sat open too long. Refuse rather than accept; the client can re-mint.
  if (age > MAX_TOKEN_AGE_MS) {
    return { ok: false, error: "Form expired. Please reload and try again." };
  }

  const captchaOk = await verifyTurnstile(turnstileToken);
  if (!captchaOk) {
    return { ok: false, error: "Captcha verification failed. Please reload and try again." };
  }

  const ip = await resolveClientIp();
  const rl = await rateLimit(ip);
  if (!rl.ok) {
    const mins = Math.ceil(rl.retryAfterSec / 60);
    return {
      ok: false,
      error: `Too many requests. Please try again in about ${mins} minute${mins === 1 ? "" : "s"}.`,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Local/dev mode: no email delivery configured. Log and pretend success.
    console.info("[contact] RESEND_API_KEY not set, submission logged:", {
      from: email,
      name,
      company,
      message,
    });
    return { ok: true };
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!to || !from) {
    console.error(
      "[contact] RESEND_API_KEY set but CONTACT_TO_EMAIL or RESEND_FROM_EMAIL missing; refusing to send from a default sender.",
    );
    return { ok: false, error: "Contact not configured. Please email directly." };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio contact · ${name}${company ? ` · ${company}` : ""}`,
      text: `From: ${name} <${email}>\nCompany: ${company || "n/a"}\n\n${message}`,
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return { ok: false, error: "Could not send right now. Try again or email directly." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] Exception:", err);
    return { ok: false, error: "Unexpected error. Please email directly." };
  }
}
