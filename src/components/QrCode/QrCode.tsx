import { cx } from "@/lib/cx";
import styles from "./QrCode.module.scss";

export interface QrCodeProps {
  /** Seeds the pattern — the same value always draws the same code. Not a real scannable QR: there is no check-in backend yet. */
  value: string;
  size?: number;
  className?: string;
}

const GRID = 9;
// The three QR "finder" corners (top-left, top-right, bottom-left) are fixed —
// a real reader looks for these first, so a pattern without them wouldn't
// read as a QR code even decoratively.
const FINDER_CELLS = new Set<number>();
for (const [r0, c0] of [
  [0, 0],
  [0, GRID - 3],
  [GRID - 3, 0],
]) {
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const onRim = r === 0 || r === 2 || c === 0 || c === 2;
      if (onRim) FINDER_CELLS.add((r0 + r) * GRID + (c0 + c));
    }
  }
}

// Simple string hash → deterministic 0..1 per cell, no external dependency.
function cellOn(seed: string, index: number): boolean {
  let hash = 0;
  const key = `${seed}:${index}`;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % 100 < 46;
}

/**
 * A decorative ticket QR (Figma "Ticket — MP-05"): deterministic from
 * `value` so the same ticket always renders the same code, with the three
 * finder squares a real QR needs to read as one at a glance. There's no
 * check-in backend yet, so this doesn't decode to anything — purely visual.
 */
export function QrCode({ value, size = 160, className }: QrCodeProps) {
  const cell = size / GRID;
  const cells = Array.from({ length: GRID * GRID }, (_, index) => index);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cx(styles.qr, className)}
      role="img"
      aria-label="QR code"
    >
      <rect width={size} height={size} fill="#fff" />
      {cells.map((index) => {
        const isFinder = FINDER_CELLS.has(index);
        const on = isFinder || cellOn(value, index);
        if (!on) return null;
        const row = Math.floor(index / GRID);
        const col = index % GRID;
        return <rect key={index} x={col * cell} y={row * cell} width={cell} height={cell} fill="#0b1011" />;
      })}
    </svg>
  );
}
