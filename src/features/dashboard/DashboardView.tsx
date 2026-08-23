"use client";

import { AppShell } from "@/components/layout/AppShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { StatCard } from "@/components/ui/StatCard";
import { WaveBanner } from "@/components/ui/WaveBanner";
import { Icon } from "@/components/ui/icons";

export function DashboardView({ firstName = "Kezang" }: { firstName?: string }) {
  return (
    <AppShell active="Dashboard">
      <div className="flex flex-col gap-5">
        <WaveBanner
          eyebrow="— Dashboard"
          title={
            <>
              Welcome back, <span className="ndi-wave-text ndi-wave-tight">{firstName}</span>
            </>
          }
          lead="Create an organization to start issuing and verifying credentials on the Bhutan NDI network."
          action={
            <GradientButton>
              <Icon name="plus" size={16} strokeWidth={2} />
              Create organization
            </GradientButton>
          }
        />

        <div className="grid grid-cols-1 gap-5 min-[901px]:grid-cols-2">
          <StatCard
            title="Organizations"
            count={0}
            hint="An organization owns the schemas, credential definitions and connections you issue under."
            emptyIcon="building"
            emptyMessage="You have no organizations created or joined."
            action={
              <HairlineButton className="mt-1 h-10 px-4 text-[13px]">
                <Icon name="plus" size={15} strokeWidth={2} />
                Create organization
              </HairlineButton>
            }
          />

          <StatCard
            title="Schemas"
            count={0}
            hint="A schema names the attributes a credential carries — it is the shape, not the data."
            emptyIcon="fileText"
            emptyMessage="You have no schemas created."
          />

          <StatCard
            title="Credential definitions"
            count={0}
            hint="A credential definition binds one schema to one issuing organization, ready to issue against."
            emptyIcon="credentials"
            emptyMessage="You have no credential definitions created."
          />

          <StatCard
            title="Recent activity"
            hint="Issuance, verification and connection events from across your organizations."
            emptyIcon="connections"
            emptyMessage="Looks like there is no activity yet."
          />
        </div>
      </div>
    </AppShell>
  );
}
