import { cx } from "@/lib/cx";
import styles from "./ChipToggleGroup.module.scss";

export interface ChipToggleOption {
  value: string;
  label: string;
}

export interface ChipToggleGroupProps {
  options: readonly ChipToggleOption[];
  value: string[];
  onChange: (next: string[]) => void;
  /** Accessible name for the group, e.g. "Ուղղություններ". */
  label: string;
  className?: string;
}

/**
 * Multi-select pill group (Figma "Club sign-up · 2 Club"): several chips can
 * be active at once, unlike `ChipFilterBar` (single-select, URL-driven,
 * renders `<Link>`s). This is in-form state — real toggle `<button>`s, same
 * inactive/active visual language as `ChipFilterBar` (chip fill + rim /
 * lime), reused rather than reinvented.
 */
export function ChipToggleGroup({ options, value, onChange, label, className }: ChipToggleGroupProps) {
  const toggle = (optionValue: string) => {
    onChange(value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue]);
  };

  return (
    <div role="group" aria-label={label} className={cx(styles.group, className)}>
      {options.map((option) => {
        const active = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            className={cx(styles.chip, active && styles.active)}
            onClick={() => toggle(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
