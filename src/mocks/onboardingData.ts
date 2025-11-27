import type { SemanticSlice } from "~app/onboard/components/SemanticLayerStep";
import type { ToolConfig } from "~app/onboard/components/ToolsConfigurationStep";

export interface DbtProjectInfo {
  importMethod: "git" | "upload";
  gitRepoUrl?: string;
  gitBranch?: string;
  manifestFileName?: string;
  lastImportedAt?: Date;
  modelsCount: number;
  selectedModelsCount: number;
}

export const mockDbtProjectInfo: DbtProjectInfo = {
  importMethod: "git",
  gitRepoUrl: "https://github.com/company/dbt-analytics",
  gitBranch: "main",
  lastImportedAt: new Date("2025-11-25T10:00:00"),
  modelsCount: 42,
  selectedModelsCount: 18,
};

export const mockSemanticSlices: SemanticSlice[] = [
  {
    id: "slice-1",
    name: "Marketing Analytics",
    team: "marketing",
    description: "Access to marketing campaign performance, user acquisition, and conversion metrics",
    models: ["marts_marketing__campaigns", "marts_marketing__user_acquisition", "marts_marketing__leads"],
    metrics: ["Campaign ROI", "Lead conversion rate", "CAC", "MQL to SQL rate"],
    dimensions: ["Campaign type", "Channel", "Country", "Device type"],
  },
  {
    id: "slice-2",
    name: "Product Analytics",
    team: "product",
    description: "Product usage, feature adoption, and user engagement data",
    models: ["marts_product__feature_usage", "marts_product__user_activity", "marts_product__retention"],
    metrics: ["DAU/MAU ratio", "Feature adoption rate", "User retention"],
    dimensions: ["Feature name", "User cohort", "Plan type", "Platform"],
  },
  {
    id: "slice-3",
    name: "Finance Metrics",
    team: "finance",
    description: "Revenue, financial KPIs, and business performance metrics",
    models: ["marts_finance__revenue", "marts_finance__subscriptions"],
    metrics: ["Revenue growth", "Gross margin", "ARR/MRR"],
    dimensions: ["Product line", "Customer segment", "Contract type"],
  },
];

export const mockToolsConfig: ToolConfig[] = [
  {
    id: "brevo",
    name: "Brevo",
    enabled: true,
    apiKey: "brevo_***************",
    verified: true,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    enabled: true,
    apiKey: "hubspot_***************",
    verified: true,
  },
  {
    id: "zapier",
    name: "Zapier",
    enabled: false,
  },
  {
    id: "n8n",
    name: "n8n",
    enabled: false,
  },
];

export interface OnboardingProgress {
  isCompleted: boolean;
  currentStep: number;
  completedSteps: number[];
  completedAt?: Date;
}

export const mockOnboardingProgress: OnboardingProgress = {
  isCompleted: true,
  currentStep: 4,
  completedSteps: [1, 2, 3, 4],
  completedAt: new Date("2025-11-15T14:30:00"),
};
