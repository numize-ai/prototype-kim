/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable complexity */
/* eslint-disable id-length */
/* eslint-disable max-lines */
"use client";

import React, { useState } from "react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { DataSource, TableData } from "~mocks/chat-data";

import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  Clock,
  Database,
  ExternalLink,
  FileSpreadsheet,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

interface ExportToSheetsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tableData: TableData;
  dataSources?: DataSource[];
  queryDescription: string;
}

type ExportStep = "creating" | "selectSheet" | "success" | "syncSettings";
type ExportDestination = "existing" | "new";
type SyncFrequency = "daily" | "hourly" | "manual" | "monthly" | "weekly";

export const ExportToSheetsDialog: React.FC<ExportToSheetsDialogProps> = ({
  open,
  onOpenChange,
  tableData,
  dataSources,
  queryDescription,
}) => {
  const [step, setStep] = useState<ExportStep>("selectSheet");
  const [destination, setDestination] = useState<ExportDestination>("new");
  const [sheetName, setSheetName] = useState("Query Results");
  const [tabName, setTabName] = useState("Sheet1");
  const [newTabName, setNewTabName] = useState("");
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState("");
  const [syncFrequency, setSyncFrequency] = useState<SyncFrequency>("daily");
  const [enableAutoSync, setEnableAutoSync] = useState(true);
  const [createdSheetUrl, setCreatedSheetUrl] = useState("");

  const handleExport = (): void => {
    setStep("creating");

    // Simulate export process
    setTimeout(() => {
      setCreatedSheetUrl("https://docs.google.com/spreadsheets/d/abc123xyz/edit");
      setStep("success");
    }, 2500);
  };

  const handleClose = (): void => {
    onOpenChange(false);
    // Reset state after dialog closes
    setTimeout(() => {
      setStep("selectSheet");
      setDestination("new");
      setSheetName("Query Results");
      setTabName("Sheet1");
      setNewTabName("");
      setSelectedSpreadsheet("");
      setSyncFrequency("daily");
      setEnableAutoSync(true);
      setCreatedSheetUrl("");
    }, 300);
  };

  // Mock existing spreadsheets
  const mockSpreadsheets = [
    { id: "1", name: "Sales Dashboard 2024", tabs: ["Overview", "Q1", "Q2", "Q3", "Q4"] },
    { id: "2", name: "Marketing Metrics", tabs: ["Campaign Data", "Analytics", "Reports"] },
    { id: "3", name: "Financial Reports", tabs: ["Revenue", "Expenses", "Forecast"] },
  ];

  const frequencyLabels: Record<SyncFrequency, string> = {
    manual: "Manual only",
    hourly: "Every hour",
    daily: "Daily at 9:00 AM",
    weekly: "Weekly on Monday",
    monthly: "Monthly on 1st",
  };

  const selectedSpreadsheetData = mockSpreadsheets.find((s) => s.id === selectedSpreadsheet);
  const canProceedToSync =
    destination === "new"
      ? sheetName.trim() !== ""
      : selectedSpreadsheet !== "" && (tabName === "__new__" ? newTabName.trim() !== "" : tabName.trim() !== "");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Step 1: Select Sheet */}
        {step === "selectSheet" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileSpreadsheet className="size-5 text-green-600" />
                Export to Google Sheets
              </DialogTitle>
              <DialogDescription>Step 1 of 2: Choose your destination spreadsheet</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Data Sources Info */}
              {dataSources !== undefined && dataSources.length > 0 && (
                <Card className="border-blue-200 bg-blue-50/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Database className="size-5 text-blue-600 shrink-0 mt-0.5" />
                      <div className="flex-1 space-y-2">
                        <p className="text-sm font-medium text-blue-900">Data Sources</p>
                        <div className="flex flex-wrap gap-2">
                          {dataSources.map((source) => (
                            <Badge key={source.id} variant="outline" className="gap-1.5 bg-white">
                              <div className="w-4 h-4 rounded overflow-hidden shrink-0">
                                <Image
                                  src={source.icon}
                                  alt={source.name}
                                  width={16}
                                  height={16}
                                  className="object-contain"
                                />
                              </div>
                              <span>{source.name}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Query Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Query</Label>
                <Card>
                  <CardContent className="p-3">
                    <p className="text-sm text-slate-700 italic">&quot;{queryDescription}&quot;</p>
                  </CardContent>
                </Card>
              </div>

              {/* Destination */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Destination</Label>
                <RadioGroup
                  value={destination}
                  onValueChange={(value) => {
                    setDestination(value as ExportDestination);
                  }}
                >
                  <div className="flex items-center space-x-2 rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="flex-1 cursor-pointer">
                      <div className="font-medium">Create new spreadsheet</div>
                      <div className="text-xs text-slate-600">Start fresh with a new Google Sheet</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                    <RadioGroupItem value="existing" id="existing" />
                    <Label htmlFor="existing" className="flex-1 cursor-pointer">
                      <div className="font-medium">Add to existing spreadsheet</div>
                      <div className="text-xs text-slate-600">Choose an existing spreadsheet and tab</div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* New Spreadsheet Name */}
              {destination === "new" && (
                <div className="space-y-2">
                  <Label htmlFor="sheetName" className="text-sm font-medium">
                    Spreadsheet name
                  </Label>
                  <Input
                    id="sheetName"
                    value={sheetName}
                    onChange={(event) => {
                      setSheetName(event.target.value);
                    }}
                    placeholder="Enter spreadsheet name..."
                  />
                </div>
              )}

              {/* Existing Spreadsheet Selection */}
              {destination === "existing" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="spreadsheet" className="text-sm font-medium">
                      Select spreadsheet
                    </Label>
                    <Select value={selectedSpreadsheet} onValueChange={setSelectedSpreadsheet}>
                      <SelectTrigger id="spreadsheet">
                        <SelectValue placeholder="Choose a spreadsheet..." />
                      </SelectTrigger>
                      <SelectContent>
                        {mockSpreadsheets.map((sheet) => (
                          <SelectItem key={sheet.id} value={sheet.id}>
                            <div className="flex items-center gap-2">
                              <FileSpreadsheet className="size-4 text-green-600" />
                              <span>{sheet.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedSpreadsheet && (
                    <div className="space-y-2">
                      <Label htmlFor="tab" className="text-sm font-medium">
                        Select or create tab
                      </Label>
                      <Select value={tabName} onValueChange={setTabName}>
                        <SelectTrigger id="tab">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedSpreadsheetData?.tabs.map((tab) => (
                            <SelectItem key={tab} value={tab}>
                              {tab}
                            </SelectItem>
                          ))}
                          <SelectItem value="__new__">
                            <div className="flex items-center gap-2">
                              <Plus className="size-4" />
                              <span>Create new tab</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {tabName === "__new__" && (
                        <Input
                          placeholder="Enter new tab name..."
                          value={newTabName}
                          onChange={(event) => {
                            setNewTabName(event.target.value);
                          }}
                          className="mt-2"
                        />
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Data Preview */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Data preview</Label>
                <Card>
                  <CardContent className="p-3">
                    <div className="text-xs text-slate-600 space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Columns:</span>
                        <span className="font-medium">{tableData.columns.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Rows:</span>
                        <span className="font-medium">{tableData.rows.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setStep("syncSettings");
                }}
                disabled={!canProceedToSync}
              >
                Next: Configure Sync
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Step 2: Sync Settings */}
        {step === "syncSettings" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RefreshCw className="size-5 text-purple-600" />
                Configure Sync Settings
              </DialogTitle>
              <DialogDescription>Step 2 of 2: Set up automatic data synchronization</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Selected Destination Summary */}
              <Card className="border-slate-200 bg-slate-50/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <FileSpreadsheet className="size-5 text-green-600 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-slate-900">
                        {destination === "new" ? `New: ${sheetName}` : selectedSpreadsheetData?.name}
                      </p>
                      {destination === "existing" && (
                        <p className="text-xs text-slate-600">
                          Tab: {tabName === "__new__" ? newTabName || "New Tab" : tabName}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Auto-sync Toggle */}
              <Card className="border-purple-200 bg-purple-50/30">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                      <Sparkles className="size-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm font-semibold text-purple-900">
                        Automatic Data Sync (Recommended)
                      </CardTitle>
                      <CardDescription className="text-xs text-purple-700 mt-1">
                        Keep your sheet automatically updated with the latest data
                      </CardDescription>
                    </div>
                    <Button
                      variant={enableAutoSync ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setEnableAutoSync(!enableAutoSync);
                      }}
                      className={enableAutoSync ? "bg-purple-600 hover:bg-purple-700" : ""}
                    >
                      {enableAutoSync ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                </CardHeader>

                {enableAutoSync && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <Label htmlFor="frequency" className="text-sm font-medium text-purple-900">
                        Sync frequency
                      </Label>
                      <Select
                        value={syncFrequency}
                        onValueChange={(value: string) => {
                          setSyncFrequency(value as SyncFrequency);
                        }}
                      >
                        <SelectTrigger id="frequency" className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">
                            <div className="flex items-center gap-2">
                              <Clock className="size-4" />
                              <span>Hourly - Every hour</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="daily">
                            <div className="flex items-center gap-2">
                              <Calendar className="size-4" />
                              <span>Daily - Every day at 9:00 AM</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="weekly">
                            <div className="flex items-center gap-2">
                              <RefreshCw className="size-4" />
                              <span>Weekly - Every Monday</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="monthly">
                            <div className="flex items-center gap-2">
                              <Calendar className="size-4" />
                              <span>Monthly - 1st of each month</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="manual">
                            <span>Manual only - No automatic sync</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Export Summary */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Export summary</Label>
                <Card>
                  <CardContent className="p-3">
                    <div className="text-xs text-slate-600 space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Columns:</span>
                        <span className="font-medium">{tableData.columns.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Rows:</span>
                        <span className="font-medium">{tableData.rows.length}</span>
                      </div>
                      {enableAutoSync && (
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                          <span>Sync:</span>
                          <span className="font-medium text-purple-700">{frequencyLabels[syncFrequency]}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setStep("selectSheet");
                }}
              >
                Back
              </Button>
              <Button onClick={handleExport} className="gap-2 bg-green-600 hover:bg-green-700">
                <FileSpreadsheet className="size-4" />
                Create & Sync
              </Button>
            </DialogFooter>
          </>
        )}

        {/* Creating Step */}
        {step === "creating" && (
          <>
            <DialogHeader>
              <DialogTitle>Creating your Google Sheet...</DialogTitle>
            </DialogHeader>

            <div className="py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Loader2 className="size-8 text-green-600 animate-spin" />
                </div>
                <div className="text-center space-y-2">
                  <p className="font-medium text-slate-900">Setting up your export...</p>
                  <div className="space-y-1 text-sm text-slate-600">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      ✓ Creating spreadsheet
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                      ✓ Exporting {tableData.rows.length} rows
                    </motion.p>
                    {enableAutoSync && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                        ✓ Setting up {frequencyLabels[syncFrequency].toLowerCase()} sync
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Success Step */}
        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="size-5 text-green-600" />
                </div>
                Export successful!
              </DialogTitle>
              <DialogDescription>
                Your data has been exported to Google Sheets
                {enableAutoSync && ` and will sync ${frequencyLabels[syncFrequency].toLowerCase()}`}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Success card */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-green-200 bg-green-50/30">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-green-200 flex items-center justify-center shrink-0">
                        <FileSpreadsheet className="size-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-green-900">{sheetName}</p>
                        <p className="text-sm text-green-700">{tableData.rows.length} rows exported</p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full gap-2 border-green-300 hover:bg-green-100"
                      onClick={() => window.open(createdSheetUrl, "_blank")}
                    >
                      <ExternalLink className="size-4" />
                      Open in Google Sheets
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Workflow info */}
              {enableAutoSync && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <RefreshCw className="size-4 text-purple-600" />
                        Automatic Sync Enabled
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-slate-600 space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Frequency:</span>
                          <span className="font-medium">{frequencyLabels[syncFrequency]}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Next sync:</span>
                          <span className="font-medium">
                            In{" "}
                            {syncFrequency === "hourly" ? "1 hour" : syncFrequency === "daily" ? "24 hours" : "7 days"}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          // Navigate to workflows page
                          window.location.href = "/workflows";
                        }}
                      >
                        Manage in Workflows
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
