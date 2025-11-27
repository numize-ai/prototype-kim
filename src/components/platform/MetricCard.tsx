"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import type { MetricCard as MetricCardType } from "~mocks/saas-metrics";

import { Info, Minus, TrendingDown, TrendingUp } from "lucide-react";

interface MiniSparklineProps {
  data: number[];
  trend: "down" | "neutral" | "up";
}

const MiniSparkline: React.FC<MiniSparklineProps> = ({ data, trend }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data
    .map((value, index) => {
      const xCoord = (index / (data.length - 1)) * 96;
      const yCoord = 32 - ((value - min) / range) * 32;
      return `${xCoord},${yCoord}`;
    })
    .join(" ");

  let color: string;
  if (trend === "up") {
    color = "#16a34a";
  } else if (trend === "down") {
    color = "#dc2626";
  } else {
    color = "#64748b";
  }

  return (
    <svg width="96" height="32" className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface MetricCardProps {
  metric: MetricCardType;
  onViewDetails?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, onViewDetails }) => {
  const getTrendIcon = (): React.ReactElement => {
    if (metric.trend === "up") return <TrendingUp className="size-4" />;
    if (metric.trend === "down") return <TrendingDown className="size-4" />;
    return <Minus className="size-4" />;
  };

  const getTrendColor = (): string => {
    if (metric.category === "retention" || metric.category === "efficiency") {
      // For churn/CAC metrics, down is good
      if (metric.id.includes("churn") || metric.id.includes("cac") || metric.id.includes("payback")) {
        return metric.trend === "down" ? "text-green-600" : "text-red-600";
      }
    }
    // For most metrics, up is good
    if (metric.trend === "up") return "text-green-600";
    if (metric.trend === "down") return "text-red-600";
    return "text-slate-600";
  };

  const formatValue = (value: number | string): string => {
    if (typeof value === "string") return value;
    return value.toLocaleString();
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onViewDetails}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium text-slate-600">{metric.name}</CardTitle>
          {metric.description !== undefined && metric.description !== "" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <Info className="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{metric.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">{formatValue(metric.value)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{Math.abs(metric.delta).toFixed(1)}%</span>
          </div>

          {metric.sparklineData !== undefined && metric.sparklineData.length > 0 && (
            <div className="h-8 w-24">
              <MiniSparkline data={metric.sparklineData} trend={metric.trend} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
