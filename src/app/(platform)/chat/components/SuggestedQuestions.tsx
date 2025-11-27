"use client";

import React from "react";

import { Badge } from "~/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import type { ChatSuggestion } from "~services/suggestionEngine";
import { isSuggestionLocked } from "~services/suggestionEngine";
import { useAppSelector } from "~store";
import { selectConnectedSourceIds, selectHasMultipleSources } from "~store/slices/connectorsSlice";

import { Layers, Lock } from "lucide-react";

interface SuggestedQuestionsProps {
  questions: ChatSuggestion[];
  onSelectQuestion: (question: string) => void;
}

const getCategoryColor = (category: ChatSuggestion["category"]) => {
  switch (category) {
    case "multi-source":
      return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300";
    case "cross-source":
      return "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300";
    case "single-source":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300";
  }
};

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ questions, onSelectQuestion }) => {
  const connectedSources = useAppSelector(selectConnectedSourceIds);
  const hasMultipleSources = useAppSelector(selectHasMultipleSources);

  // Display only the first 3 suggestions
  const displayedSuggestions = questions.slice(0, 3);

  return (
    <div className="flex flex-col border rounded-lg bg-white shadow-sm p-4">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">Suggested Questions</h3>
      </div>

      {/* Grid of suggestions - 3 columns */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {displayedSuggestions.map((question) => {
          const locked = isSuggestionLocked(question, {
            connectedSources,
            isReconciled: false,
            hasMultipleSources,
          });

          return (
            <Tooltip key={question.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    if (!locked) {
                      onSelectQuestion(question.query);
                    }
                  }}
                  disabled={locked}
                  className={`group flex flex-col items-start gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left shadow-sm w-full ${
                    locked
                      ? "opacity-50 cursor-not-allowed bg-slate-50 text-slate-500 border-slate-200"
                      : `cursor-pointer hover:shadow-md ${getCategoryColor(question.category)}`
                  }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    {locked ? (
                      <Lock className="size-4 shrink-0 text-slate-400" />
                    ) : (
                      <Layers className="size-4 shrink-0 transition-transform group-hover:scale-110" />
                    )}
                    <span className="flex-1 line-clamp-2 leading-snug">{question.query}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {question.dataSources?.map((source: string) => (
                      <Badge
                        key={source}
                        variant="outline"
                        className="text-[10px] px-1.5 py-0.5 bg-white/60 border-current/30"
                      >
                        {source}
                      </Badge>
                    ))}
                  </div>
                </button>
              </TooltipTrigger>
              {locked && (
                <TooltipContent>
                  <p className="text-xs">Complete reconciliation to unlock this suggestion</p>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};
