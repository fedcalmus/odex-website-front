import {
  CLUBS_MAX_LIMIT,
  CLUB_SORT_KEYS,
  DEFAULT_CLUBS_PARAMS,
} from "@/lib/clubs-params";
import type { ClubsParams, ClubSortKey } from "@/lib/clubs-params";
import { getActivity } from "./activities";
import { CLUBS, getClubEvents } from "./clubs";
import type { ClubRecord } from "./clubs";
import { getRegion } from "./regions";

type RawSearchParams = Record<string, string | string[] | undefined>;

const list = (value: string | string[] | undefined): string[] =>
  (Array.isArray(value) ? value : value ? [value] : []).filter(Boolean);

/** Untrusted query string → valid `ClubsParams`. Unknown values are dropped, never thrown on. */
export function parseClubsParams(raw: RawSearchParams): ClubsParams {
  const one = (key: string) => list(raw[key])[0];
  const activity = one("activity");
  const sort = one("sort") as ClubSortKey | undefined;
  const limit = Number(one("limit"));

  return {
    activity: activity && getActivity(activity) ? activity : "",
    region: [...new Set(list(raw.region).filter((slug) => getRegion(slug)))],
    sort: sort && CLUB_SORT_KEYS.includes(sort) ? sort : DEFAULT_CLUBS_PARAMS.sort,
    view: one("view") === "list" ? "list" : "grid",
    limit: Number.isInteger(limit) && limit > 0 ? Math.min(limit, CLUBS_MAX_LIMIT) : DEFAULT_CLUBS_PARAMS.limit,
  };
}

const nextDeparture = (club: ClubRecord) => getClubEvents(club.slug)[0]?.startsAt ?? "9999";
const lowestPrice = (club: ClubRecord) =>
  Math.min(...getClubEvents(club.slug).map((event) => event.price.amount), Number.POSITIVE_INFINITY);

const SORTERS: Record<ClubSortKey, (a: ClubRecord, b: ClubRecord) => number> = {
  // A club with no upcoming departure sorts last.
  soonest: (a, b) => nextDeparture(a).localeCompare(nextDeparture(b)),
  // Bookings aren't tracked yet; completed trips is the honest proxy for "in demand".
  popular: (a, b) => b.completedTrips - a.completedTrips,
  "price-asc": (a, b) => lowestPrice(a) - lowestPrice(b),
  "price-desc": (a, b) => lowestPrice(b) - lowestPrice(a),
  name: (a, b) => a.name.localeCompare(b.name, "hy"),
  rating: (a, b) => b.rating.value - a.rating.value,
};

interface QueryOptions {
  /** Skip the region filter — for the facet counts beside the checkboxes. */
  ignoreRegion?: boolean;
}

/** ALL matching clubs, sorted. Paging (`limit`) is applied by the caller, so the total is known. */
export function queryClubs(params: ClubsParams, options: QueryOptions = {}): ClubRecord[] {
  return CLUBS.filter(
    (club) =>
      (!params.activity || club.activities.includes(params.activity as ClubRecord["primaryActivity"])) &&
      (options.ignoreRegion || params.region.length === 0 || params.region.includes(club.baseRegion)),
  ).sort(SORTERS[params.sort]);
}

/** Regions that have at least one matching club, with how many. */
export function clubRegionCounts(params: ClubsParams): Array<{ slug: string; name: string; count: number }> {
  const counts = new Map<string, number>();
  for (const club of queryClubs(params, { ignoreRegion: true })) {
    counts.set(club.baseRegion, (counts.get(club.baseRegion) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([slug, count]) => ({ slug, name: getRegion(slug)?.name ?? slug, count }));
}
