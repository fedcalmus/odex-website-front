"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import styles from "./MobileMenu.module.scss";

export interface MobileMenuProps {
  /** Names both the hamburger and the drawer, e.g. "Մենյու". */
  menuLabel: string;
  closeLabel: string;
  /** The drawer's content — server-rendered by the caller (nav, auth, language). */
  children: ReactNode;
}

/**
 * The header below `xl`: a hamburger opening a right-hand drawer. Built on the
 * native `<dialog>` — modal focus trap, Escape to close and the inert
 * background come from the browser rather than hand-rolled JS.
 */
export function MobileMenu({ menuLabel, closeLabel, children }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-label={menuLabel}
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Icon name="menu" size={24} />
      </button>

      <dialog
        ref={dialogRef}
        className={styles.drawer}
        aria-label={menuLabel}
        // The dialog element itself only receives clicks on its backdrop.
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div
          className={styles.panel}
          // Navigating from inside the drawer closes it; the header persists across routes.
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) dialogRef.current?.close();
          }}
        >
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
    </>
  );
}
