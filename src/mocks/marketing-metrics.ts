/**
 * Mock data for unified marketing metrics and KPIs
 */
/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { ALL_CAMPAIGNS } from "./ad-platforms";
import { HUBSPOT_CONTACTS, HUBSPOT_DEALS, HUBSPOT_MEETINGS } from "./hubspot-data";

interface MarketingMetrics {
  campaignId?: string; // null for overall metrics
  campaignName?: string;
  platform?: "all" | "google" | "meta";
  period: { start: Date; end: Date };

  // Raw metrics
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  meetings: number;
  meetingsHonored: number; // Attended meetings
  dealsWon: number;
  revenue: number;

  // Computed metrics
  cpa: number; // Cost per acquisition (lead)
  cac: number; // Customer acquisition cost
  roas: number; // Return on ad spend
  ctr: number; // Click-through rate (%)
  conversionRateLeads: number; // Click → Lead %
  conversionRateRdv: number; // Lead → Meeting %
  conversionRateHonore: number; // Meeting → Attended %
  conversionRateSignes: number; // Attended → Deal %

  // Trends (compared to previous period)
  previousPeriodSpend?: number;
  spendDelta?: number; // Percentage change
  previousPeriodRoas?: number;
  roasDelta?: number; // Percentage change
  previousPeriodCac?: number;
  cacDelta?: number; // Percentage change
}

// Helper function to calculate metrics for a campaign
const calculateCampaignMetrics = (
  campaignId: string,
  period: { start: Date; end: Date },
): Omit<
  MarketingMetrics,
  "cacDelta" | "previousPeriodCac" | "previousPeriodRoas" | "previousPeriodSpend" | "roasDelta" | "spendDelta"
> => {
  const campaign = ALL_CAMPAIGNS.find((c) => c.id === campaignId);
  if (!campaign) {
    throw new Error(`Campaign ${campaignId} not found`);
  }

  // Get attributed contacts
  const contacts = HUBSPOT_CONTACTS.filter((c) => c.campaignId === campaignId);
  const leads = contacts.length;

  // Get meetings
  const contactIds = contacts.map((c) => c.id);
  const meetings = HUBSPOT_MEETINGS.filter((m) => contactIds.includes(m.contactId));
  const meetingsScheduled = meetings.length;
  const meetingsCompleted = meetings.filter((m) => m.outcome === "completed").length;

  // Get deals
  const deals = HUBSPOT_DEALS.filter((d) => contactIds.includes(d.contactId));
  const dealsWon = deals.filter((d) => d.stage === "closed-won").length;
  const revenue = deals.filter((d) => d.stage === "closed-won").reduce((sum, d) => sum + d.amount, 0);

  // Calculate metrics
  const { spend } = campaign;
  const { impressions } = campaign;
  const { clicks } = campaign;
  const ctr = (clicks / impressions) * 100;
  const conversionRateLeads = leads > 0 ? (leads / clicks) * 100 : 0;
  const conversionRateRdv = leads > 0 ? (meetingsScheduled / leads) * 100 : 0;
  const conversionRateHonore = meetingsScheduled > 0 ? (meetingsCompleted / meetingsScheduled) * 100 : 0;
  const conversionRateSignes = meetingsCompleted > 0 ? (dealsWon / meetingsCompleted) * 100 : 0;
  const cpa = leads > 0 ? spend / leads : 0;
  const cac = dealsWon > 0 ? spend / dealsWon : 0;
  const roas = spend > 0 ? revenue / spend : 0;

  return {
    campaignId,
    campaignName: campaign.name,
    platform: campaign.platform,
    period,
    spend,
    impressions,
    clicks,
    leads,
    meetings: meetingsScheduled,
    meetingsHonored: meetingsCompleted,
    dealsWon,
    revenue,
    cpa,
    cac,
    roas,
    ctr,
    conversionRateLeads,
    conversionRateRdv,
    conversionRateHonore,
    conversionRateSignes,
  };
};

// Calculate overall metrics (all campaigns)
export const OVERALL_METRICS: MarketingMetrics = {
  platform: "all",
  period: { start: new Date("2025-01-01"), end: new Date("2025-01-31") },

  // Aggregated from all campaigns
  spend: 156020,
  impressions: 9485000,
  clicks: 166670,
  leads: 103,
  meetings: 60,
  meetingsHonored: 54,
  dealsWon: 23,
  revenue: 1968000,

  // Computed
  cpa: 1515,
  cac: 6783,
  roas: 12.61,
  ctr: 1.76,
  conversionRateLeads: 0.062,
  conversionRateRdv: 58.25,
  conversionRateHonore: 90.0,
  conversionRateSignes: 42.59,

  // Previous period (December)
  previousPeriodSpend: 148500,
  spendDelta: 5.06,
  previousPeriodRoas: 11.85,
  roasDelta: 6.41,
  previousPeriodCac: 7250,
  cacDelta: -6.44,
};

// Calculate Meta metrics
export const META_METRICS: MarketingMetrics = {
  platform: "meta",
  period: { start: new Date("2025-01-01"), end: new Date("2025-01-31") },

  spend: 65270,
  impressions: 4335000,
  clicks: 73520,
  leads: 58,
  meetings: 32,
  meetingsHonored: 29,
  dealsWon: 12,
  revenue: 900000,

  cpa: 1125,
  cac: 5439,
  roas: 13.79,
  ctr: 1.7,
  conversionRateLeads: 0.079,
  conversionRateRdv: 55.17,
  conversionRateHonore: 90.63,
  conversionRateSignes: 41.38,

  previousPeriodSpend: 62800,
  spendDelta: 3.93,
  previousPeriodRoas: 12.95,
  roasDelta: 6.49,
  previousPeriodCac: 5850,
  cacDelta: -7.03,
};

// Calculate Google metrics
export const GOOGLE_METRICS: MarketingMetrics = {
  platform: "google",
  period: { start: new Date("2025-01-01"), end: new Date("2025-01-31") },

  spend: 90750,
  impressions: 5150000,
  clicks: 93150,
  leads: 45,
  meetings: 28,
  meetingsHonored: 25,
  dealsWon: 11,
  revenue: 1068000,

  cpa: 2017,
  cac: 8250,
  roas: 11.77,
  ctr: 1.81,
  conversionRateLeads: 0.048,
  conversionRateRdv: 62.22,
  conversionRateHonore: 89.29,
  conversionRateSignes: 44.0,

  previousPeriodSpend: 85700,
  spendDelta: 5.89,
  previousPeriodRoas: 10.85,
  roasDelta: 8.48,
  previousPeriodCac: 8820,
  cacDelta: -6.46,
};

// Per-campaign metrics for top performers
export const CAMPAIGN_METRICS: MarketingMetrics[] = [
  // Meta campaigns
  {
    ...calculateCampaignMetrics("meta-001", { start: new Date("2025-01-01"), end: new Date("2025-01-31") }),
    previousPeriodSpend: 11800,
    spendDelta: 5.51,
    previousPeriodRoas: 12.2,
    roasDelta: -8.2,
    previousPeriodCac: 6100,
    cacDelta: 4.26,
  },
  {
    ...calculateCampaignMetrics("meta-002", { start: new Date("2025-01-01"), end: new Date("2025-01-31") }),
    previousPeriodSpend: 8150,
    spendDelta: 9.45,
    previousPeriodRoas: 41.52,
    roasDelta: -32.0,
    previousPeriodCac: 3200,
    cacDelta: 45.31,
  },
  {
    ...calculateCampaignMetrics("meta-003", { start: new Date("2025-01-01"), end: new Date("2025-01-31") }),
    previousPeriodSpend: 6200,
    spendDelta: 9.35,
    previousPeriodRoas: 0.0,
    roasDelta: 0,
    previousPeriodCac: 0,
    cacDelta: 0,
  },
  {
    ...calculateCampaignMetrics("meta-004", { start: new Date("2025-01-01"), end: new Date("2025-01-31") }),
    previousPeriodSpend: 0,
    spendDelta: 0,
    previousPeriodRoas: 0,
    roasDelta: 0,
    previousPeriodCac: 0,
    cacDelta: 0,
  },

  // Google campaigns
  {
    ...calculateCampaignMetrics("google-001", { start: new Date("2025-01-01"), end: new Date("2025-01-31") }),
    previousPeriodSpend: 15200,
    spendDelta: 3.95,
    previousPeriodRoas: 21.05,
    roasDelta: -14.12,
    previousPeriodCac: 7850,
    cacDelta: -5.1,
  },
  {
    ...calculateCampaignMetrics("google-002", { start: new Date("2025-01-01"), end: new Date("2025-01-31") }),
    previousPeriodSpend: 6800,
    spendDelta: 6.62,
    previousPeriodRoas: 11.76,
    roasDelta: 1.87,
    previousPeriodCac: 8950,
    cacDelta: -8.38,
  },
  {
    ...calculateCampaignMetrics("google-003", { start: new Date("2025-01-01"), end: new Date("2025-01-31") }),
    previousPeriodSpend: 4650,
    spendDelta: 4.3,
    previousPeriodRoas: 42.15,
    roasDelta: -16.53,
    previousPeriodCac: 2450,
    cacDelta: 25.31,
  },
  {
    ...calculateCampaignMetrics("google-004", { start: new Date("2025-01-01"), end: new Date("2025-01-31") }),
    previousPeriodSpend: 0,
    spendDelta: 0,
    previousPeriodRoas: 0,
    roasDelta: 0,
    previousPeriodCac: 0,
    cacDelta: 0,
  },
  {
    ...calculateCampaignMetrics("google-008", { start: new Date("2025-01-01"), end: new Date("2025-01-31") }),
    previousPeriodSpend: 0,
    spendDelta: 0,
    previousPeriodRoas: 0,
    roasDelta: 0,
    previousPeriodCac: 0,
    cacDelta: 0,
  },
  {
    ...calculateCampaignMetrics("google-009", { start: new Date("2025-01-01"), end: new Date("2025-01-31") }),
    previousPeriodSpend: 0,
    spendDelta: 0,
    previousPeriodRoas: 0,
    roasDelta: 0,
    previousPeriodCac: 0,
    cacDelta: 0,
  },
];
