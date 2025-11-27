"use client";

import React from "react";

import { BaseBlock } from "~components/digest/BaseBlock";
import type { BlockResult } from "~mocks/digest-data";

import { AlertCircle, CheckCircle, Info, TrendingUp } from "lucide-react";

interface InsightBlockProps {
  title: string;
  result: BlockResult;
  onDeepDive?: () => void;
}

const InsightTypeBadge: React.FC<{ insightType: "negative" | "neutral" | "positive" | "warning" }> = ({
  insightType,
}) => {
  const config = {
    positive: {
      label: "Positive Insight",
      icon: CheckCircle,
      className: "bg-green-50 text-green-700 border-green-200",
    },
    negative: {
      label: "Needs Attention",
      icon: AlertCircle,
      className: "bg-red-50 text-red-700 border-red-200",
    },
    warning: {
      label: "Warning",
      icon: AlertCircle,
      className: "bg-orange-50 text-orange-700 border-orange-200",
    },
    neutral: { label: "Insight", icon: Info, className: "bg-blue-50 text-blue-700 border-blue-200" },
  };

  const { label, icon: Icon, className } = config[insightType];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${className}`}>
      <Icon className="size-3.5" />
      {label}
    </span>
  );
};

export const InsightBlock: React.FC<InsightBlockProps> = ({ title, result, onDeepDive }) => {
  const { insightData } = result;

  if (!insightData) {
    return (
      <BaseBlock
        title={title}
        blockType="insight"
        updatedAt={result.executedAt}
        confidenceScore={result.confidenceScore}
        onDeepDive={onDeepDive}
      >
        <div className="py-8 text-center border border-dashed border-gray-200 bg-gray-50/50">
          <TrendingUp className="size-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900 mb-1">No insights available</p>
          <p className="text-xs text-gray-500">AI insights will appear here once data is analyzed</p>
        </div>
      </BaseBlock>
    );
  }

  const { insightType, summary, details, recommendations, confidence } = insightData;

  return (
    <BaseBlock
      title={title}
      blockType="insight"
      updatedAt={result.executedAt}
      confidenceScore={result.confidenceScore}
      onDeepDive={onDeepDive}
    >
      <div className="space-y-4">
        {/* Insight Type Badge */}
        <div className="flex items-center justify-between">
          <InsightTypeBadge insightType={insightType} />
          {confidence && (
            <span className="text-xs text-gray-500">
              Confidence: <span className="font-semibold text-gray-700">{(confidence * 100).toFixed(0)}%</span>
            </span>
          )}
        </div>

        {/* Summary */}
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
          <p className="text-sm text-gray-900 leading-relaxed">{summary}</p>
        </div>

        {/* Details */}
        {details && details.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Points</h4>
            <ul className="space-y-2">
              {details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="flex-shrink-0 size-1.5 rounded-full bg-blue-500 mt-1.5" />
                  <span className="flex-1">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Recommendations</h4>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="flex-shrink-0 text-green-600 mt-0.5">→</span>
                  <span className="flex-1">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </BaseBlock>
  );
};
