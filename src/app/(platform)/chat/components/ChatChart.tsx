/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable consistent-return */
/* eslint-disable id-length */
/* eslint-disable complexity */
"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { ChartData } from "~mocks/chat-data";

import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

interface ChatChartProps {
  data: ChartData;
}

export const ChatChart: React.FC<ChatChartProps> = ({ data }) => {
  const colors = data.colors ?? ["#0f172a", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];

  const getChartOption = (): EChartsOption | null => {
    const baseTooltip = {
      backgroundColor: "#fff",
      borderColor: "#e2e8f0",
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      textStyle: { color: "#111827" },
    };

    const baseLegend = data.legend
      ? ({
          bottom: 0,
          left: "center",
          itemGap: 20,
          textStyle: {
            color: "#64748b",
            fontSize: 12,
          },
        } as const)
      : undefined;

    const baseGrid = {
      left: "3%",
      right: "4%",
      bottom: data.legend ? "15%" : "3%",
      top: "5%",
      containLabel: true,
    };

    switch (data.type) {
      case "line": {
        const hasTarget = data.data[0] && "target" in data.data[0];
        const lineOption: EChartsOption = {
          tooltip: {
            ...baseTooltip,
            trigger: "axis",
          },
          grid: baseGrid,
          xAxis: {
            type: "category",
            data: data.data
              .map((item) => item[data.xKey ?? "x"])
              .filter((val): val is number | string => val !== undefined),
            axisLabel: { color: "#64748b", fontSize: 12 },
            axisLine: { lineStyle: { color: "#e2e8f0" } },
          },
          yAxis: {
            type: "value",
            axisLabel: { color: "#64748b", fontSize: 12 },
            splitLine: { lineStyle: { color: "#e2e8f0", type: "dashed" } },
          },
          series: [
            {
              name: data.yKey ?? "y",
              type: "line",
              data: data.data.map((item) => item[data.yKey ?? "y"]).filter((val): val is number => val !== undefined),
              smooth: true,
              lineStyle: { color: colors[0] ?? "#3b82f6", width: 2 },
              itemStyle: { color: colors[0] ?? "#3b82f6" },
              symbol: "circle",
              symbolSize: 4,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: "rgba(0, 0, 0, 0.3)",
                },
              },
            },
          ],
        };
        if (hasTarget) {
          const seriesArray = lineOption.series as Array<{
            name?: string;
            type: string;
            data: unknown[];
            lineStyle?: object;
            itemStyle?: object;
            symbol?: string;
          }>;
          const targetData = data.data.map((item) => {
            if (typeof item === "object" && item !== null && "target" in item) {
              return item["target"] as number | undefined;
            }
            return undefined;
          });
          seriesArray.push({
            name: "target",
            type: "line",
            data: targetData,
            lineStyle: { color: "#94a3b8", width: 2, type: "dashed" },
            itemStyle: { color: "#94a3b8" },
            symbol: "none",
          });
        }
        if (baseLegend) {
          lineOption.legend = baseLegend;
        }
        return lineOption;
      }

      case "bar": {
        const yKeys = data.yKeys && data.yKeys.length > 0 ? data.yKeys : [data.yKey ?? "y"];
        const barOption: EChartsOption = {
          tooltip: {
            ...baseTooltip,
            trigger: "axis",
            axisPointer: { type: "shadow" },
          },
          grid: baseGrid,
          xAxis: {
            type: "category",
            data: data.data
              .map((item) => item[data.xKey ?? "x"])
              .filter((val): val is number | string => val !== undefined),
            axisLabel: { color: "#64748b", fontSize: 12 },
            axisLine: { lineStyle: { color: "#e2e8f0" } },
          },
          yAxis: {
            type: "value",
            axisLabel: { color: "#64748b", fontSize: 12 },
            splitLine: { lineStyle: { color: "#e2e8f0", type: "dashed" } },
          },
          series: yKeys.map((key, index) => ({
            name: key,
            type: "bar",
            data: data.data.map((item) => item[key]).filter((val): val is number => val !== undefined),
            itemStyle: {
              color: colors[index % colors.length] ?? "#3b82f6",
              borderRadius: [4, 4, 0, 0],
            },
          })),
        };
        if (baseLegend) {
          barOption.legend = baseLegend;
        }
        return barOption;
      }

      case "pie": {
        const pieOption: EChartsOption = {
          tooltip: {
            ...baseTooltip,
            trigger: "item",
            formatter: (params: unknown) => {
              if (typeof params !== "object" || params === null) return "";
              const paramsObj = params as {
                value?: number | string;
                name?: string;
                percent?: number;
                color?: string;
              };
              const value =
                typeof paramsObj.value === "number" ? paramsObj.value.toLocaleString() : String(paramsObj.value ?? "");
              const name = String(paramsObj.name ?? "");
              const percent = Number(paramsObj.percent ?? 0);
              const color = String(paramsObj.color ?? "#3b82f6");
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
            },
          },
          series: [
            {
              type: "pie",
              radius: "60%",
              center: ["50%", data.legend ? "45%" : "50%"],
              data: data.data.map((item, index) => ({
                name: String(item["name"] ?? ""),
                value: Number(item["value"] ?? 0),
                itemStyle: { color: colors[index % colors.length] ?? "#3b82f6" },
              })),
              label: {
                show: true,
                formatter: "{b}: {d}%",
                fontSize: 12,
                color: "#64748b",
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
        if (baseLegend) {
          pieOption.legend = baseLegend;
        }
        return pieOption;
      }

      case "area": {
        const areaOption: EChartsOption = {
          tooltip: {
            ...baseTooltip,
            trigger: "axis",
          },
          grid: baseGrid,
          xAxis: {
            type: "category",
            data: data.data
              .map((item) => item[data.xKey ?? "x"])
              .filter((val): val is number | string => val !== undefined),
            axisLabel: { color: "#64748b", fontSize: 12 },
            axisLine: { lineStyle: { color: "#e2e8f0" } },
            boundaryGap: false,
          },
          yAxis: {
            type: "value",
            axisLabel: { color: "#64748b", fontSize: 12 },
            splitLine: { lineStyle: { color: "#e2e8f0", type: "dashed" } },
          },
          series: [
            {
              name: data.yKey ?? "y",
              type: "line",
              data: data.data.map((item) => item[data.yKey ?? "y"]).filter((val): val is number => val !== undefined),
              smooth: true,
              areaStyle: { opacity: 0.2 },
              lineStyle: { color: colors[0] ?? "#3b82f6", width: 2 },
              itemStyle: { color: colors[0] ?? "#3b82f6" },
            },
          ],
        };
        if (baseLegend) {
          areaOption.legend = baseLegend;
        }
        return areaOption;
      }

      case "funnel": {
        return {
          tooltip: {
            ...baseTooltip,
            trigger: "axis",
            axisPointer: { type: "shadow" },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            top: "5%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            axisLabel: { color: "#64748b", fontSize: 12 },
            splitLine: { lineStyle: { color: "#e2e8f0", type: "dashed" } },
          },
          yAxis: {
            type: "category",
            data: data.data.map((item) => String(item["stage"] ?? "")).filter((val) => val !== ""),
            axisLabel: { color: "#64748b", fontSize: 12 },
            axisLine: { lineStyle: { color: "#e2e8f0" } },
          },
          series: [
            {
              type: "bar",
              data: data.data.map((item) => Number(item["count"] ?? 0)).filter((val) => val !== 0),
              itemStyle: {
                color: colors[0] ?? "#3b82f6",
                borderRadius: [0, 4, 4, 0],
              },
            },
          ],
        };
      }

      default:
        return null;
    }
  };

  const option = getChartOption();

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {option && <ReactECharts option={option} style={{ height: "300px", width: "100%" }} />}
      </CardContent>
    </Card>
  );
};
