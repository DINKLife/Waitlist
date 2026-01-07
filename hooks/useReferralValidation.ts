/**
 * Custom hook for validating referral codes
 */

import { useState, useCallback } from "react";
import { validateReferralCode } from "@/lib/api/waitlist-client";
import { logger } from "@/lib/utils/logger";

interface ReferralValidationState {
  isValidating: boolean;
  isValid: boolean | null;
  referrerName?: string;
}

export function useReferralValidation() {
  const [validation, setValidation] = useState<ReferralValidationState>({
    isValidating: false,
    isValid: null,
  });

  const validateCode = useCallback(async (code: string) => {
    if (!code || code.trim().length < 4) {
      setValidation({ isValidating: false, isValid: null });
      return;
    }

    setValidation({ isValidating: true, isValid: null });

    try {
      const data = await validateReferralCode(code.toUpperCase().trim());

      if (data.valid) {
        setValidation({
          isValidating: false,
          isValid: true,
          referrerName: data.referrerName,
        });
      } else {
        setValidation({
          isValidating: false,
          isValid: false,
        });
      }
    } catch (error) {
      logger.error("Referral code validation error", error);
      setValidation({ isValidating: false, isValid: null });
    }
  }, []);

  const reset = useCallback(() => {
    setValidation({ isValidating: false, isValid: null });
  }, []);

  return {
    validation,
    validateCode,
    reset,
  };
}

