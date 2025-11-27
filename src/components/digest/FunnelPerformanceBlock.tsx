"use client";

import React from "react";

import { Button } from "~/components/ui/button";
import { BlockHandle } from "~components/digest/BlockHandle";
import { ContextMenu } from "~components/digest/ContextMenu";
import type { BlockResult, FunnelStage } from "~mocks/digest-data";

import { ArrowDown, ArrowRight, ArrowUp, MessageSquare } from "lucide-react";

interface FunnelPerformanceBlockProps {
  title: string;
  result: BlockResult;
  onDeepDive?: () => void;
}

const FunnelStageCard: React.FC<{ stage: FunnelStage; isLast: boolean }> = ({ stage, isLast }) => {
  const changeColor = stage.change > 0 ? "text-green-600" : stage.change < 0 ? "text-red-600" : "text-gray-600";
  const changeSign = stage.change > 0 ? "+" : "";
  const ChangeIcon = stage.change > 0 ? ArrowUp : stage.change < 0 ? ArrowDown : ArrowRight;

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

export const FunnelPerformanceBlock: React.FC<FunnelPerformanceBlockProps> = ({ title, result, onDeepDive }) => {
  const [isHighlighted, setIsHighlighted] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const { funnelData } = result;
  const hasConfidence = result.confidenceScore !== undefined;

  const handleHandleClick = () => {
    setIsHighlighted(true);
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
    setIsHighlighted(false);
  };

  const contextActions = [
    {
      type: "duplicate" as const,
      onClick: () => {
        console.log("Duplicate block");
        handleMenuClose();
      },
    },
    {
      type: "move-up" as const,
      onClick: () => {
        console.log("Move up");
        handleMenuClose();
      },
    },
    {
      type: "move-down" as const,
      onClick: () => {
        console.log("Move down");
        handleMenuClose();
      },
    },
    {
      type: "separator" as const,
    },
    {
      type: "delete" as const,
      onClick: () => {
        console.log("Delete block");
        handleMenuClose();
      },
    },
  ];

  if (!funnelData) {
    return (
      <div className="group relative pl-6">
        <BlockHandle onClick={handleHandleClick} />
        <div className="border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">No funnel data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative pl-6">
      <BlockHandle onClick={handleHandleClick} />
      <div className="absolute left-0 top-0 -ml-6">
        <ContextMenu
          actions={contextActions}
          open={showMenu}
          onOpenChange={setShowMenu}
          trigger={<div />}
          align="start"
        />
      </div>

      <div
        className={`border-b border-gray-100 transition-colors -mx-2 px-2 ${isHighlighted ? "bg-gray-100" : "hover:bg-gray-50/50"}`}
      >
        {/* Block Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>Updated {result.executedAt.toLocaleDateString()}</span>
              {hasConfidence && <span className="text-gray-400">•</span>}
              {hasConfidence && <span>{(result.confidenceScore! * 100).toFixed(0)}% confidence</span>}
            </div>
          </div>
          {onDeepDive && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" onClick={onDeepDive}>
                <MessageSquare className="size-4 mr-1" />
                Deep dive
              </Button>
            </div>
          )}
        </div>

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
          {funnelData.comparisonPeriod && (
            <div className={`p-3 border border-gray-100 ${isHighlighted ? "bg-gray-200" : "bg-gray-50"}`}>
              <p className="text-xs text-gray-500 mb-1">Comparison</p>
              <p className="text-sm font-semibold text-gray-900">{funnelData.comparisonPeriod}</p>
            </div>
          )}
        </div>

        {/* Funnel Stages */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-6 relative">
          {funnelData.stages.map((stage, index) => (
            <FunnelStageCard key={index} stage={stage} isLast={index === funnelData.stages.length - 1} />
          ))}
        </div>

        {/* Explanation */}
        {result.explanation && (
          <div className={`mt-4 p-4 border border-gray-100 ${isHighlighted ? "bg-gray-200" : "bg-gray-50"}`}>
            <p className="text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
