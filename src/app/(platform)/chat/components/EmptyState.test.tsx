import { render, screen } from "~__test__/test-utils";

import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("should render welcome message", () => {
    render(<EmptyState />);

    expect(screen.getByText("Welcome to your AI Analyst")).toBeInTheDocument();
  });

  it("should render description", () => {
    render(<EmptyState />);

    expect(
      screen.getByText(
        "Ask questions about your business metrics in natural language and get instant answers with visualizations.",
      ),
    ).toBeInTheDocument();
  });

  it("should render feature cards", () => {
    render(<EmptyState />);

    expect(screen.getByText("Ask about metrics")).toBeInTheDocument();
    expect(screen.getByText("Analyze trends")).toBeInTheDocument();
    expect(screen.getByText("Take action")).toBeInTheDocument();
  });
});
