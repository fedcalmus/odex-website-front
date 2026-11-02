import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent, waitFor } from "storybook/test";
import { EmergencyContactForm } from "./EmergencyContactForm";

const meta = {
  title: "Sections/Profile/EmergencyContactForm",
  component: EmergencyContactForm,
  tags: ["ai-generated"],
  args: { nextHref: "/", backHref: "/complete-profile/health" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof EmergencyContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptySubmitShowsEveryError: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Շարունակել վճարմանը" }));
    await waitFor(() => expect(canvas.getAllByRole("alert")).toHaveLength(3));
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

export const ValidSubmitContinues: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByRole("textbox", { name: /Անուն ազգանուն/ }), "Նարե Հակոբյան");
    await userEvent.selectOptions(canvas.getByLabelText(/Ով է ձեզ համար/), "parent");
    await userEvent.type(canvas.getByRole("textbox", { name: /Հեռախոս/ }), "077123456");
    await userEvent.click(canvas.getByRole("button", { name: "Շարունակել վճարմանը" }));
    await waitFor(() => expect(getRouter().push).toHaveBeenCalledWith("/"));
  },
};
