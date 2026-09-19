export type DifficultyLevel = "easy" | "moderate" | "hard" | "extreme";

export const DIFFICULTY_LEVELS: readonly DifficultyLevel[] = ["easy", "moderate", "hard", "extreme"];

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy: "Հեշտ",
  moderate: "Միջին",
  hard: "Դժվար",
  extreme: "Ծայրահեղ",
};

/**
 * The objective range behind each word (Figma: "Always shown beside the chip
 * on cards and in the explainer") — "Միջին" alone is subjective, the numbers
 * are not. Extreme is technical rather than a distance.
 */
export const DIFFICULTY_ANCHORS: Record<DifficultyLevel, string> = {
  easy: "մինչև 10 կմ · մինչև 400 մ",
  moderate: "10–16 կմ · 400–1 000 մ",
  hard: "16–24 կմ · 1 000–1 600 մ",
  extreme: "24+ կմ · տեխնիկական",
};

export function isDifficultyLevel(value: string): value is DifficultyLevel {
  return (DIFFICULTY_LEVELS as readonly string[]).includes(value);
}
