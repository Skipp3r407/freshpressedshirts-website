import type { Metadata } from "next";
import { RevealLeft } from "@/components/animations/RevealLeft";
import { RevealRight } from "@/components/animations/RevealRight";
import { RevealUp } from "@/components/animations/RevealUp";
import { site } from "@/lib/site";
import { QuoteCTALink } from "@/components/QuoteCTALink";

export const metadata: Metadata = {
  title: "Custom Shirt Printing & Design Services",
  description:
    "Miami custom t-shirt printing, bulk orders, business apparel, event merch, and graphic design—full service from art to finished garments.",
};

const blocks = [
  {
    id: "printing",
    title: "Custom T-Shirt Printing",
    intro:
      "Sharp screens, dialed ink mixes, and careful curing so your prints look bold wash after wash.",
    who: "Brands, bands, shops, and creators who need consistent color and clean edges.",
    benefits: [
      "Placements that match brand guidelines",
      "Options from simple one-color to full-color graphics",
      "Advice on garment choice for the right hand-feel",
    ],
  },
  {
    id: "bulk",
    title: "Bulk Shirt Orders",
    intro:
      "Volume-friendly scheduling with tiered pricing—the more you print, the smarter your per-piece cost.",
    who: "Retail drops, company stores, large events, and seasonal campaigns.",
    benefits: [
      "Organized size breakdowns and packouts",
      "Repeatable runs for recurring programs",
      "Rush paths when the calendar gets tight",
    ],
  },
  {
    id: "business",
    title: "Business / Staff Apparel",
    intro:
      "Uniform programs that look professional on day one—and hold up in real work environments.",
    who: "Hospitality, trades, medical offices, gyms, and franchises.",
    benefits: [
      "Consistent logo reproduction across styles",
      "Mix-and-match polos, tees, and outerwear",
      "Easy reordering when you hire or expand",
    ],
  },
  {
    id: "events",
    title: "Event & Team Shirts",
    intro:
      "High-energy merch for the moments that matter—timed for your load-in date.",
    who: "Races, fundraisers, tournaments, conferences, and school events.",
    benefits: [
      "Batch planning for pickup or on-site delivery",
      "Design packages for sponsors and multi-logo layouts",
      "Miami-area familiarity with venue timing",
    ],
  },
  {
    id: "design",
    title: "Graphic Design Services",
    intro:
      "Print-ready art that translates cleanly to fabric—vector precision when it counts.",
    who: "Teams with rough concepts, low-res logos, or no designer on staff.",
    benefits: [
      "Vector tracing and typography systems",
      "Merch layouts optimized for production",
      "Collaborative revisions with clear milestones",
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="pb-8 pt-8 md:pt-12">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <RevealUp>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
            Services
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Printing & design for serious orders
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Full-service custom apparel for {site.city} businesses and
            surrounding neighborhoods—from first proof to pickup.
          </p>
        </RevealUp>

        <div className="mt-16 space-y-20">
          {blocks.map((b, i) => {
            const Wrap = i % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <article
                key={b.id}
                id={b.id}
                className="scroll-mt-28 border-t border-white/[0.08] pt-16 first:border-t-0 first:pt-0"
              >
                <Wrap delayMs={40}>
                  <h2 className="text-2xl font-bold text-white md:text-3xl">
                    {b.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-muted leading-relaxed">
                    {b.intro}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-white/80">
                    Who it&apos;s for
                  </p>
                  <p className="mt-1 text-sm text-muted">{b.who}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {b.benefits.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="text-accent-purple">✓</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <QuoteCTALink
                    href="/contact#quote"
                    className="mt-6 inline-flex text-sm font-semibold text-accent-orange hover:underline"
                  >
                    Start this service →
                  </QuoteCTALink>
                </Wrap>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
