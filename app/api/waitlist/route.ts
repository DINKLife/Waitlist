import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { waitlistSchema } from "@/lib/validations/waitlist";

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

    const { firstName, lastName, email, country } = validationResult.data;

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

    // Create waitlist entry
    const entry = await prisma.waitlistEntry.create({
      data: {
        firstName,
        lastName,
        email,
        country,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined the waitlist!",
        data: {
          id: entry.id,
          email: entry.email,
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

