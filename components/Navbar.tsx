"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { MobileMenu } from "@/components/MobileMenu";
import { QuoteCTALink } from "@/components/QuoteCTALink";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b border-white/[0.08] transition-[background-color,backdrop-filter,box-shadow] duration-300",
          scrolled
            ? "bg-background/85 shadow-lift backdrop-blur-md"
            : "bg-background/70 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4 lg:px-6">
          <Link
            href="/"
            className="group flex flex-col leading-tight transition-opacity hover:opacity-90"
          >
            <span className="bg-gradient-to-r from-accent-purple to-accent-orange bg-clip-text text-lg font-bold tracking-tight text-transparent sm:text-xl">
              {site.domain}
            </span>
            <span className="hidden text-[11px] font-medium text-muted sm:block">
              {site.tagline}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${site.phoneTel}`}
              className="text-sm font-medium text-muted transition-colors hover:text-white"
            >
              {site.phoneDisplay}
            </a>
            <QuoteCTALink
              href="/contact#quote"
              className="rounded-xl bg-gradient-to-r from-accent-purple to-accent-orange px-4 py-2.5 text-sm font-semibold text-white shadow-glow-orange transition-[transform,filter] hover:brightness-110 active:scale-[0.98]"
            >
              Get a Quote
            </QuoteCTALink>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-card text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={links} />
    </>
  );
}
