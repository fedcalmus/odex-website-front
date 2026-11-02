// Profile-completion flow (Figma "Register · 1 Account — MP-11a",
// "First booking · Waiver — MP-11", "· Health — MP-11c",
// "· Emergency contact — MP-11d"). Shown once, after sign-up: account
// details, then a waiver, health info, and an emergency contact — additional
// info collected for the account, not something tied to any specific
// booking. Transcribed directly from the design screenshots, not the Figma
// file itself (no file link was given), so treat this as best-effort — it
// needs a check against the source frames plus a native-speaker pass, same
// as the other screens built this way.

export const completeProfileCopy = {
  header: { back: "Հետ", secure: "Ապահով վճարում" },
  stepperLabel: "Պրոֆիլի լրացման քայլեր", // written for this build
  // No "account" entry — confirmed from the Waiver/Health/Emergency-contact
  // mocks, whose stepper starts fresh at "Համաձայնագիր" with nothing for the
  // account step before it; account creation is a prerequisite, not step 1
  // of this stepper.
  steps: [
    { label: "Համաձայնագիր", hint: "ռիսկի ընդունում" },
    { label: "Առողջություն", hint: "ոչ պարտադիր" },
    { label: "Արտակարգ կապ", hint: "պարտադիր" },
  ],
  stepOfTotal: (step: number, total: number) => `Քայլ ${step} / ${total}`,

  account: {
    title: "Ստեղծել հաշիվ",
    lead: "Տոմսերը գալիս են էլ. փոստով և պահվում ձեր հաշվում։",
    fields: {
      email: { label: "Էլ. փոստ", helper: "Այստեղ կգա ձեր տոմսը" },
      password: { label: "Գաղտնաբառ", helper: "Առնվազն 8 նիշ՝ տառեր և թվեր" },
      confirmPassword: { label: "Կրկնեք գաղտնաբառը", helper: "Նույնը՝ սխալից խուսափելու համար" },
    },
    emailNotice:
      "Օգտագործեք այն էլ. փոստը, որին հասանելիություն ունեք սարում — տոմսը և ուղեկցորդի հաղորդագրությունները գնում են այնտեղ։",
    haveAccount: "Արդեն ունե՞ք հաշիվ · Մուտք",
    submit: "Շարունակել",
  },

  waiver: {
    title: "Ռիսկի ընդունման համաձայնագիր",
    lead: "Բացօթյա միջոցառումները կապված են ֆիզիկական ռիսկի հետ: Կարդացեք և ընդունեք մեկ անգամ, այն կգործի բոլոր ամրագրումների համար:",
    card: {
      title: "Ռիսկի ընդունման համաձայնագիր",
      version: "v1.2",
      intro: "Բացօթյա միջոցառումները կապված են ֆիզիկական ռիսկի հետ: Մասնակիցը հաստատում է, որ՝",
      bullets: [
        "տեղեկացված է երթուղու բարդության և տևողության մասին",
        "չունի բժշկական հակացուցումներ նման ծանրաբեռնվածության համար",
        "տրամադրել է ճշգրիտ առողջական տվյալներ",
        "պարտավորվում է հետևել ուղեկցորդի ցուցումներին",
        "գիտակցում է, որ եղանակային պայմանները կարող են փոխել կամ ընդհատել երթուղին",
      ],
      acceptTerms: "Կարդացել և ընդունում եմ ռիսկի պայմանները",
    },
    practical: {
      title: "Ինչ է սա նշանակում գործնականում",
      items: [
        "Դուք ընտրում եք ձեր ուժերին համապատասխան երթուղի",
        "Ուղեկցորդի ցուցումները պարտադիր են",
        "Ձեր առողջական տվյալները օգնում են ուղեկցորդին",
      ],
    },
    minorWarning: "18-ից ցածր մասնակիցների համար անհրաժեշտ է խնամակալի համաձայնություն:",
    acceptAgreement: "Կարդացել եմ և ընդունում եմ ռիսկի համաձայնագիրը",
    back: "Հետ",
    submit: "Ընդունել և շարունակել",
    footnote: "Համաձայնագիրը պահվում է ձեր հաշվում՝ տարբերակով և ամսաթվով:",
    quote: {
      text: "«Ամեն արշավից առաջ մենք ասում ենք նույնը՝ լեռը մեզ չի սպասում: Համաձայնագիրը մեզ և ձեր միջև պայմանավորվածություն է, որ բոլորը վերադառնանք:»",
      name: "Արամ Հակոբյան",
      role: "Ուղեկցորդ · 9 տարի",
      avatar: "/images/guides/guide-1.png",
    },
  },

  health: {
    title: "Առողջական տվյալներ",
    lead: "Բոլոր դաշտերը ոչ պարտադիր են: Լրացրեք միայն այն, ինչ ուղեկցորդը պետք է իմանա արտակարգ դեպքում:",
    notice: "Տեսնում են միայն այս միջոցառման ակումբը և նշանակված ուղեկցորդները՝ մեկնարկից 24 ժամ առաջ:",
    skipLabel: "Նշելու բան չունեմ",
    fields: {
      allergies: {
        label: "Ալերգիաներ",
        optionalLabel: "ոչ պարտադիր",
        placeholder: "Օր.՝ ընկույզ, պենիցիլին, մեղվի խայթոց",
        helper: "Սնունդ, դեղամիջոցներ, միջատներ",
      },
      conditions: {
        label: "Հիվանդություններ, որոնք կարևոր են ճանապարհին",
        options: [
          { value: "asthma", label: "Ասթմա" },
          { value: "cardiovascular", label: "Սրտանոթային" },
          { value: "diabetes", label: "Շաքարային դիաբետ" },
          { value: "epilepsy", label: "Էպիլեպսիա" },
          { value: "other", label: "Այլ" },
        ],
      },
      medications: {
        label: "Դեղամիջոցներ, որ վերցնում եք ձեզ հետ",
        optionalLabel: "ոչ պարտադիր",
        placeholder: "Օր.՝ ինհալատոր, EpiPen",
        helper: "Ուղեկցորդը կիմանա, թե որտեղ փնտրել",
      },
      bloodType: {
        label: "Արյան խումբ",
        optionalLabel: "ոչ պարտադիր",
        placeholder: "Ընտրեք",
        options: ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map((value) => ({ value, label: value })),
      },
    },
    why: {
      title: "Ինչու ենք հարցնում",
      items: [
        "Ուղեկցորդը գիտի՝ ում մոտ ինհալատոր փնտրել",
        "Դեղորայքի մասին տեղեկությունը կարևոր է վթարի դեպքում",
        "Ալերգիան ազդում է խմբի սննդի վրա",
      ],
    },
    back: "Հետ",
    submit: "Շարունակել",
    skipLink: "Լրացնել ավելի ուշ",
    footnote: "Կարող եք փոխել ցանկացած պահի՝ Կարգավորումներ › Առողջություն:",
  },

  emergencyContact: {
    title: "Արտակարգ կապ",
    lead: "Ում զանգենք, եթե ճանապարհին ինչ-որ բան պատահի:",
    fields: {
      name: { label: "Անուն ազգանուն", placeholder: "Նարե Հակոբյան" },
      relationship: {
        label: "Ով է ձեզ համար",
        placeholder: "Ընտրեք",
        options: [
          { value: "parent", label: "Ծնող" },
          { value: "spouse", label: "Ամուսին/կին" },
          { value: "sibling", label: "Քույր/եղբայր" },
          { value: "friend", label: "Ընկեր" },
          { value: "other", label: "Այլ" },
        ],
      },
      phone: { label: "Հեռախոս", placeholder: "+374 __ __ __", helper: "Պետք է տարբերվի ձեր համարից" },
    },
    sms: { label: "SMS ծանուցումներ", description: "Ուղարկենք SMS, երբ խումբը մեկնի և վերադառնա" },
    saveForFuture: "Պահպանել հաջորդ ամրագրումների համար",
    // ⚠️ "Required" per the mock (no way to skip) — unlike phone on the
    // public sign-up form, which is optional.
    warning: "Պարտադիր է: Առանց արտակարգ կապի ուղեկցորդը չի իմանա՝ ում զանգել:",
    back: "Հետ",
    // ⚠️ The mock's label implies moving on to a real payment step
    // ("Շարունակել վճարմանը"), left as-is since it reads fine generically
    // ("continue"), but there's no backend and this flow isn't attached to
    // any specific booking — submitting goes home.
    submit: "Շարունակել վճարմանը",
  },
} as const;
