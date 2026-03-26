"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  INNER_PAGE_BACKDROP_IMAGES,
  backdropIndexForPath,
} from "@/lib/page-backdrops";

/**
 * Fixed studio / print imagery behind inner pages (not shown on `/` — home has HeroSection).
 * Matches hero vibe: dark overlay + purple/orange glow accents.
 */
export function SiteBackground() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const src =
    INNER_PAGE_BACKDROP_IMAGES[backdropIndexForPath(pathname)];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-center opacity-[0.2] sm:opacity-[0.24]"
        sizes="100vw"
        quality={80}
      />
      <div className="absolute inset-0 bg-background/90" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/88 to-background"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-28 top-1/4 h-80 w-80 rounded-full bg-accent-purple/20 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-accent-orange/15 blur-[100px]"
        aria-hidden
      />
    </div>
  );
}
