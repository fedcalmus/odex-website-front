"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./HoldCountdown.module.scss";

export interface HoldCountdownProps {
  /** ISO 8601 moment the held places go back to the pool. */
  endsAt: string;
  /** Accessible name: "Տեղերը պահվում են". */
  label: string;
  className?: string;
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}
const getSecond = (): number | null => Math.floor(Date.now() / 1000);
// The server can't know "now" for the visitor: placeholders until hydration, never a mismatch.
const getServerSecond = (): number | null => null;

/**
 * The 15-minute capacity hold made visible (Figma "Countdown" in the order
 * summary): a clock and "14:32". THE COUNTDOWN IS THE COMPONENT — without it
 * nobody knows a place can expire. Mono digits (Text/Mono) so the width doesn't
 * jump as they tick. It clamps at 00:00; what happens then (re-check
 * availability, not a failure page) is the caller's job.
 */
export function HoldCountdown({ endsAt, label, className }: HoldCountdownProps) {
  const now = useSyncExternalStore(subscribe, getSecond, getServerSecond);
  const remaining = now === null ? null : Math.max(Math.floor(new Date(endsAt).getTime() / 1000) - now, 0);
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <p role="timer" aria-label={label} className={cx(styles.countdown, className)}>
      <Icon name="clock" size={16} />
      <span className={styles.digits}>
        {remaining === null ? "––:––" : `${pad(Math.floor(remaining / 60))}:${pad(remaining % 60)}`}
      </span>
    </p>
  );
}
