"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const MIN_FILL_MS = 2_000;

// Disallow header-injection characters in fields that feed into the email subject/body envelope.
const noControlChars = z
  .string()
  .regex(/^[^\r\n]*$/, "Invalid characters")
  .trim();

const ContactSchema = z.object({
  name: noControlChars.min(1, "Name is required").max(120),
  email: z.email("Enter a valid email"),
  company: noControlChars.max(200).optional().or(z.literal("")),
  message: z.string().min(10, "At least 10 characters").max(5000),
  // Spam controls.
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
  startedAt: z.number().int().positive(),
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

export async function sendContact(input: ContactInput): Promise<ContactResult> {
  const parsed = ContactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { name, email, company, message, website, startedAt, turnstileToken } = parsed.data;

  // Honeypot: silently succeed. Never tell the bot why it failed.
  if (website && website.length > 0) {
    console.warn("[contact] honeypot tripped");
    return { ok: true };
  }

  // Time check: humans take >2s to fill a form.
  if (Date.now() - startedAt < MIN_FILL_MS) {
    console.warn("[contact] sub-threshold fill time");
    return { ok: true };
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
  if (!to) {
    console.error("[contact] CONTACT_TO_EMAIL is required when RESEND_API_KEY is set");
    return { ok: false, error: "Contact not configured. Please email directly." };
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

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
