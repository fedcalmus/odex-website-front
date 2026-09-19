// The club-directory filter model — pure and data-free, like `discovery-params`.
// The URL is the state; defaults are omitted so equivalent states share one URL.

export type ClubSortKey = "soonest" | "popular" | "price-asc" | "price-desc" | "name" | "rating";
export type ClubViewKey = "grid" | "list";

export const CLUB_SORT_KEYS: readonly ClubSortKey[] = ["soonest", "popular", "price-asc", "price-desc", "name", "rating"];
export const CLUBS_PAGE_SIZE = 6;
export const CLUBS_LOAD_MORE = 12;
export const CLUBS_MAX_LIMIT = 120;

export interface ClubsParams {
  /** "" = all activities. */
  activity: string;
  region: string[];
  sort: ClubSortKey;
  view: ClubViewKey;
  /** How many cards are shown; "show 12 more" raises it. */
  limit: number;
}

export const DEFAULT_CLUBS_PARAMS: ClubsParams = {
  activity: "",
  region: [],
  sort: "soonest",
  view: "grid",
  limit: CLUBS_PAGE_SIZE,
};

export function toClubsSearchParams(params: ClubsParams): URLSearchParams {
  const search = new URLSearchParams();
  if (params.activity) search.set("activity", params.activity);
  params.region.forEach((value) => search.append("region", value));
  if (params.sort !== DEFAULT_CLUBS_PARAMS.sort) search.set("sort", params.sort);
  if (params.view !== DEFAULT_CLUBS_PARAMS.view) search.set("view", params.view);
  if (params.limit !== DEFAULT_CLUBS_PARAMS.limit) search.set("limit", String(params.limit));
  return search;
}

/** `/clubs?…` for these params, with `patch` applied on top. */
export function clubsHref(params: ClubsParams, patch: Partial<ClubsParams> = {}): string {
  const query = toClubsSearchParams({ ...params, ...patch }).toString();
  return query ? `/clubs?${query}` : "/clubs";
}

export function hasActiveClubFilters(params: ClubsParams): boolean {
  return params.activity !== "" || params.region.length > 0;
}
