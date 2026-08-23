"use client";

import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { GradientButton } from "@/components/ui/GradientButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SearchField } from "@/components/ui/SearchField";
import { Icon } from "@/components/ui/icons";

export function OrganizationsView() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Organizations" }]}
          title="Organizations"
          actions={
            <>
              <SearchField className="w-full min-[561px]:w-[280px]" />
              <GradientButton className="h-11">
                <Icon name="plus" size={16} strokeWidth={2} />
                Create
              </GradientButton>
            </>
          }
        />

        <Panel padded={false}>
          <EmptyState
            icon="building"
            title="No organizations yet"
            message="An organization owns the schemas, credential definitions and connections you issue under. Create one to get started."
            action={
              <GradientButton>
                <Icon name="plus" size={16} strokeWidth={2} />
                Create organization
              </GradientButton>
            }
          />
        </Panel>
      </div>
    </AppShell>
  );
}
