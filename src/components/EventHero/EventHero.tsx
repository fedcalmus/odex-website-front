"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import type { BreadcrumbItem } from "@/components/Breadcrumb";
import { DifficultyChip } from "@/components/DifficultyChip";
import type { DifficultyLevel } from "@/components/DifficultyChip";
import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { Rating } from "@/components/Rating";
import type { RatingProps } from "@/components/Rating";
import { WeatherPill } from "@/components/WeatherPill";
import type { WeatherPillProps } from "@/components/WeatherPill";
import { cx } from "@/lib/cx";
import { shareCurrentPage } from "@/lib/share";
import styles from "./EventHero.module.scss";

export interface EventHeroLabels {
  breadcrumb: string;
  favorite: string;
  share: string;
  /** "Լուսանկար" — the photo's number is appended. */
  photo: string;
  /** Opens the full gallery. */
  allPhotos: string;
  closeGallery: string;
  verifiedClub: string;
}

export interface EventHeroProps {
  title: string;
  breadcrumb: BreadcrumbItem[];
  /** Hero first, then the rest. One entry hides the gallery strip. */
  images: string[];
  /** How many photos the "+N" tile stands for (Figma: "+7"). Defaults to the images beyond the visible thumbnails. */
  moreCount?: number;
  weather?: Pick<WeatherPillProps, "condition" | "temperature" | "conditionLabel">;
  /** ISO start — the weather is for the departure day. */
  startsAt: string;
  difficulty: DifficultyLevel;
  club: { name: string; href: string; logo: string };
  rating?: Pick<RatingProps, "value" | "count">;
  labels: EventHeroLabels;
}

const THUMBS = 4;

/**
 * Event-detail hero (Figma "Hero" 194:17522): the photograph under a scrim,
 * weather top-left, favourite/share top-right, and at the foot the breadcrumb,
 * the title (the page's one <h1>), difficulty · club · rating — with the
 * gallery strip on the right.
 *
 * Client because the strip swaps the photo and favourite/share are toggles.
 * The first photo is server-rendered and preloaded (it is the LCP element).
 */
export function EventHero({
  title,
  breadcrumb,
  images,
  moreCount,
  weather,
  startsAt,
  difficulty,
  club,
  rating,
  labels,
}: EventHeroProps) {
  const [active, setActive] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const thumbs = images.slice(0, THUMBS);
  const hidden = moreCount ?? Math.max(images.length - THUMBS, 0);

  return (
    <section className={styles.hero} aria-labelledby="event-title">
      <Image
        key={images[active]}
        src={images[active]}
        alt=""
        fill
        preload={active === 0}
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.scrim} aria-hidden="true" />

      {weather ? <WeatherPill className={styles.weather} date={startsAt} {...weather} /> : null}

      <div className={styles.actions}>
        <IconButton
          icon="heart"
          label={labels.favorite}
          pressed={favorite}
          onClick={() => setFavorite(!favorite)}
        />
        <IconButton icon="share-2" label={labels.share} onClick={() => shareCurrentPage(title)} />
      </div>

      <div className={styles.foot}>
        <div className={styles.titleBlock}>
          <Breadcrumb items={breadcrumb} label={labels.breadcrumb} />
          <h1 id="event-title" className={styles.title}>
            {title}
          </h1>
          <div className={styles.meta}>
            <DifficultyChip level={difficulty} />
            <Link href={club.href} className={styles.club}>
              <span className={styles.logo}>
                <Image src={club.logo} alt="" fill sizes="28px" className={styles.logoImage} />
              </span>
              {club.name}
              <Icon name="shield-check" size={16} title={labels.verifiedClub} className={styles.verified} />
            </Link>
            {rating ? <Rating {...rating} className={styles.rating} /> : null}
          </div>
        </div>

        {images.length > 1 ? (
          <ul role="list" className={styles.gallery}>
            {thumbs.map((src, index) => (
              <li key={src}>
                <button
                  type="button"
                  aria-label={`${labels.photo} ${index + 1}`}
                  aria-pressed={active === index}
                  className={cx(styles.thumb, active === index && styles.thumbActive)}
                  onClick={() => setActive(index)}
                >
                  <Image src={src} alt="" fill sizes="84px" className={styles.thumbImage} />
                </button>
              </li>
            ))}
            {hidden > 0 ? (
              <li>
                <button
                  type="button"
                  aria-label={labels.allPhotos}
                  aria-haspopup="dialog"
                  className={cx(styles.thumb, styles.more)}
                  onClick={() => dialogRef.current?.showModal()}
                >
                  +{hidden}
                </button>
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={labels.allPhotos}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className={styles.dialogPanel}>
          <button
            type="button"
            className={styles.close}
            aria-label={labels.closeGallery}
            onClick={() => dialogRef.current?.close()}
          >
            <Icon name="x" size={24} />
          </button>
          <ul role="list" className={styles.grid}>
            {images.map((src, index) => (
              <li key={src}>
                <button
                  type="button"
                  aria-label={`${labels.photo} ${index + 1}`}
                  className={styles.gridItem}
                  onClick={() => {
                    setActive(index);
                    dialogRef.current?.close();
                  }}
                >
                  <Image src={src} alt="" fill sizes="(min-width: 768px) 320px, 45vw" className={styles.thumbImage} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </section>
  );
}
