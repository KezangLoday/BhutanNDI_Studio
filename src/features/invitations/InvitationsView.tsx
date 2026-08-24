import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SearchField } from "@/components/ui/SearchField";
import { Toolbar, ToolbarCount } from "@/components/ui/Toolbar";

/**
 * Invitations this account has received to join someone else's organization.
 * Distinct from the invitations an organization has sent, which belong under
 * Users — same word, opposite direction.
 */
export function InvitationsView() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader crumbs={[{ label: "Invitations" }]} title="Invitations" />

        <Panel padded={false}>
          <Toolbar
            left={<ToolbarCount>0 pending invitations</ToolbarCount>}
            right={
              <SearchField
                className="w-full min-[561px]:w-[280px]"
                placeholder="Search invitations"
              />
            }
          />
          <DataTable
            columns={["Organization", "Invited by", "Role", "Received on", "Action"]}
            empty={{
              icon: "mail",
              title: "No invitations",
              message:
                "When another organization invites you to join, the invitation lands here for you to accept or decline.",
            }}
          />
        </Panel>
      </div>
    </AppShell>
  );
}
