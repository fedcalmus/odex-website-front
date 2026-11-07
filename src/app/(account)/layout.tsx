import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { headerUser } from "@/content/profile";
import { footer, header, skipLinkLabel } from "@/content/site";
import { QueryProvider } from "@/providers/QueryProvider";
import styles from "./layout.module.scss";

// The signed-in "My profile" section (Figma "MP-09" family): a separate
// route group, like (auth) and (checkout), because its header is a different
// variant of the marketplace nav — avatar + bell instead of Sign in/Sign up
// (Header's `user` prop) — rather than something the shared (site) shell can
// express. There is no real session yet; `headerUser` is the mock signed-in
// user (`CURRENT_USER`, data/user.ts) everywhere else in the app already
// pretends is logged in.
export default function AccountLayout({ children }: LayoutProps<"/">) {
  return (
    <QueryProvider>
      <SkipLink>{skipLinkLabel}</SkipLink>
      <Header {...header} user={headerUser} />
      <main id="main" className={styles.main}>
        {children}
      </main>
      <Footer {...footer} />
    </QueryProvider>
  );
}
