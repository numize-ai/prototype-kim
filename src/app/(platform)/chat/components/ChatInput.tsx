/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use client";

import React, { useRef, useState } from "react";

import { Button } from "~/components/ui/button";

import { Send } from "lucide-react";
import type { KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = "Ask a question about your metrics...",
}) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedValue = value.trim();
    if (!trimmedValue || disabled) return;

    onSend(trimmedValue);
    setValue("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex items-end gap-3 p-4 bg-card border-t border-border">
      <div className="flex-1 relative flex items-end">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full px-4 py-3 pr-12 text-sm border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:bg-muted disabled:text-muted-foreground max-h-32 overflow-y-auto"
          style={{ minHeight: "44px" }}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground pointer-events-none">
          {value.length > 0 && `${value.length} chars`}
        </div>
      </div>
      <Button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        size="lg"
        className="flex-shrink-0 h-[44px] w-[44px] p-0"
      >
        <Send className="size-4" />
      </Button>
    </div>
  );
};
