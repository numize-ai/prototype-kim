/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { render, screen } from "~__test__/test-utils";
import type { ChatMessage } from "~mocks/chat-data";

import { ChatDigestSplitView } from "./ChatDigestSplitView";

describe("ChatDigestSplitView", () => {
  it("should render both chat and digest preview sections", () => {
    const messages: ChatMessage[] = [
      {
        id: "1",
        role: "user",
        content: "I want to create a digest",
        timestamp: new Date(),
        type: "text",
      },
    ];

    render(
      <ChatDigestSplitView messages={messages}>
        <div data-testid="chat-content">Chat Content</div>
      </ChatDigestSplitView>,
    );

    expect(screen.getByTestId("chat-content")).toBeInTheDocument();
    expect(screen.getByText("New Digest")).toBeInTheDocument();
  });

  it("should render children in left half", () => {
    const messages: ChatMessage[] = [];
    const childContent = "Test Child Content";

    render(
      <ChatDigestSplitView messages={messages}>
        <div>{childContent}</div>
      </ChatDigestSplitView>,
    );

    expect(screen.getByText(childContent)).toBeInTheDocument();
  });

  it("should pass messages to DigestPreview component", () => {
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
        content: "Great!",
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

    render(
      <ChatDigestSplitView messages={messages}>
        <div>Chat</div>
      </ChatDigestSplitView>,
    );

    // DigestPreview should render with the messages and show the digest title
    expect(screen.getByText("Revenue Trends Digest")).toBeInTheDocument();
  });
});
