/** Applied to `#quote` after scroll for a short pulse + ring (see globals.css). */
export const QUOTE_HIGHLIGHT_CLASS = "quote-section--highlight";

const HIGHLIGHT_REMOVE_MS = 2200;
const AFTER_SCROLL_MS = 720;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Smooth-scrolls to `#quote` and briefly highlights the form container.
 * Call only from the client (browser).
 * @returns true if `#quote` exists on the page
 */
export function scrollToQuoteWithHighlight(): boolean {
  if (typeof document === "undefined") return false;
  const el = document.getElementById("quote");
  if (!el) return false;

  const reduce = prefersReducedMotion();
  el.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });

  const delay = reduce ? 80 : AFTER_SCROLL_MS;
  window.setTimeout(() => {
    el.classList.add(QUOTE_HIGHLIGHT_CLASS);
    window.setTimeout(() => {
      el.classList.remove(QUOTE_HIGHLIGHT_CLASS);
    }, HIGHLIGHT_REMOVE_MS);
  }, delay);

  if (!reduce) {
    try {
      el.focus({ preventScroll: true });
    } catch {
      /* not focusable */
    }
  }

  return true;
}
