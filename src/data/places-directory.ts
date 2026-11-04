import {
  DEFAULT_PLACES_PARAMS,
  PLACES_MAX_LIMIT,
  PLACE_SORT_KEYS,
} from "@/lib/places-params";
import type { PlacesParams, PlaceSortKey } from "@/lib/places-params";
import { PLACES } from "./places";
import type { PlaceKind, PlaceRecord } from "./places";
import { getPlaceEvents } from "./places";

type RawSearchParams = Record<string, string | string[] | undefined>;

const list = (value: string | string[] | undefined): string[] =>
  (Array.isArray(value) ? value : value ? [value] : []).filter(Boolean);

const PLACE_KINDS: readonly PlaceKind[] = ["peak", "region", "lake", "monastery", "forest", "cave"];

/** Untrusted query string → valid `PlacesParams`. Unknown values are dropped, never thrown on. */
export function parsePlacesParams(raw: RawSearchParams): PlacesParams {
  const one = (key: string) => list(raw[key])[0];
  const kind = one("kind");
  const sort = one("sort") as PlaceSortKey | undefined;
  const limit = Number(one("limit"));

  return {
    kind: kind && (PLACE_KINDS as readonly string[]).includes(kind) ? kind : "",
    sort: sort && PLACE_SORT_KEYS.includes(sort) ? sort : DEFAULT_PLACES_PARAMS.sort,
    view: one("view") === "list" ? "list" : "grid",
    limit: Number.isInteger(limit) && limit > 0 ? Math.min(limit, PLACES_MAX_LIMIT) : DEFAULT_PLACES_PARAMS.limit,
  };
}

// Bookings aren't tracked per place; each place's own upcoming-event count
// (derived from the same region proxy as getPlaceEvents) is the honest
// stand-in for "popular".
const popularity = (place: PlaceRecord) => getPlaceEvents(place).length;

const SORTERS: Record<PlaceSortKey, (a: PlaceRecord, b: PlaceRecord) => number> = {
  // No real distance-from-Yerevan field to sort by yet — falls back to the catalog's own order.
  nearest: () => 0,
  popular: (a, b) => popularity(b) - popularity(a),
  name: (a, b) => a.name.localeCompare(b.name, "hy"),
};

/** ALL matching places, sorted. Paging (`limit`) is applied by the caller, so the total is known. */
export function queryPlaces(params: PlacesParams): PlaceRecord[] {
  return PLACES.filter((place) => !params.kind || place.kind === params.kind).sort(SORTERS[params.sort]);
}

/** How many places match each kind, for the chip-bar counts. */
export function placeKindCounts(): Record<PlaceKind, number> {
  const counts: Record<PlaceKind, number> = { peak: 0, region: 0, lake: 0, monastery: 0, forest: 0, cave: 0 };
  for (const place of PLACES) counts[place.kind] += 1;
  return counts;
}
