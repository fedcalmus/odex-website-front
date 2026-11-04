import type { BookingWidgetLabels } from "@/components/BookingWidget";
import type { CancellationTerm } from "@/components/CancellationPolicy";
import type { EventHeroLabels } from "@/components/EventHero";
import type { SafetyAssurance } from "@/components/SafetyAssurances";

// Event detail ("Event detail - MP-03", Figma 194:17520) copy. Verbatim from
// Figma except strings marked "written for this build" — accessible names and
// the few states the design doesn't spell out. Those need a native-speaker pass.

export const eventDetailCopy = {
  breadcrumbRoot: "Միջոցառումներ",

  heroLabels: {
    breadcrumb: "Ուղի", // written for this build
    favorite: "Ավելացնել ընտրյալներում", // written for this build
    share: "Կիսվել", // written for this build
    photo: "Լուսանկար", // written for this build
    allPhotos: "Բոլոր լուսանկարները", // written for this build
    closeGallery: "Փակել", // written for this build
    verifiedClub: "Ստուգված ակումբ",
  } satisfies EventHeroLabels,

  keyFacts: {
    route: "երթուղի",
    ascent: "վերելք",
    duration: "տևողություն",
    group: "առավելագույն խումբ",
    distanceUnit: "կմ",
    ascentUnit: "մ",
    durationUnit: "ժ",
  },

  requirements: { age: "Տարիք", experience: "Փորձ", fitness: "Պատրաստվածություն" },

  blocks: {
    description: "Երթուղու մասին",
    route: "Հանդիպում և մեկնարկ",
    gear: "Անհրաժեշտ սարքավորում",
    gearNote: "Ցանկը կրկնվում է ձեր տոմսի վրա և տպվող մասնակիցների ցուցակում։",
    included: "Ներառված է",
    excluded: "Ներառված չէ",
    team: "Ձեր ուղեկցորդները",
    cancellation: "Չեղարկման պայմաններ",
  },

  routePoints: { meeting: "Հանդիպման վայր", departure: "Մեկնարկի կետ", return: "Վերադարձ" },

  // Platform-wide policy, shown on every event.
  cancellationTerms: [
    { when: "Մինչև 48 ժամ", outcome: "Ամբողջական վերադարձ", tone: "full" },
    { when: "24–48 ժամ", outcome: "50 % վերադարձ", tone: "partial" },
    { when: "24 ժամից պակաս", outcome: "Վերադարձ չկա", tone: "none" },
    { when: "Ակումբը չեղարկում է", outcome: "Ամբողջական վերադարձ", tone: "full" },
  ] satisfies CancellationTerm[],

  booking: {
    title: "Ամրագրում", // written for this build
    priceNote: "մեկ մասնակցի համար",
    participants: "Մասնակիցներ",
    decrease: "Պակասեցնել", // written for this build
    increase: "Ավելացնել", // written for this build
    book: "Ամրագրել տեղը",
    waitlist: "Սպասման ցուցակ", // written for this build
    cancellationNote: "Անվճար չեղարկում մինչև 48 ժամ",
    spotsLeft: "տեղ մնացել",
  } satisfies BookingWidgetLabels,

  safety: {
    title: "Ինչ է ապահովում Odex-ը",
    items: [
      {
        icon: "navigation",
        title: "Ուղիղ հսկողություն",
        description: "Ակումբը տեսնում է խմբի դիրքը ողջ ընթացքում",
      },
      {
        icon: "alert-triangle",
        title: "Արտակարգ կապ",
        description: "Ուղեկցորդի հեռախոսում՝ մեկ կոճակ",
      },
      {
        icon: "shield-check",
        title: "Ստուգված ակումբ",
        description: "Փաստաթղթեր և հավաստագրեր՝ ստուգված",
      },
    ] satisfies SafetyAssurance[],
  },

  follow: { label: "Հետևել", following: "Հետևում եք" }, // "following" written for this build
  eventsLabel: "միջոցառում",

  // "Reviews" and "Questions to the club" (Figma "Event detail - MP-03 (1)",
  // the reviews/Q&A revision). The mock treats a review's club reply as a
  // plain text label ("Ակումբի պատասխանը") but a comment's reply as a lime
  // badge ("Ակումբ") — unified here on the one badge treatment since both
  // are the same "a club replied" fact and don't need two different copy
  // patterns for it.
  reviews: {
    title: "Կարծիքներ",
    link: "Բոլորը",
    ratingsLabel: "գնահատական",
    reviewsLabel: "կարծիք",
    verifiedLabel: "Մասնակցել է",
    // Suffix after the raw count — "{n} միջոցառում Odex-ում". A plain string
    // rather than a `(count) => …` function: these two live in content that
    // crosses into a Client Component (ReviewCard), and functions can't be
    // passed across that server/client boundary.
    eventsOnOdexLabel: "միջոցառում Odex-ում",
    helpful: "Օգտակար",
    helpfulActive: "Շնորհակալություն", // written for this build — swapped in once the viewer marks a review helpful
    report: "Բողոքել",
    reported: "Բողոքված է", // written for this build
    replyBadge: "Ակումբ",
    empty: {
      title: "Դեռ կարծիք չկա", // written for this build
      description: "Առաջինն եղեք, ով կկիսվի իր փորձով այս միջոցառումից հետո:", // written for this build
    },
  },

  comments: {
    title: "Հարցեր ակումբին",
    link: "Բոլորը",
    like: "Հավանել",
    liked: "Հավանեցիք", // written for this build
    replyBadge: "Ակումբ",
    inputLabel: "Նոր հարց կամ մեկնաբանություն", // written for this build
    inputPlaceholder: "Գրեք հարց կամ մեկնաբանություն...",
    submit: "Ուղարկել", // written for this build — accessible name of the send button
    postedJustNow: "Հենց նոր", // written for this build
    you: "Դուք", // written for this build — stands in for the author name until accounts exist
    empty: {
      title: "Դեռ հարց չկա", // written for this build
      description: "Հարցրեք ակումբին ամրագրումից, երթուղուց կամ պատրաստվածությունից առաջ:", // written for this build
    },
  },
} as const;
