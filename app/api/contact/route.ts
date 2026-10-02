import { NextResponse } from "next/server";

/**
 * Contact form delivery.
 *
 * Sends through Resend's REST API rather than its SDK, so there is no extra
 * dependency to keep patched. Both the key and the destination address come
 * from the environment: the destination is a real work inbox and has no
 * business sitting in a public repo for scrapers to find.
 *
 * With either variable missing this returns 503 and a `configured: false`
 * flag, which the form uses to fall back to a prefilled mail client instead
 * of swallowing the message.
 */
export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  subject?: string;
  budget?: string;
  message?: string;
  /** Honeypot. Real people leave it empty; most bots fill every field. */
  website?: string;
};

const clean = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;

  if (!key || !to) {
    return NextResponse.json(
      { ok: false, configured: false, error: "Delivery is not configured." },
      { status: 503 },
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Silently accept and discard anything that trips the honeypot, so the bot
  // gets no signal that it was caught.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and message are all required." },
      { status: 422 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: "That email looks wrong." }, { status: 422 });
  }

  const company = clean(body.company, 160);
  const subject = clean(body.subject, 80) || "New enquiry";
  const budget = clean(body.budget, 40);

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Subject", subject],
    ["Budget", budget || "—"],
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Until a custom domain is verified in Resend, this must stay on their
      // shared sender and `to` must be the Resend account's own address.
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [to],
      // Replying in the mail client goes straight back to the enquirer.
      reply_to: email,
      subject: `${subject} — ${name}`,
      text: [
        ...rows.map(([k, v]) => `${k}: ${v}`),
        "",
        "Message:",
        message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend rejected the send:", res.status, detail.slice(0, 500));
    return NextResponse.json(
      { ok: false, error: "The message could not be sent. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
