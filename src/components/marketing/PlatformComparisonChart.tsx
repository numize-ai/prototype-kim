/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

  const chartData = [
    {
      name: getCurrentMetric().label,
      Meta: metaData[selectedMetric as keyof typeof metaData],
      Google: googleData[selectedMetric as keyof typeof googleData],
    },
  ];

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

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active: boolean;
    payload: Array<{ name: string; value: number; color: string }> | undefined;
  }): React.ReactElement | null => {
    if (!active || payload === undefined) return null;

    const metricConfig = getCurrentMetric();

    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-semibold text-slate-900 mb-2">{metricConfig.label} Comparison</p>
        {payload.map((entry, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4 mb-1">
            <span className="text-sm" style={{ color: entry.color }}>
              {entry.name}:
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {formatValue(entry.value, metricConfig.format)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const getYAxisLabel = (): string => {
    const metricConfig = getCurrentMetric();
    switch (metricConfig.format) {
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
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={{ stroke: "#cbd5e1" }} />
          <YAxis
            label={{
              value: getYAxisLabel(),
              angle: -90,
              position: "insideLeft",
              style: { fill: "#64748b", fontSize: 12 },
            }}
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={{ stroke: "#cbd5e1" }}
            tickFormatter={(value) => {
              const metricConfig = getCurrentMetric();
              if (metricConfig.format === "currency") {
                return `€${(value / 1000).toFixed(0)}K`;
              }
              if (metricConfig.format === "ratio") {
                return `${value.toFixed(1)}x`;
              }
              return value.toLocaleString();
            }}
          />
          <Tooltip
            content={<CustomTooltip active={false} payload={undefined} />}
            cursor={{ fill: "rgba(226, 232, 240, 0.3)" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="circle"
            formatter={(value) => <span className="text-sm text-slate-700">{value}</span>}
          />
          <Bar dataKey="Meta" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Google" fill="#ef4444" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

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
