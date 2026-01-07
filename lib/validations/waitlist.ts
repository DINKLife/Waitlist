import { z } from "zod";

export const waitlistSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  country: z
    .string()
    .min(1, "Country is required")
    .max(100, "Country must be less than 100 characters")
    .trim(),
  referralCode: z
    .string()
    .max(20, "Referral code must be less than 20 characters")
    .trim()
    .optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

