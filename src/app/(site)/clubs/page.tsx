import type { Metadata } from "next";
import { AppliedFilterBar } from "@/components/AppliedFilterBar";
import type { AppliedFilter } from "@/components/AppliedFilterBar";
import { CardGrid } from "@/components/CardGrid";
import { ChipFilterBar } from "@/components/ChipFilterBar";
import { ClubCard } from "@/components/ClubCard";
import { ClubCtaCard } from "@/components/ClubCtaCard";
import { EmptyState } from "@/components/EmptyState";
import { FacetFilter } from "@/components/FacetFilter";
import { FiltersDrawer } from "@/components/FiltersDrawer";
import { JsonLd } from "@/components/JsonLd";
import { LoadMore } from "@/components/LoadMore";
import { SortSelect } from "@/components/SortSelect";
import { VerificationChecklist } from "@/components/VerificationChecklist";
import { ViewToggle } from "@/components/ViewToggle";
import { clubsCopy as copy } from "@/content/clubs";
import { ACTIVITIES, getActivity } from "@/data/activities";
import { CLUBS, toClubCardProps } from "@/data/clubs";
import { clubRegionCounts, parseClubsParams, queryClubs } from "@/data/clubs-directory";
import { getRegion } from "@/data/regions";
import {
  CLUBS_LOAD_MORE,
  CLUBS_PAGE_SIZE,
  DEFAULT_CLUBS_PARAMS,
  clubsHref,
  hasActiveClubFilters,
  toClubsSearchParams,
} from "@/lib/clubs-params";
import { SITE_NAME } from "@/lib/site";
import { itemListJsonLd } from "@/lib/structured-data";
import styles from "./page.module.scss";

// One canonical URL; only the unfiltered, first-page list is indexable — every
// filter/sort/limit combination is a thin duplicate of it.
export async function generateMetadata({ searchParams }: PageProps<"/clubs">): Promise<Metadata> {
  const params = parseClubsParams(await searchParams);
  const description = copy.lead(CLUBS.length);
  const variant = hasActiveClubFilters(params) || toClubsSearchParams(params).size > 0;

  return {
    title: copy.title,
    description,
    alternates: { canonical: "/clubs" },
    robots: variant ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", siteName: SITE_NAME, locale: "hy_AM", url: "/clubs", title: copy.title, description },
  };
}

export default async function ClubsPage({ searchParams }: PageProps<"/clubs">) {
  const params = parseClubsParams(await searchParams);

  const matching = queryClubs(params);
  const shown = matching.slice(0, params.limit);
  const remaining = matching.length - shown.length;

  // Any change of filter starts again from the first page.
  const firstPage = { limit: CLUBS_PAGE_SIZE };
  const applied: AppliedFilter[] = [
    ...(params.activity
      ? [
          {
            key: `activity:${params.activity}`,
            label: getActivity(params.activity)?.title ?? params.activity,
            href: clubsHref(params, { activity: "", ...firstPage }),
          },
        ]
      : []),
    ...params.region.map((slug) => ({
      key: `region:${slug}`,
      label: getRegion(slug)?.name ?? slug,
      href: clubsHref(params, { region: params.region.filter((entry) => entry !== slug), ...firstPage }),
    })),
  ];
  const clearHref = clubsHref(params, { activity: "", region: [], ...firstPage });
  const query = toClubsSearchParams(params).toString();

  const regionFilter = (
    <FacetFilter
      title={copy.sidebar.regionTitle}
      name="region"
      options={clubRegionCounts(params).map((region) => ({ value: region.slug, label: region.name, count: region.count }))}
      selected={params.region}
      pathname="/clubs"
      query={query}
    />
  );

  return (
    <>
      <JsonLd
        data={itemListJsonLd(
          copy.title,
          matching.map((club) => ({ name: club.name, href: `/clubs/${club.slug}` })),
        )}
      />

      <div className={styles.head}>
        <div className={styles.title}>
          <h1 className={styles.h1}>{copy.title}</h1>
          <p className={styles.lead}>{copy.lead(CLUBS.length)}</p>
        </div>
        <ChipFilterBar
          label={copy.activityNav}
          items={[
            { key: "all", label: copy.allActivities, href: clubsHref(params, { activity: "", ...firstPage }), active: !params.activity },
            ...ACTIVITIES.map((activity) => ({
              key: activity.slug,
              label: activity.title,
              href: clubsHref(params, { activity: activity.slug, ...firstPage }),
              active: params.activity === activity.slug,
            })),
          ]}
        />
      </div>

      <div className={styles.toolbar}>
        <AppliedFilterBar
          className={styles.applied}
          resultCount={matching.length}
          resultsLabel={copy.toolbar.resultsLabel}
          filters={applied}
          clearAllHref={clearHref}
          clearAllLabel={copy.toolbar.clearAll}
          removeLabel={copy.toolbar.remove}
        />
        <FiltersDrawer
          label={copy.sidebar.filtersLabel}
          closeLabel={copy.sidebar.closeLabel}
          activeCount={applied.length}
        >
          {regionFilter}
        </FiltersDrawer>
        <SortSelect
          pathname="/clubs"
          query={query}
          defaultValue={DEFAULT_CLUBS_PARAMS.sort}
          value={params.sort}
          options={copy.toolbar.sortOptions}
          label={copy.toolbar.sortLabel}
        />
        <ViewToggle
          value={params.view}
          hrefs={{ grid: clubsHref(params, { view: "grid" }), list: clubsHref(params, { view: "list" }) }}
          labels={copy.toolbar.view}
        />
      </div>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          {regionFilter}
          <VerificationChecklist title={copy.sidebar.verification.title} items={[...copy.sidebar.verification.items]} />
          <ClubCtaCard
            title={copy.sidebar.cta.title}
            text={copy.sidebar.cta.text}
            actionLabel={copy.sidebar.cta.action}
            href={copy.sidebar.cta.href}
          />
        </aside>

        <div className={styles.results}>
          {shown.length === 0 ? (
            <EmptyState title={copy.empty.title} action={{ label: copy.toolbar.clearAll, href: clearHref }} />
          ) : (
            <CardGrid columns={params.view === "list" ? "list" : "results"}>
              {shown.map((club, index) => (
                <li key={club.slug}>
                  <ClubCard {...toClubCardProps(club)} preload={index < 3} />
                </li>
              ))}
            </CardGrid>
          )}

          {matching.length > 0 ? (
            remaining > 0 ? (
              <LoadMore
                status={copy.loadMore.status(shown.length, matching.length)}
                actionLabel={copy.loadMore.action(Math.min(CLUBS_LOAD_MORE, remaining))}
                href={clubsHref(params, { limit: params.limit + Math.min(CLUBS_LOAD_MORE, remaining) })}
                icon={null}
              />
            ) : (
              <p className={styles.status}>{copy.loadMore.status(shown.length, matching.length)}</p>
            )
          ) : null}
        </div>
      </div>
    </>
  );
}
