/* eslint-disable id-length */
"use client";

import React from "react";

import { Card } from "~/components/ui/card";

import { motion } from "framer-motion";
import { BarChart3, Sparkles, TrendingUp, Zap } from "lucide-react";

export const EmptyState: React.FC = () => {
  const features = [
    {
      icon: <BarChart3 className="size-4" />,
      title: "Ask about metrics",
      description: "Query MRR, churn, CAC, LTV, and more",
    },
    {
      icon: <TrendingUp className="size-4" />,
      title: "Analyze trends",
      description: "Understand why metrics changed",
    },
    {
      icon: <Zap className="size-4" />,
      title: "Take action",
      description: "Export, schedule, and set alerts",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full space-y-5"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg mb-2">
            <Sparkles className="size-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome to your AI Analyst</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Ask questions about your business metrics in natural language and get instant answers with visualizations.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <Card className="p-4 border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-9 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900">{feature.title}</h3>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
