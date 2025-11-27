import BaseError from "~errors/BaseError";

import { enqueueSnackbar } from "./notistackRef";

import { QueryClient } from "@tanstack/react-query";

const enqueueErrorsOnSnacks = (error: unknown) => {
  if (error instanceof BaseError) {
    enqueueSnackbar(error, { variant: "error" });
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
      onError: (error: unknown) => {
        enqueueErrorsOnSnacks(error);
      },
    },
  },
});
