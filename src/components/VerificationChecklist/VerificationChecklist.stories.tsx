import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { VerificationChecklist } from "./VerificationChecklist";

const meta = {
  component: VerificationChecklist,
  tags: ["ai-generated"],
  args: {
    title: "Ի՞նչ ենք ստուգում",
    items: ["Իրավաբանական գրանցում և ՀՎՀՀ", "Ուղեկցորդների հավաստագրերը", "Ապահովագրության վավերականությունը"],
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
} satisfies Meta<typeof VerificationChecklist>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
  },
};
