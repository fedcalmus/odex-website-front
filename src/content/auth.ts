// Registration ("Register · 1 Account — MP-11a", Figma 327:23176) copy. Verbatim
// from Figma except strings marked "written for this build": the Figma frame
// uses placeholder fields, so the labels and helpers are ours. Needs a
// native-speaker pass.

export const registerCopy = {
  header: {
    back: "Հետ",
    secure: "Ապահով վճարում",
  },
  stepperLabel: "Գրանցման քայլեր", // written for this build
  steps: [
    { label: "Հաշիվ", hint: "էլ. փոստ և գաղտնաբառ" },
    { label: "Համաձայնագիր", hint: "ռիսկի ընդունում" },
    { label: "Առողջություն", hint: "ոչ պարտադիր հիմա" },
    { label: "Կապ", hint: "արտակարգ դեպքի համար" },
  ],
  stepOfTotal: (step: number, total: number) => `Քայլ ${step} / ${total}`,
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
} as const;
