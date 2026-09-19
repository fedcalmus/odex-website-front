import type { HTMLAttributes } from "react";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import styles from "./DifficultyChip.module.scss";

export type DifficultyLevel = "easy" | "moderate" | "hard" | "extreme";

interface LevelConfig {
  /** Bar glyph with N of 4 bars filled — see src/icons/source/difficulty-bars-*.svg. */
  icon: IconName;
  /** Default label from the Figma chip; override with the `label` prop. */
  label: string;
  className: string;
}

const LEVELS: Record<DifficultyLevel, LevelConfig> = {
  easy: { icon: "difficulty-bars-1", label: "Հեշտ", className: styles.easy },
  moderate: { icon: "difficulty-bars-2", label: "Միջին", className: styles.moderate },
  hard: { icon: "difficulty-bars-3", label: "Դժվար", className: styles.hard },
  extreme: { icon: "difficulty-bars-4", label: "Ծայրահեղ", className: styles.extreme },
};

// The bar glyph is drawn on a 14px grid (four 2px bars + three 2px gaps), so
// rendering it at 14 keeps the bars exactly 2px wide as in Figma.
const GLYPH_SIZE = 14;

export interface DifficultyChipProps extends HTMLAttributes<HTMLSpanElement> {
  /** Picks the colour pair and how many glyph bars are filled. */
  level: DifficultyLevel;
  /** Overrides the default (Armenian) label, e.g. for another locale. */
  label?: string;
}

/**
 * Safety-critical: the glyph and the label are both always rendered, so the
 * level never depends on colour alone (colour-blind users, greyscale print).
 */
export function DifficultyChip({ level, label, className, ...rest }: DifficultyChipProps) {
  const config = LEVELS[level];
  const classes = [styles.chip, config.className, className].filter(Boolean).join(" ");

  return (
    <span className={classes} data-level={level} {...rest}>
      <Icon name={config.icon} size={GLYPH_SIZE} />
      <span>{label ?? config.label}</span>
    </span>
  );
}
