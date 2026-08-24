"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  SEED,
  type Attribute,
  type BulkUpload,
  type Certificate,
  type Connection,
  type CredDef,
  type Credential,
  type DemoState,
  type Did,
  type Ecosystem,
  type Invitation,
  type LedgerKind,
  type Member,
  type Organization,
  type Schema,
  type Verification,
} from "./demoData";

const STORAGE_KEY = "ndi-studio-demo";

/** Today, as the seed writes dates. Anything created in a demo is dated now. */
const today = () => new Date().toISOString().slice(0, 10);
const rid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

interface DemoActions {
  addSchema: (input: {
    name: string;
    version: string;
    ledger: LedgerKind;
    attributes: Attribute[];
  }) => Schema;
  addCredDef: (input: { schemaId: string; tag: string; revocable: boolean }) => CredDef;
  addDid: (input: { method: string; keyType: string; alias: string }) => Did;
  setIssuerDid: (id: string) => void;
  removeDid: (id: string) => void;
  issueCredentials: (input: {
    holders: string[];
    schemaName: string;
    credDefTag: string;
    method: Credential["method"];
  }) => Credential[];
  setCredentialState: (id: string, state: Credential["state"]) => void;
  addVerification: (input: { holder: string; schemaName: string }) => Verification;
  setVerificationState: (id: string, state: Verification["state"]) => void;
  addConnection: (label: string) => Connection;
  addOrganization: (input: { name: string; description: string }) => Organization;
  removeOrganization: (id: string) => void;
  inviteMember: (input: { email: string; role: Member["role"] }) => Member;
  removeMember: (id: string) => void;
  addCertificate: (input: { commonName: string; keyType: string; expires: string }) => Certificate;
  removeCertificate: (id: string) => void;
  respondToInvitation: (id: string, state: Invitation["state"]) => void;
  addEcosystem: (name: string) => Ecosystem;
  inviteEcosystemMember: (organization: string) => void;
  addBulkUpload: (input: { fileName: string; records: number }) => BulkUpload;
  addApiKey: (label: string) => void;
  revokeApiKey: (id: string) => void;
  resetDemo: () => void;
  /** False until the persisted state has been read, so lists can hold still. */
  hydrated: boolean;
}

type DemoContextValue = DemoState & DemoActions;

const DemoContext = createContext<DemoContextValue | null>(null);

/**
 * The demo's single source of truth.
 *
 * State starts as the seed on both server and client so the first client
 * render matches the server's HTML; anything the visitor did in a previous
 * session is read from localStorage in an effect and swapped in afterwards.
 * Doing it the other way — reading storage during render — is the classic
 * hydration mismatch.
 */
export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(SEED);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<DemoState>;
        /* Merged over the seed rather than replacing it, so a state saved by an
           older build that lacks a newer collection still loads. */
        setState({ ...SEED, ...parsed });
      }
    } catch {
      /* Corrupt or unavailable storage just means the demo starts fresh. */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* Over quota or private mode — the demo still works for this session. */
    }
  }, [state, hydrated]);

  const log = useCallback(
    (text: string) =>
      setState((s) => ({
        ...s,
        activity: [{ id: rid("a"), text, at: today() }, ...s.activity].slice(0, 20),
      })),
    [],
  );

  const actions = useMemo<DemoActions>(
    () => ({
      hydrated,

      addSchema: ({ name, version, ledger, attributes }) => {
        const schema: Schema = {
          id: `schema:bhutan:2:${name.replace(/\s+/g, "")}:${version}`,
          name,
          version,
          ledger,
          issuerDid: SEED.dids[0].id,
          attributes,
          createdAt: today(),
        };
        setState((s) => ({ ...s, schemas: [schema, ...s.schemas] }));
        log(`Schema ${name} v${version} created`);
        return schema;
      },

      addCredDef: ({ schemaId, tag, revocable }) => {
        const def: CredDef = {
          id: `creddef:bhutan:3:${tag}`,
          schemaId,
          tag,
          revocable,
          createdAt: today(),
        };
        setState((s) => ({ ...s, credDefs: [def, ...s.credDefs] }));
        log(`Credential definition ${tag} created`);
        return def;
      },

      addDid: ({ method, keyType, alias }) => {
        const did: Did = {
          id: `${method}:bhutan:${Math.random().toString(36).slice(2, 24)}`,
          method,
          keyType,
          alias,
          isIssuer: false,
          createdAt: today(),
        };
        setState((s) => ({ ...s, dids: [did, ...s.dids] }));
        log(`DID created (${method})`);
        return did;
      },

      setIssuerDid: (id) => {
        setState((s) => ({
          ...s,
          dids: s.dids.map((d) => ({ ...d, isIssuer: d.id === id })),
        }));
        log("Issuing DID changed");
      },

      removeDid: (id) => setState((s) => ({ ...s, dids: s.dids.filter((d) => d.id !== id) })),

      issueCredentials: ({ holders, schemaName, credDefTag, method }) => {
        const created: Credential[] = holders.map((holder) => ({
          id: rid("cred"),
          holder,
          schemaName,
          credDefTag,
          state: "offered",
          issuedAt: today(),
          method,
        }));
        setState((s) => ({ ...s, credentials: [...created, ...s.credentials] }));
        log(
          holders.length === 1
            ? `Credential offered to ${holders[0]}`
            : `${holders.length} credentials offered`,
        );
        return created;
      },

      setCredentialState: (id, state) => {
        setState((s) => ({
          ...s,
          credentials: s.credentials.map((c) => (c.id === id ? { ...c, state } : c)),
        }));
        log(`Credential ${state}`);
      },

      addVerification: ({ holder, schemaName }) => {
        const v: Verification = {
          id: rid("ver"),
          holder,
          schemaName,
          state: "requested",
          requestedAt: today(),
        };
        setState((s) => ({ ...s, verifications: [v, ...s.verifications] }));
        log(`Presentation requested from ${holder}`);
        return v;
      },

      setVerificationState: (id, state) => {
        setState((s) => ({
          ...s,
          verifications: s.verifications.map((v) => (v.id === id ? { ...v, state } : v)),
        }));
        log(`Presentation ${state}`);
      },

      addConnection: (label) => {
        const c: Connection = { id: rid("c"), label, status: "invited", createdAt: today() };
        setState((s) => ({ ...s, connections: [c, ...s.connections] }));
        log(`Connection invited: ${label}`);
        return c;
      },

      addOrganization: ({ name, description }) => {
        const org: Organization = {
          id: rid("org"),
          name,
          description,
          role: "Owner",
          members: 1,
          createdAt: today(),
        };
        setState((s) => ({ ...s, organizations: [org, ...s.organizations] }));
        log(`Organization ${name} created`);
        return org;
      },

      removeOrganization: (id) =>
        setState((s) => ({ ...s, organizations: s.organizations.filter((o) => o.id !== id) })),

      inviteMember: ({ email, role }) => {
        const m: Member = {
          id: rid("m"),
          name: email.split("@")[0].replace(/[._]/g, " "),
          email,
          role,
          status: "invited",
          joinedAt: today(),
        };
        setState((s) => ({ ...s, members: [...s.members, m] }));
        log(`${email} invited as ${role}`);
        return m;
      },

      removeMember: (id) => setState((s) => ({ ...s, members: s.members.filter((m) => m.id !== id) })),

      addCertificate: ({ commonName, keyType, expires }) => {
        const cert: Certificate = {
          id: rid("x509"),
          commonName,
          keyType,
          validFrom: today(),
          expires,
          status: "valid",
        };
        setState((s) => ({ ...s, certificates: [cert, ...s.certificates] }));
        log(`Certificate added for ${commonName}`);
        return cert;
      },

      removeCertificate: (id) =>
        setState((s) => ({ ...s, certificates: s.certificates.filter((c) => c.id !== id) })),

      respondToInvitation: (id, state) => {
        setState((s) => ({
          ...s,
          invitations: s.invitations.map((i) => (i.id === id ? { ...i, state } : i)),
        }));
        log(`Invitation ${state}`);
      },

      addEcosystem: (name) => {
        const eco: Ecosystem = { id: rid("eco"), name, role: "Lead", members: 1, joinedAt: today() };
        setState((s) => ({ ...s, ecosystems: [eco, ...s.ecosystems] }));
        log(`Ecosystem ${name} created`);
        return eco;
      },

      inviteEcosystemMember: (organization) => {
        setState((s) => ({
          ...s,
          ecosystemMembers: [
            ...s.ecosystemMembers,
            {
              id: rid("em"),
              organization,
              role: "Issuer",
              joinedAt: today(),
              status: "invited",
            },
          ],
        }));
        log(`${organization} invited to the ecosystem`);
      },

      addBulkUpload: ({ fileName, records }) => {
        /* A demo upload that always succeeds teaches nothing about the failure
           report, so a small share of rows fail the way real ones do. */
        const failed = Math.min(records, Math.round(records * 0.02));
        const upload: BulkUpload = {
          id: rid("bulk"),
          fileName,
          records,
          succeeded: records - failed,
          failed,
          status: failed > 0 ? "partial" : "completed",
          uploadedAt: today(),
        };
        setState((s) => ({ ...s, bulkUploads: [upload, ...s.bulkUploads] }));
        log(`Bulk upload ${fileName} ${upload.status}`);
        return upload;
      },

      addApiKey: (label) => {
        setState((s) => ({
          ...s,
          apiKeys: [
            {
              id: rid("key"),
              label,
              masked: `ndi_live_••••••••${Math.random().toString(16).slice(2, 6)}`,
              createdAt: today(),
              lastUsed: "—",
              status: "active",
            },
            ...s.apiKeys,
          ],
        }));
        log(`API key ${label} created`);
      },

      revokeApiKey: (id) =>
        setState((s) => ({
          ...s,
          apiKeys: s.apiKeys.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)),
        })),

      resetDemo: () => {
        setState(SEED);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* nothing to clear */
        }
      },
    }),
    [hydrated, log],
  );

  const value = useMemo<DemoContextValue>(() => ({ ...state, ...actions }), [state, actions]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
