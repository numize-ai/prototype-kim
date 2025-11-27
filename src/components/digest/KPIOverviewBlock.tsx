"use client";

import React from "react";

import { BaseBlock } from "~components/digest/BaseBlock";
import type { BlockResult, MetricSnapshot } from "~mocks/digest-data";

import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface KPIOverviewBlockProps {
  title: string;
  result: BlockResult;
  onDeepDive?: () => void;
}

const TrendIcon: React.FC<{ trend: "down" | "stable" | "up" }> = ({ trend }) => {
  if (trend === "up") {
    return <ArrowUp className="size-4 text-green-600" />;
  }
  if (trend === "down") {
    return <ArrowDown className="size-4 text-red-600" />;
  }
  return <Minus className="size-4 text-gray-400" />;
};

const MetricCard: React.FC<{ metric: MetricSnapshot }> = ({ metric }) => {
  const changeColor = metric.change > 0 ? "text-green-600" : metric.change < 0 ? "text-red-600" : "text-gray-600";
  const changeSign = metric.change > 0 ? "+" : "";

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors border border-gray-100">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700">{metric.name}</h4>
        <TrendIcon trend={metric.trend} />
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-semibold text-gray-900">
          {metric.unit === "$" && "$"}
          {metric.value.toLocaleString()}
          {metric.unit && metric.unit !== "$" && ` ${metric.unit}`}
        </p>
        <p className={`text-sm font-medium ${changeColor}`}>
          {changeSign}
          {metric.change.toFixed(1)}% vs previous period
        </p>
        <p className="text-xs text-gray-500">
          Previous: {metric.unit === "$" && "$"}
          {metric.previousValue.toLocaleString()}
          {metric.unit && metric.unit !== "$" && ` ${metric.unit}`}
        </p>
      </div>
    </div>
  );
};

export const KPIOverviewBlock: React.FC<KPIOverviewBlockProps> = ({ title, result, onDeepDive }) => {
  const metrics = result.metrics ?? [];

  return (
    <BaseBlock
      title={title}
      blockType="kpi"
      updatedAt={result.executedAt}
      confidenceScore={result.confidenceScore}
      onDeepDive={onDeepDive}
    >
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>
    </BaseBlock>
  );
};
