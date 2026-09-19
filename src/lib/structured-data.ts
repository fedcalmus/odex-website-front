import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

// schema.org builders. Only facts that are actually known go in — no guessed
// addresses or dates — because wrong structured data is worse than none.

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

/** Enables the sitelinks search box; `q` is the parameter the header search submits. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "hy",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/events?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function itemListJsonLd(name: string, items: ReadonlyArray<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.href),
    })),
  };
}

export function breadcrumbJsonLd(items: ReadonlyArray<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export interface EventJsonLdInput {
  name: string;
  /** ISO 8601 with offset. */
  startsAt: string;
  description?: string;
  /** Site paths or absolute URLs. */
  images: string[];
  placeName: string;
  /** Region / marz. */
  region: string;
  organizer: { name: string; href: string };
  url: string;
  price: number;
  currency: string;
  availability: "InStock" | "LimitedAvailability" | "SoldOut";
}

/**
 * schema.org Event, for rich results. Deliberately no aggregateRating: the
 * ratings on the page are mock, and structured data that claims reviews which
 * don't exist is worse than none.
 */
export function eventJsonLd(event: EventJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.startsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(event.description ? { description: event.description } : {}),
    image: event.images.map((image) => (image.startsWith("http") ? image : absoluteUrl(image))),
    location: {
      "@type": "Place",
      name: event.placeName,
      address: { "@type": "PostalAddress", addressCountry: "AM", addressRegion: event.region },
    },
    organizer: { "@type": "Organization", name: event.organizer.name, url: absoluteUrl(event.organizer.href) },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(event.url),
      price: event.price,
      priceCurrency: event.currency,
      availability: `https://schema.org/${event.availability}`,
    },
  };
}
