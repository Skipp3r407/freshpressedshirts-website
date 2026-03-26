import { RevealLeft } from "@/components/animations/RevealLeft";
import { RevealRight } from "@/components/animations/RevealRight";

const steps = [
  {
    n: "01",
    title: "Submit Your Idea",
    text: "Tell us quantity, garments, art, and deadline—we’ll take it from there.",
  },
  {
    n: "02",
    title: "Get Your Quote",
    text: "Clear pricing with options so you can choose what fits your budget.",
  },
  {
    n: "03",
    title: "Approve Your Order",
    text: "We confirm sizing breakdowns, colors, and print placements together.",
  },
  {
    n: "04",
    title: "Print & Pickup / Delivery",
    text: "Production moves fast. Pick up in Miami or arrange delivery details.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-white/[0.08] bg-[#101012] py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-orange">
          Process
        </p>
        <h2 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
          How it works
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Straightforward steps—no runaround. We stay responsive so your order
          stays on track.
        </p>

        <ol className="mt-12 space-y-10">
          {steps.map((step, i) => {
            const Wrapper = i % 2 === 0 ? RevealLeft : RevealRight;
            return (
              <Wrapper key={step.n} delayMs={40}>
                <li className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-card/80 p-6 md:flex-row md:items-center md:gap-10 md:p-8">
                  <span className="text-3xl font-bold text-accent-orange/90 md:w-16">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {step.text}
                    </p>
                  </div>
                </li>
              </Wrapper>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
