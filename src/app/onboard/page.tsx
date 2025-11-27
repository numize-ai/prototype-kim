"use client";

import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import CompletionStep from "~app/onboard/components/CompletionStep";
import DataSourceStep, { type DataSourceConfig } from "~app/onboard/components/DataSourceStep";
import DbtProjectStep, { type DbtProjectConfig } from "~app/onboard/components/DbtProjectStep";
import OnboardingStepper, { type Step } from "~app/onboard/components/OnboardingStepper";
import SemanticLayerStep, { type SemanticSlice } from "~app/onboard/components/SemanticLayerStep";
import ToolsConfigurationStep, { type ToolConfig } from "~app/onboard/components/ToolsConfigurationStep";
import { useAppDispatch } from "~store";
import { completeOnboarding } from "~store/slices/userSlice";

import { ChevronLeft, ChevronRight } from "lucide-react";

const STEPS: Step[] = [
  {
    id: "data-source",
    title: "Data Source",
    description: "Configure warehouse",
  },
  {
    id: "dbt-project",
    title: "dbt Project",
    description: "Link your dbt",
  },
  {
    id: "semantic-layer",
    title: "Semantic Layer",
    description: "Define access slices",
  },
  {
    id: "tools-configuration",
    title: "AI Agent Tools",
    description: "Configure integrations",
  },
];

const DataTeamOnboardingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  // Step 1: Data Source Config
  const [dataSourceConfig, setDataSourceConfig] = useState<DataSourceConfig>({
    warehouseType: "",
    host: "",
    port: "",
    database: "",
    username: "",
    password: "",
    schema: "",
    additionalParams: "",
  });
  const [dataSourceTested, setDataSourceTested] = useState(false);

  // Step 2: dbt Project Config
  const [dbtProjectConfig, setDbtProjectConfig] = useState<DbtProjectConfig>({
    importMethod: "upload",
    models: [],
  });
  const [dbtProjectImported, setDbtProjectImported] = useState(false);

  // Step 3: Semantic Layer Config
  const [semanticSlices, setSemanticSlices] = useState<SemanticSlice[]>([
    {
      id: "slice-1",
      name: "Marketing Analytics",
      team: "marketing",
      description: "Marketing team data access slice",
      models: [],
      metrics: [],
      dimensions: [],
    },
  ]);

  // Step 4: Tools Configuration
  const [toolsConfig, setToolsConfig] = useState<ToolConfig[]>([]);

  // Step 1 validation
  const isStep1Valid = () => {
    return (
      dataSourceConfig.warehouseType &&
      dataSourceConfig.host &&
      dataSourceConfig.port &&
      dataSourceConfig.database &&
      dataSourceConfig.username &&
      dataSourceConfig.password &&
      dataSourceTested
    );
  };

  // Step 2 validation
  const isStep2Valid = () => {
    const selectedModels = dbtProjectConfig.models.filter((m) => m.selected);
    return dbtProjectImported && selectedModels.length > 0;
  };

  // Step 3 validation
  const isStep3Valid = () => {
    return (
      semanticSlices.length > 0 &&
      semanticSlices.every(
        (slice) =>
          slice.name.trim() !== "" &&
          slice.description.trim() !== "" &&
          slice.models.length > 0 &&
          (slice.metrics.length > 0 || slice.dimensions.length > 0),
      )
    );
  };

  // Step 4 validation - At least one tool enabled (optional step)
  const isStep4Valid = () => {
    // Tools configuration is optional, so always allow proceeding
    // But if tools are enabled, we encourage verification
    return true;
  };

  // Test connection handler
  const handleTestConnection = async (): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate 90% success rate
    const success = Math.random() > 0.1;
    setDataSourceTested(success);
    return success;
  };

  // Import dbt project handler
  const handleImportDbtProject = async (): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success
    setDbtProjectImported(true);
    return true;
  };

  // Test tool connection handler
  const handleTestTool = async (_toolId: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate 85% success rate
    const success = Math.random() > 0.15;
    return success;
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === STEPS.length) {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    dispatch(completeOnboarding());
  };

  // Get available models for semantic layer
  const availableModels = dbtProjectConfig.models.filter((m) => m.selected).map((m) => m.name);

  // Determine if next button should be enabled
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid();
      case 2:
        return isStep2Valid();
      case 3:
        return isStep3Valid();
      case 4:
        return isStep4Valid();
      default:
        return false;
    }
  };

  // Show completion screen
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompletionStep
            dataSourceName={`${dataSourceConfig.warehouseType} - ${dataSourceConfig.host}`}
            modelsCount={dbtProjectConfig.models.filter((m) => m.selected).length}
            slicesCount={semanticSlices.length}
            toolsCount={toolsConfig.filter((tool) => tool.enabled).length}
            onFinish={handleFinish}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Data Team Onboarding</h1>
          <p className="text-lg text-slate-600">Set up your AI-native analytics platform in 4 simple steps</p>
        </div>

        {/* Stepper */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <OnboardingStepper steps={STEPS} currentStep={currentStep} />
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          {currentStep === 1 && (
            <DataSourceStep config={dataSourceConfig} onChange={setDataSourceConfig} onTest={handleTestConnection} />
          )}

          {currentStep === 2 && (
            <DbtProjectStep
              config={dbtProjectConfig}
              onChange={setDbtProjectConfig}
              onImport={handleImportDbtProject}
            />
          )}

          {currentStep === 3 && (
            <SemanticLayerStep slices={semanticSlices} onChange={setSemanticSlices} availableModels={availableModels} />
          )}

          {currentStep === 4 && (
            <ToolsConfigurationStep config={toolsConfig} onChange={setToolsConfig} onTest={handleTestTool} />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="gap-2">
            <ChevronLeft className="size-4" />
            Back
          </Button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">
              Step {currentStep} of {STEPS.length}
            </span>
            <Button onClick={handleNext} disabled={!canProceed()} className="gap-2">
              {currentStep === STEPS.length ? "Complete Setup" : "Next Step"}
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Help text */}
        <div className="text-center">
          <p className="text-sm text-slate-500">
            Questions?{" "}
            <a href="/docs/onboarding" className="text-blue-600 hover:underline">
              View setup guide
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataTeamOnboardingPage;
