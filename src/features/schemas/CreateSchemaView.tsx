"use client";

import Link from "next/link";
import { useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { Tabs, type TabItem } from "@/components/ui/Tabs";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";

/** The two schema formats the network issues against. */
const LEDGERS: TabItem[] = [
  { id: "indy", label: "AnonCreds", icon: "credentials" },
  { id: "w3c", label: "W3C", icon: "fileText" },
];

interface Attribute {
  id: number;
  name: string;
  type: string;
}

const TYPES = ["string", "number", "boolean", "date"];

export function CreateSchemaView() {
  const [ledger, setLedger] = useState("indy");
  /* Seeded with one row: an attribute list that starts empty reads as broken,
     and every schema has at least one. */
  const [attributes, setAttributes] = useState<Attribute[]>([{ id: 1, name: "", type: "string" }]);
  const [nextId, setNextId] = useState(2);

  const update = (id: number, patch: Partial<Attribute>) =>
    setAttributes((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Schemas", href: "/schemas" }, { label: "Create" }]}
          title="Create schema"
        />

        <Panel>
          <div className="relative z-[4] flex flex-col gap-6">
            <div className="flex flex-col gap-2.5">
              <span className={LABEL_CLASS}>Schema format</span>
              <Tabs tabs={LEDGERS} active={ledger} onChange={setLedger} label="Schema format" />
            </div>

            <div className="grid gap-4 min-[641px]:grid-cols-[1fr_180px]">
              <label className={FIELD_BLOCK_CLASS}>
                <span className={LABEL_CLASS}>Schema name</span>
                <input className={`${FIELD_CLASS} h-12`} placeholder="Proof of residence" />
              </label>
              <label className={FIELD_BLOCK_CLASS}>
                <span className={LABEL_CLASS}>Version</span>
                <input className={`${FIELD_CLASS} h-12`} placeholder="1.0" inputMode="decimal" />
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className={LABEL_CLASS}>Attributes</span>
                <span className="text-[12.5px] text-faint">
                  {attributes.length} {attributes.length === 1 ? "attribute" : "attributes"}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {attributes.map((attr) => (
                  <div
                    key={attr.id}
                    className="grid gap-2.5 min-[641px]:grid-cols-[1fr_160px_auto] min-[641px]:items-center"
                  >
                    <input
                      className={`${FIELD_CLASS} h-11`}
                      placeholder="Attribute name"
                      aria-label="Attribute name"
                      value={attr.name}
                      onChange={(e) => update(attr.id, { name: e.target.value })}
                    />
                    <label className="flex items-center">
                      <span className="sr-only">Attribute type</span>
                      <select
                        className="ndi-select w-full"
                        value={attr.type}
                        onChange={(e) => update(attr.id, { type: e.target.value })}
                      >
                        {TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      aria-label={`Remove attribute ${attr.name || attr.id}`}
                      /* The last row cannot go: a schema with no attributes is
                         not a schema. */
                      disabled={attributes.length === 1}
                      onClick={() => setAttributes((rows) => rows.filter((r) => r.id !== attr.id))}
                      className="ndi-iconbtn inline-flex h-11 w-11 items-center justify-center rounded-[10px] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Icon name="trash" size={16} strokeWidth={1.8} />
                    </button>
                  </div>
                ))}
              </div>

              <HairlineButton
                className="h-11 self-start px-4 text-[13px]"
                onClick={() => {
                  setAttributes((rows) => [...rows, { id: nextId, name: "", type: "string" }]);
                  setNextId((n) => n + 1);
                }}
              >
                <Icon name="plus" size={15} strokeWidth={2} />
                Add attribute
              </HairlineButton>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 border-t border-subtle pt-5">
              <GradientButton>
                <Icon name="check" size={16} strokeWidth={2.2} />
                Create schema
              </GradientButton>
              <Link href="/schemas">
                <HairlineButton className="h-12">Cancel</HairlineButton>
              </Link>
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
