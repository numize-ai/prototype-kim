/* eslint-disable id-length */
/**
 * Suggestion Engine - Filters chat suggestions based on connected sources and reconciliation status
 */

export interface ChatSuggestion {
  id: string;
  query: string;
  requiredSources: string[]; // connector IDs like ['stripe', 'hubspot']
  requiresReconciliation: boolean;
  category: "cross-source" | "multi-source" | "single-source";
  icon?: string | undefined;
  dataSources?: string[]; // Display names for badges
}

export interface SuggestionContext {
  connectedSources: string[]; // source IDs
  isReconciled: boolean;
  hasMultipleSources: boolean;
}

/**
 * Filters suggestions based on the current context
 *
 * Rules:
 * - If only 1 source: Return suggestions where requiredSources.length === 1 AND source is connected
 * - If multiple sources but not reconciled: Return single-source suggestions only
 * - If reconciled: Return all suggestions where ALL requiredSources are connected
 * - Sort by relevance/priority
 */
export const filterSuggestions = (allSuggestions: ChatSuggestion[], context: SuggestionContext): ChatSuggestion[] => {
  const { connectedSources, isReconciled, hasMultipleSources } = context;

  // Filter logic
  const filtered = allSuggestions.filter((suggestion) => {
    // Suggestions with no required sources (semantic layer) are always available
    if (suggestion.requiredSources.length === 0) {
      return true;
    }

    // No connected sources - only show semantic layer suggestions (handled above)
    if (connectedSources.length === 0) {
      return false;
    }

    // Check if all required sources are connected
    const hasAllRequiredSources = suggestion.requiredSources.every((sourceId) => connectedSources.includes(sourceId));

    // If sources not available, exclude
    if (!hasAllRequiredSources) {
      return false;
    }

    // Single source context - only show single-source suggestions
    if (!hasMultipleSources) {
      return suggestion.category === "single-source" && suggestion.requiredSources.length === 1;
    }

    // Multiple sources but not reconciled - only show single-source suggestions
    if (!isReconciled) {
      return suggestion.category === "single-source";
    }

    return true; // Reconciled - show all matching suggestions
  });

  // Sort by priority: cross-source > multi-source > single-source
  const priorityOrder: Record<ChatSuggestion["category"], number> = {
    "cross-source": 3,
    "multi-source": 2,
    "single-source": 1,
  };

  return filtered.sort((a, b) => {
    const priorityDiff = priorityOrder[b.category] - priorityOrder[a.category];
    if (priorityDiff !== 0) return priorityDiff;
    // If same priority, sort by number of required sources (more = more interesting)
    return b.requiredSources.length - a.requiredSources.length;
  });
};

/**
 * Checks if a suggestion is locked (requires reconciliation but not set up yet)
 */
export const isSuggestionLocked = (suggestion: ChatSuggestion, context: SuggestionContext): boolean => {
  return suggestion.requiresReconciliation && !context.isReconciled && context.hasMultipleSources;
};
