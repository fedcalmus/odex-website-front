import type { ClubCardProps } from "@/components/ClubCard";
import type { ActivitySlug } from "./activities";
import { getActivity } from "./activities";
import { EVENTS } from "./events";
import type { EventGuide, EventRecord } from "./events";
import { getRegion } from "./regions";

// MOCK CLUB DIRECTORY. Only VERIFIED clubs belong here — an unverified club is
// back-office only (listing one publicly implies the platform vouched for it).
// Numbers that can be derived (events, regions they go to) ARE derived from the
// event catalog, so a club card, its profile and the event pages agree.

export interface ClubRecord {
  slug: string;
  name: string;
  logo: string;
  /** Card cover. */
  cover: string;
  /** Profile cover; falls back to `cover`. */
  profileCover?: string;
  primaryActivity: ActivitySlug;
  /** Where the club is based (region slug). */
  baseRegion: string;
  activities: ActivitySlug[];
  /** One line for cards. */
  description: string;
  /** Long text for the profile; the block is omitted when absent. */
  about?: string;
  foundedYear: number;
  completedTrips: number;
  rating: { value: number; count: number };
  /** Verified, under three events — an invitation badge, not a warning. */
  isNew?: boolean;
  guides: EventGuide[];
  /** "ՍՊԸ · ՀՎՀՀ ստուգված" */
  legalNote: string;
  /** "12.2026" */
  insuranceUntil: string;
  photos?: string[];
}

// The design shows the same two guide names repeated (lead, sweep, lead, sweep) — kept as mock data.
const GUIDES: EventGuide[] = [
  { role: "lead", name: "Արամ Հակոբյան", roleLabel: "Հիմնական ուղեկցորդ", experience: "9 տարի · 240 արշավ", photo: "/images/guides/guide-1.png" },
  { role: "sweep", name: "Կարեն Սարգսյան", roleLabel: "Հետնապահ", experience: "5 տարի · 120 արշավ", photo: "/images/guides/guide-1.png" },
  { role: "lead", name: "Արամ Հակոբյան", roleLabel: "Հիմնական ուղեկցորդ", experience: "9 տարի · 240 արշավ", photo: "/images/guides/guide-1.png" },
  { role: "sweep", name: "Կարեն Սարգսյան", roleLabel: "Հետնապահ", experience: "5 տարի · 120 արշավ", photo: "/images/guides/guide-1.png" },
];

const BASE = {
  logo: "/images/clubs/logo-1.png",
  cover: "/images/clubs/cover-1.png",
  guides: GUIDES,
  legalNote: "ՍՊԸ · ՀՎՀՀ ստուգված",
  insuranceUntil: "12.2026",
  foundedYear: 2022,
  completedTrips: 80,
  rating: { value: 4.8, count: 40 },
};
const WEEKEND_ROUTES = "Շաբաթավերջյան երթուղիներ Արագածոտնում և Վայոց ձորում։";
const BEGINNERS = "Երթուղիներ Գառնիում և Նորավանքում, սկսնակների օրեր։";

export const CLUBS: readonly ClubRecord[] = [
  {
    ...BASE,
    slug: "armenia-trails",
    name: "Հայաստանի արահետներ",
    profileCover: "/images/clubs/profile-cover.png",
    primaryActivity: "hiking",
    baseRegion: "yerevan",
    activities: ["hiking", "climbing", "winter"],
    description: WEEKEND_ROUTES,
    about:
      "2019 թվականից կազմակերպում ենք շաբաթավերջյան արշավներ Արագածոտնում, Վայոց ձորում և Սյունիքում։ Բոլոր երթուղիներն անցնում են մեր ուղեկցորդների կողմից նախապես, և ամեն խմբում կա հետնապահ։ Սկսնակների համար ունենք առանձին օրեր՝ ամսվա առաջին կիրակի։",
    foundedYear: 2019,
    completedTrips: 240,
    rating: { value: 4.9, count: 128 },
    photos: [1, 2, 3, 4, 5].map((n) => `/images/club-photos/photo-${n}.png`),
  },
  {
    ...BASE,
    slug: "vertical-yerevan",
    name: "Ուղղահայաց Երևան",
    cover: "/images/clubs/cover-2.png",
    logo: "/images/clubs/logo-2.png",
    primaryActivity: "climbing",
    baseRegion: "kotayk",
    activities: ["climbing"],
    description: BEGINNERS,
    isNew: true,
  },
  { ...BASE, slug: "mountaineer", name: "Լեռնագնաց", primaryActivity: "hiking", baseRegion: "yerevan", activities: ["hiking"], description: WEEKEND_ROUTES },
  { ...BASE, slug: "tavush-trail", name: "Տավուշ Թրեյլ", primaryActivity: "hiking", baseRegion: "yerevan", activities: ["hiking"], description: WEEKEND_ROUTES },
  { ...BASE, slug: "sevan-water", name: "Սևան Ուոթեր", primaryActivity: "water", baseRegion: "yerevan", activities: ["water"], description: WEEKEND_ROUTES },
  {
    ...BASE,
    slug: "kotayk-active",
    name: "Կոտայք Ակտիվ",
    cover: "/images/clubs/cover-2.png",
    logo: "/images/clubs/logo-2.png",
    primaryActivity: "climbing",
    baseRegion: "kotayk",
    activities: ["climbing", "hiking"],
    description: BEGINNERS,
    isNew: true,
  },
];

export function findClub(slug: string): ClubRecord | undefined {
  return CLUBS.find((club) => club.slug === slug);
}

export function getClub(slug: string): ClubRecord {
  const club = findClub(slug);
  if (!club) throw new Error(`Unknown club "${slug}"`);
  return club;
}

/** A club's departures, soonest first. */
export function getClubEvents(slug: string): EventRecord[] {
  return EVENTS.filter((event) => event.club === slug).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

/** Where a club goes, with how many of its departures head there — derived, never typed twice. */
export function getClubRegionCounts(slug: string): Array<{ slug: string; name: string; count: number }> {
  const counts = new Map<string, number>();
  for (const event of getClubEvents(slug)) counts.set(event.region, (counts.get(event.region) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([regionSlug, count]) => ({ slug: regionSlug, name: getRegion(regionSlug)?.name ?? regionSlug, count }));
}

/** Caps classification line for cards: "ԱՐՇԱՎ · ԵՐԵՎԱՆ" — what they do, where they're based. */
export function getClubClassification(club: ClubRecord): string {
  const activity = getActivity(club.primaryActivity)?.title ?? "";
  const region = getRegion(club.baseRegion)?.name ?? "";
  return `${activity} · ${region}`.toLocaleUpperCase("hy");
}

/** The card every list (homepage, directory) renders for a club. Counts are derived from the catalog. */
export function toClubCardProps(club: ClubRecord): ClubCardProps {
  return {
    name: club.name,
    href: `/clubs/${club.slug}`,
    cover: club.cover,
    logo: club.logo,
    classification: getClubClassification(club),
    description: club.description,
    eventsCount: getClubEvents(club.slug).length,
    guidesCount: club.guides.length,
    newBadgeLabel: club.isNew ? "Նոր ակումբ" : undefined,
  };
}
