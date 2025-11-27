/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-lines */
export interface DataSource {
  id: string;
  name: string;
  icon: string;
  tablesUsed: string[];
}

export interface ReasoningStep {
  id: string;
  step: number;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  sqlQuery?: string;
  dataSource?: string;
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
  type?: "chart" | "table" | "text";
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  chartData?: ChartData;
  tableData?: TableData;
  actions?: ChatAction[];
  dataSources?: DataSource[];
  reasoningSteps?: ReasoningStep[];
  sqlQuery?: string;
}

export interface ChatAction {
  id: string;
  label: string;
  icon: string;
  type: "alert" | "export" | "schedule" | "view";
  variant?: "default" | "ghost" | "outline";
  onClick?: () => void;
}

export interface ChartData {
  type: "area" | "bar" | "funnel" | "line" | "pie";
  data: Array<Record<string, number | string>>;
  xKey?: string;
  yKey?: string;
  yKeys?: string[];
  title?: string;
  colors?: string[];
  legend?: boolean;
}

export interface TableData {
  title?: string;
  columns: Array<{ key: string; label: string; sortable?: boolean }>;
  rows: Array<Record<string, number | string>>;
}

interface SuggestedQuery {
  id: string;
  text: string;
  category: "cross-source" | "multi-source" | "single-source";
  dataSources: string[];
  requiredSources: string[]; // connector IDs
  requiresReconciliation: boolean;
  icon?: string;
}

export const SUGGESTED_QUERIES: SuggestedQuery[] = [
  // Marketing Performance & Campaigns
  {
    id: "marketing-1",
    text: "How many signups did we get last week by country?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Users",
  },
  {
    id: "marketing-2",
    text: "What's our campaign ROI by channel this month?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "TrendingUp",
  },
  {
    id: "marketing-3",
    text: "Identify customer segments for an email campaign to activate inactive users",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Mail",
  },
  {
    id: "marketing-4",
    text: "Which marketing campaigns have the lowest CAC?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "DollarSign",
  },

  // User Acquisition & Funnel Analysis
  {
    id: "marketing-5",
    text: "Analyze our signup funnel steps and compare to last month",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "TrendingDown",
  },
  {
    id: "marketing-6",
    text: "What's the MQL to SQL conversion rate by source?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Filter",
  },
  {
    id: "marketing-7",
    text: "Show me user acquisition by device type and country",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Smartphone",
  },
  {
    id: "marketing-8",
    text: "Give me a list of companies that visited the pricing page 3+ times",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Eye",
  },

  // Ad Spend & Efficiency
  {
    id: "marketing-9",
    text: "What's our ad spend efficiency across all channels?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Target",
  },
  {
    id: "marketing-10",
    text: "Explain the drop in conversion rate in Italy",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "AlertCircle",
  },
  {
    id: "marketing-11",
    text: "Which audience segments have the highest engagement?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Users",
  },
  {
    id: "marketing-12",
    text: "Show me traffic sources that drive the most qualified leads",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Zap",
  },

  // Cohort & Retention Analysis
  {
    id: "marketing-13",
    text: "Compare user cohorts from Q1 vs Q2 by retention rate",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "BarChart",
  },
  {
    id: "marketing-14",
    text: "What's the lifetime value of customers by acquisition channel?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "DollarSign",
  },
  {
    id: "marketing-15",
    text: "Show me inactive users who haven't engaged in 30 days",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "UserX",
  },
  {
    id: "marketing-16",
    text: "Create a segment of users who engaged with our last campaign",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Users",
  },

  // Content & Attribution Analysis
  {
    id: "marketing-17",
    text: "Which content pieces drive the most conversions?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "FileText",
  },
  {
    id: "marketing-18",
    text: "Show me attribution breakdown for closed deals this quarter",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "GitBranch",
  },
  {
    id: "marketing-19",
    text: "What's the average time from first touch to conversion?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Clock",
  },
  {
    id: "marketing-20",
    text: "Show me top-performing landing pages by conversion rate",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Layout",
  },

  // Segmentation & Personalization
  {
    id: "marketing-21",
    text: "Create an audience of high-intent visitors for retargeting",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Target",
  },
  {
    id: "marketing-22",
    text: "Which customer segments have the best engagement scores?",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Layers",
  },
  {
    id: "marketing-23",
    text: "Show me behavioral patterns of our most valuable customers",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Activity",
  },
  {
    id: "marketing-24",
    text: "Identify accounts showing buying intent signals",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "Zap",
  },
  // Digest creation suggestion
  {
    id: "digest-1",
    text: "I want to create a digest",
    category: "single-source",
    dataSources: ["Marketing Semantic Layer"],
    requiredSources: [],
    requiresReconciliation: false,
    icon: "CalendarDays",
  },
];

// Mock responses for common queries
export const MOCK_RESPONSES: Record<string, Omit<ChatMessage, "id" | "role" | "timestamp">> = {
  "identify customer segments for an email campaign to activate inactive users": {
    content:
      "I've identified 3 distinct customer segments for your activation campaign, totaling 1,247 inactive users. Each segment has different engagement patterns and requires a tailored approach.",
    type: "table",
    dataSources: [
      {
        id: "marketing",
        name: "Marketing Semantic Layer",
        icon: "/dbt.png",
        tablesUsed: [
          "marts_marketing.user_engagement",
          "marts_marketing.user_acquisition",
          "marts_marketing.campaigns",
        ],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Define inactive user criteria",
        description: "Identify users with no activity in the last 30 days who were previously active",
        status: "completed",
        dataSource: "Marketing Semantic Layer",
        sqlQuery: `SELECT
  user_id,
  email,
  signup_date,
  last_activity_date,
  total_sessions,
  acquisition_channel,
  DATEDIFF(CURRENT_DATE, last_activity_date) as days_inactive
FROM marts_marketing.user_engagement
WHERE last_activity_date < CURRENT_DATE - INTERVAL '30 days'
  AND total_sessions > 2
  AND status = 'active';`,
      },
      {
        id: "step2",
        step: 2,
        title: "Segment by engagement history",
        description: "Group users into segments based on their past engagement patterns",
        status: "completed",
        dataSource: "Marketing Semantic Layer",
        sqlQuery: `WITH inactive_users AS (
  SELECT *,
    DATEDIFF(CURRENT_DATE, last_activity_date) as days_inactive,
    CASE
      WHEN total_sessions >= 10 AND days_inactive BETWEEN 30 AND 60 THEN 'Recently Dormant'
      WHEN total_sessions >= 5 AND days_inactive BETWEEN 61 AND 90 THEN 'At Risk'
      WHEN days_inactive > 90 THEN 'Long-Term Inactive'
      ELSE 'Other'
    END as segment
  FROM marts_marketing.user_engagement
  WHERE last_activity_date < CURRENT_DATE - INTERVAL '30 days'
    AND total_sessions > 2
)
SELECT
  segment,
  COUNT(*) as user_count,
  AVG(total_sessions) as avg_lifetime_sessions,
  AVG(days_inactive) as avg_days_inactive,
  COUNT(DISTINCT acquisition_channel) as channels
FROM inactive_users
WHERE segment != 'Other'
GROUP BY segment
ORDER BY avg_days_inactive ASC;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Analyze acquisition channels",
        description: "Understand which channels each segment came from for targeted messaging",
        status: "completed",
        dataSource: "Marketing Semantic Layer",
        sqlQuery: `SELECT
  segment,
  acquisition_channel,
  COUNT(*) as users,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY segment), 1) as pct_of_segment
FROM inactive_users
GROUP BY segment, acquisition_channel
ORDER BY segment, users DESC;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Generate activation recommendations",
        description: "Create actionable insights for each segment with specific email tactics",
        status: "completed",
        sqlQuery: `SELECT
  segment,
  user_count,
  CASE segment
    WHEN 'Recently Dormant' THEN 'Re-engagement: Highlight new features they missed'
    WHEN 'At Risk' THEN 'Value reminder: Show their past achievements + limited offer'
    WHEN 'Long-Term Inactive' THEN 'Win-back: Special incentive + "We miss you" message'
  END as email_strategy,
  CASE segment
    WHEN 'Recently Dormant' THEN 'Feature updates, product news'
    WHEN 'At Risk' THEN 'Usage stats, special discount'
    WHEN 'Long-Term Inactive' THEN 'Reactivation bonus, fresh start'
  END as content_focus
FROM segment_summary;`,
      },
    ],
    tableData: {
      title: "Customer Segments for Activation Campaign",
      columns: [
        { key: "segment", label: "Segment", sortable: true },
        { key: "userCount", label: "Users", sortable: true },
        { key: "avgSessions", label: "Avg Lifetime Sessions", sortable: true },
        { key: "daysInactive", label: "Avg Days Inactive", sortable: true },
        { key: "topChannel", label: "Top Channel", sortable: false },
        { key: "emailStrategy", label: "Recommended Strategy", sortable: false },
      ],
      rows: [
        {
          segment: "Recently Dormant",
          userCount: 487,
          avgSessions: 12.4,
          daysInactive: 42,
          topChannel: "Organic Search",
          emailStrategy: "Re-engagement: New features",
        },
        {
          segment: "At Risk",
          userCount: 352,
          avgSessions: 7.8,
          daysInactive: 75,
          topChannel: "Paid Social",
          emailStrategy: "Value reminder + Offer",
        },
        {
          segment: "Long-Term Inactive",
          userCount: 408,
          avgSessions: 5.2,
          daysInactive: 134,
          topChannel: "Referral",
          emailStrategy: "Win-back campaign",
        },
      ],
    },
    actions: [
      {
        id: "create-segment-1",
        label: "Create 'Recently Dormant' segment in Brevo",
        icon: "Users",
        type: "export",
        variant: "default",
      },
      {
        id: "create-segment-2",
        label: "Create 'At Risk' segment in Brevo",
        icon: "Users",
        type: "export",
        variant: "outline",
      },
      {
        id: "create-segment-3",
        label: "Create 'Long-Term Inactive' segment in Brevo",
        icon: "Users",
        type: "export",
        variant: "outline",
      },
      {
        id: "export-all",
        label: "Export all segments to CSV",
        icon: "Download",
        type: "export",
        variant: "ghost",
      },
    ],
  },
  "show me more details about the recently dormant segment": {
    content:
      "The 'Recently Dormant' segment consists of 487 users who were highly engaged (12+ sessions) but haven't returned in 30-60 days. Analysis shows 68% came from organic channels and most were active during weekday mornings. Historical data indicates this segment has a 42% reactivation rate when contacted within 60 days.",
    type: "table",
    dataSources: [
      {
        id: "marketing",
        name: "Marketing Semantic Layer",
        icon: "/dbt.png",
        tablesUsed: [
          "marts_marketing.user_engagement",
          "marts_marketing.user_behavior",
          "marts_marketing.reactivation_history",
        ],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Analyze behavioral patterns",
        description: "Examine usage patterns, peak activity times, and preferred features",
        status: "completed",
        dataSource: "Marketing Semantic Layer",
        sqlQuery: `SELECT
  EXTRACT(DOW FROM activity_timestamp) as day_of_week,
  EXTRACT(HOUR FROM activity_timestamp) as hour_of_day,
  COUNT(*) as activity_count,
  COUNT(DISTINCT user_id) as unique_users
FROM marts_marketing.user_behavior
WHERE user_id IN (
  SELECT user_id FROM marts_marketing.user_engagement
  WHERE segment = 'Recently Dormant'
)
GROUP BY day_of_week, hour_of_day
ORDER BY activity_count DESC
LIMIT 10;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate historical reactivation rates",
        description: "Look at past campaigns to understand what works for this segment",
        status: "completed",
        dataSource: "Marketing Semantic Layer",
        sqlQuery: `WITH past_campaigns AS (
  SELECT
    campaign_id,
    campaign_type,
    sent_date,
    COUNT(DISTINCT user_id) as users_contacted,
    COUNT(DISTINCT CASE WHEN reactivated = true THEN user_id END) as users_reactivated
  FROM marts_marketing.reactivation_history
  WHERE segment = 'Recently Dormant'
    AND sent_date >= CURRENT_DATE - INTERVAL '12 months'
  GROUP BY campaign_id, campaign_type, sent_date
)
SELECT
  campaign_type,
  COUNT(*) as campaigns_sent,
  AVG(users_reactivated * 100.0 / users_contacted) as avg_reactivation_rate,
  SUM(users_contacted) as total_users_contacted,
  SUM(users_reactivated) as total_reactivated
FROM past_campaigns
GROUP BY campaign_type
ORDER BY avg_reactivation_rate DESC;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Identify top features used",
        description: "Understand which features these users engaged with most",
        status: "completed",
        dataSource: "Marketing Semantic Layer",
        sqlQuery: `SELECT
  feature_name,
  COUNT(DISTINCT user_id) as users_who_used,
  ROUND(COUNT(DISTINCT user_id) * 100.0 / 487, 1) as pct_of_segment,
  AVG(usage_count) as avg_usage_per_user
FROM marts_marketing.user_behavior
WHERE user_id IN (
  SELECT user_id FROM marts_marketing.user_engagement
  WHERE segment = 'Recently Dormant'
)
GROUP BY feature_name
ORDER BY users_who_used DESC
LIMIT 8;`,
      },
    ],
    tableData: {
      title: "Recently Dormant Segment - Detailed Insights",
      columns: [
        { key: "metric", label: "Metric", sortable: false },
        { key: "value", label: "Value", sortable: false },
        { key: "insight", label: "Insight", sortable: false },
      ],
      rows: [
        {
          metric: "Peak Activity Time",
          value: "Mon-Fri, 9-11 AM",
          insight: "Send emails Tuesday 8:30 AM for optimal open rates",
        },
        {
          metric: "Top Feature Used",
          value: "Dashboard Analytics (78%)",
          insight: "Highlight new dashboard features in email",
        },
        {
          metric: "Avg Session Duration",
          value: "8.4 minutes",
          insight: "Engaged users - focus on feature depth not breadth",
        },
        {
          metric: "Historical Reactivation",
          value: "42% within 60 days",
          insight: "High urgency - contact within 2 weeks for best results",
        },
        {
          metric: "Acquisition Channel",
          value: "68% Organic Search",
          insight: "Trust-focused messaging will resonate",
        },
        {
          metric: "Average Customer Lifetime",
          value: "4.2 months active",
          insight: "Mid-tenure users - emphasize ROI and achievements",
        },
      ],
    },
    actions: [
      {
        id: "view-users",
        label: "View full user list (487 users)",
        icon: "Users",
        type: "view",
        variant: "outline",
      },
      {
        id: "download-segment",
        label: "Download segment data",
        icon: "Download",
        type: "export",
        variant: "ghost",
      },
    ],
  },
  "what email content would work best for each segment": {
    content:
      "I've analyzed historical campaign performance and segment characteristics to generate tailored email recommendations. Each segment requires different messaging: Recently Dormant users respond to feature updates (34% higher CTR), At Risk users need value reinforcement (28% higher conversion), and Long-Term Inactive users require incentive-driven win-back campaigns (19% reactivation rate with offers).",
    type: "table",
    dataSources: [
      {
        id: "marketing",
        name: "Marketing Semantic Layer",
        icon: "/dbt.png",
        tablesUsed: [
          "marts_marketing.campaign_performance",
          "marts_marketing.email_templates",
          "marts_marketing.segment_preferences",
        ],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Analyze past campaign performance by segment",
        description: "Review which email types performed best for each segment historically",
        status: "completed",
        dataSource: "Marketing Semantic Layer",
        sqlQuery: `SELECT
  segment,
  email_type,
  COUNT(*) as campaigns_sent,
  AVG(open_rate) as avg_open_rate,
  AVG(click_rate) as avg_click_rate,
  AVG(conversion_rate) as avg_conversion_rate
FROM marts_marketing.campaign_performance
WHERE segment IN ('Recently Dormant', 'At Risk', 'Long-Term Inactive')
  AND sent_date >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY segment, email_type
ORDER BY segment, avg_conversion_rate DESC;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Generate segment-specific subject lines",
        description: "Create A/B test subject line recommendations based on past winners",
        status: "completed",
        dataSource: "Marketing Semantic Layer",
        sqlQuery: `WITH best_subjects AS (
  SELECT
    segment,
    subject_line_pattern,
    AVG(open_rate) as avg_open_rate,
    COUNT(*) as times_used
  FROM marts_marketing.email_templates
  WHERE segment IS NOT NULL
    AND open_rate > 0.20
  GROUP BY segment, subject_line_pattern
)
SELECT
  segment,
  subject_line_pattern,
  ROUND(avg_open_rate * 100, 1) as open_rate_pct,
  times_used as historical_uses
FROM best_subjects
WHERE times_used >= 3
ORDER BY segment, avg_open_rate DESC;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Recommend optimal send times",
        description: "Determine best day and time for each segment based on engagement patterns",
        status: "completed",
        dataSource: "Marketing Semantic Layer",
        sqlQuery: `SELECT
  segment,
  CASE EXTRACT(DOW FROM optimal_send_time)
    WHEN 1 THEN 'Monday'
    WHEN 2 THEN 'Tuesday'
    WHEN 3 THEN 'Wednesday'
    WHEN 4 THEN 'Thursday'
    WHEN 5 THEN 'Friday'
  END as best_day,
  TO_CHAR(optimal_send_time, 'HH:MI AM') as best_time,
  ROUND(avg_open_rate * 100, 1) as expected_open_rate
FROM marts_marketing.segment_preferences
WHERE segment IN ('Recently Dormant', 'At Risk', 'Long-Term Inactive')
ORDER BY segment;`,
      },
    ],
    tableData: {
      title: "Email Content Recommendations by Segment",
      columns: [
        { key: "segment", label: "Segment", sortable: false },
        { key: "subjectLine", label: "Subject Line (A/B Test)", sortable: false },
        { key: "emailContent", label: "Key Messaging", sortable: false },
        { key: "cta", label: "Primary CTA", sortable: false },
        { key: "sendTime", label: "Optimal Send Time", sortable: false },
      ],
      rows: [
        {
          segment: "Recently Dormant (487)",
          subjectLine: "A: 'You're missing out on these new features'\nB: '3 updates that will save you hours'",
          emailContent:
            "Feature announcements, product updates, user achievements. Tone: Helpful & informative. Highlight: Dashboard 2.0, Smart Reports, API integrations",
          cta: "See What's New",
          sendTime: "Tuesday 8:30 AM",
        },
        {
          segment: "At Risk (352)",
          subjectLine: "A: 'Your progress + exclusive 20% offer inside'\nB: '[Name], here's what you've accomplished'",
          emailContent:
            "Personal usage stats, ROI summary, competitive advantage. Tone: Appreciative & urgent. Include: Limited-time 20% discount, upgrade path, testimonials",
          cta: "Claim Your Offer",
          sendTime: "Wednesday 2:00 PM",
        },
        {
          segment: "Long-Term Inactive (408)",
          subjectLine: "A: 'We miss you! Here's 30% off to come back'\nB: 'A lot has changed - see for yourself'",
          emailContent:
            "Win-back messaging, fresh start narrative, major improvements. Tone: Warm & incentive-driven. Feature: 30% reactivation discount, onboarding refresh, customer success support",
          cta: "Reactivate Account",
          sendTime: "Thursday 10:00 AM",
        },
      ],
    },
    actions: [
      {
        id: "generate-emails",
        label: "Generate full email drafts",
        icon: "FileText",
        type: "alert",
        variant: "default",
      },
      {
        id: "preview-templates",
        label: "Preview email templates",
        icon: "Eye",
        type: "view",
        variant: "outline",
      },
      {
        id: "export-copy",
        label: "Export copy to Google Docs",
        icon: "Download",
        type: "export",
        variant: "ghost",
      },
    ],
  },
  "create the recently dormant segment in brevo and set up the campaign": {
    content:
      "I've successfully created the 'Recently Dormant - Q1 2025' segment in Brevo with 487 contacts and set up the activation campaign. The campaign includes A/B testing for subject lines, smart send time optimization, and automated follow-up sequences. Expected results: 42% open rate, 8.2% CTR, ~204 reactivations within 2 weeks.",
    type: "table",
    dataSources: [
      {
        id: "brevo",
        name: "Brevo (via MCP)",
        icon: "/brevo.png",
        tablesUsed: ["contacts", "segments", "campaigns"],
      },
      {
        id: "marketing",
        name: "Marketing Semantic Layer",
        icon: "/dbt.png",
        tablesUsed: ["marts_marketing.user_engagement"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Export segment to Brevo",
        description: "Create segment with 487 users and sync contact data",
        status: "completed",
        dataSource: "Brevo (via MCP)",
        sqlQuery: `-- Contacts exported from Numize to Brevo
INSERT INTO brevo.contacts (
  email,
  first_name,
  last_name,
  signup_date,
  last_activity,
  total_sessions,
  segment_tag
)
SELECT
  email,
  first_name,
  last_name,
  signup_date,
  last_activity_date,
  total_sessions,
  'Recently Dormant - Q1 2025' as segment_tag
FROM marts_marketing.user_engagement
WHERE segment = 'Recently Dormant';

-- Result: 487 contacts created/updated`,
      },
      {
        id: "step2",
        step: 2,
        title: "Configure campaign settings",
        description: "Set up A/B test, send schedule, and automation rules",
        status: "completed",
        dataSource: "Brevo (via MCP)",
        sqlQuery: `-- Campaign configuration (pseudo-SQL for illustration)
CREATE CAMPAIGN 'Recently Dormant Activation - Q1 2025'
SET segment = 'Recently Dormant - Q1 2025'
SET ab_test = {
  subject_a: "You're missing out on these new features",
  subject_b: "3 updates that will save you hours",
  split: 50/50,
  winner_criteria: 'open_rate'
}
SET schedule = {
  send_date: '2025-01-28',
  send_time: '08:30',
  timezone: 'America/New_York',
  smart_send: true
}
SET follow_up = {
  condition: 'not_opened',
  delay_days: 3,
  subject: "Quick reminder: See what's new"
};`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate expected results",
        description: "Project campaign performance based on historical data",
        status: "completed",
        dataSource: "Marketing Semantic Layer",
        sqlQuery: `WITH segment_stats AS (
  SELECT
    487 as total_users,
    0.42 as expected_open_rate,
    0.082 as expected_ctr,
    0.42 as expected_reactivation_rate
)
SELECT
  total_users,
  ROUND(total_users * expected_open_rate) as expected_opens,
  ROUND(total_users * expected_ctr) as expected_clicks,
  ROUND(total_users * expected_reactivation_rate) as expected_reactivations,
  ROUND(total_users * expected_reactivation_rate * 49.00, 2) as estimated_revenue
FROM segment_stats;

-- Expected: 204 opens, 40 clicks, 204 reactivations, $9,996 revenue`,
      },
    ],
    tableData: {
      title: "Campaign Setup Summary",
      columns: [
        { key: "attribute", label: "Attribute", sortable: false },
        { key: "value", label: "Value", sortable: false },
        { key: "status", label: "Status", sortable: false },
      ],
      rows: [
        {
          attribute: "Segment Name",
          value: "Recently Dormant - Q1 2025",
          status: "✓ Created",
        },
        {
          attribute: "Total Contacts",
          value: "487 users",
          status: "✓ Synced",
        },
        {
          attribute: "Campaign Type",
          value: "A/B Test Email",
          status: "✓ Configured",
        },
        {
          attribute: "Send Schedule",
          value: "Jan 28, 2025 @ 8:30 AM EST",
          status: "✓ Scheduled",
        },
        {
          attribute: "Follow-up Sequence",
          value: "3-day delay for non-openers",
          status: "✓ Enabled",
        },
        {
          attribute: "Expected Open Rate",
          value: "42% (~204 users)",
          status: "— Projected",
        },
        {
          attribute: "Expected CTR",
          value: "8.2% (~40 users)",
          status: "— Projected",
        },
        {
          attribute: "Expected Reactivations",
          value: "204 users (42%)",
          status: "— Projected",
        },
        {
          attribute: "Estimated Revenue",
          value: "$9,996 (avg $49/user)",
          status: "— Projected",
        },
      ],
    },
    actions: [
      {
        id: "view-brevo",
        label: "Open campaign in Brevo",
        icon: "ExternalLink",
        type: "view",
        variant: "default",
      },
      {
        id: "send-test",
        label: "Send test email",
        icon: "Mail",
        type: "alert",
        variant: "outline",
      },
      {
        id: "edit-schedule",
        label: "Edit send schedule",
        icon: "Calendar",
        type: "view",
        variant: "outline",
      },
      {
        id: "create-other-segments",
        label: "Set up 'At Risk' campaign next",
        icon: "Users",
        type: "alert",
        variant: "ghost",
      },
    ],
  },
  "show customers with high payment value but low engagement": {
    content:
      "I found 23 customers who have high payment value (>$500/month) but low engagement (<5 sessions/month). These are at-risk customers who might churn despite paying well.",
    type: "table",
    dataSources: [
      {
        id: "stripe",
        name: "Stripe",
        icon: "/stripe.png",
        tablesUsed: ["subscriptions", "customers"],
      },
      {
        id: "ga4",
        name: "Google Analytics",
        icon: "/google-analytics.png",
        tablesUsed: ["sessions", "events"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Identify high-value customers",
        description: "Query Stripe to find customers with MRR > $500",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  customer_id,
  email,
  company_name,
  SUM(amount) as mrr
FROM stripe.subscriptions
WHERE status = 'active'
GROUP BY customer_id, email, company_name
HAVING SUM(amount) > 500;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Get engagement metrics",
        description: "Query Google Analytics for session counts per customer",
        status: "completed",
        dataSource: "Google Analytics",
        sqlQuery: `SELECT
  user_id,
  COUNT(DISTINCT session_id) as sessions,
  COUNT(DISTINCT DATE(timestamp)) as active_days
FROM ga4.sessions
WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY user_id;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Join datasets",
        description: "Match Stripe customers to GA users by email and filter for low engagement",
        status: "completed",
        sqlQuery: `SELECT
  s.customer_id,
  s.email,
  s.company_name,
  s.mrr,
  COALESCE(g.sessions, 0) as monthly_sessions,
  COALESCE(g.active_days, 0) as active_days,
  s.mrr / NULLIF(g.sessions, 0) as value_per_session
FROM high_value_customers s
LEFT JOIN ga4_engagement g ON s.email = g.user_id
WHERE COALESCE(g.sessions, 0) < 5
ORDER BY s.mrr DESC;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Calculate risk score",
        description: "Add churn risk indicator based on engagement patterns",
        status: "completed",
        sqlQuery: `SELECT *,
  CASE
    WHEN monthly_sessions = 0 THEN 'Critical'
    WHEN monthly_sessions < 3 THEN 'High'
    ELSE 'Medium'
  END as churn_risk
FROM matched_customers;`,
      },
    ],
    tableData: {
      columns: [
        { key: "company", label: "Company" },
        { key: "email", label: "Email" },
        { key: "mrr", label: "MRR" },
        { key: "sessions", label: "Sessions/Mo" },
        { key: "activeDays", label: "Active Days" },
        { key: "valuePerSession", label: "$/Session" },
        { key: "risk", label: "Churn Risk" },
      ],
      rows: [
        {
          company: "Acme Corp",
          email: "billing@acme.com",
          mrr: "$2,450",
          sessions: 2,
          activeDays: 2,
          valuePerSession: "$1,225",
          risk: "High",
        },
        {
          company: "TechStart Inc",
          email: "admin@techstart.io",
          mrr: "$1,890",
          sessions: 0,
          activeDays: 0,
          valuePerSession: "∞",
          risk: "Critical",
        },
        {
          company: "DataFlow Systems",
          email: "ops@dataflow.com",
          mrr: "$1,620",
          sessions: 4,
          activeDays: 3,
          valuePerSession: "$405",
          risk: "Medium",
        },
        {
          company: "CloudBridge Ltd",
          email: "team@cloudbridge.com",
          mrr: "$1,450",
          sessions: 1,
          activeDays: 1,
          valuePerSession: "$1,450",
          risk: "High",
        },
        {
          company: "InnovateLab",
          email: "hello@innovatelab.co",
          mrr: "$1,280",
          sessions: 3,
          activeDays: 3,
          valuePerSession: "$427",
          risk: "High",
        },
        {
          company: "ScaleUp Ventures",
          email: "accounts@scaleup.vc",
          mrr: "$980",
          sessions: 2,
          activeDays: 1,
          valuePerSession: "$490",
          risk: "High",
        },
        {
          company: "NextGen Solutions",
          email: "billing@nextgen.io",
          mrr: "$875",
          sessions: 0,
          activeDays: 0,
          valuePerSession: "∞",
          risk: "Critical",
        },
        {
          company: "BuildFast Co",
          email: "info@buildfast.com",
          mrr: "$790",
          sessions: 4,
          activeDays: 2,
          valuePerSession: "$198",
          risk: "Medium",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "schedule", label: "Weekly Monitor", icon: "Calendar", type: "schedule" },
      { id: "alert", label: "Alert on New Risks", icon: "Bell", type: "alert" },
    ],
  },
  "compare marketing spend to actual revenue by channel": {
    content:
      "Analyzing marketing ROI across channels by combining HubSpot spend data with Stripe revenue. Organic and Referral channels show the best ROI at 8.2x and 6.4x respectively.",
    type: "table",
    dataSources: [
      {
        id: "hubspot",
        name: "HubSpot",
        icon: "/hubspot.jpeg",
        tablesUsed: ["contacts", "deals", "marketing_campaigns"],
      },
      {
        id: "stripe",
        name: "Stripe",
        icon: "/stripe.png",
        tablesUsed: ["customers", "subscriptions", "invoices"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get marketing spend by channel",
        description: "Query HubSpot for total marketing spend per acquisition channel",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  acquisition_channel,
  SUM(marketing_spend) as total_spend,
  COUNT(DISTINCT contact_id) as contacts_acquired
FROM hubspot.marketing_campaigns
WHERE campaign_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY acquisition_channel;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate actual revenue",
        description: "Query Stripe for revenue generated from customers by their source channel",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  c.acquisition_channel,
  SUM(s.amount) as total_revenue,
  COUNT(DISTINCT c.customer_id) as paying_customers,
  AVG(s.amount) as avg_revenue_per_customer
FROM stripe.customers c
JOIN stripe.subscriptions s ON c.customer_id = s.customer_id
WHERE c.created_at >= CURRENT_DATE - INTERVAL '90 days'
  AND s.status = 'active'
GROUP BY c.acquisition_channel;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Join and calculate ROI",
        description: "Match spend to revenue and calculate ROI, CAC, and payback metrics",
        status: "completed",
        sqlQuery: `SELECT
  h.acquisition_channel,
  h.total_spend,
  h.contacts_acquired,
  s.paying_customers,
  s.total_revenue,
  s.avg_revenue_per_customer,
  h.total_spend / NULLIF(s.paying_customers, 0) as cac,
  s.total_revenue / NULLIF(h.total_spend, 0) as roi_multiple,
  s.paying_customers::FLOAT / NULLIF(h.contacts_acquired, 0) * 100 as conversion_rate
FROM hubspot_spend h
LEFT JOIN stripe_revenue s ON h.acquisition_channel = s.acquisition_channel
ORDER BY roi_multiple DESC;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Add efficiency metrics",
        description: "Calculate CAC payback period and efficiency score",
        status: "completed",
        sqlQuery: `SELECT *,
  avg_revenue_per_customer / NULLIF(cac, 0) as ltv_cac_ratio,
  cac / NULLIF(avg_revenue_per_customer, 0) * 12 as payback_months
FROM channel_roi
ORDER BY roi_multiple DESC;`,
      },
    ],
    tableData: {
      columns: [
        { key: "channel", label: "Channel" },
        { key: "spend", label: "Marketing Spend" },
        { key: "contacts", label: "Contacts" },
        { key: "customers", label: "Customers" },
        { key: "revenue", label: "Revenue" },
        { key: "cac", label: "CAC" },
        { key: "roi", label: "ROI" },
        { key: "conversionRate", label: "Conversion %" },
      ],
      rows: [
        {
          channel: "Organic Search",
          spend: "$2,450",
          contacts: 385,
          customers: 42,
          revenue: "$20,180",
          cac: "$58",
          roi: "8.2x",
          conversionRate: "10.9%",
        },
        {
          channel: "Referral",
          spend: "$1,200",
          contacts: 156,
          customers: 28,
          revenue: "$7,680",
          cac: "$43",
          roi: "6.4x",
          conversionRate: "17.9%",
        },
        {
          channel: "Content Marketing",
          spend: "$5,800",
          contacts: 892,
          customers: 67,
          revenue: "$28,450",
          cac: "$87",
          roi: "4.9x",
          conversionRate: "7.5%",
        },
        {
          channel: "Paid Search",
          spend: "$12,400",
          contacts: 1240,
          customers: 89,
          revenue: "$45,230",
          cac: "$139",
          roi: "3.6x",
          conversionRate: "7.2%",
        },
        {
          channel: "Social Media",
          spend: "$8,900",
          contacts: 2156,
          customers: 56,
          revenue: "$22,400",
          cac: "$159",
          roi: "2.5x",
          conversionRate: "2.6%",
        },
        {
          channel: "Display Ads",
          spend: "$6,750",
          contacts: 1678,
          customers: 34,
          revenue: "$13,260",
          cac: "$199",
          roi: "2.0x",
          conversionRate: "2.0%",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "schedule", label: "Monthly Report", icon: "Calendar", type: "schedule" },
      { id: "view", label: "View Campaign Details", icon: "Eye", type: "view" },
    ],
  },
  "which support tickets correlate with churned customers?": {
    content:
      "Analyzing 247 churned customers against 1,834 support tickets. Found that 68% of churned customers had unresolved tickets in their last 30 days. Tickets about 'billing' and 'bugs' show highest correlation with churn.",
    type: "table",
    dataSources: [
      {
        id: "zendesk",
        name: "Zendesk",
        icon: "/zendesk.png",
        tablesUsed: ["tickets", "users", "ticket_metrics"],
      },
      {
        id: "stripe",
        name: "Stripe",
        icon: "/stripe.png",
        tablesUsed: ["customers", "subscriptions"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Identify churned customers",
        description: "Query Stripe for customers who cancelled in the last 90 days",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  customer_id,
  email,
  company_name,
  subscription_end_date,
  DATEDIFF(subscription_end_date, subscription_start_date) as lifetime_days
FROM stripe.subscriptions
WHERE status = 'canceled'
  AND subscription_end_date >= CURRENT_DATE - INTERVAL '90 days';`,
      },
      {
        id: "step2",
        step: 2,
        title: "Get support ticket history",
        description: "Query Zendesk for all tickets from churned customers",
        status: "completed",
        dataSource: "Zendesk",
        sqlQuery: `SELECT
  t.ticket_id,
  t.requester_email,
  t.subject,
  t.status,
  t.priority,
  t.created_at,
  t.solved_at,
  tm.first_response_time_minutes,
  tm.full_resolution_time_minutes
FROM zendesk.tickets t
JOIN zendesk.ticket_metrics tm ON t.ticket_id = tm.ticket_id
WHERE t.requester_email IN (SELECT email FROM churned_customers);`,
      },
      {
        id: "step3",
        step: 3,
        title: "Categorize and join data",
        description: "Match tickets to churned customers and categorize by type and timing",
        status: "completed",
        sqlQuery: `SELECT
  c.customer_id,
  c.email,
  c.company_name,
  c.subscription_end_date,
  t.ticket_id,
  t.subject,
  t.status,
  t.priority,
  DATEDIFF(c.subscription_end_date, t.created_at) as days_before_churn,
  CASE
    WHEN t.subject ILIKE '%billing%' OR t.subject ILIKE '%payment%' THEN 'Billing'
    WHEN t.subject ILIKE '%bug%' OR t.subject ILIKE '%error%' THEN 'Technical'
    WHEN t.subject ILIKE '%feature%' OR t.subject ILIKE '%request%' THEN 'Feature Request'
    ELSE 'Other'
  END as ticket_category
FROM churned_customers c
LEFT JOIN customer_tickets t ON c.email = t.requester_email
WHERE t.created_at >= c.subscription_end_date - INTERVAL '30 days';`,
      },
      {
        id: "step4",
        step: 4,
        title: "Calculate correlation metrics",
        description: "Aggregate by customer and identify patterns",
        status: "completed",
        sqlQuery: `SELECT
  company_name,
  email,
  subscription_end_date,
  COUNT(ticket_id) as ticket_count,
  COUNT(CASE WHEN status != 'solved' THEN 1 END) as unresolved_count,
  STRING_AGG(DISTINCT ticket_category, ', ') as issue_types,
  AVG(days_before_churn) as avg_days_before_churn,
  CASE
    WHEN COUNT(CASE WHEN status != 'solved' THEN 1 END) > 0 THEN 'Yes'
    ELSE 'No'
  END as had_unresolved
FROM matched_data
GROUP BY company_name, email, subscription_end_date
ORDER BY ticket_count DESC;`,
      },
    ],
    tableData: {
      columns: [
        { key: "company", label: "Company" },
        { key: "email", label: "Email" },
        { key: "churnDate", label: "Churn Date" },
        { key: "tickets", label: "Tickets (30d)" },
        { key: "unresolved", label: "Unresolved" },
        { key: "issueTypes", label: "Issue Types" },
        { key: "avgDaysBefore", label: "Avg Days Before Churn" },
      ],
      rows: [
        {
          company: "TechStart Inc",
          email: "admin@techstart.io",
          churnDate: "2025-01-15",
          tickets: 8,
          unresolved: 3,
          issueTypes: "Billing, Technical",
          avgDaysBefore: "12",
        },
        {
          company: "DataFlow Systems",
          email: "ops@dataflow.com",
          churnDate: "2025-01-18",
          tickets: 7,
          unresolved: 5,
          issueTypes: "Technical",
          avgDaysBefore: "8",
        },
        {
          company: "BuildFast Co",
          email: "info@buildfast.com",
          churnDate: "2025-01-22",
          tickets: 6,
          unresolved: 2,
          issueTypes: "Billing, Feature Request",
          avgDaysBefore: "15",
        },
        {
          company: "InnovateLab",
          email: "hello@innovatelab.co",
          churnDate: "2025-01-10",
          tickets: 5,
          unresolved: 4,
          issueTypes: "Technical, Other",
          avgDaysBefore: "6",
        },
        {
          company: "CloudBridge Ltd",
          email: "team@cloudbridge.com",
          churnDate: "2025-01-25",
          tickets: 4,
          unresolved: 1,
          issueTypes: "Billing",
          avgDaysBefore: "18",
        },
        {
          company: "NextGen Solutions",
          email: "billing@nextgen.io",
          churnDate: "2025-01-12",
          tickets: 4,
          unresolved: 4,
          issueTypes: "Technical",
          avgDaysBefore: "5",
        },
        {
          company: "ScaleUp Ventures",
          email: "accounts@scaleup.vc",
          churnDate: "2025-01-20",
          tickets: 3,
          unresolved: 0,
          issueTypes: "Feature Request",
          avgDaysBefore: "22",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Ticket Details", icon: "Eye", type: "view" },
      { id: "alert", label: "Alert on Similar Patterns", icon: "Bell", type: "alert" },
    ],
  },
  "which campaigns have cac below €150?": {
    content: "Here are the campaigns with CAC below €150:",
    type: "table",
    dataSources: [
      {
        id: "meta-ads",
        name: "Meta Ads",
        icon: "/meta.png",
        tablesUsed: ["campaigns", "ad_sets", "ads"],
      },
      {
        id: "google-ads",
        name: "Google Ads",
        icon: "/google_ads.png",
        tablesUsed: ["campaigns", "ad_groups"],
      },
      {
        id: "hubspot",
        name: "HubSpot",
        icon: "/hubspot.jpeg",
        tablesUsed: ["contacts", "deals"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Aggregate ad spend per campaign",
        description: "Query Meta Ads and Google Ads to get total spend per campaign",
        status: "completed",
        dataSource: "Meta Ads, Google Ads",
        sqlQuery: `SELECT
  campaign_id,
  campaign_name,
  'Meta' as platform,
  SUM(spend) as total_spend
FROM meta_ads.campaigns
WHERE status = 'active'
GROUP BY campaign_id, campaign_name

UNION ALL

SELECT
  campaign_id,
  campaign_name,
  'Google' as platform,
  SUM(cost) as total_spend
FROM google_ads.campaigns
WHERE status = 'ENABLED'
GROUP BY campaign_id, campaign_name;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Count customers acquired per campaign",
        description: "Query HubSpot to count customers attributed to each campaign",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  first_touch_campaign_id,
  COUNT(DISTINCT contact_id) as customers_acquired
FROM hubspot.contacts
WHERE lifecycle_stage = 'customer'
  AND first_touch_campaign_id IS NOT NULL
GROUP BY first_touch_campaign_id;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate CAC and filter",
        description: "Join spend with acquisition data, calculate CAC = Spend / Customers, filter for CAC < €150",
        status: "completed",
        sqlQuery: `SELECT
  c.campaign_name,
  c.platform,
  c.total_spend,
  COALESCE(h.customers_acquired, 0) as customers,
  CASE
    WHEN h.customers_acquired > 0 THEN c.total_spend / h.customers_acquired
    ELSE NULL
  END as cac
FROM campaign_spend c
LEFT JOIN hubspot_customers h ON c.campaign_id = h.first_touch_campaign_id
WHERE c.total_spend / NULLIF(h.customers_acquired, 0) < 150
ORDER BY cac ASC;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Enrich with ROAS metrics",
        description: "Add ROAS calculations to provide full campaign performance context",
        status: "completed",
        sqlQuery: `SELECT
  campaign_name,
  platform,
  cac,
  customers as leads,
  (SELECT AVG(mrr) * 12 FROM stripe.subscriptions) / cac as ltv_cac_ratio,
  ltv_cac_ratio as roas
FROM filtered_campaigns
ORDER BY roas DESC;`,
      },
    ],
    tableData: {
      title: "Campaigns with CAC < €150",
      columns: [
        { key: "name", label: "Campaign Name", sortable: true },
        { key: "platform", label: "Platform", sortable: true },
        { key: "cac", label: "CAC", sortable: true },
        { key: "leads", label: "Leads", sortable: true },
        { key: "roas", label: "ROAS", sortable: true },
      ],
      rows: [
        {
          name: "Google - Brand Protection",
          platform: "Google",
          cac: "€48",
          leads: 25,
          roas: "35.21x",
        },
        {
          name: "Meta - Lead Gen Software",
          platform: "Meta",
          cac: "€106",
          leads: 15,
          roas: "19.44x",
        },
        {
          name: "Google - Competitor Targeting",
          platform: "Google",
          cac: "€125",
          leads: 12,
          roas: "14.32x",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Campaign Details", icon: "Eye", type: "view" },
    ],
  },
  "compare meta vs google roas over last quarter": {
    content: "Here's the ROAS comparison between Meta and Google Ads for Q4:",
    type: "chart",
    dataSources: [
      {
        id: "meta-ads",
        name: "Meta Ads",
        icon: "/meta.png",
        tablesUsed: ["campaigns", "insights"],
      },
      {
        id: "google-ads",
        name: "Google Ads",
        icon: "/google_ads.png",
        tablesUsed: ["campaigns", "stats"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get Meta Ads performance data",
        description: "Query Meta Ads insights for spend and revenue by month in Q4",
        status: "completed",
        dataSource: "Meta Ads",
        sqlQuery: `SELECT
  DATE_TRUNC('month', date) as month,
  SUM(spend) as total_spend,
  SUM(purchase_value) as total_revenue
FROM meta_ads.insights
WHERE date >= '2024-10-01' AND date <= '2024-12-31'
GROUP BY DATE_TRUNC('month', date)
ORDER BY month;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Get Google Ads performance data",
        description: "Query Google Ads stats for cost and conversions value by month in Q4",
        status: "completed",
        dataSource: "Google Ads",
        sqlQuery: `SELECT
  DATE_TRUNC('month', date) as month,
  SUM(cost) as total_spend,
  SUM(conversion_value) as total_revenue
FROM google_ads.stats
WHERE date >= '2024-10-01' AND date <= '2024-12-31'
GROUP BY DATE_TRUNC('month', date)
ORDER BY month;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate ROAS per platform",
        description: "Calculate ROAS (Revenue / Spend) for each platform per month",
        status: "completed",
        sqlQuery: `SELECT
  month,
  'Meta' as platform,
  total_spend,
  total_revenue,
  total_revenue / NULLIF(total_spend, 0) as roas
FROM meta_monthly

UNION ALL

SELECT
  month,
  'Google' as platform,
  total_spend,
  total_revenue,
  total_revenue / NULLIF(total_spend, 0) as roas
FROM google_monthly
ORDER BY month, platform;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Format for visualization",
        description: "Pivot data to create month-over-month comparison format",
        status: "completed",
        sqlQuery: `SELECT
  TO_CHAR(month, 'Month') as month_name,
  MAX(CASE WHEN platform = 'Meta' THEN roas END) as Meta,
  MAX(CASE WHEN platform = 'Google' THEN roas END) as Google
FROM platform_roas
GROUP BY month, month_name
ORDER BY month;`,
      },
    ],
    chartData: {
      type: "bar",
      title: "Meta vs Google ROAS Comparison - Q4",
      data: [
        { month: "October", Meta: 13.5, Google: 12.1 },
        { month: "November", Meta: 14.2, Google: 11.8 },
        { month: "December", Meta: 13.8, Google: 11.3 },
      ],
      xKey: "month",
      yKeys: ["Meta", "Google"],
      legend: true,
      colors: ["#3b82f6", "#ef4444"],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "schedule", label: "Monthly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "compare meta vs google ads roas over last quarter": {
    content:
      "Here's the ROAS comparison between Meta and Google Ads for Q4. ROAS calculated by attributing HubSpot deal revenue back to ad campaigns:",
    type: "chart",
    dataSources: [
      {
        id: "meta-ads",
        name: "Meta Ads",
        icon: "/meta.png",
        tablesUsed: ["campaigns", "insights"],
      },
      {
        id: "google-ads",
        name: "Google Ads",
        icon: "/google_ads.png",
        tablesUsed: ["campaigns", "stats"],
      },
      {
        id: "hubspot",
        name: "HubSpot",
        icon: "/hubspot.jpeg",
        tablesUsed: ["deals", "contacts"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get Meta Ads spend data",
        description: "Query Meta Ads insights for ad spend by month in Q4",
        status: "completed",
        dataSource: "Meta Ads",
        sqlQuery: `SELECT
  DATE_TRUNC('month', date) as month,
  SUM(spend) as total_spend
FROM meta_ads.insights
WHERE date >= '2024-10-01' AND date <= '2024-12-31'
GROUP BY DATE_TRUNC('month', date)
ORDER BY month;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Get Google Ads spend data",
        description: "Query Google Ads stats for ad cost by month in Q4",
        status: "completed",
        dataSource: "Google Ads",
        sqlQuery: `SELECT
  DATE_TRUNC('month', date) as month,
  SUM(cost) as total_spend
FROM google_ads.stats
WHERE date >= '2024-10-01' AND date <= '2024-12-31'
GROUP BY DATE_TRUNC('month', date)
ORDER BY month;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Join with HubSpot deals for revenue attribution",
        description: "Match ad campaigns to HubSpot deals via contact attribution to get actual closed revenue",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  CASE
    WHEN c.utm_source = 'facebook' THEN 'Meta'
    WHEN c.utm_source = 'google' THEN 'Google'
  END as platform,
  DATE_TRUNC('month', d.closed_date) as month,
  SUM(d.amount) as attributed_revenue
FROM hubspot.deals d
JOIN hubspot.contacts c ON d.contact_id = c.id
WHERE d.stage = 'closed_won'
  AND d.closed_date >= '2024-10-01'
  AND d.closed_date <= '2024-12-31'
  AND c.utm_source IN ('facebook', 'google')
GROUP BY platform, DATE_TRUNC('month', d.closed_date)
ORDER BY month;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Calculate ROAS per platform",
        description: "Join ad spend with attributed revenue to calculate ROAS (Revenue / Spend) for each platform",
        status: "completed",
        sqlQuery: `SELECT
  ad.month,
  ad.platform,
  ad.total_spend,
  COALESCE(hs.attributed_revenue, 0) as total_revenue,
  COALESCE(hs.attributed_revenue, 0) / NULLIF(ad.total_spend, 0) as roas
FROM (
  SELECT month, 'Meta' as platform, total_spend FROM meta_monthly
  UNION ALL
  SELECT month, 'Google' as platform, total_spend FROM google_monthly
) ad
LEFT JOIN hubspot_attribution hs
  ON ad.month = hs.month
  AND ad.platform = hs.platform
ORDER BY ad.month, ad.platform;`,
      },
      {
        id: "step5",
        step: 5,
        title: "Format for visualization",
        description: "Pivot data to create month-over-month comparison format",
        status: "completed",
        sqlQuery: `SELECT
  TO_CHAR(month, 'Month') as month_name,
  MAX(CASE WHEN platform = 'Meta' THEN roas END) as Meta,
  MAX(CASE WHEN platform = 'Google' THEN roas END) as Google
FROM platform_roas
GROUP BY month, month_name
ORDER BY month;`,
      },
    ],
    chartData: {
      type: "bar",
      title: "Meta vs Google ROAS Comparison - Q4",
      data: [
        { month: "October", Meta: 13.5, Google: 12.1 },
        { month: "November", Meta: 14.2, Google: 11.8 },
        { month: "December", Meta: 13.8, Google: 11.3 },
      ],
      xKey: "month",
      yKeys: ["Meta", "Google"],
      legend: true,
      colors: ["#3b82f6", "#ef4444"],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "schedule", label: "Monthly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "what's the conversion rate from leads to deals?": {
    content:
      "Based on the data, here's the conversion funnel breakdown:\n\n**Overall Conversion Rates:**\n- Clicks to Leads: 0.06%\n- Leads to Meetings: 58.3%\n- Meetings to Meetings Honored: 90.0%\n- Meetings Honored to Deals: 42.6%\n\n**Key Insight:** You have strong conversion at the meeting stage (90% attendance), but there's opportunity to improve the click-to-lead conversion. Consider optimizing your landing pages and form UX.",
    type: "text",
    dataSources: [
      {
        id: "hubspot",
        name: "HubSpot",
        icon: "/hubspot.jpeg",
        tablesUsed: ["contacts", "deals", "meetings"],
      },
    ],
    actions: [
      { id: "export", label: "Export Analysis", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Funnel Details", icon: "Eye", type: "view" },
    ],
  },
  "breakdown spend by campaign type": {
    content: "Here's the breakdown of ad spend by campaign type:",
    type: "chart",
    dataSources: [
      {
        id: "meta-ads",
        name: "Meta Ads",
        icon: "/meta.png",
        tablesUsed: ["campaigns"],
      },
      {
        id: "google-ads",
        name: "Google Ads",
        icon: "/google_ads.png",
        tablesUsed: ["campaigns"],
      },
    ],
    chartData: {
      type: "pie",
      title: "Spend by Campaign Type",
      data: [
        { name: "Lead Generation", value: 18500, percentage: 55.6 },
        { name: "Brand Awareness", value: 8200, percentage: 24.6 },
        { name: "Retargeting", value: 4600, percentage: 13.8 },
        { name: "Competitor Targeting", value: 2000, percentage: 6.0 },
      ],
      colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Campaign Details", icon: "Eye", type: "view" },
    ],
  },
  "show me leads from hubspot with low meeting conversion rates": {
    content:
      "Found 47 leads with meeting conversion rates below 40%. These leads have been contacted but show low engagement at the meeting stage.",
    type: "table",
    dataSources: [
      {
        id: "hubspot",
        name: "HubSpot",
        icon: "/hubspot.jpeg",
        tablesUsed: ["contacts", "meetings", "campaigns"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get all leads with meetings scheduled",
        description: "Query HubSpot contacts who have had at least one meeting scheduled",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  c.contact_id,
  c.firstname,
  c.lastname,
  c.email,
  c.first_touch_campaign_name,
  c.lifecycle_stage
FROM hubspot.contacts c
WHERE c.contact_id IN (
  SELECT DISTINCT contact_id
  FROM hubspot.meetings
  WHERE status IN ('scheduled', 'completed', 'no_show')
);`,
      },
      {
        id: "step2",
        step: 2,
        title: "Count meetings per lead",
        description: "Aggregate meeting counts - scheduled vs attended for each lead",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  contact_id,
  COUNT(*) as meetings_scheduled,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as meetings_attended,
  COUNT(CASE WHEN status = 'no_show' THEN 1 END) as meetings_missed
FROM hubspot.meetings
GROUP BY contact_id;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate conversion rates",
        description: "Join data and calculate meeting attendance rate (attended / scheduled)",
        status: "completed",
        sqlQuery: `SELECT
  c.contact_id,
  c.firstname || ' ' || c.lastname as name,
  c.email,
  c.first_touch_campaign_name as campaign,
  m.meetings_scheduled,
  m.meetings_attended,
  (m.meetings_attended::FLOAT / NULLIF(m.meetings_scheduled, 0) * 100) as conversion_rate
FROM leads_with_meetings c
JOIN meeting_counts m ON c.contact_id = m.contact_id;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Filter for low conversion",
        description: "Filter to show only leads with conversion rate < 40%",
        status: "completed",
        sqlQuery: `SELECT
  name,
  email,
  campaign,
  meetings_scheduled,
  meetings_attended,
  ROUND(conversion_rate) || '%' as conversion_rate
FROM lead_conversion_rates
WHERE conversion_rate < 40
ORDER BY meetings_scheduled DESC, conversion_rate ASC
LIMIT 50;`,
      },
    ],
    tableData: {
      title: "Leads with Low Meeting Conversion",
      columns: [
        { key: "name", label: "Lead Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "campaign", label: "Source Campaign", sortable: true },
        { key: "meetingsScheduled", label: "Meetings Scheduled", sortable: true },
        { key: "meetingsAttended", label: "Meetings Attended", sortable: true },
        { key: "conversionRate", label: "Conversion %", sortable: true },
      ],
      rows: [
        {
          name: "John Smith",
          email: "john.smith@example.com",
          campaign: "Meta - Lead Gen Software",
          meetingsScheduled: 5,
          meetingsAttended: 1,
          conversionRate: "20%",
        },
        {
          name: "Sarah Johnson",
          email: "sarah.j@company.com",
          campaign: "Google - Competitor Targeting",
          meetingsScheduled: 4,
          meetingsAttended: 1,
          conversionRate: "25%",
        },
        {
          name: "Mike Wilson",
          email: "mike.wilson@business.io",
          campaign: "Meta - Lead Gen Software",
          meetingsScheduled: 3,
          meetingsAttended: 1,
          conversionRate: "33%",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Lead Details", icon: "Eye", type: "view" },
    ],
  },
  "what's our mrr growth trend over the last 6 months?": {
    content:
      "Your MRR has grown steadily from €45,200 to €68,400 over the last 6 months, representing a 51.3% growth rate.",
    type: "chart",
    dataSources: [
      {
        id: "stripe",
        name: "Stripe",
        icon: "/stripe.png",
        tablesUsed: ["subscriptions", "invoices"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get active subscriptions by month",
        description: "Query Stripe for all active subscriptions per month over the last 6 months",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  DATE_TRUNC('month', billing_cycle_anchor) as month,
  subscription_id,
  customer_id,
  plan_amount / 100.0 as monthly_amount,
  status
FROM stripe.subscriptions
WHERE billing_cycle_anchor >= CURRENT_DATE - INTERVAL '6 months'
  AND status IN ('active', 'trialing')
ORDER BY month;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate MRR per month",
        description: "Sum all subscription amounts to get Monthly Recurring Revenue for each month",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  month,
  SUM(monthly_amount) as mrr,
  COUNT(DISTINCT subscription_id) as active_subscriptions,
  COUNT(DISTINCT customer_id) as paying_customers
FROM active_subscriptions
GROUP BY month
ORDER BY month;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate growth metrics",
        description: "Calculate month-over-month growth rate and cumulative growth",
        status: "completed",
        sqlQuery: `SELECT
  month,
  mrr,
  active_subscriptions,
  LAG(mrr) OVER (ORDER BY month) as previous_mrr,
  mrr - LAG(mrr) OVER (ORDER BY month) as mrr_change,
  ((mrr - LAG(mrr) OVER (ORDER BY month)) /
   NULLIF(LAG(mrr) OVER (ORDER BY month), 0) * 100) as growth_rate
FROM monthly_mrr
ORDER BY month;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Format for visualization",
        description: "Format month names and round values for chart display",
        status: "completed",
        sqlQuery: `SELECT
  TO_CHAR(month, 'Month') as month_name,
  ROUND(mrr::NUMERIC, 0) as MRR
FROM mrr_with_growth
ORDER BY month;`,
      },
    ],
    chartData: {
      type: "area",
      title: "MRR Growth Trend - Last 6 Months",
      data: [
        { month: "August", MRR: 45200 },
        { month: "September", MRR: 49800 },
        { month: "October", MRR: 54300 },
        { month: "November", MRR: 59100 },
        { month: "December", MRR: 63700 },
        { month: "January", MRR: 68400 },
      ],
      xKey: "month",
      yKey: "MRR",
      legend: false,
      colors: ["#10b981"],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "schedule", label: "Monthly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "show top customers by revenue": {
    content: "Here are your top 10 customers by total revenue:",
    type: "table",
    dataSources: [
      {
        id: "stripe",
        name: "Stripe",
        icon: "/stripe.png",
        tablesUsed: ["customers", "subscriptions", "invoices"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get all customer subscriptions",
        description: "Query Stripe for all active customer subscriptions with their current MRR",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  c.customer_id,
  c.email,
  c.name as company_name,
  c.created as customer_since,
  s.subscription_id,
  s.plan_amount / 100.0 as monthly_amount,
  s.status
FROM stripe.customers c
JOIN stripe.subscriptions s ON c.customer_id = s.customer_id
WHERE s.status = 'active';`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate current MRR per customer",
        description: "Sum monthly amounts to get each customer's MRR",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  customer_id,
  email,
  company_name,
  customer_since,
  SUM(monthly_amount) as mrr,
  COUNT(subscription_id) as active_subscriptions
FROM customer_subscriptions
GROUP BY customer_id, email, company_name, customer_since;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate lifetime value",
        description: "Calculate total revenue by multiplying MRR by customer tenure in months",
        status: "completed",
        sqlQuery: `SELECT
  customer_id,
  email,
  company_name,
  customer_since,
  mrr,
  active_subscriptions,
  EXTRACT(MONTH FROM AGE(CURRENT_DATE, customer_since)) as months_active,
  mrr * EXTRACT(MONTH FROM AGE(CURRENT_DATE, customer_since)) as total_revenue
FROM customer_mrr;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Rank and format results",
        description: "Sort by total revenue and format for display",
        status: "completed",
        sqlQuery: `SELECT
  company_name,
  email,
  '€' || ROUND(mrr::NUMERIC, 0) as mrr,
  '€' || ROUND(total_revenue::NUMERIC, 0) as total_revenue,
  TO_CHAR(customer_since, 'YYYY-MM-DD') as customer_since
FROM customer_ltv
ORDER BY total_revenue DESC
LIMIT 10;`,
      },
    ],
    tableData: {
      title: "Top Customers by Revenue",
      columns: [
        { key: "company", label: "Company", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "mrr", label: "MRR", sortable: true },
        { key: "totalRevenue", label: "Total Revenue", sortable: true },
        { key: "customerSince", label: "Customer Since", sortable: true },
      ],
      rows: [
        {
          company: "Enterprise Corp",
          email: "billing@enterprise.com",
          mrr: "€4,200",
          totalRevenue: "€50,400",
          customerSince: "2023-02-15",
        },
        {
          company: "TechGiant Inc",
          email: "accounts@techgiant.io",
          mrr: "€3,800",
          totalRevenue: "€45,600",
          customerSince: "2023-03-20",
        },
        {
          company: "DataCorp Systems",
          email: "finance@datacorp.com",
          mrr: "€3,200",
          totalRevenue: "€38,400",
          customerSince: "2023-05-10",
        },
        {
          company: "ScaleUp Ventures",
          email: "accounts@scaleup.vc",
          mrr: "€2,900",
          totalRevenue: "€34,800",
          customerSince: "2023-06-01",
        },
        {
          company: "InnovateLab",
          email: "hello@innovatelab.co",
          mrr: "€2,500",
          totalRevenue: "€30,000",
          customerSince: "2023-07-15",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Customer Details", icon: "Eye", type: "view" },
    ],
  },
  "calculate customer churn rate for this quarter": {
    content:
      "Your churn rate for Q4 2024 is 4.2%. You lost 12 customers out of 286 at the start of the quarter.\n\n**Breakdown:**\n- Customers at start: 286\n- New customers: 34\n- Churned customers: 12\n- Customers at end: 308\n- Churn rate: 4.2%\n\n**Industry benchmark:** For SaaS companies, a healthy churn rate is typically below 5%, so you're performing well.",
    type: "text",
    dataSources: [
      {
        id: "stripe",
        name: "Stripe",
        icon: "/stripe.png",
        tablesUsed: ["subscriptions", "customers"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get customers at quarter start",
        description: "Count active customers at the beginning of Q4 2024 (October 1)",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  COUNT(DISTINCT customer_id) as customers_at_start
FROM stripe.subscriptions
WHERE status = 'active'
  AND created < '2024-10-01'
  AND (canceled_at IS NULL OR canceled_at >= '2024-10-01');`,
      },
      {
        id: "step2",
        step: 2,
        title: "Count new customers this quarter",
        description: "Count customers who started subscriptions during Q4 2024",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  COUNT(DISTINCT customer_id) as new_customers
FROM stripe.subscriptions
WHERE status IN ('active', 'canceled')
  AND created >= '2024-10-01'
  AND created < '2025-01-01';`,
      },
      {
        id: "step3",
        step: 3,
        title: "Count churned customers",
        description: "Count customers who canceled their subscriptions during Q4 2024",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  COUNT(DISTINCT customer_id) as churned_customers
FROM stripe.subscriptions
WHERE status = 'canceled'
  AND canceled_at >= '2024-10-01'
  AND canceled_at < '2025-01-01'
  AND created < '2024-10-01';`,
      },
      {
        id: "step4",
        step: 4,
        title: "Calculate churn rate",
        description: "Calculate churn rate = (churned customers / customers at start) * 100",
        status: "completed",
        sqlQuery: `SELECT
  customers_at_start,
  new_customers,
  churned_customers,
  customers_at_start + new_customers - churned_customers as customers_at_end,
  ROUND((churned_customers::FLOAT / NULLIF(customers_at_start, 0) * 100)::NUMERIC, 1) as churn_rate
FROM (
  SELECT
    (SELECT customers_at_start FROM quarter_start) as customers_at_start,
    (SELECT new_customers FROM new_in_quarter) as new_customers,
    (SELECT churned_customers FROM churned_in_quarter) as churned_customers
);`,
      },
    ],
    actions: [
      { id: "export", label: "Export Analysis", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Churned Customers", icon: "Eye", type: "view" },
      { id: "alert", label: "Alert on High Churn", icon: "Bell", type: "alert" },
    ],
  },
  // Stripe queries
  "show mrr growth trend": {
    content:
      "Your MRR has grown steadily from €45,200 to €68,400 over the last 6 months, representing a 51.3% growth rate. The growth has been consistent with an average monthly increase of €3,867.",
    type: "chart",
    dataSources: [
      {
        id: "stripe",
        name: "Stripe",
        icon: "/stripe.png",
        tablesUsed: ["subscriptions", "invoices"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get active subscriptions by month",
        description: "Query Stripe for all active subscriptions per month over the last 6 months",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  DATE_TRUNC('month', billing_cycle_anchor) as month,
  subscription_id,
  customer_id,
  plan_amount / 100.0 as monthly_amount,
  status
FROM stripe.subscriptions
WHERE billing_cycle_anchor >= CURRENT_DATE - INTERVAL '6 months'
  AND status IN ('active', 'trialing')
ORDER BY month;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate MRR per month",
        description: "Sum all subscription amounts to get Monthly Recurring Revenue for each month",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  month,
  SUM(monthly_amount) as mrr,
  COUNT(DISTINCT subscription_id) as active_subscriptions,
  COUNT(DISTINCT customer_id) as paying_customers
FROM active_subscriptions
GROUP BY month
ORDER BY month;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate growth metrics",
        description: "Calculate month-over-month growth rate and cumulative growth",
        status: "completed",
        sqlQuery: `SELECT
  month,
  mrr,
  active_subscriptions,
  LAG(mrr) OVER (ORDER BY month) as previous_mrr,
  mrr - LAG(mrr) OVER (ORDER BY month) as mrr_change,
  ((mrr - LAG(mrr) OVER (ORDER BY month)) /
   NULLIF(LAG(mrr) OVER (ORDER BY month), 0) * 100) as growth_rate
FROM monthly_mrr
ORDER BY month;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Format for visualization",
        description: "Format month names and round values for chart display",
        status: "completed",
        sqlQuery: `SELECT
  TO_CHAR(month, 'Month') as month_name,
  ROUND(mrr::NUMERIC, 0) as MRR
FROM mrr_with_growth
ORDER BY month;`,
      },
    ],
    chartData: {
      type: "area",
      title: "MRR Growth Trend - Last 6 Months",
      data: [
        { month: "August", MRR: 45200 },
        { month: "September", MRR: 49800 },
        { month: "October", MRR: 54300 },
        { month: "November", MRR: 59100 },
        { month: "December", MRR: 63700 },
        { month: "January", MRR: 68400 },
      ],
      xKey: "month",
      yKey: "MRR",
      legend: false,
      colors: ["#10b981"],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "schedule", label: "Monthly Report", icon: "Calendar", type: "schedule" },
      { id: "view", label: "View Breakdown", icon: "Eye", type: "view" },
    ],
  },
  "top customers by revenue": {
    content:
      "Here are your top 10 customers by total lifetime revenue. Enterprise Corp leads with €50,400 in total revenue over 12 months.",
    type: "table",
    dataSources: [
      {
        id: "stripe",
        name: "Stripe",
        icon: "/stripe.png",
        tablesUsed: ["customers", "subscriptions", "invoices"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get all customer subscriptions",
        description: "Query Stripe for all active customer subscriptions with their current MRR",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  c.customer_id,
  c.email,
  c.name as company_name,
  c.created as customer_since,
  s.subscription_id,
  s.plan_amount / 100.0 as monthly_amount,
  s.status
FROM stripe.customers c
JOIN stripe.subscriptions s ON c.customer_id = s.customer_id
WHERE s.status = 'active';`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate current MRR per customer",
        description: "Sum monthly amounts to get each customer's MRR",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  customer_id,
  email,
  company_name,
  customer_since,
  SUM(monthly_amount) as mrr,
  COUNT(subscription_id) as active_subscriptions
FROM customer_subscriptions
GROUP BY customer_id, email, company_name, customer_since;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate lifetime value",
        description: "Calculate total revenue by multiplying MRR by customer tenure in months",
        status: "completed",
        sqlQuery: `SELECT
  customer_id,
  email,
  company_name,
  customer_since,
  mrr,
  active_subscriptions,
  EXTRACT(MONTH FROM AGE(CURRENT_DATE, customer_since)) as months_active,
  mrr * EXTRACT(MONTH FROM AGE(CURRENT_DATE, customer_since)) as total_revenue
FROM customer_mrr;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Rank and format results",
        description: "Sort by total revenue and format for display",
        status: "completed",
        sqlQuery: `SELECT
  company_name,
  email,
  '€' || ROUND(mrr::NUMERIC, 0) as mrr,
  '€' || ROUND(total_revenue::NUMERIC, 0) as total_revenue,
  TO_CHAR(customer_since, 'YYYY-MM-DD') as customer_since
FROM customer_ltv
ORDER BY total_revenue DESC
LIMIT 10;`,
      },
    ],
    tableData: {
      title: "Top Customers by Revenue",
      columns: [
        { key: "company", label: "Company", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "mrr", label: "MRR", sortable: true },
        { key: "totalRevenue", label: "Total Revenue", sortable: true },
        { key: "customerSince", label: "Customer Since", sortable: true },
      ],
      rows: [
        {
          company: "Enterprise Corp",
          email: "billing@enterprise.com",
          mrr: "€4,200",
          totalRevenue: "€50,400",
          customerSince: "2023-02-15",
        },
        {
          company: "TechGiant Inc",
          email: "accounts@techgiant.io",
          mrr: "€3,800",
          totalRevenue: "€45,600",
          customerSince: "2023-03-20",
        },
        {
          company: "DataCorp Systems",
          email: "finance@datacorp.com",
          mrr: "€3,200",
          totalRevenue: "€38,400",
          customerSince: "2023-05-10",
        },
        {
          company: "ScaleUp Ventures",
          email: "accounts@scaleup.vc",
          mrr: "€2,900",
          totalRevenue: "€34,800",
          customerSince: "2023-06-01",
        },
        {
          company: "InnovateLab",
          email: "hello@innovatelab.co",
          mrr: "€2,500",
          totalRevenue: "€30,000",
          customerSince: "2023-07-15",
        },
        {
          company: "CloudBridge Ltd",
          email: "team@cloudbridge.com",
          mrr: "€2,300",
          totalRevenue: "€27,600",
          customerSince: "2023-08-01",
        },
        {
          company: "BuildFast Co",
          email: "info@buildfast.com",
          mrr: "€2,100",
          totalRevenue: "€25,200",
          customerSince: "2023-09-10",
        },
        {
          company: "NextGen Solutions",
          email: "billing@nextgen.io",
          mrr: "€1,900",
          totalRevenue: "€22,800",
          customerSince: "2023-10-05",
        },
        {
          company: "Acme Corp",
          email: "billing@acme.com",
          mrr: "€1,800",
          totalRevenue: "€21,600",
          customerSince: "2023-11-15",
        },
        {
          company: "TechStart Inc",
          email: "admin@techstart.io",
          mrr: "€1,650",
          totalRevenue: "€19,800",
          customerSince: "2023-12-01",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Customer Details", icon: "Eye", type: "view" },
      { id: "alert", label: "Monitor Top Customers", icon: "Bell", type: "alert" },
    ],
  },
  "calculate churn rate": {
    content:
      "Your churn rate for Q4 2024 is 4.2%. You lost 12 customers out of 286 at the start of the quarter.\n\n**Breakdown:**\n- Customers at start: 286\n- New customers: 34\n- Churned customers: 12\n- Customers at end: 308\n- Churn rate: 4.2%\n- Revenue churn: 3.8%\n\n**Industry benchmark:** For SaaS companies, a healthy churn rate is typically below 5%, so you're performing well. Your revenue churn is lower than customer churn, indicating that smaller accounts are churning more than larger ones.",
    type: "text",
    dataSources: [
      {
        id: "stripe",
        name: "Stripe",
        icon: "/stripe.png",
        tablesUsed: ["subscriptions", "customers"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get customers at quarter start",
        description: "Count active customers at the beginning of Q4 2024 (October 1)",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  COUNT(DISTINCT customer_id) as customers_at_start,
  SUM(plan_amount / 100.0) as mrr_at_start
FROM stripe.subscriptions
WHERE status = 'active'
  AND created < '2024-10-01'
  AND (canceled_at IS NULL OR canceled_at >= '2024-10-01');`,
      },
      {
        id: "step2",
        step: 2,
        title: "Count churned customers",
        description: "Count customers who canceled their subscriptions during Q4 2024",
        status: "completed",
        dataSource: "Stripe",
        sqlQuery: `SELECT
  COUNT(DISTINCT customer_id) as churned_customers,
  SUM(plan_amount / 100.0) as churned_mrr
FROM stripe.subscriptions
WHERE status = 'canceled'
  AND canceled_at >= '2024-10-01'
  AND canceled_at < '2025-01-01'
  AND created < '2024-10-01';`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate churn rates",
        description: "Calculate customer churn rate and revenue churn rate",
        status: "completed",
        sqlQuery: `SELECT
  customers_at_start,
  churned_customers,
  ROUND((churned_customers::FLOAT / NULLIF(customers_at_start, 0) * 100)::NUMERIC, 1) as customer_churn_rate,
  ROUND((churned_mrr::FLOAT / NULLIF(mrr_at_start, 0) * 100)::NUMERIC, 1) as revenue_churn_rate
FROM (
  SELECT
    (SELECT customers_at_start FROM quarter_start) as customers_at_start,
    (SELECT mrr_at_start FROM quarter_start) as mrr_at_start,
    (SELECT churned_customers FROM churned_in_quarter) as churned_customers,
    (SELECT churned_mrr FROM churned_in_quarter) as churned_mrr
);`,
      },
    ],
    actions: [
      { id: "export", label: "Export Analysis", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Churned Customers", icon: "Eye", type: "view" },
      { id: "alert", label: "Alert on High Churn", icon: "Bell", type: "alert" },
    ],
  },
  // HubSpot queries
  "show leads from last month": {
    content:
      "Found 247 new leads from last month across all acquisition channels. Organic search and paid search were the top sources.",
    type: "table",
    dataSources: [
      {
        id: "hubspot",
        name: "HubSpot",
        icon: "/hubspot.jpeg",
        tablesUsed: ["contacts", "campaigns"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get contacts created last month",
        description: "Query HubSpot for all contacts created in the previous month",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  contact_id,
  firstname,
  lastname,
  email,
  company,
  lifecycle_stage,
  first_touch_campaign_name,
  utm_source,
  utm_medium,
  created_at
FROM hubspot.contacts
WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
  AND created_at < DATE_TRUNC('month', CURRENT_DATE)
  AND lifecycle_stage IN ('lead', 'marketing_qualified_lead')
ORDER BY created_at DESC;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Group by acquisition source",
        description: "Aggregate leads by their acquisition channel and source",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  COALESCE(utm_source, 'Direct') as source,
  COALESCE(utm_medium, 'None') as medium,
  COUNT(*) as lead_count,
  COUNT(CASE WHEN lifecycle_stage = 'marketing_qualified_lead' THEN 1 END) as mql_count
FROM last_month_leads
GROUP BY utm_source, utm_medium
ORDER BY lead_count DESC;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Get top individual leads",
        description: "Select top leads with company and contact information",
        status: "completed",
        sqlQuery: `SELECT
  firstname || ' ' || lastname as name,
  email,
  company,
  lifecycle_stage,
  first_touch_campaign_name as source_campaign,
  TO_CHAR(created_at, 'YYYY-MM-DD') as created_date
FROM last_month_leads
ORDER BY created_at DESC
LIMIT 50;`,
      },
    ],
    tableData: {
      title: "New Leads from Last Month",
      columns: [
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "company", label: "Company", sortable: true },
        { key: "stage", label: "Stage", sortable: true },
        { key: "sourceCampaign", label: "Source Campaign", sortable: true },
        { key: "createdDate", label: "Created Date", sortable: true },
      ],
      rows: [
        {
          name: "Sarah Mitchell",
          email: "sarah.mitchell@techcorp.io",
          company: "TechCorp Solutions",
          stage: "MQL",
          sourceCampaign: "Google - Brand Search",
          createdDate: "2024-12-28",
        },
        {
          name: "James Rodriguez",
          email: "j.rodriguez@innovate.com",
          company: "Innovate Labs",
          stage: "Lead",
          sourceCampaign: "Meta - Lead Gen Software",
          createdDate: "2024-12-27",
        },
        {
          name: "Emily Chen",
          email: "emily.chen@dataflow.co",
          company: "DataFlow Inc",
          stage: "MQL",
          sourceCampaign: "Content Marketing - Blog",
          createdDate: "2024-12-26",
        },
        {
          name: "Michael Brown",
          email: "m.brown@scaleup.io",
          company: "ScaleUp Ventures",
          stage: "Lead",
          sourceCampaign: "Google - Competitor Targeting",
          createdDate: "2024-12-25",
        },
        {
          name: "Lisa Wang",
          email: "lisa.w@cloudbase.com",
          company: "CloudBase Systems",
          stage: "MQL",
          sourceCampaign: "Organic Search",
          createdDate: "2024-12-24",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Lead Details", icon: "Eye", type: "view" },
      { id: "schedule", label: "Monthly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "deals by stage breakdown": {
    content:
      "Here's the breakdown of your current deal pipeline by stage. You have €1.2M in total pipeline value across 89 deals.",
    type: "chart",
    dataSources: [
      {
        id: "hubspot",
        name: "HubSpot",
        icon: "/hubspot.jpeg",
        tablesUsed: ["deals"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get all active deals",
        description: "Query HubSpot for all deals not in closed_lost stage",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  deal_id,
  deal_name,
  amount,
  stage,
  close_date,
  probability
FROM hubspot.deals
WHERE stage NOT IN ('closed_lost')
  AND amount > 0;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Aggregate by stage",
        description: "Group deals by pipeline stage and sum values",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  stage,
  COUNT(*) as deal_count,
  SUM(amount) as total_value,
  AVG(amount) as avg_deal_size,
  AVG(probability) as avg_win_probability
FROM active_deals
GROUP BY stage
ORDER BY
  CASE stage
    WHEN 'appointment_scheduled' THEN 1
    WHEN 'qualified_to_buy' THEN 2
    WHEN 'presentation_scheduled' THEN 3
    WHEN 'decision_maker_bought_in' THEN 4
    WHEN 'contract_sent' THEN 5
    WHEN 'closed_won' THEN 6
  END;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Format for visualization",
        description: "Calculate percentages and format for pie chart display",
        status: "completed",
        sqlQuery: `SELECT
  CASE stage
    WHEN 'appointment_scheduled' THEN 'Appointment Scheduled'
    WHEN 'qualified_to_buy' THEN 'Qualified to Buy'
    WHEN 'presentation_scheduled' THEN 'Presentation Scheduled'
    WHEN 'decision_maker_bought_in' THEN 'Decision Maker Bought In'
    WHEN 'contract_sent' THEN 'Contract Sent'
    WHEN 'closed_won' THEN 'Closed Won'
  END as name,
  total_value as value,
  ROUND((total_value::FLOAT / SUM(total_value) OVER () * 100)::NUMERIC, 1) as percentage
FROM stage_aggregates
ORDER BY value DESC;`,
      },
    ],
    chartData: {
      type: "pie",
      title: "Deal Pipeline by Stage",
      data: [
        { name: "Qualified to Buy", value: 385000, percentage: 32.1 },
        { name: "Presentation Scheduled", value: 298000, percentage: 24.8 },
        { name: "Contract Sent", value: 245000, percentage: 20.4 },
        { name: "Decision Maker Bought In", value: 156000, percentage: 13.0 },
        { name: "Appointment Scheduled", value: 89000, percentage: 7.4 },
        { name: "Closed Won", value: 27000, percentage: 2.3 },
      ],
      colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Deal Details", icon: "Eye", type: "view" },
      { id: "schedule", label: "Weekly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "meeting conversion rates": {
    content:
      "Your meeting conversion metrics show strong performance:\n\n**Meeting Funnel:**\n- Meetings Scheduled: 156\n- Meetings Held: 142 (91.0% show rate)\n- Opportunities Created: 89 (62.7% conversion)\n- Deals Closed: 34 (38.2% close rate)\n\n**Overall Conversion:** From scheduled meeting to closed deal: 21.8%\n\n**Key Insight:** Your meeting show rate is excellent at 91%, but there's opportunity to improve the meeting-to-opportunity conversion. Consider implementing a more structured qualification process during meetings.",
    type: "text",
    dataSources: [
      {
        id: "hubspot",
        name: "HubSpot",
        icon: "/hubspot.jpeg",
        tablesUsed: ["meetings", "deals", "contacts"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get all scheduled meetings",
        description: "Query meetings created in the last 90 days",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  meeting_id,
  contact_id,
  status,
  created_at,
  scheduled_time
FROM hubspot.meetings
WHERE created_at >= CURRENT_DATE - INTERVAL '90 days';`,
      },
      {
        id: "step2",
        step: 2,
        title: "Count meetings by status",
        description: "Aggregate meetings by their completion status",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  COUNT(*) as total_scheduled,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as meetings_held,
  COUNT(CASE WHEN status = 'no_show' THEN 1 END) as no_shows
FROM recent_meetings;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Match to opportunities created",
        description: "Join with deals to see how many led to opportunities",
        status: "completed",
        dataSource: "HubSpot",
        sqlQuery: `SELECT
  COUNT(DISTINCT d.deal_id) as opportunities_created,
  COUNT(DISTINCT CASE WHEN d.stage = 'closed_won' THEN d.deal_id END) as deals_closed
FROM hubspot.deals d
JOIN recent_meetings m ON d.contact_id = m.contact_id
WHERE d.created_at >= m.scheduled_time
  AND d.created_at <= m.scheduled_time + INTERVAL '7 days';`,
      },
      {
        id: "step4",
        step: 4,
        title: "Calculate conversion rates",
        description: "Calculate funnel conversion rates at each stage",
        status: "completed",
        sqlQuery: `SELECT
  total_scheduled,
  meetings_held,
  opportunities_created,
  deals_closed,
  ROUND((meetings_held::FLOAT / NULLIF(total_scheduled, 0) * 100)::NUMERIC, 1) as show_rate,
  ROUND((opportunities_created::FLOAT / NULLIF(meetings_held, 0) * 100)::NUMERIC, 1) as meeting_to_opp_rate,
  ROUND((deals_closed::FLOAT / NULLIF(opportunities_created, 0) * 100)::NUMERIC, 1) as close_rate,
  ROUND((deals_closed::FLOAT / NULLIF(total_scheduled, 0) * 100)::NUMERIC, 1) as overall_conversion
FROM meeting_metrics;`,
      },
    ],
    actions: [
      { id: "export", label: "Export Analysis", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Meeting Details", icon: "Eye", type: "view" },
      { id: "schedule", label: "Monthly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  // Meta Ads queries
  "campaign performance last 30 days": {
    content:
      "Here's the performance breakdown for your Meta Ads campaigns over the last 30 days. Total spend: €18,450 with 892 conversions.",
    type: "table",
    dataSources: [
      {
        id: "meta-ads",
        name: "Meta Ads",
        icon: "/meta.png",
        tablesUsed: ["campaigns", "insights"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get campaign insights",
        description: "Query Meta Ads for campaign performance metrics from last 30 days",
        status: "completed",
        dataSource: "Meta Ads",
        sqlQuery: `SELECT
  c.campaign_id,
  c.campaign_name,
  c.objective,
  SUM(i.spend) as total_spend,
  SUM(i.impressions) as impressions,
  SUM(i.clicks) as clicks,
  SUM(i.conversions) as conversions
FROM meta_ads.campaigns c
JOIN meta_ads.insights i ON c.campaign_id = i.campaign_id
WHERE i.date >= CURRENT_DATE - INTERVAL '30 days'
  AND c.status = 'ACTIVE'
GROUP BY c.campaign_id, c.campaign_name, c.objective;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate performance metrics",
        description: "Calculate CTR, CPC, and conversion rate for each campaign",
        status: "completed",
        dataSource: "Meta Ads",
        sqlQuery: `SELECT
  campaign_name,
  objective,
  total_spend,
  impressions,
  clicks,
  conversions,
  (clicks::FLOAT / NULLIF(impressions, 0) * 100) as ctr,
  (total_spend / NULLIF(clicks, 0)) as cpc,
  (total_spend / NULLIF(conversions, 0)) as cost_per_conversion,
  (conversions::FLOAT / NULLIF(clicks, 0) * 100) as conversion_rate
FROM campaign_insights;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Format and rank results",
        description: "Format metrics and sort by spend to show top campaigns",
        status: "completed",
        sqlQuery: `SELECT
  campaign_name,
  objective,
  '€' || ROUND(total_spend::NUMERIC, 0) as spend,
  impressions,
  clicks,
  conversions,
  ROUND(ctr::NUMERIC, 2) || '%' as ctr,
  '€' || ROUND(cpc::NUMERIC, 2) as cpc,
  '€' || ROUND(cost_per_conversion::NUMERIC, 2) as cpa,
  ROUND(conversion_rate::NUMERIC, 2) || '%' as conv_rate
FROM campaign_metrics
ORDER BY total_spend DESC;`,
      },
    ],
    tableData: {
      title: "Meta Ads Campaign Performance - Last 30 Days",
      columns: [
        { key: "campaign", label: "Campaign", sortable: true },
        { key: "objective", label: "Objective", sortable: true },
        { key: "spend", label: "Spend", sortable: true },
        { key: "impressions", label: "Impressions", sortable: true },
        { key: "clicks", label: "Clicks", sortable: true },
        { key: "conversions", label: "Conversions", sortable: true },
        { key: "ctr", label: "CTR", sortable: true },
        { key: "cpa", label: "CPA", sortable: true },
      ],
      rows: [
        {
          campaign: "Lead Gen - Software Solutions",
          objective: "Lead Generation",
          spend: "€6,240",
          impressions: "285,400",
          clicks: "4,280",
          conversions: 312,
          ctr: "1.50%",
          cpa: "€20.00",
        },
        {
          campaign: "Brand Awareness - Tech",
          objective: "Brand Awareness",
          spend: "€4,890",
          impressions: "892,300",
          clicks: "8,920",
          conversions: 178,
          ctr: "1.00%",
          cpa: "€27.47",
        },
        {
          campaign: "Retargeting - Website Visitors",
          objective: "Conversions",
          spend: "€3,450",
          impressions: "156,200",
          clicks: "3,124",
          conversions: 245,
          ctr: "2.00%",
          cpa: "€14.08",
        },
        {
          campaign: "Lead Gen - Enterprise",
          objective: "Lead Generation",
          spend: "€2,180",
          impressions: "98,500",
          clicks: "1,970",
          conversions: 89,
          ctr: "2.00%",
          cpa: "€24.49",
        },
        {
          campaign: "Traffic - Blog Content",
          objective: "Traffic",
          spend: "€1,690",
          impressions: "312,800",
          clicks: "6,256",
          conversions: 68,
          ctr: "2.00%",
          cpa: "€24.85",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Campaign Details", icon: "Eye", type: "view" },
      { id: "schedule", label: "Weekly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "ad spend by objective": {
    content:
      "Here's how your Meta Ads budget is allocated across campaign objectives. Lead Generation accounts for 55% of total spend.",
    type: "chart",
    dataSources: [
      {
        id: "meta-ads",
        name: "Meta Ads",
        icon: "/meta.png",
        tablesUsed: ["campaigns", "insights"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get spend by objective",
        description: "Query Meta Ads to aggregate spend by campaign objective",
        status: "completed",
        dataSource: "Meta Ads",
        sqlQuery: `SELECT
  c.objective,
  SUM(i.spend) as total_spend,
  COUNT(DISTINCT c.campaign_id) as campaign_count
FROM meta_ads.campaigns c
JOIN meta_ads.insights i ON c.campaign_id = i.campaign_id
WHERE i.date >= CURRENT_DATE - INTERVAL '30 days'
  AND c.status = 'ACTIVE'
GROUP BY c.objective;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate percentages",
        description: "Calculate percentage of total budget for each objective",
        status: "completed",
        dataSource: "Meta Ads",
        sqlQuery: `SELECT
  objective,
  total_spend,
  campaign_count,
  ROUND((total_spend / SUM(total_spend) OVER () * 100)::NUMERIC, 1) as percentage
FROM objective_spend
ORDER BY total_spend DESC;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Format for visualization",
        description: "Format objective names and prepare data for pie chart",
        status: "completed",
        sqlQuery: `SELECT
  CASE objective
    WHEN 'LEAD_GENERATION' THEN 'Lead Generation'
    WHEN 'BRAND_AWARENESS' THEN 'Brand Awareness'
    WHEN 'CONVERSIONS' THEN 'Conversions'
    WHEN 'TRAFFIC' THEN 'Traffic'
    WHEN 'ENGAGEMENT' THEN 'Engagement'
  END as name,
  ROUND(total_spend::NUMERIC, 0) as value,
  percentage
FROM objective_percentages
ORDER BY value DESC;`,
      },
    ],
    chartData: {
      type: "pie",
      title: "Meta Ads Spend by Objective",
      data: [
        { name: "Lead Generation", value: 10140, percentage: 55.0 },
        { name: "Brand Awareness", value: 4890, percentage: 26.5 },
        { name: "Conversions", value: 2180, percentage: 11.8 },
        { name: "Traffic", value: 1240, percentage: 6.7 },
      ],
      colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Campaign Details", icon: "Eye", type: "view" },
      { id: "schedule", label: "Monthly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "top performing ad sets": {
    content:
      "Here are your top 10 performing ad sets by conversion rate over the last 30 days. Retargeting ad sets are showing the highest performance.",
    type: "table",
    dataSources: [
      {
        id: "meta-ads",
        name: "Meta Ads",
        icon: "/meta.png",
        tablesUsed: ["ad_sets", "insights"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get ad set metrics",
        description: "Query Meta Ads for ad set performance from last 30 days",
        status: "completed",
        dataSource: "Meta Ads",
        sqlQuery: `SELECT
  a.ad_set_id,
  a.ad_set_name,
  a.targeting_type,
  SUM(i.spend) as total_spend,
  SUM(i.impressions) as impressions,
  SUM(i.clicks) as clicks,
  SUM(i.conversions) as conversions,
  SUM(i.purchase_value) as revenue
FROM meta_ads.ad_sets a
JOIN meta_ads.insights i ON a.ad_set_id = i.ad_set_id
WHERE i.date >= CURRENT_DATE - INTERVAL '30 days'
  AND a.status = 'ACTIVE'
GROUP BY a.ad_set_id, a.ad_set_name, a.targeting_type;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate performance metrics",
        description: "Calculate CPA, ROAS, and conversion rate for each ad set",
        status: "completed",
        dataSource: "Meta Ads",
        sqlQuery: `SELECT
  ad_set_name,
  targeting_type,
  total_spend,
  clicks,
  conversions,
  revenue,
  (total_spend / NULLIF(conversions, 0)) as cpa,
  (revenue / NULLIF(total_spend, 0)) as roas,
  (conversions::FLOAT / NULLIF(clicks, 0) * 100) as conversion_rate
FROM ad_set_metrics
WHERE conversions > 0;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Rank and format results",
        description: "Sort by conversion rate and format for display",
        status: "completed",
        sqlQuery: `SELECT
  ad_set_name,
  targeting_type,
  '€' || ROUND(total_spend::NUMERIC, 0) as spend,
  clicks,
  conversions,
  '€' || ROUND(cpa::NUMERIC, 2) as cpa,
  ROUND(roas::NUMERIC, 2) || 'x' as roas,
  ROUND(conversion_rate::NUMERIC, 2) || '%' as conv_rate
FROM ad_set_performance
ORDER BY conversion_rate DESC
LIMIT 10;`,
      },
    ],
    tableData: {
      title: "Top Performing Ad Sets - Last 30 Days",
      columns: [
        { key: "adSet", label: "Ad Set", sortable: true },
        { key: "targeting", label: "Targeting Type", sortable: true },
        { key: "spend", label: "Spend", sortable: true },
        { key: "clicks", label: "Clicks", sortable: true },
        { key: "conversions", label: "Conversions", sortable: true },
        { key: "cpa", label: "CPA", sortable: true },
        { key: "roas", label: "ROAS", sortable: true },
        { key: "convRate", label: "Conv. Rate", sortable: true },
      ],
      rows: [
        {
          adSet: "Retargeting - Cart Abandoners",
          targeting: "Retargeting",
          spend: "€1,240",
          clicks: 892,
          conversions: 156,
          cpa: "€7.95",
          roas: "18.2x",
          convRate: "17.49%",
        },
        {
          adSet: "Lookalike - High Value Customers",
          targeting: "Lookalike",
          spend: "€2,180",
          clicks: 1456,
          conversions: 189,
          cpa: "€11.53",
          roas: "15.8x",
          convRate: "12.98%",
        },
        {
          adSet: "Retargeting - Product Page Viewers",
          targeting: "Retargeting",
          spend: "€980",
          clicks: 678,
          conversions: 78,
          cpa: "€12.56",
          roas: "14.1x",
          convRate: "11.50%",
        },
        {
          adSet: "Interest - Software Developers",
          targeting: "Interest",
          spend: "€3,450",
          clicks: 2890,
          conversions: 298,
          cpa: "€11.58",
          roas: "12.3x",
          convRate: "10.31%",
        },
        {
          adSet: "Lookalike - Trial Users",
          targeting: "Lookalike",
          spend: "€1,890",
          clicks: 1234,
          conversions: 118,
          cpa: "€16.02",
          roas: "11.2x",
          convRate: "9.56%",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Ad Set Details", icon: "Eye", type: "view" },
      { id: "schedule", label: "Weekly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  // Google Ads queries
  "search campaign roi analysis": {
    content:
      "Analysis of your Google Search campaigns shows strong ROI across brand and non-brand campaigns. Total spend: €12,450 generating €156,800 in attributed revenue (12.6x ROAS).",
    type: "table",
    dataSources: [
      {
        id: "google-ads",
        name: "Google Ads",
        icon: "/google_ads.png",
        tablesUsed: ["campaigns", "stats"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get search campaign performance",
        description: "Query Google Ads for search campaigns (excluding display/shopping)",
        status: "completed",
        dataSource: "Google Ads",
        sqlQuery: `SELECT
  c.campaign_id,
  c.campaign_name,
  c.campaign_type,
  SUM(s.cost) as total_cost,
  SUM(s.clicks) as clicks,
  SUM(s.conversions) as conversions,
  SUM(s.conversion_value) as revenue
FROM google_ads.campaigns c
JOIN google_ads.stats s ON c.campaign_id = s.campaign_id
WHERE c.campaign_type = 'SEARCH'
  AND s.date >= CURRENT_DATE - INTERVAL '30 days'
  AND c.status = 'ENABLED'
GROUP BY c.campaign_id, c.campaign_name, c.campaign_type;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate ROI metrics",
        description: "Calculate CPA, ROAS, and ROI for each campaign",
        status: "completed",
        dataSource: "Google Ads",
        sqlQuery: `SELECT
  campaign_name,
  total_cost,
  clicks,
  conversions,
  revenue,
  (total_cost / NULLIF(conversions, 0)) as cpa,
  (revenue / NULLIF(total_cost, 0)) as roas,
  ((revenue - total_cost) / NULLIF(total_cost, 0) * 100) as roi_percentage,
  (revenue - total_cost) as profit
FROM search_campaign_metrics
WHERE conversions > 0;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Categorize campaigns",
        description: "Label campaigns as Brand, Non-Brand, or Competitor",
        status: "completed",
        sqlQuery: `SELECT
  campaign_name,
  CASE
    WHEN campaign_name ILIKE '%brand%' THEN 'Brand'
    WHEN campaign_name ILIKE '%competitor%' THEN 'Competitor'
    ELSE 'Non-Brand'
  END as campaign_category,
  total_cost,
  conversions,
  revenue,
  cpa,
  roas,
  roi_percentage,
  profit
FROM campaign_roi;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Format and rank results",
        description: "Format metrics and sort by ROAS",
        status: "completed",
        sqlQuery: `SELECT
  campaign_name,
  campaign_category,
  '€' || ROUND(total_cost::NUMERIC, 0) as cost,
  conversions,
  '€' || ROUND(revenue::NUMERIC, 0) as revenue,
  '€' || ROUND(cpa::NUMERIC, 2) as cpa,
  ROUND(roas::NUMERIC, 1) || 'x' as roas,
  ROUND(roi_percentage::NUMERIC, 0) || '%' as roi
FROM categorized_campaigns
ORDER BY roas DESC;`,
      },
    ],
    tableData: {
      title: "Google Search Campaign ROI Analysis",
      columns: [
        { key: "campaign", label: "Campaign", sortable: true },
        { key: "category", label: "Category", sortable: true },
        { key: "cost", label: "Cost", sortable: true },
        { key: "conversions", label: "Conversions", sortable: true },
        { key: "revenue", label: "Revenue", sortable: true },
        { key: "cpa", label: "CPA", sortable: true },
        { key: "roas", label: "ROAS", sortable: true },
        { key: "roi", label: "ROI", sortable: true },
      ],
      rows: [
        {
          campaign: "Brand Protection - Exact Match",
          category: "Brand",
          cost: "€1,240",
          conversions: 78,
          revenue: "€42,680",
          cpa: "€15.90",
          roas: "34.4x",
          roi: "3342%",
        },
        {
          campaign: "Brand - Software Solutions",
          category: "Brand",
          cost: "€2,890",
          conversions: 156,
          revenue: "€68,450",
          cpa: "€18.52",
          roas: "23.7x",
          roi: "2268%",
        },
        {
          campaign: "Non-Brand - Problem Keywords",
          category: "Non-Brand",
          cost: "€4,560",
          conversions: 189,
          revenue: "€38,240",
          cpa: "€24.13",
          roas: "8.4x",
          roi: "739%",
        },
        {
          campaign: "Competitor - Alternative Search",
          category: "Competitor",
          cost: "€2,180",
          conversions: 67,
          revenue: "€12,890",
          cpa: "€32.54",
          roas: "5.9x",
          roi: "491%",
        },
        {
          campaign: "Non-Brand - Solution Keywords",
          category: "Non-Brand",
          cost: "€1,580",
          conversions: 42,
          revenue: "€6,540",
          cpa: "€37.62",
          roas: "4.1x",
          roi: "314%",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Campaign Details", icon: "Eye", type: "view" },
      { id: "schedule", label: "Weekly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "keyword performance breakdown": {
    content:
      "Here's the breakdown of your top performing keywords. 234 keywords are currently active with spend > €50 in the last 30 days.",
    type: "table",
    dataSources: [
      {
        id: "google-ads",
        name: "Google Ads",
        icon: "/google_ads.png",
        tablesUsed: ["keywords", "keyword_stats"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get keyword performance data",
        description: "Query Google Ads for keyword-level metrics from last 30 days",
        status: "completed",
        dataSource: "Google Ads",
        sqlQuery: `SELECT
  k.keyword_id,
  k.keyword_text,
  k.match_type,
  k.ad_group_name,
  k.campaign_name,
  SUM(ks.cost) as total_cost,
  SUM(ks.impressions) as impressions,
  SUM(ks.clicks) as clicks,
  SUM(ks.conversions) as conversions,
  SUM(ks.conversion_value) as revenue
FROM google_ads.keywords k
JOIN google_ads.keyword_stats ks ON k.keyword_id = ks.keyword_id
WHERE ks.date >= CURRENT_DATE - INTERVAL '30 days'
  AND k.status = 'ENABLED'
GROUP BY k.keyword_id, k.keyword_text, k.match_type, k.ad_group_name, k.campaign_name
HAVING SUM(ks.cost) > 50;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate keyword metrics",
        description: "Calculate CTR, CPC, CPA, and quality metrics",
        status: "completed",
        dataSource: "Google Ads",
        sqlQuery: `SELECT
  keyword_text,
  match_type,
  campaign_name,
  total_cost,
  impressions,
  clicks,
  conversions,
  revenue,
  (clicks::FLOAT / NULLIF(impressions, 0) * 100) as ctr,
  (total_cost / NULLIF(clicks, 0)) as cpc,
  (total_cost / NULLIF(conversions, 0)) as cpa,
  (revenue / NULLIF(total_cost, 0)) as roas,
  (conversions::FLOAT / NULLIF(clicks, 0) * 100) as conversion_rate
FROM keyword_metrics;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Rank by performance",
        description: "Sort keywords by ROAS and filter for top performers",
        status: "completed",
        sqlQuery: `SELECT
  keyword_text,
  CASE match_type
    WHEN 'EXACT' THEN 'Exact'
    WHEN 'PHRASE' THEN 'Phrase'
    WHEN 'BROAD' THEN 'Broad'
  END as match_type,
  campaign_name,
  '€' || ROUND(total_cost::NUMERIC, 0) as cost,
  clicks,
  conversions,
  '€' || ROUND(cpc::NUMERIC, 2) as cpc,
  '€' || ROUND(cpa::NUMERIC, 2) as cpa,
  ROUND(roas::NUMERIC, 1) || 'x' as roas,
  ROUND(conversion_rate::NUMERIC, 2) || '%' as conv_rate
FROM keyword_performance
WHERE conversions > 0
ORDER BY roas DESC
LIMIT 15;`,
      },
    ],
    tableData: {
      title: "Top Performing Keywords - Last 30 Days",
      columns: [
        { key: "keyword", label: "Keyword", sortable: true },
        { key: "matchType", label: "Match Type", sortable: true },
        { key: "campaign", label: "Campaign", sortable: true },
        { key: "cost", label: "Cost", sortable: true },
        { key: "clicks", label: "Clicks", sortable: true },
        { key: "conversions", label: "Conv.", sortable: true },
        { key: "cpa", label: "CPA", sortable: true },
        { key: "roas", label: "ROAS", sortable: true },
      ],
      rows: [
        {
          keyword: "numize",
          matchType: "Exact",
          campaign: "Brand Protection",
          cost: "€680",
          clicks: 245,
          conversions: 42,
          cpa: "€16.19",
          roas: "38.2x",
        },
        {
          keyword: "data analytics platform",
          matchType: "Phrase",
          campaign: "Non-Brand - Solution",
          cost: "€1,240",
          clicks: 389,
          conversions: 56,
          cpa: "€22.14",
          roas: "24.8x",
        },
        {
          keyword: "business intelligence tool",
          matchType: "Phrase",
          campaign: "Non-Brand - Solution",
          cost: "€890",
          clicks: 298,
          conversions: 34,
          cpa: "€26.18",
          roas: "18.4x",
        },
        {
          keyword: "ai data analysis",
          matchType: "Exact",
          campaign: "Non-Brand - Problem",
          cost: "€1,560",
          clicks: 445,
          conversions: 67,
          cpa: "€23.28",
          roas: "16.2x",
        },
        {
          keyword: "alternative to tableau",
          matchType: "Phrase",
          campaign: "Competitor",
          cost: "€780",
          clicks: 234,
          conversions: 28,
          cpa: "€27.86",
          roas: "12.8x",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Keyword Details", icon: "Eye", type: "view" },
      { id: "schedule", label: "Weekly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "cost per conversion trends": {
    content:
      "Your cost per conversion has decreased from €28.50 to €22.30 over the last 30 days, representing a 21.8% improvement in efficiency.",
    type: "chart",
    dataSources: [
      {
        id: "google-ads",
        name: "Google Ads",
        icon: "/google_ads.png",
        tablesUsed: ["campaigns", "stats"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get daily campaign metrics",
        description: "Query Google Ads for daily cost and conversion data from last 30 days",
        status: "completed",
        dataSource: "Google Ads",
        sqlQuery: `SELECT
  s.date,
  SUM(s.cost) as total_cost,
  SUM(s.conversions) as total_conversions
FROM google_ads.stats s
JOIN google_ads.campaigns c ON s.campaign_id = c.campaign_id
WHERE s.date >= CURRENT_DATE - INTERVAL '30 days'
  AND c.status = 'ENABLED'
GROUP BY s.date
ORDER BY s.date;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Calculate daily CPA",
        description: "Calculate cost per conversion for each day",
        status: "completed",
        dataSource: "Google Ads",
        sqlQuery: `SELECT
  date,
  total_cost,
  total_conversions,
  (total_cost / NULLIF(total_conversions, 0)) as cpa
FROM daily_metrics
WHERE total_conversions > 0
ORDER BY date;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Apply smoothing",
        description: "Calculate 7-day moving average to smooth out daily fluctuations",
        status: "completed",
        sqlQuery: `SELECT
  date,
  cpa,
  AVG(cpa) OVER (
    ORDER BY date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as cpa_7day_avg
FROM daily_cpa
ORDER BY date;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Format for visualization",
        description: "Format dates and round values for chart display",
        status: "completed",
        sqlQuery: `SELECT
  TO_CHAR(date, 'Mon DD') as date_label,
  ROUND(cpa_7day_avg::NUMERIC, 2) as CPA
FROM smoothed_cpa
ORDER BY date;`,
      },
    ],
    chartData: {
      type: "line",
      title: "Cost Per Conversion Trend (7-day moving average)",
      data: [
        { date: "Dec 07", CPA: 28.5 },
        { date: "Dec 10", CPA: 27.8 },
        { date: "Dec 13", CPA: 26.9 },
        { date: "Dec 16", CPA: 26.2 },
        { date: "Dec 19", CPA: 25.1 },
        { date: "Dec 22", CPA: 24.3 },
        { date: "Dec 25", CPA: 23.6 },
        { date: "Dec 28", CPA: 23.1 },
        { date: "Dec 31", CPA: 22.8 },
        { date: "Jan 03", CPA: 22.3 },
      ],
      xKey: "date",
      yKey: "CPA",
      legend: false,
      colors: ["#3b82f6"],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Campaign Breakdown", icon: "Eye", type: "view" },
      { id: "schedule", label: "Weekly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  // Google Analytics queries
  "traffic sources breakdown": {
    content:
      "Here's the breakdown of your website traffic by source over the last 30 days. Total sessions: 45,680. Organic search is your largest traffic source at 42.3%.",
    type: "chart",
    dataSources: [
      {
        id: "google-analytics",
        name: "Google Analytics",
        icon: "/google-analytics.png",
        tablesUsed: ["sessions", "traffic_sources"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get sessions by source",
        description: "Query Google Analytics for session counts grouped by traffic source",
        status: "completed",
        dataSource: "Google Analytics",
        sqlQuery: `SELECT
  source_medium,
  COUNT(DISTINCT session_id) as sessions,
  COUNT(DISTINCT user_id) as users,
  SUM(pageviews) as pageviews,
  AVG(session_duration) as avg_duration
FROM ga4.sessions
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY source_medium;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Categorize traffic sources",
        description: "Group sources into standard categories (Organic, Paid, Direct, Referral, Social)",
        status: "completed",
        dataSource: "Google Analytics",
        sqlQuery: `SELECT
  CASE
    WHEN source_medium ILIKE '%google%organic%' THEN 'Organic Search'
    WHEN source_medium ILIKE '%google%cpc%' THEN 'Paid Search'
    WHEN source_medium ILIKE '%facebook%' OR source_medium ILIKE '%linkedin%' THEN 'Social Media'
    WHEN source_medium = '(direct)/(none)' THEN 'Direct'
    ELSE 'Referral'
  END as traffic_category,
  SUM(sessions) as total_sessions,
  SUM(users) as total_users,
  SUM(pageviews) as total_pageviews,
  AVG(avg_duration) as avg_session_duration
FROM source_metrics
GROUP BY traffic_category;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate percentages",
        description: "Calculate percentage of total traffic for each category",
        status: "completed",
        sqlQuery: `SELECT
  traffic_category,
  total_sessions,
  ROUND((total_sessions::FLOAT / SUM(total_sessions) OVER () * 100)::NUMERIC, 1) as percentage
FROM categorized_traffic
ORDER BY total_sessions DESC;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Format for visualization",
        description: "Prepare data for pie chart display",
        status: "completed",
        sqlQuery: `SELECT
  traffic_category as name,
  total_sessions as value,
  percentage
FROM traffic_percentages
ORDER BY value DESC;`,
      },
    ],
    chartData: {
      type: "pie",
      title: "Traffic Sources Breakdown - Last 30 Days",
      data: [
        { name: "Organic Search", value: 19320, percentage: 42.3 },
        { name: "Direct", value: 10920, percentage: 23.9 },
        { name: "Paid Search", value: 8450, percentage: 18.5 },
        { name: "Referral", value: 4280, percentage: 9.4 },
        { name: "Social Media", value: 2710, percentage: 5.9 },
      ],
      colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Source Details", icon: "Eye", type: "view" },
      { id: "schedule", label: "Weekly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "user behavior flow analysis": {
    content:
      "Analysis of user behavior flow from landing pages to conversions:\n\n**Top Entry Pages:**\n1. Homepage → 12,450 sessions (27.3%)\n2. Blog Articles → 8,920 sessions (19.5%)\n3. Product Pages → 6,780 sessions (14.8%)\n4. Pricing Page → 4,560 sessions (10.0%)\n\n**Behavior Patterns:**\n- Homepage visitors have highest conversion rate (4.2%)\n- Blog readers spend 2.3x more time on site\n- Pricing page visitors convert at 8.7% (highest intent)\n- Product page bounce rate is 32% (below average of 45%)\n\n**Drop-off Points:**\n- 45% bounce on landing pages\n- 28% exit after viewing 1 page\n- 15% abandon during signup flow\n- 12% complete conversion funnel\n\n**Recommendation:** Focus on reducing bounce rate on blog articles by adding more prominent CTAs. Consider A/B testing different CTA placements and messaging.",
    type: "text",
    dataSources: [
      {
        id: "google-analytics",
        name: "Google Analytics",
        icon: "/google-analytics.png",
        tablesUsed: ["sessions", "events", "page_views"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Get landing page metrics",
        description: "Query GA4 for session counts and conversions by landing page",
        status: "completed",
        dataSource: "Google Analytics",
        sqlQuery: `SELECT
  landing_page,
  COUNT(DISTINCT session_id) as sessions,
  COUNT(DISTINCT CASE WHEN converted = true THEN session_id END) as conversions,
  AVG(session_duration) as avg_duration,
  AVG(pages_per_session) as avg_pages,
  SUM(CASE WHEN pages_per_session = 1 THEN 1 ELSE 0 END)::FLOAT / COUNT(*) * 100 as bounce_rate
FROM ga4.sessions
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY landing_page
ORDER BY sessions DESC;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Analyze navigation paths",
        description: "Track common page sequences from landing to conversion",
        status: "completed",
        dataSource: "Google Analytics",
        sqlQuery: `SELECT
  session_id,
  ARRAY_AGG(page_path ORDER BY timestamp) as page_sequence,
  COUNT(*) as page_views,
  MAX(CASE WHEN event_name = 'conversion' THEN 1 ELSE 0 END) as converted
FROM ga4.events
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
  AND event_name IN ('page_view', 'conversion')
GROUP BY session_id;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Identify drop-off points",
        description: "Calculate exit rates at each funnel step",
        status: "completed",
        sqlQuery: `SELECT
  funnel_step,
  COUNT(*) as sessions_at_step,
  LAG(COUNT(*)) OVER (ORDER BY funnel_step_order) as sessions_at_previous_step,
  COUNT(*)::FLOAT / LAG(COUNT(*)) OVER (ORDER BY funnel_step_order) * 100 as progression_rate,
  100 - (COUNT(*)::FLOAT / LAG(COUNT(*)) OVER (ORDER BY funnel_step_order) * 100) as drop_off_rate
FROM (
  SELECT
    session_id,
    CASE
      WHEN page_sequence[1] IS NOT NULL THEN 1
      WHEN ARRAY_LENGTH(page_sequence, 1) > 1 THEN 2
      WHEN '/signup' = ANY(page_sequence) THEN 3
      WHEN converted = 1 THEN 4
    END as funnel_step,
    funnel_step as funnel_step_order
  FROM navigation_paths
) funnel_data
GROUP BY funnel_step, funnel_step_order
ORDER BY funnel_step_order;`,
      },
    ],
    actions: [
      { id: "export", label: "Export Analysis", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Behavior Flow", icon: "Eye", type: "view" },
      { id: "schedule", label: "Monthly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  "conversion funnel analysis": {
    content:
      "Here's your conversion funnel breakdown showing drop-off at each stage. Overall conversion rate from visitor to customer is 3.2%.",
    type: "table",
    dataSources: [
      {
        id: "google-analytics",
        name: "Google Analytics",
        icon: "/google-analytics.png",
        tablesUsed: ["sessions", "events", "conversions"],
      },
    ],
    reasoningSteps: [
      {
        id: "step1",
        step: 1,
        title: "Define funnel stages",
        description: "Identify key events that define the conversion funnel",
        status: "completed",
        dataSource: "Google Analytics",
        sqlQuery: `SELECT
  session_id,
  user_id,
  MAX(CASE WHEN event_name = 'page_view' THEN 1 ELSE 0 END) as viewed_page,
  MAX(CASE WHEN event_name = 'signup_started' THEN 1 ELSE 0 END) as started_signup,
  MAX(CASE WHEN event_name = 'signup_completed' THEN 1 ELSE 0 END) as completed_signup,
  MAX(CASE WHEN event_name = 'trial_started' THEN 1 ELSE 0 END) as started_trial,
  MAX(CASE WHEN event_name = 'purchase' THEN 1 ELSE 0 END) as purchased
FROM ga4.events
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY session_id, user_id;`,
      },
      {
        id: "step2",
        step: 2,
        title: "Count users at each stage",
        description: "Aggregate unique users who reached each funnel stage",
        status: "completed",
        dataSource: "Google Analytics",
        sqlQuery: `SELECT
  COUNT(DISTINCT user_id) as total_visitors,
  COUNT(DISTINCT CASE WHEN started_signup = 1 THEN user_id END) as signup_started,
  COUNT(DISTINCT CASE WHEN completed_signup = 1 THEN user_id END) as signup_completed,
  COUNT(DISTINCT CASE WHEN started_trial = 1 THEN user_id END) as trial_started,
  COUNT(DISTINCT CASE WHEN purchased = 1 THEN user_id END) as customers
FROM funnel_events;`,
      },
      {
        id: "step3",
        step: 3,
        title: "Calculate conversion rates",
        description: "Calculate step-by-step and overall conversion rates",
        status: "completed",
        sqlQuery: `SELECT
  'Visitors' as stage,
  total_visitors as users,
  100.0 as conversion_from_previous,
  100.0 as overall_conversion
FROM funnel_counts
UNION ALL
SELECT
  'Signup Started' as stage,
  signup_started as users,
  ROUND((signup_started::FLOAT / NULLIF(total_visitors, 0) * 100)::NUMERIC, 1) as conversion_from_previous,
  ROUND((signup_started::FLOAT / NULLIF(total_visitors, 0) * 100)::NUMERIC, 1) as overall_conversion
FROM funnel_counts
UNION ALL
SELECT
  'Signup Completed' as stage,
  signup_completed as users,
  ROUND((signup_completed::FLOAT / NULLIF(signup_started, 0) * 100)::NUMERIC, 1) as conversion_from_previous,
  ROUND((signup_completed::FLOAT / NULLIF(total_visitors, 0) * 100)::NUMERIC, 1) as overall_conversion
FROM funnel_counts
UNION ALL
SELECT
  'Trial Started' as stage,
  trial_started as users,
  ROUND((trial_started::FLOAT / NULLIF(signup_completed, 0) * 100)::NUMERIC, 1) as conversion_from_previous,
  ROUND((trial_started::FLOAT / NULLIF(total_visitors, 0) * 100)::NUMERIC, 1) as overall_conversion
FROM funnel_counts
UNION ALL
SELECT
  'Customer' as stage,
  customers as users,
  ROUND((customers::FLOAT / NULLIF(trial_started, 0) * 100)::NUMERIC, 1) as conversion_from_previous,
  ROUND((customers::FLOAT / NULLIF(total_visitors, 0) * 100)::NUMERIC, 1) as overall_conversion
FROM funnel_counts;`,
      },
      {
        id: "step4",
        step: 4,
        title: "Calculate drop-off metrics",
        description: "Add drop-off counts and percentages for each stage",
        status: "completed",
        sqlQuery: `SELECT
  stage,
  users,
  LAG(users) OVER (ORDER BY stage_order) - users as dropped_off,
  conversion_from_previous || '%' as step_conversion,
  overall_conversion || '%' as overall_conversion
FROM stage_conversions
ORDER BY stage_order;`,
      },
    ],
    tableData: {
      title: "Conversion Funnel Analysis - Last 30 Days",
      columns: [
        { key: "stage", label: "Funnel Stage", sortable: false },
        { key: "users", label: "Users", sortable: true },
        { key: "droppedOff", label: "Dropped Off", sortable: true },
        { key: "stepConversion", label: "Step Conversion", sortable: true },
        { key: "overallConversion", label: "Overall Conversion", sortable: true },
      ],
      rows: [
        {
          stage: "Visitors",
          users: "45,680",
          droppedOff: "-",
          stepConversion: "100.0%",
          overallConversion: "100.0%",
        },
        {
          stage: "Signup Started",
          users: "4,568",
          droppedOff: "41,112",
          stepConversion: "10.0%",
          overallConversion: "10.0%",
        },
        {
          stage: "Signup Completed",
          users: "3,197",
          droppedOff: "1,371",
          stepConversion: "70.0%",
          overallConversion: "7.0%",
        },
        {
          stage: "Trial Started",
          users: "2,558",
          droppedOff: "639",
          stepConversion: "80.0%",
          overallConversion: "5.6%",
        },
        {
          stage: "Customer",
          users: "1,462",
          droppedOff: "1,096",
          stepConversion: "57.1%",
          overallConversion: "3.2%",
        },
      ],
    },
    actions: [
      { id: "export", label: "Export to Sheets", icon: "FileSpreadsheet", type: "export" },
      { id: "view", label: "View Funnel Details", icon: "Eye", type: "view" },
      { id: "schedule", label: "Weekly Report", icon: "Calendar", type: "schedule" },
    ],
  },
  // Digest creation conversation flow - 6 message exchanges (with confirmation step)
  "i want to create a digest": {
    content:
      "I'd be happy to help you create a digest! To get started, could you tell me what type of insights you'd like to receive? For example, are you interested in campaign performance, social media metrics, email marketing, or something else?",
    type: "text",
  },
  // Alternative keys for digest creation
  "create a digest": {
    content:
      "I'd be happy to help you create a digest! To get started, could you tell me what type of insights you'd like to receive? For example, are you interested in campaign performance, social media metrics, email marketing, or something else?",
    type: "text",
  },
  "create digest": {
    content:
      "I'd be happy to help you create a digest! To get started, could you tell me what type of insights you'd like to receive? For example, are you interested in campaign performance, social media metrics, email marketing, or something else?",
    type: "text",
  },
  "i want campaign performance metrics": {
    content: "Great! For campaign performance, what time period would you like to track? Daily, weekly, or monthly?",
    type: "text",
  },
  // Alternative key without "i want" prefix for when users type directly
  "campaign performance metrics": {
    content: "Great! For campaign performance, what time period would you like to track? Daily, weekly, or monthly?",
    type: "text",
  },
  weekly: {
    content:
      "Perfect! Should I include comparisons with previous periods, and any specific breakdowns like by channel, campaign type, or audience segment?",
    type: "text",
  },
  "yes, compare with previous week and break down by channel": {
    content:
      "Excellent! I've added those components. Would you like to include any visualizations like charts or graphs, and any specific alerts or thresholds?",
    type: "text",
  },
  "add a line chart for trends and alert if click-through rate drops below 2%": {
    content:
      "Excellent! I've configured your Marketing Campaign Performance digest with all the components you requested. Here's what it includes:\n\n- Weekly tracking of campaign performance metrics\n- Comparison with previous week\n- Breakdown by channel (Email, Social Media, Paid Search, Display)\n- Line chart showing CTR and conversion rate trends\n- Alert when click-through rate drops below 2%\n\nDoes this look good to you? I can make any changes you'd like before we set up the schedule.",
    type: "text",
  },
  // User confirmation variations - all lead to scheduling options
  "looks good to me": {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  "looks good": {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  yes: {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  "looks great": {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  perfect: {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  "that's perfect": {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  // Additional confirmation variations
  "that looks good": {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  "sounds good": {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  "that works": {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  yep: {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
  yeah: {
    content:
      "Perfect! I've configured your digest. Now, how often would you like to receive this digest? You can choose: Daily at 9am, Every Monday at 9am, or Monthly on the 1st at 9am",
    type: "text",
    actions: [
      {
        id: "schedule-daily",
        label: "Daily at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
      {
        id: "schedule-weekly",
        label: "Every Monday at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "default",
      },
      {
        id: "schedule-monthly",
        label: "Monthly on the 1st at 9am",
        icon: "Calendar",
        type: "schedule",
        variant: "outline",
      },
    ],
  },
};
