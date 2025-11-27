export interface QueryHistoryItem {
  id: string;
  question: string;
  sql: string;
  dbtVerified: boolean;
  timestamp: Date;
  targetSheet?: string;
  targetTab?: string;
  rowCount: number;
  executionTime: number;
  synced: boolean;
  tablesUsed: string[];
  metricsUsed?: string[];
}

export const mockQueryHistory: QueryHistoryItem[] = [
  {
    id: "1",
    question: "Show revenue by month for last 12 months",
    sql: `SELECT DATE_TRUNC('month', order_date) as month, SUM(revenue) as total_revenue FROM orders WHERE order_date >= DATEADD(month, -12, CURRENT_DATE) GROUP BY month ORDER BY month DESC`,
    dbtVerified: true,
    timestamp: new Date("2025-10-15T14:30:00"),
    targetSheet: "Q4 Revenue Analysis",
    targetTab: "Monthly Revenue",
    rowCount: 12,
    executionTime: 1.23,
    synced: true,
    tablesUsed: ["orders"],
    metricsUsed: ["revenue"],
  },
  {
    id: "2",
    question: "What are monthly signups by plan?",
    sql: `SELECT plan_type, COUNT(*) as signup_count FROM users WHERE created_at >= DATEADD(month, -3, CURRENT_DATE) GROUP BY plan_type ORDER BY signup_count DESC`,
    dbtVerified: true,
    timestamp: new Date("2025-10-14T10:15:00"),
    targetSheet: "User Growth Dashboard",
    targetTab: "Signups",
    rowCount: 4,
    executionTime: 0.89,
    synced: true,
    tablesUsed: ["users"],
  },
  {
    id: "3",
    question: "Show cohort retention analysis",
    sql: `WITH cohorts AS (SELECT user_id, DATE_TRUNC('month', first_order_date) as cohort_month FROM user_orders) SELECT cohort_month, COUNT(*) as users FROM cohorts GROUP BY cohort_month`,
    dbtVerified: false,
    timestamp: new Date("2025-10-13T16:45:00"),
    targetSheet: "Retention Analysis",
    targetTab: "Cohorts",
    rowCount: 6,
    executionTime: 2.45,
    synced: true,
    tablesUsed: ["user_orders"],
  },
  {
    id: "4",
    question: "Top 20 performing products in last 30 days",
    sql: `SELECT p.product_name, SUM(o.revenue) as total_revenue FROM products p JOIN order_items o ON p.product_id = o.product_id WHERE o.order_date >= DATEADD(day, -30, CURRENT_DATE) GROUP BY p.product_name ORDER BY total_revenue DESC LIMIT 20`,
    dbtVerified: true,
    timestamp: new Date("2025-10-12T09:20:00"),
    targetSheet: "Product Performance",
    targetTab: "Top Products",
    rowCount: 20,
    executionTime: 1.67,
    synced: true,
    tablesUsed: ["products", "order_items"],
    metricsUsed: ["revenue"],
  },
  {
    id: "5",
    question: "Show customer lifetime value by segment",
    sql: `SELECT customer_segment, AVG(lifetime_value) as avg_ltv, COUNT(*) as customer_count FROM customer_metrics GROUP BY customer_segment ORDER BY avg_ltv DESC`,
    dbtVerified: true,
    timestamp: new Date("2025-10-11T15:30:00"),
    rowCount: 5,
    executionTime: 1.12,
    synced: false,
    tablesUsed: ["customer_metrics"],
    metricsUsed: ["lifetime_value"],
  },
  {
    id: "6",
    question: "Daily active users trend for past 90 days",
    sql: `SELECT DATE(activity_date) as date, COUNT(DISTINCT user_id) as dau FROM user_activity WHERE activity_date >= DATEADD(day, -90, CURRENT_DATE) GROUP BY date ORDER BY date`,
    dbtVerified: false,
    timestamp: new Date("2025-10-10T11:00:00"),
    rowCount: 90,
    executionTime: 0.95,
    synced: false,
    tablesUsed: ["user_activity"],
  },
  {
    id: "7",
    question: "Average order value by customer segment",
    sql: `SELECT c.segment, AVG(o.order_value) as avg_order_value FROM customers c JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.segment`,
    dbtVerified: true,
    timestamp: new Date("2025-10-09T13:45:00"),
    targetSheet: "Customer Insights",
    targetTab: "AOV Analysis",
    rowCount: 4,
    executionTime: 1.34,
    synced: true,
    tablesUsed: ["customers", "orders"],
    metricsUsed: ["avg_order_value"],
  },
  {
    id: "8",
    question: "Churn rate by plan type",
    sql: `SELECT plan_type, COUNT(*) as churned_users, churned_users / total_users as churn_rate FROM user_churn GROUP BY plan_type`,
    dbtVerified: false,
    timestamp: new Date("2025-10-08T09:15:00"),
    rowCount: 4,
    executionTime: 0.78,
    synced: false,
    tablesUsed: ["user_churn"],
  },
];

export function filterQueryHistory(
  history: QueryHistoryItem[],
  filters: {
    searchTerm?: string | undefined;
    dbtVerified?: boolean | undefined;
    synced?: boolean | undefined;
    dateFrom?: Date | undefined;
    dateTo?: Date | undefined;
  },
): QueryHistoryItem[] {
  // eslint-disable-next-line complexity
  return history.filter((item) => {
    if (filters.searchTerm !== undefined) {
      const term = filters.searchTerm.toLowerCase();
      if (!item.question.toLowerCase().includes(term) && !item.sql.toLowerCase().includes(term)) {
        return false;
      }
    }

    if (filters.dbtVerified !== undefined && item.dbtVerified !== filters.dbtVerified) {
      return false;
    }

    if (filters.synced !== undefined && item.synced !== filters.synced) {
      return false;
    }

    if (filters.dateFrom !== undefined && item.timestamp < filters.dateFrom) {
      return false;
    }

    if (filters.dateTo !== undefined && item.timestamp > filters.dateTo) {
      return false;
    }

    return true;
  });
}

export function sortQueryHistory(
  history: QueryHistoryItem[],
  sortBy: "most-used" | "oldest" | "recent",
): QueryHistoryItem[] {
  const sorted = [...history];

  switch (sortBy) {
    case "recent":
      // eslint-disable-next-line id-length
      return sorted.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    case "oldest":
      // eslint-disable-next-line id-length
      return sorted.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    case "most-used":
      // In a real app, this would sort by usage count
      // For mock, we'll just return as-is
      return sorted;
    default:
      return sorted;
  }
}
