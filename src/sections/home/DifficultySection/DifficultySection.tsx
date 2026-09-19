import { CardGrid } from "@/components/CardGrid";
import { DifficultyExplainerCard } from "@/components/DifficultyExplainerCard";
import type { DifficultyExplainerCardProps } from "@/components/DifficultyExplainerCard";
import { Section } from "@/components/Section";
import type { SectionProps } from "@/components/Section";

export interface DifficultySectionProps {
  heading: SectionProps["heading"];
  levels: DifficultyExplainerCardProps[];
}

/**
 * "Բարդություն" — teaches the four-step difficulty scale once, in plain
 * language, before anyone books. The chips on event cards mean nothing until
 * the visitor has seen this. Last section, so it carries the larger bottom pad.
 */
export function DifficultySection({ heading, levels }: DifficultySectionProps) {
  return (
    <Section heading={heading} paddingBottom="large">
      <CardGrid columns={4}>
        {levels.map((level) => (
          <li key={level.level}>
            <DifficultyExplainerCard {...level} />
          </li>
        ))}
      </CardGrid>
    </Section>
  );
}
