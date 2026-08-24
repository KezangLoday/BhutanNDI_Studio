"use client";

import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { Panel } from "@/components/ui/Panel";
import { StatCard } from "@/components/ui/StatCard";
import { WaveBanner } from "@/components/ui/WaveBanner";
import { Icon } from "@/components/ui/icons";
import { useDemo } from "@/lib/demoStore";

export function DashboardView({ firstName = "Kezang" }: { firstName?: string }) {
  const { organizations, schemas, credDefs, credentials, activity } = useDemo();

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <WaveBanner
          eyebrow="— Dashboard"
          title={
            <>
              Welcome back, <span className="ndi-wave-text ndi-wave-tight">{firstName}</span>
            </>
          }
          lead={
            organizations.length
              ? "Issue and verify credentials on the Bhutan NDI network."
              : "Create an organization to start issuing and verifying credentials on the Bhutan NDI network."
          }
          action={
            <Link href={organizations.length ? "/credentials/issue" : "/organizations"}>
              <GradientButton>
                <Icon
                  name={organizations.length ? "issue" : "plus"}
                  size={16}
                  strokeWidth={2}
                />
                {organizations.length ? "Issue credential" : "Create organization"}
              </GradientButton>
            </Link>
          }
        />

        {/* Column count follows the space the cards actually have, not the
            viewport. A viewport breakpoint got this backwards: at 900px the
            drawer is closed and the full width goes to one stretched card,
            then at 901px the sidebar claims 248px and the same content has to
            fit two. Letting the track size drive it also fills a wide display
            with four across instead of two and a lake of empty space. */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
          <StatCard
            title="Organizations"
            count={organizations.length}
            hint="An organization owns the schemas, credential definitions and connections you issue under."
            emptyIcon="building"
            emptyMessage="You have no organizations created or joined."
            action={
              <Link href="/organizations">
                <HairlineButton className="mt-1 h-10 px-4 text-[13px]">
                  <Icon name="plus" size={15} strokeWidth={2} />
                  Create organization
                </HairlineButton>
              </Link>
            }
          >
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {organizations.slice(0, 3).map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3">
                  <span className="truncate text-[13.5px] text-body">{o.name}</span>
                  <span className="flex-none text-[12px] text-faint">{o.role}</span>
                </li>
              ))}
            </ul>
          </StatCard>

          <StatCard
            title="Schemas"
            count={schemas.length}
            hint="A schema names the attributes a credential carries — it is the shape, not the data."
            emptyIcon="fileText"
            emptyMessage="You have no schemas created."
          >
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {schemas.slice(0, 3).map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3">
                  <span className="truncate text-[13.5px] text-body">{s.name}</span>
                  <span className="flex-none font-mono text-[11px] text-faint">v{s.version}</span>
                </li>
              ))}
            </ul>
          </StatCard>

          <StatCard
            title="Credential definitions"
            count={credDefs.length}
            hint="A credential definition binds one schema to one issuing organization, ready to issue against."
            emptyIcon="credentials"
            emptyMessage="You have no credential definitions created."
          >
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {credDefs.slice(0, 3).map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-3">
                  <span className="truncate text-[13.5px] text-body">{d.tag}</span>
                  <span className="flex-none text-[12px] text-faint">
                    {d.revocable ? "Revocable" : "Fixed"}
                  </span>
                </li>
              ))}
            </ul>
          </StatCard>

          <StatCard
            title="Credentials issued"
            count={credentials.length}
            hint="Every credential this organization has offered, and what became of it."
            emptyIcon="issue"
            emptyMessage="You have not issued any credentials yet."
          >
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {credentials.slice(0, 3).map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3">
                  <span className="truncate text-[13.5px] text-body">{c.holder}</span>
                  <span className="flex-none text-[12px] capitalize text-faint">{c.state}</span>
                </li>
              ))}
            </ul>
          </StatCard>
        </div>

        <Panel>
          <div className="relative z-[4] flex flex-col gap-4">
            <h2 className="m-0 font-display text-[17px] font-semibold leading-[1.25] tracking-[-0.01em] text-strong">
              Recent activity
            </h2>
            {activity.length ? (
              <ol className="m-0 flex list-none flex-col p-0">
                {activity.slice(0, 6).map((a, i) => (
                  <li
                    key={a.id}
                    className={`flex flex-wrap items-center justify-between gap-3 py-2.5 ${
                      i > 0 ? "border-t border-subtle" : ""
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 flex-none rounded-full"
                        style={{ background: "var(--accent)" }}
                      />
                      <span className="truncate text-[13.5px] text-body">{a.text}</span>
                    </span>
                    <span className="flex-none text-[12px] text-faint">{a.at}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="m-0 text-[13.5px] text-muted">Looks like there is no activity yet.</p>
            )}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
