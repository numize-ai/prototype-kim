import type { BlockResult } from "~mocks/digest-data";

import { KPIOverviewBlock } from "./KPIOverviewBlock";

import { fireEvent, render, screen } from "@testing-library/react";

describe("KPIOverviewBlock", () => {
  const mockResult: BlockResult = {
    executedAt: new Date("2025-01-20T10:00:00Z"),
    confidenceScore: 0.95,
    metrics: [
      {
        name: "Monthly Recurring Revenue",
        value: 284500,
        change: 12.5,
        trend: "up" as const,
        previousValue: 252889,
        unit: "$",
      },
      {
        name: "Churn Rate",
        value: 2.4,
        change: -0.8,
        trend: "down" as const,
        previousValue: 3.2,
        unit: "%",
      },
    ],
    explanation: "Revenue growth continues strong",
  };

  it("should render the block with title", () => {
    render(<KPIOverviewBlock title="Revenue Metrics" result={mockResult} />);
    expect(screen.getByText("Revenue Metrics")).toBeInTheDocument();
  });

  it("should display confidence score when available", () => {
    render(<KPIOverviewBlock title="Revenue Metrics" result={mockResult} />);
    expect(screen.getByText("95% confidence")).toBeInTheDocument();
  });

  it("should render all metrics", () => {
    render(<KPIOverviewBlock title="Revenue Metrics" result={mockResult} />);
    expect(screen.getByText("Monthly Recurring Revenue")).toBeInTheDocument();
    expect(screen.getByText("Churn Rate")).toBeInTheDocument();
  });

  it("should display metric values with correct formatting", () => {
    render(<KPIOverviewBlock title="Revenue Metrics" result={mockResult} />);
    expect(screen.getByText("$284,500")).toBeInTheDocument();
    expect(screen.getByText("2.4 %")).toBeInTheDocument();
  });

  it("should show trend changes with correct colors", () => {
    const { container } = render(<KPIOverviewBlock title="Revenue Metrics" result={mockResult} />);
    const positiveChange = container.querySelector(".text-green-600");
    const negativeChange = container.querySelector(".text-red-600");
    expect(positiveChange).toBeInTheDocument();
    expect(negativeChange).toBeInTheDocument();
  });

  it("should display explanation when available", () => {
    render(<KPIOverviewBlock title="Revenue Metrics" result={mockResult} />);
    expect(screen.getByText("Revenue growth continues strong")).toBeInTheDocument();
  });

  it("should call onDeepDive when deep dive button is clicked", () => {
    const mockOnDeepDive = jest.fn();
    render(<KPIOverviewBlock title="Revenue Metrics" result={mockResult} onDeepDive={mockOnDeepDive} />);

    const deepDiveButton = screen.getByText("Deep dive");
    fireEvent.click(deepDiveButton);

    expect(mockOnDeepDive).toHaveBeenCalledTimes(1);
  });

  it("should not render deep dive button when onDeepDive is not provided", () => {
    render(<KPIOverviewBlock title="Revenue Metrics" result={mockResult} />);
    expect(screen.queryByText("Deep dive")).not.toBeInTheDocument();
  });

  it("should display last updated timestamp", () => {
    render(<KPIOverviewBlock title="Revenue Metrics" result={mockResult} />);
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });
});
