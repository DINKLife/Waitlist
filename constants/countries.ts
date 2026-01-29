/**
 * List of countries for waitlist form
 */

export const COUNTRIES = [
  // Priority countries
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "Netherlands",
  "France",
  "Sweden",
  "Norway",
  "Singapore",
  // Other countries
  "Spain",
  "Italy",
  "Belgium",
  "Switzerland",
  "Austria",
  "Denmark",
  "Finland",
  "Ireland",
  "New Zealand",
  "Japan",
  "South Korea",
  "Other",
] as const;

export type Country = (typeof COUNTRIES)[number];

/**
 * Country name mapping for geolocation API variations
 */
export const COUNTRY_NAME_MAPPING: Record<string, string> = {
  USA: "United States",
  UK: "United Kingdom",
};
