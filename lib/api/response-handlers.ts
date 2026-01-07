import { NextResponse } from "next/server";
import type { ApiSuccessResponse, ApiErrorResponse, ValidationErrorResponse, NotFoundErrorResponse, ConflictErrorResponse } from "@/types/api";

/**
 * Shared API response handlers
 */

/**
 * Create a success response
 * @param data - The data to return
 * @param message - Success message
 * @param status - HTTP status code (default: 200)
 * @returns NextResponse with success format
 */
export function successResponse<T>(
    data: T,
    message: string = "Success",
    status: number = 200
): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            message,
            data,
        },
        { status }
    );
}

/**
 * Create an error response
 * @param error - Error type/name
 * @param message - Error message
 * @param status - HTTP status code (default: 500)
 * @param details - Optional error details
 * @returns NextResponse with error format
 */
export function errorResponse(
    error: string,
    message: string = "An error occurred",
    status: number = 500,
    details?: unknown
): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
            message,
            ...(details && typeof details === "object" && details !== null ? { details } : {}),
        },
        { status }
    );
}

/**
 * Create a validation error response
 * @param details - Validation error details
 * @returns NextResponse with validation error format
 */
export function validationErrorResponse(details: unknown): NextResponse<ValidationErrorResponse> {
    return NextResponse.json(
        {
            success: false,
            error: "Validation failed",
            details,
        },
        { status: 400 }
    );
}

/**
 * Create a not found error response
 * @param resource - Name of the resource that was not found (default: "Resource")
 * @returns NextResponse with not found error format
 */
export function notFoundResponse(resource: string = "Resource"): NextResponse<NotFoundErrorResponse> {
    return NextResponse.json(
        {
            success: false,
            error: `${resource} not found`,
        },
        { status: 404 }
    );
}

/**
 * Create a conflict error response
 * @param message - Conflict message
 * @returns NextResponse with conflict error format
 */
export function conflictResponse(message: string): NextResponse<ConflictErrorResponse> {
    return NextResponse.json(
        {
            success: false,
            error: "Conflict",
            message,
        },
        { status: 409 }
    );
}

