"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { formatQuotePrefillNotes } from "@/lib/quote-prefill";
import { useInstantQuotePrefill } from "@/hooks/useInstantQuotePrefill";
import { FileDropzone } from "@/components/ui/FileDropzone";
import { QuoteTurnaroundUpsell } from "@/components/QuoteTurnaroundUpsell";
import type { TurnaroundOption } from "@/lib/quote-prefill";

const shirtTypes = [
  "T-shirt (basic)",
  "T-shirt (premium)",
  "Long sleeve",
  "Hoodie",
  "Tank / sleeveless",
  "Polo",
  "Other / mixed",
];

type Status = "idle" | "submitting" | "success" | "error";

type Props = {
  className?: string;
  /** When false, omits outer card border (e.g. nested layouts) */
  framed?: boolean;
};

export function QuoteForm({ className, framed = true }: Props) {
  const prefill = useInstantQuotePrefill();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shirtType, setShirtType] = useState(shirtTypes[0]);
  const [details, setDetails] = useState("");
  const [turnaround, setTurnaround] = useState<TurnaroundOption>("standard");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!prefill) return;
    setQuantity(String(prefill.quantity));
    setTurnaround(prefill.turnaround);
    const line = formatQuotePrefillNotes(prefill);
    setDetails((d) => (d.trim() ? `${line}\n\n${d}` : line));
  }, [prefill]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please call us.");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setQuantity("");
      setShirtType(shirtTypes[0]);
      setTurnaround("standard");
      setDetails("");
      setFile(null);
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Try again or call the shop.");
    }
  }

  return (
    <div
      className={cn(
        framed &&
          "rounded-2xl border border-white/[0.08] bg-card p-6 shadow-lift md:p-8",
        className
      )}
    >
        <form onSubmit={onSubmit} className="space-y-5">
        <input type="hidden" name="form" value="quote" />
        <input type="hidden" name="turnaround" value={turnaround} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="q-name" className="text-xs font-semibold text-muted">
              Name
            </label>
            <input
              id="q-name"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-background px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="q-email" className="text-xs font-semibold text-muted">
              Email
            </label>
            <input
              id="q-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-background px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="q-phone" className="text-xs font-semibold text-muted">
              Phone
            </label>
            <input
              id="q-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-background px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
              placeholder="(305) 555-0100"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="q-qty" className="text-xs font-semibold text-muted">
              Quantity
            </label>
            <input
              id="q-qty"
              name="quantity"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-xl border border-white/[0.08] bg-background px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
              placeholder="e.g. 48"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="q-shirt" className="text-xs font-semibold text-muted">
            Shirt type
          </label>
          <select
            id="q-shirt"
            name="shirtType"
            value={shirtType}
            onChange={(e) => setShirtType(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-background px-3 py-2.5 text-sm text-white focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
          >
            {shirtTypes.map((t) => (
              <option key={t} value={t} className="bg-card">
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-card/90 to-background/40 p-5 shadow-lift md:p-6">
          <QuoteTurnaroundUpsell
            value={turnaround}
            onChange={setTurnaround}
            disabled={status === "submitting"}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="q-details" className="text-xs font-semibold text-muted">
            Design details
          </label>
          <textarea
            id="q-details"
            name="details"
            required
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full resize-y rounded-xl border border-white/[0.08] bg-background px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-accent-purple/50 focus:outline-none focus:ring-2 focus:ring-accent-purple/30"
            placeholder="Ink colors, placement, sizes, deadline, event name…"
          />
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-muted">Upload art (optional)</p>
          <FileDropzone
            name="file"
            file={file}
            onFileChange={setFile}
            disabled={status === "submitting"}
          />
        </div>

        {status === "success" ? (
          <p
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200"
            role="status"
          >
            Thanks—we received your request and will follow up shortly. Need it
            faster? Call the shop.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-gradient-to-r from-accent-purple to-accent-orange py-3.5 text-sm font-semibold text-white shadow-glow-orange transition-[transform,filter] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request quote"}
        </button>
      </form>
    </div>
  );
}
