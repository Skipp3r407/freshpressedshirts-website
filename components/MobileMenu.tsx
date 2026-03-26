"use client";

import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { QuoteCTALink } from "@/components/QuoteCTALink";

type LinkItem = { href: string; label: string };

type Props = {
  open: boolean;
  onClose: () => void;
  links: LinkItem[];
};

export function MobileMenu({ open, onClose, links }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={cn(
          /* Above MobileStickyCTA (z-75) + ChatbotWidget (z-80); below GalleryLightbox (z-90) */
          "fixed inset-0 z-[86] bg-black/60 backdrop-blur-sm transition-opacity motion-safe:duration-300 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
        onClick={onClose}
      />

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-y-0 right-0 z-[87] flex h-full max-h-dvh w-[min(100%,20rem)] flex-col border-l border-white/[0.08] bg-card shadow-lift motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out lg:hidden",
          open
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-full pointer-events-none"
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-4 py-4">
          <span className="text-sm font-semibold text-white">Menu</span>
          <button
            type="button"
            className="rounded-lg p-2 text-muted hover:bg-white/[0.06] hover:text-white"
            onClick={onClose}
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-3"
          aria-label="Mobile primary"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto shrink-0 space-y-3 border-t border-white/[0.08] p-4">
          <a
            href={`tel:${site.phoneTel}`}
            className="block text-sm font-semibold text-white"
            onClick={onClose}
          >
            {site.phoneDisplay}
          </a>
          <QuoteCTALink
            href="/contact#quote"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-orange py-3 text-sm font-semibold text-white shadow-glow"
          >
            Get a Quote
          </QuoteCTALink>
        </div>
      </div>
    </>
  );
}
