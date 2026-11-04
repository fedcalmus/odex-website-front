// The places-directory filter model — pure and data-free, mirroring clubs-params.ts.
// The URL is the state; defaults are omitted so equivalent states share one URL.

export type PlaceSortKey = "nearest" | "popular" | "name";
export type PlaceViewKey = "grid" | "list";

export const PLACE_SORT_KEYS: readonly PlaceSortKey[] = ["nearest", "popular", "name"];
export const PLACES_PAGE_SIZE = 8;
export const PLACES_LOAD_MORE = 8;
export const PLACES_MAX_LIMIT = 120;

export interface PlacesParams {
  /** "" = every kind. A `PlaceKind` slug otherwise — kept loose here (see ClubsParams.activity) so this stays data-free. */
  kind: string;
  sort: PlaceSortKey;
  view: PlaceViewKey;
  /** How many cards are shown; "show N more" raises it. */
  limit: number;
}

export const DEFAULT_PLACES_PARAMS: PlacesParams = {
  kind: "",
  sort: "nearest",
  view: "grid",
  limit: PLACES_PAGE_SIZE,
};

export function toPlacesSearchParams(params: PlacesParams): URLSearchParams {
  const search = new URLSearchParams();
  if (params.kind) search.set("kind", params.kind);
  if (params.sort !== DEFAULT_PLACES_PARAMS.sort) search.set("sort", params.sort);
  if (params.view !== DEFAULT_PLACES_PARAMS.view) search.set("view", params.view);
  if (params.limit !== DEFAULT_PLACES_PARAMS.limit) search.set("limit", String(params.limit));
  return search;
}

/** `/places?…` for these params, with `patch` applied on top. */
export function placesHref(params: PlacesParams, patch: Partial<PlacesParams> = {}): string {
  const query = toPlacesSearchParams({ ...params, ...patch }).toString();
  return query ? `/places?${query}` : "/places";
}

export function hasActivePlaceFilters(params: PlacesParams): boolean {
  return params.kind !== "";
}
