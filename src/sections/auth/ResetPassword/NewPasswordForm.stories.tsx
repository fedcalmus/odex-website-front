import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent, waitFor } from "storybook/test";
import { NewPasswordForm } from "./NewPasswordForm";

const meta = {
  title: "Sections/Auth/NewPasswordForm",
  component: NewPasswordForm,
  tags: ["ai-generated"],
  args: { nextHref: "/login?reset=success" },
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof NewPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptySubmitShowsEveryError: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Հաստատել նոր գաղտնաբառը" }));
    await waitFor(() => expect(canvas.getAllByRole("alert")).toHaveLength(2));
    await expect(getRouter().push).not.toHaveBeenCalled();
  },
};

export const MismatchedPasswordsShowError: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText(/^Նոր գաղտնաբառ/), "Odex2026x");
    await userEvent.type(canvas.getByLabelText(/Կրկնեք/), "Odex2026y");
    await userEvent.tab();
    await expect(await canvas.findByRole("alert")).toHaveTextContent("չեն համընկնում");
  },
};

export const StrengthMeterUpdatesWhileTyping: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText(/^Նոր գաղտնաբառ/), "Odex2026x");
    await expect(canvas.getByText("Ուժեղ գաղտնաբառ")).toBeInTheDocument();
  },
};

export const ValidSubmitContinues: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText(/^Նոր գաղտնաբառ/), "Odex2026x");
    await userEvent.type(canvas.getByLabelText(/Կրկնեք/), "Odex2026x");
    await userEvent.click(canvas.getByRole("button", { name: "Հաստատել նոր գաղտնաբառը" }));
    await waitFor(() => expect(getRouter().push).toHaveBeenCalledWith("/login?reset=success"));
  },
};
