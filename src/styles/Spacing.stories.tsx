import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// Documentation-only mirror of abstracts/_spacing.scss and _radius.scss —
// keep these px values in sync with those files if the scale changes.
const meta = {
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const spaceScale = [
  { token: "3xs", px: 2, note: "icon optical alignment" },
  { token: "2xs", px: 4, note: "label to value" },
  { token: "xs", px: 8, note: "inside a chip · icon to label" },
  { token: "sm", px: 12, note: "related controls in a row" },
  { token: "md", px: 16, note: "the default — card padding, list rows" },
  { token: "lg", px: 24, note: "blocks inside a card" },
  { token: "xl", px: 32, note: "admin page margin · between cards" },
  { token: "2xl", px: 48, note: "major admin sections" },
  { token: "3xl", px: 64, note: "marketing block separation" },
  { token: "4xl", px: 96, note: "marketing section padding" },
  { token: "5xl", px: 120, note: "marketing vertical rhythm" },
];

const radiusScale = [
  { token: "xs", px: 4, note: "checkbox only" },
  { token: "checkbox", px: 6, note: "web checkbox indicator (22px box)" },
  { token: "sm", px: 8, note: "inputs, buttons" },
  { token: "md", px: 12, note: "the default — cards" },
  { token: "tile", px: 14, note: "portrait photo tiles (Activity tile)" },
  { token: "lg", px: 16, note: "large cards, media" },
  { token: "xl", px: 24, note: "marketing blocks" },
  { token: "full", px: 999, note: "pills, avatars" },
];

export const Spacing: Story = {
  render: () => (
    <div>
      {spaceScale.map((s) => (
        <div
          key={s.token}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "10px 0",
            borderBottom: "1px solid var(--color-border-default)",
          }}
        >
          <code style={{ width: 56, color: "var(--color-brand-primary)", fontSize: 12 }}>
            {s.token}
          </code>
          <div
            style={{
              width: s.px,
              height: 16,
              background: "var(--color-brand-primary)",
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
          <span style={{ color: "var(--color-text-secondary)", fontSize: 12 }}>{s.px}px</span>
          <span style={{ color: "var(--color-text-faint)", fontSize: 12 }}>{s.note}</span>
        </div>
      ))}
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      {radiusScale.map((r) => (
        <div key={r.token} style={{ display: "flex", flexDirection: "column", gap: 8, width: 120 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: Math.min(r.px, 48),
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border-default)",
            }}
          />
          <code style={{ fontSize: 12, color: "var(--color-brand-primary)" }}>
            radius/{r.token} — {r.px}px
          </code>
          <span style={{ fontSize: 11, color: "var(--color-text-faint)" }}>{r.note}</span>
        </div>
      ))}
    </div>
  ),
};
