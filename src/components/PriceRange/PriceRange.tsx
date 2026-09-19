"use client";

import { useId, useState } from "react";
import { cx } from "@/lib/cx";
import styles from "./PriceRange.module.scss";

export interface PriceRangeProps {
  /** Current cap. */
  value: number;
  min?: number;
  max: number;
  step?: number;
  /** Accessible name, e.g. "Գին". */
  label: string;
  /** Turns a value into the words shown and announced: "մինչև 25 000 ֏". */
  format: (value: number) => string;
  /** Fired once the user lets go / stops typing — not on every pixel of a drag. */
  onCommit: (value: number) => void;
  className?: string;
}

/**
 * A single-handle price cap (Figma "Price" 4px track, lime fill, 16px knob).
 * A real `<input type="range">`: arrow keys, Home/End, touch and screen
 * readers all work. While dragging only the label updates; the filter is
 * applied on release, so a drag doesn't fire a request per step.
 */
export function PriceRange({
  value,
  min = 0,
  max,
  step = 1,
  label,
  format,
  onCommit,
  className,
}: PriceRangeProps) {
  const [draft, setDraft] = useState<number | null>(null);
  const id = useId();
  const shown = draft ?? value;
  const percent = ((shown - min) / (max - min)) * 100;

  const commit = () => {
    if (draft !== null && draft !== value) onCommit(draft);
    setDraft(null);
  };

  return (
    <div className={cx(styles.range, className)}>
      <label htmlFor={id} className={styles.value}>
        <span className="u-visually-hidden">{label}: </span>
        {format(shown)}
      </label>
      <input
        id={id}
        type="range"
        className={styles.input}
        min={min}
        max={max}
        step={step}
        value={shown}
        aria-valuetext={format(shown)}
        style={{ "--fill": `${percent}%` } as React.CSSProperties}
        onChange={(event) => setDraft(Number(event.target.value))}
        onPointerUp={commit}
        onKeyUp={commit}
        onBlur={commit}
      />
    </div>
  );
}
