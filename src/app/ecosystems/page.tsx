import type { Metadata } from "next";

import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = {
  title: "Ecosystems — NDI Studio",
};

/** Not in the supplied screenshots — a placeholder so the nav link resolves. */
export default function EcosystemsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader crumbs={[{ label: "Ecosystems" }]} title="Ecosystems" />
        <Panel padded={false}>
          <EmptyState
            icon="ecosystems"
            title="No ecosystems yet"
            message="An ecosystem lets several organizations govern schemas and trust between them. This screen is a placeholder until its design is supplied."
          />
        </Panel>
      </div>
    </AppShell>
  );
}
