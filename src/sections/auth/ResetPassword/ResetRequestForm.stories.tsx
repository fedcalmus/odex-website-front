import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent, waitFor } from "storybook/test";
import { ResetRequestForm } from "./ResetRequestForm";

const meta = {
  title: "Sections/Auth/ResetRequestForm",
  component: ResetRequestForm,
  tags: ["ai-generated"],
  args: { nextHref: "/reset-password/sent" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof ResetRequestForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptySubmitShowsError: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Ուղարկել հղումը" }));
    await waitFor(() => expect(canvas.getByRole("alert")).toBeInTheDocument());
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

export const ValidSubmitContinues: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByRole("textbox", { name: /Էլ. փոստ/ }), "anush@example.am");
    await userEvent.click(canvas.getByRole("button", { name: "Ուղարկել հղումը" }));
    await waitFor(() =>
      expect(getRouter().push).toHaveBeenCalledWith("/reset-password/sent?email=anush%40example.am"),
    );
  },
};
