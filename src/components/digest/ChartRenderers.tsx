/* eslint-disable max-lines */
"use client";

import React from "react";

import type { ChartData } from "~mocks/digest-data";

import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

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

export const BarChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      textStyle: { color: "#111827" },
      axisPointer: {
        type: "shadow",
      },
      formatter: (params) => {
        if (!Array.isArray(params)) return "";
        const label = String(params[0]?.name ?? "");
        let result = `<div style="font-size: 12px; font-weight: 600; margin-bottom: 8px;">${label}</div>`;
        params.forEach((param) => {
          const value = typeof param.value === "number" ? param.value.toLocaleString() : String(param.value ?? "");
          const color = String(param.color ?? "#3b82f6");
          const seriesName = String(param.seriesName ?? "");
          result += `<div style="display: flex; align-items: center; gap: 8px; font-size: 12px; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; border-radius: 2px; background-color: ${color};"></div>
            <span style="color: #6b7280;">${seriesName}:</span>
            <span style="font-weight: 600; color: #111827;">${value}</span>
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
        color: "#374151",
        fontSize: 12,
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: chartData.labels,
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: "#e5e7eb",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
        formatter: formatLargeNumber,
      },
      splitLine: {
        lineStyle: {
          color: "#e5e7eb",
          type: "dashed",
        },
      },
    },
    series: chartData.datasets.map((dataset, index) => ({
      name: dataset.label,
      type: "bar",
      data: dataset.data,
      itemStyle: {
        color: dataset.color ?? COLOR_PALETTE[index % COLOR_PALETTE.length] ?? "#3b82f6",
        borderRadius: [4, 4, 0, 0],
      },
    })),
  };

  return (
    <div className="space-y-4">
      <ReactECharts option={option} style={{ height: "350px", width: "100%" }} />
    </div>
  );
};

export const PieChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const firstDataset = chartData.datasets[0];
  if (firstDataset === undefined) {
    return null;
  }

  const pieData = chartData.labels.map((label, index) => ({
    name: label,
    value: firstDataset.data[index] ?? 0,
  }));

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
      backgroundColor: "#fff",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      textStyle: { color: "#111827" },
      formatter: (params) => {
        if (typeof params === "object" && "name" in params && "value" in params && "percent" in params) {
          const value = typeof params.value === "number" ? params.value.toLocaleString() : String(params.value ?? "");
          const color = String(params.color ?? "#3b82f6");
          const name = String(params.name);
          const percent = Number(params.percent ?? 0);
          return `<div style="font-size: 12px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <div style="width: 12px; height: 12px; border-radius: 2px; background-color: ${color};"></div>
              <span style="color: #6b7280;">${name}:</span>
              <span style="font-weight: 600; color: #111827;">${value}</span>
            </div>
            <div style="margin-left: 20px; color: #6b7280;">
              ${percent}%
            </div>
          </div>`;
        }
        return "";
      },
    },
    legend: {
      bottom: 0,
      left: "center",
      itemGap: 20,
      textStyle: {
        color: "#374151",
        fontSize: 12,
      },
    },
    series: [
      {
        type: "pie",
        radius: "60%",
        center: ["50%", "45%"],
        data: pieData.map((item, index) => ({
          ...item,
          itemStyle: {
            color: COLOR_PALETTE[index % COLOR_PALETTE.length] ?? "#3b82f6",
          },
        })),
        label: {
          show: true,
          formatter: "{b}: {d}%",
          fontSize: 12,
          color: "#374151",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div className="space-y-4">
      <ReactECharts option={option} style={{ height: "350px", width: "100%" }} />
    </div>
  );
};

export const LineChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      textStyle: { color: "#111827" },
      formatter: (params) => {
        if (!Array.isArray(params)) return "";
        const label = String(params[0]?.name ?? "");
        let result = `<div style="font-size: 12px; font-weight: 600; margin-bottom: 8px;">${label}</div>`;
        params.forEach((param) => {
          const value = typeof param.value === "number" ? param.value.toLocaleString() : String(param.value ?? "");
          const color = String(param.color ?? "#3b82f6");
          const seriesName = String(param.seriesName ?? "");
          result += `<div style="display: flex; align-items: center; gap: 8px; font-size: 12px; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; border-radius: 2px; background-color: ${color};"></div>
            <span style="color: #6b7280;">${seriesName}:</span>
            <span style="font-weight: 600; color: #111827;">${value}</span>
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
        color: "#374151",
        fontSize: 12,
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: chartData.labels,
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: "#e5e7eb",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
        formatter: formatLargeNumber,
      },
      splitLine: {
        lineStyle: {
          color: "#e5e7eb",
          type: "dashed",
        },
      },
    },
    series: chartData.datasets.map((dataset, index) => ({
      name: dataset.label,
      type: "line",
      data: dataset.data,
      smooth: true,
      lineStyle: {
        color: dataset.color ?? COLOR_PALETTE[index % COLOR_PALETTE.length] ?? "#3b82f6",
        width: 2,
      },
      itemStyle: {
        color: dataset.color ?? COLOR_PALETTE[index % COLOR_PALETTE.length] ?? "#3b82f6",
      },
      symbol: "circle",
      symbolSize: 4,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)",
        },
      },
    })),
  };

  return (
    <div className="space-y-4">
      <ReactECharts option={option} style={{ height: "350px", width: "100%" }} />
    </div>
  );
};

export const AreaChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#fff",
      borderColor: "#e5e7eb",
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      textStyle: { color: "#111827" },
      formatter: (params) => {
        if (!Array.isArray(params)) return "";
        const label = String(params[0]?.name ?? "");
        let result = `<div style="font-size: 12px; font-weight: 600; margin-bottom: 8px;">${label}</div>`;
        params.forEach((param) => {
          const value = typeof param.value === "number" ? param.value.toLocaleString() : String(param.value ?? "");
          const color = String(param.color ?? "#3b82f6");
          const seriesName = String(param.seriesName ?? "");
          result += `<div style="display: flex; align-items: center; gap: 8px; font-size: 12px; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; border-radius: 2px; background-color: ${color};"></div>
            <span style="color: #6b7280;">${seriesName}:</span>
            <span style="font-weight: 600; color: #111827;">${value}</span>
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
        color: "#374151",
        fontSize: 12,
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: chartData.labels,
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: "#e5e7eb",
        },
      },
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#6b7280",
        fontSize: 12,
        formatter: formatLargeNumber,
      },
      splitLine: {
        lineStyle: {
          color: "#e5e7eb",
          type: "dashed",
        },
      },
    },
    series: chartData.datasets.map((dataset, index) => ({
      name: dataset.label,
      type: "line",
      data: dataset.data,
      smooth: true,
      areaStyle: {
        opacity: 0.6,
      },
      lineStyle: {
        color: dataset.color ?? COLOR_PALETTE[index % COLOR_PALETTE.length] ?? "#3b82f6",
        width: 2,
      },
      itemStyle: {
        color: dataset.color ?? COLOR_PALETTE[index % COLOR_PALETTE.length] ?? "#3b82f6",
      },
    })),
  };

  return (
    <div className="space-y-4">
      <ReactECharts option={option} style={{ height: "350px", width: "100%" }} />
    </div>
  );
};
