import { cx } from "@/lib/cx";
import styles from "./ActivityBarChart.module.scss";

export interface ActivityBarChartDatum {
  label: string;
  count: number;
}

export interface ActivityBarChartProps {
  data: readonly ActivityBarChartDatum[];
  /** Accessible name — the chart has no visible <h*> of its own. */
  label: string;
  className?: string;
}

/**
 * The year's monthly activity (Figma "Սեզոնի գրանցամատյան"): plain CSS bars,
 * not a charting library — twelve static values don't need one. A `<table>`
 * in a visually-hidden wrapper carries the real data for assistive tech;
 * the bars themselves are `aria-hidden`.
 */
export function ActivityBarChart({ data, label, className }: ActivityBarChartProps) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <figure className={cx(styles.chart, className)} aria-label={label}>
      <div className={styles.bars} aria-hidden="true">
        {data.map((datum) => (
          <div key={datum.label} className={styles.column}>
            <div className={styles.track}>
              <div
                className={cx(styles.bar, datum.count === 0 && styles.empty)}
                style={{ height: `${Math.max((datum.count / max) * 100, datum.count > 0 ? 6 : 0)}%` }}
              />
            </div>
            <span className={styles.label}>{datum.label}</span>
          </div>
        ))}
      </div>
      <table className="u-visually-hidden">
        <caption>{label}</caption>
        <tbody>
          <tr>
            {data.map((datum) => (
              <td key={datum.label}>
                {datum.label}: {datum.count}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </figure>
  );
}
