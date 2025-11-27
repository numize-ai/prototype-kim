"use client";

import React from "react";

import { motion } from "framer-motion";

interface FunnelChartProps {
  data: Array<{
    stage: string;
    count: number;
    conversionRate?: number;
  }>;
  className?: string;
}

/**
 * FunnelChart - Visual funnel showing conversion from impressions to deals closed
 *
 * Displays a funnel visualization with stages, counts, and conversion rates.
 * Each stage animates in with a stagger effect.
 *
 * @example
 * <FunnelChart data={[
 *   { stage: 'Impressions', count: 500000 },
 *   { stage: 'Clicks', count: 166670, conversionRate: 33.3 },
 *   { stage: 'Leads', count: 103, conversionRate: 0.06 }
 * ]} />
 */
export const FunnelChart: React.FC<FunnelChartProps> = ({ data, className = "" }) => {
  const maxCount = data[0]?.count ?? 1;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className={`w-full py-6 ${className}`}>
      <div className="flex flex-col gap-3 md:gap-4">
        {data.map((stage, index) => {
          const widthPercentage = (stage.count / maxCount) * 100;
          const minWidth = 20; // Minimum width percentage for visibility
          const adjustedWidth = Math.max(minWidth, widthPercentage);

          // Color gradient from slate to blue
          const colorClasses = [
            "bg-slate-600",
            "bg-slate-500",
            "bg-blue-700",
            "bg-blue-600",
            "bg-blue-500",
            "bg-blue-600",
          ];
          const colorClass = colorClasses[index] ?? "bg-blue-600";

          return (
            /* eslint-disable id-length -- Framer Motion uses 'x' as a valid prop name for X-axis animation */
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative"
            >
              {/* eslint-enable id-length */}
              {/* Funnel stage bar */}
              <div
                className={`${colorClass} rounded-lg py-4 px-6 shadow-md transition-all hover:shadow-lg hover:scale-[1.02] group relative overflow-hidden`}
                style={{ width: `${adjustedWidth}%` }}
              >
                {/* Stage name and count */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex flex-col">
                    <span className="text-sm md:text-base font-semibold">{stage.stage}</span>
                    <span className="text-xs md:text-sm opacity-90">
                      {formatNumber(stage.count)} {stage.count === 1 ? "item" : "items"}
                    </span>
                  </div>
                  {stage.conversionRate !== undefined && (
                    <div className="text-right">
                      <span className="text-lg md:text-xl font-bold">{stage.conversionRate.toFixed(1)}%</span>
                      <span className="text-xs block opacity-90">conversion</span>
                    </div>
                  )}
                </div>

                {/* Hover tooltip */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* Conversion arrow connector (except for last stage) */}
              {index < data.length - 1 && (
                <div className="flex items-center justify-center py-1">
                  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="text-slate-400">
                    <path
                      d="M12 0L12 12M12 12L8 8M12 12L16 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Mobile-friendly stack note */}
      <div className="mt-6 text-xs text-slate-500 text-center">
        Each stage shows count and conversion rate from previous stage
      </div>
    </div>
  );
};
