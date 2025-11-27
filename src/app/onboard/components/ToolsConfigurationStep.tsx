"use client";

import React, { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { AlertCircle, CheckCircle2, Loader2, Mail, ShoppingCart, Workflow, Zap } from "lucide-react";

export interface ToolConfig {
  id: string;
  name: string;
  enabled: boolean;
  apiKey?: string;
  endpoint?: string;
  verified?: boolean;
}

interface ToolsConfigurationStepProps {
  config: ToolConfig[];
  onChange: (config: ToolConfig[]) => void;
  onTest: (toolId: string) => Promise<boolean>;
}

const AVAILABLE_TOOLS = [
  {
    id: "brevo",
    name: "Brevo",
    description: "Email marketing automation - Create segments, send campaigns, manage contacts",
    icon: Mail,
    color: "bg-emerald-50 border-emerald-200",
    category: "Marketing",
    requiresApiKey: true,
    placeholder: "brevo_api_key_xxxxx",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "CRM and marketing automation - Manage contacts, deals, and marketing workflows",
    icon: ShoppingCart,
    color: "bg-orange-50 border-orange-200",
    category: "Sales & Marketing",
    requiresApiKey: true,
    placeholder: "hubspot_api_key_xxxxx",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Workflow automation - Connect to 5000+ apps and automate tasks",
    icon: Zap,
    color: "bg-yellow-50 border-yellow-200",
    category: "Automation",
    requiresApiKey: true,
    placeholder: "zapier_api_key_xxxxx",
  },
  {
    id: "n8n",
    name: "n8n",
    description: "Self-hosted workflow automation - Create custom integrations",
    icon: Workflow,
    color: "bg-purple-50 border-purple-200",
    category: "Automation",
    requiresApiKey: false,
    requiresEndpoint: true,
    placeholder: "https://n8n.yourcompany.com",
  },
];

const ToolsConfigurationStep: React.FC<ToolsConfigurationStepProps> = ({ config, onChange, onTest }) => {
  const [testingTools, setTestingTools] = useState<Set<string>>(new Set());
  const [testResults, setTestResults] = useState<Map<string, { success: boolean; message: string }>>(new Map());

  const handleToggleTool = (toolId: string) => {
    const updatedConfig = [...config];
    const toolIndex = updatedConfig.findIndex((tool) => tool.id === toolId);

    if (toolIndex >= 0) {
      const existing = updatedConfig[toolIndex];
      if (existing) {
        updatedConfig[toolIndex] = { ...existing, enabled: !existing.enabled };
      }
    } else {
      const toolName = AVAILABLE_TOOLS.find((t) => t.id === toolId)?.name;
      if (toolName) {
        updatedConfig.push({ id: toolId, name: toolName, enabled: true });
      }
    }

    onChange(updatedConfig);
  };

  const handleUpdateCredential = (toolId: string, field: "apiKey" | "endpoint", value: string) => {
    const updatedConfig = [...config];
    const toolIndex = updatedConfig.findIndex((tool) => tool.id === toolId);

    if (toolIndex >= 0) {
      const existing = updatedConfig[toolIndex];
      if (existing) {
        updatedConfig[toolIndex] = {
          id: existing.id,
          name: existing.name,
          enabled: existing.enabled,
          ...(existing.apiKey !== undefined ? { apiKey: existing.apiKey } : {}),
          ...(existing.endpoint !== undefined ? { endpoint: existing.endpoint } : {}),
          ...(existing.verified !== undefined ? { verified: false } : {}),
          [field]: value,
        };
      }
    } else {
      const toolName = AVAILABLE_TOOLS.find((t) => t.id === toolId)?.name;
      if (toolName) {
        const newTool: ToolConfig = {
          id: toolId,
          name: toolName,
          enabled: true,
        };
        if (field === "apiKey") {
          newTool.apiKey = value;
        } else {
          newTool.endpoint = value;
        }
        updatedConfig.push(newTool);
      }
    }

    onChange(updatedConfig);
    // Clear test result when credentials change
    const newTestResults = new Map(testResults);
    newTestResults.delete(toolId);
    setTestResults(newTestResults);
  };

  const handleTestConnection = async (toolId: string) => {
    setTestingTools((prev) => new Set(prev).add(toolId));
    setTestResults((prev) => {
      const newMap = new Map(prev);
      newMap.delete(toolId);
      return newMap;
    });

    try {
      const success = await onTest(toolId);
      setTestResults((prev) => {
        const newMap = new Map(prev);
        newMap.set(toolId, {
          success,
          message: success ? "Connection successful!" : "Failed to connect. Please check your credentials.",
        });
        return newMap;
      });

      if (success) {
        // Update verified status
        const updatedConfig = [...config];
        const toolIndex = updatedConfig.findIndex((tool) => tool.id === toolId);
        if (toolIndex >= 0) {
          const existing = updatedConfig[toolIndex];
          if (existing) {
            updatedConfig[toolIndex] = {
              id: existing.id,
              name: existing.name,
              enabled: existing.enabled,
              ...(existing.apiKey !== undefined ? { apiKey: existing.apiKey } : {}),
              ...(existing.endpoint !== undefined ? { endpoint: existing.endpoint } : {}),
              verified: true,
            };
            onChange(updatedConfig);
          }
        }
      }
    } catch (error) {
      setTestResults((prev) => {
        const newMap = new Map(prev);
        newMap.set(toolId, {
          success: false,
          message: error instanceof Error ? error.message : "Connection test failed",
        });
        return newMap;
      });
    } finally {
      setTestingTools((prev) => {
        const newSet = new Set(prev);
        newSet.delete(toolId);
        return newSet;
      });
    }
  };

  const getToolConfig = (toolId: string): ToolConfig | undefined => {
    return config.find((tool) => tool.id === toolId);
  };

  const isToolEnabled = (toolId: string): boolean => {
    const toolConfig = getToolConfig(toolId);
    return toolConfig?.enabled || false;
  };

  const canTestTool = (toolId: string): boolean => {
    const toolConfig = getToolConfig(toolId);
    const toolDef = AVAILABLE_TOOLS.find((t) => t.id === toolId);

    if (!toolConfig?.enabled) return false;
    if (toolDef?.requiresApiKey && (!toolConfig.apiKey || toolConfig.apiKey.length === 0)) return false;
    if (toolDef?.requiresEndpoint && (!toolConfig.endpoint || toolConfig.endpoint.length === 0)) return false;

    return true;
  };

  const enabledToolsCount = config.filter((tool) => tool.enabled).length;
  const verifiedToolsCount = config.filter((tool) => tool.enabled && tool.verified).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
            <Zap className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Configure AI Agent Tools</h2>
            <p className="text-sm text-slate-600">
              Enable and configure external tools the AI agent can use to take actions for your business teams
            </p>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {enabledToolsCount > 0 && (
        <Card className="border-purple-200 bg-purple-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-purple-900">
                  {enabledToolsCount} tool{enabledToolsCount !== 1 ? "s" : ""} enabled
                </p>
                <p className="text-xs text-purple-700 mt-0.5">
                  {verifiedToolsCount} verified • {enabledToolsCount - verifiedToolsCount} pending verification
                </p>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-900 border-purple-200">
                {Math.round((verifiedToolsCount / enabledToolsCount) * 100)}% configured
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tools List */}
      <div className="space-y-4">
        {AVAILABLE_TOOLS.map((tool) => {
          const toolConfig = getToolConfig(tool.id);
          const enabled = isToolEnabled(tool.id);
          const testing = testingTools.has(tool.id);
          const testResult = testResults.get(tool.id);
          const IconComponent = tool.icon;

          return (
            <Card key={tool.id} className={`${enabled ? tool.color : "bg-slate-50 border-slate-200"} transition-all`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${enabled ? "bg-white" : "bg-slate-100"}`}
                    >
                      <IconComponent className={`size-5 ${enabled ? "text-slate-900" : "text-slate-400"}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{tool.name}</CardTitle>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {tool.category}
                        </Badge>
                        {toolConfig?.verified && (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 bg-green-50 text-green-700 border-green-200"
                          >
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-xs mt-1">{tool.description}</CardDescription>
                    </div>
                  </div>
                  <Checkbox
                    checked={enabled}
                    onCheckedChange={() => {
                      handleToggleTool(tool.id);
                    }}
                    className="size-5"
                  />
                </div>
              </CardHeader>

              {enabled && (
                <CardContent className="space-y-4">
                  {/* API Key Input */}
                  {tool.requiresApiKey && (
                    <div className="space-y-2">
                      <Label htmlFor={`${tool.id}-api-key`} className="text-xs">
                        API Key <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`${tool.id}-api-key`}
                        type="password"
                        placeholder={tool.placeholder}
                        value={toolConfig?.apiKey || ""}
                        onChange={(e) => {
                          handleUpdateCredential(tool.id, "apiKey", e.target.value);
                        }}
                        className="text-sm bg-white"
                      />
                    </div>
                  )}

                  {/* Endpoint Input */}
                  {tool.requiresEndpoint && (
                    <div className="space-y-2">
                      <Label htmlFor={`${tool.id}-endpoint`} className="text-xs">
                        Endpoint URL <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`${tool.id}-endpoint`}
                        type="url"
                        placeholder={tool.placeholder}
                        value={toolConfig?.endpoint || ""}
                        onChange={(e) => {
                          handleUpdateCredential(tool.id, "endpoint", e.target.value);
                        }}
                        className="text-sm bg-white"
                      />
                    </div>
                  )}

                  {/* Test Connection Button */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={async () => handleTestConnection(tool.id)}
                      disabled={!canTestTool(tool.id) || testing}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {testing ? (
                        <>
                          <Loader2 className="size-3 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>Test Connection</>
                      )}
                    </Button>

                    {testResult && (
                      <div className="flex items-center gap-1.5">
                        {testResult.success ? (
                          <>
                            <CheckCircle2 className="size-4 text-green-600" />
                            <span className="text-xs text-green-700 font-medium">{testResult.message}</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="size-4 text-red-600" />
                            <span className="text-xs text-red-700">{testResult.message}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-900 border-blue-200">
              How it works
            </Badge>
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium">AI-powered actions for your business teams</p>
              <p className="text-xs text-blue-700 mt-1">
                When business teams ask questions, the AI agent can use these tools to take actions like creating email
                campaigns in Brevo, updating CRM records in HubSpot, or triggering workflows in Zapier. All actions are
                logged and can be reviewed by the Data Team.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsConfigurationStep;
