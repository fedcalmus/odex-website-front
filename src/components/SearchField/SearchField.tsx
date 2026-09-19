import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./SearchField.module.scss";

export interface SearchFieldProps {
  /** Where the search goes — a plain GET form, so it works before (and without) JS. */
  action: string;
  /** Query-string parameter. */
  name?: string;
  placeholder: string;
  /** Accessible name — the placeholder disappears on input and isn't a label. */
  label: string;
  className?: string;
}

/**
 * The pill search field from the header (Figma "Search" 286:1658): 44px,
 * fully rounded, magnifier at the start. A real `<form role="search">` that
 * submits `?q=` to the events page, so search works without client JS.
 */
export function SearchField({ action, name = "q", placeholder, label, className }: SearchFieldProps) {
  return (
    <form role="search" action={action} method="get" className={cx(styles.form, className)}>
      <label className={styles.box}>
        <span className="u-visually-hidden">{label}</span>
        <Icon name="search" size={16} className={styles.icon} />
        <input
          type="search"
          name={name}
          placeholder={placeholder}
          autoComplete="off"
          className={styles.input}
        />
      </label>
    </form>
  );
}
