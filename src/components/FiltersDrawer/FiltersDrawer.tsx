"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./FiltersDrawer.module.scss";

export interface FiltersDrawerProps {
  /** Label of the trigger and the sheet: "Զտիչներ". */
  label: string;
  closeLabel: string;
  /** Applied-filter count shown on the trigger — filters you can't see are filters you forget. */
  activeCount?: number;
  children: ReactNode;
  className?: string;
}

/**
 * Below `lg` the sidebar can't sit beside the results, so the filters move
 * into a bottom sheet behind a "Զտիչներ" button (Figma breakpoints: "filters
 * move to a bottom sheet"). Native `<dialog>`: focus trap, Escape and inert
 * background from the browser.
 */
export function FiltersDrawer({ label, closeLabel, activeCount = 0, children, className }: FiltersDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className={cx(styles.drawer, className)}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Icon name="sliders-horizontal" size={20} />
        {label}
        {activeCount > 0 ? <span className={styles.badge}>{activeCount}</span> : null}
      </button>

      <dialog
        ref={dialogRef}
        className={styles.sheet}
        aria-label={label}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className={styles.panel}>
          <button
            type="button"
            className={styles.close}
            aria-label={closeLabel}
            onClick={() => dialogRef.current?.close()}
          >
            <Icon name="x" size={24} />
          </button>
          {children}
        </div>
      </dialog>
    </div>
  );
}
