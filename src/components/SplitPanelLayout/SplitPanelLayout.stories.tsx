import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SplitPanelLayout } from "./SplitPanelLayout";

const meta = {
  component: SplitPanelLayout,
  tags: ["ai-generated"],
  args: {
    image: "/images/auth/register-panel.png",
    children: <div style={{ minHeight: 480, color: "var(--color-text-primary)" }}>Form column</div>,
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SplitPanelLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
// The photo panel is decoration: not shown below lg, a phone gets the form alone.
export const Mobile: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
