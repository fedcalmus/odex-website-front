"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { StatusPage } from "@/components/StatusPage";
import { errorPageCopy as copy } from "@/content/errors";
import styles from "./ErrorView.module.scss";

export interface ErrorViewProps {
  error: Error & { digest?: string };
  /** Re-fetches and re-renders the failed segment (Next 16.3's `error.js` `retry` prop). */
  retry: () => void;
}

/**
 * Runtime error boundary content. No Figma frame exists for this one — it
 * reuses the 404 page's StatusPage shell for visual consistency, with a
 * warning glyph standing in for a 404-style numeral (there's no accurate
 * HTTP code to show for a client-side render crash) and retry/home actions
 * instead of a search box.
 */
export function ErrorView({ error, retry }: ErrorViewProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      code={<Icon name="alert-triangle" size={88} className={styles.icon} />}
      title={copy.title}
      description={copy.description}
    >
      <div className={styles.actions}>
        <Button type="button" size="medium" onClick={retry}>
          {copy.retry}
        </Button>
        <Link href="/" className={styles.homeLink}>
          {copy.home}
        </Link>
      </div>
    </StatusPage>
  );
}
