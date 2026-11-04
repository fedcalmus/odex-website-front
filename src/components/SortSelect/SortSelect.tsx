import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./SortSelect.module.scss";

export interface SortSelectOption {
  value: string;
  label: string;
  /** Muted caption under the label — omit for a plain label-only row. */
  description?: string;
  /** Omit when no icon in the set actually fits the option; a blank-icon row reads worse than none. */
  icon?: IconName;
}

export interface SortSelectProps {
  /** Page the sort applies to, e.g. "/events" or "/clubs". */
  pathname: string;
  /** The current query string (no leading "?") — sorting keeps every other parameter. */
  query: string;
  /** Query parameter the choice is written to. */
  name?: string;
  /** The option that is the default; it is left OUT of the URL so equivalent states share one address. */
  defaultValue: string;
  /** Current choice. */
  value: string;
  options: readonly SortSelectOption[];
  /** "Դասավորել՝" */
  label: string;
  className?: string;
}

function sortHref(pathname: string, query: string, name: string, value: string, defaultValue: string): string {
  const search = new URLSearchParams(query);
  if (value === defaultValue) search.delete(name);
  else search.set(name, value);
  const next = search.toString();
  return next ? `${pathname}?${next}` : pathname;
}

/**
 * Sort control (Figma "Sort control"): a 48px pill that opens a custom
 * panel — icon, label and a muted description per option, the current one
 * highlighted lime with a check. A native `<details>`, the same
 * no-JS-required dropdown pattern already used by LanguageSwitcher's
 * "menu" variant, not a styled `<select>` (which can't skin its own
 * open/expanded panel at all). Each option is a real link that writes
 * `?sort=` to the URL, so choosing one is a normal navigation — the
 * `<details>` closes because the page re-renders, same trade-off
 * LanguageSwitcher already accepts: it does NOT close on an outside click
 * that doesn't choose anything.
 */
export function SortSelect({
  pathname,
  query,
  name = "sort",
  defaultValue,
  value,
  options,
  label,
  className,
}: SortSelectProps) {
  const active = options.find((option) => option.value === value) ?? options[0];

  return (
    // `key={value}`: choosing a sort option only changes the query string,
    // not the route, so Next.js re-renders this same <details> node rather
    // than remounting it — without the key, the native `open` state would
    // survive the click and the panel would stay open after selecting.
    // Keying it to the value forces a fresh, closed node each time.
    <details key={value} className={cx(styles.sort, className)}>
      <summary className={styles.trigger}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{active?.label}</span>
        <Icon name="chevron-down" size={16} className={styles.chevron} />
      </summary>

      <ul role="list" className={styles.panel}>
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <li key={option.value}>
              <Link
                href={sortHref(pathname, query, name, option.value, defaultValue)}
                scroll={false}
                aria-current={isActive ? "true" : undefined}
                className={cx(styles.option, isActive && styles.active)}
              >
                {option.icon ? <Icon name={option.icon} size={18} className={styles.optionIcon} /> : null}
                <span className={styles.optionText}>
                  <span className={styles.optionLabel}>{option.label}</span>
                  {option.description ? (
                    <span className={styles.optionDescription}>{option.description}</span>
                  ) : null}
                </span>
                {isActive ? <Icon name="check" size={18} className={styles.check} /> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
