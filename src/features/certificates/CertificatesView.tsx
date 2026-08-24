import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { GradientButton } from "@/components/ui/GradientButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SearchField } from "@/components/ui/SearchField";
import { Toolbar, ToolbarCount } from "@/components/ui/Toolbar";
import { Icon } from "@/components/ui/icons";

/**
 * x509 certificates, used where a counterparty trusts a PKI chain rather than
 * a DID. Expiry is a column rather than a detail: a lapsed certificate breaks
 * verification silently, so it has to be visible from the list.
 */
export function CertificatesView() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Trust" }, { label: "x509 certificates" }]}
          title="x509 certificates"
          actions={
            <>
              <SearchField
                className="w-full min-[561px]:w-[280px]"
                placeholder="Search certificates"
              />
              <GradientButton className="h-11">
                <Icon name="plus" size={16} strokeWidth={2} />
                Add certificate
              </GradientButton>
            </>
          }
        />

        <Panel padded={false}>
          <Toolbar left={<ToolbarCount>0 certificates</ToolbarCount>} />
          <DataTable
            columns={["Common name", "Key type", "Valid from", "Expires", "Status"]}
            empty={{
              icon: "certificate",
              title: "No certificates yet",
              message:
                "Add an x509 certificate when a relying party trusts a PKI chain rather than a DID. Expiry is tracked here so verification never fails unnoticed.",
              action: (
                <GradientButton>
                  <Icon name="plus" size={16} strokeWidth={2} />
                  Add certificate
                </GradientButton>
              ),
            }}
          />
        </Panel>
      </div>
    </AppShell>
  );
}
