/**
 * Full-page backdrop images for inner routes (Unsplash — screen printing & apparel).
 * Picked by pathname so each section feels slightly different.
 */
export const INNER_PAGE_BACKDROP_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=78",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1920&q=78",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1920&q=78",
  "https://images.unsplash.com/photo-1556821840-3a63d9569b57?auto=format&fit=crop&w=1920&q=78",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1920&q=78",
];

export function backdropIndexForPath(pathname: string): number {
  let n = 0;
  for (let i = 0; i < pathname.length; i++) {
    n = (n + pathname.charCodeAt(i) * (i + 3)) % 10009;
  }
  return n % INNER_PAGE_BACKDROP_IMAGES.length;
}
