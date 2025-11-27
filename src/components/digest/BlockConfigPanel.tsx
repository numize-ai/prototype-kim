"use client";

import React from "react";

import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type {
  BlockConfig,
  BlockType,
  ChartBlockConfig,
  InsightBlockConfig,
  KPIBlockConfig,
  TableBlockConfig,
} from "~mocks/digest-data";

interface BlockConfigPanelProps {
  blockType: BlockType;
  config?: BlockConfig | undefined;
  onChange: (config: BlockConfig) => void;
}

export const BlockConfigPanel: React.FC<BlockConfigPanelProps> = ({ blockType, config, onChange }) => {
  const renderKPIConfig = (cfg: KPIBlockConfig) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="layout">Grid Layout</Label>
        <Select
          value={cfg.layout}
          onValueChange={(value) => {
            onChange({
              type: "kpi",
              config: { ...cfg, layout: value as KPIBlockConfig["layout"] },
            });
          }}
        >
          <SelectTrigger id="layout">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid-2">2 Columns</SelectItem>
            <SelectItem value="grid-3">3 Columns</SelectItem>
            <SelectItem value="grid-4">4 Columns</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comparison">Comparison Period</Label>
        <Select
          value={cfg.comparisonPeriod}
          onValueChange={(value) => {
            onChange({
              type: "kpi",
              config: { ...cfg, comparisonPeriod: value as KPIBlockConfig["comparisonPeriod"] },
            });
          }}
        >
          <SelectTrigger id="comparison">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-week">Last Week</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-quarter">Last Quarter</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-trends">Show Trends</Label>
        <Checkbox
          id="show-trends"
          checked={cfg.showTrends}
          onCheckedChange={(checked: boolean) => {
            onChange({
              type: "kpi",
              config: { ...cfg, showTrends: checked },
            });
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-previous">Show Previous Values</Label>
        <Checkbox
          id="show-previous"
          checked={cfg.showPreviousValues}
          onCheckedChange={(checked: boolean) => {
            onChange({
              type: "kpi",
              config: { ...cfg, showPreviousValues: checked },
            });
          }}
        />
      </div>
    </div>
  );

  const renderChartConfig = (cfg: ChartBlockConfig) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="chart-type">Chart Type</Label>
        <Select
          value={cfg.chartType}
          onValueChange={(value) => {
            onChange({
              type: "chart",
              config: { ...cfg, chartType: value as ChartBlockConfig["chartType"] },
            });
          }}
        >
          <SelectTrigger id="chart-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">Bar Chart</SelectItem>
            <SelectItem value="line">Line Chart</SelectItem>
            <SelectItem value="area">Area Chart</SelectItem>
            <SelectItem value="pie">Pie Chart</SelectItem>
            <SelectItem value="funnel">Funnel Chart</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="color-scheme">Color Scheme</Label>
        <Select
          value={cfg.colorScheme}
          onValueChange={(value) => {
            onChange({
              type: "chart",
              config: { ...cfg, colorScheme: value as ChartBlockConfig["colorScheme"] },
            });
          }}
        >
          <SelectTrigger id="color-scheme">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blue">Blue</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="purple">Purple</SelectItem>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="multi">Multi-Color</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="height">Chart Height</Label>
        <Select
          value={cfg.height}
          onValueChange={(value) => {
            onChange({
              type: "chart",
              config: { ...cfg, height: value as ChartBlockConfig["height"] },
            });
          }}
        >
          <SelectTrigger id="height">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-legend">Show Legend</Label>
        <Checkbox
          id="show-legend"
          checked={cfg.showLegend}
          onCheckedChange={(checked: boolean) => {
            onChange({
              type: "chart",
              config: { ...cfg, showLegend: checked },
            });
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-labels">Show Data Labels</Label>
        <Checkbox
          id="show-labels"
          checked={cfg.showDataLabels}
          onCheckedChange={(checked: boolean) => {
            onChange({
              type: "chart",
              config: { ...cfg, showDataLabels: checked },
            });
          }}
        />
      </div>
    </div>
  );

  const renderTableConfig = (cfg: TableBlockConfig) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="page-size">Page Size</Label>
        <Select
          value={cfg.pageSize.toString()}
          onValueChange={(value) => {
            onChange({
              type: "table",
              config: { ...cfg, pageSize: parseInt(value) as TableBlockConfig["pageSize"] },
            });
          }}
        >
          <SelectTrigger id="page-size">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 rows</SelectItem>
            <SelectItem value="10">10 rows</SelectItem>
            <SelectItem value="20">20 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="density">Table Density</Label>
        <Select
          value={cfg.density}
          onValueChange={(value) => {
            onChange({
              type: "table",
              config: { ...cfg, density: value as TableBlockConfig["density"] },
            });
          }}
        >
          <SelectTrigger id="density">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="compact">Compact</SelectItem>
            <SelectItem value="comfortable">Comfortable</SelectItem>
            <SelectItem value="spacious">Spacious</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="enable-sorting">Enable Sorting</Label>
        <Checkbox
          id="enable-sorting"
          checked={cfg.enableSorting}
          onCheckedChange={(checked: boolean) => {
            onChange({
              type: "table",
              config: { ...cfg, enableSorting: checked },
            });
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="enable-filtering">Enable Filtering</Label>
        <Checkbox
          id="enable-filtering"
          checked={cfg.enableFiltering}
          onCheckedChange={(checked: boolean) => {
            onChange({
              type: "table",
              config: { ...cfg, enableFiltering: checked },
            });
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-row-numbers">Show Row Numbers</Label>
        <Checkbox
          id="show-row-numbers"
          checked={cfg.showRowNumbers}
          onCheckedChange={(checked: boolean) => {
            onChange({
              type: "table",
              config: { ...cfg, showRowNumbers: checked },
            });
          }}
        />
      </div>
    </div>
  );

  const renderInsightConfig = (cfg: InsightBlockConfig) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="min-confidence">Minimum Confidence</Label>
        <Select
          value={cfg.minConfidence.toString()}
          onValueChange={(value) => {
            onChange({
              type: "insight",
              config: { ...cfg, minConfidence: parseFloat(value) as InsightBlockConfig["minConfidence"] },
            });
          }}
        >
          <SelectTrigger id="min-confidence">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0.5">50%</SelectItem>
            <SelectItem value="0.6">60%</SelectItem>
            <SelectItem value="0.7">70%</SelectItem>
            <SelectItem value="0.8">80%</SelectItem>
            <SelectItem value="0.9">90%</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="max-insights">Max Insights</Label>
        <Select
          value={cfg.maxInsights.toString()}
          onValueChange={(value) => {
            onChange({
              type: "insight",
              config: { ...cfg, maxInsights: parseInt(value) as InsightBlockConfig["maxInsights"] },
            });
          }}
        >
          <SelectTrigger id="max-insights">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">3 insights</SelectItem>
            <SelectItem value="5">5 insights</SelectItem>
            <SelectItem value="10">10 insights</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="show-recommendations">Show Recommendations</Label>
        <Checkbox
          id="show-recommendations"
          checked={cfg.showRecommendations}
          onCheckedChange={(checked: boolean) => {
            onChange({
              type: "insight",
              config: { ...cfg, showRecommendations: checked },
            });
          }}
        />
      </div>
    </div>
  );

  const renderConfigForType = () => {
    if (!config || config.type !== blockType) {
      return <p className="text-sm text-muted-foreground">No configuration available for this block type.</p>;
    }

    // Type narrowing: match both config.type and blockType to extract the correct config
    if (blockType === "kpi" && config.type === "kpi") {
      return renderKPIConfig(config.config);
    }
    if (blockType === "chart" && config.type === "chart") {
      return renderChartConfig(config.config);
    }
    if (blockType === "table" && config.type === "table") {
      return renderTableConfig(config.config);
    }
    if (blockType === "insight" && config.type === "insight") {
      return renderInsightConfig(config.config);
    }

    return <p className="text-sm text-muted-foreground">Configuration coming soon for this block type.</p>;
  };

  return <div className="p-4 space-y-4 border border-border rounded-lg bg-card">{renderConfigForType()}</div>;
};
