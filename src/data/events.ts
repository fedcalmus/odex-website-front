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
