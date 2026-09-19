import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent } from "storybook/test";
import { FacetFilter } from "./FacetFilter";

const meta = {
  component: FacetFilter,
  tags: ["ai-generated"],
  args: {
    title: "Մարզ",
    name: "region",
    pathname: "/clubs",
    query: "limit=12",
    selected: [],
    options: [
      { value: "yerevan", label: "Երևան", count: 14 },
      { value: "kotayk", label: "Կոտայք", count: 7 },
      { value: "syunik", label: "Սյունիք", count: 5 },
    ],
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
} satisfies Meta<typeof FacetFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Ticking applies at once by writing the URL — and starts again from page one (`limit` is dropped).
export const Tick: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("checkbox", { name: /Կոտայք/ }));
    await expect(getRouter().replace).toHaveBeenCalledWith("/clubs?region=kotayk", { scroll: false });
  },
};

// Multiple choices repeat the parameter.
export const AddSecond: Story = {
  args: { selected: ["kotayk"], query: "region=kotayk" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: /Կոտայք/ })).toBeChecked();
    await userEvent.click(canvas.getByRole("checkbox", { name: /Սյունիք/ }));
    await expect(getRouter().replace).toHaveBeenCalledWith("/clubs?region=kotayk&region=syunik", { scroll: false });
  },
};
export const Preselected: Story = { args: { selected: ["yerevan"] } };
