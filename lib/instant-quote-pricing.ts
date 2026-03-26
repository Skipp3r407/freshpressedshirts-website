import type {
  ColorOption,
  ShirtOption,
  TurnaroundOption,
} from "./quote-prefill";

export type QuantityTier = "small" | "medium" | "bulk";

export function getQuantityTier(quantity: number): QuantityTier {
  if (quantity >= 50) return "bulk";
  if (quantity >= 11) return "medium";
  return "small";
}

/** Base print cost per shirt by bulk tier (before shirt type & color add-ons). */
const TIER_BASE_PRINT: Record<QuantityTier, number> = {
  small: 12,
  medium: 9,
  bulk: 7,
};

const SHIRT_ADDON: Record<ShirtOption, number> = {
  basic: 0,
  premium: 2.25,
  "long-sleeve": 3.75,
  hoodie: 8.5,
};

const COLOR_ADDON_PER_SHIRT: Record<ColorOption, number> = {
  "1-color": 0,
  "2-color": 1.35,
  "full-color": 2.85,
};

/** Exported for quote form upsell UI (aligned with calculator). */
export const TURNAROUND_MULT: Record<TurnaroundOption, number> = {
  standard: 1,
  rush: 1.14,
  "same-day": 1.32,
};

export function calculateInstantQuote(
  quantity: number,
  colors: ColorOption,
  shirtType: ShirtOption,
  turnaround: TurnaroundOption
): { pricePerShirt: number; total: number; tier: QuantityTier } {
  const q = Math.max(1, Math.min(9999, Math.round(quantity)));
  const tier = getQuantityTier(q);
  const unitBeforeRush =
    TIER_BASE_PRINT[tier] +
    SHIRT_ADDON[shirtType] +
    COLOR_ADDON_PER_SHIRT[colors];
  const unit = unitBeforeRush * TURNAROUND_MULT[turnaround];
  const total = Math.round(unit * q * 100) / 100;
  const pricePerShirt = Math.round((total / q) * 100) / 100;
  return { pricePerShirt, total, tier };
}
