import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code: codeParam } = await params;
    const code = codeParam?.toUpperCase().trim();

    if (!code || code.length < 4) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid referral code format",
        },
        { status: 400 }
      );
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
      return NextResponse.json(
        {
          success: false,
          error: "Referral code not found",
        },
        { status: 404 }
      );
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

    return NextResponse.json(
      {
        success: true,
        data: {
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
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get referrals error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: "Failed to retrieve referral statistics",
      },
      { status: 500 }
    );
  }
}

