export interface DataConnector {
  id: string;
  name: string;
  description: string;
  category: "analytics" | "crm" | "ecommerce" | "marketing" | "payment" | "productivity";
  icon: string;
  isConnected: boolean;
  isPremium?: boolean;
  oauthUrl?: string;
}

export const AVAILABLE_CONNECTORS: DataConnector[] = [
  {
    id: "meta-ads",
    name: "Meta Ads",
    description: "Facebook and Instagram advertising platform",
    category: "marketing",
    icon: "/meta.png",
    isConnected: false,
    oauthUrl: "/api/oauth/meta-ads",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    description: "Google advertising platform for Search, Display, and YouTube",
    category: "marketing",
    icon: "/google_ads.png",
    isConnected: false,
    oauthUrl: "/api/oauth/google-ads",
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing and subscription management",
    category: "payment",
    icon: "/stripe.png",
    isConnected: false,
    oauthUrl: "/api/oauth/stripe",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM, marketing automation, and sales",
    category: "crm",
    icon: "/hubspot.jpeg",
    isConnected: false,
    oauthUrl: "/api/oauth/hubspot",
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "E-commerce platform for online stores",
    category: "ecommerce",
    icon: "/shopify.png",
    isConnected: false,
    oauthUrl: "/api/oauth/shopify",
  },
  {
    id: "google-analytics",
    name: "Google Analytics 4",
    description: "Web and app analytics",
    category: "analytics",
    icon: "/google-analytics.png",
    isConnected: false,
    oauthUrl: "/api/oauth/google-analytics",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Spreadsheet data and collaboration",
    category: "productivity",
    icon: "/google_sheets.png",
    isConnected: false,
    oauthUrl: "/api/oauth/google-sheets",
  },
  {
    id: "pennylane",
    name: "Pennylane",
    description: "French accounting and financial management platform",
    category: "payment",
    icon: "/pennylane.png",
    isConnected: false,
    isPremium: true,
    oauthUrl: "/api/oauth/pennylane",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Accounting and financial management",
    category: "payment",
    icon: "/quickbooks.jpg",
    isConnected: false,
    isPremium: true,
    oauthUrl: "/api/oauth/quickbooks",
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Customer service and support ticketing",
    category: "crm",
    icon: "/zendesk.png",
    isConnected: false,
    oauthUrl: "/api/oauth/zendesk",
  },
];

export type ConnectorCategory = DataConnector["category"];

export const CONNECTOR_CATEGORIES: Record<ConnectorCategory, string> = {
  marketing: "Marketing & Advertising",
  payment: "Payments & Finance",
  crm: "CRM & Sales",
  ecommerce: "E-commerce",
  analytics: "Analytics",
  productivity: "Productivity",
};
