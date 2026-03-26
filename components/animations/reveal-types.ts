import type { ReactNode } from "react";
import type { UseInViewRevealOptions } from "@/hooks/useInViewReveal";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger when multiple reveals mount together (applied after visible). */
  delayMs?: number;
} & UseInViewRevealOptions;
