"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { cx } from "@/lib/cx";
import styles from "./FollowButton.module.scss";

export interface FollowButtonProps {
  /** Label while not following: "Հետևել". */
  label: string;
  /** Label while following. */
  followingLabel: string;
  defaultFollowing?: boolean;
  /** Called with the new state — persist it (requires an account). */
  onChange?: (following: boolean) => void;
  className?: string;
}

/**
 * Follow a club (Figma "Follow button" 27:...): full-width, 40px, outlined.
 * A toggle (`aria-pressed`), not a link. Persisting the choice needs auth —
 * until that exists, the state is local to the page.
 */
export function FollowButton({
  label,
  followingLabel,
  defaultFollowing = false,
  onChange,
  className,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(defaultFollowing);

  return (
    <button
      type="button"
      aria-pressed={following}
      className={cx(styles.button, following && styles.following, className)}
      onClick={() => {
        setFollowing(!following);
        onChange?.(!following);
      }}
    >
      <Icon name={following ? "check" : "plus"} size={16} />
      <span>{following ? followingLabel : label}</span>
    </button>
  );
}
