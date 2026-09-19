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
} as const;
