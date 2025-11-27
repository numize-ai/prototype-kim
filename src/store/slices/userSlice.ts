/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  firstConnectionAt: Date | null;
  onboardingComplete: boolean;
  dismissedBanners: string[];
}

const initialState: UserState = {
  firstConnectionAt: null,
  onboardingComplete: false,
  dismissedBanners: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirstConnection: (state, action: PayloadAction<Date>) => {
      if (state.firstConnectionAt === null) {
        state.firstConnectionAt = action.payload;
      }
    },
    completeOnboarding: (state) => {
      state.onboardingComplete = true;
    },
    dismissBanner: (state, action: PayloadAction<string>) => {
      if (!state.dismissedBanners.includes(action.payload)) {
        state.dismissedBanners.push(action.payload);
      }
    },
  },
});

export const { setFirstConnection, completeOnboarding, dismissBanner } = userSlice.actions;

export const selectIsBannerDismissed =
  (bannerId: string) =>
  (state: { user: UserState }): boolean =>
    state.user.dismissedBanners.includes(bannerId);

export const selectFirstConnectionAt = (state: { user: UserState }): Date | null => state.user.firstConnectionAt;

export const selectOnboardingComplete = (state: { user: UserState }): boolean => state.user.onboardingComplete;

export default userSlice.reducer;
