import { NextResponse } from "next/server";

import { logger } from "@/lib/utils/logger";
import { sendWelcomeEmail } from "@/lib/sendgrid";

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  try {
    const rawEmail = typeof body.email === "string" ? body.email.trim() : "";
    const name =
      typeof body.name === "string" ? body.name.trim() || null : null;

    const email = rawEmail.toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const { ok, error } = await sendWelcomeEmail({ to: email, name });

    if (!ok) {
      const hint =
        error && error.startsWith("SendGrid error (401)")
          ? " SendGrid unauthorized: check API key permissions (Mail Send) and sender verification."
          : "";

      return NextResponse.json(
        {
          error: `${error ?? "Could not send confirmation. Please try again."}${hint}`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    logger.error("waitlist signup", e);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
