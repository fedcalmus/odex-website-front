import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { activities, clubs, difficulty, guide, hero, searchBand, thisWeekend } from "@/content/home";
import {
  ActivitiesSection,
  ClubsSection,
  DifficultySection,
  GuideSection,
  Hero,
  SearchBandSection,
  ThisWeekendSection,
} from "@/sections/home";
import { itemListJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

const TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

// The hero lead doubles as the meta description: it's the one sentence that
// says what the platform is.
export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: hero.lead,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "hy_AM",
    url: "/",
    title: TITLE,
    description: hero.lead,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          itemListJsonLd(
            thisWeekend.heading.title,
            thisWeekend.events.map((event) => ({ name: event.title, href: event.href })),
          ),
        ]}
      />
      <Hero {...hero} />
      <SearchBandSection {...searchBand} />
      <ActivitiesSection heading={activities.heading} activities={activities.items} />
      <ThisWeekendSection heading={thisWeekend.heading} events={thisWeekend.events} />
      <GuideSection heading={guide.heading} rowLabels={guide.rowLabels} rows={[guide.rows[0], guide.rows[1]]} />
      <ClubsSection heading={clubs.heading} clubs={clubs.items} />
      <DifficultySection heading={difficulty.heading} levels={difficulty.levels} />
    </>
  );
}
