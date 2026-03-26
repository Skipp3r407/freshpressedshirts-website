import type { TurnaroundOption } from "./quote-prefill";
import { TURNAROUND_MULT } from "./instant-quote-pricing";

export type TurnaroundChoice = {
  id: TurnaroundOption;
  headline: string;
  timeframe: string;
  badge?: string;
};

export const TURNAROUND_CHOICES: TurnaroundChoice[] = [
  {
    id: "standard",
    headline: "Standard",
    timeframe: "3–5 days",
  },
  {
    id: "rush",
    headline: "Rush",
    timeframe: "1–2 days",
    badge: "Popular",
  },
  {
    id: "same-day",
    headline: "Same day",
    timeframe: "Premium slot",
    badge: "Fastest",
  },
];

export function turnaroundMultiplierDisplay(id: TurnaroundOption): {
  factor: string;
  vsStandard: string;
} {
  const m = TURNAROUND_MULT[id];
  if (m <= 1) {
    return { factor: "1×", vsStandard: "Base pricing" };
  }
  const pct = Math.round((m - 1) * 100);
  return {
    factor: `~${m.toFixed(2)}×`,
    vsStandard: `+${pct}% vs standard`,
  };
}
