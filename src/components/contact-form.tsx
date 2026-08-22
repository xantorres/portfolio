"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Turnstile } from "@/components/turnstile";
import { requestFormToken, sendContact } from "@/lib/contact-action";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.email("Enter a valid email"),
  company: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(10, "At least 10 characters").max(5_000),
});

type FormValues = z.infer<typeof FormSchema>;

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  // Server-signed time anchor used by the fill-time gate. Prefetched on mount so
  // a typical submit pays no extra round-trip; falls back to a fresh fetch if the
  // user submits before prefetch completes.
  const [formToken, setFormToken] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    requestFormToken().then((token) => {
      if (!cancelled) setFormToken(token);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  const needsCaptcha = TURNSTILE_SITE_KEY.length > 0;

  const onSubmit = (values: FormValues) => {
    if (needsCaptcha && !turnstileToken) {
      toast.error("Please complete the captcha.");
      return;
    }
    startTransition(async () => {
      const token = formToken ?? (await requestFormToken());
      const res = await sendContact({
        ...values,
        website: honeypot,
        formToken: token,
        turnstileToken: turnstileToken ?? undefined,
      });
      if (res.ok) {
        toast.success("Message sent", { description: "Reply within 48 hours." });
        reset();
        setHoneypot("");
        setTurnstileToken(null);
        // Burn the consumed token; the next mount-effect prefetch already fired off
        // the replacement promise on the previous render.
        setFormToken(null);
        requestFormToken().then(setFormToken);
      } else {
        toast.error(res.error ?? "Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
      {/* Honeypot: hidden from users, named so naive form-fill bots take the bait. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="url"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="company">
          Company <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input id="company" autoComplete="organization" {...register("company")} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={6}
          placeholder="What are you building, what is stuck, and by when?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="min-h-[140px]"
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>

      {needsCaptcha && (
        <div className="pt-1">
          <Turnstile
            siteKey={TURNSTILE_SITE_KEY}
            onVerify={setTurnstileToken}
            onExpire={() => setTurnstileToken(null)}
          />
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta-label">
          I read every message · Reply within 48h · CET/EET
        </p>
        <Button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          size="lg"
        >
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send className="size-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
