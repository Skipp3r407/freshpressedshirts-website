import { site } from "@/lib/site";
import { RevealUp } from "@/components/animations/RevealUp";
import { QuoteCTALink } from "@/components/QuoteCTALink";

export function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
      <RevealUp>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-accent-purple/25 via-card to-accent-orange/20 p-10 shadow-lift md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]" />
          <div className="relative max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Need Shirts Fast? Let&apos;s Get Your Order Started.
            </h2>
            <p className="mt-4 text-muted">
              Tell us what you need—or call {site.phoneDisplay} for immediate
              help. We&apos;ll confirm garment options, print method, and a
              realistic delivery plan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuoteCTALink
                href="/contact#quote"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-background shadow-lift transition-[transform,filter] hover:brightness-95 active:scale-[0.99]"
              >
                Request a Quote
              </QuoteCTALink>
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex items-center justify-center rounded-xl border border-white/[0.2] bg-transparent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </RevealUp>
    </section>
  );
}
