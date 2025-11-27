"use client";

import React, { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { AlertCircle, CheckCircle2, FileJson, GitBranch, Loader2, Search, Upload, X } from "lucide-react";

export interface DbtModel {
  id: string;
  name: string;
  schema: string;
  description: string;
  tags: string[];
  columns: number;
  selected: boolean;
}

export interface DbtProjectConfig {
  importMethod: "git" | "upload";
  manifestFile?: File;
  gitRepoUrl?: string;
  gitBranch?: string;
  gitToken?: string;
  models: DbtModel[];
}

interface DbtProjectStepProps {
  config: DbtProjectConfig;
  onChange: (config: DbtProjectConfig) => void;
  onImport: () => Promise<boolean>;
}

const MOCK_MODELS: DbtModel[] = [
  {
    id: "1",
    name: "marts_marketing__campaigns",
    schema: "marts_marketing",
    description: "Marketing campaign performance metrics",
    tags: ["marketing", "campaigns"],
    columns: 24,
    selected: true,
  },
  {
    id: "2",
    name: "marts_marketing__user_acquisition",
    schema: "marts_marketing",
    description: "User acquisition funnel and sources",
    tags: ["marketing", "acquisition"],
    columns: 18,
    selected: true,
  },
  {
    id: "3",
    name: "marts_product__feature_usage",
    schema: "marts_product",
    description: "Product feature adoption and usage patterns",
    tags: ["product", "features"],
    columns: 32,
    selected: true,
  },
  {
    id: "4",
    name: "marts_finance__revenue",
    schema: "marts_finance",
    description: "Revenue metrics and financial KPIs",
    tags: ["finance", "revenue"],
    columns: 15,
    selected: false,
  },
  {
    id: "5",
    name: "staging__raw_events",
    schema: "staging",
    description: "Raw event data from tracking",
    tags: ["staging", "events"],
    columns: 42,
    selected: false,
  },
];

const DbtProjectStep: React.FC<DbtProjectStepProps> = ({ config, onChange, onImport }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<"error" | "success" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file.type === "application/json" || file.name.endsWith(".json")) {
      onChange({ ...config, manifestFile: file });
      setImportResult(null);
      setErrorMessage("");
    } else {
      setImportResult("error");
      setErrorMessage("Please upload a valid manifest.json file");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    setIsImporting(true);
    setImportResult(null);
    setErrorMessage("");

    try {
      const success = await onImport();
      if (success) {
        setImportResult("success");
        // Simulate model discovery
        onChange({ ...config, models: MOCK_MODELS });
      } else {
        setImportResult("error");
        setErrorMessage("Failed to import dbt project. Please check your configuration.");
      }
    } catch (error) {
      setImportResult("error");
      setErrorMessage(error instanceof Error ? error.message : "Import failed");
    } finally {
      setIsImporting(false);
    }
  };

  const handleModelToggle = (modelId: string) => {
    const updatedModels = config.models.map((model) =>
      model.id === modelId ? { ...model, selected: !model.selected } : model,
    );
    onChange({ ...config, models: updatedModels });
  };

  const handleSelectAll = () => {
    const updatedModels = config.models.map((model) => ({ ...model, selected: true }));
    onChange({ ...config, models: updatedModels });
  };

  const handleDeselectAll = () => {
    const updatedModels = config.models.map((model) => ({ ...model, selected: false }));
    onChange({ ...config, models: updatedModels });
  };

  const filteredModels = config.models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const selectedCount = config.models.filter((m) => m.selected).length;

  const isUploadValid = config.importMethod === "upload" && config.manifestFile;
  const isGitValid = config.importMethod === "git" && config.gitRepoUrl && config.gitBranch;
  const canImport = isUploadValid || isGitValid;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
            <FileJson className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Link dbt Project</h2>
            <p className="text-sm text-slate-600">Import your dbt project to discover models, metrics, and lineage</p>
          </div>
        </div>
      </div>

      {/* Import method tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Import Method</CardTitle>
          <CardDescription>Choose how you want to connect your dbt project</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={config.importMethod}
            onValueChange={(value) => {
              onChange({ ...config, importMethod: value as "git" | "upload" });
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <Upload className="size-4 mr-2" />
                Upload manifest.json
              </TabsTrigger>
              <TabsTrigger value="git">
                <GitBranch className="size-4 mr-2" />
                Git Repository
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-4 mt-4">
              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-colors
                  ${dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 bg-slate-50"}
                  hover:border-slate-400 hover:bg-slate-100 cursor-pointer
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <FileJson className="size-12 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-900 mb-1">
                  {config.manifestFile ? config.manifestFile.name : "Drop your manifest.json here"}
                </p>
                <p className="text-xs text-slate-600">or click to browse</p>
              </div>

              {config.manifestFile && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle2 className="size-5 text-green-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-900">{config.manifestFile.name}</p>
                    <p className="text-xs text-green-700">{(config.manifestFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      const { manifestFile, ...rest } = config;
                      onChange(rest);
                    }}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Git Tab */}
            <TabsContent value="git" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="gitRepoUrl">
                  Repository URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="gitRepoUrl"
                  placeholder="https://github.com/your-org/dbt-project.git"
                  value={config.gitRepoUrl || ""}
                  onChange={(e) => {
                    onChange({ ...config, gitRepoUrl: e.target.value });
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gitBranch">
                    Branch <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="gitBranch"
                    placeholder="main"
                    value={config.gitBranch || ""}
                    onChange={(e) => {
                      onChange({ ...config, gitBranch: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gitToken">
                    Access Token <span className="text-slate-400">(optional)</span>
                  </Label>
                  <Input
                    id="gitToken"
                    type="password"
                    placeholder="ghp_xxxxxxxxxxxx"
                    value={config.gitToken || ""}
                    onChange={(e) => {
                      onChange({ ...config, gitToken: e.target.value });
                    }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500">
                For private repositories, provide a personal access token with read permissions
              </p>
            </TabsContent>
          </Tabs>

          {/* Import Button */}
          <div className="pt-4">
            <Button onClick={handleImport} disabled={!canImport || isImporting} className="w-full md:w-auto">
              {isImporting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Importing Project...
                </>
              ) : (
                <>Import dbt Project</>
              )}
            </Button>
          </div>

          {/* Import Result */}
          {importResult === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md mt-4">
              <CheckCircle2 className="size-5 text-green-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-900">Import successful!</p>
                <p className="text-xs text-green-700">
                  Discovered {config.models.length} models. Select which ones to make available.
                </p>
              </div>
            </div>
          )}

          {importResult === "error" && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md mt-4">
              <AlertCircle className="size-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900">Import failed</p>
                <p className="text-xs text-red-700">{errorMessage}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Model Selection */}
      {config.models.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Select Business-Ready Models</CardTitle>
                <CardDescription>
                  Choose which dbt models should be available for analytics ({selectedCount} of {config.models.length}{" "}
                  selected)
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                  Deselect All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Search models by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                className="pl-10"
              />
            </div>

            {/* Models List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  className={`
                    p-4 border rounded-lg transition-all cursor-pointer
                    ${model.selected ? "border-blue-300 bg-blue-50/30" : "border-slate-200 bg-white hover:border-slate-300"}
                  `}
                  onClick={() => {
                    handleModelToggle(model.id);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={model.selected}
                      onCheckedChange={() => {
                        handleModelToggle(model.id);
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-slate-900">{model.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {model.schema}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{model.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-500">{model.columns} columns</span>
                        {model.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredModels.length === 0 && (
                <div className="text-center py-8">
                  <Search className="size-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">No models found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info card */}
      {config.models.length > 0 && (
        <Card className="border-purple-200 bg-purple-50/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-purple-100 text-purple-900 border-purple-200">
                Tip
              </Badge>
              <div className="flex-1">
                <p className="text-sm text-purple-900 font-medium">Recommend starting with marts models</p>
                <p className="text-xs text-purple-700 mt-1">
                  Models in the "marts" schema are typically well-structured and business-ready. You can always add more
                  models later.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DbtProjectStep;
