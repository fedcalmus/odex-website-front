import type { IconName } from "@/components/Icon";

// The seven activity groups — ONE source of truth for the homepage tiles, the
// search-band options, the discovery filter panel and every `?activity=` link.
// `icon` is the group's sprite glyph. Caving has none yet (the icon set has 7
// activity glyphs, but none for caves) — its tag renders label-only.
export const ACTIVITIES = [
  { slug: "hiking", title: "Արշավ", image: "/images/activities/hiking.png", icon: "activity-hiking" },
  { slug: "climbing", title: "Ժայռամագլցում", image: "/images/activities/climbing.png", icon: "activity-climbing" },
  { slug: "cycling", title: "Հեծանիվ", image: "/images/activities/cycling.png", icon: "activity-cycling" },
  { slug: "water", title: "Ջրային", image: "/images/activities/water.png", icon: "activity-water" },
  { slug: "winter", title: "Ձմեռային", image: "/images/activities/winter.png", icon: "activity-ski" },
  { slug: "air", title: "Օդային", image: "/images/activities/air.png", icon: "activity-air" },
  { slug: "caving", title: "Քարանձավ", image: "/images/activities/caving.png", icon: undefined },
] as const satisfies ReadonlyArray<{ slug: string; title: string; image: string; icon: IconName | undefined }>;

export type ActivitySlug = (typeof ACTIVITIES)[number]["slug"];

export function getActivity(slug: string) {
  return ACTIVITIES.find((activity) => activity.slug === slug);
}
