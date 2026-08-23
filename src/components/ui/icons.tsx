import type { CSSProperties, ReactNode } from "react";

/**
 * Icon registry, following the website's convention: one 24x24 viewBox,
 * currentColor stroke, round caps and joins, stroke width passed per call.
 * Drawn icons only — no emoji standing in for an icon.
 */
export type IconName =
  // auth
  | "mail"
  | "lock"
  | "lockRounded"
  | "fingerprint"
  | "shieldCheck"
  | "shieldAlert"
  | "eye"
  | "eyeOff"
  | "userCheck"
  // navigation
  | "dashboard"
  | "building"
  | "users"
  | "connections"
  | "credentials"
  | "ecosystems"
  | "github"
  | "fileText"
  | "helpCircle"
  // chrome
  | "bell"
  | "moon"
  | "sun"
  | "info"
  | "plus"
  | "logOut"
  // generic
  | "check"
  | "close"
  | "user"
  | "arrowRight"
  | "arrowLeft"
  | "chevronDown"
  | "chevronRight"
  | "send";

const ALL_ICONS: Record<IconName, ReactNode> = {
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  lockRounded: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="4" />
      <path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" />
      <path d="M12 14.4v2.2" />
    </>
  ),
  fingerprint: (
    <>
      <path d="M12 4.5a7.5 7.5 0 0 0-7.5 7.5v2" />
      <path d="M12 4.5a7.5 7.5 0 0 1 7.5 7.5v2" />
      <path d="M12 8a4 4 0 0 0-4 4v4.5" />
      <path d="M12 8a4 4 0 0 1 4 4v4.5" />
      <path d="M12 11.5v8" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 3c-3 1.5-5 2-5 2v6c0 4.5 2 7 5 8 3-1 5-3.5 5-8V5s-2-.5-5-2Z" />
      <path d="M9.8 11.6l1.7 1.7 3-3.4" />
    </>
  ),
  shieldAlert: (
    <>
      <path d="M12 3c-3 1.5-5 2-5 2v6c0 4.5 2 7 5 8 3-1 5-3.5 5-8V5s-2-.5-5-2Z" />
      <path d="M12 8v4" />
      <path d="M12 15h.01" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M9.9 5.8A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.4 3.3" />
      <path d="M6.4 7.6A16.9 16.9 0 0 0 2.5 12S6 18.5 12 18.5c1.6 0 3-.35 4.2-.92" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M3 3l18 18" />
    </>
  ),
  userCheck: (
    <>
      <circle cx="9.5" cy="8" r="3.6" />
      <path d="M2.5 20a7 7 0 0 1 12 0" />
      <path d="M16.5 12.5l2 2 3.5-3.8" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
    </>
  ),
  building: (
    <>
      <path d="M3.5 21V4.2A1.2 1.2 0 0 1 4.7 3h8.1a1.2 1.2 0 0 1 1.2 1.2V21" />
      <path d="M14 9.5h5.3a1.2 1.2 0 0 1 1.2 1.2V21" />
      <path d="M2 21h20" />
      <path d="M6.6 7h1.2M10.2 7h1.2M6.6 11h1.2M10.2 11h1.2M6.6 15h1.2M10.2 15h1.2" />
      <path d="M17 13.5h1.2M17 17h1.2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.5 20a6.6 6.6 0 0 1 13 0" />
      <path d="M16 5.2a3.4 3.4 0 0 1 0 5.6" />
      <path d="M18.5 20a6.6 6.6 0 0 0-2.2-4.9" />
    </>
  ),
  connections: (
    <>
      <circle cx="18" cy="5.5" r="2.6" />
      <circle cx="6" cy="12" r="2.6" />
      <circle cx="18" cy="18.5" r="2.6" />
      <path d="M15.7 6.8 8.3 10.7M8.3 13.3l7.4 3.9" />
    </>
  ),
  credentials: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.2" />
      <circle cx="8.5" cy="11" r="2.1" />
      <path d="M5.4 16.2a3.6 3.6 0 0 1 6.2 0" />
      <path d="M15 10h4M15 13.5h2.5" />
    </>
  ),
  ecosystems: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v2.4M12 18.1v2.4M3.5 12h2.4M18.1 12h2.4" />
      <path d="m6.4 6.4 1.7 1.7M15.9 15.9l1.7 1.7M17.6 6.4l-1.7 1.7M8.1 15.9l-1.7 1.7" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 2-2.64-.5-5.36-.5-8 0-2-2-3-2-3-2-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9.5c0 3.5 3 5.5 6 5.5-.6.6-.6 1.2-.5 2V22" />
      <path d="M9 18c-4.5 2-5-2-7-2" />
    </>
  ),
  fileText: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 16.5h4" />
    </>
  ),
  helpCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2-2.4 3.4" />
      <path d="M12 17h.01" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8.5a6 6 0 1 0-12 0c0 6-2.5 7.5-2.5 7.5h17S18 14.5 18 8.5Z" />
      <path d="M13.7 19.5a2 2 0 0 1-3.4 0" />
    </>
  ),
  moon: <path d="M20.5 15.2A8.5 8.5 0 1 1 9.3 3.7a6.8 6.8 0 0 0 11.2 11.5Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <path d="M12 7.8h.01" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  logOut: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  arrowRight: <path d="M5 12h14M12 5l7 7-7 7" />,
  arrowLeft: <path d="M19 12H5M12 19l-7-7 7-7" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />,
};

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 24, strokeWidth = 1.8, className, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {ALL_ICONS[name]}
    </svg>
  );
}
