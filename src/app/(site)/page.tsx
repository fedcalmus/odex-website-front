import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { EMPTY, latestClubsQuery, toLatestClubs } from "@/api/clubs";
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
import { makeQueryClient } from "@/lib/query-client";
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

export default async function HomePage() {
  // Fetch the latest clubs on the server so they're in the HTML crawlers see,
  // then hand the same cache to the client (ClubsSection's useQuery picks it
  // up without a second request). prefetchQuery never throws: if the API is
  // down the page still renders, and the browser tries again.
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(latestClubsQuery);
  const latestClubs = queryClient.getQueryData(latestClubsQuery.queryKey);
  const shownClubs = latestClubs && latestClubs.results.length > 0 ? toLatestClubs(latestClubs) : clubs.fallback;
  const clubLinks = shownClubs.clubs.filter((club) => club.name !== EMPTY);

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
          ...(clubLinks.length > 0
            ? [itemListJsonLd(clubs.listName, clubLinks.map((club) => ({ name: club.name, href: club.href })))]
            : []),
        ]}
      />
      <Hero {...hero} />
      <SearchBandSection {...searchBand} />
      <ActivitiesSection heading={activities.heading} activities={activities.items} />
      <ThisWeekendSection heading={thisWeekend.heading} events={thisWeekend.events} />
      <GuideSection heading={guide.heading} rowLabels={guide.rowLabels} rows={[guide.rows[0], guide.rows[1]]} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClubsSection heading={clubs.heading} fallback={clubs.fallback} />
      </HydrationBoundary>
      <DifficultySection heading={difficulty.heading} levels={difficulty.levels} />
    </>
  );
}
