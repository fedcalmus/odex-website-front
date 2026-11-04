import Link from "next/link";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { StatusPage } from "@/components/StatusPage";
import { notFoundCopy as copy } from "@/content/errors";
import styles from "./NotFoundView.module.scss";

/**
 * 404 content (Figma "Not found — MP-42a"): headline + a real `<form
 * role="search">` to the events page (works without JS, same destination
 * pattern as the header's SearchField) + quick links back into the site.
 * Rendered by both `app/(site)/not-found.tsx` (in-segment `notFound()`
 * calls, wrapped by the site layout's Header/Footer) and the root
 * `app/not-found.tsx` (genuinely unmatched URLs, which compose their own
 * Header/Footer — see that file for why).
 */
export function NotFoundView() {
  return (
    <StatusPage code={copy.code} title={copy.title} description={copy.description}>
      <form role="search" action={copy.search.action} method="get" className={styles.searchForm}>
        <label className={styles.searchBox}>
          <span className="u-visually-hidden">{copy.search.label}</span>
          <Icon name="search" size={16} className={styles.searchIcon} />
          <input
            type="search"
            name="q"
            placeholder={copy.search.placeholder}
            autoComplete="off"
            className={styles.searchInput}
          />
        </label>
        <Button type="submit" size="medium">
          {copy.search.submit}
        </Button>
      </form>

      <nav aria-label={copy.quickLinksLabel} className={styles.quickLinks}>
        {copy.quickLinks.map((link) => (
          <Link key={link.href} href={link.href} className={styles.quickLink}>
            {link.label}
          </Link>
        ))}
      </nav>
    </StatusPage>
  );
}
