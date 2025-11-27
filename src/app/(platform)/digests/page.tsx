"use client";

import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { ContextMenu } from "~components/digest/ContextMenu";
import type { Digest } from "~mocks/digest-data";
import { MOCK_DIGESTS } from "~mocks/digest-data";

import { Calendar, CheckCircle2, Clock, FileText, Plus, Search, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface DigestRowProps {
  digest: Digest;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

const DigestRow: React.FC<DigestRowProps> = ({ digest, onDelete, onDuplicate }) => {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/digests/${digest.id}`);
  };

  const handleDuplicate = () => {
    onDuplicate(digest.id);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${digest.title}"?`)) {
      onDelete(digest.id);
    }
  };

  const contextActions = [
    {
      type: "duplicate" as const,
      onClick: handleDuplicate,
    },
    {
      type: "favorite" as const,
      onClick: () => {
        console.log("Add to favorites");
      },
    },
    {
      type: "share" as const,
      onClick: () => {
        console.log("Share digest");
      },
    },
    {
      type: "separator" as const,
    },
    {
      type: "delete" as const,
      onClick: handleDelete,
    },
  ];

  return (
    <div
      className="group flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
      onClick={handleRowClick}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center size-8 rounded bg-gray-100">
          <FileText className="size-4 text-gray-600" />
        </div>
      </div>

      {/* Title & Description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">{digest.title}</h3>
          {digest.isActive ? (
            <CheckCircle2 className="size-3.5 text-green-600 flex-shrink-0" />
          ) : (
            <XCircle className="size-3.5 text-gray-400 flex-shrink-0" />
          )}
        </div>
        {digest.description && <p className="text-xs text-gray-500 truncate mt-0.5">{digest.description}</p>}
      </div>

      {/* Metadata */}
      <div className="hidden md:flex items-center gap-8 text-xs text-gray-500 flex-shrink-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 min-w-[80px] cursor-help">
              <Calendar className="size-3.5 flex-shrink-0" />
              <span className="capitalize">{digest.recurrence}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Digest execution frequency</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 min-w-[90px] cursor-help">
              <Clock className="size-3.5 flex-shrink-0" />
              <span>{digest.lastExecutedAt?.toLocaleDateString() ?? "Not run yet"}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Last execution date</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ContextMenu actions={contextActions} />
      </div>
    </div>
  );
};

type FilterType = "active" | "all" | "inactive";

const DigestsPage: React.FC = () => {
  const router = useRouter();
  const [digests, setDigests] = useState<Digest[]>(MOCK_DIGESTS);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDigests = digests.filter((digest) => {
    // Apply status filter
    let matchesFilter = true;
    if (filter === "active") matchesFilter = digest.isActive;
    if (filter === "inactive") matchesFilter = !digest.isActive;

    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      digest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      digest.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: string) => {
    setDigests((prev) => prev.filter((d) => d.id !== id));
  };

  const handleDuplicate = (id: string) => {
    const digest = digests.find((d) => d.id === id);
    if (digest) {
      const newDigest: Digest = {
        ...digest,
        id: `${digest.id}-copy-${Date.now()}`,
        title: `${digest.title} (Copy)`,
        createdAt: new Date(),
      };
      setDigests((prev) => [newDigest, ...prev]);
    }
  };

  const activeCount = digests.filter((d) => d.isActive).length;
  const inactiveCount = digests.filter((d) => !d.isActive).length;

  return (
    <TooltipProvider>
      <div className="max-w-5xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900">Digests</h1>
            <Button
              onClick={() => {
                router.push("/digests/new");
              }}
              size="sm"
            >
              <Plus className="size-4 mr-2" />
              New digest
            </Button>
          </div>
          <p className="text-sm text-gray-600">AI-generated recurring reports delivered on your schedule</p>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search digests..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFilter("all");
              }}
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFilter("active");
              }}
            >
              Active ({activeCount})
            </Button>
            <Button
              variant={filter === "inactive" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setFilter("inactive");
              }}
            >
              Inactive ({inactiveCount})
            </Button>
          </div>
        </div>

        {/* Digest List */}
        {filteredDigests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex items-center justify-center size-16 rounded-full bg-gray-100 mb-4">
              <FileText className="size-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No digests found</h3>
            <p className="text-sm text-gray-500 max-w-md mb-6">
              {searchQuery
                ? "No digests match your search. Try a different query."
                : filter === "all"
                  ? "Create your first digest to get started with AI-generated insights."
                  : `No ${filter} digests to display.`}
            </p>
            {filter === "all" && !searchQuery && (
              <Button
                onClick={() => {
                  router.push("/digests/new");
                }}
              >
                <Plus className="size-4 mr-2" />
                Create your first digest
              </Button>
            )}
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            {filteredDigests.map((digest) => (
              <DigestRow key={digest.id} digest={digest} onDelete={handleDelete} onDuplicate={handleDuplicate} />
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default DigestsPage;
