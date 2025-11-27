/* eslint-disable id-length */
"use client";

import React, { useState } from "react";

import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import type { TableData } from "~mocks/chat-data";

import { ChatTable } from "./ChatTable";

import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

interface SQLEditorProps {
  initialSQL?: string;
  tableData?: TableData;
  onExecute?: (sql: string) => void;
}

export const SQLEditor: React.FC<SQLEditorProps> = ({ initialSQL = "", tableData, onExecute }) => {
  const [sql, setSql] = useState(initialSQL);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      onExecute?.(sql);
    }, 500);
  };

  const handleReset = () => {
    setSql(initialSQL);
  };

  const hasChanges = sql !== initialSQL;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* SQL Editor */}
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-foreground">SQL Query Editor</span>
          </div>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="size-4 mr-2" />
                Reset
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={handleExecute}
              disabled={isExecuting || sql.trim().length === 0}
              className="bg-primary hover:bg-primary/90"
            >
              <Play className="size-4 mr-2" />
              {isExecuting ? "Executing..." : "Execute"}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <textarea
            value={sql}
            onChange={(e) => {
              setSql(e.target.value);
            }}
            className="w-full h-full min-h-[300px] p-4 font-mono text-sm bg-foreground text-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="-- Enter your SQL query here&#10;SELECT * FROM table_name;"
            spellCheck={false}
          />
        </div>
      </Card>

      {/* Results Table */}
      {tableData !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-hidden"
        >
          <Card className="h-full overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium text-foreground">Query Results</span>
                <span className="text-xs text-muted-foreground">
                  ({tableData.rows.length} rows, {tableData.columns.length} columns)
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-auto">
              <ChatTable data={tableData} />
            </div>
          </Card>
        </motion.div>
      )}

      {tableData === undefined && (
        <Card className="p-8 text-center border-dashed">
          <p className="text-sm text-muted-foreground">Execute a query to see results</p>
        </Card>
      )}
    </div>
  );
};
