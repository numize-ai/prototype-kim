"use client";

import React from "react";

import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, TrendingUp, X } from "lucide-react";

interface AttributionInsightProps {
  type: "attribution-insight" | "efficiency-recommendation" | "performance-alert";
  title: string;
  description: string;
  recommendation?: string;
  severity?: "info" | "success" | "warning";
  onDismiss?: () => void;
  className?: string;
}

/**
 * AttributionInsight - AI-generated insight card
 *
 * Displays AI insights and recommendations with color-coded severity indicators.
 * Supports dismissible alerts with custom actions.
 *
 * @example
 * <AttributionInsight
 *   type="performance-alert"
 *   severity="warning"
 *   title="ROAS Drop Detected"
 *   description="Meta - Retargeting campaign ROAS dropped 32% week-over-week."
 *   recommendation="Review ad creatives and audience targeting."
 *   onDismiss={() => handleDismiss('insight-1')}
 * />
 *
 * <AttributionInsight
 *   type="attribution-insight"
 *   severity="info"
 *   title="Q4 Deal Attribution"
 *   description="60% of new deals in Q4 originated from Google Ads campaigns targeting 'CRM keywords'."
 * />
 *
 * <AttributionInsight
 *   type="efficiency-recommendation"
 *   severity="success"
 *   title="Budget Optimization"
 *   description="Shift 20% of spend from 'Brand Awareness' to 'Lead Gen' to improve CAC by 12%."
 *   recommendation="Reallocate €500/month for estimated €1,200 savings."
 * />
 */
export const AttributionInsight: React.FC<AttributionInsightProps> = ({
  type,
  title,
  description,
  recommendation,
  severity = "info",
  onDismiss,
  className = "",
}) => {
  const getIcon = (): React.ReactElement => {
    switch (type) {
      case "performance-alert":
        return <AlertTriangle className="size-5 flex-shrink-0" />;
      case "attribution-insight":
        return <Lightbulb className="size-5 flex-shrink-0" />;
      case "efficiency-recommendation":
        return <TrendingUp className="size-5 flex-shrink-0" />;
      default:
        return <Lightbulb className="size-5 flex-shrink-0" />;
    }
  };

  const getConfig = (): {
    borderColor: string;
    bgColor: string;
    iconColor: string;
    textColor: string;
  } => {
    switch (severity) {
      case "info":
        return {
          borderColor: "border-l-blue-500",
          bgColor: "bg-blue-50",
          iconColor: "text-blue-500",
          textColor: "text-blue-900",
        };
      case "warning":
        return {
          borderColor: "border-l-amber-500",
          bgColor: "bg-amber-50",
          iconColor: "text-amber-500",
          textColor: "text-amber-900",
        };
      case "success":
        return {
          borderColor: "border-l-green-500",
          bgColor: "bg-green-50",
          iconColor: "text-green-500",
          textColor: "text-green-900",
        };
      default:
        return {
          borderColor: "border-l-blue-500",
          bgColor: "bg-blue-50",
          iconColor: "text-blue-500",
          textColor: "text-blue-900",
        };
    }
  };

  const config = getConfig();

  return (
    /* eslint-disable id-length -- Framer Motion uses 'y' as a valid prop name for Y-axis animation */
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-lg border-l-4 ${config.borderColor} ${config.bgColor} p-4 shadow-sm ${className}`}
    >
      {/* eslint-enable id-length */}
      {/* Dismiss button */}
      {onDismiss !== undefined && (
        <button
          onClick={onDismiss}
          className={`absolute top-3 right-3 ${config.iconColor} hover:opacity-70 transition-opacity`}
          aria-label="Dismiss insight"
        >
          <X className="size-4" />
        </button>
      )}

      {/* Content */}
      <div className="flex gap-3">
        {/* Icon */}
        <div className={config.iconColor}>{getIcon()}</div>

        {/* Text content */}
        <div className="flex-1 pr-6">
          <h4 className={`text-sm font-semibold ${config.textColor} mb-1`}>{title}</h4>
          <p className="text-sm text-slate-700 leading-relaxed mb-2">{description}</p>
          {recommendation !== undefined && recommendation !== "" && (
            <p className="text-sm text-slate-600 italic leading-relaxed">
              <span className="font-medium">Recommendation:</span> {recommendation}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
