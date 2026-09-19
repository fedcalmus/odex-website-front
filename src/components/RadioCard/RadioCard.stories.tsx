import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent } from "storybook/test";
import { RadioCard } from "./RadioCard";

const meta = {
  component: RadioCard,
  tags: ["ai-generated"],
  args: { name: "mode", title: "Ես կլրացնեմ", description: "Գիտեմ նրա տվյալները", value: "self" },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
} satisfies Meta<typeof RadioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {};
export const Selected: Story = {
  args: { defaultChecked: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("radio", { name: /Ես կլրացնեմ/ })).toBeChecked();
  },
};

// A native radio group: arrow keys move the choice, the whole card is the target.
export const Group: Story = {
  render: () => (
    <fieldset style={{ display: "flex", gap: 12, border: 0, padding: 0 }}>
      <legend className="u-visually-hidden">Ո՞վ կլրացնի</legend>
      <RadioCard name="who" value="self" defaultChecked title="Ես կլրացնեմ" description="Գիտեմ նրա տվյալները" />
      <RadioCard name="who" value="invite" title="Ուղարկել հղում" description="Ինքը կլրացնի" />
    </fieldset>
  ),
  decorators: [(Story) => <div style={{ width: 640 }}><Story /></div>],
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText("Ուղարկել հղում"));
    await expect(canvas.getByRole("radio", { name: /Ուղարկել հղում/ })).toBeChecked();
    await expect(canvas.getByRole("radio", { name: /Ես կլրացնեմ/ })).not.toBeChecked();
  },
};
