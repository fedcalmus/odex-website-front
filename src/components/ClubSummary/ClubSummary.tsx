import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./ClubSummary.module.scss";

export interface ClubSummaryProps {
  name: string;
  href: string;
  logo: ImageProps["src"];
  /** "18 միջոցառում · 4,9". */
  meta: string;
  /** Slot under the row — the follow button. */
  children?: ReactNode;
  className?: string;
}

/** The organiser card in the detail rail (Figma "Club"): logo, name, headline stats, then an action. */
export function ClubSummary({ name, href, logo, meta, children, className }: ClubSummaryProps) {
  return (
    <div className={cx(styles.club, className)}>
      <div className={styles.row}>
        <span className={styles.logo}>
          <Image src={logo} alt="" fill sizes="44px" className={styles.logoImage} />
        </span>
        <div className={styles.text}>
          <Link href={href} className={styles.name}>
            {name}
          </Link>
          <p className={styles.meta}>{meta}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
