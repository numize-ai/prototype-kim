"use client";

import React, { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

import { ArrowDown, ArrowUp, ArrowUpDown, Download, Medal, Trophy } from "lucide-react";

interface CampaignLeaderboardProps {
  campaigns: Array<{
    id: string;
    name: string;
    platform: "google" | "meta";
    spend: number;
    roas: number;
    cac: number;
    leads: number;
    deals: number;
  }>;
  sortBy?: "cac" | "deals" | "roas" | "spend";
  onSortChange?: (sortBy: string) => void;
  onCampaignClick?: (id: string) => void;
  className?: string;
}

/**
 * CampaignLeaderboard - Sortable table showing campaign rankings
 *
 * Displays campaigns in a sortable table with rank badges for top 3 performers.
 * Supports CSV export functionality.
 *
 * @example
 * <CampaignLeaderboard
 *   campaigns={topCampaigns}
 *   sortBy="roas"
 *   onSortChange={(field) => setSortField(field)}
 *   onCampaignClick={(id) => router.push(`/campaigns/${id}`)}
 * />
 */
export const CampaignLeaderboard: React.FC<CampaignLeaderboardProps> = ({
  campaigns,
  sortBy = "roas",
  onSortChange,
  onCampaignClick,
  className = "",
}) => {
  const [currentSort, setCurrentSort] = useState<string>(sortBy);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatRatio = (value: number): string => {
    return `${value.toFixed(2)}x`;
  };

  const handleSort = (field: string): void => {
    if (currentSort === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setCurrentSort(field);
      setSortDirection("desc");
    }
    if (onSortChange !== undefined) {
      onSortChange(field);
    }
  };

  const getSortIcon = (field: string): React.ReactElement => {
    if (currentSort !== field) {
      return <ArrowUpDown className="size-4 text-slate-400" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="size-4 text-blue-600" />
    ) : (
      <ArrowDown className="size-4 text-blue-600" />
    );
  };

  const sortedCampaigns = [...campaigns].sort((campaignA, campaignB) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;
    switch (currentSort) {
      case "roas":
        return (campaignA.roas - campaignB.roas) * multiplier;
      case "cac":
        return (campaignA.cac - campaignB.cac) * multiplier;
      case "spend":
        return (campaignA.spend - campaignB.spend) * multiplier;
      case "deals":
        return (campaignA.deals - campaignB.deals) * multiplier;
      default:
        return 0;
    }
  });

  const getRankBadge = (rank: number): React.ReactElement | null => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1 text-yellow-600">
          <Trophy className="size-5" />
          <span className="text-sm font-bold">1st</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center gap-1 text-slate-400">
          <Medal className="size-5" />
          <span className="text-sm font-bold">2nd</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center gap-1 text-orange-600">
          <Medal className="size-5" />
          <span className="text-sm font-bold">3rd</span>
        </div>
      );
    }
    return <span className="text-sm text-slate-600 font-medium">{rank}</span>;
  };

  const handleExportCSV = (): void => {
    const headers = ["Rank", "Campaign Name", "Platform", "Spend", "ROAS", "CAC", "Leads", "Deals"];
    const rows = sortedCampaigns.map((campaign, index) => [
      index + 1,
      campaign.name,
      campaign.platform,
      campaign.spend,
      campaign.roas,
      campaign.cac,
      campaign.leads,
      campaign.deals,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `campaign-leaderboard-${new Date().toISOString()}.csv`;
    link.click();
  };

  const getPlatformBadge = (platform: "google" | "meta"): React.ReactElement => {
    return platform === "meta" ? <Badge variant="default">Meta</Badge> : <Badge variant="secondary">Google</Badge>;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Header with export button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Campaign Leaderboard</h3>
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="size-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Table - responsive with horizontal scroll on mobile */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 w-20">Rank</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 min-w-[200px]">Campaign Name</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700">Platform</th>
              <th
                className="text-right py-3 px-4 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => {
                  handleSort("spend");
                }}
              >
                <div className="flex items-center justify-end gap-1">
                  Spend
                  {getSortIcon("spend")}
                </div>
              </th>
              <th
                className="text-right py-3 px-4 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => {
                  handleSort("roas");
                }}
              >
                <div className="flex items-center justify-end gap-1">
                  ROAS
                  {getSortIcon("roas")}
                </div>
              </th>
              <th
                className="text-right py-3 px-4 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => {
                  handleSort("cac");
                }}
              >
                <div className="flex items-center justify-end gap-1">
                  CAC
                  {getSortIcon("cac")}
                </div>
              </th>
              <th
                className="text-right py-3 px-4 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => {
                  handleSort("deals");
                }}
              >
                <div className="flex items-center justify-end gap-1">
                  Leads
                  {getSortIcon("deals")}
                </div>
              </th>
              <th
                className="text-right py-3 px-4 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => {
                  handleSort("deals");
                }}
              >
                <div className="flex items-center justify-end gap-1">
                  Deals
                  {getSortIcon("deals")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCampaigns.map((campaign, index) => {
              const isLowROAS = campaign.roas < 2;
              return (
                <tr
                  key={campaign.id}
                  className="border-b hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onCampaignClick?.(campaign.id)}
                >
                  <td className="py-3 px-4">{getRankBadge(index + 1)}</td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-900">{campaign.name}</span>
                  </td>
                  <td className="py-3 px-4">{getPlatformBadge(campaign.platform)}</td>
                  <td className="py-3 px-4 text-right text-slate-900">{formatCurrency(campaign.spend)}</td>
                  <td className={`py-3 px-4 text-right font-semibold ${isLowROAS ? "text-red-600" : "text-slate-900"}`}>
                    {formatRatio(campaign.roas)}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-900">{formatCurrency(campaign.cac)}</td>
                  <td className="py-3 px-4 text-right text-slate-900">{campaign.leads}</td>
                  <td className="py-3 px-4 text-right font-semibold text-blue-600">{campaign.deals}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
