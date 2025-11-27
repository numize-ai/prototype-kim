/* eslint-disable id-length */
/* eslint-disable require-unicode-regexp */
/* eslint-disable prefer-named-capture-group */
/**
 * Chat Fallback Response Generator
 * Provides intelligent, context-aware responses when no mock data matches the user's question
 */

import type { ChatMessage } from "~mocks/chat-data";
import { AVAILABLE_CONNECTORS } from "~mocks/connectors";
import type { SuggestionContext } from "~services/suggestionEngine";

// Data source keywords mapping to connector IDs
const DATA_SOURCE_KEYWORDS: Record<string, string[]> = {
  stripe: ["stripe", "payment", "revenue", "mrr", "arr", "subscription", "churn", "customer lifetime"],
  hubspot: ["hubspot", "crm", "contact", "deal", "pipeline", "sales pipeline", "lead", "marketing automation"],
  "meta-ads": ["meta", "facebook", "instagram", "fb ads", "ig ads", "social ads", "meta advertising", "facebook ads"],
  "google-ads": ["google ads", "adwords", "search ads", "display ads", "youtube ads", "google advertising", "ppc"],
  "google-analytics": [
    "google analytics",
    "ga4",
    "analytics",
    "website traffic",
    "pageviews",
    "sessions",
    "bounce rate",
    "conversion rate",
  ],
  zendesk: ["zendesk", "support ticket", "customer support", "help desk", "ticket volume", "response time"],
  shopify: ["shopify", "ecommerce", "online store", "product sales", "inventory", "orders", "shopify sales"],
  quickbooks: ["quickbooks", "accounting", "bookkeeping", "expenses", "invoices", "financial statements"],
  pennylane: ["pennylane", "comptabilité", "accounting", "french accounting"],
  "google-sheets": ["google sheets", "spreadsheet", "sheet", "gsheet"],
};

/**
 * Detect which data sources are mentioned in the question
 */
export const detectDataSources = (question: string): string[] => {
  const lowerQuestion = question.toLowerCase();
  const detectedSources: string[] = [];

  for (const [sourceId, keywords] of Object.entries(DATA_SOURCE_KEYWORDS)) {
    if (keywords.some((keyword) => lowerQuestion.includes(keyword))) {
      detectedSources.push(sourceId);
    }
  }

  return detectedSources;
};

/**
 * Get connector name by ID
 */
const getConnectorName = (sourceId: string): string => {
  const connector = AVAILABLE_CONNECTORS.find((c) => c.id === sourceId);
  return connector?.name ?? sourceId;
};

/**
 * Get similar available queries based on connected sources
 */
const getSimilarQueries = (connectedSources: string[]): string[] => {
  const queries: string[] = [];

  if (connectedSources.includes("stripe")) {
    queries.push("MRR growth trends", "top customers by revenue", "churn rate analysis");
  }

  if (connectedSources.includes("hubspot")) {
    queries.push("sales pipeline overview", "lead conversion rates", "deal close rates");
  }

  if (connectedSources.includes("meta-ads")) {
    queries.push("Meta Ads performance metrics", "campaign ROAS", "ad spend trends");
  }

  if (connectedSources.includes("google-ads")) {
    queries.push("Google Ads CTR analysis", "keyword performance", "search campaign costs");
  }

  if (connectedSources.includes("google-analytics")) {
    queries.push("website traffic sources", "user engagement metrics", "conversion funnels");
  }

  return queries.slice(0, 3); // Limit to 3 suggestions
};

/**
 * Generate response when user asks about unconnected sources
 */
const generateUnconnectedSourceResponse = (missingSource: string, connectedSources: string[]): string => {
  const sourceName = getConnectorName(missingSource);

  let baseMessage = `To analyze ${sourceName} data, you'll need to connect your ${sourceName} account first.`;

  // Add intent-specific capabilities
  const capabilities: Record<string, string> = {
    stripe: "MRR trends, revenue forecasting, churn analysis, customer cohorts, and subscription metrics",
    hubspot:
      "pipeline analytics, deal forecasting, lead attribution, contact engagement, and sales performance metrics",
    "meta-ads": "campaign performance, ROAS analysis, audience insights, ad spend optimization, and creative testing",
    "google-ads":
      "keyword performance, quality scores, conversion tracking, search term analysis, and budget optimization",
    "google-analytics":
      "traffic sources, user behavior flows, conversion funnels, audience segmentation, and engagement metrics",
    zendesk: "ticket volume trends, response times, customer satisfaction scores, and support team performance",
  };

  if (capabilities[missingSource] !== undefined) {
    baseMessage += ` Once connected, I can show you ${capabilities[missingSource]}.`;
  }

  // Suggest alternative if available
  if (connectedSources.length > 0) {
    const similar = getSimilarQueries(connectedSources);
    if (similar.length > 0) {
      const sourceNames = connectedSources.map(getConnectorName).join(", ");
      baseMessage += `\n\nIn the meantime, here are some insights I can provide using your connected sources (${sourceNames}):\n${similar.map((q) => `• ${q}`).join("\n")}`;
    }
  }

  return baseMessage;
};

/**
 * Generate response suggesting available alternatives
 */
const generateAlternativeResponse = (missingSource: string, connectedSources: string[]): string => {
  const missingName = getConnectorName(missingSource);

  let message = `I don't have access to ${missingName} data yet.`;

  // Suggest similar metrics from available sources
  const alternatives: Record<string, Record<string, string>> = {
    zendesk: {
      "google-analytics": "customer engagement metrics and user behavior patterns",
      stripe: "customer health scores based on payment history and subscription status",
    },
    shopify: {
      stripe: "revenue metrics and customer purchase patterns",
      "google-analytics": "product performance based on website traffic and conversion data",
    },
  };

  for (const connectedId of connectedSources) {
    if (alternatives[missingSource]?.[connectedId] !== undefined) {
      message += ` However, I can show you ${alternatives[missingSource][connectedId]} using ${getConnectorName(connectedId)}.`;
      break;
    }
  }

  // Add general suggestions
  const similar = getSimilarQueries(connectedSources);
  if (similar.length > 0) {
    message += `\n\nHere are some insights I can provide with your current connections:\n${similar.map((q) => `• ${q}`).join("\n")}`;
  }

  return message;
};

/**
 * Generate guided suggestions based on connected sources
 */
const generateGuidedSuggestions = (connectedSources: string[], hasMultipleSources: boolean): string => {
  if (connectedSources.length === 0) {
    return "I'd be happy to help analyze your data! To get started, please connect at least one data source from the Connectors page.";
  }

  const sourceNames = connectedSources.map(getConnectorName).join(", ");
  const queries = getSimilarQueries(connectedSources);

  let message = `Based on your connected sources (${sourceNames}), here are some questions I can answer:\n\n`;
  message += queries.map((q) => `• ${q}`).join("\n");

  if (hasMultipleSources) {
    message +=
      "\n\nFor cross-source insights like marketing attribution and customer journey analysis, consider setting up reconciliation rules.";
  }

  return message;
};

/**
 * Generate intelligent fallback response based on question analysis and context
 */
export const generateFallbackResponse = (question: string, context: SuggestionContext): ChatMessage => {
  const { connectedSources, hasMultipleSources } = context;

  // Detect what the user is asking about
  const detectedSources = detectDataSources(question);

  let responseContent: string;

  // Case 1: User mentions specific source(s) that aren't connected
  const missingSource = detectedSources.find((sourceId) => !connectedSources.includes(sourceId));
  if (missingSource !== undefined && detectedSources.length === 1) {
    responseContent = generateUnconnectedSourceResponse(missingSource, connectedSources);
  }
  // Case 3: User asks about missing source but similar data available
  else if (missingSource !== undefined && connectedSources.length > 0) {
    responseContent = generateAlternativeResponse(missingSource, connectedSources);
  }
  // Case 4: No specific source detected - provide guided suggestions
  else {
    responseContent = generateGuidedSuggestions(connectedSources, hasMultipleSources);
  }

  return {
    id: `fallback-${Date.now()}`,
    role: "assistant",
    content: responseContent,
    timestamp: new Date(),
    type: "text",
  };
};
