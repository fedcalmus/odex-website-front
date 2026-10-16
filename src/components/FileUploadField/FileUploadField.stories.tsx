import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { FileUploadField } from "./FileUploadField";

function Controlled({ initialFile }: { initialFile?: File | null }) {
  const [file, setFile] = useState<File | null>(initialFile ?? null);
  return (
    <FileUploadField
      label="Ապահովագրության պոլիս"
      required
      helper="Գործող պոլիս՝ կազմակերպչական պատասխանատվության ապահովագրության"
      accept=".pdf,.jpg,.jpeg"
      file={file}
      onFileChange={setFile}
      uploadLabel="Վերբեռնել ֆայլ"
      hint="PDF · JPG · մինչև 10 ՄԲ"
    />
  );
}

const meta = {
  title: "Components/FileUploadField",
  component: Controlled,
  tags: ["ai-generated"],
  parameters: { layout: "padded" },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof Controlled>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  args: { initialFile: new File(["x"], "polis_2026.pdf", { type: "application/pdf" }) },
};

export const PicksAFile: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/Ապահովագրության պոլիս/) as HTMLInputElement;
    const file = new File(["x"], "polis.pdf", { type: "application/pdf" });
    await userEvent.upload(input, file);
    await expect(await canvas.findByText("polis.pdf")).toBeInTheDocument();
  },
};
