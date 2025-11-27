/**
 * Tests for Chat Fallback Response Generator
 */

import type { SuggestionContext } from "~services/suggestionEngine";

import { detectDataSources, generateFallbackResponse } from "./chatFallbackResponses";

describe("chatFallbackResponses", () => {
  describe("detectDataSources", () => {
    it("should detect Stripe from payment-related keywords", () => {
      expect(detectDataSources("Show me Stripe revenue")).toContain("stripe");
      expect(detectDataSources("What's our MRR?")).toContain("stripe");
      expect(detectDataSources("Calculate subscription churn")).toContain("stripe");
    });

    it("should detect HubSpot from CRM keywords", () => {
      expect(detectDataSources("Show HubSpot pipeline")).toContain("hubspot");
      expect(detectDataSources("What's the deal conversion rate?")).toContain("hubspot");
      expect(detectDataSources("Show me lead sources")).toContain("hubspot");
    });

    it("should detect Meta Ads from social advertising keywords", () => {
      expect(detectDataSources("Meta Ads performance")).toContain("meta-ads");
      expect(detectDataSources("Facebook campaign results")).toContain("meta-ads");
      expect(detectDataSources("Instagram ad spend")).toContain("meta-ads");
    });

    it("should detect Google Ads from search advertising keywords", () => {
      expect(detectDataSources("Google Ads CTR")).toContain("google-ads");
      expect(detectDataSources("AdWords performance")).toContain("google-ads");
      expect(detectDataSources("PPC campaign results")).toContain("google-ads");
    });

    it("should detect Google Analytics from web analytics keywords", () => {
      expect(detectDataSources("Google Analytics traffic")).toContain("google-analytics");
      expect(detectDataSources("Website bounce rate")).toContain("google-analytics");
      expect(detectDataSources("Show pageviews")).toContain("google-analytics");
    });

    it("should detect Zendesk from support keywords", () => {
      expect(detectDataSources("Zendesk ticket volume")).toContain("zendesk");
      expect(detectDataSources("Support ticket trends")).toContain("zendesk");
      expect(detectDataSources("Customer support response time")).toContain("zendesk");
    });

    it("should detect multiple sources", () => {
      const sources = detectDataSources("Compare Stripe revenue with Meta Ads spend");
      expect(sources).toContain("stripe");
      expect(sources).toContain("meta-ads");
      expect(sources).toHaveLength(2);
    });

    it("should return empty array when no sources detected", () => {
      expect(detectDataSources("Hello")).toEqual([]);
      expect(detectDataSources("What can you do?")).toEqual([]);
    });
  });

  describe("generateFallbackResponse", () => {
    const mockContext: SuggestionContext = {
      connectedSources: ["stripe", "hubspot"],
      isReconciled: false,
      hasMultipleSources: true,
    };

    it("should generate response for unconnected source", () => {
      const response = generateFallbackResponse("Show Meta Ads performance", mockContext);

      expect(response.content).toContain("Meta Ads");
      expect(response.content).toContain("connect");
      expect(response.role).toBe("assistant");
      expect(response.type).toBe("text");
    });

    it("should include capabilities for unconnected Stripe", () => {
      const context: SuggestionContext = {
        connectedSources: [],
        isReconciled: false,
        hasMultipleSources: false,
      };

      const response = generateFallbackResponse("Show Stripe revenue", context);

      expect(response.content).toContain("Stripe");
      expect(response.content).toContain("MRR");
      expect(response.content).toContain("churn");
    });

    it("should include capabilities for unconnected HubSpot", () => {
      const context: SuggestionContext = {
        connectedSources: [],
        isReconciled: false,
        hasMultipleSources: false,
      };

      const response = generateFallbackResponse("Show HubSpot pipeline", context);

      expect(response.content).toContain("HubSpot");
      expect(response.content).toContain("pipeline");
      expect(response.content).toContain("deal");
    });

    it("should provide alternative sources when available", () => {
      const context: SuggestionContext = {
        connectedSources: ["stripe"],
        isReconciled: false,
        hasMultipleSources: false,
      };

      const response = generateFallbackResponse("Show Zendesk tickets", context);

      expect(response.content).toContain("Zendesk");
      expect(response.content).toContain("Stripe");
      // Should suggest alternatives from connected sources
    });

    it("should provide guided suggestions when no specific source detected", () => {
      const response = generateFallbackResponse("What can you show me?", mockContext);

      expect(response.content).toContain("Stripe");
      expect(response.content).toContain("HubSpot");
      expect(response.content).toContain("questions I can answer");
    });

    it("should suggest connecting sources when none are connected", () => {
      const context: SuggestionContext = {
        connectedSources: [],
        isReconciled: false,
        hasMultipleSources: false,
      };

      const response = generateFallbackResponse("Show me something", context);

      expect(response.content).toContain("connect");
      expect(response.content).toContain("data source");
    });

    it("should mention reconciliation in guided suggestions with multiple sources", () => {
      const response = generateFallbackResponse("Help me understand my data", mockContext);

      expect(response.content).toContain("reconciliation");
      expect(response.content).toContain("cross-source");
    });

    it("should not mention reconciliation when only one source connected", () => {
      const context: SuggestionContext = {
        connectedSources: ["stripe"],
        isReconciled: false,
        hasMultipleSources: false,
      };

      const response = generateFallbackResponse("What can I ask?", context);

      expect(response.content).not.toContain("reconciliation");
    });

    it("should include specific benefits for attribution queries", () => {
      const response = generateFallbackResponse("Show me attribution from ads to customers", mockContext);

      // This should trigger reconciliation needed response since it's cross-source
      expect(response.content).toContain("reconciliation");
      // Attribution benefits mentioned in reconciliation response
      expect(response.content.toLowerCase()).toContain("attribution");
    });

    it("should handle multiple unconnected sources", () => {
      const context: SuggestionContext = {
        connectedSources: ["stripe"],
        isReconciled: false,
        hasMultipleSources: false,
      };

      const response = generateFallbackResponse("Compare Meta Ads and Google Ads", context);

      expect(response.content).toContain("Meta Ads");
      // Should suggest connecting the missing source
    });

    it("should provide context-aware suggestions based on Stripe", () => {
      const context: SuggestionContext = {
        connectedSources: ["stripe"],
        isReconciled: false,
        hasMultipleSources: false,
      };

      const response = generateFallbackResponse("What can you tell me?", context);

      expect(response.content).toContain("MRR");
      expect(response.content).toContain("revenue");
    });

    it("should provide context-aware suggestions based on Meta Ads", () => {
      const context: SuggestionContext = {
        connectedSources: ["meta-ads"],
        isReconciled: false,
        hasMultipleSources: false,
      };

      const response = generateFallbackResponse("Show me insights", context);

      expect(response.content).toContain("Meta Ads");
      expect(response.content).toContain("ROAS");
    });

    it("should handle reconciled context differently", () => {
      const reconciledContext: SuggestionContext = {
        connectedSources: ["stripe", "meta-ads"],
        isReconciled: true,
        hasMultipleSources: true,
      };

      const response = generateFallbackResponse("Show attribution", reconciledContext);

      // When reconciled and asking about attribution, should provide guided suggestions
      // since attribution is mentioned but the exact query isn't in mock data
      expect(response.content).toBeTruthy();
      expect(response.type).toBe("text");
    });

    it("should generate unique message IDs", async () => {
      const response1 = generateFallbackResponse("Test 1", mockContext);
      // Wait 1ms to ensure different timestamp
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 1));
      const response2 = generateFallbackResponse("Test 2", mockContext);

      expect(response1.id).not.toBe(response2.id);
      expect(response1.id).toContain("fallback-");
      expect(response2.id).toContain("fallback-");
    });

    it("should always return valid timestamp", () => {
      const response = generateFallbackResponse("Test", mockContext);

      expect(response.timestamp).toBeInstanceOf(Date);
      expect(response.timestamp.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it("should handle Google Analytics queries", () => {
      const context: SuggestionContext = {
        connectedSources: [],
        isReconciled: false,
        hasMultipleSources: false,
      };

      const response = generateFallbackResponse("Show Google Analytics traffic", context);

      expect(response.content).toContain("Google Analytics");
      expect(response.content).toContain("traffic sources");
    });

    it("should suggest alternatives when asking about Shopify with Stripe connected", () => {
      const context: SuggestionContext = {
        connectedSources: ["stripe"],
        isReconciled: false,
        hasMultipleSources: false,
      };

      const response = generateFallbackResponse("Show Shopify sales", context);

      expect(response.content).toContain("Shopify");
      expect(response.content).toContain("revenue");
    });

    it("should provide multiple query suggestions", () => {
      const context: SuggestionContext = {
        connectedSources: ["stripe", "hubspot", "google-analytics"],
        isReconciled: false,
        hasMultipleSources: true,
      };

      const response = generateFallbackResponse("What can I ask?", context);

      // Should include bullet points for multiple suggestions
      expect(response.content).toContain("•");
      expect(response.content.split("•").length).toBeGreaterThan(1);
    });
  });
});
