import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CardGrid } from "@/components/CardGrid";
import { ChipFilterBar } from "@/components/ChipFilterBar";
import { EmptyState } from "@/components/EmptyState";
import { JsonLd } from "@/components/JsonLd";
import { LoadMore } from "@/components/LoadMore";
import { PlaceCard } from "@/components/PlaceCard";
import { SortSelect } from "@/components/SortSelect";
import { ViewToggle } from "@/components/ViewToggle";
import { placesCopy as copy } from "@/content/places";
import { PLACES, PLACE_KIND_FILTERS, toPlaceCardProps } from "@/data/places";
import { parsePlacesParams, placeKindCounts, queryPlaces } from "@/data/places-directory";
import { DEFAULT_PLACES_PARAMS, PLACES_LOAD_MORE, placesHref, toPlacesSearchParams } from "@/lib/places-params";
import { SITE_NAME } from "@/lib/site";
import { itemListJsonLd } from "@/lib/structured-data";
import styles from "./page.module.scss";

// One canonical URL; only the unfiltered, first-page list is indexable — every
// kind/sort/limit combination is a thin duplicate of it (same approach as /clubs).
export async function generateMetadata({ searchParams }: PageProps<"/places">): Promise<Metadata> {
  const params = parsePlacesParams(await searchParams);
  const description = copy.lead(PLACES.length);
  const variant = params.kind !== "" || toPlacesSearchParams(params).size > 0;

  return {
    title: copy.title,
    description,
    alternates: { canonical: "/places" },
    robots: variant ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", siteName: SITE_NAME, locale: "hy_AM", url: "/places", title: copy.title, description },
  };
}

export default async function PlacesPage({ searchParams }: PageProps<"/places">) {
  const params = parsePlacesParams(await searchParams);

  const matching = queryPlaces(params);
  const shown = matching.slice(0, params.limit);
  const remaining = matching.length - shown.length;
  const totalPhotos = PLACES.reduce((sum, place) => sum + place.photoCount, 0);

  const firstPage = { limit: DEFAULT_PLACES_PARAMS.limit };
  const counts = placeKindCounts();
  const query = toPlacesSearchParams(params).toString();

  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          copy.title,
          matching.map((place) => ({ name: place.name, href: `/places/${place.slug}` })),
        )}
      />

      <div className={styles.head}>
        <Breadcrumb
          items={[
            { label: "Գլխավոր", href: "/" },
            { label: copy.title, href: "/places" },
          ]}
          label="Ուղենիշ"
        />
        <div className={styles.title}>
          <h1 className={styles.h1}>{copy.title}</h1>
          <p className={styles.lead}>{copy.lead(PLACES.length)}</p>
        </div>
        <ChipFilterBar
          label={copy.kindNav}
          items={[
            { key: "all", label: copy.allKinds, href: placesHref(params, { kind: "", ...firstPage }), active: !params.kind },
            ...PLACE_KIND_FILTERS.filter((entry) => counts[entry.kind] > 0).map((entry) => ({
              key: entry.kind,
              label: entry.label,
              href: placesHref(params, { kind: entry.kind, ...firstPage }),
              active: params.kind === entry.kind,
            })),
          ]}
        />
      </div>

      <div className={styles.toolbar}>
        <p className={styles.count}>
          {matching.length} {copy.toolbar.resultsLabel} · {totalPhotos.toLocaleString("hy-AM")} {copy.toolbar.photosLabel}
        </p>
        <SortSelect
          pathname="/places"
          query={query}
          defaultValue={DEFAULT_PLACES_PARAMS.sort}
          value={params.sort}
          options={copy.toolbar.sortOptions}
          label={copy.toolbar.sortLabel}
        />
        <ViewToggle
          value={params.view}
          hrefs={{ grid: placesHref(params, { view: "grid" }), list: placesHref(params, { view: "list" }) }}
          labels={copy.toolbar.view}
        />
      </div>

      <div className={styles.results}>
        {shown.length === 0 ? (
          <EmptyState title={copy.empty.title} action={{ label: copy.empty.action, href: placesHref(params, { kind: "", ...firstPage }) }} />
        ) : (
          <CardGrid columns={params.view === "list" ? "list" : 4}>
            {shown.map((place, index) => (
              <li key={place.slug}>
                <PlaceCard {...toPlaceCardProps(place, copy.eventsLabel)} preload={index < 4} />
              </li>
            ))}
          </CardGrid>
        )}

        {matching.length > 0 ? (
          remaining > 0 ? (
            <LoadMore
              status={copy.loadMore.status(shown.length, matching.length)}
              actionLabel={copy.loadMore.action(Math.min(PLACES_LOAD_MORE, remaining))}
              href={placesHref(params, { limit: params.limit + Math.min(PLACES_LOAD_MORE, remaining) })}
              icon={null}
            />
          ) : (
            <p className={styles.status}>{copy.loadMore.status(shown.length, matching.length)}</p>
          )
        ) : null}
      </div>
    </>
  );
}
