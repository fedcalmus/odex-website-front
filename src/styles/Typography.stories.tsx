import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import styles from "./Typography.stories.module.scss";

// Documentation-only: renders the actual type scale from
// abstracts/_typography.scss (via the `text()` mixin, not duplicated
// numbers) against the Armenian samples from the Figma foundations export.
const meta = {
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const rows: { className: string; name: string; spec: string; sample: string }[] = [
  {
    className: styles.displayXl,
    name: "Display XL",
    spec: "64 / 104% / Medium — marketing only, homepage hero, one per page",
    sample: "Սար գնա նրանց հետ",
  },
  {
    className: styles.displayL,
    name: "Display L",
    spec: "48 / 110% / Medium — marketing only, web section titles",
    sample: "Ընտրիր ուղղությունը",
  },
  {
    className: styles.displayM,
    name: "Display M",
    spec: "36 / 118% / Medium — large stat figures, secondary marketing",
    sample: "֏2 480 000",
  },
  {
    className: styles.lead,
    name: "Lead",
    spec: "20 / 160% / Regular — marketing only, intro under a heading, never body",
    sample: "Ամրագրում, վճարում և մասնակիցների ցուցակ մեկ վահանակում։",
  },
  {
    className: styles.h1,
    name: "H1",
    spec: "24 / 125% / Medium — page titles, the admin ceiling",
    sample: "Ակումբի վահանակ",
  },
  {
    className: styles.h2,
    name: "H2",
    spec: "20 / 130% / Medium — section titles",
    sample: "Պահանջում է ուշադրություն",
  },
  {
    className: styles.h3,
    name: "H3",
    spec: "16 / 140% / Medium — card titles, panel headers",
    sample: "Խուստուփ՝ գագաթնակոհում",
  },
  {
    className: styles.body,
    name: "Body",
    spec: "15 / 155% / Regular — marketplace body copy",
    sample: "Ամրագրեք տեղը 12 ժամվա ընթացքում։",
  },
  {
    className: styles.bodySmall,
    name: "Body small",
    spec: "13 / 150% / Regular — admin body, dense UI, table cells",
    sample: "Սյունիք · 22 օգոստոսի · 06:00",
  },
  {
    className: styles.labelLarge,
    name: "Label large",
    spec: "15 / 140% / Medium — large buttons, 56px field targets",
    sample: "Սկանավորել QR",
  },
  {
    className: styles.label,
    name: "Label",
    spec: "13 / 140% / Medium — buttons, form labels, table headers",
    sample: "Ամրագրել",
  },
  {
    className: styles.caption,
    name: "Caption",
    spec: "11 / 140% / Regular — meta, timestamps, helper text",
    sample: "Ավելացվել է 2 օր առաջ",
  },
  {
    className: styles.captionStrong,
    name: "Caption strong",
    spec: "11 / 140% / Medium — micro labels",
    sample: "ԱՍԹՄԱ",
  },
  {
    className: styles.mono,
    name: "Mono",
    spec: "13 / 150% / Regular — booking codes, IBAN, coordinates",
    sample: "ODX-8841-20",
  },
];

export const Scale: Story = {
  render: () => (
    <div>
      {rows.map((row) => (
        <div
          key={row.name}
          style={{
            padding: "20px 0",
            borderBottom: "1px solid var(--color-border-default)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 8,
              alignItems: "baseline",
            }}
          >
            <span style={{ color: "var(--color-brand-primary)", fontSize: 12 }}>
              {row.name}
            </span>
            <span style={{ color: "var(--color-text-faint)", fontSize: 12 }}>
              {row.spec}
            </span>
          </div>
          <p className={row.className} style={{ color: "var(--color-text-primary)", margin: 0 }}>
            {row.sample}
          </p>
        </div>
      ))}
    </div>
  ),
};
