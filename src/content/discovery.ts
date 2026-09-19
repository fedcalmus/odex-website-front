import type { SearchBandProps } from "@/components/SearchBand";
import { ACTIVITIES } from "@/data/activities";
import { WINDOWS } from "@/data/discovery";
import type { DiscoveryParams } from "@/lib/discovery-params";
import { DIFFICULTY_LABELS, DIFFICULTY_LEVELS } from "@/lib/difficulty";
import { formatDateRange } from "@/lib/format";

// Discovery ("Discovery - MP-02", Figma 194:16873) copy. Verbatim from Figma
// except the strings marked "written for this build" — controls the design
// shows but never spells out (sort options, empty state, accessible names).
// Those need a native-speaker pass.

export const discoveryCopy = {
  title: "Ո՞ւր ես գնում այս շաբաթ",
  /** Second sentence of the hero lead; the first is the live numbers. */
  leadClosing: "Ամեն մեկը՝ ստուգված գիդով և ուղիղ հսկողությամբ։",
  eventsLabel: "միջոցառում",
  conditionsLabel: "Եղանակը մարզերում", // written for this build

  toolbar: {
    sortLabel: "Դասավորել՝",
    sortOptions: [
      { value: "soonest", label: "Ամենամոտը" },
      { value: "cheapest", label: "Ամենաէժանը" }, // written for this build
    ] as const,
    view: { group: "Տեսք", grid: "Ցանցային տեսք", list: "Ցուցակային տեսք" }, // written for this build
    resultsLabel: "արդյունք",
    clearAll: "Մաքրել բոլորը",
    remove: "Հեռացնել", // written for this build
  },

  filters: {
    title: "Զտիչներ",
    clear: "Մաքրել",
    activity: "Ուղղություն",
    price: "Գին",
    priceUpTo: "մինչև",
    close: "Փակել", // written for this build
  },

  verifiedNote: {
    title: "Ամեն ակումբ ստուգված է",
    description:
      "Փաստաթղթերը, գիդերի հավաստագրերը և ապահովագրությունը ստուգվում են մինչև հրապարակումը։",
  },

  empty: { title: "Ոչինչ չի գտնվել" }, // written for this build

  loadMore: { action: "Տեսնել հաջորդ շաբաթը" },
} as const;

/** "9 միջոցառում, 6 ակումբ, 7 մարզ։ Ամեն մեկը՝ …" */
export function discoveryLead(stats: { events: number; clubs: number; regions: number }): string {
  return `${stats.events} միջոցառում, ${stats.clubs} ակումբ, ${stats.regions} մարզ։ ${discoveryCopy.leadClosing}`;
}

/** "ՈՒՂՂՈՒԹՅՈՒՆ / ԱՄՍԱԹԻՎ / ՏԵՍԱԿ / ԲԱՐԴՈՒԹՅՈՒՆ" band, pre-selected from the current filters. */
export function buildDiscoverySearchBand(params: DiscoveryParams): SearchBandProps {
  // Filters the band has no segment for ride along unchanged.
  const hidden: Array<[string, string]> = [
    ...params.region.map((value): [string, string] => ["region", value]),
    ...params.club.map((value): [string, string] => ["club", value]),
    ...(params.maxPrice !== null ? [["maxPrice", String(params.maxPrice)] as [string, string]] : []),
    ...(params.q ? [["q", params.q] as [string, string]] : []),
    ["sort", params.sort],
    ["view", params.view],
  ];

  return {
    action: "/events",
    label: "Միջոցառումների որոնում",
    submitLabel: "Փնտրել",
    hidden,
    segments: [
      {
        name: "activity",
        label: "ՈՒՂՂՈՒԹՅՈՒՆ",
        defaultValue: params.activity[0] ?? "",
        options: [
          { value: "", label: "Բոլոր ուղղությունները" },
          ...ACTIVITIES.map((activity) => ({ value: activity.slug, label: activity.title })),
        ],
      },
      {
        name: "when",
        label: "ԱՄՍԱԹԻՎ",
        defaultValue: params.when,
        options: [
          ...(Object.keys(WINDOWS) as Array<keyof typeof WINDOWS>).map((key) => ({
            value: key,
            label: formatDateRange(WINDOWS[key].fromIso, WINDOWS[key].toIso),
          })),
          // Reached from a club profile ("all its events"). Written for this build.
          { value: "all", label: "Բոլոր ամսաթվերը" },
        ],
      },
      {
        // Every event so far is a single day, so this narrows nothing yet.
        name: "type",
        label: "ՏԵՍԱԿ",
        defaultValue: "",
        options: [
          { value: "", label: "Ցանկացած" },
          { value: "one-day", label: "Մեկօրյա" },
        ],
      },
      {
        name: "difficulty",
        label: "ԲԱՐԴՈՒԹՅՈՒՆ",
        defaultValue: params.difficulty[0] ?? "",
        options: [
          { value: "", label: "Ցանկացած" },
          ...DIFFICULTY_LEVELS.map((level) => ({ value: level, label: DIFFICULTY_LABELS[level] })),
        ],
      },
    ],
  };
}
