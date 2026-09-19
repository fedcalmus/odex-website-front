import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { Stepper } from "./Stepper";

const meta = {
  component: Stepper,
  tags: ["ai-generated"],
  args: {
    label: "Գրանցման քայլեր",
    compactLabel: "Քայլ 2 / 4",
    steps: [
      { label: "Հաշիվ", hint: "էլ. փոստ և գաղտնաբառ", status: "done", href: "/register" },
      { label: "Համաձայնագիր", hint: "ռիսկի ընդունում", status: "current" },
      { label: "Առողջություն", hint: "ոչ պարտադիր հիմա", status: "upcoming" },
      { label: "Կապ", hint: "արտակարգ դեպքի համար", status: "upcoming" },
    ],
  },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 800 }}><Story /></div>],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Label BENEATH the dot; each step says what it asks for; current is a RING, not a fill.
export const StepTwo: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("listitem", { current: "step" })).toHaveTextContent("Համաձայնագիր");
    // Completed steps are clickable.
    await expect(canvas.getByRole("link", { name: /Հաշիվ/ })).toHaveAttribute("href", "/register");
  },
};
export const FirstStep: Story = {
  args: {
    compactLabel: "Քայլ 1 / 4",
    steps: [
      { label: "Հաշիվ", hint: "էլ. փոստ և գաղտնաբառ", status: "current" },
      { label: "Համաձայնագիր", hint: "ռիսկի ընդունում", status: "upcoming" },
      { label: "Առողջություն", hint: "ոչ պարտադիր հիմա", status: "upcoming" },
      { label: "Կապ", hint: "արտակարգ դեպքի համար", status: "upcoming" },
    ],
  },
};
export const ThreeSteps: Story = {
  args: {
    compactLabel: "Քայլ 1 / 3",
    steps: [
      { label: "Մասնակիցներ", hint: "2 տոմս", status: "current" },
      { label: "Վճարում", hint: "քարտ կամ Idram", status: "upcoming" },
      { label: "Հաստատում", hint: "տոմսը փոստով", status: "upcoming" },
    ],
  },
};
// Below md it collapses to "Քայլ 2 / 4" plus the current label.
export const Mobile: Story = { globals: { viewport: { value: "mobile1", isRotated: false } } };
