/**
 * The demo's data model and its seed.
 *
 * There is no backend and there is not meant to be one — this is the Studio's
 * front end running against an in-browser store so the whole product can be
 * driven in a demo. Everything the UI can create, it creates here; everything
 * it lists, it lists from here. The seed exists so the app is worth looking at
 * on first load rather than being a tour of empty states.
 *
 * Ids are readable rather than random, because they show up in the UI and a
 * demo reads better with "did:indy:bhutan:XkT4..." than with a uuid.
 */

export type LedgerKind = "AnonCreds" | "W3C";
export type CredentialState = "offered" | "accepted" | "declined" | "revoked";
export type VerificationState = "requested" | "verified" | "declined" | "expired";

export interface Attribute {
  name: string;
  type: "string" | "number" | "boolean" | "date";
}

export interface Schema {
  id: string;
  name: string;
  version: string;
  ledger: LedgerKind;
  issuerDid: string;
  attributes: Attribute[];
  createdAt: string;
}

export interface CredDef {
  id: string;
  schemaId: string;
  tag: string;
  revocable: boolean;
  createdAt: string;
}

export interface Did {
  id: string;
  method: string;
  keyType: string;
  alias: string;
  isIssuer: boolean;
  createdAt: string;
}

export interface Connection {
  id: string;
  label: string;
  status: "active" | "invited";
  createdAt: string;
}

export interface Credential {
  id: string;
  holder: string;
  schemaName: string;
  credDefTag: string;
  state: CredentialState;
  issuedAt: string;
  method: "connection" | "email" | "qr" | "bulk";
}

export interface Verification {
  id: string;
  holder: string;
  schemaName: string;
  state: VerificationState;
  requestedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  role: "Owner" | "Admin" | "Member";
  members: number;
  createdAt: string;
  website?: string;
  location?: string;
  visibility: "public" | "private";
}

/** An invitation to join an ecosystem, as opposed to an organization. */
export interface EcosystemInvitation {
  id: string;
  ecosystem: string;
  invitedBy: string;
  role: "Issuer" | "Verifier";
  receivedAt: string;
  state: "pending" | "accepted" | "declined";
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Issuer" | "Verifier" | "Member";
  status: "active" | "invited";
  joinedAt: string;
}

export interface Certificate {
  id: string;
  commonName: string;
  keyType: string;
  validFrom: string;
  expires: string;
  status: "valid" | "expiring" | "expired";
}

export interface Invitation {
  id: string;
  organization: string;
  invitedBy: string;
  role: string;
  receivedAt: string;
  state: "pending" | "accepted" | "declined";
}

export interface Ecosystem {
  id: string;
  name: string;
  role: "Lead" | "Member";
  members: number;
  joinedAt: string;
}

export interface EcosystemMember {
  id: string;
  organization: string;
  role: "Lead" | "Issuer" | "Verifier";
  joinedAt: string;
  status: "active" | "invited";
}

export interface BulkUpload {
  id: string;
  fileName: string;
  records: number;
  succeeded: number;
  failed: number;
  status: "completed" | "partial" | "processing";
  uploadedAt: string;
}

export interface BulkRecord {
  id: string;
  uploadId: string;
  holder: string;
  status: "issued" | "failed";
  error?: string;
}

export interface ApiKey {
  id: string;
  label: string;
  masked: string;
  createdAt: string;
  lastUsed: string;
  status: "active" | "revoked";
}

export interface DemoState {
  /** Which organization the workspace is currently showing. */
  activeOrgId: string;
  schemas: Schema[];
  credDefs: CredDef[];
  dids: Did[];
  connections: Connection[];
  credentials: Credential[];
  verifications: Verification[];
  organizations: Organization[];
  members: Member[];
  certificates: Certificate[];
  invitations: Invitation[];
  ecosystems: Ecosystem[];
  ecosystemMembers: EcosystemMember[];
  ecosystemInvitations: EcosystemInvitation[];
  bulkUploads: BulkUpload[];
  bulkRecords: BulkRecord[];
  apiKeys: ApiKey[];
  activity: { id: string; text: string; at: string }[];
}

const ISSUER_DID = "did:indy:bhutan:8XkT4vQmR2sLpNbW9dHyZa";

/** Dates are fixed strings, not computed: a demo should look the same twice. */
export const SEED: DemoState = {
  activeOrgId: "org-ndi",
  schemas: [
    {
      id: "schema:bhutan:2:CitizenshipID:1.2",
      name: "Citizenship ID",
      version: "1.2",
      ledger: "AnonCreds",
      issuerDid: ISSUER_DID,
      createdAt: "2026-03-11",
      attributes: [
        { name: "cid_number", type: "string" },
        { name: "full_name", type: "string" },
        { name: "date_of_birth", type: "date" },
        { name: "dzongkhag", type: "string" },
      ],
    },
    {
      id: "schema:bhutan:2:UniversityDegree:1.0",
      name: "University Degree",
      version: "1.0",
      ledger: "W3C",
      issuerDid: ISSUER_DID,
      createdAt: "2026-04-02",
      attributes: [
        { name: "student_name", type: "string" },
        { name: "programme", type: "string" },
        { name: "graduation_year", type: "number" },
        { name: "honours", type: "string" },
      ],
    },
    {
      id: "schema:bhutan:2:DriversLicence:2.0",
      name: "Driving Licence",
      version: "2.0",
      ledger: "AnonCreds",
      issuerDid: ISSUER_DID,
      createdAt: "2026-05-19",
      attributes: [
        { name: "licence_number", type: "string" },
        { name: "vehicle_class", type: "string" },
        { name: "valid_until", type: "date" },
      ],
    },
  ],
  credDefs: [
    {
      id: "creddef:bhutan:3:CitizenshipID:default",
      schemaId: "schema:bhutan:2:CitizenshipID:1.2",
      tag: "default",
      revocable: true,
      createdAt: "2026-03-11",
    },
    {
      id: "creddef:bhutan:3:UniversityDegree:rub-2026",
      schemaId: "schema:bhutan:2:UniversityDegree:1.0",
      tag: "rub-2026",
      revocable: false,
      createdAt: "2026-04-02",
    },
  ],
  dids: [
    {
      id: ISSUER_DID,
      method: "did:indy",
      keyType: "ed25519",
      alias: "Issuer key",
      isIssuer: true,
      createdAt: "2026-02-28",
    },
    {
      id: "did:key:z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuBV8xRoAnwWsdvktH",
      method: "did:key",
      keyType: "ed25519",
      alias: "Test key",
      isIssuer: false,
      createdAt: "2026-04-20",
    },
  ],
  connections: [
    { id: "c-8f21ab4d", label: "Sonam Wangchuk", status: "active", createdAt: "2026-06-02" },
    { id: "c-4b90cc17", label: "Tashi Dema", status: "active", createdAt: "2026-06-14" },
    { id: "c-1e77fa02", label: "Karma Yangchen", status: "active", createdAt: "2026-07-08" },
    { id: "c-9d33b510", label: "Ugyen Tshering", status: "invited", createdAt: "2026-08-01" },
  ],
  credentials: [
    {
      id: "cred-70a1",
      holder: "Sonam Wangchuk",
      schemaName: "Citizenship ID",
      credDefTag: "default",
      state: "accepted",
      issuedAt: "2026-06-03",
      method: "connection",
    },
    {
      id: "cred-70a2",
      holder: "Tashi Dema",
      schemaName: "University Degree",
      credDefTag: "rub-2026",
      state: "accepted",
      issuedAt: "2026-06-15",
      method: "email",
    },
    {
      id: "cred-70a3",
      holder: "Karma Yangchen",
      schemaName: "Citizenship ID",
      credDefTag: "default",
      state: "offered",
      issuedAt: "2026-07-09",
      method: "qr",
    },
    {
      id: "cred-70a4",
      holder: "Ugyen Tshering",
      schemaName: "Driving Licence",
      credDefTag: "default",
      state: "declined",
      issuedAt: "2026-08-02",
      method: "email",
    },
  ],
  verifications: [
    {
      id: "ver-3301",
      holder: "Sonam Wangchuk",
      schemaName: "Citizenship ID",
      state: "verified",
      requestedAt: "2026-07-21",
    },
    {
      id: "ver-3302",
      holder: "Tashi Dema",
      schemaName: "University Degree",
      state: "requested",
      requestedAt: "2026-08-12",
    },
  ],
  organizations: [
    {
      id: "org-ndi",
      name: "Bhutan NDI",
      description: "National Digital Identity programme office.",
      role: "Owner",
      members: 4,
      createdAt: "2026-02-20",
      website: "https://www.bhutanndi.com",
      location: "Thimphu, Bhutan",
      visibility: "public",
    },
    {
      id: "org-rub",
      name: "Royal University of Bhutan",
      description: "Issues degree credentials to graduating students.",
      role: "Admin",
      members: 2,
      createdAt: "2026-03-30",
      website: "https://www.rub.edu.bt",
      location: "Thimphu, Bhutan",
      visibility: "public",
    },
  ],
  members: [
    {
      id: "m-1",
      name: "Kezang Loday",
      email: "kezang@bhutanndi.bt",
      role: "Owner",
      status: "active",
      joinedAt: "2026-02-20",
    },
    {
      id: "m-2",
      name: "Pema Choden",
      email: "pema@bhutanndi.bt",
      role: "Admin",
      status: "active",
      joinedAt: "2026-03-04",
    },
    {
      id: "m-3",
      name: "Jigme Dorji",
      email: "jigme@bhutanndi.bt",
      role: "Issuer",
      status: "active",
      joinedAt: "2026-04-11",
    },
    {
      id: "m-4",
      name: "Deki Yangzom",
      email: "deki@bhutanndi.bt",
      role: "Verifier",
      status: "invited",
      joinedAt: "2026-08-05",
    },
  ],
  certificates: [
    {
      id: "x509-1",
      commonName: "issuer.bhutanndi.bt",
      keyType: "RSA 2048",
      validFrom: "2026-01-15",
      expires: "2027-01-15",
      status: "valid",
    },
    {
      id: "x509-2",
      commonName: "verify.bhutanndi.bt",
      keyType: "ECDSA P-256",
      validFrom: "2025-09-01",
      expires: "2026-09-01",
      status: "expiring",
    },
  ],
  invitations: [
    {
      id: "inv-1",
      organization: "Ministry of Education",
      invitedBy: "sangay@moe.gov.bt",
      role: "Issuer",
      receivedAt: "2026-08-18",
      state: "pending",
    },
  ],
  ecosystems: [
    { id: "eco-1", name: "Bhutan Education Trust", role: "Lead", members: 3, joinedAt: "2026-04-08" },
  ],
  ecosystemMembers: [
    {
      id: "em-1",
      organization: "Bhutan NDI",
      role: "Lead",
      joinedAt: "2026-04-08",
      status: "active",
    },
    {
      id: "em-2",
      organization: "Royal University of Bhutan",
      role: "Issuer",
      joinedAt: "2026-04-12",
      status: "active",
    },
    {
      id: "em-3",
      organization: "Ministry of Education",
      role: "Verifier",
      joinedAt: "2026-05-02",
      status: "invited",
    },
  ],
  ecosystemInvitations: [
    {
      id: "einv-1",
      ecosystem: "Himalayan Trust Network",
      invitedBy: "governance@htn.org",
      role: "Verifier",
      receivedAt: "2026-08-20",
      state: "pending",
    },
  ],
  bulkUploads: [
    {
      id: "bulk-2201",
      fileName: "graduates-2026-batch-1.csv",
      records: 248,
      succeeded: 246,
      failed: 2,
      status: "partial",
      uploadedAt: "2026-07-30",
    },
    {
      id: "bulk-2202",
      fileName: "graduates-2026-batch-2.csv",
      records: 112,
      succeeded: 112,
      failed: 0,
      status: "completed",
      uploadedAt: "2026-08-06",
    },
  ],
  bulkRecords: [
    { id: "br-1", uploadId: "bulk-2201", holder: "choki.wangmo@rub.edu.bt", status: "issued" },
    { id: "br-2", uploadId: "bulk-2201", holder: "tenzin.norbu@rub.edu.bt", status: "issued" },
    {
      id: "br-3",
      uploadId: "bulk-2201",
      holder: "not-an-email",
      status: "failed",
      error: "Invalid email address",
    },
    {
      id: "br-4",
      uploadId: "bulk-2201",
      holder: "dorji.p@rub.edu.bt",
      status: "failed",
      error: "Missing required attribute: graduation_year",
    },
    { id: "br-5", uploadId: "bulk-2202", holder: "yeshey.d@rub.edu.bt", status: "issued" },
  ],
  apiKeys: [
    {
      id: "key-1",
      label: "Issuance service",
      masked: "ndi_live_••••••••7f3a",
      createdAt: "2026-03-12",
      lastUsed: "2026-08-22",
      status: "active",
    },
  ],
  activity: [
    { id: "a-1", text: "Credential offered to Karma Yangchen", at: "2026-07-09" },
    { id: "a-2", text: "Presentation verified for Sonam Wangchuk", at: "2026-07-21" },
    { id: "a-3", text: "Bulk upload graduates-2026-batch-2.csv completed", at: "2026-08-06" },
    { id: "a-4", text: "Deki Yangzom invited as Verifier", at: "2026-08-05" },
  ],
};
