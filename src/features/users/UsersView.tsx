"use client";

import { useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { SearchField } from "@/components/ui/SearchField";
import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { Icon } from "@/components/ui/icons";

const TABS: TabItem[] = [
  { id: "users", label: "Users", icon: "users" },
  { id: "invitations", label: "Invitations", icon: "mail" },
];

export function UsersView() {
  const [tab, setTab] = useState("users");

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Organizations", href: "/organizations" }, { label: "Users" }]}
          title="Users"
        />

        <Tabs tabs={TABS} active={tab} onChange={setTab} label="Users and invitations" />

        <Panel padded={false}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle p-4 min-[641px]:px-6">
            <p className="m-0 text-[13px] text-faint">
              {tab === "users" ? "0 members" : "0 pending invitations"}
            </p>
            <SearchField
              className="w-full min-[561px]:w-[280px]"
              placeholder={tab === "users" ? "Search members" : "Search invitations"}
            />
          </div>

          {tab === "users" ? (
            <EmptyState
              icon="users"
              title="No members yet"
              message="Members belong to an organization. Create an organization first, then invite the people who will issue and verify alongside you."
              action={
                <HairlineButton>
                  <Icon name="plus" size={15} strokeWidth={2} />
                  Invite a member
                </HairlineButton>
              }
            />
          ) : (
            <EmptyState
              icon="mail"
              title="No pending invitations"
              message="Invitations you send appear here until they are accepted or they expire."
              action={
                <HairlineButton>
                  <Icon name="plus" size={15} strokeWidth={2} />
                  Send an invitation
                </HairlineButton>
              }
            />
          )}
        </Panel>
      </div>
    </AppShell>
  );
}
