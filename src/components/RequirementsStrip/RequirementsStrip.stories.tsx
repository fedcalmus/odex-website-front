import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { RequirementsStrip } from "./RequirementsStrip";

const meta = {
  component: RequirementsStrip,
  tags: ["ai-generated"],
  args: {
    requirements: [
      { icon: "user", label: "Տարիք", value: "16+" },
      { icon: "mountain", label: "Փորձ", value: "Նախորդ լեռնային արշավ" },
      { icon: "zap", label: "Պատրաստվածություն", value: "Կանոնավոր ակտիվություն" },
    ],
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 988 }}><Story /></div>],
} satisfies Meta<typeof RequirementsStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("16+")).toBeVisible();
    await expect(canvas.getByText("Կանոնավոր ակտիվություն")).toBeVisible();
  },
};
