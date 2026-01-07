import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { errorResponse, notFoundResponse } from "@/lib/api/response-handlers";
import { logger } from "@/lib/utils/logger";

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
          valid: false,
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
        email: true,
      },
    });

    if (!referrer) {
      return NextResponse.json(
        {
          valid: false,
          error: "Referral code not found",
          message: "The referral code you entered does not exist.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        valid: true,
        referralCode: referrer.referralCode,
        referrerName: `${referrer.firstName} ${referrer.lastName}`,
        totalReferrals: referrer.referralCount,
        message: `Valid referral code from ${referrer.firstName} ${referrer.lastName}`,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Referral validation error", error);

    return NextResponse.json(
      {
        valid: false,
        error: "Internal server error",
        message: "Failed to validate referral code",
      },
      { status: 500 }
    );
  }
}

