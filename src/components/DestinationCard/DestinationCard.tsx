import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./DestinationCard.module.scss";

/**
 * What kind of entry this is. The UI carries it as the type label; it is also
 * exposed as `data-kind` so the chip colour can encode it later (see below).
 */
export type DestinationKind = "region" | "tip" | "community" | "season";

export interface DestinationCardProps {
  kind: DestinationKind;
  /** The place, in caps — "ԱՐԱԳԱԾՈՏՆ". Names WHERE. */
  place: string;
  /** What kind of entry it is — "Մարզ" / "Խորհուրդ" / "Համայնք". Without it a curated list reads as a region. */
  typeLabel: string;
  /** The editorial line that makes it worth tapping. */
  title: string;
  href: string;
  image: ImageProps["src"];
  sizes?: string;
  className?: string;
}

/**
 * Destination card (Figma "Region card" 72:909, renamed: it also holds tips,
 * communities and seasons). 282×152 in the Guide carousel. Three label layers,
 * each with its own job: place chip → entry type → editorial title.
 *
 * FIGMA NOTE: the component description says the chip colour encodes the kind
 * (brand = place, accent = tip, amber = seasonal), but every frame on the
 * approved homepage paints the chip white. Built as painted; `data-kind` is
 * the hook if the coloured version is wanted.
 */
export function DestinationCard({
  kind,
  place,
  typeLabel,
  title,
  href,
  image,
  sizes = "282px",
  className,
}: DestinationCardProps) {
  return (
    <article className={cx(styles.card, className)} data-kind={kind}>
      <Image src={image} alt="" fill sizes={sizes} className={styles.image} />
      {/* Heavier than the event card's scrim: the caption sits directly on the photo. */}
      <span className={styles.scrim} aria-hidden="true" />
      <span className={styles.chip}>{place}</span>
      <div className={styles.caption}>
        <p className={styles.type}>{typeLabel}</p>
        <h3 className={styles.title}>
          <Link href={href} className={styles.link}>
            {title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
