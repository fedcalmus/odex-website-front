"use client";

import { useQuery } from "@tanstack/react-query";
import { latestClubsQuery } from "@/api/clubs";
import type { LatestClubs } from "@/api/clubs";
import { CardGrid } from "@/components/CardGrid";
import { ClubCard } from "@/components/ClubCard";
import { Section } from "@/components/Section";
import type { SectionProps } from "@/components/Section";

export interface ClubsSectionProps {
  /** `title` may contain `{count}`, replaced with the number of verified clubs ("-" when unknown). */
  heading: Omit<SectionProps["heading"], "title"> & { title: string };
  /** Shown while the API has no clubs to return (failed, still loading, or empty). */
  fallback: LatestClubs;
}

/**
 * "Ակումբներ" — the four latest verified clubs. A client component only so
 * TanStack Query can own the data in the browser; on first load it renders
 * from the cache the server filled (see the homepage), so the cards are in the
 * HTML that crawlers get. No API clubs → the static `fallback`; nothing at all → no section.
 */
export function ClubsSection({ heading, fallback }: ClubsSectionProps) {
  const { data } = useQuery(latestClubsQuery);
  const view = data && data.clubs.length > 0 ? data : fallback;
  if (view.clubs.length === 0) return null;

  return (
    // This section uses 48px side padding in Figma; every other section uses 40.
    <Section heading={{ ...heading, title: heading.title.replace("{count}", String(view.total ?? "-")) }} gutter="wide">
      <CardGrid columns={4}>
        {view.clubs.map(({ id, ...club }) => (
          <li key={id}>
            <ClubCard {...club} />
          </li>
        ))}
      </CardGrid>
    </Section>
  );
}
