"use client";

import React from "react";

import type { ChartData } from "~mocks/digest-data";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Define color palette for charts
const CHART_COLORS = {
  primary: "#3b82f6", // blue-500
  secondary: "#8b5cf6", // violet-500
  tertiary: "#10b981", // green-500
  quaternary: "#f59e0b", // amber-500
  quinary: "#ec4899", // pink-500
  senary: "#06b6d4", // cyan-500
  gray: "#94a3b8", // slate-400
};

export const COLOR_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.tertiary,
  CHART_COLORS.quaternary,
  CHART_COLORS.quinary,
  CHART_COLORS.senary,
];

// Custom tooltip for Recharts
interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{
    color: string;
    dataKey: string;
    name: string;
    payload: Record<string, number | string>;
    value: number;
  }>;
  valueFormatter?: (value: number) => string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, label, payload, valueFormatter }) => {
  if (active === true && payload !== undefined && payload.length > 0) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-lg">
        {label !== undefined && label !== "" && <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>}
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-semibold text-gray-900">
              {valueFormatter === undefined ? entry.value.toLocaleString() : valueFormatter(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Format large numbers with K/M suffixes
const formatLargeNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString();
};

interface ChartRendererProps {
  chartData: ChartData;
}

export const BarChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => (
  <div className="space-y-4">
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={chartData.labels.map((label, index) => {
          const dataPoint: Record<string, number | string> = { name: label };
          chartData.datasets.forEach((dataset) => {
            dataPoint[dataset.label] = dataset.data[index] ?? 0;
          });
          return dataPoint;
        })}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
        <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={formatLargeNumber} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: "20px" }} />
        {chartData.datasets.map((dataset, index) => (
          <Bar
            key={dataset.label}
            dataKey={dataset.label}
            fill={dataset.color ?? COLOR_PALETTE[index % COLOR_PALETTE.length]}
            radius={[4, 4, 0, 0]}
            name={dataset.label}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const PieChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const firstDataset = chartData.datasets[0];
  if (firstDataset === undefined) {
    return null;
  }

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData.labels.map((label, index) => ({
              name: label,
              value: firstDataset.data[index] ?? 0,
            }))}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => {
              const percent = (entry["percent"] as number | undefined) ?? 0;
              const name = String(entry.name ?? "");
              return `${name}: ${(percent * 100).toFixed(0)}%`;
            }}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.labels.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const LineChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => (
  <div className="space-y-4">
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={chartData.labels.map((label, index) => {
          const dataPoint: Record<string, number | string> = { name: label };
          chartData.datasets.forEach((dataset) => {
            dataPoint[dataset.label] = dataset.data[index] ?? 0;
          });
          return dataPoint;
        })}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
        <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={formatLargeNumber} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
        {chartData.datasets.map((dataset, index) => (
          <Line
            key={dataset.label}
            type="monotone"
            dataKey={dataset.label}
            stroke={dataset.color ?? COLOR_PALETTE[index % COLOR_PALETTE.length]}
            strokeWidth={2}
            dot={{ radius: 4 }}
            activeDot={{ radius: 6 }}
            name={dataset.label}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export const AreaChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => (
  <div className="space-y-4">
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={chartData.labels.map((label, index) => {
          const dataPoint: Record<string, number | string> = { name: label };
          chartData.datasets.forEach((dataset) => {
            dataPoint[dataset.label] = dataset.data[index] ?? 0;
          });
          return dataPoint;
        })}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
        <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={formatLargeNumber} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="rect" />
        {chartData.datasets.map((dataset, index) => (
          <Area
            key={dataset.label}
            type="monotone"
            dataKey={dataset.label}
            stroke={dataset.color ?? COLOR_PALETTE[index % COLOR_PALETTE.length]}
            fill={dataset.color ?? COLOR_PALETTE[index % COLOR_PALETTE.length]}
            fillOpacity={0.6}
            strokeWidth={2}
            name={dataset.label}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
