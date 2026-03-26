import Link from "next/link";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faqPreviewItems } from "@/lib/faq-data";
import { RevealLeft } from "@/components/animations/RevealLeft";
import { RevealRight } from "@/components/animations/RevealRight";

export function FAQPreviewSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <RevealLeft>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Common questions
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Straight answers about pricing, timelines, and what we need from
            your artwork. For the full list visit our FAQ page.
          </p>
          <Link
            href="/faq"
            className="mt-6 inline-flex text-sm font-semibold text-accent-orange hover:underline"
          >
            View all FAQs →
          </Link>
        </RevealLeft>
        <RevealRight>
          <FAQAccordion items={faqPreviewItems} />
        </RevealRight>
      </div>
    </section>
  );
}
