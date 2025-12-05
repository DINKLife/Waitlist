import { NextResponse } from "next/server";

/**
 * Shared API response handlers
 */

export function successResponse<T>(
    data: T,
    message: string = "Success",
    status: number = 200
) {
    return NextResponse.json(
        {
            success: true,
            message,
            data,
        },
        { status }
    );
}

export function errorResponse(
    error: string,
    message: string = "An error occurred",
    status: number = 500,
    details?: unknown
) {
    return NextResponse.json(
        {
            success: false,
            error,
            message,
            ...(details && { details }),
        },
        { status }
    );
}

export function validationErrorResponse(details: unknown) {
    return NextResponse.json(
        {
            success: false,
            error: "Validation failed",
            details,
        },
        { status: 400 }
    );
}

export function notFoundResponse(resource: string = "Resource") {
    return NextResponse.json(
        {
            success: false,
            error: `${resource} not found`,
        },
        { status: 404 }
    );
}

export function conflictResponse(message: string) {
    return NextResponse.json(
        {
            success: false,
            error: "Conflict",
            message,
        },
        { status: 409 }
    );
}

