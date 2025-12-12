import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Limit must be between 1 and 100",
        },
        { status: 400 }
      );
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

    return NextResponse.json(
      {
        success: true,
        data: leaderboardWithRank,
        count: leaderboardWithRank.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Leaderboard error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Failed to retrieve leaderboard",
      },
      { status: 500 }
    );
  }
}

