"use client";

import React from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

import { CheckCircle2, Database, FileJson, Rocket, ShieldCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface CompletionStepProps {
  dataSourceName: string;
  modelsCount: number;
  slicesCount: number;
  toolsCount?: number;
  onFinish: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({
  dataSourceName,
  modelsCount,
  slicesCount,
  toolsCount = 0,
  onFinish,
}) => {
  const router = useRouter();

  const handleGetStarted = () => {
    onFinish();
    router.push("/chat");
  };

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
          <CheckCircle2 className="size-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Setup Complete!</h2>
          <p className="text-lg text-slate-600">Your AI-native analytics platform is ready to use</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Database className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Data Source</p>
                <p className="text-xs text-slate-600 mt-0.5 truncate">{dataSourceName}</p>
              </div>
              <CheckCircle2 className="size-5 text-green-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <FileJson className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">dbt Models</p>
                <p className="text-xs text-slate-600 mt-0.5">{modelsCount} models imported</p>
              </div>
              <CheckCircle2 className="size-5 text-green-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                <ShieldCheck className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Semantic Slices</p>
                <p className="text-xs text-slate-600 mt-0.5">{slicesCount} slices configured</p>
              </div>
              <CheckCircle2 className="size-5 text-green-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center">
                <Zap className="size-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">AI Agent Tools</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {toolsCount > 0 ? `${toolsCount} tools enabled` : "No tools configured"}
                </p>
              </div>
              <CheckCircle2 className="size-5 text-green-600 shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What's Next */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center gap-3">
            <Rocket className="size-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">What's next?</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                1
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Business teams can start asking questions</p>
                <p className="text-xs text-slate-600 mt-1">
                  Marketing, Product, and Ops teams now have access to their semantic slices and can query data using
                  natural language.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                2
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">Configure Weekly Digests (optional)</p>
                <p className="text-xs text-slate-600 mt-1">
                  Set up automated weekly insights with anomaly detection for each team to receive proactive updates.
                </p>
              </div>
            </div>

            {toolsCount === 0 && (
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    Connect action tools via MCP servers (optional)
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Enable teams to take actions directly from insights by connecting to tools like Brevo, HubSpot,
                    Zapier, and more.
                  </p>
                </div>
              </div>
            )}

            {toolsCount > 0 && (
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-green-900">AI Agent Tools Connected</p>
                  <p className="text-xs text-green-700 mt-1">
                    {toolsCount} tool{toolsCount !== 1 ? "s" : ""} configured - Your teams can now take actions directly
                    from insights.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Governance Note */}
      <Card className="border-green-200 bg-green-50/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Badge variant="secondary" className="bg-green-100 text-green-900 border-green-200">
              <ShieldCheck className="size-3 mr-1" />
              Governed
            </Badge>
            <div className="flex-1">
              <p className="text-sm text-green-900 font-medium">Full governance enabled</p>
              <p className="text-xs text-green-700 mt-1">
                All queries are auditable, semantic slices enforce access controls, and your dbt models ensure data
                quality. You maintain full control while enabling team autonomy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            router.push("/");
          }}
        >
          Go to Dashboard
        </Button>
        <Button onClick={handleGetStarted} size="lg" className="gap-2">
          <Rocket className="size-5" />
          Start Analyzing Data
        </Button>
      </div>

      {/* Help text */}
      <p className="text-center text-sm text-slate-500">
        Need help? Check out our{" "}
        <a href="/docs" className="text-blue-600 hover:underline">
          documentation
        </a>{" "}
        or{" "}
        <a href="/support" className="text-blue-600 hover:underline">
          contact support
        </a>
        .
      </p>
    </div>
  );
};

export default CompletionStep;
