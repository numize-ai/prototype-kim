/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use client";

import * as React from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  mockDbtProjectInfo,
  mockOnboardingProgress,
  mockSemanticSlices,
  mockToolsConfig,
} from "~/mocks/onboardingData";
import { mockWarehouseConnections, warehouseTypes } from "~/mocks/warehouseData";

import { formatDistanceToNow } from "date-fns";
import {
  Briefcase,
  CheckCircle2,
  Database,
  FileJson,
  GitBranch,
  Layers,
  Mail,
  RefreshCw,
  Settings,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Upload,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

const TEAM_ICONS = {
  marketing: TrendingUp,
  product: Layers,
  ops: Briefcase,
  finance: Users,
};

const TEAM_COLORS = {
  marketing: "from-pink-600 to-pink-700",
  product: "from-indigo-600 to-indigo-700",
  ops: "from-emerald-600 to-emerald-700",
  finance: "from-amber-600 to-amber-700",
};

const TOOL_ICONS = {
  brevo: Mail,
  hubspot: ShoppingCart,
  zapier: Zap,
  n8n: Workflow,
};

interface DataSourcesContentProps {
  /**
   * Whether to show the onboarding progress card
   * @default true
   */
  showOnboardingProgress?: boolean;
}

/**
 * DataSourcesContent component displays comprehensive data source configuration
 * including warehouse connections, dbt project, semantic layer, and AI agent tools.
 */
const DataSourcesContent: React.FC<DataSourcesContentProps> = ({ showOnboardingProgress = true }) => {
  const router = useRouter();
  const [testingWarehouse, setTestingWarehouse] = React.useState<string | null>(null);

  const handleTestConnection = async (warehouseId: string): Promise<void> => {
    setTestingWarehouse(warehouseId);
    // Simulate API call
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
    setTestingWarehouse(null);
  };

  const onboardingProgress = mockOnboardingProgress;
  const hasWarehouses = mockWarehouseConnections.length > 0;
  const hasDbtProject = mockDbtProjectInfo.selectedModelsCount > 0;
  const hasSemanticSlices = mockSemanticSlices.length > 0;
  const hasTools = mockToolsConfig.filter((tool) => tool.enabled).length > 0;

  return (
    <div className="space-y-6">
      {/* Onboarding Progress Card */}
      {showOnboardingProgress && onboardingProgress.isCompleted && (
        <Card className="border-green-200 bg-green-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="size-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-900">Onboarding Complete</p>
                  <p className="text-xs text-green-700">
                    Completed on {onboardingProgress.completedAt?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push("/onboard");
                }}
              >
                <Settings className="size-4 mr-2" />
                Re-configure
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showOnboardingProgress && !onboardingProgress.isCompleted && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Settings className="size-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900">Complete your setup</p>
                  <p className="text-xs text-blue-700">
                    {onboardingProgress.completedSteps.length} of 4 steps completed
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  router.push("/onboard");
                }}
              >
                Continue Setup
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Connected Warehouses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Database className="size-5 text-slate-600" />
                <CardTitle>Data Warehouses</CardTitle>
              </div>
              <CardDescription>Configured warehouse connections for AI-powered analytics</CardDescription>
            </div>
            {hasWarehouses && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push("/onboard");
                }}
              >
                + Add Warehouse
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasWarehouses ? (
            <>
              {mockWarehouseConnections.map((warehouse) => {
                const warehouseType = warehouseTypes.find((type) => type.id === warehouse.type);
                const isTesting = testingWarehouse === warehouse.id;

                return (
                  <div
                    key={warehouse.id}
                    className="flex items-start justify-between p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-2xl shrink-0">
                        {warehouseType?.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-slate-900">{warehouse.name}</h3>
                          <Badge
                            variant={warehouse.status === "connected" ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {warehouse.status === "connected" ? (
                              <>
                                <CheckCircle2 className="size-3 mr-1" />
                                Connected
                              </>
                            ) : (
                              warehouse.status
                            )}
                          </Badge>
                          {warehouse.dbtEnabled && (
                            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-900">
                              <FileJson className="size-3 mr-1" />
                              dbt enabled
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 space-y-0.5">
                          <p className="text-sm text-slate-600">
                            {warehouseType?.name ?? "Unknown"} • {warehouse.database}
                            {warehouse.schema ? ` • ${warehouse.schema}` : ""}
                          </p>
                          <p className="text-xs text-slate-500">
                            {warehouse.tablesDiscovered} tables discovered •{" "}
                            {warehouse.lastTestedAt
                              ? `Last tested ${formatDistanceToNow(warehouse.lastTestedAt, { addSuffix: true })}`
                              : "Never tested"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isTesting}
                        onClick={async () => handleTestConnection(warehouse.id)}
                      >
                        {isTesting ? (
                          <>
                            <RefreshCw className="size-4 animate-spin" />
                          </>
                        ) : (
                          <>Test</>
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
              <Database className="size-16 text-slate-300 mx-auto mb-4" />
              <p className="text-lg font-semibold text-slate-900 mb-2">No warehouses connected</p>
              <p className="text-sm text-slate-600 mb-6">Connect a data warehouse to start using Numize</p>
              <Button
                onClick={() => {
                  router.push("/onboard");
                }}
              >
                <Database className="size-4 mr-2" />
                Configure Data Source
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* dbt Project Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <FileJson className="size-5 text-slate-600" />
                <CardTitle>dbt Project</CardTitle>
              </div>
              <CardDescription>Linked dbt models for verified metrics and semantic layer</CardDescription>
            </div>
            {hasDbtProject && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push("/onboard");
                }}
              >
                Re-import
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasDbtProject ? (
            <>
              <div className="flex items-start justify-between p-4 bg-purple-50/50 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-3">
                  {mockDbtProjectInfo.importMethod === "git" ? (
                    <GitBranch className="size-5 text-purple-600 mt-0.5" />
                  ) : (
                    <Upload className="size-5 text-purple-600 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {mockDbtProjectInfo.importMethod === "git"
                        ? "Git Repository"
                        : `Uploaded ${mockDbtProjectInfo.manifestFileName ?? "manifest.json"}`}
                    </p>
                    {mockDbtProjectInfo.gitRepoUrl && (
                      <p className="text-xs text-slate-600 mt-0.5">
                        {mockDbtProjectInfo.gitRepoUrl} • {mockDbtProjectInfo.gitBranch ?? "main"} branch
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <div>
                        <p className="text-xs text-slate-500">Models discovered</p>
                        <p className="text-lg font-bold text-purple-900">{mockDbtProjectInfo.modelsCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Models selected</p>
                        <p className="text-lg font-bold text-purple-900">{mockDbtProjectInfo.selectedModelsCount}</p>
                      </div>
                    </div>
                    {mockDbtProjectInfo.lastImportedAt && (
                      <p className="text-xs text-slate-500 mt-2">
                        Last imported {formatDistanceToNow(mockDbtProjectInfo.lastImportedAt, { addSuffix: true })}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>What is dbt?</strong> dbt (data build tool) transforms your data using SQL, providing tested
                  semantic models that ensure AI query accuracy.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
              <FileJson className="size-16 text-slate-300 mx-auto mb-4" />
              <p className="text-lg font-semibold text-slate-900 mb-2">No dbt project linked</p>
              <p className="text-sm text-slate-600 mb-6">Import your dbt project to unlock verified metrics</p>
              <Button
                onClick={() => {
                  router.push("/onboard");
                }}
              >
                <FileJson className="size-4 mr-2" />
                Link dbt Project
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Semantic Layer Slices */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-slate-600" />
                <CardTitle>Semantic Layer</CardTitle>
              </div>
              <CardDescription>Team-based data access slices with defined metrics and dimensions</CardDescription>
            </div>
            {hasSemanticSlices && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push("/onboard");
                }}
              >
                + Add Slice
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasSemanticSlices ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockSemanticSlices.map((slice) => {
                  const Icon = TEAM_ICONS[slice.team];
                  const gradientColor = TEAM_COLORS[slice.team];

                  return (
                    <div
                      key={slice.id}
                      className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${gradientColor} rounded-lg flex items-center justify-center shrink-0`}
                        >
                          <Icon className="size-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 text-sm">{slice.name}</h4>
                          <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{slice.description}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <div>
                              <p className="text-xs text-slate-500">Models</p>
                              <p className="text-sm font-bold text-slate-900">{slice.models.length}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Metrics</p>
                              <p className="text-sm font-bold text-slate-900">{slice.metrics.length}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500">Dimensions</p>
                              <p className="text-sm font-bold text-slate-900">{slice.dimensions.length}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg">
                <p className="text-xs text-emerald-800">
                  <strong>Semantic slices</strong> define what data each team can access, ensuring governance while
                  giving teams autonomy to explore with AI.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
              <ShieldCheck className="size-16 text-slate-300 mx-auto mb-4" />
              <p className="text-lg font-semibold text-slate-900 mb-2">No semantic slices configured</p>
              <p className="text-sm text-slate-600 mb-6">Define team-based data access for governed analytics</p>
              <Button
                onClick={() => {
                  router.push("/onboard");
                }}
              >
                <ShieldCheck className="size-4 mr-2" />
                Configure Semantic Layer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Agent Tools */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="size-5 text-slate-600" />
                <CardTitle>AI Agent Tools</CardTitle>
              </div>
              <CardDescription>External integrations the AI agent can use to take business actions</CardDescription>
            </div>
            {hasTools && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  router.push("/onboard");
                }}
              >
                Configure Tools
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasTools ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockToolsConfig
                  .filter((tool) => tool.enabled)
                  .map((tool) => {
                    const Icon = TOOL_ICONS[tool.id as keyof typeof TOOL_ICONS];

                    return (
                      <div
                        key={tool.id}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Icon className="size-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-slate-900 text-sm">{tool.name}</p>
                              {tool.verified === true && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-900">
                                  <CheckCircle2 className="size-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            {tool.apiKey && <p className="text-xs text-slate-500 mt-0.5">{tool.apiKey}</p>}
                            {tool.endpoint && <p className="text-xs text-slate-500 mt-0.5">{tool.endpoint}</p>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="p-3 bg-purple-50/50 border border-purple-200 rounded-lg">
                <p className="text-xs text-purple-800">
                  <strong>AI-powered actions:</strong> Business teams can ask questions and the AI agent uses these
                  tools to take actions like creating campaigns or updating CRM records.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
              <Zap className="size-16 text-slate-300 mx-auto mb-4" />
              <p className="text-lg font-semibold text-slate-900 mb-2">No tools configured</p>
              <p className="text-sm text-slate-600 mb-6">
                Enable integrations to let AI take actions for business teams
              </p>
              <Button
                onClick={() => {
                  router.push("/onboard");
                }}
              >
                <Zap className="size-4 mr-2" />
                Configure AI Tools
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSourcesContent;
