import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent, waitFor } from "storybook/test";
import { WaiverForm } from "./WaiverForm";

const meta = {
  title: "Sections/Profile/WaiverForm",
  component: WaiverForm,
  tags: ["ai-generated"],
  args: { nextHref: "/complete-profile/health", backHref: "/complete-profile" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof WaiverForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptySubmitShowsBothErrors: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Ընդունել և շարունակել" }));
    await waitFor(() => expect(canvas.getAllByRole("alert")).toHaveLength(2));
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

export const BothAcceptedContinues: Story = {
  play: async ({ canvas }) => {
    const checkboxes = canvas.getAllByRole("checkbox");
    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[1]);
    await userEvent.click(canvas.getByRole("button", { name: "Ընդունել և շարունակել" }));
    await waitFor(() => expect(getRouter().push).toHaveBeenCalledWith("/complete-profile/health"));
  },
};
