"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { QuoteCTALink } from "@/components/QuoteCTALink";

type Msg = { id: string; from: "user" | "bot"; text: string };

const phone = site.phoneDisplay;

/** Exact quick-pick questions (rule-based — no API). */
const PRESET_ROWS: { q: string; a: string }[] = [
  {
    q: "How much are shirts?",
    a: `Pricing depends on quantity and design. The fastest way is to request a quote — want me to take you there? You can also call ${phone} for a quick ballpark.`,
  },
  {
    q: "Do you offer bulk pricing?",
    a: `Yes — larger runs usually unlock better per-shirt pricing. Share your quantity and deadline on the quote form (or call ${phone}) and we'll line up a competitive tier.`,
  },
  {
    q: "How fast is turnaround?",
    a: `We're a local Miami shop built for speed. Many jobs fit a standard window of a few business days; rush may be available — note your deadline on the quote form or call ${phone} to confirm.`,
  },
  {
    q: "Can you help with design?",
    a: `Absolutely — logos, cleanup, layouts, print-ready files. Mention design help in your quote or call ${phone} so we can steer you right.`,
  },
  {
    q: "Where are you located?",
    a: `We're a Miami-based custom shirt & print studio (${site.locationLine}). Request a quote for details or call ${phone} to talk through pickup or timing.`,
  },
];

const DEFAULT_BOT =
  "I'd love to get you a solid answer — the quickest path is the quote form (attach art if you have it) or a quick call. Want me to point you to the form?";

function replyFromText(raw: string): string {
  const t = raw.toLowerCase().trim();
  if (!t) return DEFAULT_BOT;

  for (const { q, a } of PRESET_ROWS) {
    if (t === q.toLowerCase()) return a;
  }

  if (/how much|price|pricing|cost|estimate|quote|expensive|cheap/i.test(t)) {
    return `Pricing depends on quantity and design. The fastest way is to request a quote — want me to take you there? You can also call ${phone}.`;
  }
  if (/bulk|volume|discount|wholesale|many shirts|large order/i.test(t)) {
    return PRESET_ROWS.find((p) => p.q.includes("bulk"))!.a;
  }
  if (/rush|fast|turnaround|timeline|deadline|same day|when can/i.test(t)) {
    return PRESET_ROWS.find((p) => p.q.includes("turnaround"))!.a;
  }
  if (/design|artwork|logo|vector|mockup|help with/i.test(t)) {
    return PRESET_ROWS.find((p) => p.q.includes("design"))!.a;
  }
  if (/where|location|miami|address|pickup|visit|directions/i.test(t)) {
    return PRESET_ROWS.find((p) => p.q.includes("located"))!.a;
  }
  if (/hello|hi|hey|help|human|someone/i.test(t)) {
    return `Hey — I'm here to help with shirts, timelines, and pricing. Try a quick question below, type what you need, or call ${site.phoneDisplay} for the fastest human answer.`;
  }

  return DEFAULT_BOT;
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      from: "bot",
      text: `Hi — I'm a quick helper for ${site.domain}. Ask something below or tap a common question. For the best answer on pricing, use the quote form or call ${site.phoneDisplay}.`,
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 320);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const mkId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const pushExchange = (userText: string, botText: string) => {
    setMessages((m) => [
      ...m,
      { id: mkId(), from: "user", text: userText },
      { id: mkId(), from: "bot", text: botText },
    ]);
  };

  const onPreset = (question: string) => {
    const row = PRESET_ROWS.find((p) => p.q === question);
    if (!row) return;
    pushExchange(question, row.a);
  };

  const onSendTyped = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    pushExchange(text, replyFromText(text));
  };

  return (
    <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-4 z-[80] flex flex-col items-end gap-3 md:bottom-6">
      <div
        className={cn(
          "flex max-h-[min(36rem,76vh)] w-[min(100vw-1.5rem,22rem)] flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-card shadow-lift",
          "origin-bottom-right motion-safe:transition-[opacity,transform,box-shadow] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.55)]"
            : "pointer-events-none translate-y-3 scale-[0.96] opacity-0"
        )}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Chat help"
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] bg-gradient-to-r from-background via-card to-background px-3 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">
              Questions? Start here.
            </p>
            <p className="truncate text-[10px] text-muted">
              No agents — instant answers + next steps
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close chat</span>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden
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

        <div
          ref={listRef}
          className="flex max-h-[min(220px,38vh)] flex-col gap-2 overflow-y-auto px-3 py-3"
          aria-live="polite"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "max-w-[95%] rounded-2xl px-3 py-2 text-xs leading-relaxed motion-safe:transition-[transform,opacity] motion-safe:duration-200",
                msg.from === "bot"
                  ? "bg-white/[0.06] text-muted"
                  : "ml-auto bg-gradient-to-br from-accent-purple/35 to-accent-purple/15 text-white"
              )}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <form
          onSubmit={onSendTyped}
          className="border-t border-white/[0.08] px-2 py-2"
        >
          <div className="flex gap-1.5 rounded-xl border border-white/[0.08] bg-background/80 p-1 focus-within:border-accent-purple/35 focus-within:ring-1 focus-within:ring-accent-purple/25">
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a question…"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-white placeholder:text-white/35 outline-none"
              aria-label="Type your question"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="shrink-0 rounded-lg bg-gradient-to-r from-accent-purple to-accent-orange px-3 py-1.5 text-[11px] font-semibold text-white opacity-100 transition-[opacity,filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Send
            </button>
          </div>
        </form>

        <div className="border-t border-white/[0.06] bg-background/60 px-2 pb-2 pt-1">
          <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-wide text-white/35">
            Common questions
          </p>
          <div className="flex max-h-[5.5rem] flex-col gap-0.5 overflow-y-auto pr-0.5">
            {PRESET_ROWS.map((p) => (
              <button
                key={p.q}
                type="button"
                onClick={() => onPreset(p.q)}
                className="rounded-lg px-2 py-1.5 text-left text-[11px] font-medium leading-snug text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {p.q}
              </button>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <QuoteCTALink
              href="/contact#quote"
              className="rounded-xl bg-gradient-to-r from-accent-purple to-accent-orange py-2.5 text-center text-xs font-semibold text-white shadow-glow-orange transition-[filter] hover:brightness-110"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </QuoteCTALink>
            <a
              href={`tel:${site.phoneTel}`}
              className="rounded-xl border border-white/[0.12] bg-white/[0.04] py-2.5 text-center text-xs font-semibold text-white transition-colors hover:border-accent-orange/35 hover:bg-white/[0.07]"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent-purple to-accent-orange text-white shadow-glow-orange",
          "motion-safe:transition-[transform,box-shadow,filter] motion-safe:duration-200 hover:brightness-110 motion-safe:active:scale-95",
          open &&
            "ring-2 ring-accent-orange/45 ring-offset-2 ring-offset-background"
        )}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close help chat" : "Open help chat"}
      >
        {open ? (
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
