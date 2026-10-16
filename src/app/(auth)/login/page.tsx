import type { Metadata } from "next";
import { SplitPanelLayout } from "@/components/SplitPanelLayout";
import { loginCopy as copy } from "@/content/auth";
import { LoginForm } from "@/sections/auth/Login";
import styles from "./page.module.scss";

// Account screens are not for search engines.
export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

// The Figma frame ("Login — MP-13") shows a live "4 groups finishing" stat
// card over the right-hand photo instead of a plain scrim. There's no live
// tracking/event data source in the app to back that with real numbers (the
// clubs/events APIs don't expose anything like it yet), so this reuses the
// same static photo panel as sign-up rather than faking the numbers.
export default function LoginPage() {
  return (
    <SplitPanelLayout image="/images/auth/register-panel.png">
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.title}</h1>
      </header>
      <LoginForm nextHref="/" />
    </SplitPanelLayout>
  );
}
