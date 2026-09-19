import type { ButtonHTMLAttributes } from "react";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./IconButton.module.scss";

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: IconName;
  /** Required: there is no visible text, so this IS the button's name. */
  label: string;
  /** Toggle state (favourite, follow). Adds `aria-pressed` and the lime pressed style. */
  pressed?: boolean;
}

/**
 * A 44px round icon button that sits over photography (Figma "heart" /
 * "share-2" on the event hero): dark glass at 72%, hairline rim. 44 is the
 * minimum touch target — never smaller.
 */
export function IconButton({ icon, label, pressed, className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      className={cx(styles.button, pressed && styles.pressed, className)}
      {...rest}
    >
      <Icon name={pressed && icon === "heart" ? "heart-filled" : icon} size={20} />
    </button>
  );
}
