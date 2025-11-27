"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { Copy, Link2, MoreVertical, MoveDown, MoveUp, Pencil, Share2, Star, Trash2, Type } from "lucide-react";

export interface ContextMenuAction {
  type:
    | "convert"
    | "copy-link"
    | "delete"
    | "duplicate"
    | "edit"
    | "favorite"
    | "move-down"
    | "move-up"
    | "rename"
    | "separator"
    | "share";
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "danger" | "default";
}

interface ContextMenuProps {
  actions: ContextMenuAction[];
  trigger?: React.ReactNode;
  align?: "center" | "end" | "start";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const getActionConfig = (
  type: ContextMenuAction["type"],
): { label: string; icon: React.ReactNode; variant?: "danger" } | undefined => {
  const configs: Record<string, { label: string; icon: React.ReactNode; variant?: "danger" }> = {
    edit: { label: "Edit", icon: <Pencil className="size-4" /> },
    rename: { label: "Rename", icon: <Type className="size-4" /> },
    duplicate: { label: "Duplicate", icon: <Copy className="size-4" /> },
    "move-up": { label: "Move up", icon: <MoveUp className="size-4" /> },
    "move-down": { label: "Move down", icon: <MoveDown className="size-4" /> },
    convert: { label: "Turn into", icon: <Type className="size-4" /> },
    "copy-link": { label: "Copy link", icon: <Link2 className="size-4" /> },
    favorite: { label: "Add to favorites", icon: <Star className="size-4" /> },
    share: { label: "Share", icon: <Share2 className="size-4" /> },
    delete: { label: "Delete", icon: <Trash2 className="size-4" />, variant: "danger" as const },
  };

  return configs[type];
};

export const ContextMenu: React.FC<ContextMenuProps> = ({ actions, trigger, align = "end", open, onOpenChange }) => {
  const dropdownProps = open !== undefined && onOpenChange !== undefined ? { open, onOpenChange } : {};

  return (
    <DropdownMenu {...dropdownProps}>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <button
            className="inline-flex items-center justify-center size-6 rounded hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MoreVertical className="size-4 text-gray-500" />
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-56">
        {actions.map((action, index) => {
          if (action.type === "separator") {
            return <DropdownMenuSeparator key={`separator-${index}`} />;
          }

          const config = getActionConfig(action.type);
          const label = action.label ?? config?.label ?? "";
          const icon = action.icon ?? config?.icon;
          const variant = action.variant ?? config?.variant;

          return (
            <DropdownMenuItem
              key={`${action.type}-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick?.();
              }}
              disabled={action.disabled ?? false}
              className={`cursor-pointer ${variant === "danger" ? "text-red-600 focus:text-red-600" : ""}`}
            >
              {icon}
              <span className="ml-2">{label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
