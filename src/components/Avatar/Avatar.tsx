import Image from "next/image";
import type { ImageProps } from "next/image";
import { cx } from "@/lib/cx";
import styles from "./Avatar.module.scss";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

const SIZE_PX: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 52, xl: 88 };
// Must match the `[data-tone]` selectors in Avatar.module.scss.
const TONE_COUNT = 3;

export interface AvatarProps {
  /** Full name — used for the accessible label and, without a photo, to derive initials + a stable colour. */
  name: string;
  /** Overrides the name-derived initials (rarely needed). */
  initials?: string;
  photo?: ImageProps["src"];
  size?: AvatarSize;
  className?: string;
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]);
  return letters.join("").toLocaleUpperCase("hy");
}

// Deterministic so the same person always gets the same colour across pages
// (the follow-requests row and the followers row show the same avatar).
function toneIndex(name: string): number {
  let sum = 0;
  for (let i = 0; i < name.length; i += 1) sum += name.charCodeAt(i);
  return sum % TONE_COUNT;
}

/**
 * A person's photo, or — for the many mock people who don't have one — a
 * colour-coded initials circle (Figma shows this throughout Follow
 * requests/My following: "ԱԳ", "ՏՊ", "ՆՍ" on tinted circles).
 */
export function Avatar({ name, initials, photo, size = "md", className }: AvatarProps) {
  const px = SIZE_PX[size];

  if (photo) {
    return (
      <span className={cx(styles.avatar, styles[size], className)} style={{ width: px, height: px }}>
        <Image src={photo} alt="" fill sizes={`${px}px`} className={styles.image} />
      </span>
    );
  }

  return (
    <span
      className={cx(styles.avatar, styles.initials, styles[size], className)}
      data-tone={toneIndex(name)}
      style={{ width: px, height: px }}
      role="img"
      aria-label={name}
    >
      {initials ?? initialsFromName(name)}
    </span>
  );
}
