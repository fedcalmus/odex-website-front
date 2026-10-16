import { FocusHeader } from "@/components/FocusHeader";
import { SkipLink } from "@/components/SkipLink";
import { authHeaderCopy } from "@/content/auth";
import { skipLinkLabel } from "@/content/site";
import styles from "./layout.module.scss";

// Account creation and sign-in: "the only screens that do not use the
// marketplace nav" (Figma). A stripped header, no footer — nothing to leave for.
export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SkipLink>{skipLinkLabel}</SkipLink>
      <FocusHeader back={{ href: "/", label: authHeaderCopy.back }} secureLabel={authHeaderCopy.secure} />
      <main id="main" className={styles.main}>
        {children}
      </main>
    </>
  );
}
