"use client";

import * as React from "react";

import { DbtVerifiedBadge, InferredLogicBadge } from "~/components/badges";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import type { QueryHistoryItem } from "~/mocks/queryHistory";

interface HistoryListProps {
  history: QueryHistoryItem[];
  onDelete: (id: string) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onDelete }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`;
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📊</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions yet</h3>
        <p className="text-gray-600 mb-6">Start by asking your first business question</p>
        <Button asChild>
          <a href="/ask">Ask your first question</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                    {item.dbtVerified ? <DbtVerifiedBadge /> : <InferredLogicBadge />}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatTimeAgo(item.timestamp)}</span>
                    <span>•</span>
                    <span>{item.rowCount.toLocaleString()} rows</span>
                    <span>•</span>
                    <span>{item.executionTime.toFixed(2)}s</span>
                    {item.synced && (
                      <>
                        <span>•</span>
                        <span className="text-green-600 font-medium">✓ Synced to {item.targetSheet}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setExpandedId(expandedId === item.id ? null : item.id);
                    }}
                  >
                    {expandedId === item.id ? "Hide SQL" : "View SQL"}
                  </Button>
                  <Button variant="ghost" size="sm">
                    Re-sync
                  </Button>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onDelete(item.id);
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {/* Expanded SQL */}
              {expandedId === item.id && (
                <div className="pt-4 border-t border-gray-200">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                    <code>{item.sql}</code>
                  </pre>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Tables:</span>
                      <span className="text-blue-600">{item.tablesUsed.join(", ")}</span>
                    </div>
                    {item.metricsUsed !== undefined && item.metricsUsed.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Metrics:</span>
                        <span className="text-blue-600">{item.metricsUsed.join(", ")}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
