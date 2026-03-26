import { RevealUp } from "@/components/animations/RevealUp";

const badges = [
  {
    title: "Fast Turnaround",
    blurb: "Realistic timelines, local production",
    icon: IconClock,
  },
  {
    title: "Bulk Discounts Available",
    blurb: "Better per-piece pricing at volume",
    icon: IconStack,
  },
  {
    title: "Local Miami Business",
    blurb: "Neighborhood shop, hands-on QC",
    icon: IconMap,
  },
  {
    title: "High Quality Prints",
    blurb: "Crisp registration & durable inks",
    icon: IconSpark,
  },
] as const;

const testimonials = [
  {
    quote: "Clear communication and shirts looked sharp for our company picnic.",
    by: "Marketing lead · Coral Gables",
  },
  {
    quote: "Bulk order came in on time — team was easy to work with.",
    by: "Youth sports director · Kendall",
  },
];

function StarRow({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex gap-0.5 text-accent-orange opacity-90" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export function TrustBar() {
  return (
    <section
      className="relative z-10 -mt-8 border-y border-white/[0.08] bg-card/95 backdrop-blur-md"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <div className="mb-6 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-3">
          <StarRow />
          <p
            id="trust-heading"
            className="text-xs font-medium text-muted sm:text-sm"
          >
            Trusted by Miami businesses, schools &amp; event teams
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:flex-nowrap lg:gap-4">
          {badges.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealUp key={item.title} delayMs={i * 60} className="min-w-0 flex-1 sm:min-w-[calc(50%-0.375rem)] lg:min-w-0">
                <div
                  className="group flex h-full items-start gap-3 rounded-xl border border-white/[0.08] bg-background/50 px-4 py-3.5 transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-accent-purple/30 hover:bg-white/[0.03] hover:shadow-glow motion-safe:hover:-translate-y-0.5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple/25 to-accent-orange/15 text-accent-orange ring-1 ring-white/[0.06] transition-[filter] group-hover:brightness-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="text-sm font-semibold leading-snug text-white">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-snug text-muted">
                      {item.blurb}
                    </p>
                  </div>
                </div>
              </RevealUp>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 border-t border-white/[0.06] pt-8 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote
              key={t.by}
              className="rounded-xl border border-white/[0.06] bg-background/40 px-4 py-3 text-left"
            >
              <p className="text-sm italic leading-relaxed text-muted">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-2 text-[11px] font-medium text-white/45">
                — {t.by}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconClock(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconStack(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16-5l-8 4-8-4m16 5v10l-8 4-8-4V7" />
    </svg>
  );
}

function IconMap(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function IconSpark(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  );
}
