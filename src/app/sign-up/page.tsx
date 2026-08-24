import type { Metadata } from "next";

import { AuthFlow } from "@/features/auth/AuthFlow";

export const metadata: Metadata = { title: "Create an account — NDI Studio" };

export default function SignUpPage() {
  return <AuthFlow start="signup-name" />;
}
