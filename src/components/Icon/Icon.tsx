import type { SVGProps } from "react";
import type { IconName } from "./icon-names.generated";
import styles from "./Icon.module.scss";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name" | "color"> {
  /** Which icon to render — see icon-names.generated.ts for the full list. */
  name: IconName;
  /** Square size in px. All icons share one 24px viewBox, so this scales losslessly. */
  size?: number;
  /** Any valid CSS color. Falls back to the inherited `color` (currentColor) when omitted. */
  color?: string;
  /**
   * Accessible label. Pass this when the icon conveys meaning on its own
   * (e.g. a bare icon-button). Leave it out for purely decorative icons
   * sitting next to visible text — those are hidden from assistive tech.
   */
  title?: string;
}

export function Icon({
  name,
  size = 24,
  color,
  title,
  className,
  style,
  ...rest
}: IconProps) {
  const isDecorative = !title;

  return (
    <svg
      width={size}
      height={size}
      className={className ? `${styles.icon} ${className}` : styles.icon}
      style={color ? { color, ...style } : style}
      aria-hidden={isDecorative ? true : undefined}
      role={isDecorative ? undefined : "img"}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
  );
}
