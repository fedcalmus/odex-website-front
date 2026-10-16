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

// Club sign-up wizard (Figma "Club sign-up · 1 Account — MP-30a",
// "· 2 Club — MP-30b", "· 3 Documents — MP-30c", "· Submitted — MP-30d").
// Transcribed directly from the design screenshots, not the Figma file
// itself (no file link was given), so treat this as best-effort — it needs a
// check against the source frames plus a native-speaker pass, same as the
// rest of this file.
//
// The "Ուղղություններ" (activities) chips below are the exact 8 options shown
// in the mock, not the real `ACTIVITY_TYPE_LABELS` taxonomy from
// `@/content/taxonomy` (19 finer-grained entries) — the mock's categories are
// broader groupings that don't map 1:1 onto that list, and the request was
// to match the screenshot exactly. ⚠️ The 8th chip is legible as "Մոլորակ"
// ("planet") in the source screenshot, which doesn't read as an outdoor
// activity — worth double-checking against the actual Figma frame in case
// it's a mock/lorem artifact rather than intended copy.
export const clubRegisterCopy = {
  stepperLabel: "Գրանցման քայլեր",
  steps: [
    { label: "Հաշիվ", hint: "կոնտակտային անձ" },
    { label: "Ակումբ", hint: "տվյալներ և ուղղություններ" },
    { label: "Փաստաթղթեր", hint: "կարող եք հետո" },
  ],
  stepOfTotal: (step: number, total: number) => `Քայլ ${step} / ${total}`,

  account: {
    title: "Գրանցել ակումբը",
    lead: "Սկսենք ձեզնից՝ կոնտակտային անձ, որի հետ կկապվենք ստուգման ընթացքում:",
    fields: {
      contactName: { label: "Կոնտակտային անձ", placeholder: "Արամ Հակոբյան", helper: "Անուն ազգանուն" },
      email: {
        label: "Էլ. փոստ",
        placeholder: "info@lernagnats.am",
        helper: "Այստեղ կգան ստուգման արդյունքը և ամրագրումները",
      },
      phone: {
        label: "Հեռախոս",
        placeholder: "+374 91 234 567",
        helper: "Ստուգման ընթացքում կզանգենք այս համարին",
      },
      password: { label: "Գաղտնաբառ", helper: "Առնվազն 8 նիշ և մեկ թիվ" },
    },
    agreement: {
      prefix: "Համաձայն եմ ",
      terms: "Ակումբների պայմաններին",
      middle: " և ",
      privacy: "Գաղտնիության քաղաքականությանը",
      termsHref: "/terms",
      privacyHref: "/privacy",
    },
    submit: "Շարունակել",
  },

  club: {
    title: "Ակումբի տվյալները",
    lead: "Հրապարակային անունը տեսնում են մասնակիցները, իրավաբանականը՝ միայն մենք:",
    fields: {
      clubName: { label: "Ակումբի անվանումը", placeholder: "Լեռնագնաց", helper: "Այսպես կերևա մարքեթինգում" },
      legalName: {
        label: "Իրավաբանական անվանումը",
        placeholder: "«Լեռնագնաց» ՍՊԸ",
        helper: "Ինչպես գրանցված է պետռեգիստրում",
      },
      tin: { label: "ՀՎՀՀ", placeholder: "02612345", helper: "8 նիշ" },
      region: { label: "Մարզ", placeholder: "Ընտրեք մարզը", helper: "Որտեղ է գրանցված ակումբը" },
      activities: {
        label: "Ուղղություններ",
        helper: "Ընտրեք բոլորը, որոնցով անցկացնում եք միջոցառումներ",
        options: [
          { value: "hiking", label: "Արշավ" },
          { value: "climbing", label: "Ժայռամագլցում" },
          { value: "cycling", label: "Հեծանիվ" },
          { value: "water", label: "Ջրային" },
          { value: "winter", label: "Ձմեռային" },
          { value: "air", label: "Օդային" },
          { value: "caving", label: "Քարանձավ" },
          { value: "planet", label: "Մոլորակ" },
        ],
      },
    },
    back: "Հետ",
    submit: "Շարունակել",
  },

  documents: {
    title: "Փաստաթղթեր",
    lead: "Առանց դրանց ակումբը չի հրապարակվի, բայց կարող եք վերբեռնել նաև հետո՝ վահանակից:",
    fields: {
      insurance: {
        label: "Ապահովագրության պոլիս",
        helper: "Գործող պոլիս՝ կազմակերպչական պատասխանատվության ապահովագրության",
        required: "Վերբեռնեք ապահովագրության պոլիսը",
      },
      guideFile: { helper: "Առաջին օգնության և ուղղության հավաստագրեր" },
    },
    uploadLabel: "Վերբեռնել ֆայլ",
    fileHint: "PDF · JPG · մինչև 10 ՄԲ",
    guideNameLabel: (n: number) => `Ուղեկցորդ ${n}`,
    guideNamePlaceholder: "Անուն ազգանուն",
    addGuide: "Ավելացնել ուղեկցորդ",
    removeGuide: "Հեռացնել ուղեկցորդը",
    lockNotice: "Ստուգումը սկսվում է, երբ բոլոր պարտադիր փաստաթղթերը վերբեռնված են:",
    deferLabel: "Վերբեռնել հետո",
    submitLabel: "Ուղարկել ստուգման",
  },

  submitted: {
    title: "Հայտն ուղարկված է",
    lead: (email: string) => `Ստուգում ենք փաստաթղթերը 2 աշխատանքային օրում: Արդյունքը կգա ${email} հասցեին:`,
    rows: {
      submittedTitle: "Հայտն ուղարկված է",
      submittedMeta: "Հենց նոր",
      reviewTitle: "Ստուգում",
      reviewMeta: "Մինչև 2 աշխատանքային օր",
      nextTitle: "Առաջին միջոցառումը",
      nextMeta: "Ամրագրերը հրապարակվում են ստուգումից հետո",
    },
    // ⚠️ The mock's CTA opens a club dashboard ("Բացել ակումբի վահանակը"), but
    // no club dashboard/admin area exists anywhere in this app yet — points
    // at "/" instead of a route that doesn't exist.
    cta: { label: "Բացել ակումբի վահանակը", href: "/" },
  },
} as const;
