// MOCK signed-in user. There is no auth yet — checkout pretends the buyer is
// logged in so the "participant 1 comes from your profile" row has something to
// show. Replace with the session/profile API.
export const CURRENT_USER = {
  firstName: "Անուշ",
  lastName: "Օրինակյան",
  healthNote: "Ասթմա",
  emergencyName: "Արամ Օ.",
  emergencyPhone: "(091) 55-0022",
} as const;
