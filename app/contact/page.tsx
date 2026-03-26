import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { RevealLeft } from "@/components/animations/RevealLeft";
import { RevealRight } from "@/components/animations/RevealRight";
import { RevealUp } from "@/components/animations/RevealUp";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Request a custom shirt quote from Fresh Pressed Shirts in Miami. Fast responses, bulk pricing, and design support—or call (305) 615-5220.",
};

export default function ContactPage() {
  return (
    <div className="pb-8 pt-8 md:pt-12">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <RevealUp>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple">
            Contact
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Let&apos;s print something great
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Share your quantity, styles, and deadline. We&apos;ll follow up
            with a clear quote and production plan—call{" "}
            <a
              href={`tel:${site.phoneTel}`}
              className="font-semibold text-white hover:text-accent-orange"
            >
              {site.phoneDisplay}
            </a>{" "}
            if you need us immediately.
          </p>
        </RevealUp>

        <section
          id="contact"
          className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16"
          aria-labelledby="contact-page-aside"
        >
          <RevealLeft>
            <h2 id="contact-page-aside" className="text-xl font-bold text-white">
              Studio details
            </h2>
            <div className="mt-6 space-y-6 rounded-2xl border border-white/[0.08] bg-card p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Phone
                </p>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="mt-1 block text-2xl font-bold text-white hover:text-accent-orange"
                >
                  {site.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Location
                </p>
                <p className="mt-1 text-muted">{site.locationLine}</p>
                <p className="text-sm text-white/50">{site.addressPlaceholder}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  Hours
                </p>
                <p className="mt-1 text-sm text-muted">{site.hours}</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted leading-relaxed">
              Prefer voice? A quick call helps when you&apos;re sorting sizes,
              ink colors, or comparing garment blanks—we&apos;ll guide you
              through the options.
            </p>
          </RevealLeft>
          <RevealRight>
            <div
              id="quote"
              tabIndex={-1}
              className="scroll-mt-28 rounded-2xl transition-[outline,box-shadow] duration-300"
            >
              <QuoteForm />
            </div>
          </RevealRight>
        </section>
      </div>
    </div>
  );
}
