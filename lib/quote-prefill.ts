export const QUOTE_PREFILL_KEY = "fps_instant_quote_prefill";

export type ColorOption = "1-color" | "2-color" | "full-color";
export type ShirtOption = "basic" | "premium" | "long-sleeve" | "hoodie";
export type TurnaroundOption = "standard" | "rush" | "same-day";

export type QuotePrefillPayload = {
  quantity: number;
  colors: ColorOption;
  shirtType: ShirtOption;
  turnaround: TurnaroundOption;
  pricePerShirt: number;
  total: number;
};

export function saveQuotePrefill(payload: QuotePrefillPayload): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(QUOTE_PREFILL_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota / private mode */
  }
}

/** Read without clearing — use when applying to a form you may re-read. */
export function peekQuotePrefill(): QuotePrefillPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(QUOTE_PREFILL_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuotePrefillPayload;
  } catch {
    return null;
  }
}

export function consumeQuotePrefill(): QuotePrefillPayload | null {
  const data = peekQuotePrefill();
  if (data) {
    try {
      sessionStorage.removeItem(QUOTE_PREFILL_KEY);
    } catch {
      /* noop */
    }
  }
  return data;
}

export const INSTANT_QUOTE_PREFILL_EVENT = "instant-quote:prefill";

const SHIRT_LABEL: Record<ShirtOption, string> = {
  basic: "Basic tee",
  premium: "Premium tee",
  "long-sleeve": "Long sleeve",
  hoodie: "Hoodie",
};

const COLOR_LABEL: Record<ColorOption, string> = {
  "1-color": "1-color",
  "2-color": "2-color",
  "full-color": "Full color",
};

const TURN_LABEL: Record<TurnaroundOption, string> = {
  standard: "Standard turnaround",
  rush: "Rush",
  "same-day": "Same day",
};

/** Formatted notes block for contact / quote forms. */
export function formatQuotePrefillNotes(p: QuotePrefillPayload): string {
  return [
    "— Instant quote (estimate) —",
    `Quantity: ${p.quantity}`,
    `Colors: ${COLOR_LABEL[p.colors]}`,
    `Garment: ${SHIRT_LABEL[p.shirtType]}`,
    `Turnaround: ${TURN_LABEL[p.turnaround]}`,
    `Est. per shirt: $${p.pricePerShirt.toFixed(2)}`,
    `Est. total: $${p.total.toFixed(2)}`,
  ].join("\n");
}
