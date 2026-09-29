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

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

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
