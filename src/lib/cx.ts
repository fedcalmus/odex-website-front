/** Joins class names, skipping falsy entries — `cx(styles.a, isOn && styles.b, className)`. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
