import type { Metadata } from "next";
import { RevealLeft } from "@/components/animations/RevealLeft";
import { RevealRight } from "@/components/animations/RevealRight";
import { RevealUp } from "@/components/animations/RevealUp";
import { site } from "@/lib/site";
import { QuoteCTALink } from "@/components/QuoteCTALink";

export const metadata: Metadata = {
  title: "About Our Miami Print Studio",
  description:
    "Learn about Fresh Pressed Shirts—Miami custom t-shirt printing, quality standards, and local turnaround you can count on.",
};

export default function AboutPage() {
  return (
    <div className="pb-8 pt-8 md:pt-12">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <RevealUp>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple">
            About
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Miami shirts, printed with intention
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            We&apos;re a local studio built for businesses and creators who need
            dependable production—not placeholder merch and missed deadlines.
          </p>
        </RevealUp>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealLeft>
            <h2 className="text-2xl font-bold text-white">Our story</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Fresh Pressed Shirts started from a simple frustration: too many
              shops treat custom printing like a black box. We built a Miami
              workflow that keeps art, scheduling, and execution under one roof—
              so your order doesn&apos;t get lost between vendors.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              Today we partner with organizations across South Florida for
              uniforms, launches, fundraisers, and retail drops—always with clear
              communication and craft-minded output.
            </p>
          </RevealLeft>
          <RevealRight>
            <h2 className="text-2xl font-bold text-white">Mission</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Deliver premium-feeling apparel printing with the speed and
              accountability of a neighborhood shop. We obsess over registration,
              hand-feel, and color consistency—because your brand shows up in
              every detail.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="flex gap-2">
                <span className="text-accent-orange">→</span>
                Quality control before we hit production
              </li>
              <li className="flex gap-2">
                <span className="text-accent-orange">→</span>
                Honest timelines—we won’t promise magic
              </li>
              <li className="flex gap-2">
                <span className="text-accent-orange">→</span>
                {site.locationLine} roots, regional reach
              </li>
            </ul>
          </RevealRight>
        </div>

        <RevealUp>
          <div className="mt-20 rounded-3xl border border-white/[0.08] bg-card p-10 text-center shadow-lift">
            <h2 className="text-2xl font-bold text-white">
              Ready when you are
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Send your project details or call {site.phoneDisplay}—we&apos;ll
              confirm what&apos;s possible on your timeline.
            </p>
            <QuoteCTALink
              href="/contact#quote"
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-accent-purple to-accent-orange px-6 py-3.5 text-sm font-semibold text-white shadow-glow"
            >
              Request a quote
            </QuoteCTALink>
          </div>
        </RevealUp>
      </div>
    </div>
  );
}
