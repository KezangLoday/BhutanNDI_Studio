import type { CSSProperties, ReactNode } from "react";

/**
 * Icon registry, following the website's convention: one 24x24 viewBox,
 * currentColor stroke, round caps and joins, stroke width passed per call.
 * Drawn icons only — no emoji standing in for an icon.
 */
export type IconName =
  | "mail"
  | "lock"
  | "lockRounded"
  | "fingerprint"
  | "shieldCheck"
  | "shieldAlert"
  | "check"
  | "close"
  | "user"
  | "arrowRight"
  | "arrowLeft"
  | "chevronDown"
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
