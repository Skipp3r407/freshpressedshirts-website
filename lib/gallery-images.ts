/**
 * Gallery assets — swap `src` for local files under `/public/images/gallery/`
 * e.g. src: "/images/gallery/event-tees-01.jpg"
 */
export type GalleryImage = {
  /** Stable id for keys / CMS */
  id: string;
  src: string;
  alt: string;
  /** Short headline in lightbox */
  title: string;
  /** Optional line under image */
  caption?: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "tees-stack",
    src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=82",
    alt: "Neatly folded custom printed t-shirts",
    title: "Retail-ready tee stack",
    caption: "Soft-hand print · corporate reorder",
  },
  {
    id: "screen-press",
    src: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=82",
    alt: "Screen printing press in production",
    title: "On-press color",
    caption: "Spot color + tight registration",
  },
  {
    id: "flat-lay",
    src: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=82",
    alt: "Apparel flat lay mockup",
    title: "Brand system on blanks",
    caption: "Premium cotton · launch drop",
  },
  {
    id: "street-tee",
    src: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1200&q=82",
    alt: "Person wearing printed streetwear shirt",
    title: "Streetwear graphic",
    caption: "Bold front hit · retail quality",
  },
  {
    id: "rack-color",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=82",
    alt: "Retail clothing store with racks of colorful apparel",
    title: "Event batch · multi-color",
    caption: "School fundraiser · 200+ pieces",
  },
  {
    id: "detail-neck",
    src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=82",
    alt: "Close-up of white t-shirt fabric and neckline",
    title: "Detail that sells",
    caption: "Ink sit & hand-feel check",
  },
  {
    id: "team-jersey",
    src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=82",
    alt: "Athletic jerseys and team sports apparel",
    title: "Sports / league run",
    caption: "Names & numbers · rush friendly",
  },
  {
    id: "merch-table",
    src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=82",
    alt: "Merchandise table with folded shirts",
    title: "Pop-up merch table",
    caption: "Conference giveaway · Miami client",
  },
];
