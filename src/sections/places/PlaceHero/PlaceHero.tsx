"use client";

import Image from "next/image";
import { FollowButton } from "@/components/FollowButton";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { shareCurrentPage } from "@/lib/share";
import styles from "./PlaceHero.module.scss";

export interface PlaceHeroFact {
  icon: IconName;
  /** Accessible label — the row shows only the icon + value visually (Figma), so this backs an `aria-label`. */
  label: string;
  value: string;
}

export interface PlaceHeroLabels {
  follow: string;
  following: string;
  share: string;
  addPhoto: string;
}

export interface PlaceHeroProps {
  title: string;
  image: string;
  facts: PlaceHeroFact[];
  labels: PlaceHeroLabels;
}

/**
 * Place-detail hero (Figma "Place detail — MP-34"): photo with just the
 * title overlaid — breadcrumb lives on the page above it, unlike
 * EventHero, which folds the breadcrumb into the photo itself. The
 * fact row and actions sit below the photo on the plain page ground.
 */
export function PlaceHero({ title, image, facts, labels }: PlaceHeroProps) {
  return (
    <>
      <section className={styles.hero} aria-labelledby="place-title">
        <Image src={image} alt="" fill preload sizes="100vw" className={styles.image} />
        <div className={styles.scrim} aria-hidden="true" />
        <h1 id="place-title" className={styles.title}>
          {title}
        </h1>
      </section>

      <div className={styles.meta}>
        <ul role="list" className={styles.facts}>
          {facts.map((fact) => (
            <li key={fact.label} aria-label={`${fact.label}՝ ${fact.value}`} className={styles.fact}>
              <Icon name={fact.icon} size={16} aria-hidden="true" className={styles.factIcon} />
              <span aria-hidden="true">{fact.value}</span>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <FollowButton label={labels.follow} followingLabel={labels.following} className={styles.follow} />
          <IconButton icon="share-2" label={labels.share} onClick={() => shareCurrentPage(title)} />
          {/* No photo-upload flow exists anywhere in this app yet — kept visible to
              match the mock, but honestly disabled rather than wired to nothing. */}
          <button type="button" disabled className={styles.addPhoto}>
            <Icon name="camera" size={16} />
            {labels.addPhoto}
          </button>
        </div>
      </div>
    </>
  );
}
