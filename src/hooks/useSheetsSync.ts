"use client";

import { useCallback, useState } from "react";

import { type SheetSyncResult, simulateSheetSync, type SyncOptions } from "~/mocks/sheetsData";

import { useSnackbar } from "notistack";

type SheetsSyncStatus = "error" | "idle" | "success" | "syncing";

interface UseSheetsSyncResult {
  status: SheetsSyncStatus;
  result: SheetSyncResult | null;
  error: string | null;
  syncToSheet: (
    sheetId: string,
    tabId: string,
    range: string,
    rowCount: number,
    options?: Partial<SyncOptions>,
  ) => Promise<void>;
  reset: () => void;
}

export function useSheetsSync(): UseSheetsSyncResult {
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState<SheetsSyncStatus>("idle");
  const [result, setResult] = useState<SheetSyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  const syncToSheet = useCallback(
    async (sheetId: string, tabId: string, range: string, rowCount: number) => {
      setError(null);
      setResult(null);
      setStatus("syncing");

      try {
        // Simulate sheet sync with delay
        const syncResult = await simulateSheetSync(sheetId, tabId, range, rowCount);

        setStatus("success");
        setResult(syncResult);

        // Show success notification
        enqueueSnackbar(`✓ Successfully synced ${rowCount} rows to ${syncResult.sheetName}`, {
          variant: "success",
          autoHideDuration: 4000,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to sync to sheet";
        setStatus("error");
        setError(errorMessage);

        // Show error notification
        enqueueSnackbar(`✗ ${errorMessage}`, {
          variant: "error",
          autoHideDuration: 5000,
        });
      }
    },
    [enqueueSnackbar],
  );

  return {
    status,
    result,
    error,
    syncToSheet,
    reset,
  };
}
