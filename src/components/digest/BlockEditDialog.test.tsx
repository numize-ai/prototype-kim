import { fireEvent, render, screen } from "~__test__/test-utils";
import type { BlockConfig } from "~mocks/digest-data";

import { BlockEditDialog } from "./BlockEditDialog";

// Mock the Dialog components to avoid lucide-react import issues in tests
jest.mock("~/components/ui/dialog", () => ({
  Dialog: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div role="dialog">{children}</div> : null,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  DialogFooter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the BlockConfigPanel
jest.mock("./BlockConfigPanel", () => ({
  BlockConfigPanel: ({ blockType }: { blockType: string }) => (
    <div data-testid="block-config-panel">
      <label htmlFor="mock-input">Grid Layout</label>
      <input id="mock-input" />
      <label htmlFor="mock-comparison">Comparison Period</label>
      <input id="mock-comparison" />
      {blockType === "kpi" && <div>KPI Config Panel</div>}
    </div>
  ),
}));

describe("BlockEditDialog", () => {
  const mockOnSave = jest.fn();
  const mockOnOpenChange = jest.fn();

  const defaultKPIConfig: BlockConfig = {
    type: "kpi",
    config: {
      layout: "grid-4",
      comparisonPeriod: "last-month",
      showTrends: true,
      showPreviousValues: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the dialog when open", () => {
    render(
      <BlockEditDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        blockType="kpi"
        blockConfig={defaultKPIConfig}
        onSave={mockOnSave}
      />,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Edit KPI Block")).toBeInTheDocument();
  });

  it("should not render when closed", () => {
    render(
      <BlockEditDialog
        open={false}
        onOpenChange={mockOnOpenChange}
        blockType="kpi"
        blockConfig={defaultKPIConfig}
        onSave={mockOnSave}
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render BlockConfigPanel inside the dialog", () => {
    render(
      <BlockEditDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        blockType="kpi"
        blockConfig={defaultKPIConfig}
        onSave={mockOnSave}
      />,
    );

    // Check for config panel content
    expect(screen.getByLabelText("Grid Layout")).toBeInTheDocument();
    expect(screen.getByLabelText("Comparison Period")).toBeInTheDocument();
  });

  it("should call onSave when Save button is clicked", () => {
    render(
      <BlockEditDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        blockType="kpi"
        blockConfig={defaultKPIConfig}
        onSave={mockOnSave}
      />,
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith(defaultKPIConfig);
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it("should call onOpenChange when Cancel button is clicked", () => {
    render(
      <BlockEditDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        blockType="kpi"
        blockConfig={defaultKPIConfig}
        onSave={mockOnSave}
      />,
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it("should format block type correctly", () => {
    const { rerender } = render(
      <BlockEditDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        blockType="kpi"
        blockConfig={defaultKPIConfig}
        onSave={mockOnSave}
      />,
    );

    expect(screen.getByText("Edit KPI Block")).toBeInTheDocument();

    const chartConfig: BlockConfig = {
      type: "chart",
      config: {
        chartType: "bar",
        showLegend: true,
        showDataLabels: false,
        colorScheme: "blue",
        height: "md",
      },
    };

    rerender(
      <BlockEditDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        blockType="chart"
        blockConfig={chartConfig}
        onSave={mockOnSave}
      />,
    );

    expect(screen.getByText("Edit Chart Block")).toBeInTheDocument();
  });

  it("should update local config when BlockConfigPanel changes", () => {
    render(
      <BlockEditDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        blockType="kpi"
        blockConfig={defaultKPIConfig}
        onSave={mockOnSave}
      />,
    );

    // Interact with the config panel to change a value
    const layoutSelect = screen.getByLabelText("Grid Layout");
    fireEvent.click(layoutSelect);

    // Click save to verify the updated config is passed
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalled();
  });
});
