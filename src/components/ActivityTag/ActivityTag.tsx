import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./ActivityTag.module.scss";

export interface ActivityTagProps {
  label: string;
  /** The activity's glyph. Omit for a group that has none yet (caving) — the tag is label-only. */
  icon?: IconName;
  className?: string;
}

/**
 * An activity CATEGORY, not a status and not a user choice (Figma "Activity
 * tag", Neutral): surface/3 pill with the group's glyph. For a removable
 * selection use a filter chip; for a state use a badge.
 */
export function ActivityTag({ label, icon, className }: ActivityTagProps) {
  return (
    <span className={cx(styles.tag, !icon && styles.plain, className)}>
      {icon ? <Icon name={icon} size={16} /> : null}
      {label}
    </span>
  );
}
