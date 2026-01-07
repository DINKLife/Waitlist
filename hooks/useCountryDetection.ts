/**
 * Custom hook for detecting user's country via geolocation API
 */

import { useState, useCallback } from "react";
import { COUNTRIES, COUNTRY_NAME_MAPPING } from "@/constants/countries";
import { logger } from "@/lib/utils/logger";

export function useCountryDetection() {
  const [isDetecting, setIsDetecting] = useState(false);

  const detectCountry = useCallback(async (): Promise<string | null> => {
    setIsDetecting(true);
    try {
      // Using ipapi.co for free IP geolocation (1000 requests/day limit)
      const response = await fetch("https://ipapi.co/json/");

      if (!response.ok) {
        throw new Error("Geolocation API failed");
      }

      const data = await response.json();

      if (data.country_name) {
        // Map API country name to our country list
        let detectedCountry = COUNTRIES.find(
          (country) => country.toLowerCase() === data.country_name.toLowerCase()
        );

        // Handle common country name variations
        if (!detectedCountry) {
          const mappedName = COUNTRY_NAME_MAPPING[data.country_name] || data.country_name;
          detectedCountry = COUNTRIES.find(
            (country) => country.toLowerCase() === mappedName.toLowerCase()
          );
        }

        if (detectedCountry) {
          return detectedCountry;
        }
      }
      return null;
    } catch (error) {
      logger.info("Could not detect country", { error });
      // Silently fail - user can still select manually
      return null;
    } finally {
      setIsDetecting(false);
    }
  }, []);

  return { detectCountry, isDetecting };
}

