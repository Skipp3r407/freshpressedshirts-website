import { Resend } from "resend";
import { NextResponse } from "next/server";

const MAX_FILE_BYTES = 4 * 1024 * 1024;

const TURNAROUND_IDS = new Set(["standard", "rush", "same-day"]);

const TURNAROUND_LABEL: Record<string, string> = {
  standard: "Standard (3–5 days)",
  rush: "Rush (1–2 days)",
  "same-day": "Same day (premium)",
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "Email delivery is not configured on the server." },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const quantity = String(formData.get("quantity") ?? "").trim();
  const shirtType = String(formData.get("shirtType") ?? "").trim();
  const turnaroundRaw = String(formData.get("turnaround") ?? "standard").trim();
  const turnaround = TURNAROUND_IDS.has(turnaroundRaw)
    ? turnaroundRaw
    : "standard";
  const turnaroundLabel =
    TURNAROUND_LABEL[turnaround] ?? turnaround;
  const details = String(formData.get("details") ?? "").trim();
  const file = formData.get("file");

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
  }
  if (!email || !isValidEmail(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (!phone || phone.length > 40) {
    return NextResponse.json({ error: "Please enter a phone number." }, { status: 400 });
  }
  if (!quantity || quantity.length > 32) {
    return NextResponse.json({ error: "Please enter a quantity." }, { status: 400 });
  }
  if (!details || details.length > 8000) {
    return NextResponse.json(
      { error: "Please describe your design / order needs." },
      { status: 400 }
    );
  }

  let attachments:
    | { filename: string; content: Buffer }[]
    | undefined;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { error: "File is too large. Please keep uploads under 4 MB." },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments = [{ filename: file.name || "upload", content: buffer }];
  }

  const textBody = [
    `New quote request — FreshPressedShirts.com`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Quantity: ${quantity}`,
    `Shirt type: ${shirtType || "—"}`,
    `Turnaround: ${turnaroundLabel}`,
    ``,
    `Details:`,
    details,
  ].join("\n");

  const htmlBody = `
    <h2>New quote request</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Quantity:</strong> ${escapeHtml(quantity)}</p>
    <p><strong>Shirt type:</strong> ${escapeHtml(shirtType || "—")}</p>
    <p><strong>Turnaround:</strong> ${escapeHtml(turnaroundLabel)}</p>
    <p><strong>Details:</strong></p>
    <pre style="white-space:pre-wrap;font-family:system-ui,sans-serif;">${escapeHtml(details)}</pre>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Quote request from ${name}`,
      text: textBody,
      html: htmlBody,
      attachments,
    });

    if (error) {
      console.error("[contact]", error);
      return NextResponse.json(
        { error: "Could not send message. Try again or call the shop." },
        { status: 502 }
      );
    }
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json(
      { error: "Could not send message. Try again or call the shop." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
