import { prisma } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api/response-handlers";
import { logger } from "@/lib/utils/logger";
import type { NextResponse } from "next/server";
import type { ApiSuccessResponse, ApiErrorResponse } from "@/types/api";

/**
 * GET /api/waitlist/count
 * Get the total count of waitlist entries
 * @returns NextResponse with count
 */
export async function GET(): Promise<NextResponse<ApiSuccessResponse<{ count: number }> | ApiErrorResponse>> {
    try {
        const count = await prisma.waitlistEntry.count();

        return successResponse({ count }, "Waitlist count retrieved successfully");
    } catch (error) {
        logger.error("Waitlist count API error", error);

        return errorResponse(
            "Internal server error",
            "Failed to retrieve waitlist count",
            500,
            { count: 0 }
        );
    }
}

