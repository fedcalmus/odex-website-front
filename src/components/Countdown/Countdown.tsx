"use client";

import { useSyncExternalStore } from "react";
import { cx } from "@/lib/cx";
import styles from "./Countdown.module.scss";

export interface CountdownProps {
  /** ISO 8601 moment being counted down to. */
  target: string;
  labels: { days: string; hours: string; minutes: string };
  className?: string;
}

// Ticks by the minute — the display has no seconds, so re-rendering every
// second would be wasted work. Polling every 15s keeps it within a few
// seconds of the minute rolling over.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}
const getMinute = (): number | null => Math.floor(Date.now() / 60_000);
// The server has no meaningful "now" for a visitor: render placeholders, then
// the real numbers after hydration — never a server/client mismatch.
const getServerMinute = (): number | null => null;

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Live countdown in the brand colour (Figma "Countdown" 71:913): days, hours,
 * minutes, 22px figures over 9px unit labels. It clamps at zero; the caller
 * swaps to the NEXT departure rather than ever showing 00 00 00 — a zeroed
 * countdown reads as broken.
 */
export function Countdown({ target, labels, className }: CountdownProps) {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);

  const totalMinutes =
    minute === null ? null : Math.max(Math.floor(new Date(target).getTime() / 60_000) - minute, 0);

  const units = [
    { label: labels.days, value: totalMinutes === null ? null : Math.floor(totalMinutes / 1440) },
    { label: labels.hours, value: totalMinutes === null ? null : Math.floor((totalMinutes % 1440) / 60) },
    { label: labels.minutes, value: totalMinutes === null ? null : totalMinutes % 60 },
  ];

  return (
    <div role="timer" className={cx(styles.countdown, className)}>
      {units.map((unit) => (
        <div key={unit.label} className={styles.unit}>
          <span className={styles.value}>{unit.value === null ? "––" : pad(unit.value)}</span>
          <span className={styles.label}>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
