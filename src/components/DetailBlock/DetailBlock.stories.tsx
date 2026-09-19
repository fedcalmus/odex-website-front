import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { DetailBlock } from "./DetailBlock";

const meta = {
  component: DetailBlock,
  tags: ["ai-generated"],
  args: {
    title: "Երթուղու մասին",
    children: (
      <p style={{ color: "var(--color-text-secondary)" }}>
        Արագածի հարավային գագաթը չորսից ամենամատչելին է, բայց ոչ ամենահեշտը։
      </p>
    ),
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 880 }}><Story /></div>],
} satisfies Meta<typeof DetailBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// A landmark named by its heading.
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("region", { name: "Երթուղու մասին" })).toBeVisible();
  },
};
