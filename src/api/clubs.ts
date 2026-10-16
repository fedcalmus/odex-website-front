import { queryOptions } from "@tanstack/react-query";
import type { ClubCardProps } from "@/components/ClubCard";
import { apiFetch, apiUrl } from "@/lib/api";
import { ACTIVITY_TYPE_LABELS, REGION_LABELS } from "@/content/taxonomy";

// Public club listing. The contract this expects is written down in
// docs/public-clubs-api.md — the backend has no public clubs endpoint yet.

/** What a missing value renders as, anywhere on a club card. */
export const EMPTY = "-";

export const LATEST_CLUBS_LIMIT = 4;

/** Wire shape (snake_case, as the backend serialises). Every field may be missing. */
export interface PublicClubApi {
  id: string;
  name?: string | null;
  /** Preferred URL segment; the id is used until the backend provides one. */
  slug?: string | null;
  logo?: string | null;
  cover_image?: string | null;
  /** Backend activity-type values, e.g. "trail_running". */
  activity_types?: string[] | null;
  /** Backend region value, e.g. "vayots_dzor". */
  base_region?: string | null;
  events_count?: number | null;
  guides_count?: number | null;
}

/** DRF PageNumberPagination envelope. */
export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type LatestClubsResponse = Paginated<PublicClubApi>;

export type ClubListItem = ClubCardProps & { id: string };

export interface LatestClubs {
  /** Total verified clubs on the platform, when the API said so. */
  total: number | undefined;
  clubs: ClubListItem[];
}

const text = (value: string | null | undefined) => value?.trim() || EMPTY;

/** Media paths may come back relative ("/media/…") — resolve them against the API. */
function mediaUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  return /^https?:\/\//i.test(path) ? path : apiUrl(path);
}

/** "ԱՐՇԱՎԱԿԱՆ +1 · ԵՐԵՎԱՆ" — main activity (and how many more), then where the club is based. */
function classification(club: PublicClubApi): string {
  const types = (club.activity_types ?? []).filter(Boolean);
  const first = types[0];
  const activity = first ? (ACTIVITY_TYPE_LABELS[first] ?? EMPTY) : EMPTY;
  const more = types.length > 1 ? ` +${types.length - 1}` : "";
  const region = club.base_region ? (REGION_LABELS[club.base_region] ?? EMPTY) : EMPTY;
  return `${activity}${more} · ${region}`.toLocaleUpperCase("hy");
}

export function toClubListItem(club: PublicClubApi): ClubListItem {
  return {
    id: club.id,
    name: text(club.name),
    href: `/clubs/${club.slug || club.id}`,
    cover: mediaUrl(club.cover_image),
    logo: mediaUrl(club.logo),
    classification: classification(club),
    eventsCount: club.events_count ?? EMPTY,
    guidesCount: club.guides_count ?? EMPTY,
  };
}

export function toLatestClubs(response: LatestClubsResponse): LatestClubs {
  return {
    total: typeof response.count === "number" ? response.count : undefined,
    clubs: (response.results ?? []).slice(0, LATEST_CLUBS_LIMIT).map(toClubListItem),
  };
}

export function fetchLatestClubs(): Promise<LatestClubsResponse> {
  return apiFetch<LatestClubsResponse>("/api/v1/clubs/", {
    query: { ordering: "-created_at", page_size: LATEST_CLUBS_LIMIT },
    // Server: cache the response for 5 min (ISR-style). Ignored in the browser.
    next: { revalidate: 300 },
    // A slow API must not hold the whole homepage hostage.
    signal: AbortSignal.timeout(5_000),
  });
}

/** Shared by the server prefetch (page.tsx) and the client `useQuery` — one key, one fetcher. */
export const latestClubsQuery = queryOptions({
  queryKey: ["clubs", "latest", LATEST_CLUBS_LIMIT],
  queryFn: fetchLatestClubs,
  select: toLatestClubs,
});
