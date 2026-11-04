import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CardGrid } from "@/components/CardGrid";
import { ChipFilterBar } from "@/components/ChipFilterBar";
import { EmptyState } from "@/components/EmptyState";
import { EventCard } from "@/components/EventCard";
import { JsonLd } from "@/components/JsonLd";
import { placeDetailCopy as copy } from "@/content/place-detail";
import { placesCopy } from "@/content/places";
import { WINDOWS } from "@/data/discovery";
import { toEventCardProps } from "@/data/events";
import { PLACES, buildPlaceHeroFacts, getPlaceBySlug, getPlaceClubs, getPlaceEvents } from "@/data/places";
import { formatDayKey } from "@/lib/format";
import { SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { PlaceHero } from "@/sections/places/PlaceHero";
import { PlaceSidebar } from "@/sections/places/PlaceSidebar";
import { PlaceTabs } from "@/sections/places/PlaceTabs";
import styles from "./page.module.scss";

// Every catalogued place is prerendered; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PLACES.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: PageProps<"/places/[slug]/events">): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) return {};

  const title = `${copy.tabs.events} · ${place.name}`;
  return {
    title,
    alternates: { canonical: `/places/${place.slug}/events` },
    // Every filter chip is a thin slice of the same list — only the unfiltered page is worth indexing.
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "hy_AM",
      url: `/places/${place.slug}/events`,
      title,
    },
  };
}

type EventFilter = "all" | "weekend" | "available" | "past";
const FILTERS: readonly EventFilter[] = ["weekend", "available", "past"];

export default async function PlaceEventsPage({ params, searchParams }: PageProps<"/places/[slug]/events">) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) notFound();

  const sp = await searchParams;
  const whenRaw = Array.isArray(sp.when) ? sp.when[0] : sp.when;
  const filter: EventFilter = FILTERS.includes(whenRaw as EventFilter) ? (whenRaw as EventFilter) : "all";

  const allEvents = getPlaceEvents(place);
  const clubs = getPlaceClubs(place);

  // "past" always comes back empty: this catalog doesn't track completed
  // occurrences as separate records yet — a real empty state, not a bug.
  const filtered = allEvents.filter((event) => {
    if (filter === "weekend") {
      const day = formatDayKey(event.startsAt);
      return day >= WINDOWS["this-weekend"].from && day <= WINDOWS["this-weekend"].to;
    }
    if (filter === "available") return event.capacity.taken < event.capacity.total;
    if (filter === "past") return false;
    return true;
  });

  const breadcrumb = [
    { label: "Գլխավոր", href: "/" },
    { label: copy.breadcrumbRoot, href: "/places" },
    { label: place.name, href: `/places/${place.slug}` },
    { label: copy.tabs.events, href: `/places/${place.slug}/events` },
  ];

  const chipHref = (value: EventFilter) =>
    value === "all" ? `/places/${place.slug}/events` : `/places/${place.slug}/events?when=${value}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumb.map((item) => ({ name: item.label, href: item.href })))} />

      <div className={styles.breadcrumbRow}>
        <Breadcrumb items={breadcrumb} label={copy.breadcrumbLabel} />
      </div>

      <PlaceHero
        title={place.name}
        image={place.image}
        facts={buildPlaceHeroFacts(place, placesCopy.toolbar.photosLabel)}
        labels={copy.hero}
      />

      <PlaceTabs
        slug={place.slug}
        active="events"
        counts={{ events: allEvents.length, photos: place.photoCount, clubs: clubs.length }}
        copy={copy.tabs}
      />

      <div className={styles.body}>
        <div className={styles.main}>
          <p className={styles.count}>{allEvents.length}</p>

          <ChipFilterBar
            label={copy.eventsPage.chipsLabel}
            items={[
              {
                key: "all",
                label: `${copy.eventsPage.chipAll}  ${allEvents.length}`,
                href: chipHref("all"),
                active: filter === "all",
              },
              {
                key: "weekend",
                label: copy.eventsPage.chipWeekend,
                href: chipHref("weekend"),
                active: filter === "weekend",
              },
              {
                key: "available",
                label: copy.eventsPage.chipAvailable,
                href: chipHref("available"),
                active: filter === "available",
              },
              { key: "past", label: copy.eventsPage.chipPast, href: chipHref("past"), active: filter === "past" },
            ]}
          />

          {filtered.length > 0 ? (
            <CardGrid columns={3}>
              {filtered.map((event) => (
                <li key={event.slug}>
                  <EventCard
                    {...toEventCardProps(event)}
                    sizes="(min-width: 1200px) 316px, (min-width: 768px) 50vw, 100vw"
                  />
                </li>
              ))}
            </CardGrid>
          ) : (
            <EmptyState title={copy.eventsPage.empty} />
          )}
        </div>

        <PlaceSidebar place={place} copy={copy.sidebar} />
      </div>
    </>
  );
}
