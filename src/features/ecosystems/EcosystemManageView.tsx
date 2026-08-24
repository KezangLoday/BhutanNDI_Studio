import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { GradientButton } from "@/components/ui/GradientButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SearchField } from "@/components/ui/SearchField";
import { Toolbar, ToolbarCount } from "@/components/ui/Toolbar";
import { Icon } from "@/components/ui/icons";

/**
 * Membership of one ecosystem: who belongs to it and in what role. The lead
 * organization governs; members issue and verify under its trust framework.
 */
export function EcosystemManageView() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Ecosystems", href: "/ecosystems" }, { label: "Manage" }]}
          title="Manage ecosystem"
          actions={
            <GradientButton className="h-11">
              <Icon name="plus" size={16} strokeWidth={2} />
              Invite organization
            </GradientButton>
          }
        />

        <Panel padded={false}>
          <Toolbar
            left={<ToolbarCount>0 member organizations</ToolbarCount>}
            right={
              <SearchField className="w-full min-[561px]:w-[280px]" placeholder="Search members" />
            }
          />
          <DataTable
            columns={["Organization", "Role", "Joined on", "Status"]}
            empty={{
              icon: "ecosystems",
              title: "No member organizations",
              message:
                "An ecosystem is a group of organizations issuing and verifying under one trust framework. Invite an organization to start building it.",
              action: (
                <GradientButton>
                  <Icon name="plus" size={16} strokeWidth={2} />
                  Invite organization
                </GradientButton>
              ),
            }}
          />
        </Panel>
      </div>
    </AppShell>
  );
}
