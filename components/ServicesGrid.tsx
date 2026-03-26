import Link from "next/link";
import { RevealUp } from "@/components/animations/RevealUp";

const services = [
  {
    title: "Custom T-Shirt Printing",
    blurb: "Retail-quality prints with careful setup and color control.",
    href: "/services#printing",
  },
  {
    title: "Bulk Orders",
    blurb: "Scale up for teams, retail drops, and high-volume events.",
    href: "/services#bulk",
  },
  {
    title: "Business Branding Apparel",
    blurb: "Staff uniforms, promo merch, and brand-consistent looks.",
    href: "/services#business",
  },
  {
    title: "Event Shirts",
    blurb: "Concerts, fundraisers, races—organized and on schedule.",
    href: "/services#events",
  },
  {
    title: "Graphic Design",
    blurb: "Vector cleanup, layouts, and print-ready files in-house.",
    href: "/services#design",
  },
];

export function ServicesGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple">
            What we do
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Services built for Miami brands & events
          </h2>
        </div>
        <Link
          href="/services"
          className="mt-2 text-sm font-semibold text-accent-orange hover:underline md:mt-0"
        >
          View all services →
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <RevealUp key={s.title} delayMs={i * 60}>
            <Link
              href={s.href}
              className="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-card p-6 shadow-lift transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent-purple/35 hover:shadow-glow"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-accent-purple group-hover:to-accent-orange group-hover:bg-clip-text">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {s.blurb}
              </p>
              <span className="mt-4 text-xs font-semibold text-accent-orange">
                Explore
              </span>
            </Link>
          </RevealUp>
        ))}
      </div>
    </section>
  );
}
