"use client";

import { useState } from "react";
import { AchievementBadge } from "@/components/AchievementBadge";
import { badgeCategoryLabels } from "@/content/profile";
import type { AchievementBadge as AchievementBadgeRecord, BadgeCategory } from "@/data/social";
import { cx } from "@/lib/cx";
import styles from "./BadgesPanel.module.scss";

export interface BadgesPanelProps {
  badges: readonly AchievementBadgeRecord[];
  title: string;
  countLabel: string;
}

const CATEGORIES: readonly BadgeCategory[] = ["all", "peaks", "distance", "endurance"];

/**
 * The badge grid with its category filter (Figma "Profile — MP-09"): an
 * in-page toggle, not a route — a client island so category switching
 * doesn't need a navigation, while the rest of the profile page stays
 * server-rendered.
 */
export function BadgesPanel({ badges, title, countLabel }: BadgesPanelProps) {
  const [category, setCategory] = useState<BadgeCategory>("all");
  const visible = category === "all" ? badges : badges.filter((badge) => badge.category === category);

  return (
    <section className={styles.panel} aria-labelledby="badges-heading">
      <div className={styles.head}>
        <h2 id="badges-heading" className={styles.title}>
          {title}
        </h2>
        <span className={styles.count}>{countLabel}</span>
      </div>

      <div role="group" aria-label={title} className={styles.tabs}>
        {CATEGORIES.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={category === key}
            className={cx(styles.tab, category === key && styles.active)}
            onClick={() => setCategory(key)}
          >
            {badgeCategoryLabels[key]}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((badge) => (
          <AchievementBadge key={badge.id} icon={badge.icon} label={badge.label} progress={badge.progress} />
        ))}
      </div>
    </section>
  );
}
