import { RevealLeft } from "@/components/animations/RevealLeft";
import { RevealRight } from "@/components/animations/RevealRight";

const points = [
  {
    title: "Fast local service",
    text: "We’re built for South Florida timelines—clear dates, proactive updates.",
  },
  {
    title: "Affordable bulk pricing",
    text: "Higher quantities unlock better per-piece rates for teams and retail.",
  },
  {
    title: "Full-color & simple options",
    text: "From one-color classics to vibrant full-color designs—done right.",
  },
  {
    title: "Design help available",
    text: "Vectorization, typography, merch systems—designers on deck.",
  },
  {
    title: "Reliable communication",
    text: "You’ll talk to people who actually run your job—not a black box.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="border-y border-white/[0.08] bg-[#101012] py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <RevealLeft>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
            Why us
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
            Why Miami teams choose Fresh Pressed Shirts
          </h2>
        </RevealLeft>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {points.map((p, i) => (
            <RevealRight key={p.title} delayMs={i * 70}>
              <div className="h-full rounded-2xl border border-white/[0.08] bg-card p-6 transition-[border-color,box-shadow] hover:border-accent-orange/25 hover:shadow-glow-orange">
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple/30 to-accent-orange/20 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {p.text}
                    </p>
                  </div>
                </div>
              </div>
            </RevealRight>
          ))}
        </div>
      </div>
    </section>
  );
}
