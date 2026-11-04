import type { IconName } from "@/components/Icon";
import type { SortSelectProps } from "@/components/SortSelect";
import type { PlaceSortKey } from "@/lib/places-params";

// Places directory ("Places — MP-17"). Transcribed from the design
// screenshot, not the Figma file itself (no file link was given), so treat
// this as best-effort — it needs a check against the source frame plus a
// native-speaker pass, same as the other screens built this way.

export const placesCopy = {
  title: "Վայրեր",
  /** "64 վայր՝ գագաթներ, մարգեր, լճեր և վանքեր։ …" — the count is live. */
  lead: (count: number) =>
    `${count} վայր՝ գագաթներ, մարզեր, լճեր և վանքեր։ Ամեն մեկի ներսում՝ մասնակիցների լուսանկարները և այնտեղ գնացող միջոցառումները:`,
  allKinds: "Բոլորը",
  kindNav: "Տեսակ", // written for this build

  toolbar: {
    sortLabel: "Դասավորել՝",
    // Icons/descriptions (Figma "Sort control" open-state mock). "nearest"
    // gets a distance glyph (navigation), not the clock Events/Clubs use for
    // their own "soonest" — places sort by distance from Yerevan, not time.
    sortOptions: [
      { value: "nearest", label: "Ամենամոտը", description: "Երևանից հեռավորությամբ", icon: "navigation" }, // written for this build
      { value: "popular", label: "Ամենահայտնին", description: "Միջոցառումների քանակով", icon: "trending-up" }, // written for this build
      { value: "name", label: "Ա–Ֆ", description: "Այբբենական", icon: "list" },
    ] satisfies Array<{ value: PlaceSortKey; label: string; description: string; icon: IconName }> as SortSelectProps["options"],
    resultsLabel: "վայր",
    photosLabel: "լուսանկար",
    view: { group: "Տեսք", grid: "Ցանցային տեսք", list: "Ցուցակային տեսք" }, // written for this build
  },

  loadMore: {
    status: (shown: number, total: number) => `Ցուցադրված է ${shown} / ${total}`,
    action: (more: number) => `Ցույց տալ ևս ${more}`,
  },

  empty: {
    title: "Ոչինչ չի գտնվել",
    action: "Բոլորը",
  },

  eventsLabel: "միջոցառում",
} as const;
