"use client";

import React from "react";

import { GripVertical } from "lucide-react";

interface BlockHandleProps {
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  draggable?: boolean;
}

export const BlockHandle: React.FC<BlockHandleProps> = ({ onDragStart, onDragEnd, onClick, draggable = true }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <div
      className="absolute left-0 top-0 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={handleClick}
    >
      <div className="inline-flex items-center justify-center size-6 rounded hover:bg-gray-100 transition-colors">
        <GripVertical className="size-4 text-gray-400" />
      </div>
    </div>
  );
};
