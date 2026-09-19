import { formatDayKey, formatEventTime, getDayLabel } from "@/lib/format";
import type { DayLabel } from "@/lib/format";
import { isDifficultyLevel } from "@/lib/difficulty";
import { DEFAULT_WINDOW, PRICE_MAX } from "@/lib/discovery-params";
import type { DiscoveryParams, WindowKey } from "@/lib/discovery-params";
import { getActivity } from "./activities";
import { findClub } from "./clubs";
import { getAllEvents } from "./events";
import type { EventRecord } from "./events";
import { getRegion } from "./regions";

// ── The filter model ────────────────────────────────────────────────────────
// The URL IS the state: every filter is a query parameter, so a filtered list
// is shareable, crawlable and works with the back button — and the server
// renders it without any client state.

/** Calendar windows (Yerevan days, inclusive). MOCK: the API would compute these from "today". */
export const WINDOWS: Record<Exclude<WindowKey, "all">, { from: string; to: string; fromIso: string; toIso: string }> = {
  "this-weekend": {
    from: "2026-09-11",
    to: "2026-09-13",
    fromIso: "2026-09-11T12:00:00+04:00",
    toIso: "2026-09-13T12:00:00+04:00",
  },
  "next-week": {
    from: "2026-09-14",
    to: "2026-09-20",
    fromIso: "2026-09-14T12:00:00+04:00",
    toIso: "2026-09-20T12:00:00+04:00",
  },
};

type RawSearchParams = Record<string, string | string[] | undefined>;

const list = (value: string | string[] | undefined): string[] =>
  (Array.isArray(value) ? value : value ? [value] : []).filter(Boolean);

/** Untrusted query string → a valid `DiscoveryParams`. Anything unknown is dropped, never thrown on. */
export function parseDiscoveryParams(raw: RawSearchParams): DiscoveryParams {
  const one = (key: string) => list(raw[key])[0];
  const price = Number(one("maxPrice"));
  const when = one("when");
  const sort = one("sort");
  const view = one("view");

  return {
    activity: [...new Set(list(raw.activity).filter((slug) => getActivity(slug)))],
    region: [...new Set(list(raw.region).filter((slug) => getRegion(slug)))],
    club: [...new Set(list(raw.club).filter((slug) => findClub(slug)))],
    difficulty: [...new Set(list(raw.difficulty).filter(isDifficultyLevel))],
    maxPrice: Number.isFinite(price) && price >= 0 && price < PRICE_MAX ? price : null,
    when: when === "next-week" || when === "all" ? when : DEFAULT_WINDOW,
    q: (one("q") ?? "").trim().slice(0, 80),
    sort: sort === "cheapest" ? "cheapest" : "soonest",
    view: view === "list" ? "list" : "grid",
  };
}

// ── Querying ────────────────────────────────────────────────────────────────

const inWindow = (event: EventRecord, window: WindowKey) => {
  if (window === "all") return true;
  const day = formatDayKey(event.startsAt);
  return day >= WINDOWS[window].from && day <= WINDOWS[window].to;
};

const matchesText = (event: EventRecord, q: string) => {
  if (!q) return true;
  const haystack = [event.title, findClub(event.club)?.name ?? "", getRegion(event.region)?.name ?? ""]
    .join(" ")
    .toLocaleLowerCase("hy");
  return haystack.includes(q.toLocaleLowerCase("hy"));
};

interface QueryOptions {
  /** Skip one filter — used for facet counts ("how many hiking events if I ticked hiking"). */
  ignore?: "activity";
  /** Query all upcoming events instead of the window (for "next departure"). */
  anyTime?: boolean;
}

export function queryEvents(params: DiscoveryParams, options: QueryOptions = {}): EventRecord[] {
  const results = getAllEvents().filter(
    (event) =>
      (options.anyTime || inWindow(event, params.when)) &&
      (options.ignore === "activity" || params.activity.length === 0 || params.activity.includes(event.activity)) &&
      (params.region.length === 0 || params.region.includes(event.region)) &&
      (params.club.length === 0 || params.club.includes(event.club)) &&
      (params.difficulty.length === 0 || params.difficulty.includes(event.difficulty)) &&
      (params.maxPrice === null || event.price.amount <= params.maxPrice) &&
      matchesText(event, params.q),
  );

  return results.sort((a, b) =>
    params.sort === "cheapest" && a.price.amount !== b.price.amount
      ? a.price.amount - b.price.amount
      : a.startsAt.localeCompare(b.startsAt),
  );
}

export function activityCounts(params: DiscoveryParams): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const event of queryEvents(params, { ignore: "activity" })) {
    counts[event.activity] = (counts[event.activity] ?? 0) + 1;
  }
  return counts;
}

/** The first matching event AFTER the current window — "next departure 18 September". */
export function nextDeparture(params: DiscoveryParams): EventRecord | undefined {
  if (params.when === "all") return undefined;
  const windowEnd = WINDOWS[params.when].to;
  return queryEvents(params, { anyTime: true }).find((event) => formatDayKey(event.startsAt) > windowEnd);
}

export interface DayGroup {
  key: string;
  label: DayLabel;
  /** "05:30" */
  earliest: string;
  events: EventRecord[];
}

/** Results grouped by calendar day, days in order; events keep the query's order within a day. */
export function groupEventsByDay(events: EventRecord[]): DayGroup[] {
  const groups = new Map<string, DayGroup>();
  for (const event of events) {
    const key = formatDayKey(event.startsAt);
    const group = groups.get(key);
    if (group) {
      group.events.push(event);
      if (formatEventTime(event.startsAt) < group.earliest) group.earliest = formatEventTime(event.startsAt);
    } else {
      groups.set(key, {
        key,
        label: getDayLabel(event.startsAt),
        earliest: formatEventTime(event.startsAt),
        events: [event],
      });
    }
  }
  return [...groups.values()].sort((a, b) => a.key.localeCompare(b.key));
}

/** Headline numbers for a window, ignoring filters — the discovery hero line. */
export function windowStats(window: WindowKey) {
  const events = getAllEvents().filter((event) => inWindow(event, window));
  return {
    events: events.length,
    clubs: new Set(events.map((event) => event.club)).size,
    regions: new Set(events.map((event) => event.region)).size,
  };
}

export interface RegionCondition {
  slug: string;
  name: string;
  forecast: NonNullable<ReturnType<typeof getRegion>>["forecast"];
  count: number;
}

/** Regions that have a forecast, with how many events they host in the window. */
export function regionConditions(window: WindowKey): RegionCondition[] {
  const events = getAllEvents().filter((event) => inWindow(event, window));
  return ["aragatsotn", "syunik", "tavush", "gegharkunik", "kotayk"].flatMap((slug) => {
    const region = getRegion(slug);
    if (!region?.forecast) return [];
    return [
      {
        slug,
        name: region.name,
        forecast: region.forecast,
        count: events.filter((event) => event.region === slug).length,
      },
    ];
  });
}
