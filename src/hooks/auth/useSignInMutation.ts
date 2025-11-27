import type BaseError from "~errors/BaseError";
import { authService } from "~services/auth";

import { signInMutationKey } from "./keys";

import type { ISignInRequest, ISignInResponse } from "~/types/auth";
import { useMutation } from "react-query";

interface ISignInMutation {
  mutate: (credentials: ISignInRequest) => void;
  isLoading: boolean;
  error: BaseError | null;
  data: ISignInResponse | undefined;
  isSuccess: boolean;
}

function useSignInMutation(): ISignInMutation {
  const { mutate, isLoading, error, data, isSuccess } = useMutation<ISignInResponse, BaseError, ISignInRequest>(
    signInMutationKey(),
    authService.signIn,
    {
      onSuccess: (response) => {
        // Display success message as alert
        // eslint-disable-next-line no-alert
        alert(response.message);
        // You could redirect to dashboard or update auth state here
      },
      onError: (err) => {
        // Handle sign-in error
        // eslint-disable-next-line no-console
        console.error("Sign-in failed:", err);
      },
    },
  );

  return { mutate, isLoading, error, data, isSuccess };
}

export default useSignInMutation;
