import type { WeatherCondition } from "@/components/WeatherPill";

export interface Region {
  slug: string;
  name: string;
  /** Today's forecast, cached per region per day (never per card render). Absent = pill hidden. */
  forecast?: { condition: WeatherCondition; temperature: number; conditionLabel: string };
}

// MOCK forecasts, copied from the discovery "Conditions" strip. The two regions
// without one (Ararat, Vayots Dzor) simply don't show a weather pill or a
// strip cell.
export const REGIONS: readonly Region[] = [
  { slug: "yerevan", name: "Երևան" },
  { slug: "aragatsotn", name: "Արագածոտն", forecast: { condition: "clear", temperature: 6, conditionLabel: "Պարզ" } },
  { slug: "syunik", name: "Սյունիք", forecast: { condition: "cloud", temperature: 2, conditionLabel: "Ամպամած" } },
  { slug: "tavush", name: "Տավուշ", forecast: { condition: "rain", temperature: 11, conditionLabel: "Անձրև" } },
  { slug: "gegharkunik", name: "Գեղարքունիք", forecast: { condition: "wind", temperature: 8, conditionLabel: "Քամոտ" } },
  { slug: "kotayk", name: "Կոտայք", forecast: { condition: "snow", temperature: 4, conditionLabel: "Ձյուն" } },
  { slug: "ararat", name: "Արարատ" },
  { slug: "vayots-dzor", name: "Վայոց ձոր" },
];

export function getRegion(slug: string): Region | undefined {
  return REGIONS.find((region) => region.slug === slug);
}
