"use client";

import React from "react";

import type { ChatMessage as ChatMessageType } from "~mocks/chat-data";

import { DigestPreview } from "./DigestPreview";

import { motion } from "framer-motion";

interface ChatDigestSplitViewProps {
  messages: ChatMessageType[];
  children: React.ReactNode;
}

export const ChatDigestSplitView: React.FC<ChatDigestSplitViewProps> = ({ messages, children }) => {
  return (
    <div className="flex flex-col lg:flex-row h-full gap-4">
      {/* Left half: Chat UI - full width on mobile, 50% on desktop */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col overflow-hidden lg:border-r border-border min-h-0 w-full lg:w-1/2"
      >
        {children}
      </motion.div>

      {/* Right half: Digest Preview - full width on mobile, 50% on desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        className="flex flex-col overflow-hidden min-h-0 w-full lg:w-1/2"
      >
        <DigestPreview messages={messages} />
      </motion.div>
    </div>
  );
};
