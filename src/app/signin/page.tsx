import { SignInContainer } from "~components/auth";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage: React.FC = () => {
  return <SignInContainer />;
};

export default SignInPage;
