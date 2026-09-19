export const SITE_NAME = "ODex";
export const SITE_TAGLINE = "Outdoor Experience";

/**
 * Canonical origin, used for `metadataBase`, the sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL per environment — the production domain isn't
 * decided yet, so this falls back to localhost rather than inventing one.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Absolute URL for a site path, e.g. `absoluteUrl("/events")`. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
