/**
 * Environment-aware logging utility
 * Only logs to console in development, uses structured logging in production
 */

type LogLevel = "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  /**
   * Log informational messages (only in development)
   */
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, context || "");
    }
  }

  /**
   * Log warning messages (only in development)
   */
  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, context || "");
    }
  }

  /**
   * Log error messages (always logged)
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorDetails = error instanceof Error 
      ? { message: error.message, stack: error.stack }
      : error;

    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, errorDetails || "", context || "");
    } else {
      // In production, you might want to send to a logging service
      // For now, we'll still log errors but could integrate with Sentry, etc.
      console.error(`[ERROR] ${message}`, errorDetails || "", context || "");
    }
  }
}

export const logger = new Logger();

