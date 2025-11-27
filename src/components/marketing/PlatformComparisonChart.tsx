/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import React, { useState } from "react";

import { Button } from "~/components/ui/button";

import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

interface PlatformComparisonChartProps {
  metaData: {
    spend: number;
    roas: number;
    cac: number;
    leads: number;
    deals: number;
  };
  googleData: {
    spend: number;
    roas: number;
    cac: number;
    leads: number;
    deals: number;
  };
  metric?: "cac" | "deals" | "leads" | "roas" | "spend";
  className?: string;
}

/**
 * PlatformComparisonChart - Side-by-side comparison of Meta vs Google performance
 *
 * Grouped bar chart comparing platform metrics with selector to switch between different metrics.
 * Uses Recharts for visualization.
 *
 * @example
 * <PlatformComparisonChart
 *   metaData={{
 *     spend: 16200,
 *     roas: 13.79,
 *     cac: 404.59,
 *     leads: 52,
 *     deals: 13
 *   }}
 *   googleData={{
 *     spend: 17000,
 *     roas: 11.77,
 *     cac: 333.33,
 *     leads: 51,
 *     deals: 10
 *   }}
 *   metric="roas"
 * />
 */
export const PlatformComparisonChart: React.FC<PlatformComparisonChartProps> = ({
  metaData,
  googleData,
  metric = "roas",
  className = "",
}) => {
  const [selectedMetric, setSelectedMetric] = useState<string>(metric);

  const metrics = [
    { key: "spend", label: "Spend", format: "currency" },
    { key: "roas", label: "ROAS", format: "ratio" },
    { key: "cac", label: "CAC", format: "currency" },
    { key: "leads", label: "Leads", format: "number" },
    { key: "deals", label: "Deals", format: "number" },
  ];

  const getCurrentMetric = (): { key: string; label: string; format: string } => {
    const found = metrics.find((metricOption) => metricOption.key === selectedMetric);
    if (found === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return metrics[1]!;
    }
    return found;
  };

  const formatValue = (value: number, format: string): string => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      case "ratio":
        return `${value.toFixed(2)}x`;
      case "number":
        return value.toLocaleString();
      default:
        return value.toString();
    }
  };

  const getYAxisLabel = (): string => {
    const currentMetricConfig = getCurrentMetric();
    switch (currentMetricConfig.format) {
      case "currency":
        return "Amount (€)";
      case "ratio":
        return "Ratio (x)";
      case "number":
        return "Count";
      default:
        return "Value";
    }
  };

  const metricConfig = getCurrentMetric();
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      textStyle: { color: "#111827" },
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "rgba(226, 232, 240, 0.3)",
        },
      },
      formatter: (params) => {
        if (!Array.isArray(params)) return "";
        let result = `<div style="font-size: 12px; font-weight: 600; margin-bottom: 8px;">${metricConfig.label} Comparison</div>`;
        params.forEach((param) => {
          const value = typeof param.value === "number" ? formatValue(param.value, metricConfig.format) : param.value;
          const colorValue = typeof param.color === "string" ? param.color : "#3b82f6";
          result += `<div style="display: flex; align-items: center; justify-between; gap: 16px; margin-bottom: 4px;">
            <span style="font-size: 12px; color: ${colorValue};">${param.seriesName}:</span>
            <span style="font-size: 12px; font-weight: 600; color: #0f172a;">${value}</span>
          </div>`;
        });
        return result;
      },
    },
    legend: {
      bottom: 0,
      left: "center",
      itemGap: 20,
      textStyle: {
        color: "#475569",
        fontSize: 12,
      },
      icon: "circle",
    },
    grid: {
      left: 60,
      right: 30,
      bottom: 60,
      top: 20,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [metricConfig.label],
      axisLabel: {
        color: "#64748b",
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
    },
    yAxis: {
      type: "value",
      name: getYAxisLabel(),
      nameTextStyle: {
        color: "#64748b",
        fontSize: 12,
      },
      nameLocation: "middle",
      nameGap: 50,
      axisLabel: {
        color: "#64748b",
        fontSize: 12,
        formatter: (value: number) => {
          if (metricConfig.format === "currency") {
            return `€${(value / 1000).toFixed(0)}K`;
          }
          if (metricConfig.format === "ratio") {
            return `${value.toFixed(1)}x`;
          }
          return value.toLocaleString();
        },
      },
      axisLine: {
        lineStyle: {
          color: "#cbd5e1",
        },
      },
      splitLine: {
        lineStyle: {
          color: "#e2e8f0",
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "Meta",
        type: "bar",
        data: [metaData[selectedMetric as keyof typeof metaData]],
        itemStyle: {
          color: "#3b82f6",
          borderRadius: [8, 8, 0, 0],
        },
      },
      {
        name: "Google",
        type: "bar",
        data: [googleData[selectedMetric as keyof typeof googleData]],
        itemStyle: {
          color: "#ef4444",
          borderRadius: [8, 8, 0, 0],
        },
      },
    ],
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Metric selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {metrics.map((metricOption) => (
            <Button
              key={metricOption.key}
              variant={selectedMetric === metricOption.key ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedMetric(metricOption.key);
              }}
            >
              {metricOption.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ReactECharts option={option} style={{ height: "300px", width: "100%" }} />

      {/* Platform legend with totals */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <div className="size-3 rounded-full bg-blue-500" />
          <div>
            <p className="text-xs text-slate-600">Meta</p>
            <p className="text-lg font-bold text-slate-900">
              {formatValue(metaData[selectedMetric as keyof typeof metaData], getCurrentMetric().format)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
          <div className="size-3 rounded-full bg-red-500" />
          <div>
            <p className="text-xs text-slate-600">Google</p>
            <p className="text-lg font-bold text-slate-900">
              {formatValue(googleData[selectedMetric as keyof typeof googleData], getCurrentMetric().format)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
