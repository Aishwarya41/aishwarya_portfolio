
"use client";

import { useState } from "react";
import Script from "next/script";
import { Card } from "./Card";
import { Section } from "./Section";
import { contactSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { btnPrimary, btnSecondary } from "@/lib/ui";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

// Cloudflare's documented always-passes test key, so the form works locally
// before you have an account. Production refuses to send without a real one.
const TEST_SITE_KEY = "1x00000000000000000000AA";
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TEST_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { reset: (container?: string | HTMLElement) => void };
  }
}

const fieldClass =
  "bg-surface-alt border-ink-line text-ink placeholder:text-muted w-full border-2 px-3 py-2.5 text-[13px] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-fill";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    // Turnstile injects this hidden field into the surrounding form.
    const turnstileToken = String(
      formData.get("cf-turnstile-response") ?? "",
    );
    const data = Object.fromEntries(formData);

    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name" || key === "email" || key === "message") {
          next[key] ??= issue.message;
        }
      }
      setErrors(next);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, turnstileToken }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      // Turnstile tokens are single-use, so a second message needs a fresh one.
      window.turnstile?.reset();
    }
  }

  return (
    <Section id="contact" icon="mail" title="CONTACT">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <Card className="flex flex-col gap-5 p-7">
        <p className="text-body text-sm leading-[1.7]">{site.contactBlurb}</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-muted text-[11px] uppercase">
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jordan Lee"
              className={fieldClass}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              onChange={() => setErrors((e) => ({ ...e, name: undefined }))}
            />
            {errors.name && (
              <p id="name-error" className="text-accent-text text-[11px]">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-muted text-[11px] uppercase">
              Your email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              className={fieldClass}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              onChange={() => setErrors((e) => ({ ...e, email: undefined }))}
            />
            {errors.email && (
              <p id="email-error" className="text-accent-text text-[11px]">
                {errors.email}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="text-muted text-[11px] uppercase"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="What are you working on?"
              className={fieldClass}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
              onChange={() => setErrors((e) => ({ ...e, message: undefined }))}
            />
            {errors.message && (
              <p id="message-error" className="text-accent-text text-[11px]">
                {errors.message}
              </p>
            )}
          </div>

          {/* Honeypot — hidden from people, irresistible to bots. */}
          <div aria-hidden="true" className="absolute left-[-9999px]">
            <label htmlFor="website">Leave this field empty</label>
            <input id="website" name="website" type="text" tabIndex={-1} />
          </div>

          {/* Cloudflare Turnstile. Usually resolves without the visitor doing
              anything; it injects a cf-turnstile-response field into this form. */}
          <div
            className="cf-turnstile"
            data-sitekey={SITE_KEY}
            data-theme="light"
          />

          <div className="flex flex-wrap items-center gap-3.5">
            <button
              type="submit"
              disabled={status === "sending"}
              className={btnPrimary}
            >
              {status === "sending" ? "SENDING…" : "SEND MESSAGE"}
            </button>

            <p aria-live="polite" className="text-[12px]">
              {status === "sent" && (
                <span className="text-body">Thanks! Message sent.</span>
              )}
              {status === "error" && (
                <span className="text-accent-text">
                  That didn&apos;t go through. Email me directly instead.
                </span>
              )}
            </p>
          </div>
        </form>

        <div className="border-ink-line flex flex-wrap gap-3.5 border-t-2 pt-5">
          <a href={`mailto:${site.email}`} className={btnSecondary}>
            EMAIL ME
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={btnSecondary}
          >
            LINKEDIN ↗
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={btnSecondary}
          >
            GITHUB ↗
          </a>
        </div>
      </Card>
    </Section>
  );
}
