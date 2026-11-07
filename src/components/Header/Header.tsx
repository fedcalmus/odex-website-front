import Link from "next/link";
import type { ImageProps } from "next/image";
import { Avatar } from "@/components/Avatar";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { LocaleOption } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { NavLink } from "@/components/NavLink";
import type { NavItem } from "@/components/NavLink";
import { SearchField } from "@/components/SearchField";
import { Wordmark } from "@/components/Wordmark";
import { HeaderShell } from "./HeaderShell";
import styles from "./Header.module.scss";

export interface HeaderUser {
  name: string;
  avatar: ImageProps["src"];
  /** Where the avatar goes. */
  profileHref: string;
  notificationsHref: string;
  notificationsLabel: string;
}

export interface HeaderProps {
  nav: NavItem[];
  search: { action: string; placeholder: string; label: string };
  auth: {
    signIn: { label: string; href: string };
    signUp: { label: string; href: string };
  };
  locales: LocaleOption[];
  currentLocale: string;
  labels: {
    primaryNav: string;
    menu: string;
    closeMenu: string;
    language: string;
  };
  /**
   * Present → the signed-in variant (Figma "Profile — MP-09" header):
   * search collapses to an icon even at desktop width, and Sign in/Sign up
   * are replaced by a notifications bell and the account avatar.
   */
  user?: HeaderUser;
}

/**
 * Marketplace header (Figma "Marketplace nav" 286:1735), logged-out state:
 * wordmark, navigation, then — pushed to the right margin by a flexible
 * spacer — search, language, sign in, sign up. The app-download CTA lives in
 * the footer: with social sign-in an account holder can book in one tap.
 *
 * Sticky, and after ~80px of scroll it gains a bottom hairline (Figma
 * "Marketplace nav" · Scrolled): the bar is already solid at rest, so only the
 * rule appears.
 *
 * Below `xl` the bar collapses to wordmark + search icon + hamburger; nav,
 * auth and language move into the drawer.
 */
export function Header({ nav, search, auth, locales, currentLocale, labels, user }: HeaderProps) {
  const navLinks = nav.map((item) => (
    <li key={item.href}>
      <NavLink {...item} />
    </li>
  ));

  return (
    <HeaderShell className={styles.header} scrolledClassName={styles.scrolled}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand}>
          <Wordmark />
        </Link>

        <nav aria-label={labels.primaryNav} className={styles.nav}>
          <ul role="list" className={styles.navList}>
            {navLinks}
          </ul>
        </nav>

        <span className={styles.spacer} />

        {user ? (
          <Link href={search.action} aria-label={search.label} className={styles.iconLink}>
            <Icon name="search" size={20} />
          </Link>
        ) : (
          <SearchField className={styles.search} {...search} />
        )}
        <LanguageSwitcher
          variant="menu"
          locales={locales}
          current={currentLocale}
          label={labels.language}
          className={styles.language}
        />
        {user ? (
          <div className={styles.account}>
            <Link href={user.notificationsHref} aria-label={user.notificationsLabel} className={styles.iconLink}>
              <Icon name="bell" size={20} />
            </Link>
            <Link href={user.profileHref} className={styles.avatarLink}>
              <Avatar name={user.name} photo={user.avatar} size="sm" />
            </Link>
          </div>
        ) : (
          <div className={styles.auth}>
            <ButtonLink
              href={auth.signIn.href}
              variant="ghost"
              className={`${styles.authButton} ${styles.signIn}`}
            >
              {auth.signIn.label}
            </ButtonLink>
            <ButtonLink href={auth.signUp.href} className={`${styles.authButton} ${styles.signUp}`}>
              {auth.signUp.label}
            </ButtonLink>
          </div>
        )}

        {/* Below xl (logged-out only — the signed-in search icon above already covers every width): the search field folds into an icon that goes to the search page. */}
        {user ? null : (
          <Link href={search.action} className={styles.searchLink} aria-label={search.label}>
            <Icon name="search" size={20} />
          </Link>
        )}
        <div className={styles.menuTrigger}>
          <MobileMenu menuLabel={labels.menu} closeLabel={labels.closeMenu}>
            <nav aria-label={labels.primaryNav}>
              <ul role="list" className={styles.drawerNav}>
                {navLinks}
              </ul>
            </nav>
            <div className={styles.drawerAuth}>
              {user ? (
                <>
                  <ButtonLink href={user.profileHref} fullWidth>
                    {user.name}
                  </ButtonLink>
                  <ButtonLink href={user.notificationsHref} variant="secondary" icon="bell" fullWidth>
                    {user.notificationsLabel}
                  </ButtonLink>
                </>
              ) : (
                <>
                  <ButtonLink href={auth.signUp.href} fullWidth>
                    {auth.signUp.label}
                  </ButtonLink>
                  <ButtonLink href={auth.signIn.href} variant="secondary" fullWidth>
                    {auth.signIn.label}
                  </ButtonLink>
                </>
              )}
            </div>
            <LanguageSwitcher locales={locales} current={currentLocale} label={labels.language} />
          </MobileMenu>
        </div>
      </div>
    </HeaderShell>
  );
}
