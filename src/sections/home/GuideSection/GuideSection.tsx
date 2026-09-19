import { CarouselRow } from "@/components/CarouselRow";
import { DestinationCard } from "@/components/DestinationCard";
import type { DestinationCardProps } from "@/components/DestinationCard";
import { Section } from "@/components/Section";
import type { SectionProps } from "@/components/Section";
import styles from "./GuideSection.module.scss";

type GuideItem = DestinationCardProps & { id: string };

export interface GuideSectionProps {
  heading: SectionProps["heading"];
  /** Accessible names of the two rows. */
  rowLabels: readonly [string, string];
  rows: readonly [GuideItem[], GuideItem[]];
  /** `small` when the section follows a block that already has bottom padding (the event detail page). */
  paddingTop?: SectionProps["paddingTop"];
}

/**
 * "Ուղեցույց" — the Guide band: two stacked, staggered rows of destination
 * cards running edge to edge. The ONLY homepage section with no side padding
 * (the heading keeps it) — bleeding to the edge is what makes the clipped
 * cards read as intentional rather than as a layout bug.
 */
export function GuideSection({ heading, rowLabels, rows, paddingTop }: GuideSectionProps) {
  return (
    <Section heading={heading} bleed paddingTop={paddingTop}>
      <div className={styles.rows}>
        {rows.map((row, index) => (
          <CarouselRow
            key={rowLabels[index]}
            label={rowLabels[index]}
            variant={index === 0 ? "primary" : "staggered"}
          >
            {row.map(({ id, ...card }) => (
              <li key={id}>
                <DestinationCard {...card} />
              </li>
            ))}
          </CarouselRow>
        ))}
      </div>
    </Section>
  );
}
