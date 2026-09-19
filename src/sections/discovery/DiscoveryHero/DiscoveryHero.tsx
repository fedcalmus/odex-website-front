import Image from "next/image";
import type { ImageProps } from "next/image";
import { RegionConditions } from "@/components/RegionConditions";
import type { RegionConditionsProps } from "@/components/RegionConditions";
import styles from "./DiscoveryHero.module.scss";

export interface DiscoveryHeroProps {
  image: ImageProps["src"];
  title: string;
  lead: string;
  conditions: RegionConditionsProps;
}

/**
 * Discovery hero banner (Figma "Hero banner" 194:16875): the page's <h1>, a
 * one-line summary of what's on this week, and today's conditions per region.
 * The scrim fades into the page ground, so the banner melts into the list
 * beneath it instead of ending on a hard edge.
 */
export function DiscoveryHero({ image, title, lead, conditions }: DiscoveryHeroProps) {
  return (
    <section aria-labelledby="discovery-title" className={styles.hero}>
      {/* Decorative: the headline carries the message. */}
      <Image src={image} alt="" fill preload sizes="100vw" className={styles.image} />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 id="discovery-title" className={styles.title}>
            {title}
          </h1>
          <p className={styles.lead}>{lead}</p>
        </div>
        <RegionConditions {...conditions} />
      </div>
    </section>
  );
}
