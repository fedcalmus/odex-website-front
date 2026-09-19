import { CardGrid } from "@/components/CardGrid";
import { ClubCard } from "@/components/ClubCard";
import type { ClubCardProps } from "@/components/ClubCard";
import { Section } from "@/components/Section";
import type { SectionProps } from "@/components/Section";

export interface ClubsSectionProps {
  heading: SectionProps["heading"];
  /** Verified clubs only — an unverified club is never listed publicly. */
  clubs: Array<ClubCardProps & { id: string }>;
}

/** "Ակումբներ" — the verified clubs running events on the platform. */
export function ClubsSection({ heading, clubs }: ClubsSectionProps) {
  return (
    // This section uses 48px side padding in Figma; every other section uses 40.
    <Section heading={heading} gutter="wide">
      <CardGrid columns={4}>
        {clubs.map(({ id, ...club }) => (
          <li key={id}>
            <ClubCard {...club} />
          </li>
        ))}
      </CardGrid>
    </Section>
  );
}
