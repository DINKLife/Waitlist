import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { waitlistSchema } from "@/lib/validations/waitlist";
import { sendWaitlistWelcomeEmail } from "@/lib/email/sendgrid";
import { generateUniqueReferralCode, calculateReferralPoints } from "@/lib/utils/referral";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  conflictResponse,
} from "@/lib/api/response-handlers";
import { logger } from "@/lib/utils/logger";
import type { NextResponse } from "next/server";
import type { ApiSuccessResponse, ApiErrorResponse } from "@/types/api";

/**
 * POST /api/waitlist
 * Submit a new waitlist entry
 * @param request - NextRequest with waitlist entry data
 * @returns NextResponse with success or error
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = waitlistSchema.safeParse(body);

    if (!validationResult.success) {
      return validationErrorResponse(validationResult.error.errors);
    }

    const { firstName, lastName, email, country, referralCode } = validationResult.data;

    // Check if email already exists
    const existingEntry = await prisma.waitlistEntry.findUnique({
      where: { email },
    });

    if (existingEntry) {
      return conflictResponse("This email is already registered in the waitlist");
    }

    // Validate referral code if provided
    let referredById: string | null = null;
    if (referralCode) {
      const referrer = await prisma.waitlistEntry.findUnique({
        where: { referralCode: referralCode.toUpperCase().trim() },
      });

      if (!referrer) {
        return errorResponse(
          "Invalid referral code",
          "The referral code you entered is not valid.",
          400
        );
      }

      // Prevent self-referral
      if (referrer.email.toLowerCase() === email.toLowerCase()) {
        return errorResponse(
          "Invalid referral code",
          "You cannot use your own referral code.",
          400
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
      logger.error("Failed to send welcome email", emailError);
      // Continue with success response even if email fails
    }

    return successResponse(
      {
        id: entry.id,
        email: entry.email,
        referralCode: newReferralCode,
        referralLink,
      },
      "Successfully joined the waitlist! Check your email for a welcome message.",
      201
    );
  } catch (error) {
    logger.error("Waitlist API error", error);

    // Handle Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("Unique constraint")) {
        return conflictResponse("This email is already registered in the waitlist");
      }
    }

    return errorResponse(
      "Internal server error",
      "Something went wrong. Please try again later.",
      500
    );
  }
}

/**
 * GET /api/waitlist
 * Retrieve waitlist entries (for admin purposes)
 * @returns NextResponse with waitlist entries
 */
export async function GET(): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
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

    return successResponse(
      { entries, count: entries.length },
      "Waitlist entries retrieved successfully"
    );
  } catch (error) {
    logger.error("Waitlist GET API error", error);

    return errorResponse(
      "Internal server error",
      "Failed to retrieve waitlist entries",
      500
    );
  }
}

