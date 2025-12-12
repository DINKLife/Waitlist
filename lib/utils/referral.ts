import { prisma } from "@/lib/db";

/**
 * Generate a unique referral code
 * Format: 6-8 alphanumeric characters, uppercase
 */
export function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Excluding I, O, 0, 1 for clarity
  const length = 8;
  let code = "";

  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}

/**
 * Generate a unique referral code that doesn't exist in the database
 */
export async function generateUniqueReferralCode(): Promise<string> {
  let code: string;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 10;

  while (!isUnique && attempts < maxAttempts) {
    code = generateReferralCode();
    const existing = await prisma.waitlistEntry.findUnique({
      where: { referralCode: code },
    });

    if (!existing) {
      isUnique = true;
      return code;
    }

    attempts++;
  }

  // Fallback: add timestamp to ensure uniqueness
  const baseCode = generateReferralCode();
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  return `${baseCode.slice(0, 4)}${timestamp}`;
}

/**
 * Calculate points/rewards for referrals
 * You can customize this based on your business logic
 */
export function calculateReferralPoints(referralCount: number): number {
  // Example: 10 points per referral, bonus points at milestones
  const basePoints = referralCount * 10;

  // Bonus points at milestones
  if (referralCount >= 50) return basePoints + 500; // 50 referrals = 1000 points
  if (referralCount >= 25) return basePoints + 200; // 25 referrals = 450 points
  if (referralCount >= 10) return basePoints + 50; // 10 referrals = 150 points
  if (referralCount >= 5) return basePoints + 20; // 5 referrals = 70 points

  return basePoints;
}

