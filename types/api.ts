/**
 * API response types
 */

/**
 * Standard API success response
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
}

/**
 * Standard API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  details?: unknown;
}

/**
 * API response union type
 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Validation error response
 */
export interface ValidationErrorResponse {
  success: false;
  error: "Validation failed";
  details: unknown;
}

/**
 * Not found error response
 */
export interface NotFoundErrorResponse {
  success: false;
  error: string;
}

/**
 * Conflict error response
 */
export interface ConflictErrorResponse {
  success: false;
  error: "Conflict";
  message: string;
}

