import type { SortSelectProps } from "@/components/SortSelect";
import type { ClubSortKey } from "@/lib/clubs-params";

// Clubs directory ("Clubs — MP-18", Figma 231:10756) and club profile
// ("Club profile — MP-08", Figma 199:18419) copy. Verbatim from Figma except
// strings marked "written for this build" — they need a native-speaker pass.

export const clubsCopy = {
  title: "Ակումբներ",
  /** "34 ակումբ, բոլորը ստուգված։ …" — the count is live. */
  lead: (count: number) =>
    `${count} ակումբ, բոլորը ստուգված։ Փաստաթղթերը, գիդերի հավաստագրերը և ապահովագրությունը ստուգվում են մինչև առաջին հրապարակումը։`,
  allActivities: "Բոլորը",
  activityNav: "Ուղղություն", // written for this build

  toolbar: {
    sortLabel: "Դասավորել՝",
    // Six options (Figma). The design gives each a sub-line; a native <select> can't show one,
    // so only the labels are used. "Գինը ցածրից / բարձրից" is split into its two directions.
    sortOptions: [
      { value: "soonest", label: "Ամենամոտը" },
      { value: "popular", label: "Ամենապահանջվածը" },
      { value: "price-asc", label: "Գինը ցածրից" },
      { value: "price-desc", label: "Գինը բարձրից" },
      { value: "name", label: "Ա–Ֆ" },
      { value: "rating", label: "Վարկանիշը" },
    ] satisfies Array<{ value: ClubSortKey; label: string }> as SortSelectProps["options"],
    resultsLabel: "արդյունք",
    clearAll: "Մաքրել բոլորը",
    remove: "Հեռացնել", // written for this build
    view: { group: "Տեսք", grid: "Ցանցային տեսք", list: "Ցուցակային տեսք" }, // written for this build
  },

  sidebar: {
    regionTitle: "Մարզ",
    filtersLabel: "Զտիչներ",
    closeLabel: "Փակել", // written for this build
    verification: {
      title: "Ի՞նչ ենք ստուգում",
      items: [
        "Իրավաբանական գրանցում և ՀՎՀՀ",
        "Ուղեկցորդների հավաստագրերը",
        "Ապահովագրության վավերականությունը",
      ],
    },
    cta: {
      title: "Ակո՞ւմբ եք վարում",
      text: "Առաջին երեք ամիսը՝ առանց միջնորդավճարի։",
      action: "Գրանցել ակումբը",
      href: "/clubs/register",
    },
  },

  loadMore: {
    status: (shown: number, total: number) => `Ցուցադրված է ${shown} / ${total}`,
    action: (more: number) => `Ցույց տալ ևս ${more}`,
  },

  empty: { title: "Ոչինչ չի գտնվել" }, // written for this build
} as const;

export const clubProfileCopy = {
  verifiedLabel: "Ստուգված ակումբ",
  share: "Կիսվել",
  follow: { label: "Հետևել", following: "Հետևում եք" }, // "following" written for this build

  stats: {
    events: "ԱՌԱՋԻԿԱ ՄԻՋՈՑԱՌՈՒՄ",
    guides: "ՈՒՂԵԿՑՈՐԴ",
    trips: "ԱՆՑԿԱՑՐԱԾ ԱՐՇԱՎ",
    rating: (reviews: number) => `ՎԱՐԿԱՆԻՇ · ${reviews} ԿԱՐԾԻՔ`,
    verified: "ՎԱՎԵՐԱՑՎԱԾ Է",
  },

  about: "Ակումբի մասին",
  events: {
    eyebrow: "ԱՌԱՋԻԿԱ",
    title: (count: number) => `${count} միջոցառում`,
    link: "Բոլորը",
  },
  guides: {
    title: "Ուղեկցորդները",
    description: "Բոլորը հավաստագրված են և ապահովագրված։",
  },
  gallery: {
    eyebrow: "ՊԱՏԿԵՐԱՍՐԱՀ",
    title: "Մասնակիցների լուսանկարները",
    link: "Բոլորը",
  },

  rail: {
    checked: "Ինչ ենք ստուգել",
    legal: "Իրավաբանական գրանցում",
    guideCerts: "Ուղեկցորդների հավաստագրեր",
    insurance: "Ապահովագրություն",
    guidesValid: (valid: number, total: number) => `${valid} / ${total} վավեր`,
    insuranceUntil: (date: string) => `Գործում է մինչև ${date}`,
    activities: "Ուղղություններ",
    regions: "Որտեղ են գնում",
    reviewsNote:
      "Կարծիքները հրապարակային չեն։ Վարկանիշը հաշվարկվում է ավարտված միջոցառումների գնահատականներից։",
  },
} as const;
