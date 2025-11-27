/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable require-unicode-regexp */
/* eslint-disable complexity */
/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use client";

import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { TableData } from "~mocks/chat-data";

import { ArrowUpDown, Download } from "lucide-react";

interface ChatTableProps {
  data: TableData;
}

export const ChatTable: React.FC<ChatTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: string) => {
    const column = data.columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = React.useMemo(() => {
    if (!sortConfig) return data.rows;

    const sorted = [...data.rows].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Remove currency symbols and percentages for comparison
      const aNum = typeof aValue === "string" ? parseFloat(aValue.replace(/[$,%]/g, "")) : aValue;
      const bNum = typeof bValue === "string" ? parseFloat(bValue.replace(/[$,%]/g, "")) : bValue;

      // Handle undefined cases
      if (aNum === undefined || isNaN(aNum)) return 1;
      if (bNum === undefined || isNaN(bNum)) return -1;

      if (aNum < bNum) return sortConfig.direction === "asc" ? -1 : 1;
      if (aNum > bNum) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data.rows, sortConfig]);

  const handleExport = () => {
    // Convert to CSV
    const headers = data.columns.map((col) => col.label).join(",");
    const rows = sortedRows.map((row) => data.columns.map((col) => row[col.key]).join(",")).join("\n");
    const csv = `${headers}\n${rows}`;

    // Download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data.title ?? "table").toLowerCase().replace(/\s+/g, "-")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-slate-200">
      {data.title !== undefined && data.title !== "" && (
        <CardHeader className="pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">{data.title}</CardTitle>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="size-4 mr-2" />
            Export CSV
          </Button>
        </CardHeader>
      )}
      <CardContent className="pt-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                {data.columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider ${
                      column.sortable ? "cursor-pointer hover:text-slate-900" : ""
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-1">
                      {column.label}
                      {column.sortable && (
                        <ArrowUpDown
                          className={`size-3 ${sortConfig?.key === column.key ? "text-slate-900" : "text-slate-400"}`}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sortedRows.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  {data.columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-slate-900">
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
