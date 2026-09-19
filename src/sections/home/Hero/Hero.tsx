import Image from "next/image";
import type { ImageProps } from "next/image";
import { ButtonLink } from "@/components/Button";
import { FeaturedEventCard } from "@/components/FeaturedEventCard";
import type { FeaturedEventCardProps } from "@/components/FeaturedEventCard";
import { LiveStatusPanel } from "@/components/LiveStatusPanel";
import type { LiveStatusPanelProps } from "@/components/LiveStatusPanel";
import { VideoLink } from "@/components/VideoLink";
import type { VideoLinkProps } from "@/components/VideoLink";
import styles from "./Hero.module.scss";

export interface HeroProps {
  image: ImageProps["src"];
  eyebrow: string;
  /** The headline split where the design breaks it. The breaks apply from xl up; below that it flows. */
  headlineLines: string[];
  lead: string;
  cta: { label: string; href: string };
  video: VideoLinkProps;
  liveStatus: LiveStatusPanelProps;
  featuredEvent: FeaturedEventCardProps;
}

/**
 * Homepage hero (Figma "Hero" 194:16214): full-bleed mountain photograph under
 * a sideways scrim, the pitch on the left, and two glass panels on the right
 * making the product's argument — right now groups are on a mountain, and the
 * next departure is counting down.
 *
 * The one `<h1>` on the page. The photo is the LCP element, so it's preloaded.
 */
export function Hero({
  image,
  eyebrow,
  headlineLines,
  lead,
  cta,
  video,
  liveStatus,
  featuredEvent,
}: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className={styles.hero}>
      {/* Decorative: the headline carries the message. */}
      <Image src={image} alt="" fill preload sizes="100vw" className={styles.image} />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {headlineLines.map((line, index) => (
              <span key={line} className={styles.line}>
                {index > 0 ? " " : null}
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.lead}>{lead}</p>
          <div className={styles.actions}>
            <ButtonLink href={cta.href} size="large" icon="arrow-right">
              {cta.label}
            </ButtonLink>
            <VideoLink {...video} />
          </div>
        </div>

        <div className={styles.panels}>
          <LiveStatusPanel {...liveStatus} />
          <FeaturedEventCard {...featuredEvent} />
        </div>
      </div>
    </section>
  );
}
