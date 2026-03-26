import Link from "next/link";
import { RevealLeft } from "@/components/animations/RevealLeft";
import { RevealRight } from "@/components/animations/RevealRight";

export function AboutPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 lg:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <RevealLeft>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple">
            Local studio
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            A Miami shop that prints like you mean it
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Fresh Pressed Shirts is a Miami custom shirt and graphic design
            studio focused on sharp execution, honest timelines, and hands-on
            help—from quick vector fixes to full brand kits for apparel.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            We work with local businesses, schools, artists, and event
            organizers who need reliable communication and consistent quality on
            every run.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-accent-purple/40"
          >
            Learn more about us
          </Link>
        </RevealLeft>
        <RevealRight>
          <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-card to-background p-8 shadow-lift">
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.15),transparent_50%)]" />
            <ul className="relative space-y-4 text-sm text-muted">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-orange" />
                Hands-on art checks before production
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-purple" />
                Bulk-friendly workflows for repeat clients
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-orange" />
                Built for South Florida pace—and precision
              </li>
            </ul>
          </div>
        </RevealRight>
      </div>
    </section>
  );
}
