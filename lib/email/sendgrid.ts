import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { logger } from "@/lib/utils/logger";

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface WaitlistEmailData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  referralCode?: string;
  referralLink?: string;
}

/**
 * Send welcome email to new waitlist member
 */
export async function sendWaitlistWelcomeEmail(data: WaitlistEmailData): Promise<void> {
  if (!process.env.SENDGRID_API_KEY) {
    logger.warn("SENDGRID_API_KEY not set, skipping email send");
    return;
  }

  if (!process.env.SENDGRID_FROM_EMAIL) {
    throw new Error("SENDGRID_FROM_EMAIL environment variable is required");
  }

  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const fromName = process.env.SENDGRID_FROM_NAME || "DINKLife Team";

  const msg = {
    to: data.email,
    from: {
      email: fromEmail,
      name: fromName,
    },
    subject: "Welcome to DINKLife - You're on the Waitlist! 🎉",
    html: generateWelcomeEmailHTML(data),
    text: generateWelcomeEmailText(data),
  };

  try {
    await sgMail.send(msg);
    logger.info(`Welcome email sent successfully to ${data.email}`);
  } catch (error) {
    logger.error("Error sending welcome email", error);
    // Don't throw - we don't want email failures to break the waitlist signup
    if (error instanceof Error) {
      logger.error("SendGrid error details", error, { message: error.message });
    }
  }
}

/**
 * Generate HTML email template
 */
function generateWelcomeEmailHTML(data: WaitlistEmailData): string {
  const fullName = `${data.firstName} ${data.lastName}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to DINKLife</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header with gradient background -->
          <tr>
            <td style="background: linear-gradient(135deg, #002860 0%, #015EC2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #D7E7FF; font-size: 32px; font-weight: bold; letter-spacing: 2px;">DINKLIFE</h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #002860; font-size: 28px; font-weight: bold;">Welcome, ${data.firstName}! 🎉</h2>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Thank you for joining the DINKLife waitlist! We're thrilled to have you on this journey with us.
              </p>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                You've taken the first step toward rebuilding yourself – physically, mentally, and emotionally. We built DINKLife from a place of survival, and we're here to help you do the same.
              </p>
              
              <!-- Benefits Box -->
              <div style="background: linear-gradient(135deg, #D7E7FF 0%, #015EC2 20%); border-radius: 8px; padding: 25px; margin: 30px 0;">
                <h3 style="margin: 0 0 15px 0; color: #002860; font-size: 20px; font-weight: bold;">What You Get as an Early Member:</h3>
                <ul style="margin: 0; padding-left: 20px; color: #002860; font-size: 15px; line-height: 1.8;">
                  <li style="margin-bottom: 10px;"><strong>The 7-Day Nervous System Reset</strong> - A fast, ADHD-friendly routine to lower anxiety, tension, and inflammation (coming soon!)</li>
                  <li style="margin-bottom: 10px;"><strong>Early Access</strong> - Be among the first to experience DINKLife when we launch</li>
                  <li style="margin-bottom: 10px;"><strong>Founder Pricing</strong> - Special lifetime discounted access for early members</li>
                  <li style="margin-bottom: 10px;"><strong>Behind-the-Scenes Updates</strong> - Honest, real updates on our building process</li>
                </ul>
              </div>
              
              ${data.referralCode ? `
              <!-- Referral Code Section -->
              <div style="background: linear-gradient(135deg, #015EC2 0%, #002860 100%); border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center; border: 2px solid #D7E7FF;">
                <h3 style="margin: 0 0 15px 0; color: #D7E7FF; font-size: 22px; font-weight: bold;">🎁 Your Unique Referral Code</h3>
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 20px; margin: 20px 0; border: 2px dashed #D7E7FF;">
                  <p style="margin: 0 0 10px 0; color: #D7E7FF; font-size: 14px; font-weight: 600; letter-spacing: 1px;">YOUR CODE</p>
                  <p style="margin: 0; color: #FFFFFF; font-size: 32px; font-weight: bold; letter-spacing: 4px; font-family: 'Courier New', monospace;">${data.referralCode}</p>
                </div>
                <p style="margin: 15px 0 20px 0; color: #D7E7FF; font-size: 15px; line-height: 1.6;">
                  Share your code with friends and earn rewards! For every person who joins using your code, you'll earn points and unlock exclusive benefits.
                </p>
                ${data.referralLink ? `
                <a href="${data.referralLink}" style="display: inline-block; background: #D7E7FF; color: #002860; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin-top: 10px;">
                  Share Your Referral Link
                </a>
                ` : ''}
              </div>
              ` : ''}
              
              <p style="margin: 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                We'll keep you updated with our progress and let you know as soon as we're ready to launch. In the meantime, follow us on social media to stay connected:
              </p>
              
              <!-- Social Links -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://www.linkedin.com/company/dinklife-com" style="display: inline-block; margin: 0 10px; color: #015EC2; text-decoration: none; font-weight: 600;">LinkedIn</a>
                <a href="https://www.facebook.com/share/1DdXbPqRBh/?mibextid=wwXIfr" style="display: inline-block; margin: 0 10px; color: #015EC2; text-decoration: none; font-weight: 600;">Facebook</a>
                <a href="https://instagram.com/dinklifeapp" style="display: inline-block; margin: 0 10px; color: #015EC2; text-decoration: none; font-weight: 600;">Instagram</a>
                <a href="https://youtube.com/@dinklife" style="display: inline-block; margin: 0 10px; color: #015EC2; text-decoration: none; font-weight: 600;">YouTube</a>
              </div>
              
              <p style="margin: 30px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6; border-top: 1px solid #e0e0e0; padding-top: 20px;">
                If you have any questions, feel free to reach out to us through our social links above.
              </p>
              
              <p style="margin: 20px 0 0 0; color: #002860; font-size: 16px; font-weight: 600; line-height: 1.6;">
                Your journey to self-regulation starts here.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #002860; padding: 30px; text-align: center;">
              <p style="margin: 0; color: #D7E7FF; font-size: 12px; opacity: 0.8;">
                © ${new Date().getFullYear()} DINKLife. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email template
 */
function generateWelcomeEmailText(data: WaitlistEmailData): string {
  const fullName = `${data.firstName} ${data.lastName}`;

  return `
Welcome to DINKLife, ${data.firstName}!

Thank you for joining the DINKLife waitlist! We're thrilled to have you on this journey with us.

You've taken the first step toward rebuilding yourself – physically, mentally, and emotionally. We built DINKLife from a place of survival, and we're here to help you do the same.

WHAT YOU GET AS AN EARLY MEMBER:

• The 7-Day Nervous System Reset - A fast, ADHD-friendly routine to lower anxiety, tension, and inflammation (coming soon!)
• Early Access - Be among the first to experience DINKLife when we launch
• Founder Pricing - Special lifetime discounted access for early members
• Behind-the-Scenes Updates - Honest, real updates on our building process

${data.referralCode ? `
YOUR UNIQUE REFERRAL CODE: ${data.referralCode}

Share your code with friends and earn rewards! For every person who joins using your code, you'll earn points and unlock exclusive benefits.

${data.referralLink ? `Your referral link: ${data.referralLink}` : ''}

` : ''}
We'll keep you updated with our progress and let you know as soon as we're ready to launch.

Follow us on social media:
- LinkedIn: https://linkedin.com/company/dinklife-com
- Facebook: https://www.facebook.com/share/1DdXbPqRBh/?mibextid=wwXIfr
- Instagram: https://instagram.com/dinklifeapp
- YouTube: https://youtube.com/@dinklife-app

If you have any questions, feel free to reach out to us through our social links above.

Your journey to self-regulation starts here.

---

© ${new Date().getFullYear()} DINKLife. All rights reserved.
  `.trim();
}

