"use client";

import { useEffect } from "react";

import { logger } from "@/lib/utils/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error("Application error", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 py-16 bg-[#F7FAFF]">
      <h2 className="text-xl md:text-2xl font-semibold text-[#002860]">
        Something went wrong
      </h2>
      <p className="text-sm text-[#002860]/70 text-center max-w-md">
        A temporary error occurred. Click below to try again.
      </p>
      <button
        className="rounded-full bg-[#015EC2] text-white font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
        type="button"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
