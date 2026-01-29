"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?:
    | "fadeIn"
    | "fadeUp"
    | "fadeDown"
    | "fadeLeft"
    | "fadeRight"
    | "scale"
    | "blur";
  threshold?: number;
}

export function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "fadeUp",
  threshold = 0.1,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;

    // Fail-open: never keep content hidden if we can't observe it.
    if (!node) {
      setIsVisible(true);

      return;
    }

    if (typeof window === "undefined") return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);

      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          window.setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(node);

    // If we're already in/near the viewport on mount, reveal immediately.
    const rect = node.getBoundingClientRect();
    const viewportH = window.innerHeight || 0;
    const nearViewport = rect.top < viewportH + 120 && rect.bottom > -120;

    if (nearViewport) setIsVisible(true);

    // Safety timeout: ensure we never stay invisible.
    const safetyId = window.setTimeout(
      () => setIsVisible(true),
      Math.max(350, delay),
    );

    return () => {
      window.clearTimeout(safetyId);
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [delay, threshold]);

  const getAnimationClass = () => {
    const baseClass = "transition-all ease-out";
    const durationClass = `duration-[${duration * 1000}ms]`;

    if (!isVisible) {
      switch (direction) {
        case "fadeIn":
          return `${baseClass} ${durationClass} opacity-0`;
        case "fadeUp":
          return `${baseClass} ${durationClass} opacity-0 translate-y-8`;
        case "fadeDown":
          return `${baseClass} ${durationClass} opacity-0 -translate-y-8`;
        case "fadeLeft":
          return `${baseClass} ${durationClass} opacity-0 translate-x-8`;
        case "fadeRight":
          return `${baseClass} ${durationClass} opacity-0 -translate-x-8`;
        case "scale":
          return `${baseClass} ${durationClass} opacity-0 scale-95`;
        case "blur":
          return `${baseClass} ${durationClass} opacity-0 blur-sm`;
        default:
          return `${baseClass} ${durationClass} opacity-0 translate-y-8`;
      }
    }

    switch (direction) {
      case "fadeIn":
        return `${baseClass} ${durationClass} opacity-100`;
      case "fadeUp":
        return `${baseClass} ${durationClass} opacity-100 translate-y-0`;
      case "fadeDown":
        return `${baseClass} ${durationClass} opacity-100 translate-y-0`;
      case "fadeLeft":
        return `${baseClass} ${durationClass} opacity-100 translate-x-0`;
      case "fadeRight":
        return `${baseClass} ${durationClass} opacity-100 translate-x-0`;
      case "scale":
        return `${baseClass} ${durationClass} opacity-100 scale-100`;
      case "blur":
        return `${baseClass} ${durationClass} opacity-100 blur-0`;
      default:
        return `${baseClass} ${durationClass} opacity-100 translate-y-0`;
    }
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{ transitionDuration: `${duration}s` }}
    >
      {children}
    </div>
  );
}
