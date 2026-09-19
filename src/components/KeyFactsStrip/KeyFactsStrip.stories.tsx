import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { KeyFactsStrip } from "./KeyFactsStrip";

const meta = {
  component: KeyFactsStrip,
  tags: ["ai-generated"],
  args: {
    facts: [
      { icon: "navigation", label: "երթուղի", value: "14 կմ" },
      { icon: "mountain", label: "վերելք", value: "1 200 մ" },
      { icon: "clock", label: "տևողություն", value: "9 ժ" },
      { icon: "users", label: "առավելագույն խումբ", value: "16" },
    ],
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 988 }}><Story /></div>],
} satisfies Meta<typeof KeyFactsStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Four: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("1 200 մ")).toBeVisible();
    await expect(canvas.getByText("առավելագույն խումբ")).toBeVisible();
  },
};
export const Mobile: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
