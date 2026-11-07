// MOCK social graph + bookings/saved/tickets for the profile section (Figma
// "MP-09" family: Profile, My events, Saved, My following, Follow requests,
// Ticket). There is no social/booking API yet — this stands in for it, built
// as much as possible from the REAL event/club catalogs (`events.ts`,
// `clubs.ts`) rather than invented records, so a booking or a followed club
// here links to a real, working page. Replace with the API once it exists.

import { getClub, getClubEvents } from "./clubs";
import { EVENTS, getEventBySlug } from "./events";
import type { EventRecord } from "./events";

// ── People ──────────────────────────────────────────────────────────────
// A handful of named people, reused across follow requests / following /
// followers the way a real social graph would overlap. Three names
// (Լիլիթ Ավետիսյան, Մարիամ Խաչատրյան, Գոռ Սահակյան, Սոնա Գրիգորյան) are the
// same reviewers/commenters already seeded in `events.ts` — not a
// coincidence, the same visitor who leaves a review is who shows up in your
// followers list.

export interface Person {
  id: string;
  name: string;
  /** Initials shown on the avatar when there's no photo. */
  initials: string;
  location: string;
  eventsCount: number;
}

const PEOPLE = {
  ani: { id: "ani", name: "Անի Գրիգորյան", initials: "ԱԳ", location: "Դիլիջան", eventsCount: 9 },
  tigran: { id: "tigran", name: "Տիգրան Պողոսյան", initials: "ՏՊ", location: "Երևան", eventsCount: 6 },
  nare: { id: "nare", name: "Նարե Սարգսյան", initials: "ՆՍ", location: "Վանաձոր", eventsCount: 3 },
  lilit: { id: "lilit", name: "Լիլիթ Ավետիսյան", initials: "ԼԱ", location: "Երևան", eventsCount: 14 },
  gor: { id: "gor", name: "Գոռ Սահակյան", initials: "ԳՍ", location: "Գյումրի", eventsCount: 3 },
  mariamH: { id: "mariamH", name: "Մարիամ Հովհաննիսյան", initials: "ՄՀ", location: "Վանաձոր", eventsCount: 22 },
  mariamKh: { id: "mariamKh", name: "Մարիամ Խաչատրյան", initials: "ՄԽ", location: "Երևան", eventsCount: 11 },
  sona: { id: "sona", name: "Սոնա Գրիգորյան", initials: "ՍԳ", location: "Երևան", eventsCount: 5 },
} as const satisfies Record<string, Person>;

export interface FollowRequest {
  person: Person;
  /** "2 ընդհանուր ծանոթ" — omitted when there are none. */
  mutualCount?: number;
}

/** Figma "Follow requests — MP-36": 3 pending requests. */
export const FOLLOW_REQUESTS: readonly FollowRequest[] = [
  { person: PEOPLE.ani, mutualCount: 2 },
  { person: PEOPLE.tigran },
  { person: PEOPLE.nare, mutualCount: 1 },
];

export interface FollowerEntry {
  person: Person;
  /** You already follow them back. */
  mutual: boolean;
}

/** Figma "My following · Followers — MP-09h": a sample of the 128 followers. */
export const FOLLOWERS: readonly FollowerEntry[] = [
  { person: PEOPLE.lilit, mutual: true },
  { person: PEOPLE.gor, mutual: false },
  { person: PEOPLE.mariamH, mutual: true },
  { person: PEOPLE.tigran, mutual: false },
  { person: PEOPLE.ani, mutual: false },
];

/** People you follow (no dedicated Figma frame — built consistent with Followers). */
export const FOLLOWING_PEOPLE: readonly Person[] = [
  PEOPLE.lilit,
  PEOPLE.mariamKh,
  PEOPLE.gor,
  PEOPLE.nare,
  PEOPLE.mariamH,
  PEOPLE.sona,
];

// ── Followed clubs ──────────────────────────────────────────────────────
// Figma "My following — MP-09f" lists 5 club names; only "Հայաստանի
// արահետներ" and "Լեռնագնաց" exist in the real club catalog. Rather than
// inventing full ClubRecord entries for the rest, the real clubs link to
// their actual `/clubs/[slug]` profile and the Figma-only ones stub to the
// directory (`/clubs`) — the same stub-link convention already used
// elsewhere (e.g. the club-dashboard CTA). The header's "12 ակումբ" stat
// in Figma wasn't backed by content; the displayed count here is this
// array's real length, same resolution as the clubs-directory counts.
export interface FollowedClub {
  name: string;
  logo: string;
  location: string;
  eventsCount: number;
  href: string;
}

const REAL_FOLLOWED_CLUB_SLUGS = ["armenia-trails", "mountaineer", "tavush-trail"] as const;

export const FOLLOWED_CLUBS: readonly FollowedClub[] = [
  ...REAL_FOLLOWED_CLUB_SLUGS.map((slug) => {
    const club = getClub(slug);
    return {
      name: club.name,
      logo: club.logo,
      location: club.baseRegion,
      eventsCount: getClubEvents(slug).length,
      href: `/clubs/${slug}`,
    };
  }),
  { name: "Պողպատ Երևան", logo: "/images/clubs/logo-2.png", location: "Երևան", eventsCount: 8, href: "/clubs" },
  { name: "Կապույտ ջրեր", logo: "/images/clubs/club-logo-1.png", location: "Սևան", eventsCount: 5, href: "/clubs" },
  {
    name: "Քարանձավագետներ",
    logo: "/images/clubs/club-logo-detail.png",
    location: "Արագածոտն",
    eventsCount: 4,
    href: "/clubs",
  },
];

// ── Bookings ────────────────────────────────────────────────────────────
export type BookingStatus = "upcoming" | "completed" | "cancelled";

export interface TicketInfo {
  code: string;
  /** "Ագաստամարտիկների հրապարակ, Երևան" — where the ticket itself was issued/checked in from. */
  driverName: string;
  driverPhone: string;
  guideName: string;
  guidePhone: string;
}

export interface Booking {
  event: EventRecord;
  status: BookingStatus;
  /** Present only for upcoming bookings that already have an issued ticket. */
  ticket?: TicketInfo;
  /** Shown on a cancelled booking, e.g. "Չեղարկված է մասնակցողի կողմից". */
  cancelledNote?: string;
}

function booking(slug: string, status: BookingStatus, extra?: Partial<Booking>): Booking {
  const event = getEventBySlug(slug);
  if (!event) throw new Error(`Unknown event slug in mock bookings: ${slug}`);
  return { event, status, ...extra };
}

/** Figma "My events — MP-06": upcoming (2) / completed (4) / cancelled (1). */
export const BOOKINGS: readonly Booking[] = [
  booking("aragats-southern-peak-19-09", "upcoming", {
    ticket: {
      code: "ODX-8841-20",
      driverName: "Արամ Հակոբյան",
      driverPhone: "(017) 236-0000",
      guideName: "Կարեն Սարգսյան",
      guidePhone: "(091) 55-0022",
    },
  }),
  booking("sevan-lake-sup", "upcoming", {
    ticket: {
      code: "ODX-5521-19",
      driverName: "Արամ Հակոբյան",
      driverPhone: "(017) 236-0000",
      guideName: "Կարեն Սարգսյան",
      guidePhone: "(091) 55-0022",
    },
  }),
  booking("dilijan-forest-loop", "completed"),
  booking("amberd-historic-route", "completed"),
  booking("azhdahak-geghama", "completed"),
  booking("khosrov-reserve", "completed"),
  booking("aragats-southern-peak", "cancelled", { cancelledNote: "Չեղարկված է մասնակցողի կողմից" }),
];

export function findBookingTicket(code: string): Booking | undefined {
  return BOOKINGS.find((entry) => entry.ticket?.code === code);
}

export function hasTicket(booking: Booking): booking is Booking & { ticket: TicketInfo } {
  return booking.ticket !== undefined;
}

// ── Saved ───────────────────────────────────────────────────────────────
export interface SavedItem {
  event: EventRecord;
  when: "upcoming" | "past";
}

const BOOKED_SLUGS = new Set(BOOKINGS.map((entry) => entry.event.slug));

// Every catalog event not already booked, split 5 upcoming / 1 past —
// matches the "Բոլորը 6 · Առաջիկա 5 · Անցած 1" split in Figma "Saved — MP-07".
export const SAVED_ITEMS: readonly SavedItem[] = EVENTS.filter((event) => !BOOKED_SLUGS.has(event.slug)).map(
  (event) => ({ event, when: event.slug === "khustup-summit" ? "past" : "upcoming" }),
);

// ── Badges ──────────────────────────────────────────────────────────────
export type BadgeCategory = "all" | "peaks" | "distance" | "endurance";

export interface AchievementBadge {
  id: string;
  label: string;
  icon: "mountain" | "bar-chart" | "compass" | "shield-check" | "award" | "snowflake" | "zap" | "map";
  category: BadgeCategory;
  /** 0–1 ring fill; 1 = earned. */
  progress: number;
}

export const BADGES: readonly AchievementBadge[] = [
  { id: "aragats", label: "Արագած", icon: "mountain", category: "peaks", progress: 1 },
  { id: "100km", label: "100 կմ", icon: "bar-chart", category: "distance", progress: 1 },
  { id: "khustup", label: "Խուստուփ", icon: "mountain", category: "peaks", progress: 1 },
  { id: "10trips", label: "10 արշավ", icon: "compass", category: "endurance", progress: 1 },
  { id: "safe", label: "Ապահով", icon: "shield-check", category: "endurance", progress: 1 },
  { id: "leader", label: "Կապտավոր", icon: "award", category: "all", progress: 1 },
  { id: "500km", label: "500 կմ", icon: "bar-chart", category: "distance", progress: 0.4 },
  { id: "winter", label: "Ձնեպլիբ", icon: "snowflake", category: "endurance", progress: 0 },
  { id: "sprinter", label: "Արագություն", icon: "zap", category: "endurance", progress: 0 },
  { id: "explorer", label: "Հետազոտող", icon: "map", category: "all", progress: 0.2 },
  { id: "50trips", label: "50 արշավ", icon: "compass", category: "endurance", progress: 0 },
  { id: "difficult", label: "Դժվարին", icon: "mountain", category: "peaks", progress: 0 },
];

// ── Activity by month (this year, Figma "Սեզոնի գրանցամատյան") ──────────
export const MONTHLY_ACTIVITY: readonly { label: string; count: number }[] = [
  { label: "Հնվ", count: 0 },
  { label: "Փետ", count: 1 },
  { label: "Մրտ", count: 1 },
  { label: "Ապր", count: 2 },
  { label: "Մյ", count: 3 },
  { label: "Հնս", count: 2 },
  { label: "Հլ", count: 4 },
  { label: "Օգ", count: 6 },
  { label: "Սեպ", count: 3 },
  { label: "Հկտ", count: 0 },
  { label: "Նյմ", count: 0 },
  { label: "Դկտ", count: 0 },
];

// ── Gallery ─────────────────────────────────────────────────────────────
export const GALLERY_PHOTOS: readonly string[] = [
  "/images/club-photos/photo-1.png",
  "/images/events/aragats-thumb-2.png",
  "/images/club-photos/photo-3.png",
  "/images/events/aragats-thumb-4.png",
  "/images/club-photos/photo-5.png",
];
export const GALLERY_TOTAL = 34;
