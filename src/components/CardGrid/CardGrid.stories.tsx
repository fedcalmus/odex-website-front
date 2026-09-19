import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { CardGrid } from "./CardGrid";

const Cell = ({ n }: { n: number }) => (
  <li style={{ minHeight: 96, padding: 16, borderRadius: 14, background: "var(--color-surface-2)" }}>{n}</li>
);
const cells = (count: number) => Array.from({ length: count }, (_, i) => <Cell key={i} n={i + 1} />);

const meta = {
  component: CardGrid,
  tags: ["ai-generated"],
  args: { columns: 3, children: cells(6) },
  parameters: { layout: "padded" },
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeUp: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(6);
  },
};
export const FourUp: Story = { args: { columns: 4, children: cells(4) } };
export const ActivityStrip: Story = { args: { columns: "strip", children: cells(7) } };
export const DiscoveryResults: Story = { args: { columns: "results", children: cells(6) } };
export const List: Story = { args: { columns: "list", children: cells(3) } };
