import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Toolbar, ToolbarCount } from "@/components/ui/Toolbar";
import { Icon } from "@/components/ui/icons";

/**
 * Every DID the organization's wallet holds. One of them is the issuing DID —
 * the one credentials are signed under — which is why the table leads with
 * that flag rather than burying it in a detail page.
 */
export function DidDetailsView() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "DIDs" }]}
          title="DIDs"
          actions={
            <>
              <HairlineButton className="h-11 px-4 text-[13px]">
                <Icon name="download" size={15} strokeWidth={1.8} />
                DID document
              </HairlineButton>
              <Link href="/create-did">
                <GradientButton className="h-11">
                  <Icon name="plus" size={16} strokeWidth={2} />
                  Create DID
                </GradientButton>
              </Link>
            </>
          }
        />

        <Panel padded={false}>
          <Toolbar left={<ToolbarCount>0 DIDs</ToolbarCount>} />
          <DataTable
            columns={["DID", "Method", "Key type", "Issuing DID", "Created on"]}
            empty={{
              icon: "fingerprint",
              title: "No DIDs yet",
              message:
                "A DID identifies your organization on the network and signs everything it issues. Create one to start issuing credentials.",
              action: (
                <Link href="/create-did">
                  <GradientButton>
                    <Icon name="plus" size={16} strokeWidth={2} />
                    Create DID
                  </GradientButton>
                </Link>
              ),
            }}
          />
        </Panel>
      </div>
    </AppShell>
  );
}
