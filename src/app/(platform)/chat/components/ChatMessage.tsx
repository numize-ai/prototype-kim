/* eslint-disable complexity */
/* eslint-disable id-length */
"use client";

import React, { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import type { ChatMessage as ChatMessageType } from "~mocks/chat-data";

import { ChatActions } from "./ChatActions";
import { ChatChart } from "./ChatChart";
import { ChatTable } from "./ChatTable";
import { ExportToSheetsDialog } from "./ExportToSheetsDialog";
import { ReasoningPanel } from "./ReasoningPanel";

import { motion } from "framer-motion";
import { Bot, Database, User } from "lucide-react";
import Image from "next/image";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const [showReasoning, setShowReasoning] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);

  const isUser = message.role === "user";
  const timestamp = new Date(message.timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="shrink-0 size-8 rounded-full bg-slate-900 flex items-center justify-center">
          <Bot className="size-4 text-white" />
        </div>
      )}

      <div className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"} max-w-3xl w-full`}>
        {/* Data sources badge (for AI responses with multi-source data) */}
        {!isUser && message.dataSources !== undefined && message.dataSources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-2 flex-wrap"
          >
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Database className="size-3" />
              <span className="font-medium">Data sources:</span>
            </div>
            {message.dataSources.map((source) => (
              <Badge key={source.id} variant="outline" className="gap-1.5 py-1">
                <div className="w-4 h-4 rounded overflow-hidden shrink-0">
                  <Image src={source.icon} alt={source.name} width={16} height={16} className="object-contain" />
                </div>
                <span>{source.name}</span>
              </Badge>
            ))}
          </motion.div>
        )}

        {/* Message bubble */}
        <Card
          className={`px-4 py-3 ${isUser ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200"}`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </Card>

        {/* Reasoning panel (for AI responses with reasoning steps) */}
        {!isUser && message.reasoningSteps !== undefined && message.reasoningSteps.length > 0 && (
          <div className="w-full">
            <ReasoningPanel
              steps={message.reasoningSteps}
              isExpanded={showReasoning}
              onToggle={() => {
                setShowReasoning(!showReasoning);
              }}
            />
          </div>
        )}

        {/* Chart visualization */}
        {message.type === "chart" && message.chartData !== undefined && (
          <div className="w-full">
            <ChatChart data={message.chartData} />
          </div>
        )}

        {/* Table visualization */}
        {message.type === "table" && message.tableData !== undefined && (
          <div className="w-full">
            <ChatTable data={message.tableData} />
          </div>
        )}

        {/* Action buttons */}
        {message.actions !== undefined && message.actions.length > 0 && (
          <ChatActions
            actions={message.actions}
            onExportToSheets={() => {
              setShowExportDialog(true);
            }}
          />
        )}

        {/* Timestamp */}
        <span className="text-xs text-slate-500">{timestamp}</span>

        {/* Export to Sheets Dialog */}
        {message.type === "table" && message.tableData !== undefined && (
          <ExportToSheetsDialog
            open={showExportDialog}
            onOpenChange={setShowExportDialog}
            tableData={message.tableData}
            {...(message.dataSources !== undefined && { dataSources: message.dataSources })}
            queryDescription={message.content}
          />
        )}
      </div>

      {isUser && (
        <div className="shrink-0 size-8 rounded-full bg-slate-900 flex items-center justify-center">
          <User className="size-4 text-white" />
        </div>
      )}
    </motion.div>
  );
};
