import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// Documentation-only: renders the semantic colour tokens emitted by
// themes/_dark.scss, so a palette change is visible here without cross-
// referencing hex values by hand.
const meta = {
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({ token, label }: { token: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 168 }}>
      <div
        style={{
          height: 64,
          borderRadius: 12,
          background: `var(${token})`,
          border: "1px solid var(--color-border-strong)",
        }}
      />
      <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{label}</div>
      <code style={{ fontSize: 11, color: "var(--color-text-faint)" }}>{token}</code>
    </div>
  );
}

function Group({
  title,
  tokens,
}: {
  title: string;
  tokens: { token: string; label: string }[];
}) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h3 style={{ color: "var(--color-text-primary)", marginBottom: 16 }}>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {tokens.map((t) => (
          <Swatch key={t.token} {...t} />
        ))}
      </div>
    </section>
  );
}

const surface = [
  { token: "--color-surface-canvas", label: "canvas" },
  { token: "--color-surface-0", label: "0 — page ground" },
  { token: "--color-surface-1", label: "1" },
  { token: "--color-surface-2", label: "2 — card" },
  { token: "--color-surface-3", label: "3" },
  { token: "--color-surface-hover", label: "hover" },
  { token: "--color-surface-pressed", label: "pressed" },
  { token: "--color-surface-locked", label: "locked" },
];

const text = [
  { token: "--color-text-primary", label: "primary" },
  { token: "--color-text-secondary", label: "secondary" },
  { token: "--color-text-muted", label: "muted" },
  { token: "--color-text-faint", label: "faint — floor, 5.01" },
  { token: "--color-text-on-photo", label: "on-photo" },
  { token: "--color-text-link", label: "link" },
];

const brand = [
  { token: "--color-brand-primary", label: "primary" },
  { token: "--color-brand-primary-hover", label: "primary hover" },
  { token: "--color-brand-primary-pressed", label: "primary pressed" },
  { token: "--color-brand-primary-subtle", label: "primary subtle" },
  { token: "--color-brand-on-primary", label: "on primary" },
  { token: "--color-brand-secondary", label: "secondary" },
  { token: "--color-brand-secondary-subtle", label: "secondary subtle" },
  { token: "--color-brand-on-secondary", label: "on secondary" },
  { token: "--color-brand-accent", label: "accent — attention, never action" },
  { token: "--color-brand-accent-subtle", label: "accent subtle" },
  { token: "--color-brand-on-accent", label: "on accent" },
];

const border = [
  { token: "--color-border-default", label: "default" },
  { token: "--color-border-strong", label: "strong" },
  { token: "--color-border-focus", label: "focus" },
];

const overlay = [
  { token: "--color-overlay-scrim", label: "scrim — flat, under text on photos" },
  { token: "--color-overlay-scrim-mid", label: "scrim mid — tile stop, 35%" },
  { token: "--color-overlay-scrim-heavy", label: "scrim heavy — tile base, 90%" },
  { token: "--gradient-scrim-tile", label: "tile scrim — 0 → 35% @55% → 90%" },
  { token: "--color-overlay-backdrop", label: "backdrop — modals" },
  { token: "--color-overlay-wash", label: "wash — raised elements" },
];

const difficulty = [
  { token: "--color-difficulty-easy-bg", label: "easy bg" },
  { token: "--color-difficulty-easy-text", label: "easy text" },
  { token: "--color-difficulty-moderate-bg", label: "moderate bg" },
  { token: "--color-difficulty-moderate-text", label: "moderate text" },
  { token: "--color-difficulty-hard-bg", label: "hard bg" },
  { token: "--color-difficulty-hard-text", label: "hard text" },
  { token: "--color-difficulty-extreme-bg", label: "extreme bg — hue break" },
  { token: "--color-difficulty-extreme-text", label: "extreme text" },
];

const state = [
  { token: "--color-state-success", label: "success" },
  { token: "--color-state-success-subtle", label: "success subtle" },
  { token: "--color-state-warning", label: "warning" },
  { token: "--color-state-warning-subtle", label: "warning subtle" },
  { token: "--color-state-danger", label: "danger" },
  { token: "--color-state-danger-subtle", label: "danger subtle" },
  { token: "--color-state-info", label: "info" },
  { token: "--color-state-info-subtle", label: "info subtle" },
];

export const Overview: Story = {
  render: () => (
    <div>
      <Group title="Surface" tokens={surface} />
      <Group title="Text" tokens={text} />
      <Group title="Brand" tokens={brand} />
      <Group title="Border" tokens={border} />
      <Group title="Overlay" tokens={overlay} />
      <Group title="Difficulty (safety-critical — glyph + label mandatory, never colour alone)" tokens={difficulty} />
      <Group title="State" tokens={state} />
    </div>
  ),
};
