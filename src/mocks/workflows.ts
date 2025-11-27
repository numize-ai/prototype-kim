export interface Workflow {
  id: string;
  name: string;
  description: string;
  query: string;
  sqlQuery: string;
  destination: {
    type: "email" | "google-sheets" | "google-slides" | "notion" | "slack";
    name: string;
    url?: string;
    icon: string;
  };
  frequency: "daily" | "hourly" | "monthly" | "real-time" | "weekly";
  status: "active" | "failed" | "paused";
  lastSyncedAt: Date;
  nextSyncAt?: Date;
  createdAt: Date;
  rowCount?: number;
  errorMessage?: string;
}

export const WORKFLOW_SYNCS: Workflow[] = [
  {
    id: "wf-1",
    name: "MRR Growth Dashboard",
    description: "Real-time MRR metrics synced to team dashboard in Google Sheets",
    query: "Show me MRR growth over the last 6 months",
    sqlQuery: `SELECT
  DATE_TRUNC('month', subscription_date) as month,
  SUM(mrr) as total_mrr,
  COUNT(DISTINCT customer_id) as active_customers
FROM subscriptions
WHERE subscription_date >= CURRENT_DATE - INTERVAL '6 months'
  AND status = 'active'
GROUP BY DATE_TRUNC('month', subscription_date)
ORDER BY month DESC;`,
    destination: {
      type: "google-sheets",
      name: "Team Dashboard",
      url: "https://docs.google.com/spreadsheets/d/abc123",
      icon: "/google_sheets.png",
    },
    frequency: "daily",
    status: "active",
    lastSyncedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    nextSyncAt: new Date(Date.now() + 22 * 60 * 60 * 1000), // in 22 hours
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    rowCount: 6,
  },
  {
    id: "wf-2",
    name: "Customer Churn Analysis",
    description: "Weekly churn cohort data pushed to Notion workspace",
    query: "Break down customer churn by cohort for the last quarter",
    sqlQuery: `SELECT
  DATE_TRUNC('month', signup_date) as cohort,
  COUNT(DISTINCT customer_id) as total_customers,
  COUNT(DISTINCT CASE WHEN churned_at IS NOT NULL THEN customer_id END) as churned_customers,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN churned_at IS NOT NULL THEN customer_id END) /
    COUNT(DISTINCT customer_id), 2) as churn_rate
FROM customers
WHERE signup_date >= CURRENT_DATE - INTERVAL '3 months'
GROUP BY DATE_TRUNC('month', signup_date)
ORDER BY cohort DESC;`,
    destination: {
      type: "notion",
      name: "Product Analytics Workspace",
      url: "https://notion.so/workspace/analytics",
      icon: "/google_sheets.png",
    },
    frequency: "weekly",
    status: "active",
    lastSyncedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    nextSyncAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // in 4 days
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    rowCount: 3,
  },
  {
    id: "wf-3",
    name: "CAC by Channel Report",
    description: "Monthly customer acquisition cost breakdown by marketing channel",
    query: "Show CAC by channel over the last 90 days",
    sqlQuery: `SELECT
  acquisition_channel,
  COUNT(DISTINCT customer_id) as customers_acquired,
  SUM(marketing_spend) as total_spend,
  ROUND(SUM(marketing_spend) / COUNT(DISTINCT customer_id), 2) as cac
FROM customers c
LEFT JOIN marketing_spend ms ON c.acquisition_channel = ms.channel
WHERE c.signup_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY acquisition_channel
ORDER BY cac ASC;`,
    destination: {
      type: "google-slides",
      name: "Monthly Board Presentation",
      url: "https://docs.google.com/presentation/d/xyz789",
      icon: "/google_sheets.png",
    },
    frequency: "monthly",
    status: "active",
    lastSyncedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    nextSyncAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // in 15 days
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    rowCount: 6,
  },
  {
    id: "wf-4",
    name: "Conversion Funnel Metrics",
    description: "Real-time funnel conversion rates for growth team tracking",
    query: "Show funnel conversion rates from visitor to paid customer",
    sqlQuery: `WITH funnel_stages AS (
  SELECT
    'Visitors' as stage,
    COUNT(DISTINCT visitor_id) as count,
    1 as stage_order
  FROM page_views
  WHERE viewed_at >= CURRENT_DATE - INTERVAL '7 days'

  UNION ALL

  SELECT
    'Sign Ups' as stage,
    COUNT(DISTINCT user_id) as count,
    2 as stage_order
  FROM users
  WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'

  UNION ALL

  SELECT
    'Trial Started' as stage,
    COUNT(DISTINCT user_id) as count,
    3 as stage_order
  FROM trials
  WHERE started_at >= CURRENT_DATE - INTERVAL '7 days'

  UNION ALL

  SELECT
    'Paid Customers' as stage,
    COUNT(DISTINCT customer_id) as count,
    4 as stage_order
  FROM subscriptions
  WHERE subscription_date >= CURRENT_DATE - INTERVAL '7 days'
)
SELECT
  stage,
  count,
  ROUND(100.0 * count / LAG(count) OVER (ORDER BY stage_order), 2) as conversion_rate
FROM funnel_stages
ORDER BY stage_order;`,
    destination: {
      type: "google-sheets",
      name: "Growth Metrics Dashboard",
      url: "https://docs.google.com/spreadsheets/d/def456",
      icon: "/google_sheets.png",
    },
    frequency: "hourly",
    status: "active",
    lastSyncedAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    nextSyncAt: new Date(Date.now() + 15 * 60 * 1000), // in 15 minutes
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    rowCount: 4,
  },
  {
    id: "wf-5",
    name: "Revenue Alerts",
    description: "Daily revenue summary sent to Slack #revenue channel",
    query: "What's my daily revenue summary?",
    sqlQuery: `SELECT
  CURRENT_DATE as report_date,
  SUM(amount) as daily_revenue,
  COUNT(DISTINCT customer_id) as paying_customers,
  AVG(amount) as avg_transaction_value
FROM transactions
WHERE transaction_date = CURRENT_DATE
  AND status = 'completed';`,
    destination: {
      type: "slack",
      name: "#revenue",
      icon: "/google_sheets.png",
    },
    frequency: "daily",
    status: "active",
    lastSyncedAt: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    nextSyncAt: new Date(Date.now() + 6 * 60 * 60 * 1000), // in 6 hours
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    rowCount: 1,
  },
  {
    id: "wf-6",
    name: "Top Customers Report",
    description: "Weekly list of top 20 customers by LTV",
    query: "Who are my top 20 customers by lifetime value?",
    sqlQuery: `SELECT
  c.customer_id,
  c.company_name,
  c.email,
  c.signup_date,
  SUM(t.amount) as lifetime_value,
  COUNT(t.transaction_id) as total_transactions
FROM customers c
LEFT JOIN transactions t ON c.customer_id = t.customer_id
WHERE t.status = 'completed'
GROUP BY c.customer_id, c.company_name, c.email, c.signup_date
ORDER BY lifetime_value DESC
LIMIT 20;`,
    destination: {
      type: "google-sheets",
      name: "Customer Success Tracking",
      url: "https://docs.google.com/spreadsheets/d/ghi789",
      icon: "/google_sheets.png",
    },
    frequency: "weekly",
    status: "paused",
    lastSyncedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000), // 75 days ago
    rowCount: 20,
  },
  {
    id: "wf-7",
    name: "Failed Payment Recovery",
    description: "Real-time list of failed payments requiring follow-up",
    query: "Show me all failed payments from the last 48 hours",
    sqlQuery: `SELECT
  p.payment_id,
  c.customer_id,
  c.company_name,
  c.email,
  p.amount,
  p.failure_reason,
  p.failed_at
FROM payments p
JOIN customers c ON p.customer_id = c.customer_id
WHERE p.status = 'failed'
  AND p.failed_at >= CURRENT_TIMESTAMP - INTERVAL '48 hours'
ORDER BY p.failed_at DESC;`,
    destination: {
      type: "notion",
      name: "Payment Recovery Queue",
      url: "https://notion.so/workspace/recovery",
      icon: "/google_sheets.png",
    },
    frequency: "real-time",
    status: "failed",
    lastSyncedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    rowCount: 12,
    errorMessage: "Authentication failed: Notion API token expired. Please reconnect your Notion account.",
  },
];

export type WorkflowStatus = Workflow["status"];
type WorkflowFrequency = Workflow["frequency"];

export const FREQUENCY_LABELS: Record<WorkflowFrequency, string> = {
  "real-time": "Real-time",
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
};

export const STATUS_COLORS: Record<WorkflowStatus, { bg: string; text: string; border: string }> = {
  active: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  paused: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  failed: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};
