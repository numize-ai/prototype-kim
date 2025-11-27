/* eslint-disable id-length */
/**
 * Helper functions for campaign details page
 */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { getCampaignById } from "~mocks/ad-platforms";
import { CAMPAIGN_ATTRIBUTIONS } from "~mocks/campaign-attribution";
import { HUBSPOT_CONTACTS, HUBSPOT_DEALS } from "~mocks/hubspot-data";
import type { AdCampaign, HubSpotContact, HubSpotDeal } from "~types/marketing";

interface CampaignMetrics {
  spend: number;
  roas: number;
  cac: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
  leads: number;
  deals: number;
}

interface DailySpendDataPoint {
  date: string;
  spend: number;
  clicks: number;
}

export interface CampaignDetailsData {
  campaign: AdCampaign;
  metrics: CampaignMetrics;
  contacts: HubSpotContact[];
  deals: HubSpotDeal[];
  dailySpend: DailySpendDataPoint[];
}

/**
 * Get comprehensive campaign details with all related data
 */
export const getCampaignDetails = (campaignId: string): CampaignDetailsData | null => {
  const campaign = getCampaignById(campaignId);

  if (campaign === undefined) {
    return null;
  }

  // Get attributed contacts for this campaign
  const attributions = CAMPAIGN_ATTRIBUTIONS.filter((attr) => attr.campaignId === campaignId);
  const contactIds = new Set(attributions.map((attr) => attr.contactId));
  const contacts = HUBSPOT_CONTACTS.filter((contact) => contactIds.has(contact.id));

  // Get deals associated with attributed contacts
  const deals = HUBSPOT_DEALS.filter((deal) => contactIds.has(deal.contactId));

  // Calculate total revenue from closed-won deals
  const revenue = deals.filter((deal) => deal.stage === "closed-won").reduce((sum, deal) => sum + deal.amount, 0);

  // Calculate metrics
  const metrics: CampaignMetrics = {
    spend: campaign.spend,
    roas: campaign.spend > 0 ? revenue / campaign.spend : 0,
    cac: contacts.length > 0 ? campaign.spend / contacts.length : 0,
    impressions: campaign.impressions,
    clicks: campaign.clicks,
    conversions: campaign.conversions,
    revenue,
    leads: contacts.length,
    deals: deals.filter((deal) => deal.stage === "closed-won").length,
  };

  // Generate daily spend data
  const dailySpend = generateDailySpendData(campaign);

  return {
    campaign,
    metrics,
    contacts,
    deals,
    dailySpend,
  };
};

/**
 * Generate daily spend data for a campaign (simulated time series)
 */
const generateDailySpendData = (campaign: AdCampaign): DailySpendDataPoint[] => {
  const startDate = new Date(campaign.startDate);
  const endDate = campaign.endDate ? new Date(campaign.endDate) : new Date();

  // Calculate number of days in campaign
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const days = Math.min(Math.max(daysDiff, 7), 30); // Show between 7-30 days

  // Generate data points
  const dataPoints: DailySpendDataPoint[] = [];
  const dailyAvgSpend = campaign.spend / days;
  const dailyAvgClicks = campaign.clicks / days;

  for (let i = 0; i < days; i++) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - (days - i - 1));

    // Add some variance to make it look realistic (±20%)
    const variance = 0.8 + Math.random() * 0.4;
    const spend = dailyAvgSpend * variance;
    const clicks = Math.round(dailyAvgClicks * variance);

    dataPoints.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      spend: Math.round(spend),
      clicks,
    });
  }

  return dataPoints;
};

/**
 * Calculate comparison metrics (campaign vs account average)
 */
interface ComparisonMetric {
  metric: string;
  campaignValue: number;
  averageValue: number;
  delta: number;
  format: "currency" | "percentage" | "ratio";
}

export const calculateComparisonMetrics = (
  metrics: CampaignMetrics,
  allCampaigns: AdCampaign[],
): ComparisonMetric[] => {
  // Calculate account averages
  const totalSpend = allCampaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalImpressions = allCampaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = allCampaigns.reduce((sum, c) => sum + c.clicks, 0);
  const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const avgCPC = totalClicks > 0 ? totalSpend / totalClicks : 0;

  // Campaign values
  const campaignCTR = metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) * 100 : 0;
  const campaignCPC = metrics.clicks > 0 ? metrics.spend / metrics.clicks : 0;

  return [
    {
      metric: "ROAS",
      campaignValue: metrics.roas,
      averageValue: 3.5, // Mock average ROAS
      delta: metrics.roas > 0 ? ((metrics.roas - 3.5) / 3.5) * 100 : 0,
      format: "ratio",
    },
    {
      metric: "CAC",
      campaignValue: metrics.cac,
      averageValue: 400, // Mock average CAC
      delta: metrics.cac > 0 ? ((400 - metrics.cac) / 400) * 100 : 0, // Lower is better
      format: "currency",
    },
    {
      metric: "CTR",
      campaignValue: campaignCTR,
      averageValue: avgCTR,
      delta: campaignCTR > 0 ? ((campaignCTR - avgCTR) / avgCTR) * 100 : 0,
      format: "percentage",
    },
    {
      metric: "CPC",
      campaignValue: campaignCPC,
      averageValue: avgCPC,
      delta: campaignCPC > 0 ? ((avgCPC - campaignCPC) / avgCPC) * 100 : 0, // Lower is better
      format: "currency",
    },
  ];
};

/**
 * Format metric value based on format type
 */
export const formatMetricValue = (value: number, format: "currency" | "percentage" | "ratio"): string => {
  switch (format) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    case "percentage":
      return `${value.toFixed(2)}%`;
    case "ratio":
      return `${value.toFixed(2)}x`;
    default:
      return value.toString();
  }
};

/**
 * Generate funnel data for a specific campaign
 */
interface CampaignFunnelStage {
  name: string;
  value: number;
  conversionRate?: number;
}

export const generateCampaignFunnel = (
  campaign: AdCampaign,
  contacts: HubSpotContact[],
  deals: HubSpotDeal[],
): CampaignFunnelStage[] => {
  const { impressions } = campaign;
  const { clicks } = campaign;
  const leads = contacts.length;
  const opportunities = contacts.filter((c) => c.lifecycleStage === "opportunity").length;
  const customers = deals.filter((d) => d.stage === "closed-won").length;

  return [
    {
      name: "Impressions",
      value: impressions,
      conversionRate: 100,
    },
    {
      name: "Clicks",
      value: clicks,
      conversionRate: impressions > 0 ? (clicks / impressions) * 100 : 0,
    },
    {
      name: "Leads",
      value: leads,
      conversionRate: clicks > 0 ? (leads / clicks) * 100 : 0,
    },
    {
      name: "Opportunities",
      value: opportunities,
      conversionRate: leads > 0 ? (opportunities / leads) * 100 : 0,
    },
    {
      name: "Customers",
      value: customers,
      conversionRate: opportunities > 0 ? (customers / opportunities) * 100 : 0,
    },
  ];
};
