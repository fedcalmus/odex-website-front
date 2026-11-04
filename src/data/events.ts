import type { EventCardProps } from "@/components/EventCard";
import { DIFFICULTY_ANCHORS } from "@/lib/difficulty";
import type { DifficultyLevel } from "@/lib/difficulty";
import type { ActivitySlug } from "./activities";
import { getClub } from "./clubs";
import { getRegion } from "./regions";

// MOCK CATALOG. Shape is what the events API should return; swap the two
// exported getters at the bottom for fetches and nothing else changes.
//
// Dates follow the real 2026 calendar (Fri 11 → Sun 13 September), so the
// weekday names Intl produces are correct. Figma's mock pairs "Ուրբաթ" with
// the 12th, which is not a Friday in 2026.

export interface EventGuide {
  role: "lead" | "sweep";
  name: string;
  roleLabel: string;
  experience: string;
  photo: string;
}

/**
 * A club's reply to a review or a question — same shape either place.
 * `postedLabel` is pre-formatted ("3 օր առաջ"), not an ISO date: this
 * catalog's events sit on a fixed September 2026 calendar regardless of the
 * real wall-clock date, so computing "days ago" against real `Date.now()`
 * would drift into nonsense (or negative numbers) as real time passes.
 */
export interface EventReply {
  authorName: string;
  postedLabel: string;
  body: string;
}

export interface EventReviewTag {
  label: string;
  sentiment: "positive" | "negative";
}

export interface EventReview {
  id: string;
  authorName: string;
  authorPhoto?: string;
  /** Odex can confirm they actually booked this event. */
  verifiedParticipant: boolean;
  eventsOnOdex: number;
  /** Pre-formatted — see EventReply. */
  postedLabel: string;
  rating: number;
  body: string;
  tags?: EventReviewTag[];
  photos?: string[];
  helpfulCount: number;
  reply?: EventReply;
}

export interface EventReviewSummary {
  average: number;
  totalRatings: number;
  /** ≤ totalRatings — not every rating comes with written text. */
  totalReviews: number;
  /** Percent of ratings at each star count; sums to ~100. */
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  /** Per-aspect averages shown beside the distribution (organization, guide, route, safety…). */
  aspects: Array<{ label: string; value: number }>;
}

export interface EventComment {
  id: string;
  authorName: string;
  authorPhoto?: string;
  /** Pre-formatted — see EventReply. */
  postedLabel: string;
  body: string;
  likeCount: number;
  reply?: EventReply;
}

export interface EventDetail {
  description?: string;
  /** Meeting point, trailhead and return — each with its local time. */
  meeting?: { place: string; time: string };
  departure?: { place: string; time: string };
  return?: { place: string; time: string };
  requirements?: { age: string; experience: string; fitness: string };
  gear?: string[];
  included?: string[];
  excluded?: string[];
  guides?: EventGuide[];
  rating?: { value: number; count: number };
  /** Extra photos beyond the hero (the first is the hero itself). */
  gallery?: string[];
  /** What the gallery's "+N" tile stands for — "+7". */
  galleryMore?: number;
  /** Absent → the reviews section shows its empty state (and a brand-new event has none yet). */
  reviewSummary?: EventReviewSummary;
  reviews?: EventReview[];
  /** Absent/empty → the Q&A section shows its empty state, but can still be posted to. */
  comments?: EventComment[];
}

export interface EventRecord {
  slug: string;
  title: string;
  activity: ActivitySlug;
  /** Region slug — see `regions.ts`. */
  region: string;
  /** Club slug — see `clubs.ts`. */
  club: string;
  difficulty: DifficultyLevel;
  /** ISO 8601 with the Yerevan offset. */
  startsAt: string;
  route: { distanceKm: number; ascentM: number; durationHours: number };
  capacity: { taken: number; total: number };
  price: { amount: number; currency?: string };
  /** Card photo. */
  image: string;
  /** Detail-page hero; falls back to `image`. */
  heroImage?: string;
  detail?: EventDetail;
}

const ROUTE = { distanceKm: 14.2, ascentM: 900, durationHours: 9 };
const CAPACITY = { taken: 12, total: 16 };
const PRICE = { amount: 12_000 };

const ARAGATS_DETAIL: EventDetail = {
  description:
    "Արագածի հարավային գագաթը չորսից ամենամատչելին է, բայց ոչ ամենահեշտը։ Մեկնում ենք Կասկադից 06:00-ին, ժամը 08:30-ին սկսում ենք բարձրանալ Քարի լճից։ Վերջին 300 մետրը քարքարոտ է և պահանջում է ուշադրություն։ Գագաթին մնում ենք մոտ 40 րոպե, եթե եղանակը թույլ տա։",
  meeting: { place: "Կասկադ, Երևան", time: "06:00" },
  departure: { place: "Քարի լիճ, Արագած", time: "08:30" },
  return: { place: "Կասկադ, Երևան", time: "19:30" },
  requirements: {
    age: "16+",
    experience: "Նախորդ լեռնային արշավ",
    fitness: "Կանոնավոր ակտիվություն",
  },
  gear: [
    "Արահետային կոշիկ",
    "Ուսապարկ 30 լ",
    "Ջուր 2 լ",
    "Տաք շերտ",
    "Անձրևանոց",
    "Արևային ակնոց",
    "Գլխարկ",
    "Ձեռնափայտեր",
    "Դեղատուփ",
  ],
  included: ["Ուղեկցորդ և հետնապահ", "Տրանսպորտ Երևանից", "Ապահովագրություն", "Թեյ գագաթին"],
  excluded: ["Սնունդ", "Անձնական սարքավորում", "Ազգային պարկի մուտքավճար"],
  guides: [
    {
      role: "lead",
      name: "Արամ Հակոբյան",
      roleLabel: "Հիմնական ուղեկցորդ",
      experience: "9 տարի · 240 արշավ",
      photo: "/images/guides/guide-1.png",
    },
    {
      role: "sweep",
      name: "Կարեն Սարգսյան",
      roleLabel: "Հետնապահ",
      experience: "5 տարի · 120 արշավ",
      photo: "/images/guides/guide-1.png",
    },
  ],
  rating: { value: 4.9, count: 128 },
  gallery: [
    "/images/events/aragats-thumb-1.png",
    "/images/events/aragats-thumb-2.png",
    "/images/events/aragats-thumb-3.png",
    "/images/events/aragats-thumb-4.png",
  ],
  galleryMore: 7,
  // totalRatings/average intentionally match `rating` above (128 / 4.9) —
  // totalReviews is lower because not every rating comes with written text.
  reviewSummary: {
    average: 4.9,
    totalRatings: 128,
    totalReviews: 84,
    distribution: { 5: 82, 4: 12, 3: 4, 2: 1, 1: 1 },
    aspects: [
      { label: "Կազմակերպում", value: 4.9 },
      { label: "Ուղեկցորդ", value: 4.9 },
      { label: "Երթուղի", value: 4.7 },
      { label: "Անվտանգություն", value: 5.0 },
    ],
  },
  reviews: [
    {
      id: "r1",
      authorName: "Լիլիթ Ավետիսյան",
      verifiedParticipant: true,
      eventsOnOdex: 8,
      postedLabel: "3 օր առաջ",
      rating: 5,
      body: "Ուղեկցորդը ամեն կանգառում բացատրում էր՝ որտեղ ենք և ինչ է սպասվում: Առաջին անգամ էի 4000 մ-ից բարձր, և ինձ ապահով էի զգում:",
      tags: [
        { label: "Ուղեկցորդ", sentiment: "positive" },
        { label: "Անվտանգություն", sentiment: "positive" },
      ],
      photos: [
        "/images/club-photos/photo-1.png",
        "/images/club-photos/photo-2.png",
        "/images/club-photos/photo-3.png",
        "/images/club-photos/photo-4.png",
        "/images/club-photos/photo-5.png",
      ],
      helpfulCount: 12,
    },
    {
      id: "r2",
      authorName: "Սոնա Գրիգորյան",
      verifiedParticipant: true,
      eventsOnOdex: 3,
      postedLabel: "5 օր առաջ",
      rating: 3,
      body: "Երթուղին հիանալի էր, բայց հավաքի վայրում 40 րոպե սպասեցինք: Ավելի լավ կլիներ նախապես զգուշացնել:",
      tags: [{ label: "Կազմակերպում", sentiment: "negative" }],
      helpfulCount: 7,
      reply: {
        authorName: "Հայաստանի արահետներ",
        postedLabel: "4 օր առաջ",
        body: "Ներողություն սպասելու համար: Տրանսպորտը ուշացավ ճանապարհի փակման պատճառով, հաջորդ անգամ ավելի ճշգրիտ կտեղեկացնենք SMS-ով:",
      },
    },
  ],
  comments: [
    {
      id: "c1",
      authorName: "Գոռ Սահակյան",
      postedLabel: "2 օր առաջ",
      body: "Կարելի՞ է երեխայի հետ գալ, 12 տարեկան է։",
      likeCount: 4,
      reply: {
        authorName: "Հայաստանի արահետներ",
        postedLabel: "2 օր առաջ",
        body: "Այո, 12 տարեկանից՝ ծնողի հետ: Երթուղին 2-րդ աստիճանի է:",
      },
    },
    {
      id: "c2",
      authorName: "Մարիամ Խաչատրյան",
      postedLabel: "6 օր առաջ",
      body: "Գիշերել հնարավո՞ր է Քարի լճի մոտ՝ արշավից առաջ:",
      likeCount: 2,
    },
  ],
};

export const EVENTS: readonly EventRecord[] = [
  // ── Friday 11 ────────────────────────────────────────────────────────────
  {
    slug: "dilijan-forest-loop",
    title: "Դիլիջան՝ անտառային օղակ",
    activity: "hiking",
    region: "tavush",
    club: "tavush-trail",
    difficulty: "moderate",
    startsAt: "2026-09-11T05:30:00+04:00",
    route: ROUTE,
    capacity: CAPACITY,
    price: PRICE,
    image: "/images/events/event-1.png",
  },
  {
    slug: "aragats-southern-peak",
    title: "Արագած՝ հարավային գագաթ",
    activity: "hiking",
    region: "aragatsotn",
    club: "armenia-trails",
    difficulty: "moderate",
    startsAt: "2026-09-11T06:00:00+04:00",
    route: { distanceKm: 14.2, ascentM: 1200, durationHours: 9 },
    capacity: CAPACITY,
    price: PRICE,
    image: "/images/events/event-1.png",
    heroImage: "/images/events/aragats-hero.png",
    detail: ARAGATS_DETAIL,
  },
  {
    slug: "khustup-summit",
    title: "Խուստուփ՝ գագաթնակոհում",
    activity: "hiking",
    region: "syunik",
    club: "mountaineer",
    difficulty: "extreme",
    startsAt: "2026-09-11T06:30:00+04:00",
    route: ROUTE,
    capacity: { taken: 15, total: 16 },
    price: PRICE,
    image: "/images/events/event-2.png",
  },
  // ── Saturday 12 ──────────────────────────────────────────────────────────
  {
    slug: "sevan-lake-sup",
    title: "Սևանա լիճ · SUP",
    activity: "water",
    region: "gegharkunik",
    club: "sevan-water",
    difficulty: "moderate",
    startsAt: "2026-09-12T06:00:00+04:00",
    route: ROUTE,
    capacity: { taken: 16, total: 16 },
    price: PRICE,
    image: "/images/events/event-3.png",
  },
  {
    slug: "amberd-historic-route",
    title: "Ամբերդ՝ պատմական երթուղի",
    activity: "hiking",
    region: "aragatsotn",
    club: "armenia-trails",
    difficulty: "moderate",
    startsAt: "2026-09-12T07:00:00+04:00",
    route: ROUTE,
    capacity: CAPACITY,
    price: PRICE,
    image: "/images/events/event-1.png",
  },
  {
    slug: "tsaghkadzor-evening-walk",
    title: "Ծաղկաձոր՝ երեկոյան քայլք",
    activity: "hiking",
    region: "kotayk",
    club: "kotayk-active",
    difficulty: "easy",
    startsAt: "2026-09-12T17:30:00+04:00",
    route: ROUTE,
    capacity: CAPACITY,
    price: PRICE,
    image: "/images/events/event-4.png",
  },
  // ── Sunday 13 ────────────────────────────────────────────────────────────
  {
    slug: "azhdahak-geghama",
    title: "Գեղամա լեռներ՝ Աժդահակ",
    activity: "hiking",
    region: "gegharkunik",
    club: "mountaineer",
    difficulty: "moderate",
    startsAt: "2026-09-13T05:00:00+04:00",
    route: ROUTE,
    capacity: CAPACITY,
    price: PRICE,
    image: "/images/events/event-1.png",
  },
  {
    slug: "khosrov-reserve",
    title: "Խոսրովի արգելոց",
    activity: "hiking",
    region: "ararat",
    club: "tavush-trail",
    difficulty: "extreme",
    startsAt: "2026-09-13T05:30:00+04:00",
    route: ROUTE,
    capacity: { taken: 15, total: 16 },
    price: PRICE,
    image: "/images/events/event-2.png",
  },
  {
    slug: "smbataberd-vayots-dzor",
    title: "Վայոց ձոր՝ Սմբատաբերդ",
    activity: "hiking",
    region: "vayots-dzor",
    club: "armenia-trails",
    difficulty: "moderate",
    startsAt: "2026-09-13T06:00:00+04:00",
    route: ROUTE,
    capacity: CAPACITY,
    price: PRICE,
    image: "/images/events/event-1.png",
  },
  // ── Next week (recurring departures) ─────────────────────────────────────
  {
    slug: "dilijan-forest-loop-18-09",
    title: "Դիլիջան՝ անտառային օղակ",
    activity: "hiking",
    region: "tavush",
    club: "tavush-trail",
    difficulty: "moderate",
    startsAt: "2026-09-18T05:30:00+04:00",
    route: ROUTE,
    capacity: { taken: 4, total: 16 },
    price: PRICE,
    image: "/images/events/event-1.png",
  },
  {
    slug: "aragats-southern-peak-19-09",
    title: "Արագած՝ հարավային գագաթ",
    activity: "hiking",
    region: "aragatsotn",
    club: "armenia-trails",
    difficulty: "moderate",
    startsAt: "2026-09-19T06:00:00+04:00",
    route: { distanceKm: 14.2, ascentM: 1200, durationHours: 9 },
    capacity: { taken: 2, total: 16 },
    price: PRICE,
    image: "/images/events/event-1.png",
    heroImage: "/images/events/aragats-hero.png",
    detail: ARAGATS_DETAIL,
  },
];

/** Cards on the homepage "this weekend" row, in the order the design shows them. */
export const HOME_WEEKEND_SLUGS = [
  "aragats-southern-peak",
  "khustup-summit",
  "dilijan-forest-loop",
  "sevan-lake-sup",
  "tsaghkadzor-evening-walk",
  "amberd-historic-route",
] as const;

export function getEventBySlug(slug: string): EventRecord | undefined {
  return EVENTS.find((event) => event.slug === slug);
}

export function getAllEvents(): readonly EventRecord[] {
  return EVENTS;
}

/** The compact card every list (homepage, discovery) renders for an event. */
export function toEventCardProps(event: EventRecord): EventCardProps {
  const club = getClub(event.club);
  return {
    title: event.title,
    href: `/events/${event.slug}`,
    image: event.image,
    club: { name: club.name, logo: club.logo },
    startsAt: event.startsAt,
    route: event.route,
    difficulty: { level: event.difficulty, anchor: DIFFICULTY_ANCHORS[event.difficulty] },
    capacity: event.capacity,
    price: event.price,
    weather: getRegion(event.region)?.forecast,
  };
}
