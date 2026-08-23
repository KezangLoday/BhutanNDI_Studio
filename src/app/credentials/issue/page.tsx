import type { Metadata } from "next";

import { WalletGate } from "@/features/credentials/WalletGate";

export const metadata: Metadata = {
  title: "Issue credentials — NDI Studio",
};

export default function IssuePage() {
  return <WalletGate title="Issue credentials" crumbLabel="Issue" />;
}
