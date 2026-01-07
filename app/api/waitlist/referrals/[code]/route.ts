import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { successResponse, errorResponse, validationErrorResponse, notFoundResponse } from "@/lib/api/response-handlers";
import { logger } from "@/lib/utils/logger";
import type { NextResponse } from "next/server";
import type { ApiSuccessResponse, ApiErrorResponse } from "@/types/api";
import type { ReferralStats } from "@/types/waitlist";

/**
 * GET /api/waitlist/referrals/[code]
 * Get referral statistics for a specific referral code
 * @param request - NextRequest
 * @param params - Route parameters containing the referral code
 * @returns NextResponse with referral statistics
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
): Promise<NextResponse<ApiSuccessResponse<ReferralStats> | ApiErrorResponse>> {
  try {
    const { code: codeParam } = await params;
    const code = codeParam?.toUpperCase().trim();

    if (!code || code.length < 4) {
      return validationErrorResponse({
        code: "Invalid referral code format",
      });
    }

    const referrer = await prisma.waitlistEntry.findUnique({
      where: { referralCode: code },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        referralCode: true,
        referralCount: true,
        points: true,
        email: true,
      },
    });

    if (!referrer) {
      return notFoundResponse("Referral code");
    }

    // Get all referrals
    const referrals = await prisma.waitlistEntry.findMany({
      where: { referredById: referrer.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        country: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(
      {
        referralCode: referrer.referralCode,
        owner: {
          firstName: referrer.firstName,
          lastName: referrer.lastName,
        },
        stats: {
          totalReferrals: referrer.referralCount,
          points: referrer.points,
        },
        referrals,
      },
      "Referral statistics retrieved successfully"
    );
  } catch (error) {
    logger.error("Get referrals error", error);

    return errorResponse(
      "Internal server error",
      "Failed to retrieve referral statistics",
      500
    );
  }
}

