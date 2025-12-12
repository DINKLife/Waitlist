import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { waitlistSchema } from "@/lib/validations/waitlist";
import { sendWaitlistWelcomeEmail } from "@/lib/email/sendgrid";
import { generateUniqueReferralCode, calculateReferralPoints } from "@/lib/utils/referral";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = waitlistSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, country, referralCode } = validationResult.data;

    // Check if email already exists
    const existingEntry = await prisma.waitlistEntry.findUnique({
      where: { email },
    });

    if (existingEntry) {
      return NextResponse.json(
        {
          error: "This email is already registered in the waitlist",
        },
        { status: 409 }
      );
    }

    // Validate referral code if provided
    let referredById: string | null = null;
    if (referralCode) {
      const referrer = await prisma.waitlistEntry.findUnique({
        where: { referralCode: referralCode.toUpperCase().trim() },
      });

      if (!referrer) {
        return NextResponse.json(
          {
            error: "Invalid referral code",
            message: "The referral code you entered is not valid.",
          },
          { status: 400 }
        );
      }

      // Prevent self-referral
      if (referrer.email.toLowerCase() === email.toLowerCase()) {
        return NextResponse.json(
          {
            error: "Invalid referral code",
            message: "You cannot use your own referral code.",
          },
          { status: 400 }
        );
      }

      referredById = referrer.id;
    }

    // Generate unique referral code for the new user
    const newReferralCode = await generateUniqueReferralCode();

    // Create waitlist entry
    const entry = await prisma.waitlistEntry.create({
      data: {
        firstName,
        lastName,
        email,
        country,
        referralCode: newReferralCode,
        referredById,
      },
    });

    // Update referrer's stats if referral code was used
    if (referredById) {
      const referrer = await prisma.waitlistEntry.findUnique({
        where: { id: referredById },
      });

      if (referrer) {
        const newReferralCount = referrer.referralCount + 1;
        const newPoints = calculateReferralPoints(newReferralCount);

        await prisma.waitlistEntry.update({
          where: { id: referredById },
          data: {
            referralCount: newReferralCount,
            points: newPoints,
          },
        });
      }
    }

    // Generate referral link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (request.headers.get("origin") || "http://localhost:3000");
    const referralLink = `${baseUrl}?ref=${newReferralCode}`;

    // Send welcome email (don't fail if email sending fails)
    try {
      await sendWaitlistWelcomeEmail({
        firstName,
        lastName,
        email,
        country,
        referralCode: newReferralCode,
        referralLink,
      });
    } catch (emailError) {
      // Log error but don't fail the request
      console.error("Failed to send welcome email:", emailError);
      // Continue with success response even if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist! Check your email for a welcome message.",
        data: {
          id: entry.id,
          email: entry.email,
          referralCode: newReferralCode,
          referralLink,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);

    // Handle Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          {
            error: "This email is already registered in the waitlist",
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve waitlist entries (for admin purposes)
export async function GET() {
  try {
    const entries = await prisma.waitlistEntry.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        country: true,
        referralCode: true,
        referralCount: true,
        points: true,
        referredById: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        count: entries.length,
        data: entries,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist GET API error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to retrieve waitlist entries",
      },
      { status: 500 }
    );
  }
}

