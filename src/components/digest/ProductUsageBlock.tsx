"use client";

import React from "react";

import { Button } from "~/components/ui/button";
import { BlockHandle } from "~components/digest/BlockHandle";
import { ContextMenu } from "~components/digest/ContextMenu";
import type { BlockResult, FeatureUsage } from "~mocks/digest-data";

import { ArrowDown, ArrowUp, MessageSquare, Minus, TrendingUp, Users } from "lucide-react";

interface ProductUsageBlockProps {
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

const FeatureUsageCard: React.FC<{ feature: FeatureUsage }> = ({ feature }) => {
  const changeColor = feature.change > 0 ? "text-green-600" : feature.change < 0 ? "text-red-600" : "text-gray-600";
  const changeSign = feature.change > 0 ? "+" : "";

  return (
    <div className="p-4 border border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="text-sm font-semibold text-gray-900 flex-1">{feature.name}</h4>
          <TrendIcon trend={feature.trend} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Users className="size-3 text-gray-500" />
              <p className="text-xs text-gray-500">Active Users</p>
            </div>
            <p className="text-xl font-semibold text-gray-900">{feature.users.toLocaleString()}</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="size-3 text-gray-500" />
              <p className="text-xs text-gray-500">Sessions</p>
            </div>
            <p className="text-xl font-semibold text-gray-900">{feature.sessions.toLocaleString()}</p>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Period change</span>
            <span className={`text-sm font-semibold ${changeColor}`}>
              {changeSign}
              {feature.change.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductUsageBlock: React.FC<ProductUsageBlockProps> = ({ title, result, onDeepDive }) => {
  const [isHighlighted, setIsHighlighted] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const { usageData } = result;
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

  if (!usageData) {
    return (
      <div className="group relative pl-6">
        <BlockHandle onClick={handleHandleClick} />
        <div className="border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500">No usage data available</p>
        </div>
      </div>
    );
  }

  const engagementRate = ((usageData.activeUsers / usageData.totalUsers) * 100).toFixed(1);

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
            <p className="text-xs text-gray-500 mb-1">Total Users</p>
            <p className="text-xl font-semibold text-gray-900">{usageData.totalUsers.toLocaleString()}</p>
          </div>
          <div className={`p-3 border border-gray-100 ${isHighlighted ? "bg-gray-200" : "bg-gray-50"}`}>
            <p className="text-xs text-gray-500 mb-1">Active Users</p>
            <p className="text-xl font-semibold text-gray-900">{usageData.activeUsers.toLocaleString()}</p>
          </div>
          <div className={`p-3 border border-gray-100 ${isHighlighted ? "bg-gray-200" : "bg-gray-50"}`}>
            <p className="text-xs text-gray-500 mb-1">Engagement Rate</p>
            <p className="text-xl font-semibold text-green-600">{engagementRate}%</p>
          </div>
          <div className={`p-3 border border-gray-100 ${isHighlighted ? "bg-gray-200" : "bg-gray-50"}`}>
            <p className="text-xs text-gray-500 mb-1">Top Features</p>
            <p className="text-sm font-semibold text-gray-900">{usageData.topFeatures.length} tracked</p>
          </div>
        </div>

        {/* Top Features */}
        {usageData.topFeatures.length > 0 && (
          <div
            className={`p-3 border mb-4 ${isHighlighted ? "bg-blue-100 border-blue-200" : "bg-blue-50 border-blue-100"}`}
          >
            <p className="text-xs font-medium text-blue-900 mb-2">Most Popular Features</p>
            <div className="flex flex-wrap gap-2">
              {usageData.topFeatures.map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  {index + 1}. {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Feature Usage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {usageData.features.map((feature, index) => (
            <FeatureUsageCard key={index} feature={feature} />
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
