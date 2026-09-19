import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { FilterPanel } from "@/components/FilterPanel";
import { discoveryCopy } from "@/content/discovery";
import { DEFAULT_PARAMS } from "@/lib/discovery-params";
import { FiltersDrawer } from "./FiltersDrawer";

const meta = {
  component: FiltersDrawer,
  tags: ["ai-generated"],
  args: {
    label: "Զտիչներ",
    closeLabel: "Փակել",
    children: (
      <FilterPanel
        params={DEFAULT_PARAMS}
        clearHref="/events"
        labels={discoveryCopy.filters}
        activities={[
          { slug: "hiking", title: "Արշավ", count: 8 },
          { slug: "water", title: "Ջրային", count: 1 },
        ]}
      />
    ),
  },
  // Only exists below lg; the sidebar takes over from there.
  globals: { viewport: { value: "mobile1", isRotated: false } },
  parameters: { layout: "centered" },
} satisfies Meta<typeof FiltersDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenAndClose: Story = {
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: /Զտիչներ/ }));
    const dialog = canvasElement.querySelector("dialog")!;
    await expect(dialog).toHaveAttribute("open");
    await expect(within(dialog).getByRole("checkbox", { name: /Արշավ/ })).toBeInTheDocument();
    await expect(dialog).toBeVisible();
    await userEvent.click(within(dialog).getByRole("button", { name: "Փակել" }));
    await expect(dialog).not.toHaveAttribute("open");
  },
};

// The trigger shows how many filters are active — filters you can't see are filters you forget.
export const WithActiveCount: Story = { args: { activeCount: 3 } };
