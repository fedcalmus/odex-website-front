import type { DifficultyLevel } from "@/lib/difficulty";

// The discovery filter model — types, defaults and URL (de)serialisation.
// Pure and data-free on purpose: the client filter panel imports it to build
// URLs, and must not drag the mock catalog into the browser bundle.
//
// The URL IS the state: every filter is a query parameter, so a filtered list
// is shareable, crawlable and works with the back button — and the server
// renders it without any client state.

/** `all` = no calendar window (a club's full schedule). */
export type WindowKey = "this-weekend" | "next-week" | "all";
export type SortKey = "soonest" | "cheapest";
export type ViewKey = "grid" | "list";

export const DEFAULT_WINDOW: WindowKey = "this-weekend";
export const PRICE_MAX = 40_000;
export const PRICE_STEP = 1_000;

export interface DiscoveryParams {
  activity: string[];
  region: string[];
  /** Club slugs. */
  club: string[];
  difficulty: DifficultyLevel[];
  /** null = no price cap. */
  maxPrice: number | null;
  when: WindowKey;
  /** Free-text search from the header field. */
  q: string;
  sort: SortKey;
  view: ViewKey;
}

export const DEFAULT_PARAMS: DiscoveryParams = {
  activity: [],
  region: [],
  club: [],
  difficulty: [],
  maxPrice: null,
  when: DEFAULT_WINDOW,
  q: "",
  sort: "soonest",
  view: "grid",
};

/** Canonical query string: defaults are omitted so equivalent states share one URL. */
export function toSearchParams(params: DiscoveryParams): URLSearchParams {
  const search = new URLSearchParams();
  params.activity.forEach((value) => search.append("activity", value));
  params.region.forEach((value) => search.append("region", value));
  params.club.forEach((value) => search.append("club", value));
  params.difficulty.forEach((value) => search.append("difficulty", value));
  if (params.maxPrice !== null) search.set("maxPrice", String(params.maxPrice));
  if (params.when !== DEFAULT_PARAMS.when) search.set("when", params.when);
  if (params.q) search.set("q", params.q);
  if (params.sort !== DEFAULT_PARAMS.sort) search.set("sort", params.sort);
  if (params.view !== DEFAULT_PARAMS.view) search.set("view", params.view);
  return search;
}

/** `/events?…` for these params, with `patch` applied on top. */
export function discoveryHref(params: DiscoveryParams, patch: Partial<DiscoveryParams> = {}): string {
  const query = toSearchParams({ ...params, ...patch }).toString();
  return query ? `/events?${query}` : "/events";
}

/** Any filter at all (not counting sort/view/window, which are just presentation). */
export function hasActiveFilters(params: DiscoveryParams): boolean {
  return (
    params.activity.length > 0 ||
    params.region.length > 0 ||
    params.club.length > 0 ||
    params.difficulty.length > 0 ||
    params.maxPrice !== null ||
    params.q !== ""
  );
}

