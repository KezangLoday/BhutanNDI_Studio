"use client";

import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SearchField } from "@/components/ui/SearchField";
import { Icon } from "@/components/ui/icons";

const COLUMNS = ["User", "Connection ID", "Created on"];

export function ConnectionsView() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader crumbs={[{ label: "Connections" }]} title="Connections" />

        <Panel padded={false}>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 border-b border-subtle p-4 min-[641px]:px-6">
            <SearchField className="w-full min-[561px]:w-[300px]" placeholder="Search connections" />

            <div className="ml-auto flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Refresh connections"
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
            </div>
          </div>

          {/* The header row stays, so the shape of the data is legible before
              any exists. */}
          <div className="overflow-x-auto">
            <table className="ndi-table">
              <thead>
                <tr>
                  {COLUMNS.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>

          <EmptyState
            icon="connections"
            title="No connections yet"
            message="A connection is a channel between one of your organizations and a wallet holder. They appear here once a holder scans an invitation."
          />
        </Panel>
      </div>
    </AppShell>
  );
}
