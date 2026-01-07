import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/api/response-handlers";
import { logger } from "@/lib/utils/logger";
import type { NextResponse } from "next/server";
import type { ApiSuccessResponse, ApiErrorResponse } from "@/types/api";
import type { LeaderboardEntry } from "@/types/waitlist";

/**
 * GET /api/waitlist/leaderboard
 * Get the referral leaderboard
 * @param request - NextRequest with optional limit query parameter
 * @returns NextResponse with leaderboard data
 */
export async function GET(request: NextRequest): Promise<NextResponse<ApiSuccessResponse<{ leaderboard: LeaderboardEntry[]; count: number }> | ApiErrorResponse>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (limit < 1 || limit > 100) {
      return validationErrorResponse({
        limit: "Limit must be between 1 and 100",
      });
    }

    const leaderboard = await prisma.waitlistEntry.findMany({
      where: {
        referralCount: {
          gt: 0,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        referralCode: true,
        referralCount: true,
        points: true,
        createdAt: true,
      },
      orderBy: [
        {
          referralCount: "desc",
        },
        {
          points: "desc",
        },
        {
          createdAt: "asc",
        },
      ],
      take: limit,
    });

    const leaderboardWithRank = leaderboard.map((entry, index) => ({
      rank: index + 1,
      id: entry.id,
      firstName: entry.firstName,
      lastName: entry.lastName,
      name: `${entry.firstName} ${entry.lastName}`,
      referralCode: entry.referralCode,
      referralCount: entry.referralCount,
      points: entry.points,
      createdAt: entry.createdAt,
    }));

    return successResponse(
      { leaderboard: leaderboardWithRank, count: leaderboardWithRank.length },
      "Leaderboard retrieved successfully"
    );
  } catch (error) {
    logger.error("Leaderboard error", error);

    return errorResponse(
      "Internal server error",
      "Failed to retrieve leaderboard",
      500
    );
  }
}

