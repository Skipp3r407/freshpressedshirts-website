"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { useInViewReveal } from "@/hooks/useInViewReveal";
import type { RevealProps } from "./reveal-types";

export function RevealRight({
  children,
  className,
  delayMs = 0,
  threshold,
  rootMargin,
  once,
}: RevealProps) {
  const { ref, visible } = useInViewReveal({ threshold, rootMargin, once });

  const style: CSSProperties = {
    transitionDelay: visible ? `${delayMs}ms` : "0ms",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "will-change-[opacity,transform]",
        "motion-safe:transition-[opacity,transform] motion-safe:duration-[700ms] motion-safe:ease-out",
        visible
          ? "translate-x-0 opacity-100"
          : "translate-x-8 opacity-0 sm:translate-x-10",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
