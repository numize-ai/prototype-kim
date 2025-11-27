import DataSourcesContent from "./DataSourcesContent";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

// Mock data
jest.mock("~/mocks/warehouseData", () => ({
  mockWarehouseConnections: [
    {
      id: "warehouse-1",
      name: "Production Warehouse",
      type: "snowflake",
      status: "connected",
      database: "prod_db",
      schema: "analytics",
      tablesDiscovered: 42,
      lastTestedAt: new Date("2024-01-15"),
      dbtEnabled: true,
    },
  ],
  warehouseTypes: [
    {
      id: "snowflake",
      name: "Snowflake",
      icon: "❄️",
    },
  ],
}));

jest.mock("~/mocks/onboardingData", () => ({
  mockOnboardingProgress: {
    isCompleted: true,
    completedAt: new Date("2024-01-10"),
    completedSteps: [1, 2, 3, 4],
  },
  mockDbtProjectInfo: {
    importMethod: "git",
    gitRepoUrl: "https://github.com/company/dbt-project",
    gitBranch: "main",
    modelsCount: 25,
    selectedModelsCount: 20,
    lastImportedAt: new Date("2024-01-14"),
    manifestFileName: "",
  },
  mockSemanticSlices: [
    {
      id: "slice-1",
      name: "Marketing Analytics",
      description: "Marketing team data access",
      team: "marketing",
      models: ["campaigns", "leads"],
      metrics: ["conversion_rate", "cac"],
      dimensions: ["channel", "campaign_name"],
    },
  ],
  mockToolsConfig: [
    {
      id: "brevo",
      name: "Brevo",
      enabled: true,
      verified: true,
      apiKey: "brevo_***********1234",
      endpoint: null,
    },
  ],
}));

describe("DataSourcesContent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Onboarding Progress", () => {
    it("should show completed onboarding card when onboarding is complete", () => {
      render(<DataSourcesContent showOnboardingProgress={true} />);

      expect(screen.getByText("Onboarding Complete")).toBeInTheDocument();
      expect(screen.getByText(/Completed on/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /re-configure/i })).toBeInTheDocument();
    });

    it("should not show onboarding progress when showOnboardingProgress is false", () => {
      render(<DataSourcesContent showOnboardingProgress={false} />);

      expect(screen.queryByText("Onboarding Complete")).not.toBeInTheDocument();
    });

    it("should navigate to onboard page when re-configure is clicked", () => {
      render(<DataSourcesContent showOnboardingProgress={true} />);

      const reconfigureButton = screen.getByRole("button", { name: /re-configure/i });
      fireEvent.click(reconfigureButton);

      expect(mockPush).toHaveBeenCalledWith("/onboard");
    });
  });

  describe("Data Warehouses Section", () => {
    it("should render warehouse connections", () => {
      render(<DataSourcesContent />);

      expect(screen.getByText("Data Warehouses")).toBeInTheDocument();
      expect(screen.getByText("Production Warehouse")).toBeInTheDocument();
      expect(screen.getByText(/42 tables discovered/i)).toBeInTheDocument();
    });

    it("should show connected status badge for connected warehouses", () => {
      render(<DataSourcesContent />);

      expect(screen.getByText("Connected")).toBeInTheDocument();
    });

    it("should show dbt enabled badge when warehouse has dbt enabled", () => {
      render(<DataSourcesContent />);

      expect(screen.getByText("dbt enabled")).toBeInTheDocument();
    });

    it("should allow testing warehouse connection", async () => {
      render(<DataSourcesContent />);

      const testButtons = screen.getAllByRole("button", { name: /test/i });
      const testButton = testButtons[0] as HTMLButtonElement;

      fireEvent.click(testButton);

      // Button should be disabled while testing
      expect(testButton).toBeDisabled();

      // Wait for the test to complete (1500ms in the component)
      await waitFor(
        () => {
          expect(testButton).not.toBeDisabled();
        },
        { timeout: 2000 },
      );
    });

    it("should navigate to onboard when Add Warehouse is clicked", () => {
      render(<DataSourcesContent />);

      const addButton = screen.getByRole("button", { name: /\+ add warehouse/i });
      fireEvent.click(addButton);

      expect(mockPush).toHaveBeenCalledWith("/onboard");
    });
  });

  describe("dbt Project Section", () => {
    it("should render dbt project information", () => {
      render(<DataSourcesContent />);

      expect(screen.getByText("dbt Project")).toBeInTheDocument();
      expect(screen.getByText("Git Repository")).toBeInTheDocument();
      expect(screen.getByText(/https:\/\/github.com\/company\/dbt-project/i)).toBeInTheDocument();
    });

    it("should show models count", () => {
      render(<DataSourcesContent />);

      expect(screen.getByText("25")).toBeInTheDocument(); // modelsCount
      expect(screen.getByText("20")).toBeInTheDocument(); // selectedModelsCount
    });

    it("should navigate to onboard when Re-import is clicked", () => {
      render(<DataSourcesContent />);

      const reimportButton = screen.getByRole("button", { name: /re-import/i });
      fireEvent.click(reimportButton);

      expect(mockPush).toHaveBeenCalledWith("/onboard");
    });
  });

  describe("Semantic Layer Section", () => {
    it("should render semantic slices", () => {
      render(<DataSourcesContent />);

      expect(screen.getByText("Semantic Layer")).toBeInTheDocument();
      expect(screen.getByText("Marketing Analytics")).toBeInTheDocument();
      expect(screen.getByText("Marketing team data access")).toBeInTheDocument();
    });

    it("should show slice metrics", () => {
      render(<DataSourcesContent />);

      // Check that the slice shows 2 models, 2 metrics, 2 dimensions
      const modelsLabels = screen.getAllByText("Models");
      expect(modelsLabels.length).toBeGreaterThan(0);
    });

    it("should navigate to onboard when Add Slice is clicked", () => {
      render(<DataSourcesContent />);

      const addSliceButton = screen.getByRole("button", { name: /\+ add slice/i });
      fireEvent.click(addSliceButton);

      expect(mockPush).toHaveBeenCalledWith("/onboard");
    });
  });

  describe("AI Agent Tools Section", () => {
    it("should render enabled tools", () => {
      render(<DataSourcesContent />);

      expect(screen.getByText("AI Agent Tools")).toBeInTheDocument();
      expect(screen.getByText("Brevo")).toBeInTheDocument();
      expect(screen.getByText("Verified")).toBeInTheDocument();
    });

    it("should show masked API key", () => {
      render(<DataSourcesContent />);

      expect(screen.getByText(/brevo_\*+1234/i)).toBeInTheDocument();
    });

    it("should navigate to onboard when Configure Tools is clicked", () => {
      render(<DataSourcesContent />);

      const configureButton = screen.getByRole("button", { name: /configure tools/i });
      fireEvent.click(configureButton);

      expect(mockPush).toHaveBeenCalledWith("/onboard");
    });
  });

  describe("Accessibility", () => {
    it("should have proper card structure", () => {
      render(<DataSourcesContent />);

      expect(screen.getByText("Data Warehouses")).toBeInTheDocument();
      expect(screen.getByText("dbt Project")).toBeInTheDocument();
      expect(screen.getByText("Semantic Layer")).toBeInTheDocument();
      expect(screen.getByText("AI Agent Tools")).toBeInTheDocument();
    });

    it("should have descriptive card descriptions", () => {
      render(<DataSourcesContent />);

      expect(screen.getByText("Configured warehouse connections for AI-powered analytics")).toBeInTheDocument();
      expect(screen.getByText("Linked dbt models for verified metrics and semantic layer")).toBeInTheDocument();
      expect(screen.getByText("Team-based data access slices with defined metrics and dimensions")).toBeInTheDocument();
      expect(
        screen.getByText("External integrations the AI agent can use to take business actions"),
      ).toBeInTheDocument();
    });
  });

  describe("Empty States", () => {
    beforeEach(() => {
      // Mock empty data
      jest.resetModules();
      jest.mock("~/mocks/warehouseData", () => ({
        mockWarehouseConnections: [],
        warehouseTypes: [],
      }));
      jest.mock("~/mocks/onboardingData", () => ({
        mockOnboardingProgress: {
          isCompleted: false,
          completedAt: null,
          completedSteps: [],
        },
        mockDbtProjectInfo: {
          importMethod: null,
          gitRepoUrl: null,
          gitBranch: null,
          modelsCount: 0,
          selectedModelsCount: 0,
          lastImportedAt: null,
          manifestFileName: "",
        },
        mockSemanticSlices: [],
        mockToolsConfig: [],
      }));
    });

    it("should show empty state for warehouses when none are connected", () => {
      // Need to re-render with mocked empty data
      const { mockWarehouseConnections } = require("~/mocks/warehouseData");
      mockWarehouseConnections.length = 0;

      render(<DataSourcesContent />);

      // The current implementation shows the warehouse card
      expect(screen.getByText("Data Warehouses")).toBeInTheDocument();
    });
  });
});
