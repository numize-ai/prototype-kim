"use client";

import React, { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

import { AlertCircle, CheckCircle2, Database, Loader2 } from "lucide-react";

export interface DataSourceConfig {
  warehouseType: string;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  schema?: string;
  additionalParams?: string;
}

interface DataSourceStepProps {
  config: DataSourceConfig;
  onChange: (config: DataSourceConfig) => void;
  onTest: () => Promise<boolean>;
}

const WAREHOUSE_TYPES = [
  { value: "postgresql", label: "PostgreSQL", icon: "🐘", port: "5432" },
  { value: "snowflake", label: "Snowflake", icon: "❄️", port: "443" },
  { value: "bigquery", label: "BigQuery", icon: "📊", port: "" },
  { value: "redshift", label: "Amazon Redshift", icon: "🟠", port: "5439" },
  { value: "databricks", label: "Databricks", icon: "🧱", port: "443" },
];

const DataSourceStep: React.FC<DataSourceStepProps> = ({ config, onChange, onTest }) => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<"error" | "success" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (field: keyof DataSourceConfig, value: string) => {
    onChange({ ...config, [field]: value });
    // Reset test result when config changes
    if (testResult !== null) {
      setTestResult(null);
      setErrorMessage("");
    }
  };

  const handleWarehouseTypeChange = (value: string) => {
    const warehouse = WAREHOUSE_TYPES.find((w) => w.value === value);
    onChange({
      ...config,
      warehouseType: value,
      port: warehouse?.port || "",
    });
    setTestResult(null);
    setErrorMessage("");
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    setErrorMessage("");

    try {
      const success = await onTest();
      setTestResult(success ? "success" : "error");
      if (!success) {
        setErrorMessage("Failed to connect. Please check your credentials and try again.");
      }
    } catch (error) {
      setTestResult("error");
      setErrorMessage(error instanceof Error ? error.message : "Connection test failed");
    } finally {
      setIsTesting(false);
    }
  };

  const isFormValid =
    config.warehouseType && config.host && config.port && config.database && config.username && config.password;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
            <Database className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Configure Data Source</h2>
            <p className="text-sm text-slate-600">Connect to your data warehouse to enable AI-powered analytics</p>
          </div>
        </div>
      </div>

      {/* Main form card */}
      <Card>
        <CardHeader>
          <CardTitle>Warehouse Connection</CardTitle>
          <CardDescription>
            Enter your data warehouse credentials. All credentials are encrypted and stored securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Warehouse Type */}
          <div className="space-y-2">
            <Label htmlFor="warehouseType">
              Warehouse Type <span className="text-red-500">*</span>
            </Label>
            <Select value={config.warehouseType} onValueChange={handleWarehouseTypeChange}>
              <SelectTrigger id="warehouseType">
                <SelectValue placeholder="Select a warehouse type" />
              </SelectTrigger>
              <SelectContent>
                {WAREHOUSE_TYPES.map((warehouse) => (
                  <SelectItem key={warehouse.value} value={warehouse.value}>
                    <div className="flex items-center gap-2">
                      <span>{warehouse.icon}</span>
                      <span>{warehouse.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Host and Port */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="host">
                Host <span className="text-red-500">*</span>
              </Label>
              <Input
                id="host"
                placeholder="e.g., mywarehouse.region.provider.com"
                value={config.host}
                onChange={(e) => {
                  handleInputChange("host", e.target.value);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">
                Port <span className="text-red-500">*</span>
              </Label>
              <Input
                id="port"
                placeholder="5432"
                value={config.port}
                onChange={(e) => {
                  handleInputChange("port", e.target.value);
                }}
              />
            </div>
          </div>

          {/* Database */}
          <div className="space-y-2">
            <Label htmlFor="database">
              Database <span className="text-red-500">*</span>
            </Label>
            <Input
              id="database"
              placeholder="e.g., analytics_db"
              value={config.database}
              onChange={(e) => {
                handleInputChange("database", e.target.value);
              }}
            />
          </div>

          {/* Schema (optional) */}
          <div className="space-y-2">
            <Label htmlFor="schema">
              Schema <span className="text-slate-400">(optional)</span>
            </Label>
            <Input
              id="schema"
              placeholder="e.g., public"
              value={config.schema || ""}
              onChange={(e) => {
                handleInputChange("schema", e.target.value);
              }}
            />
          </div>

          {/* Username and Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">
                Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                placeholder="username"
                value={config.username}
                onChange={(e) => {
                  handleInputChange("username", e.target.value);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={config.password}
                onChange={(e) => {
                  handleInputChange("password", e.target.value);
                }}
              />
            </div>
          </div>

          {/* Additional Parameters (optional) */}
          <div className="space-y-2">
            <Label htmlFor="additionalParams">
              Additional Parameters <span className="text-slate-400">(optional)</span>
            </Label>
            <Textarea
              id="additionalParams"
              placeholder="e.g., sslmode=require&connect_timeout=10"
              value={config.additionalParams || ""}
              onChange={(e) => {
                handleInputChange("additionalParams", e.target.value);
              }}
              rows={2}
            />
            <p className="text-xs text-slate-500">Key-value pairs for additional connection parameters</p>
          </div>

          {/* Test Connection Button */}
          <div className="pt-4">
            <Button
              onClick={handleTestConnection}
              disabled={!isFormValid || isTesting}
              variant="outline"
              className="w-full md:w-auto"
            >
              {isTesting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Testing Connection...
                </>
              ) : (
                <>Test Connection</>
              )}
            </Button>
          </div>

          {/* Test Result */}
          {testResult === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle2 className="size-5 text-green-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-900">Connection successful!</p>
                <p className="text-xs text-green-700">Your data warehouse is properly configured.</p>
              </div>
            </div>
          )}

          {testResult === "error" && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="size-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900">Connection failed</p>
                <p className="text-xs text-red-700">{errorMessage}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security note */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-900 border-blue-200">
              Secure
            </Badge>
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium">Your credentials are encrypted</p>
              <p className="text-xs text-blue-700 mt-1">
                All warehouse credentials are encrypted at rest and in transit using industry-standard AES-256
                encryption. Only authorized services can access your data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSourceStep;
