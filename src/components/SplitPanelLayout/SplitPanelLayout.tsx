import Image from "next/image";
import type { ImageProps } from "next/image";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./SplitPanelLayout.module.scss";

export interface SplitPanelLayoutProps {
  /** The form column. */
  children: ReactNode;
  /** Photograph in the right-hand panel — atmosphere only, hidden below lg. */
  image: ImageProps["src"];
  className?: string;
}

/**
 * The registration layout (Figma "Split"): the form on the left, a 520px photo
 * panel on the right. The panel is decoration, so it is `aria-hidden` and simply
 * not shown below lg — a phone gets the form alone.
 */
export function SplitPanelLayout({ children, image, className }: SplitPanelLayoutProps) {
  return (
    <div className={cx(styles.split, className)}>
      <div className={styles.form}>{children}</div>
      <div className={styles.panel} aria-hidden="true">
        <Image src={image} alt="" fill sizes="520px" preload className={styles.image} />
        <span className={styles.scrim} />
      </div>
    </div>
  );
}
