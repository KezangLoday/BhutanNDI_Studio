"use client";

import Link from "next/link";
import { useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SearchField } from "@/components/ui/SearchField";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";
import { useDemo } from "@/lib/demoStore";

export function OrganizationsView() {
  const { organizations, addOrganization, removeOrganization } = useDemo();
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const q = query.trim().toLowerCase();
  const rows = organizations.filter((o) => !q || o.name.toLowerCase().includes(q));

  const submit = () => {
    if (!name.trim()) return;
    addOrganization({ name: name.trim(), description: description.trim() });
    setName("");
    setDescription("");
    setCreating(false);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Organizations" }]}
          title="Organizations"
          actions={
            <>
              <SearchField
                className="w-full min-[561px]:w-[280px]"
                placeholder="Search organizations"
                value={query}
                onChange={setQuery}
              />
              <GradientButton className="h-11" onClick={() => setCreating((c) => !c)}>
                <Icon name={creating ? "close" : "plus"} size={16} strokeWidth={2} />
                {creating ? "Cancel" : "Create"}
              </GradientButton>
            </>
          }
        />

        {creating ? (
          <Panel>
            <div className="relative z-[4] flex flex-col gap-5">
              <div className="grid gap-4 min-[641px]:grid-cols-[1fr_1.4fr]">
                <label className={FIELD_BLOCK_CLASS}>
                  <span className={LABEL_CLASS}>Name</span>
                  <input
                    className={`${FIELD_CLASS} h-12`}
                    placeholder="Ministry of Health"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className={FIELD_BLOCK_CLASS}>
                  <span className={LABEL_CLASS}>Description</span>
                  <input
                    className={`${FIELD_CLASS} h-12`}
                    placeholder="What this organization issues"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
              </div>
              <div className="border-t border-subtle pt-5">
                <GradientButton onClick={submit}>
                  <Icon name="check" size={16} strokeWidth={2.2} />
                  Create organization
                </GradientButton>
              </div>
            </div>
          </Panel>
        ) : null}

        {rows.length ? (
          <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            {rows.map((o) => (
              <Panel key={o.id}>
                <div className="relative z-[4] flex h-full flex-col gap-3.5">
                  <div className="flex items-start gap-3">
                    <span
                      className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-grid font-display text-[15px] font-semibold text-[var(--text-on-mint)]"
                      style={{ background: "var(--grad-mint)" }}
                    >
                      {o.name.slice(0, 1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="m-0 truncate font-display text-[16px] font-semibold tracking-[-0.01em] text-strong">
                        {o.name}
                      </h2>
                      <p className="m-0 mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        {o.role}
                      </p>
                    </div>
                  </div>

                  <p className="m-0 text-[13.5px] leading-[1.55] text-muted">
                    {o.description || "No description."}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-subtle pt-3.5">
                    <span className="text-[12.5px] text-faint">
                      {o.members} {o.members === 1 ? "member" : "members"} · {o.createdAt}
                    </span>
                    <span className="flex items-center gap-2.5">
                      <Link
                        href="/users"
                        className="ndi-plainlink whitespace-nowrap text-[12.5px] text-accent"
                      >
                        Members
                      </Link>
                      {/* An owner can leave the last organization in the demo;
                          nothing depends on there being one. */}
                      <button
                        type="button"
                        onClick={() => removeOrganization(o.id)}
                        className="ndi-plainlink whitespace-nowrap text-[12.5px] text-muted"
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        ) : (
          <Panel padded={false}>
            <EmptyState
              icon="building"
              tone={q ? "filtered" : "empty"}
              title={q ? "No organizations match that search" : "No organizations yet"}
              message={
                q
                  ? "Nothing here matches what you typed."
                  : "An organization owns the schemas, credential definitions and connections you issue under. Create one to get started."
              }
              action={
                q ? (
                  <HairlineButton onClick={() => setQuery("")}>Clear search</HairlineButton>
                ) : (
                  <GradientButton onClick={() => setCreating(true)}>
                    <Icon name="plus" size={16} strokeWidth={2} />
                    Create organization
                  </GradientButton>
                )
              }
            />
          </Panel>
        )}
      </div>
    </AppShell>
  );
}
