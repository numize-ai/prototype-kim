import connectorsReducer from "./slices/connectorsSlice";
import userReducer from "./slices/userSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    connectors: connectorsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore date serialization checks for these action types
        ignoredActions: ["connectors/connectSource", "user/setFirstConnection"],
        // Ignore date fields in state
        ignoredPaths: ["connectors.connectedSources", "user.firstConnectionAt"],
      },
    }),
});
