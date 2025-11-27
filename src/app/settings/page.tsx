/* eslint-disable max-lines */
/* eslint-disable id-length */
"use client";

import * as React from "react";

import { DataSourcesContent } from "~/components/data-sources";
import { AppLayout } from "~/components/layouts";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Progress } from "~/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { mockGoogleAccount, mockGoogleSheets } from "~/mocks/sheetsData";
import { useAppSelector } from "~store";
import { selectConnectedSources } from "~store/slices/connectorsSlice";

import { formatDistanceToNow } from "date-fns";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type TabType = "account" | "data-sources" | "google-sheets" | "marketing-platforms";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TabType>("data-sources");

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your data connections and account preferences</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab("data-sources");
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "data-sources"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Data Sources
            </button>
            <button
              onClick={() => {
                setActiveTab("google-sheets");
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "google-sheets"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Google Sheets
            </button>
            <button
              onClick={() => {
                setActiveTab("marketing-platforms");
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "marketing-platforms"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Marketing Platforms
            </button>
            <button
              onClick={() => {
                setActiveTab("account");
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "account"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Account
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === "data-sources" && <DataSourcesContent showOnboardingProgress={true} />}
          {activeTab === "google-sheets" && <GoogleSheetsTab />}
          {activeTab === "marketing-platforms" && <MarketingPlatformsTab />}
          {activeTab === "account" && <AccountTab />}
        </div>
      </div>
    </AppLayout>
  );
};

function GoogleSheetsTab() {
  return (
    <div className="space-y-6">
      {/* Connected Account */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Google Account</CardTitle>
          <CardDescription>Your Google account used for Sheets integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Image
              src={mockGoogleAccount.avatar}
              alt={mockGoogleAccount.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <div>
                <h3 className="font-medium text-gray-900">{mockGoogleAccount.name}</h3>
                <p className="text-sm text-gray-500">{mockGoogleAccount.email}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Connected {mockGoogleAccount.connectedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Re-authenticate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Authorized Sheets */}
      <Card>
        <CardHeader>
          <CardTitle>Authorized Sheets</CardTitle>
          <CardDescription>Google Sheets you&apos;ve synced data to ({mockGoogleSheets.length} sheets)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {mockGoogleSheets.map((sheet) => (
              <div
                key={sheet.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{sheet.name}</h4>
                  <p className="text-xs text-gray-500">
                    {sheet.tabs.length} tabs • Last modified {sheet.lastModified.toLocaleDateString()}
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={sheet.url} target="_blank" rel="noopener noreferrer">
                    Open
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MarketingPlatformsTab() {
  const router = useRouter();
  const connectedSources = useAppSelector(selectConnectedSources);
  const [fuzzyMatchingThreshold, setFuzzyMatchingThreshold] = React.useState(75);

  return (
    <div className="space-y-6">
      {/* Section 1: Connected Platforms */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Platforms</h3>
        <div className="space-y-4">
          {connectedSources.map((source: { id: string; name: string; connectedAt: Date }) => (
            <Card key={source.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-300 rounded" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{source.name}</h4>
                      <Badge variant="default">Connected</Badge>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      Connected {formatDistanceToNow(new Date(source.connectedAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Test Connection
                  </Button>
                  <Button variant="outline" size="sm">
                    Re-authenticate
                  </Button>
                  <Button variant="outline" size="sm">
                    Disconnect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {connectedSources.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600">No data sources connected yet.</p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    router.push("/onboard");
                  }}
                >
                  Connect Data Sources
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Section 2: Reconciliation Settings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Reconciliation Settings</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              router.push("/reconciliation");
            }}
          >
            Configure Reconciliation
          </Button>
        </div>

        {/* Attribution Configuration Card */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Attribution Configuration</CardTitle>
            <CardDescription>Configure how campaigns are matched to leads and deals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* UTM Mapping */}
            <div>
              <Label className="text-base font-semibold mb-3 block">UTM Parameter Mapping</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-40">
                    <Label htmlFor="utm_source">utm_source</Label>
                  </div>
                  <Select defaultValue="source">
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="source">Original Source</SelectItem>
                      <SelectItem value="campaign">Campaign</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40">
                    <Label htmlFor="utm_campaign">utm_campaign</Label>
                  </div>
                  <Select defaultValue="campaign">
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="campaign">Campaign Name</SelectItem>
                      <SelectItem value="source">Source</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40">
                    <Label htmlFor="utm_content">utm_content</Label>
                  </div>
                  <Select defaultValue="content">
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="content">Ad Content</SelectItem>
                      <SelectItem value="variant">Variant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Fuzzy Matching Threshold */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-base font-semibold">Fuzzy Matching Threshold</Label>
                <span className="text-sm text-gray-600">{fuzzyMatchingThreshold}%</span>
              </div>
              <Input
                type="range"
                min="50"
                max="100"
                step="5"
                value={fuzzyMatchingThreshold}
                onChange={(e) => {
                  setFuzzyMatchingThreshold(Number(e.target.value));
                }}
                className="w-full"
              />
              <p className="text-sm text-gray-600 mt-1">
                Higher values require closer matches but may miss valid attributions
              </p>
            </div>

            {/* Attribution Model */}
            <div>
              <Label className="text-base font-semibold mb-2 block">Attribution Model</Label>
              <Select defaultValue="first-touch">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-touch">First Touch</SelectItem>
                  <SelectItem value="last-touch">Last Touch</SelectItem>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="time-decay">Time Decay</SelectItem>
                  <SelectItem value="u-shaped">U-Shaped</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600 mt-1">First Touch: Credit to the first campaign interaction</p>
            </div>

            {/* Sync Frequency */}
            <div>
              <Label className="text-base font-semibold mb-2 block">Sync Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button>Save Configuration</Button>
          </CardContent>
        </Card>

        {/* Data Quality Card */}
        <Card>
          <CardHeader>
            <CardTitle>Data Quality</CardTitle>
            <CardDescription>Overview of reconciliation status and data quality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Match Rate</Label>
                <span className="text-sm font-semibold">87.5%</span>
              </div>
              <Progress value={87.5} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Unmatched Leads</p>
                <p className="text-2xl font-bold text-gray-900">13</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rules with Errors</p>
                <p className="text-2xl font-bold text-amber-600">2</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Full Sync</p>
                <p className="text-sm font-semibold text-gray-900">2 hours ago</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Full Reconciliation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AccountTab() {
  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              defaultValue="Data Analyst"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue="analyst@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* API Keys (Future) */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage API keys for programmatic access (coming soon)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-sm text-gray-600">API access coming in v2</p>
          </div>
        </CardContent>
      </Card>

      {/* Usage Metrics (Future) */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Metrics</CardTitle>
          <CardDescription>Track your Numize usage and quotas (coming soon)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-sm text-gray-600">Usage tracking coming in v2</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsPage;
