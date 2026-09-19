import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Icon } from "./Icon";
import { ICON_NAMES } from "./icon-names.generated";

const meta = {
  component: Icon,
  tags: ["ai-generated"],
  argTypes: {
    name: { control: "select", options: ICON_NAMES },
    size: { control: { type: "number", min: 12, max: 96, step: 4 } },
    color: { control: "color" },
  },
  args: {
    name: "calendar-check",
    size: 24,
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// name/size props reach the DOM correctly (sprite href, width/height attrs).
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const svg = canvasElement.querySelector("svg");
    await expect(svg).toBeTruthy();
    await expect(svg?.getAttribute("width")).toBe(String(args.size));
    await expect(svg?.getAttribute("height")).toBe(String(args.size));
    const use = svg?.querySelector("use");
    await expect(use?.getAttribute("href")).toBe(
      `/icons/sprite.svg#icon-${args.name}`,
    );
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {[16, 20, 24, 32, 48].map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Directional: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Icon name="arrow-left" size={24} />
      <Icon name="arrow-right" size={24} />
    </div>
  ),
};

// Decorative icons (default) are hidden from assistive tech; an icon that
// carries its own meaning (no adjacent text) needs an accessible name.
export const WithAccessibleLabel: Story = {
  args: { name: "alert-triangle", title: "Warning" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "Warning" })).toBeVisible();
  },
};

export const AllIcons: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
        gap: 16,
      }}
    >
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: 12,
            borderRadius: 8,
            background: "var(--color-surface-2)",
          }}
        >
          <Icon name={name} size={24} />
          <span
            style={{
              fontSize: 11,
              color: "var(--color-text-muted)",
              textAlign: "center",
              wordBreak: "break-word",
            }}
          >
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

// The single CssCheck story for the whole project: proves src/styles/main.scss
// (the :root design-token custom properties) actually loaded in the shared
// Storybook preview, not just that the component rendered.
export const CssCheck: Story = {
  args: { name: "bell", color: "var(--color-brand-primary)" },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector("svg");
    // --color-brand-primary resolves to Lime/400 (#C5F42D) in themes/_dark.scss.
    await expect(getComputedStyle(svg as Element).color).toBe(
      "rgb(197, 244, 45)",
    );
  },
};
