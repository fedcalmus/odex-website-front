import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import { CapacityBar } from "@/components/CapacityBar";
import { DifficultyChip } from "@/components/DifficultyChip";
import type { DifficultyLevel } from "@/components/DifficultyChip";
import { ScarcityBadge } from "@/components/ScarcityBadge";
import { WeatherPill } from "@/components/WeatherPill";
import type { WeatherCondition } from "@/components/WeatherPill";
import { getAvailability } from "@/lib/capacity";
import { cx } from "@/lib/cx";
import {
  formatDecimal,
  formatEventDate,
  formatEventTime,
  formatPrice,
} from "@/lib/format";
import styles from "./EventCard.module.scss";

// Route units for the Armenian UI — the same locale defaults the other
// components carry (ActivityTile's `countUnit`, DifficultyChip's labels).
const UNITS = { distance: "կմ", ascent: "մ վերելք", duration: "ժ" } as const;

export interface EventCardProps {
  title: string;
  /** Event detail page. The whole card is the link (stretched from the title). */
  href: string;
  /** Cover photo. */
  image: ImageProps["src"];
  club: { name: string; logo: ImageProps["src"] };
  /** ISO 8601 with offset, e.g. "2026-09-12T06:00:00+04:00". Shown in Yerevan time. */
  startsAt: string;
  route: { distanceKm: number; ascentM: number; durationHours: number };
  difficulty: {
    level: DifficultyLevel;
    /** The objective range that backs the word, e.g. "10–16 կմ · 1 000 մ". Always shown beside the chip. */
    anchor: string;
  };
  capacity: { taken: number; total: number };
  price: { amount: number; currency?: string };
  /** Omit when the forecast is unavailable — the pill hides rather than showing a guess. */
  weather?: { condition: WeatherCondition; temperature: number; conditionLabel: string };
  departsLabel?: string;
  soldOutLabel?: string;
  /** Suffix after the remaining count: "1 տեղ մնացել է". */
  placesLeftLabel?: string;
  sizes?: string;
  /**
   * Render as a plain summary, not a link. Used in the checkout rail, where every
   * link out is a lost booking — the card shows what you are buying, nothing more.
   */
  static?: boolean;
  className?: string;
}

/**
 * Event card (Figma 100:1154). Reading order answers "can I do this" before
 * "what does it cost": weather + scarcity over the photo → club → title →
 * when → route → difficulty with its anchor → capacity and price.
 * The club comes before the title on purpose: in a market where clubs run on
 * Instagram, the club is the trust signal a participant recognises first.
 */
export function EventCard({
  title,
  href,
  image,
  club,
  startsAt,
  route,
  difficulty,
  capacity,
  price,
  weather,
  departsLabel = "մեկնում",
  soldOutLabel = "Լրացված",
  placesLeftLabel = "տեղ մնացել է",
  sizes = "(min-width: 1200px) 440px, (min-width: 768px) 50vw, 100vw",
  static: isStatic,
  className,
}: EventCardProps) {
  const { remaining, soldOut, scarce } = getAvailability(capacity.taken, capacity.total);
  const routeLine = [
    `${formatDecimal(route.distanceKm)} ${UNITS.distance}`,
    `${formatDecimal(route.ascentM)} ${UNITS.ascent}`,
    `${formatDecimal(route.durationHours)} ${UNITS.duration}`,
  ].join(" · ");

  return (
    <article
      className={cx(styles.card, isStatic && styles.static, className)}
      data-state={soldOut ? "sold-out" : undefined}
    >
      <div className={styles.media}>
        {/* Decorative: the title below names the event. */}
        <Image src={image} alt="" fill sizes={sizes} className={styles.image} />
        {/* Mandatory: without it the pills fail contrast on roughly half of any real photo set. */}
        <span className={styles.scrim} aria-hidden="true" />
        {soldOut ? <span className={styles.dim} aria-hidden="true" /> : null}
        {weather ? (
          <WeatherPill
            className={styles.weather}
            condition={weather.condition}
            temperature={weather.temperature}
            conditionLabel={weather.conditionLabel}
            date={startsAt}
          />
        ) : null}
        {soldOut ? (
          <ScarcityBadge type="sold-out" className={styles.status}>
            {soldOutLabel}
          </ScarcityBadge>
        ) : scarce ? (
          <ScarcityBadge type="last-places" className={styles.status}>
            {`${remaining} ${placesLeftLabel}`}
          </ScarcityBadge>
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.club}>
          <span className={styles.logo}>
            <Image src={club.logo} alt="" fill sizes="24px" className={styles.logoImage} />
          </span>
          <span className={styles.clubName}>{club.name}</span>
        </div>
        <h3 className={styles.title}>
          {isStatic ? (
            title
          ) : (
            <Link href={href} className={styles.link}>
              {title}
            </Link>
          )}
        </h3>
        <p className={styles.when}>
          <time dateTime={startsAt}>
            {formatEventDate(startsAt)} · {departsLabel} {formatEventTime(startsAt)}
          </time>
        </p>
        <p className={styles.route}>{routeLine}</p>
        <div className={styles.difficulty}>
          <DifficultyChip level={difficulty.level} />
          <span className={styles.anchor}>{difficulty.anchor}</span>
        </div>
        <CapacityBar
          taken={capacity.taken}
          total={capacity.total}
          price={formatPrice(price.amount, price.currency)}
        />
      </div>
    </article>
  );
}
