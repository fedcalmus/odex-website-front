// MOCK signed-in user. There is no auth yet — checkout pretends the buyer is
// logged in so the "participant 1 comes from your profile" row has something to
// show, and the profile section (Figma "MP-09" family) pretends the same way.
// Replace with the session/profile API.
export const CURRENT_USER = {
  firstName: "Անուշ",
  lastName: "Օրինակյան",
  healthNote: "Ասթմա",
  emergencyName: "Արամ Օ.",
  emergencyPhone: "(091) 55-0022",
  // Profile-only fields below (Figma "Profile — MP-09").
  avatar: "/images/guides/guide-1.png",
  location: "Երևան",
  memberSinceYear: 2023,
  stats: {
    distanceKm: 248,
    ascentM: 14_200,
    completedCount: 22,
    badgeCount: 6,
  },
  social: {
    followers: 128,
    following: 74,
  },
} as const;
