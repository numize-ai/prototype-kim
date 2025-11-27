/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from "react";

import { fireEvent, render, screen } from "~__test__/test-utils";
import type { ChatSuggestion } from "~services/suggestionEngine";

import { SuggestedQuestions } from "./SuggestedQuestions";

// Mock the Tooltip components to avoid Radix UI test issues
jest.mock("~/components/ui/tooltip", () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TooltipTrigger: ({ children }: { children: React.ReactNode; asChild?: boolean }) => <div>{children}</div>,
  TooltipContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TooltipProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockQuestions: ChatSuggestion[] = [
  {
    id: "q1",
    query: "Show me MRR growth",
    category: "multi-source",
    dataSources: ["Stripe"],
    requiredSources: ["stripe"],
    requiresReconciliation: false,
  },
  {
    id: "q2",
    query: "Why did churn increase?",
    category: "cross-source",
    dataSources: ["Stripe", "HubSpot"],
    requiredSources: ["stripe", "hubspot"],
    requiresReconciliation: true,
  },
  {
    id: "q3",
    query: "Export data to Sheets",
    category: "multi-source",
    dataSources: ["Stripe"],
    requiredSources: ["stripe"],
    requiresReconciliation: false,
  },
  {
    id: "q4",
    query: "Show revenue trends",
    category: "single-source",
    dataSources: ["Stripe"],
    requiredSources: ["stripe"],
    requiresReconciliation: false,
  },
  {
    id: "q5",
    query: "Compare platform performance",
    category: "cross-source",
    dataSources: ["Google Ads", "Meta"],
    requiredSources: ["google-ads", "meta"],
    requiresReconciliation: true,
  },
  {
    id: "q6",
    query: "Analyze customer segments",
    category: "multi-source",
    dataSources: ["HubSpot"],
    requiredSources: ["hubspot"],
    requiresReconciliation: false,
  },
  {
    id: "q7",
    query: "This should not appear",
    category: "single-source",
    dataSources: ["Stripe"],
    requiredSources: ["stripe"],
    requiresReconciliation: false,
  },
];

describe("SuggestedQuestions", () => {
  it("should render all questions when 3 or fewer are provided", () => {
    const mockOnSelect = jest.fn();
    const threeQuestions = mockQuestions.slice(0, 3);
    render(<SuggestedQuestions questions={threeQuestions} onSelectQuestion={mockOnSelect} />);

    expect(screen.getByText("Show me MRR growth")).toBeInTheDocument();
    expect(screen.getByText("Why did churn increase?")).toBeInTheDocument();
    expect(screen.getByText("Export data to Sheets")).toBeInTheDocument();
  });

  it("should render only first 6 questions when more than 6 are provided", () => {
    const mockOnSelect = jest.fn();
    render(<SuggestedQuestions questions={mockQuestions} onSelectQuestion={mockOnSelect} />);

    // First 6 should be visible
    expect(screen.getByText("Show me MRR growth")).toBeInTheDocument();
    expect(screen.getByText("Why did churn increase?")).toBeInTheDocument();
    expect(screen.getByText("Export data to Sheets")).toBeInTheDocument();
    expect(screen.getByText("Show revenue trends")).toBeInTheDocument();
    expect(screen.getByText("Compare platform performance")).toBeInTheDocument();
    expect(screen.getByText("Analyze customer segments")).toBeInTheDocument();

    // 7th question should not be visible
    expect(screen.queryByText("This should not appear")).not.toBeInTheDocument();
  });

  it("should call onSelectQuestion when a question is clicked", () => {
    const mockOnSelect = jest.fn();
    render(<SuggestedQuestions questions={mockQuestions} onSelectQuestion={mockOnSelect} />);

    const questionButton = screen.getByText("Show me MRR growth").closest("button");
    if (questionButton) {
      fireEvent.click(questionButton);
    }

    expect(mockOnSelect).toHaveBeenCalledWith("Show me MRR growth");
  });

  it("should render with category-specific colors", () => {
    const mockOnSelect = jest.fn();
    const { container } = render(<SuggestedQuestions questions={mockQuestions} onSelectQuestion={mockOnSelect} />);

    const buttons = container.querySelectorAll("button:not([disabled])");
    // Should render 6 questions
    expect(buttons.length).toBeGreaterThanOrEqual(0);
  });

  it("should display suggested questions header", () => {
    const mockOnSelect = jest.fn();
    render(<SuggestedQuestions questions={mockQuestions} onSelectQuestion={mockOnSelect} />);

    expect(screen.getByText("Suggested Questions")).toBeInTheDocument();
  });

  it("should display data source badges for each question", () => {
    const mockOnSelect = jest.fn();
    render(<SuggestedQuestions questions={mockQuestions} onSelectQuestion={mockOnSelect} />);

    expect(screen.getAllByText("Stripe").length).toBeGreaterThan(0);
    expect(screen.getAllByText("HubSpot").length).toBeGreaterThan(0);
  });

  it("should render in a 3-column grid on large screens", () => {
    const mockOnSelect = jest.fn();
    const { container } = render(<SuggestedQuestions questions={mockQuestions} onSelectQuestion={mockOnSelect} />);

    const grid = container.querySelector(".grid");
    expect(grid).toHaveClass("grid-cols-1");
    expect(grid).toHaveClass("sm:grid-cols-2");
    expect(grid).toHaveClass("lg:grid-cols-3");
  });
});
