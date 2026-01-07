/**
 * Client-side API functions for waitlist operations
 */

import type { WaitlistInput, WaitlistResponse, ReferralStats } from "@/types/waitlist";

const API_BASE_URL = "/api/waitlist";

/**
 * Submit a new waitlist entry
 */
export async function submitWaitlist(data: WaitlistInput): Promise<WaitlistResponse> {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to join waitlist");
    }

    return response.json();
}

/**
 * Validate a referral code
 */
export async function validateReferralCode(code: string): Promise<{
    valid: boolean;
    referralCode?: string;
    referrerName?: string;
    totalReferrals?: number;
    error?: string;
    message?: string;
}> {
    const response = await fetch(`${API_BASE_URL}/validate-referral/${code}`);
    return response.json();
}

/**
 * Get referral statistics for a code
 */
export async function getReferralStats(code: string): Promise<{
    success: boolean;
    data?: ReferralStats;
    error?: string;
}> {
    const response = await fetch(`${API_BASE_URL}/referrals/${code}`);
    return response.json();
}

/**
 * Get leaderboard
 */
export async function getLeaderboard(limit: number = 10) {
    const response = await fetch(`${API_BASE_URL}/leaderboard?limit=${limit}`);
    return response.json();
}

