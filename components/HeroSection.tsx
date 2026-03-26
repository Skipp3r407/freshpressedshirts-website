"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { QuoteCTALink } from "@/components/QuoteCTALink";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80";

export function HeroSection() {
  const reduceMotion = usePrefersReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setShow(true);
      return;
    }
    const t = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(t);
  }, [reduceMotion]);

  return (
    <section className="relative min-h-[85vh] overflow-hidden md:min-h-[90vh]">
      <Image
        src={HERO_IMAGE}
        alt="Screen printing and custom shirt production"
        fill
        priority
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/92 to-background"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-accent-purple/25 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-accent-orange/20 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-4 py-24 md:min-h-[90vh] lg:px-6">
        <div
          className={cn(
            "max-w-3xl motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out",
            show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
            Miami print studio
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Custom T-Shirts Made Fast in Miami
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted md:text-xl">
            Bulk orders for businesses, events, teams, and brands—with sharp
            prints, bulk-friendly pricing, and design help when you need it.
            Local shop. Real deadlines. No generic cookie-cutter merch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuoteCTALink
              href="/contact#quote"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-orange px-6 py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-[transform,filter] hover:brightness-110 active:scale-[0.99]"
            >
              Get a Quote
            </QuoteCTALink>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-accent-purple/40 hover:bg-white/[0.07]"
            >
              Call Now · {site.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
