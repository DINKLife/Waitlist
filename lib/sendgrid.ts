import sgMail from "@sendgrid/mail";

const apiKey = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_FROM_EMAIL ?? "no-reply@dinklife.com";
const fromName = process.env.SENDGRID_FROM_NAME ?? "DINKLife Team";

if (apiKey) {
  sgMail.setApiKey(apiKey);
}

export interface SendWelcomeEmailParams {
  to: string;
  name?: string | null;
}

export async function sendWelcomeEmail({
  to,
  name,
}: SendWelcomeEmailParams): Promise<{ ok: boolean; error?: string }> {
  if (!apiKey) {
    return { ok: false, error: "SENDGRID_API_KEY is not configured" };
  }
  if (/\s/.test(apiKey)) {
    return {
      ok: false,
      error: "SENDGRID_API_KEY contains whitespace or a newline",
    };
  }
  if (apiKey.length < 40) {
    return { ok: false, error: "SENDGRID_API_KEY appears too short" };
  }

  const greeting = name ? `Hi ${name},` : "Hi,";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 24px;">
  <p>${greeting}</p>
  <p>Thanks for joining the DINKLife waitlist. We're building a community focused on <strong>community</strong>, <strong>wellness</strong>, and <strong>travel</strong> for DINK couples—and you're in.</p>
  <p>We'll keep you updated on early access, founder pricing, and ways to connect with other couples like you.</p>
  <p>— The DINKLife Team</p>
</body>
</html>
  `.trim();

  const text = `${greeting}\n\nThanks for joining the DINKLife waitlist. We're building a community focused on community, wellness, and travel for DINK couples—and you're in.\n\nWe'll keep you updated on early access, founder pricing, and ways to connect with other couples like you.\n\n— The DINKLife Team`;

  try {
    await sgMail.send({
      to,
      from: { email: fromEmail, name: fromName },
      subject: "You're on the DINKLife waitlist",
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    const fallbackMessage =
      err instanceof Error ? err.message : "SendGrid error";
    const statusCode =
      typeof (err as { code?: number })?.code === "number"
        ? (err as { code: number }).code
        : (err as { response?: { statusCode?: number } })?.response?.statusCode;
    const responseMessage =
      (err as { response?: { body?: { errors?: { message?: string }[] } } })
        ?.response?.body?.errors?.[0]?.message;

    const parts = [
      typeof statusCode === "number"
        ? `SendGrid error (${statusCode})`
        : "SendGrid error",
      responseMessage,
      fallbackMessage,
    ].filter(Boolean);

    return { ok: false, error: parts.join(": ") };
  }
}
