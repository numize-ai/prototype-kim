"use client";

import React from "react";

import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { BlockConfigPanel } from "~components/digest/BlockConfigPanel";
import type { BlockConfig, BlockType } from "~mocks/digest-data";

interface BlockEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blockType: BlockType;
  blockConfig: BlockConfig;
  onSave: (config: BlockConfig) => void;
}

export const BlockEditDialog: React.FC<BlockEditDialogProps> = ({
  open,
  onOpenChange,
  blockType,
  blockConfig,
  onSave,
}) => {
  const [localConfig, setLocalConfig] = React.useState<BlockConfig>(blockConfig);

  // Update local config when blockConfig prop changes
  React.useEffect(() => {
    setLocalConfig(blockConfig);
  }, [blockConfig]);

  const handleSave = () => {
    console.log("Saving block configuration:", localConfig);
    onSave(localConfig);
    onOpenChange(false);
  };

  const handleCancel = () => {
    // Reset to original config on cancel
    setLocalConfig(blockConfig);
    onOpenChange(false);
  };

  // Format block type for display
  const formatBlockType = (type: BlockType): string => {
    const typeMap: Record<BlockType, string> = {
      kpi: "KPI",
      chart: "Chart",
      table: "Table",
      insight: "Insight",
      text: "Text",
    };
    return typeMap[type] === "" ? type : typeMap[type];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit {formatBlockType(blockType)} Block</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <BlockConfigPanel blockType={blockType} config={localConfig} onChange={setLocalConfig} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
