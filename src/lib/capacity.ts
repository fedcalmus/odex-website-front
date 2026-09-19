/**
 * "Scarce" thresholds. One definition, because the capacity bar (turns
 * orange) and the scarcity badge (appears) must never disagree — Figma:
 * "the same threshold as the scarcity badge".
 */
export const SCARCE_RATIO = 0.9;
export const SCARCE_PLACES = 3;

export interface Availability {
  remaining: number;
  /** 0–1, clamped. */
  ratio: number;
  soldOut: boolean;
  /** Under the threshold — 3 places or fewer, or 90% full — but not sold out. */
  scarce: boolean;
}

export function getAvailability(taken: number, total: number): Availability {
  const remaining = Math.max(total - taken, 0);
  const ratio = total > 0 ? Math.min(taken / total, 1) : 0;
  const soldOut = total > 0 && remaining === 0;
  const scarce = !soldOut && (remaining <= SCARCE_PLACES || ratio >= SCARCE_RATIO);
  return { remaining, ratio, soldOut, scarce };
}
