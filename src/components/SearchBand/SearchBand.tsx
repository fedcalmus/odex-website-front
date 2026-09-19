import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./SearchBand.module.scss";

export interface SearchBandSegment {
  /** Query-string parameter this segment submits. */
  name: string;
  /** Caps label above the value: "ՈՒՂՂՈՒԹՅՈՒՆ". */
  label: string;
  /** The pre-selected option's `value`. Defaults are meaningful, not empty. */
  defaultValue: string;
  options: Array<{ value: string; label: string }>;
}

export interface SearchBandProps {
  /** Discovery page the form submits to (GET). */
  action: string;
  segments: SearchBandSegment[];
  submitLabel: string;
  /**
   * Parameters carried through unchanged — filters that aren't segments of the
   * band (region, price, sort…), so searching from the band doesn't silently drop them.
   */
  hidden?: Array<[name: string, value: string]>;
  /** Accessible name of the search landmark. */
  label: string;
  className?: string;
}

/**
 * The homepage's primary action (Figma "Search band" 67:898): the entry point
 * to discovery. Each segment is LABEL-OVER-VALUE, never a bare placeholder —
 * "ՈՒՂՂՈՒԹՅՈՒՆ" above "Բոլոր ուղղությունները" means the field describes itself
 * even when nothing is chosen. Defaults are meaningful ("this weekend" is
 * pre-selected: a pre-filled search that returns results beats an empty one).
 *
 * A plain `<form method="get">` over native `<select>`s: keyboard, screen
 * reader and mobile pickers work for free, and it submits without JS.
 */
export function SearchBand({ action, segments, submitLabel, hidden = [], label, className }: SearchBandProps) {
  return (
    <form role="search" aria-label={label} action={action} method="get" className={cx(styles.band, className)}>
      {segments.map((segment) => (
        <label key={segment.name} className={styles.segment}>
          <span className={styles.segmentLabel}>{segment.label}</span>
          <select name={segment.name} defaultValue={segment.defaultValue} className={styles.select}>
            {segment.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      ))}
      {hidden.map(([name, value], index) => (
        <input key={`${name}-${index}`} type="hidden" name={name} value={value} />
      ))}
      <button type="submit" className={styles.submit}>
        <Icon name="search" size={20} />
        <span>{submitLabel}</span>
      </button>
    </form>
  );
}
