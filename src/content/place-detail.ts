// Place detail ("Place detail — MP-34"). Transcribed from the design
// screenshot, not the Figma file itself (no file link was given), so treat
// this as best-effort — several strings below (marked "written for this
// build") were illegible in the compressed source and needed a plausible
// reconstruction. Needs a check against the source frame plus a
// native-speaker pass, same as the other screens built this way.

export const placeDetailCopy = {
  breadcrumbRoot: "Վայրեր",
  breadcrumbLabel: "Ուղի", // written for this build

  hero: {
    follow: "Հետևել",
    following: "Հետևում եք", // written for this build
    share: "Կիսվել",
    addPhoto: "Ավելացնել լուսանկար",
  },

  tabs: {
    label: "Բաժիններ", // written for this build
    overview: "Ընդհանուր",
    events: "Միջոցառումներ",
    photos: "Լուսանկարներ",
    clubs: "Ակումբներ",
  },

  about: "Վայրի մասին",

  events: {
    title: "Առաջիկա միջոցառումներ այստեղ",
    link: "Բոլորը",
    empty: "Առաջիկայում պլանավորված միջոցառում չկա այս վայրում։", // written for this build
  },

  photos: {
    title: "Լուսանկարներ",
    link: "Բոլորը",
    note: "Մասնակիցների իրական լուսանկարներն են՝ այս վայրից։ Ավելացրեք ձերը վերևի կոճակից։", // written for this build
  },

  clubs: {
    title: "Ակումբներ, որոնք գնում են այստեղ",
    link: "Բոլորը",
    eventsLabel: "ՄԻՋՈՑԱՌՈՒՄ",
    guidesLabel: "ԳԻԴ",
    verifiedLabel: "Ստուգված",
    empty: "Առայժմ ոչ մի ակումբ այստեղ միջոցառում չի անցկացրել։", // written for this build
  },

  sidebar: {
    infoTitle: "ՏԵՂԵԿԱՆՔ",
    weatherUpdated: "Թարմացվել է 1 ժամ առաջ", // written for this build
    mapLabel: "Քարտեզ",
    mapAction: "բացել Google Maps-ում", // written for this build
    followNotice: "Հետևեք վայրին, որ իմանաք նոր միջոցառումների մասին:", // written for this build
  },

  // "Place detail · Events — MP-34a": the full events list for one place.
  // The chip labels were compressed/hard to read in the source screenshot;
  // "Ազատ տեղերով" below is a cleaner rewrite of what the mock showed
  // rather than a literal transcription — flagged for a native-speaker pass
  // same as the rest of this file.
  eventsPage: {
    chipsLabel: "Զտիչներ", // written for this build
    chipAll: "Բոլորը",
    chipWeekend: "Այս շաբաթ-կիրակի",
    chipAvailable: "Ազատ տեղերով", // written for this build
    chipPast: "Անցած",
    // This catalog doesn't track completed/historical occurrences as
    // separate records, so "Անցած" always has nothing to show — a real
    // empty state, not a bug.
    empty: "Այս ցանկում միջոցառում չի գտնվել։", // written for this build
  },

  // "Place detail · Clubs — MP-34b": the full clubs list for one place.
  clubsPage: {
    lead: "Հետևեք ակումբին՝ առաջին իմանալու նոր միջոցառումների մասին:",
  },
} as const;
