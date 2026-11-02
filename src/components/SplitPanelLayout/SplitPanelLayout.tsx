import Image from "next/image";
import type { ImageProps } from "next/image";
import type { ReactNode } from "react";
import { FocusHeader } from "@/components/FocusHeader";
import { cx } from "@/lib/cx";
import styles from "./SplitPanelLayout.module.scss";

export interface SplitPanelLayoutProps {
  /** The form column. */
  children: ReactNode;
  /** Photograph in the right-hand panel — atmosphere only, hidden below lg. */
  image: ImageProps["src"];
  /** Back link in the header, e.g. `{ href: "/", label: "Հետ" }`. Omit for a checkout-style flow with no way back. */
  back?: { href: string; label: string };
  /**
   * Text next to the header's lock icon. Omit (or pass `""`) for an
   * icon-only mark — confirmed from the sign-up and club sign-up mocks,
   * neither of which shows text here, unlike login ("Անվտանգ մուտք") or the
   * profile-completion flow ("Ապահով վճարում"). This varies per screen, which is why
   * `FocusHeader` lives here instead of in the shared `(auth)` layout.
   */
  secureLabel?: string;
  /** Content pinned to the foot of the photo panel, above the scrim (the Waiver step's guide quote). */
  panelOverlay?: ReactNode;
  className?: string;
}

/**
 * The registration layout (Figma "Split"): the form on the left, a 520px photo
 * panel on the right. The panel is decoration, so it is `aria-hidden` and simply
 * not shown below lg — a phone gets the form alone.
 *
 * Also owns the `FocusHeader` and the page's `<main>` landmark — every screen
 * under `(auth)` uses this component, and each needs its own back link/secure
 * text, which a single shared layout-level header can't express.
 */
export function SplitPanelLayout({
  children,
  image,
  back,
  secureLabel,
  panelOverlay,
  className,
}: SplitPanelLayoutProps) {
  return (
    <>
      <FocusHeader back={back} secureLabel={secureLabel ?? ""} />
      <main id="main" className={styles.page}>
        <div className={cx(styles.split, className)}>
          <div className={styles.form}>{children}</div>
          <div className={styles.panel} aria-hidden="true">
            <Image src={image} alt="" fill sizes="520px" preload className={styles.image} />
            <span className={styles.scrim} />
            {panelOverlay ? <div className={styles.overlay}>{panelOverlay}</div> : null}
          </div>
        </div>
      </main>
    </>
  );
}
