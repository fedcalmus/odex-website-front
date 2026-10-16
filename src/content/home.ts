import type { DifficultyExplainerCardProps } from "@/components/DifficultyExplainerCard";
import type { DestinationCardProps } from "@/components/DestinationCard";
import type { SearchBandProps } from "@/components/SearchBand";
import type { LatestClubs } from "@/api/clubs";
import { ACTIVITIES } from "@/data/activities";
import { CLUBS, getClub, toClubCardProps } from "@/data/clubs";
import { getEventBySlug, HOME_WEEKEND_SLUGS, toEventCardProps } from "@/data/events";
import type { HeroProps } from "@/sections/home/Hero";

// Homepage content — Armenian copy verbatim from Figma "Homepage - MP-01"
// (194:16212). This is MOCK DATA in the shape the components take: events,
// clubs, counts and the live figures must come from the API. Grouped by
// section so each maps 1:1 to a component in src/sections/home.

// ── Hero ──────────────────────────────────────────────────────────────────
// Mock: a departure 1 day 18 h 40 min away. The real one is "the soonest
// departure with places left" from the API.
const NEXT_DEPARTURE = new Date(Date.now() + ((24 + 18) * 60 + 40) * 60_000).toISOString();

export const hero: HeroProps = {
  image: "/images/hero/hero.png",
  eyebrow: "ՔՈ ՀԱՋՈՐԴ ԱՐՇԱՎԸ",
  headlineLines: ["Սար գնա նրանց", "հետ, ովքեր քեզ ապահով", "ետ են բերում։"],
  lead: "Odex-ի բոլոր միջոցառումները վարում են գրանցված ակումբները՝ նշանակված գիդով, ուղիղ հսկողությամբ և արտակարգ կապով։",
  cta: { label: "Գտնել միջոցառում", href: "/events" },
  // Placeholder target — no video page exists yet.
  video: { href: "/about", label: "Դիտել տեսանյութը", duration: "2 ր" },
  liveStatus: {
    eyebrow: "ՀԻՄԱ ՈՒՂՈՒ ՎՐԱ",
    count: 4,
    countLabel: "խումբ սարում է",
    details: "62 մասնակից · վերջին ազդանշան 3 ր առաջ",
    privacyNote: "Հետագծումը տեսանելի է ակումբին",
  },
  featuredEvent: {
    eyebrow: "ՀԱՋՈՐԴ ՄԵԿՆՈՒՄԸ",
    startsAt: NEXT_DEPARTURE,
    countdownLabels: { days: "ՕՐ", hours: "ԺԱՄ", minutes: "ՐՈՊԵ" },
    title: "Արագած՝ հարավային գագաթ",
    meta: "Կասկադ, Երևան · 06:00 · Հայաստանի արահետներ",
    places: { free: 4, total: 16 },
    freeLabel: "ազատ",
    cta: { label: "Ամրագրել տեղը", href: "/events/aragats-southern-peak" },
  },
};

// ── Search band ───────────────────────────────────────────────────────────
// Only the option copy Figma shows exists so far. "Date" and "Type" each have
// their single default option; the full lists need copy from the design team.
export const searchBand: SearchBandProps = {
  action: "/events",
  label: "Միջոցառումների որոնում",
  submitLabel: "Փնտրել",
  segments: [
    {
      name: "activity",
      label: "ՈՒՂՂՈՒԹՅՈՒՆ",
      defaultValue: "",
      options: [
        { value: "", label: "Բոլոր ուղղությունները" },
        ...ACTIVITIES.map((activity) => ({ value: activity.slug, label: activity.title })),
      ],
    },
    {
      name: "when",
      label: "ԱՄՍԱԹԻՎ",
      defaultValue: "this-weekend",
      options: [{ value: "this-weekend", label: "Այս շաբաթ-կիրակի" }],
    },
    {
      name: "type",
      label: "ՏԵՍԱԿ",
      defaultValue: "",
      options: [{ value: "", label: "Ցանկացած" }],
    },
    {
      name: "difficulty",
      label: "ԲԱՐԴՈՒԹՅՈՒՆ",
      defaultValue: "",
      options: [
        { value: "", label: "Ցանկացած" },
        { value: "easy", label: "Հեշտ" },
        { value: "moderate", label: "Միջին" },
        { value: "hard", label: "Դժվար" },
        { value: "extreme", label: "Ծայրահեղ" },
      ],
    },
  ],
};

// ── Activities ("Ուղղություններ") ─────────────────────────────────────────
// Live event counts per group — MOCK numbers from Figma; from the API in
// production. A group with none is dropped by the section rather than shown as "0".
const ACTIVITY_COUNTS: Record<(typeof ACTIVITIES)[number]["slug"], number> = {
  hiking: 48,
  climbing: 16,
  cycling: 22,
  water: 9,
  winter: 14,
  air: 5,
  caving: 3,
};

export const activities = {
  heading: {
    eyebrow: "ԸՆՏՐԻՐ ՈՒՂՂՈՒԹՅՈՒՆԸ",
    title: "Յոթ ուղղություն, մեկ օրացույց",
  },
  items: ACTIVITIES.map((activity) => ({ ...activity, count: ACTIVITY_COUNTS[activity.slug] })),
};

// ── This weekend ("Այս շաբաթ-կիրակի") ─────────────────────────────────────
// The same records the discovery and detail pages use, in the design's order.
export const thisWeekend = {
  heading: {
    title: "Այս շաբաթ-կիրակի դուրս են գալիս",
    description: "Դեռ ազատ տեղեր կան։ Դասավորված է մեկնման ժամով։",
    link: { label: "Բոլոր միջոցառումները", href: "/events" },
  },
  events: HOME_WEEKEND_SLUGS.map((slug) => {
    const event = getEventBySlug(slug);
    if (!event) throw new Error(`Homepage references unknown event "${slug}"`);
    return { id: slug, ...toEventCardProps(event) };
  }),
};

// ── Guide ("Ուղեցույց") ───────────────────────────────────────────────────
type GuideItem = DestinationCardProps & { id: string };

const region: Omit<GuideItem, "id"> = {
  kind: "region",
  place: "ԱՐԱԳԱԾՈՏՆ",
  typeLabel: "Մարզ",
  title: "Արագածի չորս գագաթները",
  href: "/guide/aragats-four-peaks",
  image: "/images/guide/region.png",
};
const tip: Omit<GuideItem, "id"> = {
  kind: "tip",
  place: "ՀԱՅԱՍՏԱՆ",
  typeLabel: "Խորհուրդ",
  title: "Լավագույն շաբաթավերջյան արահետները",
  href: "/guide/best-weekend-trails",
  image: "/images/guide/tip.png",
};
const community: Omit<GuideItem, "id"> = {
  kind: "community",
  place: "ՏԱՎՈՒՇ",
  typeLabel: "Համայնք",
  title: "Դիլիջան և անտառային օղակները",
  href: "/guide/dilijan-forest-loops",
  image: "/images/guide/community.png",
};
const season: Omit<GuideItem, "id"> = {
  kind: "season",
  place: "ԿՈՏԱՅՔ",
  typeLabel: "Խորհուրդ",
  title: "Ծաղկաձոր՝ սքի թուրինգի սեզոն",
  href: "/guide/tsaghkadzor-ski-touring",
  image: "/images/guide/season.png",
};

// Two rows, each a different order of the same four so the stagger reads. Real
// data: split the editorial list across the rows.
export const guide = {
  heading: {
    eyebrow: "ՈՒՂԵՑՈՒՅՑ",
    title: "Բացիր Հայաստանը",
    description: "Տարածաշրջաններ, գագաթներ և երթուղիներ՝ ակումբների ընտրությամբ։",
    link: { label: "Անցնել ուղեցույցին", href: "/guide" },
  },
  rowLabels: ["Ուղեցույց՝ առաջին շարք", "Ուղեցույց՝ երկրորդ շարք"] as const,
  rows: [
    [region, tip, community, season, region, tip],
    [tip, region, season, community, tip, region],
  ].map((row, rowIndex) =>
    row.map((item, index): GuideItem => ({ ...item, id: `row${rowIndex}-${index}-${item.kind}` })),
  ),
};

// ── Clubs ("Ակումբներ") ───────────────────────────────────────────────────
// The same club records the directory and the profile pages use, in the design's order.
const HOME_CLUB_SLUGS = ["armenia-trails", "vertical-yerevan", "tavush-trail", "sevan-water"] as const;

// The four latest clubs come from the API (src/api/clubs.ts). `{count}` in the
// title is replaced with the API's total.
export const clubs = {
  heading: {
    eyebrow: "ԱԿՈՒՄԲՆԵՐԻ ՑԱՆՑ",
    title: "{count} ակումբ, բոլորը ստուգված",
    description: "Ամեն ակումբ անցնում է փաստաթղթերի և գիդերի հավաստագրերի ստուգում։",
    link: { label: "Դիտել բոլոր ակումբները", href: "/clubs" },
  },
  /** Name of the structured-data list (schema.org ItemList). */
  listName: "Ակումբներ",
  // STATIC FALLBACK (the previous mock version), shown until the API has clubs
  // to return — the public endpoint doesn't exist yet. Delete once it does.
  fallback: {
    total: CLUBS.length,
    clubs: HOME_CLUB_SLUGS.map((slug) => ({ id: slug, ...toClubCardProps(getClub(slug)) })),
  } satisfies LatestClubs,
};

// ── Difficulty ("Բարդություն") ────────────────────────────────────────────
// SAFETY-CRITICAL copy — needs review by an experienced guide before launch.
export const difficulty = {
  heading: {
    title: "Չորս աստիճան, և ամեն մեկի գինը՝ բացված։",
    description: "Բարդությունը գրված է ամեն միջոցառման վրա՝ նշանով և բառով, երբեք միայն գույնով։",
  },
  levels: [
    {
      level: "easy",
      description: "Զբոսանք։ Սովորական սպորտային կոշիկը բավական է, և ողջ ընտանիքով կարելի է գնալ։",
      anchor: "մինչև 10 կմ · մինչև 400 մ վերելք",
    },
    {
      level: "moderate",
      description: "Երկար օր ոտքի վրա։ Պետք է արդեն սիրես երկար քայլելը և ունենաս արահետային կոշիկ։",
      anchor: "10–16 կմ · 400–1 000 մ վերելք",
    },
    {
      level: "hard",
      description: "Վաղ մեկնարկ, կտրուկ վերելք։ Կանոնավոր ֆիզիկական ակտիվություն է պահանջվում։",
      anchor: "16–24 կմ · 1 000–1 600 մ վերելք",
    },
    {
      level: "extreme",
      description: "Տեխնիկական հատվածներ և երկար օր։ Նախորդ լեռնային փորձը պարտադիր է։",
      anchor: "24+ կմ · 1 600+ մ վերելք",
    },
  ] satisfies DifficultyExplainerCardProps[],
};
