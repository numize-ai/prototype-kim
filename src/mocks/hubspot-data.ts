/**
 * Mock data for HubSpot CRM (contacts, meetings, deals)
 */
/* eslint-disable max-lines */
/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

export interface HubSpotContact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  campaignId?: string; // Link to ad campaign
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  utmContent?: string;
  originalSource: string;
  createdAt: Date;
  lifecycleStage: "customer" | "lead" | "mql" | "opportunity" | "sql";
}

interface HubSpotMeeting {
  id: string;
  contactId: string;
  meetingDate: Date;
  outcome: "cancelled" | "completed" | "no-show" | "scheduled";
  notes?: string;
}

export interface HubSpotDeal {
  id: string;
  contactId: string;
  amount: number;
  stage: "closed-lost" | "closed-won" | "negotiation" | "proposal";
  closedAt?: Date;
  probability: number;
}

// Generate contacts with proper attribution
export const HUBSPOT_CONTACTS: HubSpotContact[] = [
  // Meta Lead Gen campaign contacts
  {
    id: "contact-001",
    email: "john.smith@techcorp.com",
    firstName: "John",
    lastName: "Smith",
    company: "TechCorp",
    campaignId: "meta-001",
    utmSource: "facebook",
    utmCampaign: "lead-gen-b2b",
    utmMedium: "cpc",
    utmContent: "lookalike-enterprise",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-15"),
    lifecycleStage: "sql",
  },
  {
    id: "contact-002",
    email: "sarah.johnson@financeai.com",
    firstName: "Sarah",
    lastName: "Johnson",
    company: "FinanceAI",
    campaignId: "meta-001",
    utmSource: "facebook",
    utmCampaign: "lead-gen-b2b",
    utmMedium: "cpc",
    utmContent: "interest-cfos",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-16"),
    lifecycleStage: "customer",
  },
  {
    id: "contact-003",
    email: "michael.brown@dataventures.com",
    firstName: "Michael",
    lastName: "Brown",
    company: "DataVentures",
    campaignId: "meta-001",
    utmSource: "facebook",
    utmCampaign: "lead-gen-b2b",
    utmMedium: "cpc",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-18"),
    lifecycleStage: "opportunity",
  },
  {
    id: "contact-004",
    email: "emily.davis@cloudify.io",
    firstName: "Emily",
    lastName: "Davis",
    company: "Cloudify",
    campaignId: "meta-001",
    utmSource: "facebook",
    utmCampaign: "lead-gen-b2b",
    utmMedium: "cpc",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-19"),
    lifecycleStage: "mql",
  },
  {
    id: "contact-005",
    email: "david.wilson@analyticsplus.com",
    firstName: "David",
    lastName: "Wilson",
    company: "Analytics Plus",
    campaignId: "meta-001",
    utmSource: "facebook",
    utmCampaign: "lead-gen-b2b",
    utmMedium: "cpc",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-20"),
    lifecycleStage: "customer",
  },

  // Meta Retargeting campaign contacts
  {
    id: "contact-006",
    email: "jennifer.martinez@saasflow.com",
    firstName: "Jennifer",
    lastName: "Martinez",
    company: "SaaSFlow",
    campaignId: "meta-002",
    utmSource: "facebook",
    utmCampaign: "retargeting-high-intent",
    utmMedium: "retargeting",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-12"),
    lifecycleStage: "customer",
  },
  {
    id: "contact-007",
    email: "robert.garcia@bizmetrics.com",
    firstName: "Robert",
    lastName: "Garcia",
    company: "BizMetrics",
    campaignId: "meta-002",
    utmSource: "facebook",
    utmCampaign: "retargeting-high-intent",
    utmMedium: "retargeting",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-14"),
    lifecycleStage: "opportunity",
  },
  {
    id: "contact-008",
    email: "lisa.anderson@revenueops.com",
    firstName: "Lisa",
    lastName: "Anderson",
    company: "RevenueOps",
    campaignId: "meta-002",
    utmSource: "facebook",
    utmCampaign: "retargeting-high-intent",
    utmMedium: "retargeting",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-16"),
    lifecycleStage: "customer",
  },

  // Meta Product Launch contacts
  {
    id: "contact-009",
    email: "william.taylor@growthhub.com",
    firstName: "William",
    lastName: "Taylor",
    company: "GrowthHub",
    campaignId: "meta-004",
    utmSource: "facebook",
    utmCampaign: "product-launch-q1",
    utmMedium: "cpc",
    utmContent: "video-features",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-22"),
    lifecycleStage: "sql",
  },
  {
    id: "contact-010",
    email: "karen.thomas@datadrive.com",
    firstName: "Karen",
    lastName: "Thomas",
    company: "DataDrive",
    campaignId: "meta-004",
    utmSource: "facebook",
    utmCampaign: "product-launch-q1",
    utmMedium: "cpc",
    utmContent: "carousel-usecases",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-23"),
    lifecycleStage: "customer",
  },
  {
    id: "contact-011",
    email: "james.jackson@insightful.ai",
    firstName: "James",
    lastName: "Jackson",
    company: "Insightful AI",
    campaignId: "meta-004",
    utmSource: "facebook",
    utmCampaign: "product-launch-q1",
    utmMedium: "cpc",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-24"),
    lifecycleStage: "opportunity",
  },

  // Google Search High Intent contacts
  {
    id: "contact-012",
    email: "patricia.white@enterprisesoft.com",
    firstName: "Patricia",
    lastName: "White",
    company: "EnterpriseSoft",
    campaignId: "google-001",
    utmSource: "google",
    utmCampaign: "search-high-intent",
    utmMedium: "cpc",
    utmContent: "branded",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-10"),
    lifecycleStage: "customer",
  },
  {
    id: "contact-013",
    email: "christopher.harris@cfosuite.com",
    firstName: "Christopher",
    lastName: "Harris",
    company: "CFO Suite",
    campaignId: "google-001",
    utmSource: "google",
    utmCampaign: "search-high-intent",
    utmMedium: "cpc",
    utmContent: "product-category",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-12"),
    lifecycleStage: "customer",
  },
  {
    id: "contact-014",
    email: "amanda.martin@financehq.com",
    firstName: "Amanda",
    lastName: "Martin",
    company: "FinanceHQ",
    campaignId: "google-001",
    utmSource: "google",
    utmCampaign: "search-high-intent",
    utmMedium: "cpc",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-14"),
    lifecycleStage: "opportunity",
  },
  {
    id: "contact-015",
    email: "matthew.thompson@revanalytics.com",
    firstName: "Matthew",
    lastName: "Thompson",
    company: "RevAnalytics",
    campaignId: "google-001",
    utmSource: "google",
    utmCampaign: "search-high-intent",
    utmMedium: "cpc",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-15"),
    lifecycleStage: "sql",
  },

  // Google Display Remarketing contacts
  {
    id: "contact-016",
    email: "michelle.moore@businessintel.com",
    firstName: "Michelle",
    lastName: "Moore",
    company: "Business Intel",
    campaignId: "google-002",
    utmSource: "google",
    utmCampaign: "display-remarketing",
    utmMedium: "display",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-18"),
    lifecycleStage: "customer",
  },
  {
    id: "contact-017",
    email: "daniel.lee@metricspro.com",
    firstName: "Daniel",
    lastName: "Lee",
    company: "MetricsPro",
    campaignId: "google-002",
    utmSource: "google",
    utmCampaign: "display-remarketing",
    utmMedium: "display",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-19"),
    lifecycleStage: "opportunity",
  },

  // Google Brand Protection contacts
  {
    id: "contact-018",
    email: "laura.walker@finmetrics.com",
    firstName: "Laura",
    lastName: "Walker",
    company: "FinMetrics",
    campaignId: "google-003",
    utmSource: "google",
    utmCampaign: "brand-protection",
    utmMedium: "cpc",
    utmContent: "brand-exact",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-20"),
    lifecycleStage: "customer",
  },
  {
    id: "contact-019",
    email: "kevin.hall@datapulse.com",
    firstName: "Kevin",
    lastName: "Hall",
    company: "DataPulse",
    campaignId: "google-003",
    utmSource: "google",
    utmCampaign: "brand-protection",
    utmMedium: "cpc",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-21"),
    lifecycleStage: "customer",
  },

  // Google YouTube contacts
  {
    id: "contact-020",
    email: "stephanie.allen@analysishub.com",
    firstName: "Stephanie",
    lastName: "Allen",
    company: "AnalysisHub",
    campaignId: "google-004",
    utmSource: "youtube",
    utmCampaign: "youtube-demos",
    utmMedium: "video",
    originalSource: "Paid Video",
    createdAt: new Date("2025-01-25"),
    lifecycleStage: "mql",
  },
  {
    id: "contact-021",
    email: "brian.young@insights360.com",
    firstName: "Brian",
    lastName: "Young",
    company: "Insights360",
    campaignId: "google-004",
    utmSource: "youtube",
    utmCampaign: "youtube-demos",
    utmMedium: "video",
    originalSource: "Paid Video",
    createdAt: new Date("2025-01-26"),
    lifecycleStage: "sql",
  },

  // Additional contacts across various campaigns (30 more for diversity)
  {
    id: "contact-022",
    email: "nancy.king@scalemetrics.com",
    firstName: "Nancy",
    lastName: "King",
    company: "ScaleMetrics",
    campaignId: "meta-001",
    utmSource: "facebook",
    utmCampaign: "lead-gen-b2b",
    utmMedium: "cpc",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-21"),
    lifecycleStage: "lead",
  },
  {
    id: "contact-023",
    email: "ryan.wright@businessops.com",
    firstName: "Ryan",
    lastName: "Wright",
    company: "BusinessOps",
    campaignId: "meta-002",
    utmSource: "facebook",
    utmCampaign: "retargeting-high-intent",
    utmMedium: "retargeting",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-17"),
    lifecycleStage: "opportunity",
  },
  {
    id: "contact-024",
    email: "sandra.lopez@financepro.com",
    firstName: "Sandra",
    lastName: "Lopez",
    company: "FinancePro",
    campaignId: "google-001",
    utmSource: "google",
    utmCampaign: "search-high-intent",
    utmMedium: "cpc",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-16"),
    lifecycleStage: "customer",
  },
  {
    id: "contact-025",
    email: "george.hill@revstream.com",
    firstName: "George",
    lastName: "Hill",
    company: "RevStream",
    campaignId: "google-009",
    utmSource: "google",
    utmCampaign: "pmax-all-channels",
    utmMedium: "pmax",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-27"),
    lifecycleStage: "sql",
  },
  {
    id: "contact-026",
    email: "angela.scott@cfovision.com",
    firstName: "Angela",
    lastName: "Scott",
    company: "CFO Vision",
    campaignId: "meta-004",
    utmSource: "facebook",
    utmCampaign: "product-launch-q1",
    utmMedium: "cpc",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-28"),
    lifecycleStage: "mql",
  },
  {
    id: "contact-027",
    email: "thomas.green@dashboardiq.com",
    firstName: "Thomas",
    lastName: "Green",
    company: "DashboardIQ",
    campaignId: "google-008",
    utmSource: "google",
    utmCampaign: "international-expansion",
    utmMedium: "cpc",
    utmContent: "uk-market",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-29"),
    lifecycleStage: "customer",
  },
  {
    id: "contact-028",
    email: "donna.baker@metricwise.com",
    firstName: "Donna",
    lastName: "Baker",
    company: "MetricWise",
    campaignId: "meta-001",
    utmSource: "facebook",
    utmCampaign: "lead-gen-b2b",
    utmMedium: "cpc",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-22"),
    lifecycleStage: "lead",
  },
  {
    id: "contact-029",
    email: "paul.adams@performiq.com",
    firstName: "Paul",
    lastName: "Adams",
    company: "PerformIQ",
    campaignId: "google-005",
    utmSource: "google",
    utmCampaign: "long-tail-keywords",
    utmMedium: "cpc",
    originalSource: "Paid Search",
    createdAt: new Date("2025-01-17"),
    lifecycleStage: "opportunity",
  },
  {
    id: "contact-030",
    email: "susan.nelson@datawise.ai",
    firstName: "Susan",
    lastName: "Nelson",
    company: "DataWise AI",
    campaignId: "meta-002",
    utmSource: "facebook",
    utmCampaign: "retargeting-high-intent",
    utmMedium: "retargeting",
    originalSource: "Paid Social",
    createdAt: new Date("2025-01-18"),
    lifecycleStage: "customer",
  },

  // Organic and Direct contacts (non-attributed)
  {
    id: "contact-031",
    email: "mark.carter@organicreach.com",
    firstName: "Mark",
    lastName: "Carter",
    company: "OrganicReach",
    originalSource: "Organic Search",
    createdAt: new Date("2025-01-10"),
    lifecycleStage: "lead",
  },
  {
    id: "contact-032",
    email: "carol.mitchell@directvisitor.com",
    firstName: "Carol",
    lastName: "Mitchell",
    company: "DirectVisitor",
    originalSource: "Direct Traffic",
    createdAt: new Date("2025-01-12"),
    lifecycleStage: "mql",
  },
  {
    id: "contact-033",
    email: "steven.perez@referral.com",
    firstName: "Steven",
    lastName: "Perez",
    company: "Referral Co",
    originalSource: "Referral",
    createdAt: new Date("2025-01-14"),
    lifecycleStage: "sql",
  },

  // More campaign-attributed contacts for volume
  ...Array.from({ length: 70 }, (_, i) => {
    const num = 34 + i;
    const campaignIds = ["meta-001", "meta-002", "meta-004", "google-001", "google-002", "google-003", "google-009"];
    const campaignId = campaignIds[i % campaignIds.length]!;
    const platform = campaignId.startsWith("meta") ? "facebook" : "google";
    const utmCampaign = campaignId.replace("-", "-campaign-");
    const stages: Array<"customer" | "lead" | "mql" | "opportunity" | "sql"> = [
      "lead",
      "mql",
      "sql",
      "opportunity",
      "customer",
    ];
    const stage = stages[i % stages.length]!;

    return {
      id: `contact-${num.toString().padStart(3, "0")}`,
      email: `user${num}@company${num}.com`,
      firstName: `First${num}`,
      lastName: `Last${num}`,
      company: `Company ${num}`,
      campaignId,
      utmSource: platform,
      utmCampaign,
      utmMedium: platform === "facebook" ? "cpc" : "cpc",
      originalSource: platform === "facebook" ? "Paid Social" : "Paid Search",
      createdAt: new Date(2025, 0, 10 + (i % 20)),
      lifecycleStage: stage,
    };
  }),
];

// Generate meetings for contacts
export const HUBSPOT_MEETINGS: HubSpotMeeting[] = [
  // Meetings for SQL and Opportunity contacts
  {
    id: "meeting-001",
    contactId: "contact-001",
    meetingDate: new Date("2025-01-20"),
    outcome: "completed",
    notes: "Great product fit, moving to proposal",
  },
  {
    id: "meeting-002",
    contactId: "contact-002",
    meetingDate: new Date("2025-01-22"),
    outcome: "completed",
    notes: "Budget approved, ready to close",
  },
  {
    id: "meeting-003",
    contactId: "contact-003",
    meetingDate: new Date("2025-01-24"),
    outcome: "completed",
    notes: "Need to discuss pricing options",
  },
  {
    id: "meeting-004",
    contactId: "contact-007",
    meetingDate: new Date("2025-01-21"),
    outcome: "completed",
    notes: "Technical deep dive completed",
  },
  {
    id: "meeting-005",
    contactId: "contact-008",
    meetingDate: new Date("2025-01-23"),
    outcome: "completed",
    notes: "Contract under review",
  },
  {
    id: "meeting-006",
    contactId: "contact-009",
    meetingDate: new Date("2025-01-26"),
    outcome: "completed",
    notes: "Demo scheduled for decision makers",
  },
  {
    id: "meeting-007",
    contactId: "contact-010",
    meetingDate: new Date("2025-01-28"),
    outcome: "completed",
    notes: "Moving to negotiation phase",
  },
  {
    id: "meeting-008",
    contactId: "contact-011",
    meetingDate: new Date("2025-01-29"),
    outcome: "scheduled",
    notes: "Upcoming discovery call",
  },
  {
    id: "meeting-009",
    contactId: "contact-012",
    meetingDate: new Date("2025-01-17"),
    outcome: "completed",
    notes: "Contract signed",
  },
  {
    id: "meeting-010",
    contactId: "contact-013",
    meetingDate: new Date("2025-01-19"),
    outcome: "completed",
    notes: "Implementation kickoff",
  },
  {
    id: "meeting-011",
    contactId: "contact-014",
    meetingDate: new Date("2025-01-21"),
    outcome: "completed",
    notes: "Security review in progress",
  },
  {
    id: "meeting-012",
    contactId: "contact-015",
    meetingDate: new Date("2025-01-23"),
    outcome: "no-show",
    notes: "Rescheduling needed",
  },
  {
    id: "meeting-013",
    contactId: "contact-016",
    meetingDate: new Date("2025-01-25"),
    outcome: "completed",
    notes: "Final approval obtained",
  },
  {
    id: "meeting-014",
    contactId: "contact-017",
    meetingDate: new Date("2025-01-27"),
    outcome: "completed",
    notes: "Proposal sent",
  },
  {
    id: "meeting-015",
    contactId: "contact-018",
    meetingDate: new Date("2025-01-26"),
    outcome: "completed",
    notes: "Deal closed successfully",
  },
  {
    id: "meeting-016",
    contactId: "contact-019",
    meetingDate: new Date("2025-01-28"),
    outcome: "completed",
    notes: "Onboarding scheduled",
  },
  {
    id: "meeting-017",
    contactId: "contact-023",
    meetingDate: new Date("2025-01-24"),
    outcome: "completed",
    notes: "Technical requirements discussed",
  },
  {
    id: "meeting-018",
    contactId: "contact-024",
    meetingDate: new Date("2025-01-23"),
    outcome: "completed",
    notes: "Contract finalized",
  },
  {
    id: "meeting-019",
    contactId: "contact-025",
    meetingDate: new Date("2025-02-02"),
    outcome: "scheduled",
    notes: "Demo meeting scheduled",
  },
  {
    id: "meeting-020",
    contactId: "contact-027",
    meetingDate: new Date("2025-02-04"),
    outcome: "completed",
    notes: "International expansion discussion",
  },

  // Additional meetings for volume (40 more)
  ...Array.from({ length: 40 }, (_, i) => {
    const num = 21 + i;
    const contactNum = 34 + i * 2;
    const outcomes: Array<"cancelled" | "completed" | "no-show" | "scheduled"> = [
      "completed",
      "completed",
      "completed",
      "no-show",
      "cancelled",
    ];
    const outcome = outcomes[i % outcomes.length]!;

    const meeting: HubSpotMeeting = {
      id: `meeting-${num.toString().padStart(3, "0")}`,
      contactId: `contact-${contactNum.toString().padStart(3, "0")}`,
      meetingDate: new Date(2025, 0, 15 + (i % 15)),
      outcome,
    };

    if (outcome === "completed") {
      meeting.notes = "Meeting completed successfully";
    }

    return meeting;
  }),
];

// Generate deals for customers and opportunities
export const HUBSPOT_DEALS: HubSpotDeal[] = [
  // Closed-won deals
  {
    id: "deal-001",
    contactId: "contact-002",
    amount: 48000,
    stage: "closed-won",
    closedAt: new Date("2025-01-25"),
    probability: 100,
  },
  {
    id: "deal-002",
    contactId: "contact-005",
    amount: 72000,
    stage: "closed-won",
    closedAt: new Date("2025-01-27"),
    probability: 100,
  },
  {
    id: "deal-003",
    contactId: "contact-006",
    amount: 36000,
    stage: "closed-won",
    closedAt: new Date("2025-01-18"),
    probability: 100,
  },
  {
    id: "deal-004",
    contactId: "contact-008",
    amount: 96000,
    stage: "closed-won",
    closedAt: new Date("2025-01-26"),
    probability: 100,
  },
  {
    id: "deal-005",
    contactId: "contact-010",
    amount: 120000,
    stage: "closed-won",
    closedAt: new Date("2025-01-30"),
    probability: 100,
  },
  {
    id: "deal-006",
    contactId: "contact-012",
    amount: 84000,
    stage: "closed-won",
    closedAt: new Date("2025-01-20"),
    probability: 100,
  },
  {
    id: "deal-007",
    contactId: "contact-013",
    amount: 108000,
    stage: "closed-won",
    closedAt: new Date("2025-01-22"),
    probability: 100,
  },
  {
    id: "deal-008",
    contactId: "contact-016",
    amount: 60000,
    stage: "closed-won",
    closedAt: new Date("2025-01-28"),
    probability: 100,
  },
  {
    id: "deal-009",
    contactId: "contact-018",
    amount: 72000,
    stage: "closed-won",
    closedAt: new Date("2025-01-29"),
    probability: 100,
  },
  {
    id: "deal-010",
    contactId: "contact-019",
    amount: 48000,
    stage: "closed-won",
    closedAt: new Date("2025-01-30"),
    probability: 100,
  },
  {
    id: "deal-011",
    contactId: "contact-024",
    amount: 90000,
    stage: "closed-won",
    closedAt: new Date("2025-01-24"),
    probability: 100,
  },
  {
    id: "deal-012",
    contactId: "contact-027",
    amount: 156000,
    stage: "closed-won",
    closedAt: new Date("2025-02-01"),
    probability: 100,
  },
  {
    id: "deal-013",
    contactId: "contact-030",
    amount: 78000,
    stage: "closed-won",
    closedAt: new Date("2025-01-25"),
    probability: 100,
  },

  // In-progress deals (negotiation/proposal)
  { id: "deal-014", contactId: "contact-003", amount: 54000, stage: "negotiation", probability: 70 },
  { id: "deal-015", contactId: "contact-007", amount: 66000, stage: "proposal", probability: 50 },
  { id: "deal-016", contactId: "contact-011", amount: 42000, stage: "proposal", probability: 40 },
  { id: "deal-017", contactId: "contact-014", amount: 84000, stage: "negotiation", probability: 65 },
  { id: "deal-018", contactId: "contact-017", amount: 96000, stage: "proposal", probability: 55 },
  { id: "deal-019", contactId: "contact-023", amount: 72000, stage: "negotiation", probability: 75 },

  // Closed-lost deals
  {
    id: "deal-020",
    contactId: "contact-015",
    amount: 48000,
    stage: "closed-lost",
    closedAt: new Date("2025-01-26"),
    probability: 0,
  },

  // Additional deals for volume
  ...Array.from({ length: 10 }, (_, i) => {
    const num = 21 + i;
    const contactNum = 50 + i * 5;
    const amounts = [48000, 60000, 72000, 84000, 96000, 120000];
    const amount = amounts[i % amounts.length];
    const isWon = i % 3 !== 2;

    return {
      id: `deal-${num.toString().padStart(3, "0")}`,
      contactId: `contact-${contactNum.toString().padStart(3, "0")}`,
      amount,
      stage: isWon ? "closed-won" : "proposal",
      closedAt: isWon ? new Date(2025, 0, 20 + (i % 10)) : undefined,
      probability: isWon ? 100 : 50,
    } as HubSpotDeal;
  }),
];
