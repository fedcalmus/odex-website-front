import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { footer, header, skipLinkLabel } from "@/content/site";
import { QueryProvider } from "@/providers/QueryProvider";
import { NotFoundView } from "@/sections/errors/NotFoundView";
import styles from "./(site)/layout.module.scss";

export const metadata: Metadata = {
  title: "Էջը չի գտնվել",
};

/**
 * Stable since Next 13.3: the root `app/not-found.tsx` is what actually
 * renders for a genuinely unmatched URL (a typo, a dead link) — route
 * groups like `(site)` only apply to paths that resolve into them, so this
 * file does NOT get `(site)/layout.tsx`'s Header/Footer for free. It
 * mirrors that layout's exact composition instead of leaving the user on
 * Next's bare default 404.
 */
export default function RootNotFound() {
  return (
    <QueryProvider>
      <SkipLink>{skipLinkLabel}</SkipLink>
      <Header {...header} />
      <main id="main" className={styles.main}>
        <NotFoundView />
      </main>
      <Footer {...footer} />
    </QueryProvider>
  );
}
