"use client";

import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { BlockConfigPanel } from "~components/digest/BlockConfigPanel";
import type { BlockType, DeliveryMethod, DigestBlock, RecurrenceType } from "~mocks/digest-data";
import { BLOCK_TYPE_METADATA, getDefaultBlockConfig } from "~mocks/digest-data";

import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  FileText,
  Filter,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

const BLOCK_TYPE_ICONS = {
  kpi: BarChart3,
  highlight: AlertTriangle,
  chart: Filter,
  table: Activity,
  trend: Activity,
  insight: Activity,
  sql: Activity,
  action: Activity,
  text: FileText,
};

const NewDigestPage: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recurrence, setRecurrence] = useState<RecurrenceType>("weekly");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("both");
  const [isActive, setIsActive] = useState(true);
  const [blocks, setBlocks] = useState<DigestBlock[]>([]);

  const handleAddBlock = (type: BlockType) => {
    const newBlock: DigestBlock = {
      id: `block-${Date.now()}`,
      type,
      title: BLOCK_TYPE_METADATA[type].label,
      order: blocks.length + 1,
      prompt: "",
      dataSources: [],
      kpis: [],
      config: getDefaultBlockConfig(type),
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleRemoveBlock = (blockId: string) => {
    setBlocks(blocks.filter((b) => b.id !== blockId).map((b, index) => ({ ...b, order: index + 1 })));
  };

  const handleMoveBlock = (blockId: string, direction: "down" | "up") => {
    const index = blocks.findIndex((b) => b.id === blockId);
    if (index === -1) return;

    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex]!, newBlocks[index]!];

    setBlocks(newBlocks.map((b, i) => ({ ...b, order: i + 1 })));
  };

  const handleUpdateBlock = (blockId: string, updates: Partial<DigestBlock>) => {
    setBlocks(blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b)));
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a digest title");
      return;
    }

    // In production, this would save to the backend
    alert("Digest created successfully! (This is a prototype)");
    router.push("/digests");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Digest</h1>
          <p className="text-muted-foreground mt-1">Configure your AI-generated recurring report</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              router.push("/digests");
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="size-4 mr-2" />
            Save Digest
          </Button>
        </div>
      </div>

      {/* Basic Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Set up the digest name, schedule, and delivery preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="e.g., Executive Weekly Summary"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Brief description of what this digest covers"
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Recurrence</label>
              <select
                value={recurrence}
                onChange={(e) => {
                  setRecurrence(e.target.value as RecurrenceType);
                }}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Delivery Method</label>
              <select
                value={deliveryMethod}
                onChange={(e) => {
                  setDeliveryMethod(e.target.value as DeliveryMethod);
                }}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="email">Email</option>
                <option value="in-app">In-app</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={(e) => {
                setIsActive(e.target.checked);
              }}
              className="size-4 rounded border-border"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-foreground cursor-pointer">
              Active (digest will run automatically on schedule)
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Block Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Digest Blocks</CardTitle>
          <CardDescription>Add and configure the insight blocks that will appear in your digest</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Block Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.keys(BLOCK_TYPE_METADATA) as BlockType[]).map((type) => {
              const Icon = BLOCK_TYPE_ICONS[type];
              const metadata = BLOCK_TYPE_METADATA[type];
              return (
                <button
                  key={type}
                  onClick={() => {
                    handleAddBlock(type);
                  }}
                  className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                >
                  <Icon className="size-6 text-muted-foreground mb-2" />
                  <p className="text-sm font-semibold text-foreground">{metadata.label}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{metadata.description}</p>
                </button>
              );
            })}
          </div>

          {/* Block List */}
          {blocks.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-border rounded-lg bg-muted/20">
              <Plus className="size-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">No blocks added yet</p>
              <p className="text-xs text-muted-foreground mt-1">Click on a block type above to add it to your digest</p>
            </div>
          ) : (
            <div className="space-y-3">
              {blocks.map((block, index) => {
                const Icon = BLOCK_TYPE_ICONS[block.type];
                return (
                  <div key={block.id} className="p-4 border border-border rounded-lg bg-card">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => {
                            handleMoveBlock(block.id, "up");
                          }}
                          disabled={index === 0}
                          className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ArrowUp className="size-4" />
                        </button>
                        <button
                          onClick={() => {
                            handleMoveBlock(block.id, "down");
                          }}
                          disabled={index === blocks.length - 1}
                          className="p-1 hover:bg-muted rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ArrowDown className="size-4" />
                        </button>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="size-5 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">
                              Block {block.order} - {BLOCK_TYPE_METADATA[block.type].label}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              handleRemoveBlock(block.id);
                            }}
                          >
                            <Trash2 className="size-4 text-red-600" />
                          </Button>
                        </div>

                        <input
                          type="text"
                          value={block.title}
                          onChange={(e) => {
                            handleUpdateBlock(block.id, { title: e.target.value });
                          }}
                          placeholder="Block title"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        <textarea
                          value={block.prompt ?? ""}
                          onChange={(e) => {
                            handleUpdateBlock(block.id, { prompt: e.target.value });
                          }}
                          placeholder="Describe what insights you want this block to provide..."
                          rows={2}
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        {/* Block Configuration */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-foreground">Block Configuration</h4>
                          <BlockConfigPanel
                            blockType={block.type}
                            config={block.config}
                            onChange={(config) => {
                              handleUpdateBlock(block.id, { config });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Schedule</p>
              <p className="text-sm font-semibold text-foreground capitalize">{recurrence}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Delivery</p>
              <p className="text-sm font-semibold text-foreground capitalize">{deliveryMethod}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Blocks</p>
              <p className="text-sm font-semibold text-foreground">{blocks.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <p className={`text-sm font-semibold ${isActive ? "text-green-600" : "text-slate-400"}`}>
                {isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewDigestPage;
