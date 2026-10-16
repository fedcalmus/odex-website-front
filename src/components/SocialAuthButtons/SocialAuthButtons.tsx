import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./SocialAuthButtons.module.scss";

export interface SocialAuthButtonsProps {
  /** "Շարունակել Google-ով" */
  googleLabel: string;
  /** "Շարունակել Apple-ով" */
  appleLabel: string;
  /** "կամ էլ. փոստով" — the divider rendered directly below the two buttons. */
  dividerLabel: string;
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
  className?: string;
}

// The official Google "G" mark is brand-coloured, not themeable via
// currentColor like the mono icon sprite — inlined here instead of going
// through the icon build, which only handles single-colour glyphs.
function GoogleGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true" className={styles.glyph}>
      <path
        fill="#4285F4"
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8445c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.8741 2.6836-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.8591-3.0477.8591-2.3441 0-4.3282-1.5831-5.0364-3.7104H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.9636 10.71c-.18-.54-.2823-1.1168-.2823-1.71s.1023-1.17.2823-1.71V4.9582H.9573C.3477 6.1732 0 7.5477 0 9s.3477 2.8268.9573 4.0418L3.9636 10.71z"
      />
      <path
        fill="#EA4335"
        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.9636 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"
      />
    </svg>
  );
}

// No OAuth provider is wired up yet (no backend) — these stay inert by
// default, same as the rest of the app's auth forms, until there's something
// to call. `onGoogleClick`/`onAppleClick` are there for whoever wires it up.
/**
 * Google/Apple sign-in entry points, plus the "or by email" divider — the two
 * always appear together on the sign-up and sign-in screens (Figma
 * "Sign up — MP-11a", "Login — MP-13").
 */
export function SocialAuthButtons({
  googleLabel,
  appleLabel,
  dividerLabel,
  onGoogleClick,
  onAppleClick,
  className,
}: SocialAuthButtonsProps) {
  return (
    <div className={cx(styles.wrap, className)}>
      <div className={styles.providers}>
        <button type="button" className={styles.providerButton} onClick={onGoogleClick}>
          <GoogleGlyph />
          <span>{googleLabel}</span>
        </button>
        <button type="button" className={styles.providerButton} onClick={onAppleClick}>
          <Icon name="apple" size={20} />
          <span>{appleLabel}</span>
        </button>
      </div>

      <div className={styles.divider}>
        <span>{dividerLabel}</span>
      </div>
    </div>
  );
}
