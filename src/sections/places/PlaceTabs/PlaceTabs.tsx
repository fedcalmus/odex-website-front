import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./PlaceTabs.module.scss";

export type PlaceTab = "overview" | "events" | "photos" | "clubs";

export interface PlaceTabsCopy {
  label: string;
  overview: string;
  events: string;
  photos: string;
  clubs: string;
}

export interface PlaceTabsProps {
  slug: string;
  active: PlaceTab;
  counts: { events: number; photos: number; clubs: number };
  copy: PlaceTabsCopy;
}

/**
 * The Overview/Events/Photos/Clubs nav (Figma "Place detail · Events —
 * MP-34a" / "· Clubs — MP-34b"): real page links now that Events and Clubs
 * each have their own route, not in-page anchors. The active tab is white
 * with a lime underline; the rest stay muted — confirmed from the mock
 * (Photos has no dedicated page yet, so it still points at the
 * `/places/[slug]/photos` stub, consistent with the rest of this app's
 * stub-link convention).
 */
export function PlaceTabs({ slug, active, counts, copy }: PlaceTabsProps) {
  const tabs: Array<{ key: PlaceTab; href: string; label: string }> = [
    { key: "overview", href: `/places/${slug}`, label: copy.overview },
    { key: "events", href: `/places/${slug}/events`, label: `${copy.events} · ${counts.events}` },
    { key: "photos", href: `/places/${slug}/photos`, label: `${copy.photos} · ${counts.photos}` },
    { key: "clubs", href: `/places/${slug}/clubs`, label: `${copy.clubs} · ${counts.clubs}` },
  ];

  return (
    <nav aria-label={copy.label} className={styles.tabs}>
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          aria-current={tab.key === active ? "page" : undefined}
          className={cx(styles.tab, tab.key === active && styles.active)}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
