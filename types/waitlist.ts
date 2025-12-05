/**
 * Waitlist Types
 */

export interface WaitlistEntry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  referralCode: string;
  referredById: string | null;
  referralCount: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WaitlistInput {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  referralCode?: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    referralCode: string;
    referralLink: string;
  };
}

export interface ReferralStats {
  referralCode: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  stats: {
    totalReferrals: number;
    points: number;
  };
  referrals: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    createdAt: Date;
  }>;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  referralCode: string;
  referralCount: number;
  points: number;
  createdAt: Date;
}

