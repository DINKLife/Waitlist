import { useState, useEffect } from "react";

interface UseScrollPositionOptions {
  threshold?: number;
}

/**
 * Custom hook to track scroll position
 * @param threshold - The scroll position threshold to trigger isScrolled
 * @returns isScrolled - Boolean indicating if scroll position exceeds threshold
 */
export function useScrollPosition({
  threshold = 20,
}: UseScrollPositionOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}
