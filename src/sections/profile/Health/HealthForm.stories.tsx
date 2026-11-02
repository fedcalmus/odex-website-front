import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent, waitFor } from "storybook/test";
import { HealthForm } from "./HealthForm";

const meta = {
  title: "Sections/Profile/HealthForm",
  component: HealthForm,
  tags: ["ai-generated"],
  args: { nextHref: "/complete-profile/emergency-contact", backHref: "/complete-profile/waiver" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof HealthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Every field is optional — submitting empty should just continue.
export const EmptySubmitContinues: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Շարունակել" }));
    await waitFor(() =>
      expect(getRouter().push).toHaveBeenCalledWith("/complete-profile/emergency-contact"),
    );
  },
};

export const NothingToDiscloseClearsFields: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByRole("textbox", { name: /Ալերգիաներ/ }), "ընկույզ");
    await userEvent.click(canvas.getByRole("checkbox", { name: "Նշելու բան չունեմ" }));
    const allergies = canvas.getByRole("textbox", { name: /Ալերգիաներ/ }) as HTMLInputElement;
    await expect(allergies.value).toBe("");
    await expect(allergies).toBeDisabled();
  },
};
