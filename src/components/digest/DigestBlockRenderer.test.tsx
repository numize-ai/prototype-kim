import type { DigestBlock } from "~mocks/digest-data";

import { DigestBlockRenderer } from "./DigestBlockRenderer";

import { render, screen } from "@testing-library/react";

describe("DigestBlockRenderer", () => {
  const mockKPIBlock: DigestBlock = {
    id: "block-1",
    type: "kpi",
    title: "Revenue Metrics",
    order: 1,
    lastExecution: {
      executedAt: new Date("2025-01-20T10:00:00Z"),
      confidenceScore: 0.95,
      metrics: [
        {
          name: "MRR",
          value: 284500,
          change: 12.5,
          trend: "up" as const,
          previousValue: 252889,
        },
      ],
    },
  };

  const mockChartBlock: DigestBlock = {
    id: "block-2",
    type: "chart",
    title: "Revenue Chart",
    order: 2,
    lastExecution: {
      executedAt: new Date("2025-01-20T10:00:00Z"),
      chartData: {
        chartType: "bar",
        labels: ["Q1", "Q2"],
        datasets: [{ label: "Revenue", data: [100, 200] }],
      },
    },
  };

  it("should render KPI overview block", () => {
    render(<DigestBlockRenderer block={mockKPIBlock} />);
    expect(screen.getByText("Revenue Metrics")).toBeInTheDocument();
    expect(screen.getByText("MRR")).toBeInTheDocument();
  });

  it("should render chart block", () => {
    render(<DigestBlockRenderer block={mockChartBlock} />);
    expect(screen.getByText("Revenue Chart")).toBeInTheDocument();
  });

  it("should show message when block has no execution data", () => {
    const blockWithoutExecution: DigestBlock = {
      id: "block-3",
      type: "kpi",
      title: "Test Block",
      order: 1,
    };

    render(<DigestBlockRenderer block={blockWithoutExecution} />);
    expect(screen.getByText("Block not executed yet")).toBeInTheDocument();
    expect(screen.getByText("No data available for this block")).toBeInTheDocument();
  });

  it("should call onDeepDive with correct blockId", () => {
    const mockOnDeepDive = jest.fn();
    render(<DigestBlockRenderer block={mockKPIBlock} onDeepDive={mockOnDeepDive} />);

    const deepDiveButton = screen.getByText("Deep dive");
    deepDiveButton.click();

    expect(mockOnDeepDive).toHaveBeenCalledWith("block-1");
  });
});
