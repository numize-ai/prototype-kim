"use client";

import * as React from "react";

import { DataSourcesContent } from "~/components/data-sources";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { useAppSelector } from "~store";

import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * DataSourcesPage - Dedicated page for managing all data sources configuration
 * including warehouse connections, dbt projects, semantic layer, and AI tools.
 */
const DataSourcesPage: React.FC = () => {
  const router = useRouter();
  const onboardingComplete = useAppSelector((state) => state.user.onboardingComplete);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Data Sources Configuration</h1>
        <p className="text-slate-600 mt-1">
          Manage your data warehouse connections, dbt projects, semantic layer, and AI agent tools
        </p>
      </div>

      {/* Onboarding Incomplete Banner */}
      {!onboardingComplete && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-amber-900">Onboarding not complete</p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Complete the onboarding process to set up your data sources and unlock Numize&apos;s full
                      capabilities.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      router.push("/onboard");
                    }}
                    className="shrink-0"
                  >
                    Complete Onboarding
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Sources Content */}
      <DataSourcesContent showOnboardingProgress={true} />
    </div>
  );
};

export default DataSourcesPage;
