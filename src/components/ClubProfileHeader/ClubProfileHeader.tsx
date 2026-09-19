import Image from "next/image";
import type { ImageProps } from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./ClubProfileHeader.module.scss";

export interface ClubProfileHeaderProps {
  name: string;
  cover: ImageProps["src"];
  logo: ImageProps["src"];
  /** Caps line under the name: "ԱՐՇԱՎ · ՄԱԳԼՑՈՒՄ · ԵՐԵՎԱՆ · 2019 ԹՎԱԿԱՆԻՑ". */
  classification: string;
  /** Accessible name of the shield. */
  verifiedLabel: string;
  /** Share + follow. */
  children?: ReactNode;
  className?: string;
}

/**
 * Club profile header (Figma "Cover" + "Identity" 199:…): a 300px cover that
 * fades into the page ground, then the round 112px logo, the club's name (the
 * page's one <h1>) with the verified shield, and its actions on the right.
 * The shield is the trust mechanic — every club shown here is verified.
 */
export function ClubProfileHeader({
  name,
  cover,
  logo,
  classification,
  verifiedLabel,
  children,
  className,
}: ClubProfileHeaderProps) {
  return (
    <header className={cx(styles.header, className)}>
      <div className={styles.cover}>
        {/* Decorative — the name below identifies the club. */}
        <Image src={cover} alt="" fill preload sizes="100vw" className={styles.coverImage} />
        <div className={styles.scrim} aria-hidden="true" />
      </div>
      <div className={styles.identity}>
        <span className={styles.logo}>
          <Image src={logo} alt="" fill sizes="112px" className={styles.logoImage} />
        </span>
        <div className={styles.text}>
          <h1 className={styles.name}>
            {name}
            <Icon name="shield-check" size={24} title={verifiedLabel} className={styles.shield} />
          </h1>
          <p className={styles.classification}>{classification}</p>
        </div>
        {children ? <div className={styles.actions}>{children}</div> : null}
      </div>
    </header>
  );
}
