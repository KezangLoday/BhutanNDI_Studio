"use client";

import Link from "next/link";

import { FIELD_BLOCK_CLASS, FIELD_CLASS, LABEL_CLASS } from "@/components/ui/formStyles";
import { Icon } from "@/components/ui/icons";

import type { useIssuanceForm } from "./useIssuanceForm";

type Form = ReturnType<typeof useIssuanceForm>;

/**
 * Schema, definition and attribute fields — the part of issuance that does not
 * care how the offer reaches the holder, so all four routes render it.
 *
 * The attribute fields appear only once a definition is chosen: which fields
 * exist is a property of the schema, so showing them earlier would mean
 * showing the wrong ones.
 */
export function CredentialPicker({ form }: { form: Form }) {
  const { schemas, schema, schemaId, chooseSchema, defs, credDefId, setCredDefId, values, setValue } =
    form;

  return (
    <>
      <div className="grid gap-4 min-[641px]:grid-cols-2">
        <label className={FIELD_BLOCK_CLASS}>
          <span className={LABEL_CLASS}>Schema</span>
          <select
            className="ndi-select h-12 w-full"
            value={schemaId}
            onChange={(e) => chooseSchema(e.target.value)}
          >
            {schemas.length ? (
              schemas.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} v{s.version}
                </option>
              ))
            ) : (
              <option value="">No schemas available</option>
            )}
          </select>
        </label>

        <label className={FIELD_BLOCK_CLASS}>
          <span className={LABEL_CLASS}>Credential definition</span>
          <select
            className="ndi-select h-12 w-full"
            value={credDefId}
            onChange={(e) => setCredDefId(e.target.value)}
            disabled={!defs.length}
          >
            {defs.length ? (
              defs.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.tag}
                  {d.revocable ? " (revocable)" : ""}
                </option>
              ))
            ) : (
              <option value="">No definitions for this schema</option>
            )}
          </select>
          {schema && !defs.length ? (
            <span className="text-[12.5px] leading-[1.5] text-faint">
              <Link
                href={`/schemas/${encodeURIComponent(schema.id)}`}
                className="ndi-plainlink text-accent"
              >
                Create a definition
              </Link>{" "}
              for this schema before issuing against it.
            </span>
          ) : null}
        </label>
      </div>

      {schema && defs.length ? (
        <div className="flex flex-col gap-3">
          <span className={LABEL_CLASS}>Attributes</span>
          <div className="grid gap-4 min-[641px]:grid-cols-2">
            {schema.attributes.map((a) => (
              <label key={a.name} className={FIELD_BLOCK_CLASS}>
                <span className="flex items-center gap-2 font-mono text-[11px] text-muted">
                  {a.name}
                  <span className="text-faint">{a.type}</span>
                </span>
                <input
                  className={`${FIELD_CLASS} h-11`}
                  type={a.type === "date" ? "date" : a.type === "number" ? "number" : "text"}
                  placeholder={a.type === "date" ? "" : a.name.replace(/_/g, " ")}
                  value={values[a.name] ?? ""}
                  onChange={(e) => setValue(a.name, e.target.value)}
                />
              </label>
            ))}
          </div>
        </div>
      ) : null}

      {!schemas.length ? (
        <p className="m-0 flex items-center gap-2 text-[13px] text-muted">
          <Icon name="info" size={15} strokeWidth={1.8} className="flex-none text-accent" />
          There are no schemas yet.{" "}
          <Link href="/schemas/create" className="ndi-plainlink text-accent">
            Create one
          </Link>{" "}
          before issuing.
        </p>
      ) : null}
    </>
  );
}
