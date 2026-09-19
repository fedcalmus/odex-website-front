"use client";

import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

// Figma: "After roughly 80px of scroll".
const SCROLLED_AFTER = 80;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > SCROLLED_AFTER;
// The server can't know the scroll position; start "at rest" and correct on hydration.
const getServerScrolled = () => false;

export interface HeaderShellProps {
  className?: string;
  /** Added once the page has scrolled. */
  scrolledClassName?: string;
  children: ReactNode;
}

/**
 * The sticky `<header>` element. Split from `Header` so the one thing that
 * needs the browser (scroll position) is a tiny client component while the
 * whole nav around it stays server-rendered.
 */
export function HeaderShell({ className, scrolledClassName, children }: HeaderShellProps) {
  const scrolled = useSyncExternalStore(subscribe, getScrolled, getServerScrolled);
  return <header className={cx(className, scrolled && scrolledClassName)}>{children}</header>;
}
