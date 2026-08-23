"use client";

import { useState } from "react";

import { Icon, type IconName } from "@/components/ui/icons";

interface NavItem {
  label: string;
  icon: IconName;
  /** A group renders a disclosure with children instead of a plain row. */
  children?: string[];
}

const PRIMARY: NavItem[] = [
  { label: "Dashboard", icon: "dashboard" },
  { label: "Organizations", icon: "building" },
  { label: "Users", icon: "users" },
  { label: "Connections", icon: "connections" },
  { label: "Credentials", icon: "credentials", children: ["Schemas", "Credential definitions", "Issuance", "Verification"] },
  { label: "Ecosystems", icon: "ecosystems" },
];

const SECONDARY: NavItem[] = [
  { label: "GitHub Repository", icon: "github" },
  { label: "Documentation", icon: "fileText" },
  { label: "Support", icon: "helpCircle" },
];

interface SidebarProps {
  active?: string;
  /** Mobile: the drawer is closed until the top bar's control opens it. */
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ active = "Dashboard", open = false, onClose }: SidebarProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {/* Scrim, mobile only. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[54] bg-[rgba(6,10,16,0.62)] backdrop-blur-[5px] transition-opacity duration-[280ms] min-[901px]:hidden"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
        }}
      />

      <aside
        aria-label="Main"
        className="fixed left-0 top-16 z-[55] flex h-[calc(100dvh-4rem)] w-[248px] flex-col overflow-y-auto border-r border-subtle bg-[rgba(12,17,27,0.86)] px-3 py-5 backdrop-blur-[20px] transition-transform duration-[260ms] ease-ndi min-[901px]:translate-x-0 min-[901px]:bg-transparent min-[901px]:backdrop-blur-none"
        style={{ transform: open ? "translateX(0)" : undefined }}
        data-open={open ? "1" : "0"}
      >
        <nav className="flex flex-col gap-0.5">
          {PRIMARY.map((item) => {
            const isActive = active === item.label;

            if (item.children) {
              const isOpen = expanded === item.label;
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    className="ndi-navrow flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left font-display text-[13.5px] font-medium"
                    data-active={isActive ? "1" : "0"}
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
                    <div className="mt-0.5 flex flex-col gap-0.5 pb-1 pl-[34px]">
                      {item.children.map((child) => (
                        <button
                          key={child}
                          type="button"
                          className="ndi-navrow flex items-center gap-2.5 rounded-[9px] px-3 py-2 text-left text-[13px]"
                          data-active="0"
                        >
                          <span className="ndi-navdot" aria-hidden="true" />
                          {child}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                aria-current={isActive ? "page" : undefined}
                className="ndi-navrow flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left font-display text-[13.5px] font-medium"
                data-active={isActive ? "1" : "0"}
              >
                <Icon name={item.icon} size={18} strokeWidth={1.7} className="flex-none" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="my-4 h-px bg-[var(--border-subtle)]" />

        <nav aria-label="Resources" className="flex flex-col gap-0.5">
          {SECONDARY.map((item) => (
            <button
              key={item.label}
              type="button"
              className="ndi-navrow flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left font-display text-[13.5px] font-medium"
              data-active="0"
            >
              <Icon name={item.icon} size={18} strokeWidth={1.7} className="flex-none" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
