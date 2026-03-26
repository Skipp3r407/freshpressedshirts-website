"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { GalleryImage } from "@/lib/gallery-images";

const SWIPE_PX = 56;

type Props = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

export function GalleryLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: Props) {
  const len = images.length;
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    if (index === null || len < 2) return;
    onIndexChange((index - 1 + len) % len);
  }, [index, len, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null || len < 2) return;
    onIndexChange((index + 1) % len);
  }, [index, len, onIndexChange]);

  useEffect(() => {
    if (index === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, goPrev, goNext]);

  if (index === null || !images[index]) return null;

  const item = images[index];

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (dx > SWIPE_PX) goPrev();
    else if (dx < -SWIPE_PX) goNext();
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/92 p-3 backdrop-blur-md motion-safe:animate-gallery-overlay-in motion-reduce:animate-none"
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery: ${item.title}`}
      onClick={onClose}
    >

      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between gap-2 px-3 py-3 sm:px-4">
        <p className="min-w-0 truncate text-xs font-medium tabular-nums text-white/55">
          {index + 1} / {len}
        </p>
        <button
          type="button"
          className="shrink-0 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          Close
        </button>
      </div>

      {len > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/80 text-white shadow-lift transition-[background-color,transform] hover:bg-white/10 sm:flex md:left-3"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-1 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/80 text-white shadow-lift transition-[background-color,transform] hover:bg-white/10 sm:flex md:right-3"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      ) : null}

      <div
        className="relative mt-10 flex w-full max-w-5xl flex-1 flex-col justify-center sm:mt-0 sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          key={item.id}
          className="relative mx-auto w-full flex-1 overflow-hidden rounded-2xl border border-white/10 bg-background shadow-[0_0_80px_-20px_rgba(124,58,237,0.35)] motion-safe:animate-gallery-lightbox-in motion-reduce:animate-none"
        >
          <div className="relative aspect-[4/5] w-full max-h-[min(72vh,820px)] sm:aspect-[4/3] sm:max-h-[min(78vh,900px)]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        <div className="mt-4 px-1 text-center">
          <h3 className="text-sm font-semibold text-white sm:text-base">
            {item.title}
          </h3>
          {item.caption ? (
            <p className="mt-1 text-xs text-muted sm:text-sm">{item.caption}</p>
          ) : null}
          {len > 1 ? (
            <p className="mt-3 text-[10px] text-white/35 sm:hidden">
              Swipe left or right to browse
            </p>
          ) : null}
        </div>

        {len > 1 ? (
          <div className="mt-4 flex justify-center gap-2 sm:hidden">
            <button
              type="button"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
