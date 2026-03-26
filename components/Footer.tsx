import Link from "next/link";
import { site } from "@/lib/site";

const quick = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/[0.08] bg-[#0c0c0d]">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="bg-gradient-to-r from-accent-purple to-accent-orange bg-clip-text text-lg font-bold text-transparent">
              {site.domain}
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {site.tagline}. Fast quotes, bulk-friendly pricing, design support.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Quick links
            </p>
            <ul className="mt-3 space-y-2">
              {quick.map((q) => (
                <li key={q.href}>
                  <Link
                    href={q.href}
                    className="text-sm text-muted transition-colors hover:text-white"
                  >
                    {q.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="transition-colors hover:text-white"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>{site.locationLine}</li>
              <li className="text-white/60">{site.addressPlaceholder}</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Hours
            </p>
            <p className="mt-3 text-sm text-muted">{site.hours}</p>
            <div className="mt-4 flex gap-3">
              <a
                href={site.social.instagram}
                className="text-xs font-medium text-muted hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href={site.social.facebook}
                className="text-xs font-medium text-muted hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/[0.08] pt-8 pr-16 text-center text-xs text-white/40 sm:pr-20 md:flex-row md:items-center md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="min-w-0">
            <a
              href={site.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white/50 underline decoration-white/25 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60"
            >
              {site.credit}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
