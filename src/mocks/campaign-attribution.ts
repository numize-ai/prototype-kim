/**
 * Mock data for campaign attribution mappings
 */
/* eslint-disable max-lines */
/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

interface CampaignAttribution {
  id: string;
  campaignId: string;
  contactId: string;
  matchMethod: "fuzzy" | "source" | "utm";
  confidence: number; // 0-100
  createdAt: Date;
  ruleId?: string; // Reference to reconciliation rule used
}

// Generate attribution mappings based on HubSpot contacts with campaign IDs
export const CAMPAIGN_ATTRIBUTIONS: CampaignAttribution[] = [
  // High confidence UTM matches
  {
    id: "attr-001",
    campaignId: "meta-001",
    contactId: "contact-001",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-15"),
    ruleId: "rule-001",
  },
  {
    id: "attr-002",
    campaignId: "meta-001",
    contactId: "contact-002",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-16"),
    ruleId: "rule-001",
  },
  {
    id: "attr-003",
    campaignId: "meta-001",
    contactId: "contact-003",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-18"),
    ruleId: "rule-001",
  },
  {
    id: "attr-004",
    campaignId: "meta-001",
    contactId: "contact-004",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-19"),
    ruleId: "rule-001",
  },
  {
    id: "attr-005",
    campaignId: "meta-001",
    contactId: "contact-005",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-20"),
    ruleId: "rule-001",
  },

  {
    id: "attr-006",
    campaignId: "meta-002",
    contactId: "contact-006",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-12"),
    ruleId: "rule-001",
  },
  {
    id: "attr-007",
    campaignId: "meta-002",
    contactId: "contact-007",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-14"),
    ruleId: "rule-001",
  },
  {
    id: "attr-008",
    campaignId: "meta-002",
    contactId: "contact-008",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-16"),
    ruleId: "rule-001",
  },

  {
    id: "attr-009",
    campaignId: "meta-004",
    contactId: "contact-009",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-22"),
    ruleId: "rule-001",
  },
  {
    id: "attr-010",
    campaignId: "meta-004",
    contactId: "contact-010",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-23"),
    ruleId: "rule-001",
  },
  {
    id: "attr-011",
    campaignId: "meta-004",
    contactId: "contact-011",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-24"),
    ruleId: "rule-001",
  },

  {
    id: "attr-012",
    campaignId: "google-001",
    contactId: "contact-012",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-10"),
    ruleId: "rule-001",
  },
  {
    id: "attr-013",
    campaignId: "google-001",
    contactId: "contact-013",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-12"),
    ruleId: "rule-001",
  },
  {
    id: "attr-014",
    campaignId: "google-001",
    contactId: "contact-014",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-14"),
    ruleId: "rule-001",
  },
  {
    id: "attr-015",
    campaignId: "google-001",
    contactId: "contact-015",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-15"),
    ruleId: "rule-001",
  },

  {
    id: "attr-016",
    campaignId: "google-002",
    contactId: "contact-016",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-18"),
    ruleId: "rule-001",
  },
  {
    id: "attr-017",
    campaignId: "google-002",
    contactId: "contact-017",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-19"),
    ruleId: "rule-001",
  },

  {
    id: "attr-018",
    campaignId: "google-003",
    contactId: "contact-018",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-20"),
    ruleId: "rule-001",
  },
  {
    id: "attr-019",
    campaignId: "google-003",
    contactId: "contact-019",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-21"),
    ruleId: "rule-001",
  },

  {
    id: "attr-020",
    campaignId: "google-004",
    contactId: "contact-020",
    matchMethod: "utm",
    confidence: 95,
    createdAt: new Date("2025-01-25"),
    ruleId: "rule-002",
  },
  {
    id: "attr-021",
    campaignId: "google-004",
    contactId: "contact-021",
    matchMethod: "utm",
    confidence: 95,
    createdAt: new Date("2025-01-26"),
    ruleId: "rule-002",
  },

  // Medium confidence source matches
  {
    id: "attr-022",
    campaignId: "meta-001",
    contactId: "contact-022",
    matchMethod: "source",
    confidence: 75,
    createdAt: new Date("2025-01-21"),
    ruleId: "rule-004",
  },
  {
    id: "attr-023",
    campaignId: "meta-002",
    contactId: "contact-023",
    matchMethod: "source",
    confidence: 75,
    createdAt: new Date("2025-01-17"),
    ruleId: "rule-004",
  },

  {
    id: "attr-024",
    campaignId: "google-001",
    contactId: "contact-024",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-16"),
    ruleId: "rule-001",
  },
  {
    id: "attr-025",
    campaignId: "google-009",
    contactId: "contact-025",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-27"),
    ruleId: "rule-001",
  },
  {
    id: "attr-026",
    campaignId: "meta-004",
    contactId: "contact-026",
    matchMethod: "fuzzy",
    confidence: 85,
    createdAt: new Date("2025-01-28"),
    ruleId: "rule-003",
  },
  {
    id: "attr-027",
    campaignId: "google-008",
    contactId: "contact-027",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-29"),
    ruleId: "rule-001",
  },
  {
    id: "attr-028",
    campaignId: "meta-001",
    contactId: "contact-028",
    matchMethod: "source",
    confidence: 70,
    createdAt: new Date("2025-01-22"),
    ruleId: "rule-004",
  },
  {
    id: "attr-029",
    campaignId: "google-005",
    contactId: "contact-029",
    matchMethod: "utm",
    confidence: 95,
    createdAt: new Date("2025-01-17"),
    ruleId: "rule-002",
  },
  {
    id: "attr-030",
    campaignId: "meta-002",
    contactId: "contact-030",
    matchMethod: "utm",
    confidence: 100,
    createdAt: new Date("2025-01-18"),
    ruleId: "rule-001",
  },

  // Additional attributions for the remaining contacts with campaigns (70 more)
  ...Array.from({ length: 70 }, (_, i) => {
    const num = 31 + i;
    const contactId = `contact-${(34 + i).toString().padStart(3, "0")}`;
    const campaignIds = ["meta-001", "meta-002", "meta-004", "google-001", "google-002", "google-003", "google-009"];
    const campaignId = campaignIds[i % campaignIds.length]!;
    const methods: Array<"fuzzy" | "source" | "utm"> = ["utm", "utm", "utm", "source", "fuzzy"];
    const matchMethod = methods[i % methods.length]!;
    const confidences: Record<"fuzzy" | "source" | "utm", number> = { utm: 100, source: 75, fuzzy: 85 };
    const confidence = confidences[matchMethod];
    const ruleIds: Record<"fuzzy" | "source" | "utm", string> = {
      utm: "rule-001",
      source: "rule-004",
      fuzzy: "rule-003",
    };
    const ruleId = ruleIds[matchMethod];

    return {
      id: `attr-${num.toString().padStart(3, "0")}`,
      campaignId,
      contactId,
      matchMethod,
      confidence,
      createdAt: new Date(2025, 0, 10 + (i % 20)),
      ruleId,
    };
  }),
];

// Helper functions
export const getAttributionByCampaign = (campaignId: string): CampaignAttribution[] => {
  return CAMPAIGN_ATTRIBUTIONS.filter((attr) => attr.campaignId === campaignId);
};
