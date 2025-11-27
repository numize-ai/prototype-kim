/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ConnectedSource {
  id: string;
  name: string;
  connectedAt: Date;
  category: "analytics" | "crm" | "ecommerce" | "marketing" | "payment" | "productivity";
  icon: string;
}

interface ConnectorsState {
  connectedSources: ConnectedSource[];
  loading: boolean;
  error: string | null;
}

const initialState: ConnectorsState = {
  connectedSources: [],
  loading: false,
  error: null,
};

const connectorsSlice = createSlice({
  name: "connectors",
  initialState,
  reducers: {
    connectSource: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        category: ConnectedSource["category"];
        icon: string;
      }>,
    ) => {
      const existingIndex = state.connectedSources.findIndex((source) => source.id === action.payload.id);
      if (existingIndex === -1) {
        state.connectedSources.push({
          ...action.payload,
          connectedAt: new Date(),
        });
      }
    },
    disconnectSource: (state, action: PayloadAction<string>) => {
      state.connectedSources = state.connectedSources.filter((source) => source.id !== action.payload);
    },
  },
});

export const { connectSource, disconnectSource } = connectorsSlice.actions;

// Selectors
export const selectConnectedSources = (state: { connectors: ConnectorsState }): ConnectedSource[] =>
  state.connectors.connectedSources;

export const selectConnectedSourceIds = (state: { connectors: ConnectorsState }): string[] =>
  state.connectors.connectedSources.map((source) => source.id);

export const selectHasMultipleSources = (state: { connectors: ConnectorsState }): boolean =>
  state.connectors.connectedSources.length > 1;

export default connectorsSlice.reducer;
