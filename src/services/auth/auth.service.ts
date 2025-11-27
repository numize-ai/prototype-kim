import type { ISignInRequest, ISignInResponse } from "~/types/auth";
import apiClient from "~utils/axiosApiClient";

const signIn = async (credentials: ISignInRequest): Promise<ISignInResponse> => {
  return apiClient.post<ISignInResponse, ISignInRequest>("/users-management/auth/sign-in", credentials, {
    // Ensure cookies are sent with the request
    // This is important for the backend to set HTTP-only cookies
  });
};

const authService = {
  signIn,
};

export default authService;
