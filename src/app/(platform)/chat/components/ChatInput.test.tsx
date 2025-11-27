import { fireEvent, render, screen } from "~__test__/test-utils";

import { ChatInput } from "./ChatInput";

describe("ChatInput", () => {
  it("should render input field with placeholder", () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText("Ask a question about your metrics...");
    expect(input).toBeInTheDocument();
  });

  it("should call onSend when send button is clicked with text", () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText("Ask a question about your metrics...");
    const sendButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Show me MRR" } });
    fireEvent.click(sendButton);

    expect(mockOnSend).toHaveBeenCalledWith("Show me MRR");
  });

  it("should not call onSend when input is empty", () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);

    const sendButton = screen.getByRole("button");
    fireEvent.click(sendButton);

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it("should clear input after sending message", () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText("Ask a question about your metrics...");
    const sendButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.click(sendButton);

    expect((input as HTMLInputElement).value).toBe("");
  });

  it("should send message on Enter key press", () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText("Ask a question about your metrics...");

    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.keyDown(input, { key: "Enter", shiftKey: false });

    expect(mockOnSend).toHaveBeenCalledWith("Test message");
  });

  it("should not send message on Shift+Enter", () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText("Ask a question about your metrics...");

    fireEvent.change(input, { target: { value: "Test message" } });
    fireEvent.keyDown(input, { key: "Enter", shiftKey: true });

    expect(mockOnSend).not.toHaveBeenCalled();
  });

  it("should disable input and send button when disabled prop is true", () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} disabled={true} />);

    const input = screen.getByPlaceholderText("Ask a question about your metrics...");
    const sendButton = screen.getByRole("button");

    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });

  it("should display character count when typing", () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);

    const input = screen.getByPlaceholderText("Ask a question about your metrics...");
    fireEvent.change(input, { target: { value: "Hello" } });

    expect(screen.getByText("5 chars")).toBeInTheDocument();
  });
});
