import type { Metadata } from "next";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faqItems } from "@/lib/faq-data";
import { RevealLeft } from "@/components/animations/RevealLeft";
import { RevealRight } from "@/components/animations/RevealRight";
import { site } from "@/lib/site";
import { QuoteCTALink } from "@/components/QuoteCTALink";

export const metadata: Metadata = {
  title: "FAQ — Pricing, Turnaround & Design",
  description:
    "Answers about Miami custom shirt pricing, bulk discounts, turnaround times, design help, and garment options from Fresh Pressed Shirts.",
};

export default function FAQPage() {
  return (
    <div className="pb-8 pt-8 md:pt-12">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <RevealLeft className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
              FAQ
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Questions, answered
            </h1>
            <p className="mt-4 text-muted leading-relaxed">
              Practical answers about how we price, how fast we move, and what
              we need from your artwork. Still unsure? Call{" "}
              <a
                href={`tel:${site.phoneTel}`}
                className="font-semibold text-white hover:text-accent-orange"
              >
                {site.phoneDisplay}
              </a>
              .
            </p>
          </RevealLeft>
          <RevealRight className="lg:col-span-8">
            <FAQAccordion items={faqItems} />
          </RevealRight>
        </div>

        <RevealLeft>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-white/[0.08] bg-card p-10 text-center">
            <h2 className="text-xl font-bold text-white">
              Let&apos;s price your project
            </h2>
            <p className="mt-2 text-sm text-muted">
              The fastest path to an accurate quote is the form—attach art if
              you have it.
            </p>
            <QuoteCTALink
              href="/contact#quote"
              className="mt-6 inline-flex rounded-xl border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent-purple/40"
            >
              Go to quote form
            </QuoteCTALink>
          </div>
        </RevealLeft>
      </div>
    </div>
  );
}
