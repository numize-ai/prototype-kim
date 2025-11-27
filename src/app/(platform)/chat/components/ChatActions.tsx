"use client";

import React from "react";

import { Button } from "~/components/ui/button";
import type { ChatAction } from "~mocks/chat-data";

import * as Icons from "lucide-react";

interface ChatActionsProps {
  actions: ChatAction[];
  onExportToSheets?: () => void;
}

export const ChatActions: React.FC<ChatActionsProps> = ({ actions, onExportToSheets }) => {
  const renderIcon = (iconName: string): React.ReactElement | null => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const IconComponent: any = Icons[iconName as keyof typeof Icons];

    // Check if it's a valid function component
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!IconComponent || typeof IconComponent !== "function") {
      return null;
    }

    // Render the icon component with proper JSX
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const Icon = IconComponent;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return <Icon className="size-4" />;
  };

  const handleActionClick = (action: ChatAction): void => {
    // Check if this is an export action
    if (action.type === "export" && action.icon === "FileSpreadsheet" && onExportToSheets !== undefined) {
      onExportToSheets();
    } else if (action.onClick !== undefined) {
      action.onClick();
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant={action.variant ?? "outline"}
          size="sm"
          onClick={() => {
            handleActionClick(action);
          }}
          className="text-xs"
        >
          {renderIcon(action.icon)}
          <span className="ml-2">{action.label}</span>
        </Button>
      ))}
    </div>
  );
};
