import { FocusHeader } from "@/components/FocusHeader";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { checkoutCopy } from "@/content/checkout";
import { currentLocale, footer, locales, skipLinkLabel } from "@/content/site";
import styles from "./layout.module.scss";

// Checkout: links and search are suppressed (every exit is a lost sale), but the
// wordmark, language and a secure mark stay so it doesn't read as phishing.
// Compact footer — a supply-side pitch would interrupt the task.
export default function CheckoutLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SkipLink>{skipLinkLabel}</SkipLink>
      <FocusHeader
        secureLabel={checkoutCopy.header.secure}
        language={{ locales, current: currentLocale, label: footer.languageLabel }}
      />
      <main id="main" className={styles.main}>
        {children}
      </main>
      <Footer {...footer} variant="compact" />
    </>
  );
}
