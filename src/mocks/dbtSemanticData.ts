export interface DbtMetric {
  name: string;
  label: string;
  description: string;
  type: "cumulative" | "derived" | "ratio" | "simple";
  sql: string;
  model: string;
  dimensions?: string[];
  synonyms: string[];
  isPrimary: boolean;
  hasConflicts: boolean;
  owner?: string;
  tags: string[];
}

interface DbtColumn {
  name: string;
  type: string;
  description: string;
  tests?: string[];
}

export interface DbtModel {
  name: string;
  label: string;
  description: string;
  schema: string;
  columns: DbtColumn[];
  upstreamModels: string[];
  downstreamModels: string[];
  tags: string[];
}

export interface DbtEntity {
  name: string;
  label: string;
  description: string;
  primaryKey: string;
  synonyms: string[];
  relatedModels: string[];
}

// Mock Metrics
export const mockDbtMetrics: DbtMetric[] = [
  {
    name: "revenue",
    label: "Total Revenue",
    description: "Sum of all order revenue, excluding refunds and discounts",
    type: "simple",
    sql: "SUM(orders.amount - orders.refunds - orders.discounts)",
    model: "fct_orders",
    dimensions: ["date", "product_category", "customer_segment"],
    synonyms: ["sales", "income", "earnings"],
    isPrimary: true,
    hasConflicts: false,
    owner: "Finance Team",
    tags: ["finance", "core-metric"],
  },
  {
    name: "mrr",
    label: "Monthly Recurring Revenue",
    description: "Normalized monthly value of all active subscriptions",
    type: "simple",
    sql: "SUM(CASE WHEN billing_period = 'monthly' THEN amount WHEN billing_period = 'annual' THEN amount / 12 END)",
    model: "fct_subscriptions",
    dimensions: ["date", "plan_type", "customer_segment"],
    synonyms: ["monthly revenue", "recurring revenue"],
    isPrimary: true,
    hasConflicts: true, // Has conflict - will be shown in resolution
    owner: "Revenue Ops",
    tags: ["saas", "core-metric"],
  },
  {
    name: "arpu",
    label: "Average Revenue Per User",
    description: "Total revenue divided by number of active users",
    type: "ratio",
    sql: "SUM(revenue) / COUNT(DISTINCT user_id)",
    model: "fct_user_revenue",
    dimensions: ["date", "plan_type"],
    synonyms: ["average revenue per customer", "revenue per user"],
    isPrimary: true,
    hasConflicts: false,
    owner: "Product Analytics",
    tags: ["product", "efficiency"],
  },
  {
    name: "customer_ltv",
    label: "Customer Lifetime Value",
    description: "Predicted total revenue from a customer over their lifetime",
    type: "derived",
    sql: "AVG(total_customer_revenue) * (1 / churn_rate)",
    model: "fct_customer_metrics",
    dimensions: ["customer_segment", "acquisition_channel"],
    synonyms: ["ltv", "lifetime value", "clv"],
    isPrimary: true,
    hasConflicts: false,
    owner: "Growth Team",
    tags: ["growth", "predictive"],
  },
  {
    name: "churn_rate",
    label: "Customer Churn Rate",
    description: "Percentage of customers who cancel in a given period",
    type: "ratio",
    sql: "COUNT(DISTINCT churned_customers) / COUNT(DISTINCT total_customers)",
    model: "fct_churn",
    dimensions: ["date", "plan_type", "cohort"],
    synonyms: ["attrition rate", "cancellation rate"],
    isPrimary: true,
    hasConflicts: false,
    owner: "Customer Success",
    tags: ["retention", "health"],
  },
  {
    name: "dau",
    label: "Daily Active Users",
    description: "Count of unique users with activity each day",
    type: "simple",
    sql: "COUNT(DISTINCT user_id)",
    model: "fct_user_activity",
    dimensions: ["date", "platform", "feature"],
    synonyms: ["active users daily", "daily users"],
    isPrimary: true,
    hasConflicts: false,
    owner: "Product Analytics",
    tags: ["product", "engagement"],
  },
];

// Mock Models
export const mockDbtModels: DbtModel[] = [
  {
    name: "fct_orders",
    label: "Orders Fact Table",
    description: "Core fact table containing all order transactions with calculated amounts",
    schema: "analytics",
    columns: [
      { name: "order_id", type: "INTEGER", description: "Primary key for orders", tests: ["unique", "not_null"] },
      { name: "customer_id", type: "INTEGER", description: "Foreign key to customers" },
      { name: "order_date", type: "TIMESTAMP", description: "Date and time of order", tests: ["not_null"] },
      { name: "amount", type: "DECIMAL", description: "Total order amount before adjustments" },
      { name: "refunds", type: "DECIMAL", description: "Total refunded amount" },
      { name: "discounts", type: "DECIMAL", description: "Total discount applied" },
    ],
    upstreamModels: ["stg_orders", "stg_payments"],
    downstreamModels: ["fct_daily_revenue", "fct_customer_metrics"],
    tags: ["finance", "core"],
  },
  {
    name: "fct_subscriptions",
    label: "Subscriptions Fact Table",
    description: "Subscription events and recurring revenue calculations",
    schema: "analytics",
    columns: [
      { name: "subscription_id", type: "INTEGER", description: "Primary key", tests: ["unique", "not_null"] },
      { name: "user_id", type: "INTEGER", description: "Foreign key to users" },
      { name: "plan_type", type: "VARCHAR", description: "Subscription plan tier" },
      { name: "billing_period", type: "VARCHAR", description: "monthly or annual" },
      { name: "amount", type: "DECIMAL", description: "Subscription amount" },
      { name: "start_date", type: "DATE", description: "Subscription start date" },
      { name: "end_date", type: "DATE", description: "Subscription end date (if churned)" },
    ],
    upstreamModels: ["stg_subscriptions", "stg_users"],
    downstreamModels: ["fct_mrr", "fct_churn"],
    tags: ["saas", "revenue"],
  },
  {
    name: "fct_user_activity",
    label: "User Activity Fact Table",
    description: "Daily user engagement and activity events",
    schema: "analytics",
    columns: [
      { name: "activity_id", type: "INTEGER", description: "Primary key" },
      { name: "user_id", type: "INTEGER", description: "Foreign key to users" },
      { name: "activity_date", type: "DATE", description: "Date of activity" },
      { name: "platform", type: "VARCHAR", description: "web, mobile, api" },
      { name: "feature", type: "VARCHAR", description: "Feature used" },
      { name: "event_count", type: "INTEGER", description: "Number of events" },
    ],
    upstreamModels: ["stg_events"],
    downstreamModels: ["fct_engagement_metrics"],
    tags: ["product", "engagement"],
  },
];

// Mock Entities
export const mockDbtEntities: DbtEntity[] = [
  {
    name: "customer",
    label: "Customer",
    description: "A paying customer or user of the platform",
    primaryKey: "customer_id",
    synonyms: ["client", "user", "account"],
    relatedModels: ["fct_orders", "fct_subscriptions", "dim_customers"],
  },
  {
    name: "order",
    label: "Order",
    description: "A transaction or purchase made by a customer",
    primaryKey: "order_id",
    synonyms: ["transaction", "purchase", "sale"],
    relatedModels: ["fct_orders", "fct_order_items"],
  },
  {
    name: "subscription",
    label: "Subscription",
    description: "A recurring payment plan",
    primaryKey: "subscription_id",
    synonyms: ["plan", "membership"],
    relatedModels: ["fct_subscriptions", "fct_mrr"],
  },
];

// Helper functions
export function searchMetrics(query: string): DbtMetric[] {
  const lowerQuery = query.toLowerCase();
  return mockDbtMetrics.filter(
    (metric) =>
      metric.name.toLowerCase().includes(lowerQuery) ||
      metric.label.toLowerCase().includes(lowerQuery) ||
      metric.description.toLowerCase().includes(lowerQuery) ||
      metric.synonyms.some((syn) => syn.toLowerCase().includes(lowerQuery)),
  );
}

export function getSuggestedMetrics(currentMetric: string): DbtMetric[] {
  // Suggest related metrics based on tags or models
  // eslint-disable-next-line id-length
  const current = mockDbtMetrics.find((m) => m.name === currentMetric);
  if (current === undefined) return [];

  return mockDbtMetrics
    .filter(
      // eslint-disable-next-line id-length
      (m) => m.name !== currentMetric && (m.tags.some((t) => current.tags.includes(t)) || m.model === current.model),
    )
    .slice(0, 3);
}
