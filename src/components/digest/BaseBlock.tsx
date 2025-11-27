"use client";

import React from "react";

import { Button } from "~/components/ui/button";
import { BlockEditDialog } from "~components/digest/BlockEditDialog";
import { BlockHandle } from "~components/digest/BlockHandle";
import { ContextMenu, type ContextMenuAction } from "~components/digest/ContextMenu";
import { type BlockConfig, getDefaultBlockConfig } from "~mocks/digest-data";

import { MessageSquare } from "lucide-react";

export type BlockType = "action" | "chart" | "highlight" | "insight" | "kpi" | "sql" | "table" | "trend";

interface BaseBlockRenderProps {
  isHighlighted: boolean;
}

interface BaseBlockProps {
  title: string;
  blockType: BlockType;
  updatedAt: Date;
  confidenceScore?: number | undefined;
  onDeepDive?: (() => void) | undefined;
  children: React.ReactNode | ((props: BaseBlockRenderProps) => React.ReactNode);
  contextActions?: ContextMenuAction[];
  blockConfig?: BlockConfig | undefined;
}

export const BaseBlock: React.FC<BaseBlockProps> = ({
  title,
  blockType,
  updatedAt,
  confidenceScore,
  onDeepDive,
  children,
  contextActions,
  blockConfig,
}) => {
  const [isHighlighted, setIsHighlighted] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [currentConfig, setCurrentConfig] = React.useState<BlockConfig>(() => {
    // Use provided config or generate default based on blockType
    // Only use default for types that have configs (kpi, chart, table, insight, text)
    if (blockConfig !== undefined) return blockConfig;
    if (["kpi", "chart", "table", "insight", "text"].includes(blockType)) {
      return getDefaultBlockConfig(blockType as "chart" | "insight" | "kpi" | "table" | "text");
    }
    // For other block types, return a text config as fallback
    return getDefaultBlockConfig("text");
  });
  const blockRef = React.useRef<HTMLDivElement>(null);
  const hasConfidence = confidenceScore !== undefined;

  const handleHandleClick = () => {
    setIsHighlighted(true);
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
    setIsHighlighted(false);
  };

  // Handle click outside to remove highlight
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (blockRef.current !== null && !blockRef.current.contains(event.target as Node)) {
        setIsHighlighted(false);
        setShowMenu(false);
      }
    };

    if (isHighlighted) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHighlighted]);

  const handleConfigSave = (config: BlockConfig) => {
    console.log("Config saved:", config);
    setCurrentConfig(config);
  };

  const defaultContextActions: ContextMenuAction[] = [
    {
      type: "edit",
      onClick: () => {
        setShowEditDialog(true);
        handleMenuClose();
      },
    },
    {
      type: "duplicate",
      onClick: () => {
        console.log("Duplicate block");
        handleMenuClose();
      },
    },
    {
      type: "move-up",
      onClick: () => {
        console.log("Move up");
        handleMenuClose();
      },
    },
    {
      type: "move-down",
      onClick: () => {
        console.log("Move down");
        handleMenuClose();
      },
    },
    {
      type: "separator",
    },
    {
      type: "delete",
      onClick: () => {
        console.log("Delete block");
        handleMenuClose();
      },
    },
  ];

  const actions = contextActions ?? defaultContextActions;

  return (
    <>
      <div ref={blockRef} className="group relative pl-6">
        <BlockHandle onClick={handleHandleClick} />
        <div className="absolute left-0 top-0 -ml-6">
          <ContextMenu actions={actions} open={showMenu} onOpenChange={setShowMenu} trigger={<div />} align="start" />
        </div>

        <div
          className={`border-b border-gray-100 transition-colors -mx-2 px-2 ${isHighlighted ? "bg-gray-100" : "hover:bg-gray-50/50"}`}
          data-block-type={blockType}
        >
          {/* Block Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>Updated {updatedAt.toLocaleDateString()}</span>
                {hasConfidence && <span className="text-gray-400">•</span>}
                {hasConfidence && <span>{(confidenceScore * 100).toFixed(0)}% confidence</span>}
              </div>
            </div>
            {onDeepDive !== undefined && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" onClick={onDeepDive}>
                  <MessageSquare className="size-4 mr-1" />
                  Deep dive
                </Button>
              </div>
            )}
          </div>

          {/* Block Content */}
          {typeof children === "function" ? children({ isHighlighted }) : children}
        </div>
      </div>

      {/* Edit Dialog */}
      {["kpi", "chart", "table", "insight", "text"].includes(blockType) && (
        <BlockEditDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          blockType={blockType as "chart" | "insight" | "kpi" | "table" | "text"}
          blockConfig={currentConfig}
          onSave={handleConfigSave}
        />
      )}
    </>
  );
};
