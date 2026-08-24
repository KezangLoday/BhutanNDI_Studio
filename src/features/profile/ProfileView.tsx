"use client";

import { useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";

const TABS: TabItem[] = [
  { id: "profile", label: "Profile", icon: "user" },
  { id: "passkey", label: "Passkey", icon: "fingerprint" },
  { id: "sessions", label: "Sessions", icon: "shieldCheck" },
];

export function ProfileView() {
  const [tab, setTab] = useState("profile");

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader crumbs={[{ label: "Profile" }]} title="Profile" />

        <Tabs tabs={TABS} active={tab} onChange={setTab} label="Profile sections" />

        {tab === "profile" ? (
          <Panel>
            <div className="relative z-[4] flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <span
                  className="inline-flex h-16 w-16 flex-none items-center justify-center rounded-full border border-grid font-display text-[22px] font-semibold text-[var(--text-on-mint)]"
                  style={{ background: "var(--grad-mint)" }}
                >
                  K
                </span>
                <HairlineButton className="h-11 px-4 text-[13px]">
                  <Icon name="edit" size={15} strokeWidth={1.8} />
                  Change photo
                </HairlineButton>
              </div>

              <div className="grid gap-4 min-[641px]:grid-cols-2">
                <label className={FIELD_BLOCK_CLASS}>
                  <span className={LABEL_CLASS}>First name</span>
                  <input className={`${FIELD_CLASS} h-12`} defaultValue="Kezang" />
                </label>
                <label className={FIELD_BLOCK_CLASS}>
                  <span className={LABEL_CLASS}>Last name</span>
                  <input className={`${FIELD_CLASS} h-12`} defaultValue="Loday" />
                </label>
              </div>

              <label className={FIELD_BLOCK_CLASS}>
                <span className={LABEL_CLASS}>Email</span>
                {/* Shown but not editable here: the email is the account
                    identity, so changing it is a re-verification flow rather
                    than a field you save with the rest of the form. */}
                <input
                  className={`${FIELD_CLASS} h-12 cursor-not-allowed opacity-70`}
                  defaultValue="kezang@bhutanndi.bt"
                  readOnly
                />
                <span className="text-[12.5px] leading-[1.5] text-faint">
                  Your email identifies the account and cannot be changed here.
                </span>
              </label>

              <div className="flex flex-wrap items-center gap-2.5 border-t border-subtle pt-5">
                <GradientButton>
                  <Icon name="check" size={16} strokeWidth={2.2} />
                  Save changes
                </GradientButton>
                <HairlineButton className="h-12">Cancel</HairlineButton>
              </div>
            </div>
          </Panel>
        ) : null}

        {tab === "passkey" ? (
          <Panel padded={false}>
            <DataTable
              columns={["Passkey", "Device", "Added on", "Last used"]}
              empty={{
                icon: "fingerprint",
                title: "No passkeys registered",
                message:
                  "A passkey signs you in with the device you already unlock, so there is no password to phish or reuse. Register one to stop relying on a password.",
                action: (
                  <GradientButton>
                    <Icon name="plus" size={16} strokeWidth={2} />
                    Add passkey
                  </GradientButton>
                ),
              }}
            />
          </Panel>
        ) : null}

        {tab === "sessions" ? (
          <Panel padded={false}>
            {/* The current session is always real, so this table is never
                empty and needs no empty state. */}
            <DataTable columns={["Device", "Location", "Signed in", "Last active"]}>
              <tr>
                <td>
                  <span className="flex items-center gap-2.5">
                    <Icon name="shieldCheck" size={16} strokeWidth={1.8} className="text-accent" />
                    This device
                  </span>
                </td>
                <td className="text-muted">&mdash;</td>
                <td className="text-muted">&mdash;</td>
                <td className="text-muted">Now</td>
              </tr>
            </DataTable>
          </Panel>
        ) : null}
      </div>
    </AppShell>
  );
}
