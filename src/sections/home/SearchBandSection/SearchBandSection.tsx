import { SearchBand } from "@/components/SearchBand";
import type { SearchBandProps } from "@/components/SearchBand";
import styles from "./SearchBandSection.module.scss";

/**
 * The search band placed on the homepage: pulled up so it straddles the hero
 * boundary — half over the photograph, half over the section below. The
 * overlap is what makes it read as the primary action rather than furniture.
 */
export function SearchBandSection(props: SearchBandProps) {
  return (
    <div className={styles.overlap}>
      <div className={styles.container}>
        <SearchBand {...props} />
      </div>
    </div>
  );
}
