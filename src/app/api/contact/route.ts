import { NextResponse } from "next/server";
import { profile } from "@/data/portfolio";

/**
 * Contact endpoint.
 *
 * Sends through Resend (https://resend.com) using two environment variables:
 *
 *   RESEND_API_KEY   required — the send fails without it
 *   CONTACT_TO       optional — defaults to the address in portfolio.ts
 *   CONTACT_FROM     optional — must be a Resend-verified sender.
 *                    Defaults to Resend's shared onboarding sender, which works
 *                    for testing but can only deliver to your own account email.
 *
 * When the key is absent the route returns 503 with `configured: false`, and the
 * form falls back to opening the visitor's mail client. It never reports a
 * successful send that did not happen.
 */

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 100, email: 200, message: 5000 };

type Payload = { name?: unknown; email?: unknown; message?: unknown };

function clean(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

/** Strips characters that could be used for header injection. */
function safeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const message = clean(body.message, MAX.message);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please add a little more detail.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not an error the visitor caused — tell the client to use the mail fallback.
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error: "Email delivery is not configured on this deployment.",
      },
      { status: 503 }
    );
  }

  const to = process.env.CONTACT_TO || profile.email;
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: safeHeader(`Portfolio enquiry from ${name}`),
        text: `${message}\n\n—\n${name}\n${email}`,
        html:
          `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` +
          `<hr /><p><strong>${escapeHtml(name)}</strong><br />` +
          `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend send failed", res.status, detail);
      return NextResponse.json(
        { ok: false, error: "The message could not be sent. Please email me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend request threw", err);
    return NextResponse.json(
      { ok: false, error: "The message could not be sent. Please email me directly." },
      { status: 502 }
    );
  }
}
