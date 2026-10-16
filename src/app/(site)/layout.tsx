import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { footer, header, skipLinkLabel } from "@/content/site";
import { QueryProvider } from "@/providers/QueryProvider";
import styles from "./layout.module.scss";

// The public marketplace shell. A route group, so authenticated screens
// (account, checkout) can get their own chrome later without touching this.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <QueryProvider>
      <SkipLink>{skipLinkLabel}</SkipLink>
      <Header {...header} />
      <main id="main" className={styles.main}>
        {children}
      </main>
      <Footer {...footer} />
    </QueryProvider>
  );
}
