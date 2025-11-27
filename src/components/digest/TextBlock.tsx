"use client";

import React from "react";

import { BaseBlock } from "~components/digest/BaseBlock";
import type { BlockResult } from "~mocks/digest-data";

import { FileText } from "lucide-react";

interface TextBlockProps {
  title: string;
  result: BlockResult;
  onDeepDive?: () => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({ title, result, onDeepDive }) => {
  const { textContent } = result;

  if (textContent === undefined || textContent === "") {
    return (
      <BaseBlock
        title={title}
        blockType="highlight"
        updatedAt={result.executedAt}
        confidenceScore={result.confidenceScore}
        onDeepDive={onDeepDive}
      >
        <div className="py-8 text-center border border-dashed border-gray-200 bg-gray-50/50">
          <FileText className="size-10 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-900 mb-1">No text content available</p>
          <p className="text-xs text-gray-500">Add narrative text to provide context</p>
        </div>
      </BaseBlock>
    );
  }

  return (
    <BaseBlock
      title={title}
      blockType="highlight"
      updatedAt={result.executedAt}
      confidenceScore={result.confidenceScore}
      onDeepDive={onDeepDive}
    >
      <div className="py-6">
        <div className="prose prose-gray max-w-none">
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{textContent}</p>
        </div>
      </div>
    </BaseBlock>
  );
};
