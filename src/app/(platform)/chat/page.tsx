/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-depth */
/* eslint-disable max-nested-callbacks */
/* eslint-disable id-length */
/* eslint-disable complexity */
"use client";

import React, { useEffect, useRef, useState } from "react";

import { Button } from "~/components/ui/button";
import { TooltipProvider } from "~/components/ui/tooltip";
import type { ChatMessage as ChatMessageType } from "~mocks/chat-data";
import { MOCK_RESPONSES, SUGGESTED_QUERIES } from "~mocks/chat-data";
import { generateFallbackResponse } from "~services/chatFallbackResponses";
import type { ChatSuggestion } from "~services/suggestionEngine";
import { filterSuggestions } from "~services/suggestionEngine";
import { useAppSelector } from "~store";
import { selectConnectedSourceIds, selectHasMultipleSources } from "~store/slices/connectorsSlice";

import { ChatDigestSplitView } from "./components/ChatDigestSplitView";
import { ChatInput } from "./components/ChatInput";
import { ChatMessage } from "./components/ChatMessage";
import { EmptyState } from "./components/EmptyState";
import { SQLEditor } from "./components/SQLEditor";
import { SuggestedQuestions } from "./components/SuggestedQuestions";
import { TypingIndicator } from "./components/TypingIndicator";

import { AnimatePresence, motion } from "framer-motion";
import { Code, History, MessageSquare, Plus, X } from "lucide-react";

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessageType[];
  createdAt: Date;
}

type ViewMode = "chat" | "digest" | "sql";

// Helper: Check if conversation is about creating a digest
const isDigestConversation = (messages: ChatMessageType[]): boolean => {
  const userMessages = messages.filter((msg) => msg.role === "user");
  if (userMessages.length === 0) return false;

  // Check if any user message contains digest-related keywords
  const digestKeywords = /create a digest|i want to create a digest|digest|weekly report/iu;
  return userMessages.some((msg) => digestKeywords.test(msg.content));
};

// Helper: Convert SUGGESTED_QUERIES to ChatSuggestion format
const convertSuggestionsFormat = (): ChatSuggestion[] => {
  return SUGGESTED_QUERIES.map((q) => ({
    id: q.id,
    query: q.text,
    requiredSources: q.requiredSources,
    requiresReconciliation: q.requiresReconciliation,
    category: q.category,
    icon: q.icon,
    dataSources: q.dataSources,
  }));
};

// Helper: Generate unique conversation ID
const generateConversationId = (): string => {
  return `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper: Generate unique message ID
const generateMessageId = (): string => {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const ChatPage: React.FC = () => {
  // Redux state
  const connectedSourceIds = useAppSelector(selectConnectedSourceIds);
  const hasMultipleSources = useAppSelector(selectHasMultipleSources);

  // Convert SUGGESTED_QUERIES to ChatSuggestion format
  const allSuggestions = convertSuggestionsFormat();

  // Filter suggestions based on context
  const filteredSuggestions = filterSuggestions(allSuggestions, {
    connectedSources: connectedSourceIds,
    isReconciled: false,
    hasMultipleSources,
  });

  // Local state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-switch to digest view when digest conversation is detected
  useEffect(() => {
    if (isDigestConversation(messages) && viewMode === "chat") {
      setViewMode("digest");
    }
  }, [messages, viewMode]);

  const createNewConversation = () => {
    const newConversationId = generateConversationId();
    const newConversation: Conversation = {
      id: newConversationId,
      title: "New conversation",
      messages: [],
      createdAt: new Date(),
    };

    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversationId(newConversationId);
    setMessages([]);
  };

  const selectConversation = (conversationId: string) => {
    const conversation = conversations.find((c) => c.id === conversationId);
    if (conversation !== undefined) {
      setCurrentConversationId(conversationId);
      setMessages(conversation.messages);
      setShowHistory(false);
    }
  };

  const updateConversationTitle = (conversationId: string, firstUserMessage: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? { ...conv, title: firstUserMessage.slice(0, 50) + (firstUserMessage.length > 50 ? "..." : "") }
          : conv,
      ),
    );
  };

  const handleSendMessage = (content: string) => {
    // Create or get current conversation
    let conversationId = currentConversationId;
    if (conversationId === null) {
      conversationId = generateConversationId();
      const newConversation: Conversation = {
        id: conversationId,
        title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
        messages: [],
        createdAt: new Date(),
      };
      setConversations((prev) => [newConversation, ...prev]);
      setCurrentConversationId(conversationId);
    } else if (messages.length === 0) {
      // Update title for first message
      updateConversationTitle(conversationId, content);
    }

    // Add user message
    const userMessage: ChatMessageType = {
      id: generateMessageId(),
      role: "user",
      content,
      timestamp: new Date(),
      type: "text",
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const mockKey = content.toLowerCase().trim();
      const mockResponse = MOCK_RESPONSES[mockKey];

      const assistantMessage: ChatMessageType =
        // eslint-disable-next-line no-negated-condition
        mockResponse !== undefined
          ? {
              id: generateMessageId(),
              role: "assistant",
              timestamp: new Date(),
              ...mockResponse,
            }
          : // Generate intelligent fallback response using context
            {
              ...generateFallbackResponse(content, {
                connectedSources: connectedSourceIds,
                isReconciled: false,
                hasMultipleSources,
              }),
              id: generateMessageId(), // Override with local ID
            };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);
      setIsTyping(false);

      // Update conversation in history
      setConversations((prev) =>
        prev.map((conv) => (conv.id === conversationId ? { ...conv, messages: finalMessages } : conv)),
      );
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const clearHistory = () => {
    // eslint-disable-next-line no-alert
    if (confirm("Are you sure you want to clear all conversation history?")) {
      setConversations([]);
      setCurrentConversationId(null);
      setMessages([]);
      setShowHistory(false);
    }
  };

  const hasMessages = messages.length > 0;

  // Extract last SQL query and table data from messages
  const getLastSQLData = () => {
    // Find the last assistant message with SQL or table data
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      if (message === undefined) continue;

      if (message.role === "assistant") {
        // Try to get SQL from reasoning steps (last step)
        if (message.reasoningSteps !== undefined && message.reasoningSteps.length > 0) {
          const lastStep = message.reasoningSteps[message.reasoningSteps.length - 1];
          if (lastStep?.sqlQuery !== undefined) {
            return {
              sql: lastStep.sqlQuery,
              tableData: message.tableData,
            };
          }
        }
        // Otherwise use the direct SQL query
        if (message.sqlQuery !== undefined || message.tableData !== undefined) {
          return {
            sql: message.sqlQuery ?? "",
            tableData: message.tableData,
          };
        }
      }
    }
    return { sql: "", tableData: undefined };
  };

  const { sql: lastSQL, tableData: lastTableData } = getLastSQLData();
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const canSwitchToSQL = hasMessages && (lastSQL || lastTableData);

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-card border border-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            {viewMode === "sql" && <Code className="size-5 text-muted-foreground" />}
            {(viewMode === "chat" || viewMode === "digest") && (
              <MessageSquare className="size-5 text-muted-foreground" />
            )}
            <h1 className="text-lg font-semibold text-foreground">
              {viewMode === "chat" && "AI Analyst"}
              {viewMode === "digest" && "Create Digest"}
              {viewMode === "sql" && "SQL Editor"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {canSwitchToSQL && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setViewMode(viewMode === "chat" ? "sql" : "chat");
                }}
                className={viewMode === "sql" ? "bg-primary/10 border-primary/30" : ""}
              >
                {viewMode === "chat" ? (
                  <>
                    <Code className="size-4 mr-2" />
                    SQL Editor
                  </>
                ) : (
                  <>
                    <MessageSquare className="size-4 mr-2" />
                    Chat
                  </>
                )}
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={createNewConversation}>
              <Plus className="size-4 mr-2" />
              New Chat
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowHistory(!showHistory);
              }}
              className={showHistory ? "bg-slate-100" : ""}
            >
              <History className="size-4 mr-2" />
              History
            </Button>
          </div>
        </div>

        {/* Content area */}
        {viewMode === "digest" ? (
          <ChatDigestSplitView messages={messages}>
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto">
              {!hasMessages && !isTyping ? (
                <div className="h-full flex flex-col">
                  <div className="flex-shrink-0">
                    <EmptyState />
                  </div>
                  {/* Suggested questions */}
                  <div className="px-6 pb-6 flex-1 min-h-0 flex flex-col">
                    <TooltipProvider>
                      <SuggestedQuestions questions={filteredSuggestions} onSelectQuestion={handleSuggestedQuestion} />
                    </TooltipProvider>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-6 space-y-6">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                  </AnimatePresence>

                  {isTyping && <TypingIndicator />}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input area */}
            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
          </ChatDigestSplitView>
        ) : viewMode === "chat" ? (
          <>
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto">
              {!hasMessages && !isTyping ? (
                <div className="h-full flex flex-col">
                  <div className="flex-shrink-0">
                    <EmptyState />
                  </div>
                  {/* Suggested questions */}
                  <div className="px-6 pb-6 flex-1 min-h-0 flex flex-col">
                    <TooltipProvider>
                      <SuggestedQuestions questions={filteredSuggestions} onSelectQuestion={handleSuggestedQuestion} />
                    </TooltipProvider>
                  </div>
                </div>
              ) : (
                <div className="px-6 py-6 space-y-6">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                  </AnimatePresence>

                  {isTyping && <TypingIndicator />}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input area */}
            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
          </>
        ) : (
          <>
            {/* SQL Editor */}
            <div className="flex-1 overflow-hidden p-4">
              <SQLEditor initialSQL={lastSQL} {...(lastTableData ? { tableData: lastTableData } : {})} />
            </div>
          </>
        )}
      </div>

      {/* History sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="w-80 flex flex-col bg-card border border-border rounded-lg overflow-hidden"
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Conversation History</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowHistory(false);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>

            {/* Conversations list */}
            <div className="flex-1 overflow-y-auto p-2">
              {conversations.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No conversations yet</div>
              ) : (
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => {
                        selectConversation(conversation.id);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        conversation.id === currentConversationId
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      <div className="font-medium truncate">{conversation.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {conversation.messages.length} messages •{" "}
                        {new Date(conversation.createdAt).toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear history button */}
            {conversations.length > 0 && (
              <div className="p-4 border-t border-border">
                <Button variant="outline" size="sm" onClick={clearHistory} className="w-full">
                  Clear History
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPage;
