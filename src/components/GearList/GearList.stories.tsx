import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { GearList } from "./GearList";

const meta = {
  component: GearList,
  tags: ["ai-generated"],
  args: {
    title: "Անհրաժեշտ սարքավորում",
    items: ["Արահետային կոշիկ", "Ուսապարկ 30 լ", "Ջուր 2 լ", "Տաք շերտ", "Անձրևանոց", "Գլխարկ"],
    note: "Ցանկը կրկնվում է ձեր տոմսի վրա և տպվող մասնակիցների ցուցակում։",
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 880 }}><Story /></div>],
} satisfies Meta<typeof GearList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(6);
  },
};
export const NoNote: Story = { args: { note: undefined } };
