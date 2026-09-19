import Image from "next/image";
import { DetailBlock } from "@/components/DetailBlock";
import { Icon } from "@/components/Icon";
import { RoutePoint } from "@/components/RoutePoint";
import type { RoutePointProps } from "@/components/RoutePoint";
import styles from "./RouteBlock.module.scss";

export interface RouteBlockProps {
  title: string;
  /** Stops in order. The first two are pinned on the map. */
  points: RoutePointProps[];
}

// Contour bands, top to bottom.
const CONTOURS = [0, 1, 2, 3, 4, 5, 6];

/**
 * "Հանդիպում և մեկնարկ" — where and when (Figma "Detail block · Route").
 *
 * The map is a STATIC ILLUSTRATION: the design itself notes the map provider
 * isn't decided. It is decorative (`aria-hidden`) — the stops are listed in
 * text beneath it, which is what carries the information. Swap the
 * illustration for the real map component once a provider is chosen.
 */
export function RouteBlock({ title, points }: RouteBlockProps) {
  return (
    <DetailBlock title={title}>
      <div className={styles.map} aria-hidden="true">
        {CONTOURS.map((band) => (
          <Image
            key={band}
            src="/images/map/contour.svg"
            alt=""
            width={880}
            height={37}
            unoptimized
            className={styles.contour}
            style={{ top: band * 37 }}
          />
        ))}
        <Image
          src="/images/map/transfer.svg"
          alt=""
          width={466}
          height={118}
          unoptimized
          className={styles.transfer}
        />
        <span className={`${styles.pin} ${styles.meetingPin}`}>
          <Icon name="map-pin" size={16} />
        </span>
        <span className={`${styles.pin} ${styles.departurePin}`}>
          <Icon name="mountain" size={16} />
        </span>
      </div>
      <ol role="list" className={styles.points}>
        {points.map((point) => (
          <li key={point.type}>
            <RoutePoint {...point} />
          </li>
        ))}
      </ol>
    </DetailBlock>
  );
}
