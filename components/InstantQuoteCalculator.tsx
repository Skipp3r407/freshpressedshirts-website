"use client";

import { useMemo, useState } from "react";
import { calculateInstantQuote } from "@/lib/instant-quote-pricing";
import type {
  ColorOption,
  QuotePrefillPayload,
  ShirtOption,
  TurnaroundOption,
} from "@/lib/quote-prefill";
import {
  INSTANT_QUOTE_PREFILL_EVENT,
  saveQuotePrefill,
} from "@/lib/quote-prefill";
import { scrollToQuoteWithHighlight } from "@/lib/quote-scroll";

const COLOR_OPTIONS: { value: ColorOption; label: string }[] = [
  { value: "1-color", label: "1-color" },
  { value: "2-color", label: "2-color" },
  { value: "full-color", label: "Full color" },
];

const SHIRT_OPTIONS: { value: ShirtOption; label: string }[] = [
  { value: "basic", label: "Basic tee" },
  { value: "premium", label: "Premium tee" },
  { value: "long-sleeve", label: "Long sleeve" },
  { value: "hoodie", label: "Hoodie" },
];

const TURNAROUND_OPTIONS: { value: TurnaroundOption; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "rush", label: "Rush" },
  { value: "same-day", label: "Same day" },
];

const MIN_Q = 1;
const MAX_Q = 500;

function formatMoney(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function pillClass(active: boolean) {
  return [
    "rounded-full border px-3 py-2 text-sm font-medium transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out",
    active
      ? "border-orange-500/80 bg-orange-500/15 text-white shadow-[0_0_24px_-8px_rgba(249,115,22,0.75)]"
      : "border-white/10 bg-white/[0.03] text-white/75 hover:border-white/20 hover:text-white",
  ].join(" ");
}

export function InstantQuoteCalculator() {
  const [quantity, setQuantity] = useState(24);
  const [colors, setColors] = useState<ColorOption>("2-color");
  const [shirtType, setShirtType] = useState<ShirtOption>("basic");
  const [turnaround, setTurnaround] = useState<TurnaroundOption>("standard");

  const { pricePerShirt, total, tier } = useMemo(
    () => calculateInstantQuote(quantity, colors, shirtType, turnaround),
    [quantity, colors, shirtType, turnaround]
  );

  const isBestValue = quantity >= 50;

  const onLockQuote = () => {
    const payload: QuotePrefillPayload = {
      quantity,
      colors,
      shirtType,
      turnaround,
      pricePerShirt,
      total,
    };
    saveQuotePrefill(payload);

    scrollToQuoteWithHighlight();

    window.dispatchEvent(
      new CustomEvent<QuotePrefillPayload>(INSTANT_QUOTE_PREFILL_EVENT, {
        detail: payload,
      })
    );
  };

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#161616] p-6 shadow-[0_24px_80px_-40px_rgba(124,58,237,0.45)] md:p-8"
      aria-labelledby="instant-quote-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-600/25 blur-3xl motion-reduce:animate-none"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl motion-reduce:animate-none"
        aria-hidden
      />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="min-w-0 flex-1 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/90">
                Estimator
              </p>
              <h2
                id="instant-quote-heading"
                className="mt-1 text-2xl font-semibold tracking-tight text-white md:text-3xl"
              >
                Instant quote calculator
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/60">
                Ballpark pricing updates as you adjust options—lock it in and
                we&apos;ll confirm details on your quote request.
              </p>
            </div>
            {isBestValue ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300 motion-safe:transition-opacity motion-safe:duration-300">
                Best value
              </span>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-white/70">
              <label htmlFor="quote-qty">Quantity</label>
              <span className="tabular-nums text-white/50">
                {tier === "bulk"
                  ? "Bulk tier"
                  : tier === "medium"
                    ? "Mid tier"
                    : "Small run"}
              </span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                id="quote-qty"
                type="range"
                min={MIN_Q}
                max={MAX_Q}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-orange-500 sm:max-w-md"
              />
              <input
                type="number"
                min={MIN_Q}
                max={MAX_Q}
                value={quantity}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (Number.isNaN(v)) return;
                  setQuantity(Math.min(MAX_Q, Math.max(MIN_Q, v)));
                }}
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white tabular-nums outline-none ring-purple-500/40 transition-shadow focus:border-purple-500/50 focus:ring-2 sm:w-28"
                aria-label="Quantity numeric input"
              />
            </div>
          </div>

          <fieldset className="space-y-2 border-0 p-0">
            <legend className="text-sm text-white/70">Ink colors</legend>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setColors(opt.value)}
                  className={pillClass(colors === opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2 border-0 p-0">
            <legend className="text-sm text-white/70">Garment</legend>
            <div className="flex flex-wrap gap-2">
              {SHIRT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setShirtType(opt.value)}
                  className={pillClass(shirtType === opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2 border-0 p-0">
            <legend className="text-sm text-white/70">Turnaround</legend>
            <div className="flex flex-wrap gap-2">
              {TURNAROUND_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTurnaround(opt.value)}
                  className={pillClass(turnaround === opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div
          className="relative w-full shrink-0 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-6 md:w-80"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300/90">
            Estimate
          </p>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm text-white/55">Per shirt</dt>
              <dd
                className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none mt-1 text-3xl font-semibold tabular-nums tracking-tight text-white"
                key={`pps-${pricePerShirt}-${quantity}`}
              >
                {formatMoney(pricePerShirt)}
              </dd>
            </div>
            <div className="h-px bg-white/10" />
            <div>
              <dt className="text-sm text-white/55">Project total</dt>
              <dd
                className="motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none mt-1 text-4xl font-bold tabular-nums tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-orange-200"
                key={`tot-${total}`}
              >
                {formatMoney(total)}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-white/45">
            Estimates are indicative. Final pricing depends on art, placements,
            and garment SKU. We&apos;ll validate everything before production.
          </p>
          <button
            type="button"
            onClick={onLockQuote}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(168,85,247,0.65)] transition-[transform,filter] duration-200 hover:brightness-110 active:scale-[0.99] motion-reduce:transition-none"
          >
            Lock in this quote
          </button>
        </div>
      </div>
    </section>
  );
}
