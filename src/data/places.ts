import type { IconName } from "@/components/Icon";
import type { PlaceCardProps } from "@/components/PlaceCard";
import { CLUBS } from "./clubs";
import type { ClubRecord } from "./clubs";
import { EVENTS } from "./events";
import type { EventRecord } from "./events";
import { getRegion } from "./regions";

// MOCK PLACES CATALOG ("Places — MP-17" / "Place detail — MP-34"). Shape is
// what a places API should return; swap the getters at the bottom for
// fetches and nothing else changes — same approach as events.ts/clubs.ts.
//
// Real Armenian destinations, not placeholder names: the source screenshots
// were compressed enough that several labels were illegible (a lake's name,
// a trailhead) — rather than guess at nonsense, those were resolved against
// real facts that also happened to match the mock's own numbers (the "1 900
// մ" lake card is Lake Sevan's actual elevation; the "Քարի լինջ" trailhead
// on Aragats is Kari Lake, which is the real trailhead for that ascent).

export type PlaceKind = "peak" | "region" | "lake" | "monastery" | "forest" | "cave";

export const PLACE_KIND_ICON: Record<PlaceKind, IconName> = {
  peak: "mountain",
  region: "flag",
  lake: "navigation",
  monastery: "compass",
  forest: "compass",
  cave: "compass",
};

// Chip-bar labels — not every kind pluralises the same way in Armenian
// ("Անտառ"/"Քարանձավ" stay singular as terrain-type categories).
export const PLACE_KIND_FILTERS: ReadonlyArray<{ kind: PlaceKind; label: string }> = [
  { kind: "peak", label: "Գագաթներ" },
  { kind: "region", label: "Մարզեր" },
  { kind: "lake", label: "Լճեր" },
  { kind: "monastery", label: "Վանքեր" },
  { kind: "forest", label: "Անտառ" },
  { kind: "cave", label: "Քարանձավ" },
];

export interface PlaceInfoRow {
  label: string;
  value: string;
}

export interface PlaceRecord {
  slug: string;
  name: string;
  kind: PlaceKind;
  /** Region slug (see regions.ts). For kind "region" this points at itself. */
  region: string;
  /** Card + hero cover. */
  image: string;
  /** Extra gallery photos (a sample — `photoCount` is the real total, same pattern as EventDetail.galleryMore). */
  gallery: string[];
  photoCount: number;
  /** The headline figure on the card: elevation for peak/lake, trail count for region/forest, century for monastery/cave. */
  headline: { icon: IconName; value: string };
  description: string;
  /** Sidebar "ՏԵՂԵԿԱՆՔ" rows — flexible per kind rather than rigid typed fields. */
  infoRows: PlaceInfoRow[];
  weather?: { temperature: number; note: string };
}

export const PLACES: readonly PlaceRecord[] = [
  {
    slug: "aragats",
    name: "Արագած",
    kind: "peak",
    region: "aragatsotn",
    image: "/images/events/aragats-hero.png",
    gallery: [
      "/images/events/aragats-thumb-1.png",
      "/images/events/aragats-thumb-2.png",
      "/images/events/aragats-thumb-3.png",
      "/images/events/aragats-thumb-4.png",
    ],
    photoCount: 218,
    headline: { icon: "mountain", value: "4 090 մ" },
    description:
      "Հայաստանի ամենաբարձր գագաթը, չորս գլխավոր գագաթներով։ Հարավային գագաթը հասանելի է առանց հատուկ տեխնիկական պատրաստվածության, մնացածը պահանջում են փորձ և սարքավորում։",
    infoRows: [
      { label: "Բարձրություն", value: "4 090 մ" },
      { label: "Տեսակ", value: "Գագաթ" },
      { label: "Սեզոն", value: "Հուլիս–սեպտեմբեր" },
      { label: "Մեկնակետ", value: "Քարի լիճ · 3 200 մ" },
      { label: "Երևանից", value: "2 ժ ավտոմեքենայով" },
      { label: "Դժվարություն", value: "Միջինից բարձր" },
    ],
    weather: { temperature: 4, note: "քամի 20 կմ/ժ" },
  },
  {
    slug: "kari-lake",
    name: "Քարի լիճ",
    kind: "lake",
    region: "aragatsotn",
    image: "/images/events/event-1.png",
    gallery: ["/images/club-photos/photo-1.png", "/images/club-photos/photo-2.png"],
    photoCount: 94,
    headline: { icon: "navigation", value: "3 200 մ" },
    description:
      "Լեռնային լիճ Արագածի հարավային լանջին, Արագածի ամառային բարձունքի գլխավոր մեկնակետը։ Հասանելի է մեքենայով հունիսից հոկտեմբեր։",
    infoRows: [
      { label: "Բարձրություն", value: "3 200 մ" },
      { label: "Տեսակ", value: "Լիճ" },
      { label: "Սեզոն", value: "Հունիս–հոկտեմբեր" },
      { label: "Երևանից", value: "2 ժ ավտոմեքենայով" },
      { label: "Դժվարություն", value: "Հեշտ հասանելիություն" },
    ],
    weather: { temperature: 7, note: "քամի 14 կմ/ժ" },
  },
  {
    slug: "syunik",
    name: "Սյունիք",
    kind: "region",
    region: "syunik",
    image: "/images/hero/discovery-banner.png",
    gallery: ["/images/events/event-2.png", "/images/events/event-3.png", "/images/events/event-4.png"],
    photoCount: 486,
    headline: { icon: "flag", value: "12 երթուղի" },
    description:
      "Հայաստանի հարավային մարզը՝ Տաթևի վանքով, Զանգեզուրի լեռնաշղթայով և երկրի ամենախոր կիրճերից մեկով։ Արշավների, ժայռամագլցման և մշակութային զբոսաշրջության հանգույց։",
    infoRows: [
      { label: "Տեսակ", value: "Մարզ" },
      { label: "Կենտրոն", value: "Կապան" },
      { label: "Սեզոն", value: "Ապրիլ–նոյեմբեր" },
      { label: "Երևանից", value: "4–5 ժ ավտոմեքենայով" },
    ],
  },
  {
    slug: "tavush",
    name: "Տավուշ",
    kind: "region",
    region: "tavush",
    image: "/images/hero/hero.png",
    gallery: ["/images/club-photos/photo-4.png", "/images/club-photos/photo-5.png", "/images/clubs/cover-1.png"],
    photoCount: 231,
    headline: { icon: "flag", value: "8 երթուղի" },
    description:
      "Հայաստանի ամենախիտ անտառապատ մարզը՝ Դիլիջանի ազգային պարկով, վանքերով և սահմանամերձ բնապատկերներով։",
    infoRows: [
      { label: "Տեսակ", value: "Մարզ" },
      { label: "Կենտրոն", value: "Իջևան" },
      { label: "Սեզոն", value: "Մայիս–հոկտեմբեր" },
      { label: "Երևանից", value: "2 ժ ավտոմեքենայով" },
    ],
  },
  {
    slug: "sevan-lake",
    name: "Սևանա լիճ",
    kind: "lake",
    region: "gegharkunik",
    image: "/images/clubs/cover-2.png",
    gallery: ["/images/events/event-1.png", "/images/events/event-2.png", "/images/events/event-3.png"],
    photoCount: 342,
    headline: { icon: "navigation", value: "1 900 մ" },
    description:
      "Հայաստանի և Կովկասի ամենամեծ լիճը, ծովի մակարդակից 1900 մ բարձրության վրա։ Ջրային սպորտի, ափամերձ արշավների և ամառային հանգստի հիմնական վայրը։",
    infoRows: [
      { label: "Բարձրություն", value: "1 900 մ" },
      { label: "Տեսակ", value: "Լիճ" },
      { label: "Սեզոն", value: "Հունիս–սեպտեմբեր" },
      { label: "Երևանից", value: "1 ժ ավտոմեքենայով" },
      { label: "Դժվարություն", value: "Հեշտ հասանելիություն" },
    ],
    weather: { temperature: 14, note: "քամի 18 կմ/ժ" },
  },
  {
    slug: "tatev-monastery",
    name: "Տաթևի վանք",
    kind: "monastery",
    region: "syunik",
    image: "/images/events/event-4.png",
    gallery: ["/images/club-photos/photo-1.png", "/images/club-photos/photo-2.png"],
    photoCount: 164,
    headline: { icon: "compass", value: "IX դար" },
    description:
      "9-րդ դարի վանական համալիր Որոտանի կիրճի եզրին, հասանելի «Արծվի թռիչք» ճոպանուղով՝ աշխարհի ամենաերկար շրջելի ճոպանուղիներից մեկով։",
    infoRows: [
      { label: "Կառուցվել է", value: "IX դար" },
      { label: "Տեսակ", value: "Վանք" },
      { label: "Մուտք", value: "Ճոպանուղով կամ ավտոմեքենայով" },
      { label: "Երևանից", value: "3,5 ժ ավտոմեքենայով" },
    ],
  },
  {
    slug: "geghard-monastery",
    name: "Գեղարդ",
    kind: "monastery",
    region: "kotayk",
    image: "/images/club-photos/photo-3.png",
    gallery: ["/images/events/event-1.png", "/images/events/event-2.png"],
    photoCount: 177,
    headline: { icon: "compass", value: "XIII դար" },
    description:
      "Ժայռափոր վանական համալիր Ազատ գետի կիրճում, ՅՈՒՆԵՍԿՕ-ի համաշխարհային ժառանգության ցանկում։ Մասամբ փորագրված ժայռի մեջ։",
    infoRows: [
      { label: "Կառուցվել է", value: "XIII դար" },
      { label: "Տեսակ", value: "Վանք" },
      { label: "Մուտք", value: "Ավտոմեքենայով" },
      { label: "Երևանից", value: "40 ր ավտոմեքենայով" },
    ],
  },
  {
    slug: "noravank-monastery",
    name: "Նորավանք",
    kind: "monastery",
    region: "vayots-dzor",
    image: "/images/club-photos/photo-4.png",
    gallery: ["/images/events/event-3.png", "/images/events/event-4.png"],
    photoCount: 142,
    headline: { icon: "compass", value: "XIII դար" },
    description:
      "Վանական համալիր կարմիր ժայռերի կիրճում։ Հայտնի է իր նեղ, առանց բազրիքի արտաքին աստիճաններով և շրջակա արահետներով։",
    infoRows: [
      { label: "Կառուցվել է", value: "XIII դար" },
      { label: "Տեսակ", value: "Վանք" },
      { label: "Մուտք", value: "Ավտոմեքենայով" },
      { label: "Երևանից", value: "2 ժ ավտոմեքենայով" },
    ],
  },
  {
    slug: "dilijan",
    name: "Դիլիջան",
    kind: "forest",
    region: "tavush",
    image: "/images/hero/discovery-banner.png",
    gallery: ["/images/hero/hero.png", "/images/events/event-1.png"],
    photoCount: 271,
    headline: { icon: "compass", value: "8 երթուղի" },
    description:
      "Ազգային պարկ խիտ լայնատերև անտառներով, հաճախ կոչվում է «Հայաստանի Շվեյցարիա»։ Արշավի, հեծանվավազքի և բնության լուսանկարչության տարածված ուղղություն։",
    infoRows: [
      { label: "Տեսակ", value: "Անտառ / ազգային պարկ" },
      { label: "Սեզոն", value: "Մայիս–հոկտեմբեր" },
      { label: "Երևանից", value: "1,5 ժ ավտոմեքենայով" },
      { label: "Դժվարություն", value: "Հեշտից միջին" },
    ],
  },
  {
    slug: "khosrov-forest",
    name: "Խոսրովի արգելոց",
    kind: "forest",
    region: "ararat",
    image: "/images/club-photos/photo-5.png",
    gallery: ["/images/events/event-2.png", "/images/events/event-3.png"],
    photoCount: 96,
    headline: { icon: "compass", value: "6 երթուղի" },
    description:
      "Հայաստանի ամենահին արգելոցներից մեկը, հիմնադրված 1958-ին։ Պահպանում է կիսաանապատային և լեռնատափաստանային էկոհամակարգեր, այդ թվում՝ վայրի ընձառյուծի միջավայր։",
    infoRows: [
      { label: "Տեսակ", value: "Պետական արգելոց" },
      { label: "Հիմնադրվել է", value: "1958" },
      { label: "Սեզոն", value: "Ապրիլ–հոկտեմբեր" },
      { label: "Երևանից", value: "1 ժ ավտոմեքենայով" },
    ],
  },
  {
    slug: "areni-cave",
    name: "Արենի քարանձավ",
    kind: "cave",
    region: "vayots-dzor",
    image: "/images/events/event-3.png",
    gallery: ["/images/club-photos/photo-1.png", "/images/club-photos/photo-4.png"],
    photoCount: 58,
    headline: { icon: "compass", value: "6 100 տ.ա." },
    description:
      "Հնագիտական հուշարձան, որտեղ հայտնաբերվել է աշխարհի ամենահին հայտնի գինու արտադրամասը և կաշվե կոշիկը։ Մասամբ բաց այցելուների համար։",
    infoRows: [
      { label: "Տարիք", value: "~6 100 տարի առաջ" },
      { label: "Տեսակ", value: "Քարանձավ / հնավայր" },
      { label: "Մուտք", value: "Ուղեկցությամբ միայն" },
      { label: "Երևանից", value: "2 ժ ավտոմեքենայով" },
    ],
  },
] as const satisfies readonly PlaceRecord[];

export function getAllPlaces(): readonly PlaceRecord[] {
  return PLACES;
}

export function getPlaceBySlug(slug: string): PlaceRecord | undefined {
  return PLACES.find((place) => place.slug === slug);
}

/** Events happening in the same region — there's no literal per-event place FK yet, so region is the honest proxy. */
export function getPlaceEvents(place: PlaceRecord): EventRecord[] {
  return EVENTS.filter((event) => event.region === place.region);
}

/** Verified clubs that run events in this place's region. */
export function getPlaceClubs(place: PlaceRecord): ClubRecord[] {
  const slugs = new Set(getPlaceEvents(place).map((event) => event.club));
  return CLUBS.filter((club) => club.baseRegion === place.region || slugs.has(club.slug));
}

export function placeRegionName(place: PlaceRecord): string {
  return getRegion(place.region)?.name ?? place.name;
}

/** The hero's fact row — same three facts on the Overview, Events and Clubs pages. */
export function buildPlaceHeroFacts(
  place: PlaceRecord,
  photosLabel: string,
): Array<{ icon: IconName; label: string; value: string }> {
  return [
    { icon: place.headline.icon, label: place.infoRows[0]?.label ?? place.name, value: place.headline.value },
    { icon: "map-pin", label: "Մարզ", value: placeRegionName(place) },
    { icon: "camera", label: photosLabel, value: `${place.photoCount} ${photosLabel}` },
  ];
}

export function toPlaceCardProps(place: PlaceRecord, eventsLabel: string): PlaceCardProps {
  const eventsCount = getPlaceEvents(place).length;
  return {
    name: place.name,
    href: `/places/${place.slug}`,
    image: place.image,
    badgeLabel: place.kind === "region" ? "ՄԱՐԶ" : placeRegionName(place).toUpperCase(),
    headline: place.headline,
    photoCount: place.photoCount,
    eventsLine: `${eventsCount} ${eventsLabel}`,
  };
}
