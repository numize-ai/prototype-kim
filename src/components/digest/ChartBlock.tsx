"use client";

import React from "react";

import { BaseBlock } from "~components/digest/BaseBlock";
import {
  AreaChartRenderer,
  BarChartRenderer,
  LineChartRenderer,
  PieChartRenderer,
} from "~components/digest/ChartRenderers";
import type { BlockResult, FunnelStage } from "~mocks/digest-data";

import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

interface ChartBlockProps {
  onDeepDive?: () => void;
  result: BlockResult;
  title: string;
}

const FunnelStageCard: React.FC<{ isHighlighted: boolean; isLast: boolean; stage: FunnelStage }> = ({
  isLast,
  stage,
}) => {
  const getChangeColor = (): string => {
    if (stage.change > 0) return "text-green-600";
    if (stage.change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getChangeIcon = (): typeof ArrowDown | typeof ArrowRight | typeof ArrowUp => {
    if (stage.change > 0) return ArrowUp;
    if (stage.change < 0) return ArrowDown;
    return ArrowRight;
  };

  const changeColor = getChangeColor();
  const changeSign = stage.change > 0 ? "+" : "";
  const ChangeIcon = getChangeIcon();

  return (
    <div className="relative">
      <div className="p-4 border border-gray-100 hover:bg-gray-50 transition-colors">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="text-sm font-semibold text-gray-900">{stage.name}</h4>
            <div className={`flex items-center gap-1 ${changeColor}`}>
              <ChangeIcon className="size-3" />
              <span className="text-xs font-medium">
                {changeSign}
                {stage.change.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-semibold text-gray-900">{stage.value.toLocaleString()}</span>
              <span className="text-xs text-gray-500">users</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-500">Conversion</p>
                <p className="font-semibold text-gray-900">{stage.conversionRate.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-gray-500">Drop-off</p>
                <p className="font-semibold text-red-600">{stage.dropOffRate.toFixed(1)}%</p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500">Previous: {stage.previousValue.toLocaleString()} users</p>
            </div>
          </div>
        </div>
      </div>

      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
          <ArrowRight className="size-6 text-gray-300" />
        </div>
      )}
    </div>
  );
};

export const ChartBlock: React.FC<ChartBlockProps> = ({ onDeepDive, result, title }) => {
  // Support both legacy funnelData and new chartData
  const { chartData, funnelData } = result;

  if (chartData === undefined && funnelData === undefined) {
    return (
      <BaseBlock
        title={title}
        blockType="chart"
        updatedAt={result.executedAt}
        confidenceScore={result.confidenceScore}
        onDeepDive={onDeepDive}
      >
        <div className="py-8 text-center border border-dashed border-gray-200 bg-gray-50/50">
          <p className="text-sm font-medium text-gray-900 mb-1">No chart data available</p>
          <p className="text-xs text-gray-500">Configure data sources to display charts</p>
        </div>
      </BaseBlock>
    );
  }

  // Render new chart types (bar, pie, line, area)
  if (chartData !== undefined && chartData.chartType !== "funnel") {
    return (
      <BaseBlock
        title={title}
        blockType="chart"
        updatedAt={result.executedAt}
        confidenceScore={result.confidenceScore}
        onDeepDive={onDeepDive}
      >
        <>
          {chartData.chartType === "bar" && <BarChartRenderer chartData={chartData} />}
          {chartData.chartType === "pie" && <PieChartRenderer chartData={chartData} />}
          {chartData.chartType === "line" && <LineChartRenderer chartData={chartData} />}
          {chartData.chartType === "area" && <AreaChartRenderer chartData={chartData} />}
        </>
      </BaseBlock>
    );
  }

  // For now, render funnel visualization (legacy support)
  if (funnelData !== undefined) {
    return (
      <BaseBlock
        title={title}
        blockType="chart"
        updatedAt={result.executedAt}
        confidenceScore={result.confidenceScore}
        onDeepDive={onDeepDive}
      >
        {({ isHighlighted }) => (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className={`p-3 border border-gray-100 ${isHighlighted ? "bg-gray-200" : "bg-gray-50"}`}>
                <p className="text-xs text-gray-500 mb-1">Total Conversions</p>
                <p className="text-xl font-semibold text-gray-900">{funnelData.totalConversions.toLocaleString()}</p>
              </div>
              <div className={`p-3 border border-gray-100 ${isHighlighted ? "bg-gray-200" : "bg-gray-50"}`}>
                <p className="text-xs text-gray-500 mb-1">Overall Conversion</p>
                <p className="text-xl font-semibold text-gray-900">{funnelData.overallConversionRate.toFixed(2)}%</p>
              </div>
              <div className={`p-3 border border-gray-100 ${isHighlighted ? "bg-gray-200" : "bg-gray-50"}`}>
                <p className="text-xs text-gray-500 mb-1">Funnel Stages</p>
                <p className="text-xl font-semibold text-gray-900">{funnelData.stages.length}</p>
              </div>
              {funnelData.comparisonPeriod !== undefined && funnelData.comparisonPeriod !== "" && (
                <div className={`p-3 border border-gray-100 ${isHighlighted ? "bg-gray-200" : "bg-gray-50"}`}>
                  <p className="text-xs text-gray-500 mb-1">Comparison</p>
                  <p className="text-sm font-semibold text-gray-900">{funnelData.comparisonPeriod}</p>
                </div>
              )}
            </div>

            {/* Funnel Stages */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-6 relative">
              {funnelData.stages.map((stage, index) => (
                <FunnelStageCard
                  key={index}
                  stage={stage}
                  isLast={index === funnelData.stages.length - 1}
                  isHighlighted={isHighlighted}
                />
              ))}
            </div>
          </>
        )}
      </BaseBlock>
    );
  }

  // Fallback for unsupported chart types
  return (
    <BaseBlock
      title={title}
      blockType="chart"
      updatedAt={result.executedAt}
      confidenceScore={result.confidenceScore}
      onDeepDive={onDeepDive}
    >
      <div className="py-8 text-center">
        <p className="text-sm text-gray-500">Chart visualization not available</p>
      </div>
    </BaseBlock>
  );
};
