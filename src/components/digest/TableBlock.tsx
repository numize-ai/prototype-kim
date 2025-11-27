"use client";

import React from "react";

import { BaseBlock } from "~components/digest/BaseBlock";
import type { BlockResult, FeatureUsage } from "~mocks/digest-data";

import { ArrowDown, ArrowUp, Minus, TrendingUp, Users } from "lucide-react";

interface TableBlockProps {
  title: string;
  result: BlockResult;
  onDeepDive?: () => void;
}

const TrendIcon: React.FC<{ trend: "down" | "stable" | "up" }> = ({ trend }) => {
  switch (trend) {
    case "up":
      return <ArrowUp className="size-4 text-green-600" />;
    case "down":
      return <ArrowDown className="size-4 text-red-600" />;
    case "stable":
    default:
      return <Minus className="size-4 text-gray-400" />;
  }
};

const FeatureUsageCard: React.FC<{ feature: FeatureUsage }> = ({ feature }) => {
  let changeColor = "text-gray-600";
  if (feature.change > 0) {
    changeColor = "text-green-600";
  } else if (feature.change < 0) {
    changeColor = "text-red-600";
  }
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

export const TableBlock: React.FC<TableBlockProps> = ({ title, result, onDeepDive }) => {
  // Support both legacy usageData and new tableData
  const { tableData } = result;
  const { usageData } = result;

  if (tableData === undefined && usageData === undefined) {
    return (
      <BaseBlock
        title={title}
        blockType="table"
        updatedAt={result.executedAt}
        confidenceScore={result.confidenceScore}
        onDeepDive={onDeepDive}
      >
        <div className="py-8 text-center border border-dashed border-gray-200 bg-gray-50/50">
          <p className="text-sm font-medium text-gray-900 mb-1">No table data available</p>
          <p className="text-xs text-gray-500">Configure data sources to display tables</p>
        </div>
      </BaseBlock>
    );
  }

  // For now, render usage data visualization (legacy support)
  if (usageData !== undefined) {
    const engagementRate = ((usageData.activeUsers / usageData.totalUsers) * 100).toFixed(1);

    return (
      <BaseBlock
        title={title}
        blockType="table"
        updatedAt={result.executedAt}
        confidenceScore={result.confidenceScore}
        onDeepDive={onDeepDive}
      >
        {({ isHighlighted }) => (
          <>
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
          </>
        )}
      </BaseBlock>
    );
  }

  // Render generic table data
  if (tableData === undefined) {
    return (
      <BaseBlock
        title={title}
        blockType="table"
        updatedAt={result.executedAt}
        confidenceScore={result.confidenceScore}
        onDeepDive={onDeepDive}
      >
        <div className="py-8 text-center border border-dashed border-gray-200 bg-gray-50/50">
          <p className="text-sm font-medium text-gray-900 mb-1">No table data available</p>
          <p className="text-xs text-gray-500">Configure data sources to display tables</p>
        </div>
      </BaseBlock>
    );
  }

  const formatCellValue = (value: number | string | undefined, type: string): string => {
    if (value === undefined) {
      return "-";
    }
    if (typeof value === "number") {
      switch (type) {
        case "currency":
          return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
        case "percentage":
          return `${value.toFixed(1)}%`;
        case "number":
          return value.toLocaleString();
        default:
          return String(value);
      }
    }
    return String(value);
  };

  return (
    <BaseBlock
      title={title}
      blockType="table"
      updatedAt={result.executedAt}
      confidenceScore={result.confidenceScore}
      onDeepDive={onDeepDive}
    >
      {({ isHighlighted }) => (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b-2 ${isHighlighted ? "border-gray-300" : "border-gray-200"}`}>
                {tableData.columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableData.rows.map((row) => (
                <tr
                  key={row.id}
                  className={`transition-colors ${isHighlighted ? "hover:bg-gray-100" : "hover:bg-gray-50"}`}
                >
                  {tableData.columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                      {formatCellValue(row.cells[column.key], column.type)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {tableData.totalRows !== undefined && tableData.totalRows > tableData.rows.length && (
            <div className="mt-2 px-4 py-2 text-xs text-gray-500 text-center border-t border-gray-100">
              Showing {tableData.rows.length} of {tableData.totalRows} rows
            </div>
          )}
        </div>
      )}
    </BaseBlock>
  );
};
