"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Icon, type IconName } from "@/components/ui/icons";

interface NavChild {
  label: string;
  href: string;
  icon: IconName;
}

interface NavItem {
  label: string;
  icon: IconName;
  href?: string;
  /** A group renders a disclosure over its children instead of a plain row. */
  children?: NavChild[];
  /** Off-app destinations, which get the external-link treatment. */
  external?: boolean;
}

const PRIMARY: NavItem[] = [
  { label: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { label: "Organizations", icon: "building", href: "/organizations" },
  { label: "Users", icon: "users", href: "/users" },
  { label: "Connections", icon: "connections", href: "/connections" },
  {
    label: "Credentials",
    icon: "credentials",
    children: [
      { label: "All credentials", href: "/credentials", icon: "credentials" },
      { label: "Issue", href: "/credentials/issue", icon: "issue" },
      { label: "Verify", href: "/verification", icon: "verify" },
    ],
  },
  { label: "Schemas", icon: "layers", href: "/schemas" },
  {
    /* DIDs and x509 are both answers to "what does a relying party trust
       here", so they group rather than sitting as two loose rows. */
    label: "Trust",
    icon: "shieldCheck",
    children: [
      { label: "DIDs", href: "/did-details", icon: "fingerprint" },
      { label: "x509", href: "/x509-certificate", icon: "certificate" },
    ],
  },
  { label: "Ecosystems", icon: "ecosystems", href: "/ecosystems" },
  { label: "Billing", icon: "creditCard", href: "/organizations/billing" },
];

const ACCOUNT: NavItem[] = [
  { label: "Profile", icon: "user", href: "/profile" },
  { label: "Invitations", icon: "mail", href: "/invitations" },
  { label: "Developer settings", icon: "key", href: "/developers-setting" },
];

const SECONDARY: NavItem[] = [
  { label: "GitHub Repository", icon: "github", href: "#", external: true },
  { label: "Documentation", icon: "fileText", href: "#", external: true },
  { label: "Support", icon: "helpCircle", href: "#", external: true },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const groupHoldsPath = (item: NavItem) =>
    Boolean(item.children?.some((child) => pathname.startsWith(child.href)));

  /** A group containing the current page starts open; otherwise closed. */
  const [expanded, setExpanded] = useState<string | null>(
    PRIMARY.find(groupHoldsPath)?.label ?? null,
  );

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Scrim, mobile only. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[54] bg-[var(--scrim)] backdrop-blur-[5px] transition-opacity duration-[280ms] min-[901px]:hidden"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
        }}
      />

      <aside
        aria-label="Main"
        data-open={open ? "1" : "0"}
        /* On desktop the rail carries the same fill and blur as the top bar,
           not a transparent panel: the two meet along the whole left column,
           and a translucent band above a see-through one read as two
           different surfaces bolted together. As a drawer it stays more
           opaque, since content sits directly behind it. */
        className="fixed left-0 top-16 z-[55] flex h-[calc(100dvh-4rem)] w-[248px] flex-col overflow-y-auto border-r border-subtle bg-[var(--chrome-fill-strong)] px-3 py-5 backdrop-blur-[20px] backdrop-saturate-[140%] transition-transform duration-[260ms] ease-ndi min-[901px]:translate-x-0 min-[901px]:bg-[var(--chrome-fill)]"
        style={{ transform: open ? "translateX(0)" : undefined }}
      >
        <nav className="flex flex-col gap-0.5">
          {PRIMARY.map((item) => {
            if (item.children) {
              const isOpen = expanded === item.label;
              const holdsCurrent = groupHoldsPath(item);
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="ndi-navrow flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left font-display text-[13.5px] font-medium"
                    /* The parent shows as current only while collapsed — with
                       the group open, the active child carries that signal. */
                    data-active={holdsCurrent && !isOpen ? "1" : "0"}
                  >
                    <Icon name={item.icon} size={18} strokeWidth={1.7} className="flex-none" />
                    <span className="flex-1">{item.label}</span>
                    <Icon
                      name="chevronDown"
                      size={14}
                      strokeWidth={2}
                      className="flex-none opacity-60 transition-transform duration-200 ease-ndi"
                      style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
                    />
                  </button>

                  {isOpen ? (
                    <div className="mt-0.5 flex flex-col gap-0.5 pb-1 pl-[22px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          aria-current={isCurrent(child.href) ? "page" : undefined}
                          className="ndi-navrow flex items-center gap-2.5 rounded-[9px] px-3 py-2 font-display text-[13px] font-medium"
                          data-active={isCurrent(child.href) ? "1" : "0"}
                        >
                          <Icon name={child.icon} size={16} strokeWidth={1.7} className="flex-none" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            const href = item.href ?? "#";
            return (
              <Link
                key={item.label}
                href={href}
                onClick={onClose}
                aria-current={isCurrent(href) ? "page" : undefined}
                className="ndi-navrow flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 font-display text-[13.5px] font-medium"
                data-active={isCurrent(href) ? "1" : "0"}
              >
                <Icon name={item.icon} size={18} strokeWidth={1.7} className="flex-none" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="my-4 h-px bg-[var(--border-subtle)]" />

        <nav aria-label="Account" className="flex flex-col gap-0.5">
          {ACCOUNT.map((item) => {
            const href = item.href ?? "#";
            return (
              <Link
                key={item.label}
                href={href}
                onClick={onClose}
                aria-current={isCurrent(href) ? "page" : undefined}
                className="ndi-navrow flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 font-display text-[13.5px] font-medium"
                data-active={isCurrent(href) ? "1" : "0"}
              >
                <Icon name={item.icon} size={18} strokeWidth={1.7} className="flex-none" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="my-4 h-px bg-[var(--border-subtle)]" />

        <nav aria-label="Resources" className="flex flex-col gap-0.5">
          {SECONDARY.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="ndi-navrow flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 font-display text-[13.5px] font-medium"
              data-active="0"
            >
              <Icon name={item.icon} size={18} strokeWidth={1.7} className="flex-none" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
