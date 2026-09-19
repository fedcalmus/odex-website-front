"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/cx";
import styles from "./NavLink.module.scss";

export interface NavItem {
  label: string;
  href: string;
  /**
   * Extra paths that light this item up without being "the current page".
   * The homepage IS the events marketplace, so `/` highlights Events.
   */
  alsoActiveOn?: string[];
}

export interface NavLinkProps extends NavItem {
  className?: string;
}

/**
 * A primary-navigation link. Active is lime and never underlined — on a dark
 * bar an underline is easy to miss. This is a client component only because
 * it reads the pathname; everything around it stays on the server.
 */
export function NavLink({ label, href, alsoActiveOn = [], className }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
  const isHighlighted = isCurrent || alsoActiveOn.includes(pathname);

  return (
    <Link
      href={href}
      // Only a real match is announced as the current page; `alsoActiveOn` is visual.
      aria-current={isCurrent ? "page" : undefined}
      className={cx(styles.link, isHighlighted && styles.active, className)}
    >
      {label}
    </Link>
  );
}
