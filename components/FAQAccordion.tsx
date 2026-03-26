"use client";

import { useId, useState } from "react";
import type { FAQItem } from "@/lib/faq-data";
import { cn } from "@/lib/cn";

type Props = {
  items: FAQItem[];
  className?: string;
};

export function FAQAccordion({ items, className }: Props) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const headerId = `${baseId}-header-${i}`;
        return (
          <div
            key={item.q}
            className="rounded-2xl border border-white/[0.08] bg-card transition-colors hover:border-white/[0.12]"
          >
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white md:text-base"
              >
                {item.q}
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-accent-orange motion-safe:transition-transform",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={cn(!isOpen && "hidden")}
            >
              <p className="border-t border-white/[0.06] px-5 pb-4 pt-0 text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
