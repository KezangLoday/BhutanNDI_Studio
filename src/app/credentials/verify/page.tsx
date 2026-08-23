import type { Metadata } from "next";

import { WalletGate } from "@/features/credentials/WalletGate";

export const metadata: Metadata = {
  title: "Verify credentials — NDI Studio",
};

export default function VerifyPage() {
  return <WalletGate title="Verification list" crumbLabel="Verify" />;
}
