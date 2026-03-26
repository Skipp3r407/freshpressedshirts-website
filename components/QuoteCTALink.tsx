"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { scrollToQuoteWithHighlight } from "@/lib/quote-scroll";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: string;
};

const FORM_PATHS = new Set(["/", "/contact"]);

/**
 * "Get a Quote" / request-quote links: smooth-scroll + highlight on home & contact;
 * client navigates to `/contact#quote` elsewhere, then {@link QuoteHashScroll} runs.
 */
export function QuoteCTALink({
  href = "/contact#quote",
  onClick,
  children,
  ...rest
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        e.preventDefault();
        if (FORM_PATHS.has(pathname)) {
          scrollToQuoteWithHighlight();
          return;
        }
        router.push("/contact#quote");
      }}
    >
      {children}
    </Link>
  );
}
