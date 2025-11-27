/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { render, screen } from "~__test__/test-utils";
import type { ChatMessage } from "~mocks/chat-data";

import { DigestPreview } from "./DigestPreview";

describe("DigestPreview", () => {
  it("should render empty state when no messages provided", () => {
    render(<DigestPreview messages={[]} />);

    expect(screen.getByText("Digest preview will appear here")).toBeInTheDocument();
  });

  it("should render digest title after first user message", () => {
    const messages: ChatMessage[] = [
      {
        id: "1",
        role: "user",
        content: "I want to create a digest",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "2",
        role: "assistant",
        content: "I'd be happy to help you create a digest!",
        timestamp: new Date(),
        type: "text",
      },
    ];

    render(<DigestPreview messages={messages} />);

    expect(screen.getByText("New Digest")).toBeInTheDocument();
    expect(screen.getByText("Preview")).toBeInTheDocument();
  });

  it("should update digest title after revenue trends message", () => {
    const messages: ChatMessage[] = [
      {
        id: "1",
        role: "user",
        content: "I want to create a digest",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "2",
        role: "assistant",
        content: "What type of insights would you like?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "3",
        role: "user",
        content: "I want revenue trends",
        timestamp: new Date(),
        type: "text",
      },
    ];

    render(<DigestPreview messages={messages} />);

    expect(screen.getByText("Revenue Trends Digest")).toBeInTheDocument();
    expect(screen.getByText("Track revenue metrics and trends")).toBeInTheDocument();
  });

  it("should show weekly recurrence after frequency selection", () => {
    const messages: ChatMessage[] = [
      {
        id: "1",
        role: "user",
        content: "I want to create a digest",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "2",
        role: "assistant",
        content: "What type of insights would you like?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "3",
        role: "user",
        content: "I want revenue trends",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "4",
        role: "assistant",
        content: "What time period would you like to track?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "5",
        role: "user",
        content: "Weekly",
        timestamp: new Date(),
        type: "text",
      },
    ];

    render(<DigestPreview messages={messages} />);

    expect(screen.getByText("weekly")).toBeInTheDocument();
    expect(screen.getByText("Weekly Revenue Overview")).toBeInTheDocument();
  });

  it("should render KPI blocks after frequency selection", () => {
    const messages: ChatMessage[] = [
      {
        id: "1",
        role: "user",
        content: "I want to create a digest",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "2",
        role: "assistant",
        content: "What type of insights would you like?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "3",
        role: "user",
        content: "I want revenue trends",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "4",
        role: "assistant",
        content: "What time period would you like to track?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "5",
        role: "user",
        content: "Weekly",
        timestamp: new Date(),
        type: "text",
      },
    ];

    render(<DigestPreview messages={messages} />);

    expect(screen.getByText("Revenue Metrics")).toBeInTheDocument();
    expect(screen.getByText("Weekly Revenue")).toBeInTheDocument();
  });

  it("should render chart blocks after product breakdown request", () => {
    const messages: ChatMessage[] = [
      {
        id: "1",
        role: "user",
        content: "I want to create a digest",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "2",
        role: "assistant",
        content: "What type of insights would you like?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "3",
        role: "user",
        content: "I want revenue trends",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "4",
        role: "assistant",
        content: "What time period?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "5",
        role: "user",
        content: "Weekly",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "6",
        role: "assistant",
        content: "Any specific breakdowns?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "7",
        role: "user",
        content: "Yes, compare with previous week and break down by product",
        timestamp: new Date(),
        type: "text",
      },
    ];

    render(<DigestPreview messages={messages} />);

    expect(screen.getByText("Revenue by Product")).toBeInTheDocument();
    expect(screen.getByText("Previous Week")).toBeInTheDocument();
  });

  it("should render complete digest with alert after final message", () => {
    const messages: ChatMessage[] = [
      {
        id: "1",
        role: "user",
        content: "I want to create a digest",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "2",
        role: "assistant",
        content: "What type of insights would you like?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "3",
        role: "user",
        content: "I want revenue trends",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "4",
        role: "assistant",
        content: "What time period?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "5",
        role: "user",
        content: "Weekly",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "6",
        role: "assistant",
        content: "Any specific breakdowns?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "7",
        role: "user",
        content: "Yes, compare with previous week and break down by product",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "8",
        role: "assistant",
        content: "Any visualizations or alerts?",
        timestamp: new Date(),
        type: "text",
      },
      {
        id: "9",
        role: "user",
        content: "Add a line chart and alert if revenue drops more than 10%",
        timestamp: new Date(),
        type: "text",
      },
    ];

    render(<DigestPreview messages={messages} />);

    expect(screen.getByText("Revenue Trend")).toBeInTheDocument();
    expect(screen.getByText("Revenue Alert")).toBeInTheDocument();
    expect(screen.getByText("Alert Threshold")).toBeInTheDocument();
    expect(screen.getByText(/5 blocks/i)).toBeInTheDocument();
  });
});
