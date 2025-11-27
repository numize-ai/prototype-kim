"use client";

import { useCallback, useMemo, useState } from "react";

import { filterQueryHistory, mockQueryHistory, type QueryHistoryItem, sortQueryHistory } from "~/mocks/queryHistory";

interface QueryHistoryFilters {
  searchTerm?: string | undefined;
  dbtVerified?: boolean | undefined;
  synced?: boolean | undefined;
  dateFrom?: Date | undefined;
  dateTo?: Date | undefined;
}

type SortOption = "most-used" | "oldest" | "recent";

interface UseQueryHistoryResult {
  history: QueryHistoryItem[];
  filters: QueryHistoryFilters;
  sortBy: SortOption;
  setFilters: (filters: QueryHistoryFilters) => void;
  setSortBy: (sortBy: SortOption) => void;
  deleteQuery: (id: string) => void;
  clearFilters: () => void;
}

export function useQueryHistory(): UseQueryHistoryResult {
  const [historyData, setHistoryData] = useState<QueryHistoryItem[]>(mockQueryHistory);
  const [filters, setFilters] = useState<QueryHistoryFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const history = useMemo(() => {
    const filtered = filterQueryHistory(historyData, filters);
    return sortQueryHistory(filtered, sortBy);
  }, [historyData, filters, sortBy]);

  const deleteQuery = useCallback((id: string) => {
    // eslint-disable-next-line max-nested-callbacks
    setHistoryData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSortBy("recent");
  }, []);

  return {
    history,
    filters,
    sortBy,
    setFilters,
    setSortBy,
    deleteQuery,
    clearFilters,
  };
}

export type { SortOption };
