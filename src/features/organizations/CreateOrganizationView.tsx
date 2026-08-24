"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { GradientButton } from "@/components/ui/GradientButton";
import { HairlineButton } from "@/components/ui/HairlineButton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Panel";
import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";
import { useDemo } from "@/lib/demoStore";

const VISIBILITY = [
  {
    id: "public" as const,
    label: "Public",
    hint: "Listed in the ecosystem directory. Other organizations can find you and invite you.",
  },
  {
    id: "private" as const,
    label: "Private",
    hint: "Reachable only by invitation. Nothing about the organization is listed.",
  },
];

/**
 * Creating an organization is the first thing a new account does, and
 * everything else hangs off it, so it gets a page rather than a modal — there
 * is nothing behind it worth keeping in view.
 */
export function CreateOrganizationView() {
  const router = useRouter();
  const { addOrganization } = useDemo();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [touched, setTouched] = useState(false);

  const submit = () => {
    setTouched(true);
    if (!name.trim()) return;
    addOrganization({
      name: name.trim(),
      description: description.trim(),
      website: website.trim() || undefined,
      location: location.trim() || undefined,
      visibility,
    });
    router.push("/dashboard");
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <PageHeader
          crumbs={[{ label: "Organizations", href: "/organizations" }, { label: "Create" }]}
          title="Create organization"
        />

        <p className="m-0 max-w-[62ch] text-[15px] leading-[1.6] text-muted">
          An organization owns the schemas, credential definitions, connections and wallet you
          issue under. You become its owner.
        </p>

        <Panel>
          <div className="relative z-[4] flex flex-col gap-6">
            <div className="grid gap-4 min-[641px]:grid-cols-2">
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
                <span className={LABEL_CLASS}>Location</span>
                <input
                  className={`${FIELD_CLASS} h-12`}
                  placeholder="Thimphu, Bhutan"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
            </div>

            <label className={FIELD_BLOCK_CLASS}>
              <span className={LABEL_CLASS}>Description</span>
              <input
                className={`${FIELD_CLASS} h-12`}
                placeholder="What this organization issues or verifies"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <label className={FIELD_BLOCK_CLASS}>
              <span className={LABEL_CLASS}>Website</span>
              <input
                className={`${FIELD_CLASS} h-12`}
                placeholder="https://example.bt"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>

            <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
              <legend className={`${LABEL_CLASS} p-0`}>Visibility</legend>
              <div className="grid gap-2.5 min-[641px]:grid-cols-2">
                {VISIBILITY.map((v) => (
                  <label
                    key={v.id}
                    className="ndi-lift flex cursor-pointer items-start gap-3 rounded-xl border p-3.5"
                    style={{
                      borderColor:
                        visibility === v.id ? "var(--border-strong)" : "var(--border-grid)",
                      background:
                        visibility === v.id ? "var(--ndi-mint-08)" : "rgb(var(--tint) / 0.02)",
                    }}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      className="ndi-check mt-0.5 flex-none"
                      checked={visibility === v.id}
                      onChange={() => setVisibility(v.id)}
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-[14px] font-medium text-strong">
                        {v.label}
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-[1.5] text-muted">
                        {v.hint}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {touched && !name.trim() ? (
              <p
                role="alert"
                className="m-0 flex items-center gap-2 text-[13px] text-[var(--text-danger)]"
              >
                <Icon name="shieldAlert" size={15} strokeWidth={2} />
                An organization needs a name.
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-2.5 border-t border-subtle pt-5">
              <GradientButton onClick={submit}>
                <Icon name="check" size={16} strokeWidth={2.2} />
                Create organization
              </GradientButton>
              <Link href="/organizations">
                <HairlineButton className="h-12">Cancel</HairlineButton>
              </Link>
            </div>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
