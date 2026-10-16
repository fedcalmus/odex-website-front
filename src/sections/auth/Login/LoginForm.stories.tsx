import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent, waitFor } from "storybook/test";
import { LoginForm } from "./LoginForm";

const meta = {
  title: "Sections/Auth/LoginForm",
  component: LoginForm,
  tags: ["ai-generated"],
  args: { nextHref: "/" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Validates on BLUR, never per keystroke (Armenian input methods produce intermediate states).
export const ValidatesOnBlur: Story = {
  play: async ({ canvas }) => {
    const email = canvas.getByRole("textbox", { name: /Էլ. փոստ/ });
    await userEvent.type(email, "bad");
    await expect(canvas.queryByRole("alert")).not.toBeInTheDocument();
    await userEvent.tab();
    await expect(await canvas.findByRole("alert")).toBeInTheDocument();
  },
};

export const EmptySubmitShowsRequiredErrors: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Մուտք գործել" }));
    await waitFor(() => expect(canvas.getAllByRole("alert")).toHaveLength(2));
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

export const ValidSubmitContinues: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByRole("textbox", { name: /Էլ. փոստ/ }), "anush@example.am");
    await userEvent.type(canvas.getByLabelText(/^Գաղտնաբառ/), "anything");
    await userEvent.click(canvas.getByRole("button", { name: "Մուտք գործել" }));
    await waitFor(() => expect(getRouter().push).toHaveBeenCalledWith("/"));
  },
};
