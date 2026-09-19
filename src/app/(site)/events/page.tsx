import type { Metadata } from "next";
import { AppliedFilterBar } from "@/components/AppliedFilterBar";
import type { AppliedFilter } from "@/components/AppliedFilterBar";
import { CardGrid } from "@/components/CardGrid";
import { DayHeader } from "@/components/DayHeader";
import { EmptyState } from "@/components/EmptyState";
import { EventCard } from "@/components/EventCard";
import { FilterPanel } from "@/components/FilterPanel";
import { FiltersDrawer } from "@/components/FiltersDrawer";
import { JsonLd } from "@/components/JsonLd";
import { LoadMore } from "@/components/LoadMore";
import { SortSelect } from "@/components/SortSelect";
import { VerifiedNote } from "@/components/VerifiedNote";
import { ViewToggle } from "@/components/ViewToggle";
import { buildDiscoverySearchBand, discoveryCopy, discoveryLead } from "@/content/discovery";
import { ACTIVITIES, getActivity } from "@/data/activities";
import { findClub } from "@/data/clubs";
import {
  activityCounts,
  groupEventsByDay,
  nextDeparture,
  parseDiscoveryParams,
  queryEvents,
  regionConditions,
  windowStats,
} from "@/data/discovery";
import { toEventCardProps } from "@/data/events";
import { getRegion } from "@/data/regions";
import { DEFAULT_PARAMS, discoveryHref, hasActiveFilters, toSearchParams } from "@/lib/discovery-params";
import { DIFFICULTY_LABELS } from "@/lib/difficulty";
import { formatDayMonthDative, formatPrice } from "@/lib/format";
import { SITE_NAME } from "@/lib/site";
import { itemListJsonLd } from "@/lib/structured-data";
import { DiscoveryHero } from "@/sections/discovery/DiscoveryHero";
import { SearchBandSection } from "@/sections/home/SearchBandSection";
import styles from "./page.module.scss";

const TITLE = "Միջոցառումներ";

// One canonical URL, and only the unfiltered list is indexable: every filter
// combination is a thin duplicate of it, and there are endlessly many.
export async function generateMetadata({ searchParams }: PageProps<"/events">): Promise<Metadata> {
  const params = parseDiscoveryParams(await searchParams);
  const stats = windowStats(params.when);
  const description = discoveryLead(stats);
  const filtered = hasActiveFilters(params) || params.when !== DEFAULT_PARAMS.when || params.view !== "grid";

  return {
    title: TITLE,
    description,
    alternates: { canonical: "/events" },
    robots: filtered ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", siteName: SITE_NAME, locale: "hy_AM", url: "/events", title: TITLE, description },
  };
}

export default async function EventsPage({ searchParams }: PageProps<"/events">) {
  const params = parseDiscoveryParams(await searchParams);
  const copy = discoveryCopy;

  const events = queryEvents(params);
  const days = groupEventsByDay(events);
  const stats = windowStats(params.when);
  const upcoming = nextDeparture(params);

  // Where each removal goes: this list with just that one filter dropped.
  const applied: AppliedFilter[] = [
    ...params.activity.map((slug) => ({
      key: `activity:${slug}`,
      label: getActivity(slug)?.title ?? slug,
      href: discoveryHref(params, { activity: params.activity.filter((entry) => entry !== slug) }),
    })),
    ...params.region.map((slug) => ({
      key: `region:${slug}`,
      label: getRegion(slug)?.name ?? slug,
      href: discoveryHref(params, { region: params.region.filter((entry) => entry !== slug) }),
    })),
    ...params.club.map((slug) => ({
      key: `club:${slug}`,
      label: findClub(slug)?.name ?? slug,
      href: discoveryHref(params, { club: params.club.filter((entry) => entry !== slug) }),
    })),
    ...params.difficulty.map((level) => ({
      key: `difficulty:${level}`,
      label: DIFFICULTY_LABELS[level],
      href: discoveryHref(params, { difficulty: params.difficulty.filter((entry) => entry !== level) }),
    })),
    ...(params.maxPrice !== null
      ? [
          {
            key: "price",
            label: `${copy.filters.priceUpTo} ${formatPrice(params.maxPrice)}`,
            href: discoveryHref(params, { maxPrice: null }),
          },
        ]
      : []),
    ...(params.q ? [{ key: "q", label: params.q, href: discoveryHref(params, { q: "" }) }] : []),
  ];

  const clearHref = discoveryHref(params, { activity: [], region: [], club: [], difficulty: [], maxPrice: null, q: "" });
  const counts = activityCounts(params);
  const activities = ACTIVITIES.map((activity) => ({
    slug: activity.slug,
    title: activity.title,
    count: counts[activity.slug] ?? 0,
  }));

  const conditions = regionConditions(params.when).map((region) => ({
    slug: region.slug,
    name: region.name,
    condition: region.forecast!.condition,
    temperature: region.forecast!.temperature,
    conditionLabel: region.forecast!.conditionLabel,
    count: region.count,
    href: discoveryHref({ ...DEFAULT_PARAMS, when: params.when }, { region: [region.slug] }),
  }));

  const filterPanel = (
    <FilterPanel params={params} activities={activities} clearHref={clearHref} labels={copy.filters} />
  );

  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          TITLE,
          events.map((event) => ({ name: event.title, href: `/events/${event.slug}` })),
        )}
      />

      <DiscoveryHero
        image="/images/hero/discovery-banner.png"
        title={copy.title}
        lead={discoveryLead(stats)}
        conditions={{ regions: conditions, label: copy.conditionsLabel, eventsLabel: copy.eventsLabel }}
      />
      <SearchBandSection {...buildDiscoverySearchBand(params)} />

      <div className={styles.toolbar}>
        <AppliedFilterBar
          className={styles.applied}
          resultCount={events.length}
          resultsLabel={copy.toolbar.resultsLabel}
          filters={applied}
          clearAllHref={clearHref}
          clearAllLabel={copy.toolbar.clearAll}
          removeLabel={copy.toolbar.remove}
        />
        <FiltersDrawer label={copy.filters.title} closeLabel={copy.filters.close} activeCount={applied.length}>
          {filterPanel}
        </FiltersDrawer>
        <SortSelect
          pathname="/events"
          query={toSearchParams(params).toString()}
          defaultValue={DEFAULT_PARAMS.sort}
          value={params.sort}
          options={[...copy.toolbar.sortOptions]}
          label={copy.toolbar.sortLabel}
        />
        <ViewToggle
          value={params.view}
          hrefs={{
            grid: discoveryHref(params, { view: "grid" }),
            list: discoveryHref(params, { view: "list" }),
          }}
          labels={copy.toolbar.view}
        />
      </div>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          {filterPanel}
          <VerifiedNote title={copy.verifiedNote.title} description={copy.verifiedNote.description} />
        </aside>

        <div className={styles.results}>
          {days.length === 0 ? (
            <EmptyState title={copy.empty.title} action={{ label: copy.toolbar.clearAll, href: clearHref }} />
          ) : (
            days.map((day) => {
              const headingId = `day-${day.key}`;
              return (
                <section key={day.key} aria-labelledby={headingId} className={styles.day}>
                  <DayHeader
                    id={headingId}
                    day={day.label.day}
                    weekdayShort={day.label.weekdayShort}
                    label={day.label.full}
                    summary={`${day.events.length} մեկնում · ամենավաղը ${day.earliest}`}
                  />
                  <CardGrid columns={params.view === "list" ? "list" : "results"}>
                    {day.events.map((event) => (
                      <li key={event.slug}>
                        <EventCard {...toEventCardProps(event)} sizes="(min-width: 1200px) 336px, (min-width: 768px) 50vw, 100vw" />
                      </li>
                    ))}
                  </CardGrid>
                </section>
              );
            })
          )}

          {params.when === "this-weekend" ? (
            <LoadMore
              status={
                upcoming
                  ? `Ցուցադրված է ${events.length} · հաջորդ մեկնումը ${formatDayMonthDative(upcoming.startsAt)}`
                  : `Ցուցադրված է ${events.length}`
              }
              actionLabel={copy.loadMore.action}
              href={discoveryHref(params, { when: "next-week" })}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
