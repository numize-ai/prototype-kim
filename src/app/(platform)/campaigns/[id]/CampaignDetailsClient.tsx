/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable id-length */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
"use client";

import React from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { AttributionInsight } from "~components/marketing/AttributionInsight";
import { FunnelChart } from "~components/marketing/FunnelChart";
import { MarketingMetricCard } from "~components/marketing/MarketingMetricCard";
import { ALL_CAMPAIGNS } from "~mocks/ad-platforms";
import { getAttributionByCampaign } from "~mocks/campaign-attribution";
import { formatDistanceToNow } from "~utils/date";

import {
  calculateComparisonMetrics,
  type CampaignDetailsData,
  formatMetricValue,
  generateCampaignFunnel,
} from "../helpers";

import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, DollarSign, Target, TrendingUp, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface CampaignDetailsClientProps {
  campaignData: CampaignDetailsData;
}

export const CampaignDetailsClient: React.FC<CampaignDetailsClientProps> = ({ campaignData }) => {
  const router = useRouter();
  const { campaign, metrics, contacts, deals, dailySpend } = campaignData;

  // Calculate comparison metrics
  const comparisonMetrics = calculateComparisonMetrics(metrics, ALL_CAMPAIGNS);

  // Generate campaign-specific funnel
  const funnelData = generateCampaignFunnel(campaign, contacts, deals).map((stage) => {
    const result: { stage: string; count: number; conversionRate?: number } = {
      stage: stage.name,
      count: stage.value,
    };
    if (stage.conversionRate !== undefined) {
      result.conversionRate = stage.conversionRate;
    }
    return result;
  });

  // Get attribution details
  const attributions = getAttributionByCampaign(campaign.id);

  // Platform badge config
  const platformBadge =
    campaign.platform === "meta"
      ? { label: "Meta", variant: "default" as const }
      : { label: "Google", variant: "secondary" as const };

  // Status badge config
  const getStatusBadge = (): { label: string; variant: "default" | "outline" | "secondary" } => {
    switch (campaign.status) {
      case "active":
        return { label: "Active", variant: "default" };
      case "paused":
        return { label: "Paused", variant: "secondary" };
      case "completed":
        return { label: "Completed", variant: "outline" };
      default:
        return { label: campaign.status, variant: "default" };
    }
  };

  const statusBadge = getStatusBadge();

  // Format date range
  const startDate = new Date(campaign.startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const endDate = campaign.endDate
    ? new Date(campaign.endDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Present";

  // Generate AI insight for this campaign
  const campaignInsight = {
    type: "attribution-insight" as const,
    title: `${campaign.name} Performance`,
    description:
      metrics.roas > 4
        ? `Exceptional performance: This campaign is generating ${metrics.roas.toFixed(2)}x return on ad spend, ${((metrics.roas / 3.5 - 1) * 100).toFixed(0)}% above account average. ${metrics.leads} leads attributed with ${deals.filter((d) => d.stage === "closed-won").length} conversions to customers.`
        : metrics.roas > 2
          ? `This campaign is performing well with a ${metrics.roas.toFixed(2)}x ROAS. ${metrics.leads} leads have been attributed, with opportunities for optimization in conversion rate.`
          : `This campaign has generated ${metrics.leads} leads but ROAS (${metrics.roas.toFixed(2)}x) is below target. Consider refining targeting or creative strategy.`,
    recommendation:
      metrics.roas > 4
        ? "Consider increasing budget allocation to this high-performing campaign."
        : metrics.roas < 2
          ? "Review ad creative, audience targeting, and landing page experience to improve conversion rates."
          : "Continue monitoring performance and test new ad variations.",
    severity: metrics.roas > 4 ? ("success" as const) : metrics.roas < 2 ? ("warning" as const) : ("info" as const),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Button
            variant="ghost"
            onClick={() => {
              router.back();
            }}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{campaign.name}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={platformBadge.variant}>{platformBadge.label}</Badge>
                  <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                  <div className="flex items-center gap-1.5 text-sm text-slate-600">
                    <Calendar className="size-4" />
                    <span>
                      {startDate} - {endDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <MarketingMetricCard name="Spend" value={metrics.spend} format="currency" platform={campaign.platform} />
            <MarketingMetricCard
              name="ROAS"
              value={metrics.roas}
              format="ratio"
              trend={metrics.roas > 3.5 ? "up" : metrics.roas < 2 ? "down" : "neutral"}
              platform={campaign.platform}
            />
            <MarketingMetricCard
              name="CAC"
              value={metrics.cac}
              format="currency"
              trend={metrics.cac < 400 ? "up" : metrics.cac > 500 ? "down" : "neutral"}
              platform={campaign.platform}
            />
            <MarketingMetricCard
              name="Impressions"
              value={metrics.impressions}
              format="number"
              platform={campaign.platform}
            />
            <MarketingMetricCard name="Clicks" value={metrics.clicks} format="number" platform={campaign.platform} />
            <MarketingMetricCard
              name="Conversions"
              value={metrics.conversions}
              format="number"
              platform={campaign.platform}
            />
          </div>
        </motion.div>

        {/* Two Column Layout: Performance Overview + Attribution Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Performance Overview */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Daily Spend Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="size-5 text-slate-600" />
                  Daily Spend Trend
                </CardTitle>
                <CardDescription>Last {dailySpend.length} days of ad spend activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ReactECharts
                  option={
                    {
                      tooltip: {
                        trigger: "axis",
                        backgroundColor: "#fff",
                        borderColor: "#e2e8f0",
                        borderWidth: 1,
                        borderRadius: 8,
                        padding: 8,
                        textStyle: { color: "#111827" },
                        formatter: (params) => {
                          if (!Array.isArray(params) || params.length === 0) return "";
                          const param = params[0];
                          if (!param) return "";
                          const value = typeof param.value === "number" ? param.value : 0;
                          return `<div style="font-size: 12px;">
                            <div style="font-weight: 600; margin-bottom: 4px;">${param.name}</div>
                            <div>Spend: <span style="font-weight: 600;">€${value.toLocaleString()}</span></div>
                          </div>`;
                        },
                      },
                      grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        top: "5%",
                        containLabel: true,
                      },
                      xAxis: {
                        type: "category",
                        data: dailySpend.map((item) => item.date),
                        axisLabel: { color: "#64748b", fontSize: 12 },
                        axisLine: { lineStyle: { color: "#e2e8f0" } },
                        boundaryGap: false,
                      },
                      yAxis: {
                        type: "value",
                        axisLabel: { color: "#64748b", fontSize: 12 },
                        splitLine: { lineStyle: { color: "#e2e8f0", type: "dashed" } },
                      },
                      series: [
                        {
                          type: "line",
                          data: dailySpend.map((item) => item.spend),
                          smooth: true,
                          areaStyle: {
                            color: {
                              type: "linear",
                              x: 0,
                              y: 0,
                              x2: 0,
                              y2: 1,
                              colorStops: [
                                { offset: 0, color: "rgba(59, 130, 246, 0.3)" },
                                { offset: 1, color: "rgba(59, 130, 246, 0)" },
                              ],
                            },
                          },
                          lineStyle: { color: "#3b82f6", width: 2 },
                          itemStyle: { color: "#3b82f6" },
                        },
                      ],
                    } satisfies EChartsOption
                  }
                  style={{ height: "250px", width: "100%" }}
                />
              </CardContent>
            </Card>

            {/* Campaign Funnel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="size-5 text-slate-600" />
                  Campaign Funnel
                </CardTitle>
                <CardDescription>Conversion flow from impressions to customers</CardDescription>
              </CardHeader>
              <CardContent>
                <FunnelChart data={funnelData} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: Attribution Details */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* AI Insight */}
            <AttributionInsight
              type={campaignInsight.type}
              title={campaignInsight.title}
              description={campaignInsight.description}
              recommendation={campaignInsight.recommendation}
              severity={campaignInsight.severity}
            />

            {/* Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-slate-600" />
                  Performance vs Average
                </CardTitle>
                <CardDescription>How this campaign compares to account average</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead className="text-right">Campaign</TableHead>
                      <TableHead className="text-right">Average</TableHead>
                      <TableHead className="text-right">Delta</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonMetrics.map((metric) => (
                      <TableRow key={metric.metric}>
                        <TableCell className="font-medium">{metric.metric}</TableCell>
                        <TableCell className="text-right">
                          {formatMetricValue(metric.campaignValue, metric.format)}
                        </TableCell>
                        <TableCell className="text-right text-slate-600">
                          {formatMetricValue(metric.averageValue, metric.format)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant={metric.delta > 0 ? "default" : "secondary"}>
                            {metric.delta > 0 ? "+" : ""}
                            {metric.delta.toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Attributed Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="size-5 text-slate-600" />
                Attributed Leads ({contacts.length})
              </CardTitle>
              <CardDescription>Contacts attributed to this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No leads attributed to this campaign yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Contact Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Lifecycle Stage</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Match Method</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.slice(0, 10).map((contact) => {
                        const attribution = attributions.find((attr) => attr.contactId === contact.id);
                        return (
                          <TableRow key={contact.id}>
                            <TableCell className="font-medium">
                              {contact.firstName} {contact.lastName}
                            </TableCell>
                            <TableCell className="text-slate-600">{contact.email}</TableCell>
                            <TableCell className="text-slate-600">{contact.company || "—"}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{contact.lifecycleStage}</Badge>
                            </TableCell>
                            <TableCell className="text-slate-600">
                              {formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{attribution?.matchMethod || "unknown"}</Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  {contacts.length > 10 && (
                    <div className="text-center pt-4 text-sm text-slate-500">Showing 10 of {contacts.length} leads</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Attributed Deals Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="size-5 text-slate-600" />
                Attributed Deals ({deals.length})
              </CardTitle>
              <CardDescription>Deals associated with attributed contacts</CardDescription>
            </CardHeader>
            <CardContent>
              {deals.length === 0 ? (
                <div className="text-center py-8 text-slate-500">No deals attributed to this campaign yet.</div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Contact Name</TableHead>
                          <TableHead className="text-right">Deal Amount</TableHead>
                          <TableHead>Stage</TableHead>
                          <TableHead>Probability</TableHead>
                          <TableHead>Closed At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {deals.map((deal) => {
                          const contact = contacts.find((c) => c.id === deal.contactId);
                          return (
                            <TableRow key={deal.id}>
                              <TableCell className="font-medium">
                                {contact ? `${contact.firstName} ${contact.lastName}` : "Unknown"}
                              </TableCell>
                              <TableCell className="text-right font-semibold">
                                €{deal.amount.toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    deal.stage === "closed-won"
                                      ? "default"
                                      : deal.stage === "closed-lost"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {deal.stage}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-slate-600">{deal.probability}%</TableCell>
                              <TableCell className="text-slate-600">
                                {deal.closedAt
                                  ? formatDistanceToNow(new Date(deal.closedAt), { addSuffix: true })
                                  : "—"}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600">Total Revenue (Closed-Won)</span>
                      <span className="text-2xl font-bold text-slate-900">€{metrics.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
