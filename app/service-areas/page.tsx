import type { Metadata } from "next";
import { RevealLeft } from "@/components/animations/RevealLeft";
import { RevealRight } from "@/components/animations/RevealRight";
import { RevealUp } from "@/components/animations/RevealUp";
import { site } from "@/lib/site";
import { QuoteCTALink } from "@/components/QuoteCTALink";

export const metadata: Metadata = {
  title: "Miami Custom Shirt Printing Service Areas",
  description:
    "Custom t-shirt printing serving Miami, Kendall, Hialeah, Doral, Homestead, and surrounding South Florida communities—fast quotes and local production.",
};

const areas = [
  {
    name: "Miami",
    copy: "Downtown corridors, creative districts, and neighborhood businesses trust us for quick proofs, event merch, and brand apparel with Miami pace.",
  },
  {
    name: "Kendall",
    copy: "Schools, sports clubs, and local retailers in Kendall lean on us for organized bulk runs, sizing spreadsheets, and predictable pickup timing.",
  },
  {
    name: "Hialeah",
    copy: "We support Hialeah teams and trades with durable prints, Spanish-friendly communication upon request, and pricing that respects real budgets.",
  },
  {
    name: "Doral",
    copy: "Corporate apparel and uniform refreshes for Doral offices—consistent logos across polos, tees, and layers with a premium finish.",
  },
  {
    name: "Homestead",
    copy: "South Dade distance isn’t a problem—share your deadline and quantities; we’ll coordinate production and pickup windows that work for Homestead crews.",
  },
  {
    name: "Surrounding areas",
    copy: "Serving South Florida beyond city lines—if you’re near Miami-Dade, chances are we can help. Call or request a quote with your delivery needs.",
  },
];

export default function ServiceAreasPage() {
  return (
    <div className="pb-8 pt-8 md:pt-12">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <RevealUp>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple">
            Service areas
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Custom shirt printing across South Florida
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            {site.name} is headquartered in {site.locationLine}. We regularly
            produce for clients in Miami-Dade and nearby communities—optimized
            for fast communication and dependable turnaround.
          </p>
        </RevealUp>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {areas.map((a, i) => {
            const W = i % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <W key={a.name} delayMs={i * 60}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-card p-6 shadow-lift transition-[border-color,box-shadow] hover:border-accent-purple/30 hover:shadow-glow">
                  <h2 className="text-xl font-bold text-white">{a.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {a.copy}
                  </p>
                </div>
              </W>
            );
          })}
        </div>

        <RevealUp>
          <div className="mt-16 rounded-3xl border border-white/[0.08] bg-gradient-to-r from-card via-background to-card p-10">
            <h2 className="text-xl font-bold text-white">Local SEO note</h2>
            <p className="mt-3 max-w-3xl text-sm text-muted leading-relaxed">
              Searching for{" "}
              <strong className="text-white/90">custom t-shirt printing Miami</strong>,
              event shirts, or bulk apparel near Kendall or Doral? We&apos;re a{" "}
              <strong className="text-white/90">Miami custom shirt printer</strong>{" "}
              focused on hands-on proofs, fair tiered pricing, and design help
              when your files aren&apos;t quite production-ready yet.
            </p>
            <QuoteCTALink
              href="/contact#quote"
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-accent-purple to-accent-orange px-6 py-3 text-sm font-semibold text-white"
            >
              Request a quote
            </QuoteCTALink>
          </div>
        </RevealUp>
      </div>
    </div>
  );
}
