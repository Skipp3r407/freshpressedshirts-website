"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { scrollToQuoteWithHighlight } from "@/lib/quote-scroll";

/**
 * When the URL is `/contact#quote` or `/#quote`, scroll + highlight after navigation.
 */
export function QuoteHashScroll() {
  const pathname = usePathname();
  const armed = useRef(true);

  useEffect(() => {
    armed.current = true;
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#quote") return;
    if (pathname !== "/" && pathname !== "/contact") return;
    if (!armed.current) return;

    const t = window.setTimeout(() => {
      if (scrollToQuoteWithHighlight()) {
        armed.current = false;
      }
    }, 150);

    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
