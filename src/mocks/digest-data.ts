/* eslint-disable max-lines */
export type RecurrenceType = "daily" | "monthly" | "weekly";
export type DeliveryMethod = "both" | "email" | "in-app";
export type BlockType = "chart" | "insight" | "kpi" | "table" | "text";

// Block Configuration Types
export interface KPIBlockConfig {
  layout: "grid-2" | "grid-3" | "grid-4";
  comparisonPeriod: "last-month" | "last-quarter" | "last-week" | "last-year";
  showTrends: boolean;
  showPreviousValues: boolean;
}

export interface ChartBlockConfig {
  chartType: "area" | "bar" | "funnel" | "line" | "pie";
  showLegend: boolean;
  showDataLabels: boolean;
  colorScheme: "blue" | "green" | "multi" | "purple" | "red";
  height: "lg" | "md" | "sm" | "xl";
}

export interface TableBlockConfig {
  pageSize: 5 | 10 | 20 | 50;
  enableSorting: boolean;
  enableFiltering: boolean;
  density: "comfortable" | "compact" | "spacious";
  showRowNumbers: boolean;
}

export interface InsightBlockConfig {
  insightTypes: Array<"negative" | "neutral" | "positive" | "warning">;
  minConfidence: 0.5 | 0.6 | 0.7 | 0.8 | 0.9;
  maxInsights: 3 | 5 | 10;
  showRecommendations: boolean;
}

export interface TextBlockConfig {
  fontSize: "base" | "lg" | "sm";
  textAlign: "center" | "left" | "right";
  style: "default" | "emphasis" | "highlight";
}

export type BlockConfig =
  | { config: ChartBlockConfig; type: "chart" }
  | { config: InsightBlockConfig; type: "insight" }
  | { config: KPIBlockConfig; type: "kpi" }
  | { config: TableBlockConfig; type: "table" }
  | { config: TextBlockConfig; type: "text" };

// Default configurations for each block type
export const getDefaultBlockConfig = (blockType: BlockType): BlockConfig => {
  switch (blockType) {
    case "kpi":
      return {
        type: "kpi",
        config: {
          layout: "grid-4",
          comparisonPeriod: "last-month",
          showTrends: true,
          showPreviousValues: true,
        },
      };
    case "chart":
      return {
        type: "chart",
        config: {
          chartType: "bar",
          showLegend: true,
          showDataLabels: false,
          colorScheme: "blue",
          height: "md",
        },
      };
    case "table":
      return {
        type: "table",
        config: {
          pageSize: 10,
          enableSorting: true,
          enableFiltering: true,
          density: "comfortable",
          showRowNumbers: false,
        },
      };
    case "insight":
      return {
        type: "insight",
        config: {
          insightTypes: ["positive", "negative", "warning", "neutral"],
          minConfidence: 0.7,
          maxInsights: 5,
          showRecommendations: true,
        },
      };
    case "text":
      return {
        type: "text",
        config: {
          fontSize: "base",
          textAlign: "left",
          style: "default",
        },
      };
    default:
      return {
        type: "text",
        config: {
          fontSize: "base",
          textAlign: "left",
          style: "default",
        },
      };
  }
};

// Data interface definitions (defined before use)
export interface MetricSnapshot {
  name: string;
  value: number;
  change: number;
  trend: "down" | "stable" | "up";
  previousValue: number;
  unit?: string;
}

export interface FunnelStage {
  name: string;
  value: number;
  conversionRate: number;
  dropOffRate: number;
  change: number;
  previousValue: number;
}

export interface FunnelData {
  stages: FunnelStage[];
  comparisonPeriod?: string;
  totalConversions: number;
  overallConversionRate: number;
}

export interface FeatureUsage {
  name: string;
  users: number;
  sessions: number;
  change: number;
  trend: "down" | "stable" | "up";
}

export interface UsageData {
  features: FeatureUsage[];
  totalUsers: number;
  activeUsers: number;
  topFeatures: string[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  color?: string;
}

export interface ChartData {
  chartType: "area" | "bar" | "funnel" | "line" | "pie";
  datasets: ChartDataset[];
  labels: string[];
  comparisonPeriod?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  type: "currency" | "date" | "number" | "percentage" | "text";
  sortable?: boolean;
}

export interface TableRow {
  id: string;
  cells: Record<string, number | string>;
}

export interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
  totalRows?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export interface InsightData {
  insightType: "negative" | "neutral" | "positive" | "warning";
  summary: string;
  details: string[];
  recommendations?: string[];
  confidence?: number;
}

export interface BlockResult {
  executedAt: Date;
  confidenceScore?: number;
  metrics?: MetricSnapshot[];
  chartData?: ChartData;
  tableData?: TableData;
  insightData?: InsightData;
  textContent?: string;
  // Legacy support - will be migrated to chartData/tableData
  funnelData?: FunnelData;
  usageData?: UsageData;
  explanation?: string;
}

export interface DigestBlock {
  id: string;
  type: BlockType;
  title: string;
  order: number;
  prompt?: string;
  dataSources?: string[];
  kpis?: string[];
  config?: BlockConfig;
  lastExecution?: BlockResult;
}

export interface Digest {
  id: string;
  title: string;
  description?: string;
  recurrence: RecurrenceType;
  deliveryMethod: DeliveryMethod;
  isActive: boolean;
  blocks: DigestBlock[];
  createdAt: Date;
  lastExecutedAt?: Date;
  nextExecutionAt?: Date | undefined;
  owner: string;
}

// Mock Data
export const MOCK_DIGESTS: Digest[] = [
  {
    id: "digest-1",
    title: "Executive Weekly Summary",
    description: "High-level KPIs and business health metrics for leadership team",
    recurrence: "weekly",
    deliveryMethod: "both",
    isActive: true,
    owner: "John Doe",
    createdAt: new Date("2025-01-15"),
    lastExecutedAt: new Date("2025-01-20"),
    nextExecutionAt: new Date("2025-01-27"),
    blocks: [
      {
        id: "block-1-0",
        type: "text",
        title: "Executive Summary",
        order: 0,
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          textContent:
            "This week brought exceptional results across the board. Our business is showing strong momentum with accelerating revenue growth, improved customer metrics, and expanding market reach. Let's dive into the key performance indicators that paint a picture of sustained growth.",
        },
      },
      {
        id: "block-1-1",
        type: "kpi",
        title: "Revenue & Growth Metrics",
        order: 1,
        prompt: "Show me key revenue metrics and growth trends",
        dataSources: ["stripe", "hubspot"],
        kpis: ["mrr", "arr", "growth_rate"],
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          confidenceScore: 0.95,
          metrics: [
            {
              name: "Monthly Recurring Revenue",
              value: 284500,
              change: 12.5,
              trend: "up",
              previousValue: 252889,
              unit: "$",
            },
            {
              name: "Annual Recurring Revenue",
              value: 3414000,
              change: 15.2,
              trend: "up",
              previousValue: 2963500,
              unit: "$",
            },
            {
              name: "Customer Count",
              value: 1247,
              change: 8.3,
              trend: "up",
              previousValue: 1151,
            },
            {
              name: "Churn Rate",
              value: 2.4,
              change: -0.8,
              trend: "down",
              previousValue: 3.2,
              unit: "%",
            },
          ],
          explanation:
            "Revenue growth continues strong with MRR up 12.5% and ARR reaching $3.4M. Customer acquisition accelerated this period while churn improved to 2.4%.",
        },
      },
      {
        id: "block-1-2",
        type: "text",
        title: "Revenue Performance Analysis",
        order: 2,
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          textContent:
            "The revenue numbers tell a compelling story. MRR grew 12.5% to reach $284.5K, while our annual run rate now stands at $3.4M - a 15.2% increase. This growth is even more impressive when you consider that we simultaneously reduced churn to 2.4%, down from 3.2%. Customer acquisition accelerated with 96 net new customers added this period. These metrics suggest we're not just growing, but growing sustainably with improving unit economics.",
        },
      },
      {
        id: "block-1-3",
        type: "text",
        title: "Understanding Revenue Composition",
        order: 3,
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          textContent:
            "To understand where this growth is coming from, we need to look at our product mix. Our tiered pricing strategy continues to drive expansion, with different customer segments contributing uniquely to our overall revenue picture.",
        },
      },
      {
        id: "block-1-5",
        type: "chart",
        title: "Revenue by Product Line",
        order: 5,
        prompt: "Show revenue breakdown by product category",
        dataSources: ["stripe"],
        config: {
          type: "chart",
          config: {
            chartType: "bar",
            showLegend: true,
            showDataLabels: true,
            colorScheme: "multi",
            height: "md",
          },
        },
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          confidenceScore: 0.93,
          chartData: {
            chartType: "bar",
            labels: ["Enterprise", "Professional", "Starter", "Add-ons", "Services"],
            datasets: [
              {
                label: "Current Month",
                data: [145000, 89000, 32500, 12000, 6000],
                color: "#3b82f6",
              },
              {
                label: "Previous Month",
                data: [132000, 78000, 28000, 10000, 4889],
                color: "#94a3b8",
              },
            ],
          },
          explanation:
            "Enterprise tier shows strongest growth (+9.8%), driven by 3 new enterprise deals. Professional tier grew 14% with improved conversion from starter upgrades. Consider focusing sales efforts on enterprise pipeline.",
        },
      },
      {
        id: "block-1-6",
        type: "text",
        title: "Product Mix Insights",
        order: 6,
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          textContent:
            "The Enterprise tier is our growth engine this month, jumping from $132K to $145K thanks to three strategic deals that closed. Meanwhile, the Professional tier shows healthy 14% growth, largely driven by customers upgrading from Starter plans - a sign our product ladder is working. The data suggests we should double down on enterprise pipeline development while continuing to nurture the upgrade path from Starter to Professional.",
        },
      },
      {
        id: "block-1-7",
        type: "text",
        title: "Customer Acquisition Analysis",
        order: 7,
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          textContent:
            "With revenue growing, the natural question is: where are these customers coming from? Understanding our acquisition channels helps us allocate marketing budget effectively and identify opportunities for scaling our most efficient channels.",
        },
      },
      {
        id: "block-1-8",
        type: "chart",
        title: "Customer Acquisition Channels",
        order: 8,
        prompt: "Show customer acquisition breakdown by marketing channel",
        dataSources: ["google-analytics", "hubspot"],
        config: {
          type: "chart",
          config: {
            chartType: "pie",
            showLegend: true,
            showDataLabels: true,
            colorScheme: "multi",
            height: "md",
          },
        },
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          confidenceScore: 0.89,
          chartData: {
            chartType: "pie",
            labels: ["Organic Search", "Direct", "Paid Search", "Referral", "Social Media", "Email"],
            datasets: [
              {
                label: "New Customers",
                data: [342, 198, 156, 124, 89, 67],
                color: "#3b82f6",
              },
            ],
          },
          explanation:
            "Organic search continues to be the dominant channel (35% of new customers), boosted by recent content marketing efforts. Paid search ROI improved 23% this month. Social media channel underperforming - recommend budget reallocation to organic and paid search.",
        },
      },
      {
        id: "block-1-9",
        type: "text",
        title: "Channel Performance Breakdown",
        order: 9,
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          textContent:
            "Organic search dominates our acquisition mix at 35% of new customers, a testament to our content marketing investments paying off. Paid search is delivering strong ROI with a 23% improvement this month. However, social media is underperforming relative to spend - we should consider reallocating that budget to our proven winners in organic and paid search.",
        },
      },
      {
        id: "block-1-10",
        type: "text",
        title: "Conversion Funnel Deep Dive",
        order: 10,
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          textContent:
            "While top-line growth is strong, we need to examine our conversion funnel carefully. Traffic is up significantly, but are we converting that traffic efficiently through each stage of the customer journey? Let's analyze where we're winning and where we're losing potential customers.",
        },
      },
      {
        id: "block-1-11",
        type: "chart",
        title: "Sales Funnel Analysis",
        order: 11,
        prompt: "Analyze sales funnel performance and identify bottlenecks",
        dataSources: ["hubspot", "google-analytics"],
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          confidenceScore: 0.92,
          funnelData: {
            totalConversions: 87,
            overallConversionRate: 3.48,
            comparisonPeriod: "Previous week",
            stages: [
              {
                name: "Website Visitors",
                value: 25000,
                conversionRate: 100,
                dropOffRate: 0,
                change: 15.2,
                previousValue: 21700,
              },
              {
                name: "Signup Started",
                value: 2500,
                conversionRate: 10.0,
                dropOffRate: 90.0,
                change: 8.5,
                previousValue: 2304,
              },
              {
                name: "Trial Activated",
                value: 1250,
                conversionRate: 50.0,
                dropOffRate: 50.0,
                change: 12.3,
                previousValue: 1113,
              },
              {
                name: "Engagement Milestone",
                value: 425,
                conversionRate: 34.0,
                dropOffRate: 66.0,
                change: -5.4,
                previousValue: 449,
              },
              {
                name: "Paid Conversion",
                value: 87,
                conversionRate: 20.5,
                dropOffRate: 79.5,
                change: -18.7,
                previousValue: 107,
              },
            ],
          },
          explanation:
            "Traffic and trial activation performing well, but engagement and paid conversion stages need attention. The 18.7% drop in paid conversions aligns with the pricing page anomaly. Consider re-engaging the 338 users stuck at engagement milestone.",
        },
      },
      {
        id: "block-1-12",
        type: "insight",
        title: "Growth Acceleration Opportunity",
        order: 12,
        prompt: "Analyze growth patterns and identify opportunities",
        dataSources: ["stripe", "hubspot", "google-analytics"],
        config: {
          type: "insight",
          config: {
            insightTypes: ["positive"],
            minConfidence: 0.8,
            maxInsights: 5,
            showRecommendations: true,
          },
        },
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          confidenceScore: 0.91,
          insightData: {
            insightType: "positive",
            summary:
              "Your business is experiencing strong momentum across multiple metrics. MRR growth is accelerating (+12.5% MoM), customer acquisition is up 8.3%, and churn has improved to 2.4%. The combination of these factors suggests you're entering a high-growth phase.",
            details: [
              "MRR growth rate has accelerated from 8% to 12.5% over the last 3 months, indicating compound growth momentum",
              "Customer acquisition cost (CAC) has decreased 12% while customer lifetime value (CLV) increased 6.8%, improving unit economics",
              "Organic traffic spike (+87%) from viral content presents a time-sensitive opportunity to capture market share",
              "Trial-to-paid conversion optimization could unlock an additional $45K MRR with current traffic levels",
            ],
            recommendations: [
              "Scale paid acquisition channels while CAC is favorable - current ROI supports 30-40% budget increase",
              "Launch targeted campaigns to capitalize on the organic traffic surge before momentum fades",
              "Prioritize fixing the trial conversion drop - recovering to baseline would add ~15 customers/month",
              "Consider expanding enterprise focus given the 9.8% growth in that segment with strong margins",
            ],
            confidence: 0.91,
          },
        },
      },
      {
        id: "block-1-13",
        type: "insight",
        title: "Conversion Funnel Alert",
        order: 13,
        prompt: "Identify bottlenecks in the conversion funnel",
        dataSources: ["hubspot", "google-analytics"],
        config: {
          type: "insight",
          config: {
            insightTypes: ["warning"],
            minConfidence: 0.7,
            maxInsights: 5,
            showRecommendations: true,
          },
        },
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          confidenceScore: 0.88,
          insightData: {
            insightType: "warning",
            summary:
              "Trial-to-paid conversion rate has dropped 33% below expected levels, coinciding with pricing page changes deployed on January 15th. This represents a potential revenue loss of $18K MRR if not addressed quickly.",
            details: [
              "Conversion rate declined from 18.5% to 12.3% immediately after new pricing page launch",
              "Drop-off analysis shows 68% of users who view pricing don't proceed to checkout (up from 45%)",
              "User session recordings indicate confusion around new tiered pricing structure",
              "338 users currently stuck at 'engagement milestone' - strong candidates for conversion with proper nurturing",
            ],
            recommendations: [
              "Immediately A/B test reverting to previous pricing page design while analyzing feedback",
              "Add clearer value proposition messaging and comparison table to new pricing page",
              "Implement exit-intent survey to understand specific objections causing drop-off",
              "Launch targeted email campaign to the 338 engaged users highlighting key features and offering personalized demos",
              "Consider adding a 'Chat with Sales' option on pricing page for immediate objection handling",
            ],
            confidence: 0.88,
          },
        },
      },
      {
        id: "block-1-14",
        type: "text",
        title: "Summary and Next Steps",
        order: 14,
        lastExecution: {
          executedAt: new Date("2025-01-20"),
          textContent:
            "This week presents a clear picture: we're in a strong growth phase with solid fundamentals, but we have a critical conversion issue that needs immediate attention. The pricing page changes are costing us revenue, while our enterprise segment and organic channels are firing on all cylinders. Our priorities should be: (1) Fix the pricing page conversion drop immediately, (2) Scale our proven acquisition channels, and (3) Capitalize on the enterprise momentum. If we execute on these fronts, we're positioned for accelerated growth in the coming weeks.",
        },
      },
    ],
  },
  {
    id: "digest-2",
    title: "Product Adoption Daily Check",
    description: "Daily snapshot of product usage and feature adoption",
    recurrence: "daily",
    deliveryMethod: "in-app",
    isActive: true,
    owner: "John Doe",
    createdAt: new Date("2025-01-10"),
    lastExecutedAt: new Date("2025-01-24"),
    nextExecutionAt: new Date("2025-01-25"),
    blocks: [
      {
        id: "block-2-1",
        type: "table",
        title: "Feature Adoption Trends",
        order: 1,
        prompt: "Show feature usage patterns and adoption rates",
        dataSources: ["mixpanel", "amplitude"],
        lastExecution: {
          executedAt: new Date("2025-01-24"),
          confidenceScore: 0.91,
          usageData: {
            totalUsers: 1247,
            activeUsers: 892,
            topFeatures: ["Dashboard", "Reports", "Integrations", "AI Chat", "Alerts"],
            features: [
              {
                name: "AI Chat Assistant",
                users: 645,
                sessions: 3420,
                change: 28.5,
                trend: "up",
              },
              {
                name: "Custom Dashboards",
                users: 523,
                sessions: 1847,
                change: 5.2,
                trend: "up",
              },
              {
                name: "Data Reconciliation",
                users: 378,
                sessions: 892,
                change: -3.1,
                trend: "down",
              },
              {
                name: "Automated Alerts",
                users: 289,
                sessions: 645,
                change: 0.8,
                trend: "stable",
              },
              {
                name: "API Integrations",
                users: 234,
                sessions: 456,
                change: 12.4,
                trend: "up",
              },
            ],
          },
          explanation:
            "AI Chat Assistant seeing strong adoption with 28.5% growth in active users. Custom Dashboards remain popular. Data Reconciliation usage declining slightly - may need feature education campaign.",
        },
      },
      {
        id: "block-2-2",
        type: "kpi",
        title: "Daily Engagement Metrics",
        order: 2,
        prompt: "Show daily active users and engagement KPIs",
        dataSources: ["mixpanel"],
        kpis: ["dau", "session_duration", "feature_adoption"],
        lastExecution: {
          executedAt: new Date("2025-01-24"),
          confidenceScore: 0.94,
          metrics: [
            {
              name: "Daily Active Users",
              value: 892,
              change: 4.2,
              trend: "up",
              previousValue: 856,
            },
            {
              name: "Avg Session Duration",
              value: 18.5,
              change: 8.8,
              trend: "up",
              previousValue: 17.0,
              unit: "min",
            },
            {
              name: "Feature Adoption Rate",
              value: 68.2,
              change: 2.1,
              trend: "up",
              previousValue: 66.8,
              unit: "%",
            },
            {
              name: "User Satisfaction Score",
              value: 4.6,
              change: 0.2,
              trend: "up",
              previousValue: 4.4,
              unit: "/5",
            },
          ],
          explanation:
            "Strong engagement metrics across the board. Session duration increased to 18.5 minutes, suggesting users are finding value. Satisfaction score at all-time high of 4.6/5.",
        },
      },
    ],
  },
  {
    id: "digest-3",
    title: "Marketing Performance Monthly",
    description: "Monthly marketing campaign and channel performance review",
    recurrence: "monthly",
    deliveryMethod: "email",
    isActive: true,
    owner: "John Doe",
    createdAt: new Date("2024-12-01"),
    lastExecutedAt: new Date("2025-01-01"),
    nextExecutionAt: new Date("2025-02-01"),
    blocks: [
      {
        id: "block-3-0",
        type: "text",
        title: "Executive Summary",
        order: 0,
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          textContent:
            "December 2024 marked an exceptional month for marketing performance. Our campaigns delivered record-breaking results with a 4.2x return on ad spend while simultaneously reducing customer acquisition costs by 12.3%. Total marketing spend of $156,000 generated 1,245 marketing qualified leads and 892 new customers, representing our strongest month-over-month growth this year. This comprehensive report analyzes performance across channels, campaigns, and customer segments to identify what's driving success and where we should invest in 2025.",
        },
      },
      {
        id: "block-3-1",
        type: "kpi",
        title: "Key Marketing Metrics Overview",
        order: 1,
        prompt: "Show top-level marketing performance KPIs",
        dataSources: ["google-ads", "facebook-ads", "linkedin", "hubspot"],
        kpis: ["ctr", "conversion_rate", "cac", "roas"],
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          confidenceScore: 0.94,
          metrics: [
            {
              name: "Overall Click-Through Rate",
              value: 3.8,
              change: 15.2,
              trend: "up",
              previousValue: 3.3,
              unit: "%",
            },
            {
              name: "Lead Conversion Rate",
              value: 12.8,
              change: 5.4,
              trend: "up",
              previousValue: 12.14,
              unit: "%",
            },
            {
              name: "Cost Per Acquisition",
              value: 284,
              change: -12.3,
              trend: "down",
              previousValue: 324,
              unit: "$",
            },
            {
              name: "Return on Ad Spend",
              value: 4.2,
              change: 18.5,
              trend: "up",
              previousValue: 3.54,
              unit: "x",
            },
          ],
          explanation:
            "All key metrics trending positively. CTR improved 15.2% month-over-month driven by better ad creative and audience targeting. CPA decreased while conversion rates increased, indicating improved campaign efficiency.",
        },
      },
      {
        id: "block-3-2",
        type: "text",
        title: "Performance Analysis",
        order: 2,
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          textContent:
            "The standout story this month is the remarkable improvement in efficiency metrics. Our click-through rate jumped to 3.8%, a 15.2% increase that signals our messaging is resonating better with target audiences. More impressively, we're converting those clicks at a higher rate (12.8%) while paying less per customer ($284, down 12.3%). This virtuous cycle - better targeting leading to higher engagement and more efficient conversions - is exactly what we've been working toward. The 4.2x ROAS represents our highest level yet, suggesting we've found product-market-channel fit in several key segments.",
        },
      },
      {
        id: "block-3-3",
        type: "chart",
        title: "Campaign Performance Over Time",
        order: 3,
        prompt: "Show campaign performance trends across the month",
        dataSources: ["google-ads", "facebook-ads", "linkedin"],
        config: {
          type: "chart",
          config: {
            chartType: "line",
            showLegend: true,
            showDataLabels: false,
            colorScheme: "multi",
            height: "md",
          },
        },
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          confidenceScore: 0.91,
          chartData: {
            chartType: "line",
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
              {
                label: "Conversions",
                data: [198, 215, 234, 245],
                color: "#3b82f6",
              },
              {
                label: "MQLs",
                data: [285, 298, 325, 337],
                color: "#10b981",
              },
              {
                label: "CTR (%)",
                data: [3.2, 3.5, 3.9, 4.1],
                color: "#f59e0b",
              },
            ],
            comparisonPeriod: "December 2024",
          },
          explanation:
            "Consistent week-over-week improvement across all metrics. The upward trajectory in Week 4 suggests momentum heading into January. CTR improvements accelerated in the second half of the month after creative refresh.",
        },
      },
      {
        id: "block-3-4",
        type: "text",
        title: "Campaign Insights",
        order: 4,
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          textContent:
            "The weekly trend data reveals sustained momentum throughout December. Rather than the typical holiday slowdown, we saw acceleration in Week 3 and 4, driven primarily by our year-end promotional campaigns and refreshed ad creative. The CTR improvement from 3.2% to 4.1% over four weeks demonstrates that our mid-month creative optimization had significant impact. MQL volume grew steadily, with Week 4 hitting an all-time high of 337 leads. This consistent growth pattern gives us confidence to scale budget heading into Q1.",
        },
      },
      {
        id: "block-3-5",
        type: "table",
        title: "Detailed Campaign Breakdown",
        order: 5,
        prompt: "Show detailed metrics for each marketing campaign",
        dataSources: ["google-ads", "facebook-ads", "linkedin"],
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          confidenceScore: 0.93,
          tableData: {
            columns: [
              { key: "campaign", label: "Campaign Name", type: "text", sortable: true },
              { key: "impressions", label: "Impressions", type: "number", sortable: true },
              { key: "clicks", label: "Clicks", type: "number", sortable: true },
              { key: "ctr", label: "CTR", type: "percentage", sortable: true },
              { key: "conversions", label: "Conversions", type: "number", sortable: true },
              { key: "conversionRate", label: "Conv. Rate", type: "percentage", sortable: true },
              { key: "spend", label: "Spend", type: "currency", sortable: true },
              { key: "cpa", label: "CPA", type: "currency", sortable: true },
              { key: "roas", label: "ROAS", type: "number", sortable: true },
            ],
            rows: [
              {
                id: "camp-1",
                cells: {
                  campaign: "LinkedIn - Enterprise Targeting",
                  impressions: 487500,
                  clicks: 21938,
                  ctr: 4.5,
                  conversions: 312,
                  conversionRate: 14.2,
                  spend: 68400,
                  cpa: 219,
                  roas: 5.8,
                },
              },
              {
                id: "camp-2",
                cells: {
                  campaign: "Google Search - High Intent",
                  impressions: 325000,
                  clicks: 13000,
                  ctr: 4.0,
                  conversions: 267,
                  conversionRate: 20.5,
                  spend: 42900,
                  cpa: 161,
                  roas: 6.2,
                },
              },
              {
                id: "camp-3",
                cells: {
                  campaign: "Facebook - Retargeting",
                  impressions: 892000,
                  clicks: 26760,
                  ctr: 3.0,
                  conversions: 189,
                  conversionRate: 7.1,
                  spend: 28600,
                  cpa: 151,
                  roas: 4.1,
                },
              },
              {
                id: "camp-4",
                cells: {
                  campaign: "Google Display - Awareness",
                  impressions: 1240000,
                  clicks: 24800,
                  ctr: 2.0,
                  conversions: 74,
                  conversionRate: 3.0,
                  spend: 12400,
                  cpa: 168,
                  roas: 2.9,
                },
              },
              {
                id: "camp-5",
                cells: {
                  campaign: "LinkedIn - Content Syndication",
                  impressions: 156000,
                  clicks: 4680,
                  ctr: 3.0,
                  conversions: 50,
                  conversionRate: 10.7,
                  spend: 3700,
                  cpa: 74,
                  roas: 3.8,
                },
              },
            ],
            totalRows: 5,
          },
          explanation:
            "LinkedIn Enterprise Targeting and Google Search High Intent campaigns are clear winners with highest ROAS. Facebook Retargeting delivers solid volume at reasonable cost. Display campaigns need optimization or budget reallocation.",
        },
      },
      {
        id: "block-3-6",
        type: "chart",
        title: "Channel Performance Comparison",
        order: 6,
        prompt: "Compare marketing channels by key metrics",
        dataSources: ["google-ads", "facebook-ads", "linkedin", "google-analytics"],
        config: {
          type: "chart",
          config: {
            chartType: "bar",
            showLegend: true,
            showDataLabels: true,
            colorScheme: "multi",
            height: "md",
          },
        },
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          confidenceScore: 0.92,
          chartData: {
            chartType: "bar",
            labels: ["LinkedIn", "Google Search", "Facebook", "Google Display", "Email", "Organic"],
            datasets: [
              {
                label: "Conversions",
                data: [362, 267, 189, 74, 145, 98],
                color: "#3b82f6",
              },
              {
                label: "ROAS",
                data: [5.8, 6.2, 4.1, 2.9, 8.4, 0],
                color: "#10b981",
              },
            ],
          },
          explanation:
            "LinkedIn and Google Search drive highest quality traffic. Email continues to deliver exceptional ROI at 8.4x ROAS. Organic conversions growing but need continued SEO investment.",
        },
      },
      {
        id: "block-3-7",
        type: "text",
        title: "Channel Analysis",
        order: 7,
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          textContent:
            "Our channel mix is performing well, but there's clear separation between top and bottom performers. LinkedIn and Google Search are the workhorses, combining for 629 conversions (56% of total) with excellent ROAS above 5.8x. Email marketing continues to be our efficiency champion at 8.4x ROAS, though at lower volume. The data suggests we should shift budget from Google Display (2.9x ROAS) toward scaling our proven winners - particularly LinkedIn enterprise targeting and Google high-intent search campaigns. Facebook retargeting occupies a solid middle ground, delivering volume at acceptable efficiency.",
        },
      },
      {
        id: "block-3-8",
        type: "table",
        title: "Channel Metrics Detail",
        order: 8,
        prompt: "Show detailed channel performance metrics",
        dataSources: ["google-analytics", "google-ads", "facebook-ads", "linkedin"],
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          confidenceScore: 0.9,
          tableData: {
            columns: [
              { key: "channel", label: "Channel", type: "text", sortable: true },
              { key: "traffic", label: "Traffic", type: "number", sortable: true },
              { key: "bounceRate", label: "Bounce Rate", type: "percentage", sortable: true },
              { key: "avgSession", label: "Avg. Session (min)", type: "number", sortable: true },
              { key: "conversions", label: "Conversions", type: "number", sortable: true },
              { key: "spend", label: "Spend", type: "currency", sortable: true },
              { key: "cpa", label: "CPA", type: "currency", sortable: true },
            ],
            rows: [
              {
                id: "chan-1",
                cells: {
                  channel: "LinkedIn Ads",
                  traffic: 21938,
                  bounceRate: 38.2,
                  avgSession: 4.8,
                  conversions: 362,
                  spend: 72100,
                  cpa: 199,
                },
              },
              {
                id: "chan-2",
                cells: {
                  channel: "Google Search",
                  traffic: 13000,
                  bounceRate: 42.5,
                  avgSession: 3.2,
                  conversions: 267,
                  spend: 42900,
                  cpa: 161,
                },
              },
              {
                id: "chan-3",
                cells: {
                  channel: "Facebook Ads",
                  traffic: 26760,
                  bounceRate: 52.1,
                  avgSession: 2.1,
                  conversions: 189,
                  spend: 28600,
                  cpa: 151,
                },
              },
              {
                id: "chan-4",
                cells: {
                  channel: "Email Marketing",
                  traffic: 8920,
                  bounceRate: 28.4,
                  avgSession: 6.5,
                  conversions: 145,
                  spend: 4200,
                  cpa: 29,
                },
              },
              {
                id: "chan-5",
                cells: {
                  channel: "Google Display",
                  traffic: 24800,
                  bounceRate: 68.9,
                  avgSession: 0.8,
                  conversions: 74,
                  spend: 12400,
                  cpa: 168,
                },
              },
              {
                id: "chan-6",
                cells: {
                  channel: "Organic Search",
                  traffic: 15600,
                  bounceRate: 45.2,
                  avgSession: 4.2,
                  conversions: 98,
                  spend: 0,
                  cpa: 0,
                },
              },
            ],
            totalRows: 6,
          },
          explanation:
            "Email drives highest engagement (6.5 min avg session, 28.4% bounce) at lowest cost. LinkedIn traffic is high quality with strong session duration. Display has concerning 68.9% bounce rate - creative needs attention.",
        },
      },
      {
        id: "block-3-9",
        type: "text",
        title: "ROI Analysis",
        order: 9,
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          textContent:
            "When we examine the full customer journey, the ROI picture becomes even more compelling. Our average customer lifetime value is $1,247, meaning that at a blended CPA of $284, we're achieving a 4.4:1 LTV:CAC ratio - well above the healthy 3:1 threshold. Email marketing stands out with an incredible $29 CPA, making it 10x more efficient than our next-best channel. This suggests our nurture sequences are working exceptionally well and we should consider testing more aggressive email acquisition tactics. The higher CPAs on paid channels (LinkedIn at $199, Google at $161) are acceptable given the quality and speed of acquisition, but there's room for improvement through better landing page optimization and offer testing.",
        },
      },
      {
        id: "block-3-10",
        type: "kpi",
        title: "ROI & Efficiency Metrics",
        order: 10,
        prompt: "Show marketing ROI and efficiency indicators",
        dataSources: ["stripe", "google-ads", "facebook-ads", "linkedin"],
        kpis: ["ltv_cac_ratio", "payback_period", "mql_sql_rate", "sql_customer_rate"],
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          confidenceScore: 0.89,
          metrics: [
            {
              name: "LTV:CAC Ratio",
              value: 4.4,
              change: 8.6,
              trend: "up",
              previousValue: 4.05,
              unit: ":1",
            },
            {
              name: "CAC Payback Period",
              value: 8.2,
              change: -15.5,
              trend: "down",
              previousValue: 9.7,
              unit: "months",
            },
            {
              name: "MQL to SQL Rate",
              value: 28.5,
              change: 3.2,
              trend: "up",
              previousValue: 27.6,
              unit: "%",
            },
            {
              name: "SQL to Customer Rate",
              value: 45.2,
              change: 6.8,
              trend: "up",
              previousValue: 42.3,
              unit: "%",
            },
          ],
          explanation:
            "Unit economics improving across the board. Payback period decreased to 8.2 months (down 15.5%) while LTV:CAC ratio expanded to 4.4:1. Conversion funnel efficiency gains driving better ROI.",
        },
      },
      {
        id: "block-3-11",
        type: "chart",
        title: "Marketing Conversion Funnel",
        order: 11,
        prompt: "Analyze marketing conversion funnel performance",
        dataSources: ["google-analytics", "hubspot"],
        config: {
          type: "chart",
          config: {
            chartType: "funnel",
            showLegend: false,
            showDataLabels: true,
            colorScheme: "blue",
            height: "md",
          },
        },
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          confidenceScore: 0.94,
          funnelData: {
            totalConversions: 892,
            overallConversionRate: 0.78,
            comparisonPeriod: "November 2024",
            stages: [
              {
                name: "Website Visitors",
                value: 114800,
                conversionRate: 100,
                dropOffRate: 0,
                change: 12.4,
                previousValue: 102100,
              },
              {
                name: "Engaged Visitors",
                value: 34440,
                conversionRate: 30.0,
                dropOffRate: 70.0,
                change: 8.2,
                previousValue: 31830,
              },
              {
                name: "Marketing Qualified Leads",
                value: 1245,
                conversionRate: 3.6,
                dropOffRate: 96.4,
                change: 22.1,
                previousValue: 1020,
              },
              {
                name: "Sales Qualified Leads",
                value: 355,
                conversionRate: 28.5,
                dropOffRate: 71.5,
                change: 18.7,
                previousValue: 299,
              },
              {
                name: "Customers",
                value: 892,
                conversionRate: 251.3,
                dropOffRate: 0,
                change: 15.3,
                previousValue: 774,
              },
            ],
          },
          explanation:
            "Strong funnel performance with 22.1% increase in MQLs. Engagement rate (30%) and MQL conversion (3.6%) both improved from previous month. SQL to customer conversion at exceptional 251.3% indicates quality scoring and sales efficiency.",
        },
      },
      {
        id: "block-3-12",
        type: "text",
        title: "Funnel Optimization Insights",
        order: 12,
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          textContent:
            "The funnel analysis reveals several opportunities and wins. First, the positive: our MQL volume grew 22.1% while maintaining conversion quality, evidenced by the 18.7% increase in SQLs. The anomalous 251.3% SQL-to-customer conversion rate reflects our pipeline velocity - we're converting SQLs from previous months while also generating new ones, creating a temporary ratio above 100%. The engagement rate of 30% is solid but represents our biggest opportunity for improvement. If we can move that from 30% to 35% through better landing pages and initial user experience, we'd add approximately 200 more MQLs per month without increasing spend. Similarly, the 3.6% MQL rate suggests room for optimization in our lead capture mechanisms and offer strength.",
        },
      },
      {
        id: "block-3-13",
        type: "insight",
        title: "Top Performing Segments",
        order: 13,
        prompt: "Identify best performing customer segments and campaigns",
        dataSources: ["google-ads", "facebook-ads", "linkedin", "hubspot"],
        config: {
          type: "insight",
          config: {
            insightTypes: ["positive"],
            minConfidence: 0.8,
            maxInsights: 5,
            showRecommendations: true,
          },
        },
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          confidenceScore: 0.91,
          insightData: {
            insightType: "positive",
            summary:
              "Enterprise segment campaigns on LinkedIn delivered exceptional results with 5.8x ROAS and 14.2% conversion rate, significantly outperforming all other segments. This represents a 45% improvement over previous quarter's enterprise performance.",
            details: [
              "LinkedIn enterprise targeting generated 312 conversions at $219 CPA, with average deal value of $1,268 resulting in 5.8x ROAS",
              "Enterprise segment shows 38.2% lower bounce rate and 4.8 minute average session duration vs. 2.1 minute site average",
              "Google Search high-intent campaigns achieved 6.2x ROAS with 20.5% conversion rate - highest conversion efficiency across all campaigns",
              "Email nurture sequences for enterprise prospects converting at 14.7% (vs. 7.2% for SMB), with 6.5 minute engagement time",
              "Retargeting campaigns showing 3x higher conversion rate for enterprise visitors vs. SMB segment",
            ],
            recommendations: [
              "Increase LinkedIn enterprise budget by 40% to capitalize on proven ROAS - current performance supports $95,000+ monthly spend",
              "Expand Google Search high-intent keyword coverage to capture additional enterprise search volume",
              "Develop enterprise-specific landing pages to further reduce bounce rate and improve conversion",
              "Create dedicated email nurture track for enterprise prospects based on successful conversion patterns",
              "Launch account-based marketing (ABM) campaigns for top 100 enterprise targets using LinkedIn and display",
            ],
            confidence: 0.91,
          },
        },
      },
      {
        id: "block-3-14",
        type: "insight",
        title: "Channel Optimization Opportunities",
        order: 14,
        prompt: "Identify underperforming channels and optimization opportunities",
        dataSources: ["google-analytics", "google-ads", "facebook-ads"],
        config: {
          type: "insight",
          config: {
            insightTypes: ["warning"],
            minConfidence: 0.7,
            maxInsights: 5,
            showRecommendations: true,
          },
        },
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          confidenceScore: 0.87,
          insightData: {
            insightType: "warning",
            summary:
              "Google Display campaigns are underperforming with 68.9% bounce rate and 2.9x ROAS, significantly below target benchmarks. Current spend of $12,400/month is generating $36,016 in revenue but could be reallocated to higher-performing channels for better returns.",
            details: [
              "Display campaigns have 68.9% bounce rate vs. 42.3% site average, indicating poor audience targeting or creative mismatch",
              "Average session duration of 0.8 minutes suggests visitors aren't finding what they expect",
              "Cost per acquisition of $168 is reasonable, but quality metrics (bounce, session time) suggest these customers may have lower LTV",
              "CTR of 2.0% is below industry benchmark of 2.5-3.0% for B2B display advertising",
              "Only 3.0% conversion rate from click to lead, lowest among all paid channels",
            ],
            recommendations: [
              "Immediately pause bottom 30% of display campaigns by performance and reallocate $3,700 to LinkedIn enterprise targeting",
              "Implement display audience exclusions to remove low-intent traffic segments causing high bounce rates",
              "Test new display creative formats focused on specific enterprise pain points rather than generic awareness messaging",
              "Add retargeting-only approach for display to focus on users who've already engaged with brand",
              "Consider shifting remaining display budget to Google Search high-intent expansion if performance doesn't improve within 30 days",
            ],
            confidence: 0.87,
          },
        },
      },
      {
        id: "block-3-15",
        type: "text",
        title: "Summary and Recommendations",
        order: 15,
        lastExecution: {
          executedAt: new Date("2025-01-01"),
          textContent:
            "December's marketing performance exceeded expectations across nearly every dimension. We achieved 4.2x ROAS while reducing CPA by 12.3%, generated 892 new customers (15.3% increase), and improved key efficiency metrics like LTV:CAC ratio and payback period. The data clearly indicates we should double down on our enterprise segment strategy, particularly through LinkedIn and Google Search campaigns, while optimizing or cutting underperforming display campaigns. \n\nFor January 2025, our priorities are: (1) Scale LinkedIn enterprise budget by 40% to $95K, (2) Expand Google Search high-intent campaigns with additional enterprise keywords, (3) Optimize or cut bottom 30% of display campaigns, (4) Develop enterprise-specific landing pages to capitalize on high-quality traffic, and (5) Launch ABM campaigns for top enterprise targets. If we execute on these priorities while maintaining current conversion efficiency, we project 25-30% MoM growth in new customer acquisition in Q1.",
        },
      },
    ],
  },
  {
    id: "digest-4",
    title: "Customer Health Scorecard",
    description: "Track customer health metrics and at-risk accounts",
    recurrence: "weekly",
    deliveryMethod: "both",
    isActive: false,
    owner: "John Doe",
    createdAt: new Date("2025-01-05"),
    lastExecutedAt: new Date("2025-01-13"),
    nextExecutionAt: undefined,
    blocks: [
      {
        id: "block-4-1",
        type: "kpi",
        title: "Customer Health Metrics",
        order: 1,
        prompt: "Show customer health and retention metrics",
        dataSources: ["hubspot", "stripe"],
        kpis: ["nps", "retention_rate", "customer_lifetime_value"],
        lastExecution: {
          executedAt: new Date("2025-01-13"),
          confidenceScore: 0.87,
          metrics: [
            {
              name: "Net Promoter Score",
              value: 68,
              change: 3.0,
              trend: "up",
              previousValue: 65,
            },
            {
              name: "Retention Rate",
              value: 94.5,
              change: 1.2,
              trend: "up",
              previousValue: 93.4,
              unit: "%",
            },
            {
              name: "Customer Lifetime Value",
              value: 8450,
              change: 6.8,
              trend: "up",
              previousValue: 7913,
              unit: "$",
            },
            {
              name: "At-Risk Accounts",
              value: 34,
              change: -15.0,
              trend: "down",
              previousValue: 40,
            },
          ],
          explanation:
            "Customer health improving with NPS at 68 and retention at 94.5%. Proactive outreach program successfully reduced at-risk accounts by 15%. CLV growth indicates strong customer expansion.",
        },
      },
    ],
  },
];

// Helper functions
export const getActiveDigests = (): Digest[] => MOCK_DIGESTS.filter((digest) => digest.isActive);

export const getInactiveDigests = (): Digest[] => MOCK_DIGESTS.filter((digest) => !digest.isActive);

export const getDigestById = (id: string): Digest | undefined => MOCK_DIGESTS.find((digest) => digest.id === id);

export const getDigestsByRecurrence = (recurrence: RecurrenceType): Digest[] =>
  MOCK_DIGESTS.filter((digest) => digest.recurrence === recurrence);

// Block type metadata
export const BLOCK_TYPE_METADATA = {
  kpi: {
    label: "KPI Overview",
    description: "Display key performance indicators with trends and comparisons",
    icon: "BarChart3",
    color: "blue",
  },
  chart: {
    label: "Chart Visualization",
    description: "Display data using various chart types (bar, line, area, pie, funnel)",
    icon: "Filter",
    color: "green",
  },
  table: {
    label: "Data Table",
    description: "Present structured data in tabular format with sorting and filtering",
    icon: "Activity",
    color: "purple",
  },
  insight: {
    label: "AI Insights",
    description: "Get AI-generated insights and recommendations based on your data",
    icon: "Lightbulb",
    color: "yellow",
  },
  text: {
    label: "Text Narrative",
    description: "Add narrative text to provide context and explain insights",
    icon: "FileText",
    color: "gray",
  },
} as const;
