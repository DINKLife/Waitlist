import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const count = await prisma.waitlistEntry.count();

        return NextResponse.json(
            {
                success: true,
                count,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Waitlist count API error:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Internal server error",
                message: "Failed to retrieve waitlist count",
                count: 0,
            },
            { status: 500 }
        );
    }
}

