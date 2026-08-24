import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { DetailList } from "@/components/ui/DetailList";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Toolbar, ToolbarCount } from "@/components/ui/Toolbar";
import { Icon } from "@/components/ui/icons";

/**
 * One schema: its identity above, the attributes it declares, and the
 * credential definitions issued against it. The three are separate panels
 * because they answer different questions — what is this, what does it carry,
 * and what is issuing it.
 */
export function SchemaDetailView({ schemaId }: { schemaId: string }) {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Schemas", href: "/schemas" }, { label: "Schema" }]}
          title="Schema"
          actions={
            <>
              <HairlineButton className="h-11 px-4 text-[13px]">
                <Icon name="copy" size={15} strokeWidth={1.8} />
                Copy schema ID
              </HairlineButton>
              <GradientButton className="h-11">
                <Icon name="plus" size={16} strokeWidth={2} />
                Create credential definition
              </GradientButton>
            </>
          }
        />

        <Panel>
          <DetailList
            items={[
              { label: "Schema ID", value: schemaId, mono: true },
              { label: "Name", value: "—" },
              { label: "Version", value: "—" },
              { label: "Ledger", value: "—" },
              { label: "Issuer DID", value: "—", mono: true },
              { label: "Created on", value: "—" },
            ]}
          />
        </Panel>

        <Panel padded={false}>
          <Toolbar left={<ToolbarCount>Attributes</ToolbarCount>} />
          <DataTable
            columns={["Attribute", "Type", "Required"]}
            empty={{
              icon: "layers",
              title: "No attributes to show",
              message:
                "This schema's attributes will be listed here once the schema resolves from the ledger.",
            }}
          />
        </Panel>

        <Panel padded={false}>
          <Toolbar
            left={<ToolbarCount>Credential definitions</ToolbarCount>}
            right={
              <HairlineButton className="h-10 px-3.5 text-[13px]">
                <Icon name="plus" size={15} strokeWidth={2} />
                New definition
              </HairlineButton>
            }
          />
          <DataTable
            columns={["Definition", "Tag", "Revocable", "Created on"]}
            empty={{
              icon: "credentials",
              title: "No credential definitions yet",
              message:
                "A credential definition binds this schema to one issuing organization, ready to issue against.",
              action: (
                <Link href="/credentials">
                  <HairlineButton>
                    <Icon name="plus" size={15} strokeWidth={2} />
                    Create definition
                  </HairlineButton>
                </Link>
              ),
            }}
          />
        </Panel>
      </div>
    </AppShell>
  );
}
