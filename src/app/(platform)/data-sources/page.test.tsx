import { render, screen } from "~/__test__/test-utils";
import userSlice from "~store/slices/userSlice";

import DataSourcesPage from "./page";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

// Mock DataSourcesContent component
jest.mock("~/components/data-sources", () => ({
  DataSourcesContent: jest.fn(({ showOnboardingProgress }: { showOnboardingProgress?: boolean }) => (
    <div data-testid="data-sources-content">
      DataSourcesContent Component
      {Boolean(showOnboardingProgress) && <div data-testid="onboarding-progress-prop">Showing Onboarding Progress</div>}
    </div>
  )),
}));

describe("DataSourcesPage", () => {
  const createMockStore = (onboardingComplete: boolean) => {
    return configureStore({
      reducer: {
        user: userSlice,
      },
      preloadedState: {
        user: {
          firstConnectionAt: null,
          onboardingComplete,
          dismissedBanners: [],
        },
      },
    });
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the page header correctly", () => {
    const store = createMockStore(true);
    render(
      <Provider store={store}>
        <DataSourcesPage />
      </Provider>,
    );

    expect(screen.getByText("Data Sources Configuration")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your data warehouse connections, dbt projects, semantic layer, and AI agent tools"),
    ).toBeInTheDocument();
  });

  it("should render DataSourcesContent component", () => {
    const store = createMockStore(true);
    render(
      <Provider store={store}>
        <DataSourcesPage />
      </Provider>,
    );

    expect(screen.getByTestId("data-sources-content")).toBeInTheDocument();
    expect(screen.getByTestId("onboarding-progress-prop")).toBeInTheDocument();
  });

  it("should not show onboarding banner when onboarding is complete", () => {
    const store = createMockStore(true);
    render(
      <Provider store={store}>
        <DataSourcesPage />
      </Provider>,
    );

    expect(screen.queryByText("Onboarding not complete")).not.toBeInTheDocument();
  });

  it("should show onboarding banner when onboarding is not complete", () => {
    const store = createMockStore(false);
    render(
      <Provider store={store}>
        <DataSourcesPage />
      </Provider>,
    );

    expect(screen.getByText("Onboarding not complete")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Complete the onboarding process to set up your data sources and unlock Numize's full capabilities.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /complete onboarding/iu })).toBeInTheDocument();
  });

  it("should have accessible heading structure", () => {
    const store = createMockStore(true);
    render(
      <Provider store={store}>
        <DataSourcesPage />
      </Provider>,
    );

    const heading = screen.getByRole("heading", { level: 1, name: "Data Sources Configuration" });
    expect(heading).toBeInTheDocument();
  });

  it("should pass showOnboardingProgress prop to DataSourcesContent", () => {
    const store = createMockStore(true);
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const { DataSourcesContent } = require("~/components/data-sources") as {
      DataSourcesContent: jest.Mock;
    };

    render(
      <Provider store={store}>
        <DataSourcesPage />
      </Provider>,
    );

    expect(DataSourcesContent).toHaveBeenCalledWith(
      expect.objectContaining({
        showOnboardingProgress: true,
      }),
      expect.anything(),
    );
  });
});
