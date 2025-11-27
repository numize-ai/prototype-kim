/* eslint-disable max-lines */
"use client";

import React, { useMemo } from "react";

import { Badge } from "~/components/ui/badge";
import { DigestBlockRenderer } from "~components/digest/DigestBlockRenderer";
import type { ChatMessage as ChatMessageType } from "~mocks/chat-data";
import type { Digest } from "~mocks/digest-data";

import { Calendar, TrendingUp } from "lucide-react";

interface DigestPreviewProps {
  messages: ChatMessageType[];
}

// Helper function to build digest based on conversation progress
const buildDigestFromMessages = (messages: ChatMessageType[]): Partial<Digest> | null => {
  // Count user messages to determine progress
  const userMessages = messages.filter((msg) => msg.role === "user");
  const messageCount = userMessages.length;

  if (messageCount === 0) return null;

  // Base digest structure
  const digest: Partial<Digest> = {
    id: "preview-digest",
    title: "Campaign Performance Digest",
    description: "Track marketing campaign metrics and performance",
    recurrence: "weekly",
    deliveryMethod: "both",
    isActive: false,
    blocks: [],
  };

  // Message 1: User wants to create digest - show basic title
  if (messageCount === 1) {
    digest.title = "New Digest";
    digest.description = "Configuring your digest...";
    return digest;
  }

  // Message 2: User wants campaign performance metrics - add title and basic structure
  if (messageCount === 2) {
    digest.title = "Campaign Performance Digest";
    digest.description = "Track marketing campaign metrics and performance";
    digest.blocks = [
      {
        id: "block-preview-1",
        type: "text",
        title: "Overview",
        order: 0,
        lastExecution: {
          executedAt: new Date(),
          textContent: "This digest will track your campaign performance and key marketing metrics.",
        },
      },
    ];
    return digest;
  }

  // Message 3: User chooses weekly - add frequency and basic metrics
  if (messageCount === 3) {
    digest.recurrence = "weekly";
    digest.blocks = [
      {
        id: "block-preview-1",
        type: "text",
        title: "Weekly Campaign Overview",
        order: 0,
        lastExecution: {
          executedAt: new Date(),
          textContent:
            "This digest will provide weekly insights into your campaign performance, helping you track marketing metrics and identify optimization opportunities.",
        },
      },
      {
        id: "block-preview-2",
        type: "kpi",
        title: "Campaign Metrics",
        order: 1,
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.95,
          metrics: [
            {
              name: "Click-Through Rate",
              value: 3.2,
              change: 0.4,
              trend: "up" as const,
              previousValue: 2.8,
              unit: "%",
            },
            {
              name: "Conversion Rate",
              value: 4.5,
              change: 0.3,
              trend: "up" as const,
              previousValue: 4.2,
              unit: "%",
            },
          ],
        },
      },
    ];
    return digest;
  }

  // Message 4: User wants breakdown by channel - add detailed metrics
  if (messageCount === 4) {
    digest.blocks = [
      {
        id: "block-preview-1",
        type: "text",
        title: "Weekly Campaign Overview",
        order: 0,
        lastExecution: {
          executedAt: new Date(),
          textContent:
            "This digest tracks your weekly campaign performance with detailed breakdowns by marketing channel and comparisons to previous periods.",
        },
      },
      {
        id: "block-preview-2",
        type: "kpi",
        title: "Campaign Metrics",
        order: 1,
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.95,
          metrics: [
            {
              name: "Click-Through Rate",
              value: 3.2,
              change: 0.4,
              trend: "up" as const,
              previousValue: 2.8,
              unit: "%",
            },
            {
              name: "Previous Week CTR",
              value: 2.8,
              change: 0,
              trend: "stable" as const,
              previousValue: 2.8,
              unit: "%",
            },
            {
              name: "Conversion Rate",
              value: 4.5,
              change: 0.3,
              trend: "up" as const,
              previousValue: 4.2,
              unit: "%",
            },
            {
              name: "Engagement Rate",
              value: 6.8,
              change: 0.5,
              trend: "up" as const,
              previousValue: 6.3,
              unit: "%",
            },
          ],
        },
      },
      {
        id: "block-preview-3",
        type: "chart",
        title: "Performance by Channel",
        order: 2,
        config: {
          type: "chart",
          config: {
            chartType: "bar",
            showLegend: true,
            showDataLabels: true,
            colorScheme: "multi",
            height: "md",
          },
        },
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.93,
          chartData: {
            chartType: "bar",
            labels: ["Email", "Social Media", "Paid Search", "Display"],
            datasets: [
              {
                label: "This Week",
                data: [4.2, 3.8, 2.9, 2.1],
                color: "#3b82f6",
              },
              {
                label: "Last Week",
                data: [3.9, 3.5, 2.6, 1.8],
                color: "#94a3b8",
              },
            ],
          },
        },
      },
    ];
    return digest;
  }

  // Message 5 & 6: User adds chart and alert, then confirms - complete digest
  if (messageCount >= 5) {
    digest.blocks = [
      {
        id: "block-preview-1",
        type: "text",
        title: "Weekly Campaign Overview",
        order: 0,
        lastExecution: {
          executedAt: new Date(),
          textContent:
            "This digest tracks your weekly campaign performance with detailed breakdowns by marketing channel, comparisons to previous periods, and automated alerts for click-through rate thresholds.",
        },
      },
      {
        id: "block-preview-2",
        type: "kpi",
        title: "Campaign Metrics",
        order: 1,
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.95,
          metrics: [
            {
              name: "Click-Through Rate",
              value: 3.2,
              change: 0.4,
              trend: "up" as const,
              previousValue: 2.8,
              unit: "%",
            },
            {
              name: "Conversion Rate",
              value: 4.5,
              change: 0.3,
              trend: "up" as const,
              previousValue: 4.2,
              unit: "%",
            },
            {
              name: "Engagement Rate",
              value: 6.8,
              change: 0.5,
              trend: "up" as const,
              previousValue: 6.3,
              unit: "%",
            },
            {
              name: "CTR Alert Threshold",
              value: 2.0,
              change: 0,
              trend: "stable" as const,
              previousValue: 2.0,
              unit: "%",
            },
          ],
        },
      },
      {
        id: "block-preview-3",
        type: "chart",
        title: "Campaign Performance Trend",
        order: 2,
        config: {
          type: "chart",
          config: {
            chartType: "line",
            showLegend: true,
            showDataLabels: false,
            colorScheme: "blue",
            height: "md",
          },
        },
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.94,
          chartData: {
            chartType: "line",
            labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
            datasets: [
              {
                label: "Click-Through Rate (%)",
                data: [2.4, 2.6, 2.8, 2.8, 3.2],
                color: "#3b82f6",
              },
              {
                label: "Conversion Rate (%)",
                data: [3.8, 4.0, 4.1, 4.2, 4.5],
                color: "#10b981",
              },
            ],
          },
        },
      },
      {
        id: "block-preview-4",
        type: "chart",
        title: "Performance by Channel",
        order: 3,
        config: {
          type: "chart",
          config: {
            chartType: "bar",
            showLegend: true,
            showDataLabels: true,
            colorScheme: "multi",
            height: "md",
          },
        },
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.93,
          chartData: {
            chartType: "bar",
            labels: ["Email", "Social Media", "Paid Search", "Display"],
            datasets: [
              {
                label: "This Week",
                data: [4.2, 3.8, 2.9, 2.1],
                color: "#3b82f6",
              },
              {
                label: "Last Week",
                data: [3.9, 3.5, 2.6, 1.8],
                color: "#94a3b8",
              },
            ],
          },
        },
      },
      {
        id: "block-preview-5",
        type: "insight",
        title: "Campaign Performance Alert",
        order: 4,
        config: {
          type: "insight",
          config: {
            insightTypes: ["positive"],
            minConfidence: 0.8,
            maxInsights: 5,
            showRecommendations: true,
          },
        },
        lastExecution: {
          executedAt: new Date(),
          confidenceScore: 0.91,
          insightData: {
            insightType: "positive",
            summary:
              "Campaign performance is trending positively with 3.2% CTR, well above the 2% threshold. All marketing channels showing improvement week-over-week.",
            details: [
              "Click-through rate increased by 0.4 percentage points (14% improvement)",
              "Email campaigns showing strongest performance at 4.2% CTR",
              "No alerts triggered - CTR remains above 2% threshold",
            ],
            recommendations: [
              "Continue monitoring Email channel momentum for best practices",
              "Consider reallocating budget from Display to higher-performing channels",
              "Test similar messaging from Email campaigns across other channels",
            ],
            confidence: 0.91,
          },
        },
      },
    ];
    return digest;
  }

  return digest;
};

export const DigestPreview: React.FC<DigestPreviewProps> = ({ messages }) => {
  const digest = useMemo(() => buildDigestFromMessages(messages), [messages]);

  if (digest === null) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-muted/20">
        <div className="text-center text-muted-foreground">
          <TrendingUp className="size-12 mx-auto mb-4 opacity-50" />
          <p className="text-sm">Digest preview will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-card px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold text-foreground">{digest.title}</h2>
              <Badge variant="outline" className="text-xs">
                Preview
              </Badge>
            </div>
            {digest.description !== undefined && digest.description.length > 0 && (
              <p className="text-sm text-muted-foreground">{digest.description}</p>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <span className="capitalize">{digest.recurrence}</span>
          </div>
          {digest.blocks !== undefined && digest.blocks.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span>{digest.blocks.length} blocks</span>
            </div>
          )}
        </div>
      </div>

      {/* Blocks */}
      <div className="flex-1 overflow-y-auto p-6">
        {digest.blocks !== undefined && digest.blocks.length > 0 ? (
          <div className="space-y-6">
            {digest.blocks.map((block) => (
              <div key={block.id} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <DigestBlockRenderer block={block} />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center text-muted-foreground">
            <div>
              <TrendingUp className="size-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Continue the conversation to build your digest</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
