"use client";

import { useEffect, useState } from "react";
import { BRAND_COLORS, BRAND_COLORS_RGBA } from "@/constants/brand";
import { logger } from "@/lib/utils/logger";

interface WaitlistCounterProps {
    className?: string;
    showLabel?: boolean;
    animated?: boolean;
}

export function WaitlistCounter({
    className = "",
    showLabel = true,
    animated = true
}: WaitlistCounterProps) {
    const [count, setCount] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        // Fetch initial count
        fetchCount();

        // Set up polling to update count every 30 seconds
        const interval = setInterval(fetchCount, 30000);

        return () => clearInterval(interval);
    }, []);

    // Animate count when it changes
    useEffect(() => {
        if (count === null) return;

        if (animated) {
            const duration = 1000; // 1 second
            const steps = 30;
            const increment = count / steps;
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                current = Math.min(count, Math.floor(increment * step));
                setDisplayCount(current);

                if (step >= steps) {
                    setDisplayCount(count);
                    clearInterval(timer);
                }
            }, duration / steps);

            return () => clearInterval(timer);
        } else {
            setDisplayCount(count);
        }
    }, [count, animated]);

    const fetchCount = async () => {
        try {
            const response = await fetch("/api/waitlist/count");
            const data = await response.json();

            if (data.success) {
                setCount(data.count);
            }
        } catch (error) {
            logger.error("Failed to fetch waitlist count", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && count === null) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {showLabel && (
                    <span className="text-sm md:text-base text-white/80">Loading...</span>
                )}
            </div>
        );
    }

    const formattedCount = displayCount.toLocaleString();

    return (
        <div className={`flex items-baseline justify-center gap-2 flex-wrap ${className}`}>
            <span
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black tabular-nums bg-gradient-to-r from-[#D7E7FF] via-white to-[#D7E7FF] bg-clip-text text-transparent whitespace-nowrap drop-shadow-[0_2px_8px_rgba(215,231,255,0.6)]"
            >
                {formattedCount}
            </span>
            {showLabel && (
                <>
                    <span
                        className="text-base md:text-lg lg:text-xl xl:text-2xl text-white font-bold whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
                    >
                        {displayCount === 1 ? "person" : "people"}
                    </span>
                    <span
                        className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/95 font-semibold whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
                    >
                        already joined
                    </span>
                </>
            )}
        </div>
    );
}

