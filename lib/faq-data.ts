export type FAQItem = { q: string; a: string };

export const faqItems: FAQItem[] = [
  {
    q: "How much do custom shirts cost in Miami?",
    a: "Pricing depends on quantity, garment style, colors, and turnaround. Small runs cost more per piece; bulk orders unlock better rates. Request a quote with your details and we’ll send a clear estimate fast.",
  },
  {
    q: "Do you offer bulk discounts?",
    a: "Yes. Larger quantities typically lower the per-shirt price. Tell us your count, sizes, and print locations—we’ll build a tiered quote that fits your budget.",
  },
  {
    q: "How fast is turnaround?",
    a: "Standard orders move quickly for a local shop. Rush and same-day options may be available depending on the job—ask when you submit your quote and we’ll confirm realistic timelines.",
  },
  {
    q: "Can you help with design?",
    a: "Absolutely. Bring your logo or rough idea and our graphic design team can clean it up, set up print-ready files, or create something new that matches your brand.",
  },
  {
    q: "What types of shirts can I order?",
    a: "We work with tees, long sleeves, hoodies, blends, and more—from budget-friendly basics to premium blanks. If you need a specific brand or fit, include it in your quote request.",
  },
  {
    q: "Do you print for businesses and events?",
    a: "Yes. We regularly support staff uniforms, promo merch, sports teams, schools, launches, and large events throughout Miami and nearby areas.",
  },
  {
    q: "What file types do you accept?",
    a: "Vector art (AI, EPS, PDF) or high-resolution PNG works best. If you’re not sure, upload what you have—we’ll advise what’s needed for the best print.",
  },
];

/** Subset for home preview accordion */
export const faqPreviewItems: FAQItem[] = faqItems.slice(0, 5);
