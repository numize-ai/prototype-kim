"use client";

import React from "react";

import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

import { motion } from "framer-motion";
import { Info, Minus, TrendingDown, TrendingUp } from "lucide-react";

interface MarketingMetricCardProps {
  name: string;
  value: number | string;
  previousValue?: number | string;
  delta?: number;
  trend?: "down" | "neutral" | "up";
  format: "currency" | "number" | "percentage" | "ratio";
  platform?: "all" | "google" | "meta";
  description?: string;
  sparklineData?: number[];
  onClick?: () => void;
  className?: string;
}

/**
 * MarketingMetricCard - Marketing-specific metric card with trends
 *
 * Displays single marketing metric with trend indicators, optional sparkline chart,
 * and platform badge. Similar to MetricCard but optimized for marketing metrics.
 *
 * @example
 * <MarketingMetricCard
 *   name="ROAS"
 *   value={13.79}
 *   previousValue={12.21}
 *   delta={12.9}
 *   trend="up"
 *   format="ratio"
 *   platform="meta"
 *   description="Return on Ad Spend for Meta campaigns"
 *   sparklineData={[10.2, 11.5, 12.1, 11.8, 13.2, 13.5, 13.79]}
 *   onClick={() => handleDrillDown('roas-meta')}
 * />
 *
 * <MarketingMetricCard
 *   name="CAC"
 *   value={373.91}
 *   previousValue={402.11}
 *   delta={-7.0}
 *   trend="down"
 *   format="currency"
 *   platform="all"
 *   description="Customer Acquisition Cost across all platforms"
 * />
 */
// eslint-disable-next-line complexity -- Component requires multiple conditional checks for formatting and display logic
export const MarketingMetricCard: React.FC<MarketingMetricCardProps> = ({
  name,
  value,
  previousValue,
  delta,
  trend,
  format,
  platform,
  description,
  sparklineData,
  onClick,
  className = "",
}) => {
  const formatValue = (val: number | string, formatType: string): string => {
    if (typeof val === "string") return val;

    switch (formatType) {
      case "currency":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(val);
      case "ratio":
        return `${val.toFixed(2)}x`;
      case "percentage":
        return `${val.toFixed(1)}%`;
      case "number":
        return val.toLocaleString();
      default:
        return val.toString();
    }
  };

  const getTrendIcon = (): React.ReactElement | null => {
    if (trend === undefined) return null;
    if (trend === "up") return <TrendingUp className="size-4" />;
    if (trend === "down") return <TrendingDown className="size-4" />;
    return <Minus className="size-4" />;
  };

  const getTrendColor = (): string => {
    if (trend === undefined) return "text-slate-600";

    // For negative metrics (CAC, CPA, spend), down is good
    const isNegativeMetric =
      name.toLowerCase().includes("cac") || name.toLowerCase().includes("cpa") || name.toLowerCase().includes("cost");

    if (isNegativeMetric) {
      return trend === "down" ? "text-green-600" : "text-red-600";
    }

    // For positive metrics (ROAS, leads, deals), up is good
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  const getPlatformBadge = (): React.ReactElement | null => {
    if (platform === undefined) return null;

    switch (platform) {
      case "meta":
        return <Badge variant="default">Meta</Badge>;
      case "google":
        return <Badge variant="secondary">Google</Badge>;
      case "all":
        return <Badge variant="outline">All Platforms</Badge>;
      default:
        return null;
    }
  };

  const MiniSparkline: React.FC<{ data: number[] }> = ({ data }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    const points = data
      .map((val, index) => {
        const xCoord = (index / (data.length - 1)) * 96;
        const yCoord = 40 - ((val - min) / range) * 40;
        return `${xCoord},${yCoord}`;
      })
      .join(" ");

    const trendColor = getTrendColor();
    let color = "#64748b"; // default slate
    if (trendColor.includes("green")) {
      color = "#16a34a";
    } else if (trendColor.includes("red")) {
      color = "#dc2626";
    }

    return (
      <svg width="96" height="40" className="overflow-visible">
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

  const hasClickHandler = onClick !== undefined;

  return (
    <motion.div whileHover={{ scale: hasClickHandler ? 1.02 : 1 }} transition={{ duration: 0.2 }} className={className}>
      <Card
        className={`hover:shadow-md transition-shadow h-full ${hasClickHandler ? "cursor-pointer" : ""}`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-sm font-medium text-slate-600">{name}</CardTitle>
              {platform !== undefined && getPlatformBadge()}
            </div>

            {description !== undefined && description !== "" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                      <Info className="size-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Value */}
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{formatValue(value, format)}</span>
          </div>

          {/* Trend and sparkline */}
          <div className="flex items-center justify-between">
            {delta !== undefined && trend !== undefined && (
              <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
                {getTrendIcon()}
                <span>{Math.abs(delta).toFixed(1)}%</span>
              </div>
            )}

            {sparklineData !== undefined && sparklineData.length > 0 && (
              <div className="h-10 w-24">
                <MiniSparkline data={sparklineData} />
              </div>
            )}
          </div>

          {/* Previous value comparison (optional) */}
          {previousValue !== undefined && (
            <div className="text-xs text-slate-500 pt-2 border-t">Previous: {formatValue(previousValue, format)}</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
