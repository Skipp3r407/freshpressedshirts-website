"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export type UseInViewRevealOptions = {
  /** 0–1: higher = more of element must be visible */
  threshold?: number;
  rootMargin?: string;
  /** Fire once and keep visible (default). Set false to re-hide when scrolling away. */
  once?: boolean;
};

const DEFAULTS = {
  threshold: 0.12,
  rootMargin: "0px 0px -5% 0px",
  once: true,
} as const;

export function useInViewReveal(options: UseInViewRevealOptions = {}) {
  const threshold = options.threshold ?? DEFAULTS.threshold;
  const rootMargin = options.rootMargin ?? DEFAULTS.rootMargin;
  const once = options.once ?? DEFAULTS.once;

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion, threshold, rootMargin, once]);

  return { ref, visible: reduceMotion ? true : visible };
}
