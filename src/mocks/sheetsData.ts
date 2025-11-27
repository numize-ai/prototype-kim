interface GoogleAccount {
  email: string;
  name: string;
  avatar: string;
  connectedAt: Date;
}

export interface SheetTab {
  id: string;
  name: string;
  rowCount: number;
  columnCount: number;
}

export interface GoogleSheet {
  id: string;
  name: string;
  url: string;
  lastModified: Date;
  tabs: SheetTab[];
}

export const mockGoogleAccount: GoogleAccount = {
  email: "analyst@company.com",
  name: "Data Analyst",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=analyst",
  connectedAt: new Date("2025-09-15T10:00:00"),
};

export const mockGoogleSheets: GoogleSheet[] = [
  {
    id: "1",
    name: "Q4 Revenue Analysis",
    url: "https://docs.google.com/spreadsheets/d/abc123",
    lastModified: new Date("2025-10-15T14:30:00"),
    tabs: [
      { id: "tab1", name: "Monthly Revenue", rowCount: 100, columnCount: 10 },
      { id: "tab2", name: "Quarterly Summary", rowCount: 50, columnCount: 8 },
      { id: "tab3", name: "YoY Comparison", rowCount: 75, columnCount: 6 },
    ],
  },
  {
    id: "2",
    name: "User Growth Dashboard",
    url: "https://docs.google.com/spreadsheets/d/def456",
    lastModified: new Date("2025-10-14T10:15:00"),
    tabs: [
      { id: "tab1", name: "Signups", rowCount: 200, columnCount: 12 },
      { id: "tab2", name: "Activation", rowCount: 150, columnCount: 8 },
      { id: "tab3", name: "Retention", rowCount: 120, columnCount: 10 },
    ],
  },
  {
    id: "3",
    name: "Product Performance",
    url: "https://docs.google.com/spreadsheets/d/ghi789",
    lastModified: new Date("2025-10-12T09:20:00"),
    tabs: [
      { id: "tab1", name: "Top Products", rowCount: 50, columnCount: 8 },
      { id: "tab2", name: "Categories", rowCount: 30, columnCount: 6 },
      { id: "tab3", name: "Trends", rowCount: 90, columnCount: 10 },
    ],
  },
  {
    id: "4",
    name: "Customer Insights",
    url: "https://docs.google.com/spreadsheets/d/jkl012",
    lastModified: new Date("2025-10-09T13:45:00"),
    tabs: [
      { id: "tab1", name: "Segments", rowCount: 80, columnCount: 15 },
      { id: "tab2", name: "AOV Analysis", rowCount: 60, columnCount: 10 },
      { id: "tab3", name: "Cohorts", rowCount: 100, columnCount: 12 },
    ],
  },
  {
    id: "5",
    name: "Retention Analysis",
    url: "https://docs.google.com/spreadsheets/d/mno345",
    lastModified: new Date("2025-10-13T16:45:00"),
    tabs: [
      { id: "tab1", name: "Cohorts", rowCount: 120, columnCount: 20 },
      { id: "tab2", name: "Weekly", rowCount: 200, columnCount: 15 },
      { id: "tab3", name: "Monthly", rowCount: 50, columnCount: 12 },
    ],
  },
  {
    id: "6",
    name: "Marketing Metrics",
    url: "https://docs.google.com/spreadsheets/d/pqr678",
    lastModified: new Date("2025-10-10T08:30:00"),
    tabs: [
      { id: "tab1", name: "Campaigns", rowCount: 150, columnCount: 18 },
      { id: "tab2", name: "Channels", rowCount: 100, columnCount: 12 },
      { id: "tab3", name: "ROI", rowCount: 80, columnCount: 10 },
    ],
  },
];

export interface SyncOptions {
  includeTimestamp: boolean;
  includeCellNote: boolean;
  syncMode: "append" | "overwrite";
}

export interface SheetSyncResult {
  success: boolean;
  sheetName: string;
  tabName: string;
  range: string;
  rowsInserted: number;
  timestamp: Date;
}

// Helper function to simulate sheet sync
export async function simulateSheetSync(
  sheetId: string,
  tabId: string,
  range: string,
  rowCount: number,
): Promise<SheetSyncResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sheet = mockGoogleSheets.find((sheetItem) => sheetItem.id === sheetId);
      const tab = sheet?.tabs.find((tabItem) => tabItem.id === tabId);

      resolve({
        success: true,
        sheetName: sheet?.name ?? "Unknown Sheet",
        tabName: tab?.name ?? "Unknown Tab",
        range,
        rowsInserted: rowCount,
        timestamp: new Date(),
      });
    }, 1500); // Simulate 1.5s delay for sync
  });
}
