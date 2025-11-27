"use client";

import React from "react";

import type { DigestBlock } from "~mocks/digest-data";

import { ChartBlock } from "./ChartBlock";
import { InsightBlock } from "./InsightBlock";
import { KPIOverviewBlock } from "./KPIOverviewBlock";
import { TableBlock } from "./TableBlock";
import { TextBlock } from "./TextBlock";

interface DigestBlockRendererProps {
  block: DigestBlock;
  onDeepDive?: (blockId: string) => void;
}

export const DigestBlockRenderer: React.FC<DigestBlockRendererProps> = ({ block, onDeepDive }) => {
  const handleDeepDive = () => {
    if (onDeepDive) {
      onDeepDive(block.id);
    }
  };

  if (!block.lastExecution) {
    return (
      <div className="p-8 text-center border border-dashed border-border rounded-lg bg-muted/20">
        <p className="text-sm font-medium text-foreground">Block not executed yet</p>
        <p className="text-xs text-muted-foreground mt-1">No data available for this block</p>
      </div>
    );
  }

  switch (block.type) {
    case "kpi":
      return <KPIOverviewBlock title={block.title} result={block.lastExecution} onDeepDive={handleDeepDive} />;
    case "chart":
      return <ChartBlock title={block.title} result={block.lastExecution} onDeepDive={handleDeepDive} />;
    case "table":
      return <TableBlock title={block.title} result={block.lastExecution} onDeepDive={handleDeepDive} />;
    case "insight":
      return <InsightBlock title={block.title} result={block.lastExecution} onDeepDive={handleDeepDive} />;
    case "text":
      return <TextBlock title={block.title} result={block.lastExecution} onDeepDive={handleDeepDive} />;
    default:
      return (
        <div className="p-8 text-center border border-border rounded-lg bg-card">
          <p className="text-sm text-muted-foreground">Unknown block type: {block.type}</p>
        </div>
      );
  }
};
