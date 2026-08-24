"use client";

import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { GradientButton } from "@/components/ui/GradientButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SearchField } from "@/components/ui/SearchField";
import { Toolbar, ToolbarCount } from "@/components/ui/Toolbar";
import { Icon } from "@/components/ui/icons";

/**
 * Schemas are browsed as cards rather than rows: each one carries an issuer
 * DID, a ledger badge and its attribute names, which is more than a table row
 * reads well at. The empty state is the whole page for now, so the grid only
 * shows up once there is something in it.
 */
export function SchemasView() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Schemas" }]}
          title="Schemas"
          actions={
            <>
              <SearchField className="w-full min-[561px]:w-[280px]" placeholder="Search schemas" />
              <Link href="/schemas/create">
                <GradientButton className="h-11">
                  <Icon name="plus" size={16} strokeWidth={2} />
                  Create schema
                </GradientButton>
              </Link>
            </>
          }
        />

        <Panel padded={false}>
          <Toolbar left={<ToolbarCount>0 schemas</ToolbarCount>} />
          <EmptyState
            icon="layers"
            title="No schemas yet"
            message="A schema names the attributes a credential carries — it is the shape, not the data. Create one before you define a credential against it."
            action={
              <Link href="/schemas/create">
                <GradientButton>
                  <Icon name="plus" size={16} strokeWidth={2} />
                  Create schema
                </GradientButton>
              </Link>
            }
          />
        </Panel>
      </div>
    </AppShell>
  );
}
