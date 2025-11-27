"use client";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import type { ISignInRequest } from "~/types/auth";
import { useSignInMutation } from "~hooks/auth";

export const SignInContainer: React.FC = () => {
  const [formData, setFormData] = useState<ISignInRequest>({
    username: "",
    password: "",
  });
  const { mutate: signIn, isLoading, error, data, isSuccess } = useSignInMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ISignInRequest) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {Boolean(error?.errorCode) && (
            <div className="text-red-600 text-sm text-center">
              {error?.message ?? "Sign in failed. Please try again."}
            </div>
          )}

          {isSuccess && Boolean(data) && <div className="text-green-600 text-sm text-center">{data?.message}</div>}

          <div>
            <Button type="submit" disabled={isLoading} className="w-full" variant="default" size="default">
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
