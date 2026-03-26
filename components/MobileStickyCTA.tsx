"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { scrollToQuoteWithHighlight } from "@/lib/quote-scroll";

const SCROLL_DOWN_HIDE_AT = 96;
const DELTA = 6;

export function MobileStickyCTA() {
  const pathname = usePathname();
  const router = useRouter();
  const [entered, setEntered] = useState(false);
  const [scrollAway, setScrollAway] = useState(false);
  const lastY = useRef(0);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const syncBodyPad = () => {
      if (mq.matches) document.body.classList.add("has-mobile-cta");
      else document.body.classList.remove("has-mobile-cta");
    };
    syncBodyPad();
    mq.addEventListener("change", syncBodyPad);
    return () => {
      mq.removeEventListener("change", syncBodyPad);
      document.body.classList.remove("has-mobile-cta");
    };
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setEntered(true);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    lastY.current = typeof window !== "undefined" ? window.scrollY : 0;

    const onScroll = () => {
      if (reduceMotion.current) {
        setScrollAway(false);
        return;
      }
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (y < 48) {
        setScrollAway(false);
        return;
      }
      if (y > SCROLL_DOWN_HIDE_AT && delta > DELTA) setScrollAway(true);
      else if (delta < -DELTA) setScrollAway(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goQuote = useCallback(() => {
    if (pathname === "/" || pathname === "/contact") {
      scrollToQuoteWithHighlight();
      return;
    }
    router.push("/contact#quote");
  }, [pathname, router]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[75] md:hidden",
        "border-t border-white/[0.12] bg-background/95 backdrop-blur-lg",
        "pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_-8px_rgba(0,0,0,0.55)]",
        "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
        !entered && "translate-y-full",
        entered && scrollAway && "translate-y-[calc(100%+2px)]",
        entered && !scrollAway && "translate-y-0"
      )}
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="mx-auto flex max-w-lg gap-2 px-3 py-2">
        <a
          href={`tel:${site.phoneTel}`}
          className={cn(
            "flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl",
            "bg-gradient-to-r from-accent-purple to-accent-purple/90",
            "text-sm font-bold tracking-tight text-white shadow-glow",
            "ring-1 ring-white/15 transition-[filter,transform] active:scale-[0.98]",
            "hover:brightness-110"
          )}
        >
          <svg
            className="h-4 w-4 shrink-0 opacity-95"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Call Now
        </a>

        <button
          type="button"
          onClick={goQuote}
          className={cn(
            "flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl",
            "bg-gradient-to-r from-accent-orange to-orange-600",
            "text-sm font-bold tracking-tight text-white shadow-glow-orange",
            "ring-1 ring-white/15 transition-[filter,transform] active:scale-[0.98]",
            "hover:brightness-110"
          )}
        >
          <svg
            className="h-4 w-4 shrink-0 opacity-95"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Get Quote
        </button>
      </div>
    </div>
  );
}
