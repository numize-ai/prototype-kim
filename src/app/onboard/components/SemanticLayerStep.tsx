"use client";

import React, { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

import { Briefcase, ChevronDown, ChevronUp, Layers, Plus, ShieldCheck, TrendingUp, Users, X } from "lucide-react";

export interface SemanticSlice {
  id: string;
  name: string;
  team: "finance" | "marketing" | "ops" | "product";
  description: string;
  models: string[];
  metrics: string[];
  dimensions: string[];
}

interface SemanticLayerStepProps {
  slices: SemanticSlice[];
  onChange: (slices: SemanticSlice[]) => void;
  availableModels: string[];
}

const TEAM_CONFIG = {
  marketing: {
    icon: TrendingUp,
    label: "Marketing",
    color: "from-pink-600 to-pink-700",
    bgColor: "bg-pink-50/30",
    borderColor: "border-pink-200",
  },
  product: {
    icon: Layers,
    label: "Product",
    color: "from-indigo-600 to-indigo-700",
    bgColor: "bg-indigo-50/30",
    borderColor: "border-indigo-200",
  },
  ops: {
    icon: Briefcase,
    label: "Operations",
    color: "from-emerald-600 to-emerald-700",
    bgColor: "bg-emerald-50/30",
    borderColor: "border-emerald-200",
  },
  finance: {
    icon: Users,
    label: "Finance",
    color: "from-amber-600 to-amber-700",
    bgColor: "bg-amber-50/30",
    borderColor: "border-amber-200",
  },
};

const SUGGESTED_METRICS = {
  marketing: ["Campaign ROI", "Lead conversion rate", "CAC", "MQL to SQL rate", "Ad spend efficiency"],
  product: ["DAU/MAU ratio", "Feature adoption rate", "User retention", "Time to value", "Churn rate"],
  ops: ["Operational efficiency", "Process completion time", "Error rate", "SLA compliance", "Resource utilization"],
  finance: ["Revenue growth", "Gross margin", "Cash flow", "ARR/MRR", "Customer LTV"],
};

const SUGGESTED_DIMENSIONS = {
  marketing: ["Campaign type", "Channel", "Country", "Device type", "Audience segment"],
  product: ["Feature name", "User cohort", "Plan type", "Platform", "User role"],
  ops: ["Process type", "Team", "Region", "Priority level", "Status"],
  finance: ["Product line", "Customer segment", "Payment method", "Currency", "Contract type"],
};

const SemanticLayerStep: React.FC<SemanticLayerStepProps> = ({ slices, onChange, availableModels }) => {
  const [expandedSlice, setExpandedSlice] = useState<string | null>(slices[0]?.id || null);

  const handleAddSlice = () => {
    const newSlice: SemanticSlice = {
      id: `slice-${Date.now()}`,
      name: "",
      team: "marketing",
      description: "",
      models: [],
      metrics: [],
      dimensions: [],
    };
    onChange([...slices, newSlice]);
    setExpandedSlice(newSlice.id);
  };

  const handleRemoveSlice = (id: string) => {
    onChange(slices.filter((slice) => slice.id !== id));
    if (expandedSlice === id) {
      setExpandedSlice(slices[0]?.id || null);
    }
  };

  const handleUpdateSlice = (id: string, updates: Partial<SemanticSlice>) => {
    onChange(slices.map((slice) => (slice.id === id ? { ...slice, ...updates } : slice)));
  };

  const handleAddItem = (sliceId: string, field: "dimensions" | "metrics", value: string) => {
    const slice = slices.find((s) => s.id === sliceId);
    if (!slice || !value.trim()) return;

    const newItems = [...slice[field], value.trim()];
    handleUpdateSlice(sliceId, { [field]: newItems });
  };

  const handleRemoveItem = (sliceId: string, field: "dimensions" | "metrics", index: number) => {
    const slice = slices.find((s) => s.id === sliceId);
    if (!slice) return;

    const newItems = slice[field].filter((_, i) => i !== index);
    handleUpdateSlice(sliceId, { [field]: newItems });
  };

  const handleToggleModel = (sliceId: string, model: string) => {
    const slice = slices.find((s) => s.id === sliceId);
    if (!slice) return;

    const models = slice.models.includes(model) ? slice.models.filter((m) => m !== model) : [...slice.models, model];
    handleUpdateSlice(sliceId, { models });
  };

  const isSliceValid = (slice: SemanticSlice) => {
    return (
      slice.name.trim() !== "" &&
      slice.description.trim() !== "" &&
      slice.models.length > 0 &&
      (slice.metrics.length > 0 || slice.dimensions.length > 0)
    );
  };

  const allSlicesValid = slices.length > 0 && slices.every(isSliceValid);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
            <ShieldCheck className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Define Semantic Layer</h2>
            <p className="text-sm text-slate-600">Create semantic slices for each team to control data access</p>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="size-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium">What is a semantic slice?</p>
              <p className="text-xs text-blue-700 mt-1">
                A semantic slice defines what data, metrics, and dimensions each team can access. This ensures
                governance while giving teams autonomy to explore their data with AI.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Slices */}
      <div className="space-y-4">
        {slices.map((slice) => {
          const teamConfig = TEAM_CONFIG[slice.team];
          const Icon = teamConfig.icon;
          const isExpanded = expandedSlice === slice.id;
          const isValid = isSliceValid(slice);

          return (
            <Card key={slice.id} className={isExpanded ? "ring-2 ring-blue-200" : ""}>
              <CardHeader
                className="cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => {
                  setExpandedSlice(isExpanded ? null : slice.id);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${teamConfig.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="size-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{slice.name || `New ${teamConfig.label} Slice`}</CardTitle>
                      <CardDescription className="text-xs">
                        {slice.models.length} models • {slice.metrics.length} metrics • {slice.dimensions.length}{" "}
                        dimensions
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isValid && (
                      <Badge variant="secondary" className="bg-green-100 text-green-900 border-green-200">
                        Valid
                      </Badge>
                    )}
                    {isExpanded ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="space-y-4 pt-0">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${slice.id}`}>
                        Slice Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`name-${slice.id}`}
                        placeholder="e.g., Marketing Analytics Slice"
                        value={slice.name}
                        onChange={(e) => {
                          handleUpdateSlice(slice.id, { name: e.target.value });
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`team-${slice.id}`}>
                        Team <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={slice.team}
                        onValueChange={(value) => {
                          handleUpdateSlice(slice.id, { team: value as SemanticSlice["team"] });
                        }}
                      >
                        <SelectTrigger id={`team-${slice.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(TEAM_CONFIG).map(([key, config]) => {
                            const TeamIcon = config.icon;
                            return (
                              <SelectItem key={key} value={key}>
                                <div className="flex items-center gap-2">
                                  <TeamIcon className="size-4" />
                                  <span>{config.label}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${slice.id}`}>
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id={`description-${slice.id}`}
                        placeholder="Describe what this slice provides access to..."
                        value={slice.description}
                        onChange={(e) => {
                          handleUpdateSlice(slice.id, { description: e.target.value });
                        }}
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Models Selection */}
                  <div className="space-y-2">
                    <Label>
                      Available Models <span className="text-red-500">*</span>
                    </Label>
                    <div className="border rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                      {availableModels.length > 0 ? (
                        availableModels.map((model) => (
                          <div key={model} className="flex items-center gap-2">
                            <Checkbox
                              checked={slice.models.includes(model)}
                              onCheckedChange={() => {
                                handleToggleModel(slice.id, model);
                              }}
                            />
                            <span className="text-sm">{model}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 text-center py-4">
                          No models available. Please complete Step 2 first.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-2">
                    <Label>Metrics</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a metric (press Enter)"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddItem(slice.id, "metrics", e.currentTarget.value);
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            handleAddItem(slice.id, "metrics", input.value);
                            input.value = "";
                          }}
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                      {SUGGESTED_METRICS[slice.team] && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs text-slate-600">Suggestions:</span>
                          {SUGGESTED_METRICS[slice.team].map((metric) => (
                            <Badge
                              key={metric}
                              variant="outline"
                              className="cursor-pointer hover:bg-slate-100"
                              onClick={() => {
                                handleAddItem(slice.id, "metrics", metric);
                              }}
                            >
                              <Plus className="size-3 mr-1" />
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {slice.metrics.map((metric, index) => (
                          <Badge key={index} variant="secondary">
                            {metric}
                            <button
                              onClick={() => {
                                handleRemoveItem(slice.id, "metrics", index);
                              }}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="size-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="space-y-2">
                    <Label>Dimensions</Label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a dimension (press Enter)"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddItem(slice.id, "dimensions", e.currentTarget.value);
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            handleAddItem(slice.id, "dimensions", input.value);
                            input.value = "";
                          }}
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                      {SUGGESTED_DIMENSIONS[slice.team] && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs text-slate-600">Suggestions:</span>
                          {SUGGESTED_DIMENSIONS[slice.team].map((dimension) => (
                            <Badge
                              key={dimension}
                              variant="outline"
                              className="cursor-pointer hover:bg-slate-100"
                              onClick={() => {
                                handleAddItem(slice.id, "dimensions", dimension);
                              }}
                            >
                              <Plus className="size-3 mr-1" />
                              {dimension}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {slice.dimensions.map((dimension, index) => (
                          <Badge key={index} variant="secondary">
                            {dimension}
                            <button
                              onClick={() => {
                                handleRemoveItem(slice.id, "dimensions", index);
                              }}
                              className="ml-1 hover:text-red-600"
                            >
                              <X className="size-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="pt-4 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleRemoveSlice(slice.id);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="size-4 mr-2" />
                      Remove Slice
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Add Slice Button */}
      <Button onClick={handleAddSlice} variant="outline" className="w-full">
        <Plus className="size-4 mr-2" />
        Add Semantic Slice
      </Button>

      {/* Validation Message */}
      {slices.length > 0 && !allSlicesValid && (
        <Card className="border-amber-200 bg-amber-50/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="bg-amber-100 text-amber-900 border-amber-200">
                Required
              </Badge>
              <div className="flex-1">
                <p className="text-sm text-amber-900 font-medium">Complete all slices</p>
                <p className="text-xs text-amber-700 mt-1">
                  Each slice must have a name, description, at least one model, and at least one metric or dimension.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {slices.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="pt-12 pb-12 text-center">
            <ShieldCheck className="size-16 text-slate-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-slate-900 mb-2">No semantic slices yet</p>
            <p className="text-sm text-slate-600 mb-6">
              Create your first semantic slice to define what data teams can access
            </p>
            <Button onClick={handleAddSlice}>
              <Plus className="size-4 mr-2" />
              Create Semantic Slice
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SemanticLayerStep;
