"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icons";

interface TopBarProps {
  onToggleNav: () => void;
  navOpen: boolean;
}

export function TopBar({ onToggleNav, navOpen }: TopBarProps) {
  const [orgOpen, setOrgOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] h-16 border-b border-subtle bg-[rgba(12,17,27,0.72)] backdrop-blur-[20px] backdrop-saturate-[140%]">
      <div className="flex h-full items-center gap-3 px-4 min-[641px]:px-6">
        <button
          type="button"
          onClick={onToggleNav}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          aria-expanded={navOpen}
          className="ndi-navrow inline-flex h-10 w-10 flex-none items-center justify-center rounded-[10px] min-[901px]:hidden"
          data-active="0"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={navOpen ? "M18 6 6 18 M6 6l12 12" : "M4 6h16 M4 12h16 M4 18h16"} />
          </svg>
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/logos/ndi-studio-lockup.svg"
          alt="NDI Studio"
          width={4331}
          height={1910}
          className="block h-9 w-auto flex-none"
        />

        <div className="ml-auto flex items-center gap-2">
          {/* Organization selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOrgOpen((o) => !o)}
              aria-expanded={orgOpen}
              aria-haspopup="listbox"
              className="ndi-hairline-btn inline-flex h-10 items-center gap-2.5 rounded-[10px] border border-grid bg-white/[0.02] px-3.5 font-display text-[13px] font-medium text-body"
            >
              <Icon name="building" size={15} strokeWidth={1.7} className="flex-none text-accent" />
              <span className="hidden min-[561px]:inline">Select organization</span>
              <Icon
                name="chevronDown"
                size={13}
                strokeWidth={2}
                className="flex-none opacity-60 transition-transform duration-200 ease-ndi"
                style={{ transform: `rotate(${orgOpen ? 180 : 0}deg)` }}
              />
            </button>

            {orgOpen ? (
              <div
                role="listbox"
                aria-label="Organizations"
                className="absolute right-0 top-[calc(100%+8px)] z-[70] w-[248px] rounded-xl border p-1.5"
                style={{
                  borderColor: "rgba(90,201,148,0.22)",
                  background: "#0F1522",
                  boxShadow: "0 20px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <p className="px-3 py-3 text-[13px] leading-[1.5] text-muted">
                  No organizations yet. Create one to start issuing credentials.
                </p>
                <button
                  type="button"
                  className="ndi-navrow flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px]"
                  data-active="0"
                >
                  <Icon name="plus" size={15} strokeWidth={2} className="flex-none text-accent" />
                  Create organization
                </button>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="ndi-navrow inline-flex h-10 w-10 items-center justify-center rounded-[10px]"
            data-active="0"
          >
            <Icon name="bell" size={17} strokeWidth={1.7} />
          </button>

          <button
            type="button"
            aria-label="Switch to light theme"
            className="ndi-navrow inline-flex h-10 w-10 items-center justify-center rounded-[10px]"
            data-active="0"
          >
            <Icon name="moon" size={17} strokeWidth={1.7} />
          </button>

          <button
            type="button"
            aria-label="Account"
            className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-grid font-display text-[13px] font-semibold text-[var(--text-on-mint)]"
            style={{ background: "var(--grad-mint)" }}
          >
            K
          </button>
        </div>
      </div>
    </header>
  );
}
