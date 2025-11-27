"use client";

import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import { DigestBlockRenderer } from "~components/digest/DigestBlockRenderer";
import { InlineEdit } from "~components/digest/InlineEdit";
import { PageProperties } from "~components/digest/PageProperties";
import type { DigestBlock } from "~mocks/digest-data";
import { getDigestById } from "~mocks/digest-data";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowLeft, BarChart3, Filter, Lightbulb, MessageSquare, Play, Send, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ChatInterfaceProps {
  blockContext?: DigestBlock | undefined;
  onClose: () => void;
}

const getBlockIcon = (blockType: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    kpi: BarChart3,
    chart: Filter,
    table: Activity,
    insight: Lightbulb,
  };
  return iconMap[blockType] || BarChart3;
};

const getBlockColor = (blockType: string) => {
  const colorMap: Record<string, string> = {
    kpi: "bg-blue-50 text-blue-700 border-blue-200",
    chart: "bg-green-50 text-green-700 border-green-200",
    table: "bg-purple-50 text-purple-700 border-purple-200",
    insight: "bg-yellow-50 text-yellow-700 border-yellow-200",
  };
  return colorMap[blockType] || "bg-gray-50 text-gray-700 border-gray-200";
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ blockContext, onClose }) => {
  const [messages, setMessages] = useState<Array<{ role: "assistant" | "user"; content: string }>>([
    {
      role: "assistant",
      content: blockContext
        ? `I'm here to help you understand the "${blockContext.title}" insights. What would you like to know?`
        : "How can I help you with this digest?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "This is a prototype. In production, this would connect to the AI chat service to provide insights about the digest block.",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4 text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-900">Deep Dive Chat</h3>
        </div>
        <button
          onClick={onClose}
          className="inline-flex items-center justify-center size-6 rounded hover:bg-gray-100 transition-colors"
        >
          <X className="size-4 text-gray-500" />
        </button>
      </div>

      {/* Block Context Card */}
      {blockContext && (
        <div className="mx-4 mt-4 mb-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-lg border ${getBlockColor(blockContext.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {(() => {
                  const Icon = getBlockIcon(blockContext.type);
                  return <Icon className="size-5" />;
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wide">{blockContext.type} Block</span>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{blockContext.title}</h4>
                {blockContext.prompt && <p className="text-xs text-gray-600 line-clamp-2">{blockContext.prompt}</p>}
              </div>
            </div>
          </motion.div>
          <div className="text-xs text-gray-500 mt-2 px-1">
            💡 Ask questions about this block's insights, trends, or dive deeper into the data
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900 border border-gray-200"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            placeholder="Ask about this insight..."
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button size="sm" onClick={handleSend} disabled={!input.trim()}>
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const DigestDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const digestId = params?.["id"] as string;
  const digest = getDigestById(digestId);

  const [splitScreenMode, setSplitScreenMode] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<DigestBlock | undefined>(undefined);
  const [digestTitle, setDigestTitle] = useState(digest?.title || "");

  if (!digest) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Digest Not Found</h2>
          <p className="text-sm text-gray-500 mb-4">The digest you're looking for doesn't exist.</p>
          <Button
            onClick={() => {
              router.push("/digests");
            }}
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Digests
          </Button>
        </div>
      </div>
    );
  }

  const handleDeepDive = (blockId: string) => {
    const block = digest.blocks.find((b) => b.id === blockId);
    if (block) {
      setSelectedBlock(block);
      setSplitScreenMode(true);
    }
  };

  const handleCloseSplitScreen = () => {
    setSplitScreenMode(false);
    setSelectedBlock(undefined);
  };

  const handleTitleChange = (newTitle: string) => {
    setDigestTitle(newTitle);
    // In production, save to backend
    console.log("Title updated:", newTitle);
  };

  const sortedBlocks = [...digest.blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${splitScreenMode ? "mr-[45%]" : ""}`}>
        <div className="max-w-4xl mx-auto py-8 px-4">
          {/* Back Button */}
          <button
            onClick={() => {
              router.push("/digests");
            }}
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>All digests</span>
          </button>

          {/* Page Title */}
          <div className="mb-6">
            <InlineEdit
              value={digestTitle}
              onChange={handleTitleChange}
              placeholder="Untitled"
              className="text-4xl font-bold text-gray-900 mb-2"
            />
          </div>

          {/* Page Properties */}
          <PageProperties
            recurrence={digest.recurrence}
            deliveryMethod={digest.deliveryMethod}
            isActive={digest.isActive}
            {...(digest.lastExecutedAt && { lastExecutedAt: digest.lastExecutedAt })}
            {...(digest.nextExecutionAt && { nextExecutionAt: digest.nextExecutionAt })}
            blockCount={digest.blocks.length}
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-2 py-4">
            <Button variant="outline" size="sm">
              <Play className="size-4 mr-2" />
              Execute Now
            </Button>
          </div>

          {/* Blocks Content */}
          <div className="space-y-4 mt-8">
            {sortedBlocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-200 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">No blocks configured</h3>
                <p className="text-sm text-gray-500 mb-4">Add blocks to this digest to start receiving insights.</p>
                <Button
                  size="sm"
                  onClick={() => {
                    router.push(`/digests/${digest.id}/edit`);
                  }}
                >
                  Configure Blocks
                </Button>
              </div>
            ) : (
              sortedBlocks.map((block) => (
                <div key={block.id}>
                  <DigestBlockRenderer block={block} onDeepDive={handleDeepDive} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Split Screen Chat */}
      <AnimatePresence>
        {splitScreenMode && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-16 bottom-0 w-[45%] z-50"
          >
            <ChatInterface blockContext={selectedBlock} onClose={handleCloseSplitScreen} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DigestDetailPage;
