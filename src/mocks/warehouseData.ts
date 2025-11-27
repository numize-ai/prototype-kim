export interface WarehouseConnection {
  id: string;
  name: string;
  type: "bigquery" | "databricks" | "postgresql" | "redshift" | "snowflake";
  status: "connected" | "disconnected" | "error";
  host?: string;
  database: string;
  connectedAt: Date;
  lastTestedAt?: Date;
  tablesDiscovered: number;
  dbtEnabled: boolean;
  schema?: string;
}

export const mockWarehouseConnections: WarehouseConnection[] = [
  {
    id: "1",
    name: "Production Data Warehouse",
    type: "snowflake",
    status: "connected",
    host: "company.snowflakecomputing.com",
    database: "analytics_prod",
    connectedAt: new Date("2025-09-15T10:00:00"),
    lastTestedAt: new Date("2025-11-27T08:00:00"),
    tablesDiscovered: 127,
    dbtEnabled: true,
    schema: "public",
  },
  {
    id: "2",
    name: "Analytics BigQuery",
    type: "bigquery",
    status: "connected",
    database: "company-analytics",
    connectedAt: new Date("2025-08-20T14:30:00"),
    lastTestedAt: new Date("2025-11-26T15:00:00"),
    tablesDiscovered: 89,
    dbtEnabled: false,
  },
];

export const warehouseTypes = [
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "🐘",
    description: "Open source relational database",
    port: "5432",
  },
  {
    id: "snowflake",
    name: "Snowflake",
    icon: "❄️",
    description: "Cloud data warehouse platform",
    port: "443",
  },
  {
    id: "bigquery",
    name: "BigQuery",
    icon: "📊",
    description: "Google Cloud data warehouse",
    port: "",
  },
  {
    id: "redshift",
    name: "Amazon Redshift",
    icon: "🟠",
    description: "AWS data warehouse solution",
    port: "5439",
  },
  {
    id: "databricks",
    name: "Databricks",
    icon: "🧱",
    description: "Unified analytics platform",
    port: "443",
  },
];
