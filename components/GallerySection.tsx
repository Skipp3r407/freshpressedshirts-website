"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { galleryImages } from "@/lib/gallery-images";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { RevealUp } from "@/components/animations/RevealUp";
import { REVEAL_STAGGER_MS } from "@/lib/reveal-constants";
import { cn } from "@/lib/cn";

export function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple">
          Work
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Real prints. Real clients.
        </h2>
        <p className="mt-3 text-muted">
          Below is a structured gallery using placeholder photography—ideal for
          swapping in real client work and studio shots as you build out the site.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {galleryImages.map((img, i) => (
          <RevealUp key={img.id} delayMs={(i % 4) * REVEAL_STAGGER_MS}>
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              className={cn(
                "group relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-card text-left",
                "aspect-[3/4] shadow-lift",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:scale-[1.06] group-active:scale-[1.02]"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 motion-safe:transition-opacity motion-safe:duration-300 group-hover:opacity-70"
                aria-hidden
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
                <span className="line-clamp-2 text-left text-[11px] font-semibold leading-snug text-white drop-shadow-md sm:text-xs">
                  {img.title}
                </span>
              </span>
            </button>
          </RevealUp>
        ))}
      </div>

      <GalleryLightbox
        images={galleryImages}
        index={lightboxIndex}
        onClose={close}
        onIndexChange={setLightboxIndex}
      />
    </section>
  );
}
