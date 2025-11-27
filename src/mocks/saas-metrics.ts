export interface MetricCard {
  id: string;
  name: string;
  value: number | string;
  previousValue?: number | string;
  delta: number; // percentage change
  trend: "down" | "neutral" | "up";
  format: "currency" | "number" | "percentage";
  category: "efficiency" | "growth" | "retention" | "revenue";
  description?: string;
  sparklineData?: number[];
}

interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

interface CohortData {
  cohort: string;
  month0: number;
  month1: number;
  month2: number;
  month3: number;
  month4: number;
  month5: number;
  month6: number;
}

interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
  conversionRate?: number;
}

export const SAAS_METRIC_CARDS: MetricCard[] = [
  {
    id: "mrr",
    name: "Monthly Recurring Revenue",
    value: "$127,450",
    previousValue: "$118,200",
    delta: 7.8,
    trend: "up",
    format: "currency",
    category: "revenue",
    description: "Total predictable revenue per month",
    sparklineData: [95000, 98000, 105000, 112000, 118200, 127450],
  },
  {
    id: "arr",
    name: "Annual Recurring Revenue",
    value: "$1.53M",
    previousValue: "$1.42M",
    delta: 7.8,
    trend: "up",
    format: "currency",
    category: "revenue",
    description: "MRR annualized",
    sparklineData: [1140000, 1176000, 1260000, 1344000, 1418400, 1529400],
  },
  {
    id: "new-mrr",
    name: "New Business MRR",
    value: "$18,300",
    previousValue: "$15,700",
    delta: 16.6,
    trend: "up",
    format: "currency",
    category: "growth",
    description: "MRR from new customers this month",
    sparklineData: [12000, 13500, 14200, 15700, 15700, 18300],
  },
  {
    id: "churn-mrr",
    name: "Churn MRR",
    value: "$9,050",
    previousValue: "$6,200",
    delta: 46.0,
    trend: "down",
    format: "currency",
    category: "retention",
    description: "Lost MRR from cancellations",
    sparklineData: [4500, 5200, 5800, 6200, 6200, 9050],
  },
  {
    id: "net-new-mrr",
    name: "Net New MRR",
    value: "$9,250",
    previousValue: "$9,500",
    delta: -2.6,
    trend: "down",
    format: "currency",
    category: "growth",
    description: "New + Expansion - Churn - Contraction",
    sparklineData: [7500, 8300, 8200, 9500, 9500, 9250],
  },
  {
    id: "active-customers",
    name: "Active Customers",
    value: 342,
    previousValue: 328,
    delta: 4.3,
    trend: "up",
    format: "number",
    category: "growth",
    description: "Paying customers with active subscriptions",
    sparklineData: [298, 305, 315, 328, 328, 342],
  },
  {
    id: "ltv",
    name: "Customer Lifetime Value",
    value: "$4,780",
    previousValue: "$4,520",
    delta: 5.8,
    trend: "up",
    format: "currency",
    category: "efficiency",
    description: "Average revenue per customer over lifetime",
  },
  {
    id: "cac",
    name: "Customer Acquisition Cost",
    value: "$1,240",
    previousValue: "$1,180",
    delta: 5.1,
    trend: "down",
    format: "currency",
    category: "efficiency",
    description: "Average cost to acquire a new customer",
  },
  {
    id: "ltv-cac-ratio",
    name: "LTV:CAC Ratio",
    value: "3.85:1",
    previousValue: "3.83:1",
    delta: 0.5,
    trend: "up",
    format: "number",
    category: "efficiency",
    description: "Lifetime value divided by acquisition cost",
  },
  {
    id: "payback-period",
    name: "CAC Payback Period",
    value: "8.2 months",
    previousValue: "8.5 months",
    delta: -3.5,
    trend: "up",
    format: "number",
    category: "efficiency",
    description: "Months to recover customer acquisition cost",
  },
  {
    id: "gross-churn",
    name: "Gross MRR Churn Rate",
    value: "7.1%",
    previousValue: "5.2%",
    delta: 36.5,
    trend: "down",
    format: "percentage",
    category: "retention",
    description: "Monthly churn rate (without expansion)",
  },
  {
    id: "net-churn",
    name: "Net MRR Churn Rate",
    value: "2.8%",
    previousValue: "1.9%",
    delta: 47.4,
    trend: "down",
    format: "percentage",
    category: "retention",
    description: "Monthly churn rate including expansion",
  },
];

export const MRR_TREND_DATA: ChartDataPoint[] = [
  { date: "2024-07", value: 95000 },
  { date: "2024-08", value: 98000 },
  { date: "2024-09", value: 105000 },
  { date: "2024-10", value: 112000 },
  { date: "2024-11", value: 118200 },
  { date: "2024-12", value: 127450 },
  { date: "2025-01", value: 135000 },
];

export const COHORT_RETENTION_DATA: CohortData[] = [
  { cohort: "2024-06", month0: 100, month1: 94, month2: 89, month3: 85, month4: 82, month5: 79, month6: 77 },
  { cohort: "2024-07", month0: 100, month1: 96, month2: 91, month3: 87, month4: 84, month5: 81, month6: 0 },
  { cohort: "2024-08", month0: 100, month1: 95, month2: 90, month3: 86, month4: 83, month5: 0, month6: 0 },
  { cohort: "2024-09", month0: 100, month1: 93, month2: 88, month3: 84, month4: 0, month5: 0, month6: 0 },
  { cohort: "2024-10", month0: 100, month1: 91, month2: 85, month3: 0, month4: 0, month5: 0, month6: 0 },
  { cohort: "2024-11", month0: 100, month1: 89, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0 },
  { cohort: "2024-12", month0: 100, month1: 0, month2: 0, month3: 0, month4: 0, month5: 0, month6: 0 },
];

export const FUNNEL_CONVERSION_DATA: FunnelStage[] = [
  { stage: "Website Visitors", count: 45200, percentage: 100, conversionRate: 100 },
  { stage: "Sign Ups", count: 2260, percentage: 5.0, conversionRate: 5.0 },
  { stage: "Activated Users", count: 1356, percentage: 3.0, conversionRate: 60.0 },
  { stage: "Trial Started", count: 904, percentage: 2.0, conversionRate: 66.7 },
  { stage: "Paid Customers", count: 271, percentage: 0.6, conversionRate: 30.0 },
];

export const CAC_BY_CHANNEL_DATA: ChartDataPoint[] = [
  { date: "Organic Search", value: 580 },
  { date: "Paid Search", value: 1450 },
  { date: "Social Media", value: 1820 },
  { date: "Referral", value: 420 },
  { date: "Direct", value: 320 },
  { date: "Content", value: 680 },
];
