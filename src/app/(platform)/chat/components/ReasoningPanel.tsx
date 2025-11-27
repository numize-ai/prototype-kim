/* eslint-disable complexity */
/* eslint-disable no-nested-ternary */
/* eslint-disable id-length */
"use client";

import React, { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { ReasoningStep } from "~mocks/chat-data";

import { motion } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Code2, Loader2 } from "lucide-react";

interface ReasoningPanelProps {
  steps: ReasoningStep[];
  isExpanded: boolean;
  onToggle: () => void;
}

export const ReasoningPanel: React.FC<ReasoningPanelProps> = ({ steps, isExpanded, onToggle }) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>(null);

  const handleToggleStep = (stepId: string): void => {
    setExpandedStepId((previousId) => (previousId === stepId ? null : stepId));
  };

  const completedSteps = steps.filter((step) => step.status === "completed").length;
  const totalSteps = steps.length;

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              {completedSteps === totalSteps ? (
                <Check className="size-4 text-blue-600" />
              ) : (
                <Loader2 className="size-4 text-blue-600 animate-spin" />
              )}
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-blue-900">AI Reasoning</CardTitle>
              <p className="text-xs text-blue-700">
                {completedSteps} of {totalSteps} steps completed
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle} className="text-blue-700 hover:text-blue-900">
            {isExpanded ? (
              <>
                <ChevronUp className="size-4" />
                Hide
              </>
            ) : (
              <>
                <ChevronDown className="size-4" />
                Show details
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {steps.map((step, index) => {
              const isStepExpanded = expandedStepId === step.id;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="relative">
                  {/* Vertical line connecting steps */}
                  {!isLast && (
                    <div
                      className="absolute left-4 top-10 w-0.5 h-full bg-blue-200"
                      style={{ height: "calc(100% - 2.5rem)" }}
                    />
                  )}

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-start gap-3">
                      {/* Step number badge */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 relative z-10 ${
                          step.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : step.status === "current"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {step.status === "completed" ? (
                          <Check className="size-4" />
                        ) : step.status === "current" ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <span className="text-xs font-semibold">{step.step}</span>
                        )}
                      </div>

                      {/* Step content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-lg border border-slate-200 p-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-slate-900">{step.title}</h4>
                              <p className="text-xs text-slate-600 mt-0.5">{step.description}</p>
                            </div>
                            {step.dataSource !== undefined && step.dataSource !== "" && (
                              <Badge variant="outline" className="text-xs shrink-0">
                                {step.dataSource}
                              </Badge>
                            )}
                          </div>

                          {/* SQL Query section */}
                          {step.sqlQuery !== undefined && step.sqlQuery !== "" && (
                            <div className="mt-2 pt-2 border-t border-slate-100">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  handleToggleStep(step.id);
                                }}
                                className="h-auto py-1 px-2 text-xs gap-1 hover:bg-slate-50"
                              >
                                <Code2 className="size-3" />
                                {isStepExpanded ? "Hide SQL" : "View SQL"}
                                {isStepExpanded ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                              </Button>

                              {isStepExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="mt-2"
                                >
                                  <div className="p-3 rounded-lg bg-slate-900 overflow-x-auto">
                                    <pre className="text-xs text-slate-100 font-mono whitespace-pre">
                                      {step.sqlQuery}
                                    </pre>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </CardContent>
      )}
    </Card>
  );
};
