"use client";

import { useCallback, useState } from "react";

import { mockQueryResults, mockSQLQueries, type QueryResult } from "~/mocks/queryResults";

type QueryExecutionStatus = "error" | "executing" | "generating" | "idle" | "parsing" | "selecting" | "success";

interface UseQueryExecutionResult {
  status: QueryExecutionStatus;
  result: QueryResult | null;
  error: string | null;
  executeQuery: (question: string) => Promise<void>;
  reset: () => void;
}

const statusMessages: Record<QueryExecutionStatus, string> = {
  idle: "",
  parsing: "Parsing question...",
  selecting: "Selecting tables & metrics...",
  generating: "Generating SQL...",
  executing: "Executing query...",
  success: "Query executed successfully",
  error: "Query execution failed",
};

export function useQueryExecution(): UseQueryExecutionResult {
  const [status, setStatus] = useState<QueryExecutionStatus>("idle");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  const executeQuery = useCallback(async (question: string) => {
    setError(null);
    setResult(null);

    // Simulate parsing
    setStatus("parsing");
    await new Promise((resolve) => {
      setTimeout(resolve, 400);
    });

    // Simulate table/metric selection
    setStatus("selecting");
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    // Simulate SQL generation
    setStatus("generating");
    await new Promise((resolve) => {
      setTimeout(resolve, 600);
    });

    // Simulate query execution
    setStatus("executing");
    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });

    // Match question to mock data
    const lowerQuestion = question.toLowerCase();
    let mockResult: QueryResult;

    if (lowerQuestion.includes("revenue") && lowerQuestion.includes("month")) {
      mockResult = {
        id: Date.now().toString(),
        question,
        sql: mockSQLQueries.revenueByMonth,
        results: mockQueryResults.revenueByMonth,
        rowCount: mockQueryResults.revenueByMonth.length,
        executionTime: 1.23,
        dbtVerified: true,
        tablesUsed: ["orders"],
        metricsUsed: ["revenue", "unique_customers"],
        timestamp: new Date(),
      };
    } else if (lowerQuestion.includes("signup") || lowerQuestion.includes("plan")) {
      mockResult = {
        id: Date.now().toString(),
        question,
        sql: mockSQLQueries.userSignupsByPlan,
        results: mockQueryResults.userSignupsByPlan,
        rowCount: mockQueryResults.userSignupsByPlan.length,
        executionTime: 0.89,
        dbtVerified: true,
        tablesUsed: ["users"],
        metricsUsed: ["signup_count", "avg_trial_days"],
        timestamp: new Date(),
      };
    } else if (lowerQuestion.includes("cohort") || lowerQuestion.includes("retention")) {
      mockResult = {
        id: Date.now().toString(),
        question,
        sql: mockSQLQueries.cohortAnalysis,
        results: mockQueryResults.cohortAnalysis,
        rowCount: mockQueryResults.cohortAnalysis.length,
        executionTime: 2.45,
        dbtVerified: false,
        tablesUsed: ["user_orders"],
        timestamp: new Date(),
      };
    } else if (lowerQuestion.includes("product")) {
      mockResult = {
        id: Date.now().toString(),
        question,
        sql: mockSQLQueries.topPerformingProducts,
        results: mockQueryResults.topPerformingProducts,
        rowCount: 20,
        executionTime: 1.67,
        dbtVerified: true,
        tablesUsed: ["products", "order_items"],
        metricsUsed: ["revenue", "units_sold"],
        timestamp: new Date(),
      };
    } else {
      // Default fallback
      mockResult = {
        id: Date.now().toString(),
        question,
        sql: mockSQLQueries.revenueByMonth,
        results: mockQueryResults.revenueByMonth,
        rowCount: mockQueryResults.revenueByMonth.length,
        executionTime: 1.15,
        dbtVerified: false,
        tablesUsed: ["orders"],
        timestamp: new Date(),
      };
    }

    setStatus("success");
    setResult(mockResult);
  }, []);

  return {
    status,
    result,
    error,
    executeQuery,
    reset,
  };
}

export { statusMessages };
