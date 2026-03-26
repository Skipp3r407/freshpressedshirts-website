import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { RevealLeft } from "@/components/animations/RevealLeft";
import { RevealRight } from "@/components/animations/RevealRight";

export function ContactQuoteSection() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-4 py-20 lg:px-6"
      aria-labelledby="contact-heading"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <RevealLeft>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple">
            Get a quote
          </p>
          <h2 id="contact-heading" className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Tell us about your order
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Share quantity, garment style, and design intent. We&apos;ll respond
            with a clear estimate and next steps—usually fast for Miami-area
            requests.
          </p>

          <div className="mt-8 space-y-4 rounded-2xl border border-white/[0.08] bg-card p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Phone
              </p>
              <a
                href={`tel:${site.phoneTel}`}
                className="mt-1 text-lg font-semibold text-white hover:text-accent-orange"
              >
                {site.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Location
              </p>
              <p className="mt-1 text-muted">{site.locationLine}</p>
              <p className="text-sm text-white/50">{site.addressPlaceholder}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Hours
              </p>
              <p className="mt-1 text-sm text-muted">{site.hours}</p>
            </div>
          </div>
        </RevealLeft>

        <RevealRight>
          <div
            id="quote"
            tabIndex={-1}
            className="scroll-mt-28 rounded-2xl transition-[outline,box-shadow] duration-300"
          >
            <QuoteForm />
          </div>
        </RevealRight>
      </div>
    </section>
  );
}
