"use client";

import * as React from "react";

import { AppLayout } from "~/components/layouts";
import { Button } from "~/components/ui/button";
import { type SortOption, useQueryHistory } from "~/hooks/useQueryHistory";

import { HistoryList } from "./components/HistoryList";

const HistoryPage: React.FC = () => {
  const { history, sortBy, setFilters, setSortBy, deleteQuery, clearFilters } = useQueryHistory();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [dbtFilter, setDbtFilter] = React.useState<"all" | "inferred" | "verified">("all");
  const [syncFilter, setSyncFilter] = React.useState<"all" | "not-synced" | "synced">("all");

  React.useEffect(() => {
    const dbtVerifiedRecord = { verified: true, inferred: false, all: undefined } as const;
    const syncedRecord = { synced: true, "not-synced": false, all: undefined } as const;
    setFilters({
      searchTerm: searchTerm === "" ? undefined : searchTerm,
      dbtVerified: dbtVerifiedRecord[dbtFilter],
      synced: syncedRecord[syncFilter],
    });
  }, [searchTerm, dbtFilter, syncFilter, setFilters]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setDbtFilter("all");
    setSyncFilter("all");
    clearFilters();
  };

  const hasActiveFilters = searchTerm !== "" || dbtFilter !== "all" || syncFilter !== "all";

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Query History</h1>
            <p className="text-gray-600 mt-1">View and re-use your past questions</p>
          </div>
          <Button asChild>
            <a href="/ask">Ask New Question</a>
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* dbt Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Type:</span>
              <select
                value={dbtFilter}
                onChange={(e) => {
                  setDbtFilter(e.target.value as typeof dbtFilter);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="verified">dbt verified</option>
                <option value="inferred">Inferred logic</option>
              </select>
            </div>

            {/* Sync Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <select
                value={syncFilter}
                onChange={(e) => {
                  setSyncFilter(e.target.value as typeof syncFilter);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="synced">Synced</option>
                <option value="not-synced">Not synced</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortOption);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="recent">Most recent</option>
                <option value="oldest">Oldest first</option>
                <option value="most-used">Most used</option>
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-sm">
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {history.length} {history.length === 1 ? "query" : "queries"}
        </div>

        {/* History List */}
        <HistoryList history={history} onDelete={deleteQuery} />
      </div>
    </AppLayout>
  );
};
export default HistoryPage;
