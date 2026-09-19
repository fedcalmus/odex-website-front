import type { MetadataRoute } from "next";
import { CLUBS } from "@/data/clubs";
import { getAllEvents } from "@/data/events";
import { absoluteUrl } from "@/lib/site";

// Only routes that exist. Add /clubs, /places, … here as those pages ship.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/events"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/clubs"), changeFrequency: "weekly", priority: 0.8 },
    ...CLUBS.map((club) => ({
      url: absoluteUrl(`/clubs/${club.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...getAllEvents().map((event) => ({
      url: absoluteUrl(`/events/${event.slug}`),
      lastModified: event.startsAt,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
  ];
}
