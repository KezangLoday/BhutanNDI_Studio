import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { GradientButton } from "@/components/ui/GradientButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SearchField } from "@/components/ui/SearchField";
import { Toolbar } from "@/components/ui/Toolbar";
import { Icon } from "@/components/ui/icons";

/**
 * The issuance ledger: every credential this organization has offered, and
 * what became of it. Issue starts a new one; the table is the record.
 */
export function CredentialsView() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Credentials" }]}
          title="Credentials"
          actions={
            <Link href="/credentials/issue">
              <GradientButton className="h-11">
                <Icon name="issue" size={16} strokeWidth={2} />
                Issue credential
              </GradientButton>
            </Link>
          }
        />

        <Panel padded={false}>
          <Toolbar
            left={<SearchField className="w-full min-[561px]:w-[300px]" placeholder="Search credentials" />}
            right={
              <>
                <button
                  type="button"
                  aria-label="Refresh credentials"
                  className="ndi-iconbtn inline-flex h-11 w-11 items-center justify-center rounded-[10px]"
                >
                  <Icon name="refresh" size={16} strokeWidth={1.8} />
                </button>
                <label className="flex items-center gap-2">
                  <span className="sr-only">Sort order</span>
                  <select className="ndi-select" defaultValue="desc">
                    <option value="desc">Newest first</option>
                    <option value="asc">Oldest first</option>
                  </select>
                </label>
              </>
            }
          />
          <DataTable
            columns={["Holder", "Schema", "Credential definition", "Status", "Issued on"]}
            empty={{
              icon: "credentials",
              title: "No credentials issued yet",
              message:
                "Issued credentials and their state appear here — offered, accepted or declined — once you issue against a credential definition.",
              action: (
                <Link href="/credentials/issue">
                  <GradientButton>
                    <Icon name="issue" size={16} strokeWidth={2} />
                    Issue credential
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
