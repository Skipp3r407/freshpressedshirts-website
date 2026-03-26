"use client";

import { cn } from "@/lib/cn";
import type { TurnaroundOption } from "@/lib/quote-prefill";
import {
  TURNAROUND_CHOICES,
  turnaroundMultiplierDisplay,
} from "@/lib/quote-turnaround-ui";

type Props = {
  value: TurnaroundOption;
  onChange: (next: TurnaroundOption) => void;
  disabled?: boolean;
};

export function QuoteTurnaroundUpsell({
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <fieldset
      aria-labelledby="quote-turnaround-label"
      className="m-0 min-w-0 space-y-4 border-0 p-0"
    >
      <legend className="sr-only">
        Turnaround: standard, rush, or same day
      </legend>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div id="quote-turnaround-label">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-orange/90">
            How fast do you need it?
          </p>
          <p className="mt-1.5 text-lg font-semibold tracking-tight text-white">
            Prioritize your timeline
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            <span className="font-medium text-white/90">
              Need it fast? We&apos;ve got you covered.
            </span>{" "}
            Choose a turnaround tier—we&apos;ll confirm availability on your
            quote. Rush and same-day options reflect premium scheduling.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {TURNAROUND_CHOICES.map((opt) => {
          const selected = value === opt.id;
          const { factor, vsStandard } = turnaroundMultiplierDisplay(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(opt.id)}
              aria-pressed={selected}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-b from-card/80 to-background/60 px-4 py-4 text-left",
                "transition-[border-color,box-shadow,transform,background-color] duration-200 motion-safe:duration-300 motion-safe:ease-out",
                selected
                  ? "border-accent-orange/55 bg-accent-orange/[0.09] shadow-glow-orange ring-2 ring-accent-orange/40 motion-safe:scale-[1.02] motion-reduce:scale-100"
                  : "border-white/[0.1] hover:border-accent-purple/40 hover:bg-accent-purple/[0.07] hover:shadow-glow motion-safe:active:scale-[0.99]",
                disabled && "pointer-events-none opacity-55"
              )}
            >
              <span className="relative z-10 flex h-full flex-col text-left">
                {opt.badge ? (
                  <span
                    className={cn(
                      "mb-2 inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                      selected
                        ? "bg-accent-orange/25 text-orange-100"
                        : "bg-white/[0.06] text-muted"
                    )}
                  >
                    {opt.badge}
                  </span>
                ) : (
                  <span className="mb-2 block h-5" aria-hidden />
                )}

                <span className="text-base font-bold text-white">
                  {opt.headline}
                </span>
                <span className="mt-1 text-xs font-medium text-muted">
                  {opt.timeframe}
                </span>

                <span
                  className={cn(
                    "mt-4 flex flex-col gap-0.5 border-t border-white/[0.08] pt-3",
                    selected ? "border-white/15" : ""
                  )}
                >
                  <span className="text-lg font-bold tabular-nums tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-orange">
                    {factor}
                  </span>
                  <span className="text-[11px] leading-tight text-white/45">
                    {vsStandard}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] leading-relaxed text-white/40">
        Multipliers are estimates for planning; final pricing depends on art,
        garment, and shop capacity—we&apos;ll confirm before production.
      </p>
    </fieldset>
  );
}
