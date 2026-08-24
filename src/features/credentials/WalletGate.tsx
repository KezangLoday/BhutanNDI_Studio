"use client";

import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Icon } from "@/components/ui/icons";

/**
 * Issue and Verify share one precondition: the organization needs a wallet
 * before either page has anything to show. This is a blocked state rather than
 * an empty one — nothing is missing because the user hasn't made it yet, so the
 * copy names who unblocks it and the tone is neutral rather than inviting.
 */
export function WalletGate({ title, crumbLabel }: { title: string; crumbLabel: string }) {
  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Organizations", href: "/organizations" }, { label: crumbLabel }]}
          title={title}
        />

        <Panel padded={false}>
          <EmptyState
            icon="wallet"
            tone="filtered"
            title="No wallet for this organization"
            message="Issuing and verifying both run through an organization wallet. The organization owner needs to create one before this page has anything to show."
            action={
              <Link
                href="/organizations"
                className="ndi-hairline-btn inline-flex h-11 items-center justify-center gap-2.5 rounded-xl border border-grid bg-[rgb(var(--tint)/0.03)] px-5 font-display text-[13.5px] font-semibold text-body"
              >
                <Icon name="building" size={15} strokeWidth={1.7} />
                Go to organizations
              </Link>
            }
          />
        </Panel>
      </div>
    </AppShell>
  );
}
