import { Icon } from "@/components/Icon";
import { Notice } from "@/components/Notice";
import { RailBlock } from "@/components/RailBlock";
import type { PlaceRecord } from "@/data/places";
import styles from "./PlaceSidebar.module.scss";

export interface PlaceSidebarCopy {
  infoTitle: string;
  weatherUpdated: string;
  mapLabel: string;
  mapAction: string;
  followNotice: string;
}

/**
 * "ՏԵՂԵԿԱՆՔ" info box + weather + map + follow notice (Figma "Place
 * detail — MP-34"): identical across the Overview, Events and Clubs
 * pages for a place, factored out once rather than copy-pasted three times.
 */
export function PlaceSidebar({ place, copy }: { place: PlaceRecord; copy: PlaceSidebarCopy }) {
  const googleMapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`;

  return (
    <aside className={styles.rail}>
      <RailBlock title={copy.infoTitle}>
        <dl className={styles.info}>
          {place.infoRows.map((row) => (
            <div key={row.label} className={styles.infoRow}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </RailBlock>

      {place.weather ? (
        <div className={styles.weatherBox}>
          <p className={styles.weatherTemp}>
            +{place.weather.temperature}° · {place.weather.note}
          </p>
          <p className={styles.weatherUpdated}>{copy.weatherUpdated}</p>
        </div>
      ) : null}

      <a href={googleMapsHref} target="_blank" rel="noreferrer" className={styles.mapBox}>
        <Icon name="map-pin" size={20} />
        <span>
          {copy.mapLabel} · <span className={styles.mapAction}>{copy.mapAction}</span>
        </span>
      </a>

      <Notice tone="info" icon="bell">
        {copy.followNotice}
      </Notice>
    </aside>
  );
}
