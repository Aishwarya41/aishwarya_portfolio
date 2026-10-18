import { Resend } from "resend";
import { contactSchema } from "@/lib/schema";
import { site } from "@/content/site";

// Crude in-memory rate limit. Resets whenever the server process does, which
// is fine for a portfolio — it exists to stop a bot hammering the endpoint,
// not to be authoritative.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

/**
 * Browsers always send Origin on a cross-origin POST, and fetch sends it for
 * same-origin POSTs too — so a request without one is not coming from the
 * form. This rejects casual scripted posting; it is not a defence against
 * someone who bothers to set the header.
 */
function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Verifies the Turnstile token with Cloudflare. */
async function passesTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      // Fail closed. Silently accepting everything in production would be a
      // worse outcome than a visibly broken form.
      console.error("TURNSTILE_SECRET_KEY is not set — refusing to send.");
      return false;
    }
    console.warn("TURNSTILE_SECRET_KEY is not set — skipping check (dev only).");
    return true;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };
    if (!data.success) {
      console.warn("Turnstile rejected a submission:", data["error-codes"]);
    }
    return data.success;
  } catch (err) {
    console.error("Turnstile verification failed to run:", err);
    return false;
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!isSameOrigin(request)) {
    return Response.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many messages. Try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Check the form and try again." },
      { status: 400 },
    );
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot tripped: look successful, send nothing.
  if (website) return Response.json({ ok: true });

  const token =
    typeof (body as { turnstileToken?: unknown })?.turnstileToken === "string"
      ? (body as { turnstileToken: string }).turnstileToken
      : "";

  if (!(await passesTurnstile(token, ip))) {
    return Response.json(
      { ok: false, error: "Could not verify that you're human." },
      { status: 403 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send.");
    return Response.json(
      { ok: false, error: "Mail is not configured." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // Swap for an address on your own domain once it is verified with Resend.
    from: "Portfolio <onboarding@resend.dev>",
    to: [site.email],
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("Resend failed:", error);
    return Response.json(
      { ok: false, error: "Could not send the message." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
