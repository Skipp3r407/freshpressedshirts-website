"use client";

import { useEffect, useState } from "react";
import {
  consumeQuotePrefill,
  INSTANT_QUOTE_PREFILL_EVENT,
  type QuotePrefillPayload,
} from "@/lib/quote-prefill";

/**
 * Latest instant-quote payload from sessionStorage or the same-tab prefill event.
 * Wire `quantity` + notes (via formatQuotePrefillNotes) into your contact form.
 */
export function useInstantQuotePrefill(): QuotePrefillPayload | null {
  const [snapshot, setSnapshot] = useState<QuotePrefillPayload | null>(null);

  useEffect(() => {
    const stored = consumeQuotePrefill();
    if (stored) setSnapshot(stored);

    const handler = (e: Event) => {
      const detail = (e as CustomEvent<QuotePrefillPayload>).detail;
      if (detail) setSnapshot(detail);
    };

    window.addEventListener(
      INSTANT_QUOTE_PREFILL_EVENT,
      handler as EventListener
    );
    return () =>
      window.removeEventListener(
        INSTANT_QUOTE_PREFILL_EVENT,
        handler as EventListener
      );
  }, []);

  return snapshot;
}
