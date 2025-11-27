/* eslint-disable camelcase */
export const mockSQLQueries = {
  revenueByMonth: `SELECT
  DATE_TRUNC('month', order_date) as month,
  SUM(revenue) as total_revenue,
  COUNT(DISTINCT customer_id) as unique_customers
FROM orders
WHERE order_date >= DATEADD(month, -12, CURRENT_DATE)
GROUP BY month
ORDER BY month DESC`,

  userSignupsByPlan: `SELECT
  plan_type,
  COUNT(*) as signup_count,
  AVG(trial_days) as avg_trial_days
FROM users
WHERE created_at >= DATEADD(month, -3, CURRENT_DATE)
GROUP BY plan_type
ORDER BY signup_count DESC`,

  cohortAnalysis: `WITH cohorts AS (
  SELECT
    user_id,
    DATE_TRUNC('month', first_order_date) as cohort_month,
    DATE_TRUNC('month', order_date) as order_month,
    revenue
  FROM user_orders
)
SELECT
  cohort_month,
  order_month,
  COUNT(DISTINCT user_id) as users,
  SUM(revenue) as total_revenue
FROM cohorts
GROUP BY cohort_month, order_month
ORDER BY cohort_month, order_month`,

  topPerformingProducts: `SELECT
  p.product_name,
  p.category,
  COUNT(DISTINCT o.order_id) as order_count,
  SUM(o.quantity) as units_sold,
  SUM(o.revenue) as total_revenue
FROM products p
JOIN order_items o ON p.product_id = o.product_id
WHERE o.order_date >= DATEADD(day, -30, CURRENT_DATE)
GROUP BY p.product_name, p.category
ORDER BY total_revenue DESC
LIMIT 20`,
};

export const mockQueryResults = {
  revenueByMonth: [
    { month: "2025-10-01", total_revenue: 125000, unique_customers: 342 },
    { month: "2025-09-01", total_revenue: 118500, unique_customers: 328 },
    { month: "2025-08-01", total_revenue: 112300, unique_customers: 315 },
    { month: "2025-07-01", total_revenue: 108900, unique_customers: 301 },
    { month: "2025-06-01", total_revenue: 115600, unique_customers: 318 },
    { month: "2025-05-01", total_revenue: 121200, unique_customers: 335 },
    { month: "2025-04-01", total_revenue: 117800, unique_customers: 322 },
    { month: "2025-03-01", total_revenue: 113400, unique_customers: 309 },
    { month: "2025-02-01", total_revenue: 109200, unique_customers: 298 },
    { month: "2025-01-01", total_revenue: 106700, unique_customers: 291 },
    { month: "2024-12-01", total_revenue: 132500, unique_customers: 356 },
    { month: "2024-11-01", total_revenue: 119800, unique_customers: 327 },
  ],

  userSignupsByPlan: [
    { plan_type: "Pro", signup_count: 234, avg_trial_days: 14 },
    { plan_type: "Business", signup_count: 156, avg_trial_days: 30 },
    { plan_type: "Starter", signup_count: 542, avg_trial_days: 7 },
    { plan_type: "Enterprise", signup_count: 23, avg_trial_days: 30 },
  ],

  cohortAnalysis: [
    { cohort_month: "2025-08-01", order_month: "2025-08-01", users: 150, total_revenue: 45000 },
    { cohort_month: "2025-08-01", order_month: "2025-09-01", users: 120, total_revenue: 38000 },
    { cohort_month: "2025-08-01", order_month: "2025-10-01", users: 95, total_revenue: 31000 },
    { cohort_month: "2025-09-01", order_month: "2025-09-01", users: 165, total_revenue: 52000 },
    { cohort_month: "2025-09-01", order_month: "2025-10-01", users: 135, total_revenue: 42000 },
    { cohort_month: "2025-10-01", order_month: "2025-10-01", users: 180, total_revenue: 58000 },
  ],

  topPerformingProducts: [
    {
      product_name: "Premium Analytics Dashboard",
      category: "Software",
      order_count: 89,
      units_sold: 89,
      total_revenue: 26700,
    },
    {
      product_name: "Data Integration Suite",
      category: "Software",
      order_count: 67,
      units_sold: 67,
      total_revenue: 20100,
    },
    {
      product_name: "Business Intelligence Pro",
      category: "Software",
      order_count: 54,
      units_sold: 54,
      total_revenue: 16200,
    },
    {
      product_name: "Cloud Storage 1TB",
      category: "Infrastructure",
      order_count: 123,
      units_sold: 156,
      total_revenue: 15600,
    },
    { product_name: "API Access Premium", category: "Software", order_count: 78, units_sold: 78, total_revenue: 11700 },
  ],
};

export interface QueryResult {
  id: string;
  question: string;
  sql: string;
  results: Array<Record<string, unknown>>;
  rowCount: number;
  executionTime: number;
  dbtVerified: boolean;
  tablesUsed: string[];
  metricsUsed?: string[];
  timestamp: Date;
}
