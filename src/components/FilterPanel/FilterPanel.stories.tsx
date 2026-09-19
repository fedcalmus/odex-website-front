import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, userEvent } from "storybook/test";
import { discoveryCopy } from "@/content/discovery";
import { DEFAULT_PARAMS } from "@/lib/discovery-params";
import { formatPrice } from "@/lib/format";
import { FilterPanel } from "./FilterPanel";

const meta = {
  component: FilterPanel,
  tags: ["ai-generated"],
  args: {
    params: DEFAULT_PARAMS,
    clearHref: "/events",
    labels: discoveryCopy.filters,
    activities: [
      { slug: "hiking", title: "Արշավ", count: 8 },
      { slug: "climbing", title: "Ժայռամագլցում", count: 0 },
      { slug: "cycling", title: "Հեծանիվ", count: 0 },
      { slug: "water", title: "Ջրային", count: 1 },
    ],
  },
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
} satisfies Meta<typeof FilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

// No Apply button in the design: ticking a box applies it, by writing the URL.
export const TickAnActivity: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("checkbox", { name: /Արշավ/ }));
    await expect(getRouter().replace).toHaveBeenCalledWith("/events?activity=hiking", { scroll: false });
  },
};

// Reflects what's already in the URL.
export const WithSelection: Story = {
  args: { params: { ...DEFAULT_PARAMS, activity: ["hiking", "water"], maxPrice: 25000 } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: /Արշավ/ })).toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: /Ջրային/ })).toBeChecked();
    await expect(canvas.getByRole("checkbox", { name: /Հեծանիվ/ })).not.toBeChecked();
    await expect(canvas.getByRole("slider")).toHaveAttribute("aria-valuetext", `մինչև ${formatPrice(25000)}`);
  },
};

// Groups are native <details>: collapsible with no JS.
export const CollapsibleGroups: Story = {
  play: async ({ canvas, canvasElement }) => {
    const group = canvasElement.querySelector("details")!;
    await expect(group).toHaveAttribute("open");
    await userEvent.click(canvas.getByText("Ուղղություն"));
    await expect(group).not.toHaveAttribute("open");
  },
};

export const Clear: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Մաքրել" })).toHaveAttribute("href", "/events");
  },
};
