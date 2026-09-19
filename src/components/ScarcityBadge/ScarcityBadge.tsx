import { Badge } from "@/components/Badge";

export type ScarcityBadgeType = "last-places" | "sold-out" | "new-club";

// Orange means "pay attention", lime means "action available" — so scarcity is
// orange, and the one lime badge (new club) is an invitation, not a warning.
//
// FIGMA CONFLICT, resolved toward accessibility: the frame paints the
// "Last places" label white on orange, which is 3.13:1 (fails). The design
// system's own token, brand/on-accent, is near-black on orange (6.17:1) — used here.
const TYPE_COLORS: Record<ScarcityBadgeType, { background: string; color: string }> = {
  "last-places": {
    background: "var(--color-brand-accent)",
    color: "var(--color-brand-on-accent)",
  },
  // Deliberately quiet: the card stays visible and swaps to the waitlist.
  "sold-out": {
    background: "var(--color-overlay-chip)",
    color: "var(--color-text-primary)",
  },
  "new-club": {
    background: "var(--color-brand-primary)",
    color: "var(--color-brand-on-primary)",
  },
};

export interface ScarcityBadgeProps {
  type: ScarcityBadgeType;
  /** Already-localised label, e.g. "1 տեղ մնացել է". */
  children: string;
  className?: string;
}

/** Status badge over card photography (Figma 63:764). Only shown under threshold. */
export function ScarcityBadge({ type, children, className }: ScarcityBadgeProps) {
  return (
    <Badge size="small" className={className} data-type={type} {...TYPE_COLORS[type]}>
      {children}
    </Badge>
  );
}
